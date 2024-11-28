"use client";

import { useAuth } from "@/context/auth.context";
import useSWR from "swr";
import BookingList from "./BookingList";

// Fetcher function sử dụng để gọi API
const fetcher = async (url: string, token: string | null) => {
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const error = await res.json();
      console.error("API Error:", error);
      throw new Error(error.message || "Failed to fetch");
    }

    return res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

const BookingTab = ({ handleShowClick }: { handleShowClick: () => void }) => {  const { user, token } = useAuth(); // Context để lấy token và user
  console.log("User:", user);
  console.log("Token:", token);

  // Gọi API để lấy tổng số phòng
  const { data, error, isLoading } = useSWR(
    token ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/floors/rooms/total` : null,
    (url: string) => fetcher(url, token),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (!token) {
    return <div>Loading token...</div>;
  }

  if (isLoading) {
    console.log("Data is loading...");
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching data:", error);
    return <div>Error fetching data</div>;
  }

  console.log("Data received:", data);

  return (
    <div className="body_content-room ">
      <div className="col-span-7 flex flex-col">
        {/* Hiển thị tổng số phòng */}
        <section className="flex-1 duration-300 border border-[var(--ht-neutral-100-)] px-3 rounded-md bg-white">
          <div className="flex border-b border-stone-300  py-3  font-medium">
            <div className="w-2/12">
              <p>Loại phòng</p>
            </div>
            <div className="w-4/12">
              <p>Phòng ({data?.total_rooms ?? "0"} còn lại)</p>
            </div>
            <div className="w-2/12">
              <p>Loại giá</p>
            </div>
            <div className="w-2/12 justify-end flex">
              <p>Giá mặc định</p>
            </div>
            <div className="w-2/12 justify-end flex">
              <p>Khách</p>
            </div>
          </div>
        </section>

        {/* Bảng booking */}
       <BookingList  handleShowClick={handleShowClick}/>
      </div>
    </div>
  );
};

export default BookingTab;
