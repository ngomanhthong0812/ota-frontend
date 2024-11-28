import React from "react";
import Bookingtable from "./BookingTable";
import { useAuth } from "@/context/auth.context";
import useSWR from "swr";

// Định nghĩa kiểu dữ liệu cho phản hồi từ API
interface RoomAPIResponse {
  room_type_id: number;
  room_type: string;
  price: number;
}

// Định nghĩa kiểu dữ liệu cho một phòng
interface Room {
  id: number;
  name: string;
  price: number;
  available: string;
}

// Fetcher function sử dụng để gọi API
const fetcher = async (
  url: string,
  token: string | null
): Promise<RoomAPIResponse[]> => {
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

const BookingList: React.FC<{ handleShowClick: () => void }> = ({ handleShowClick }) => {
  // Nhận `onAddClick` từ CreateBookingPage
  const { token } = useAuth(); // Lấy token mà không cần sử dụng `user`

  // Gọi API bằng `useSWR`
  const { data, error, isLoading } = useSWR(
    token
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/room/typeRoom-price`
      : null,
    (url: string) => fetcher(url, token),
    {
      revalidateOnFocus: true, // Tự động tái tải dữ liệu khi người dùng quay lại trang
      revalidateOnReconnect: true, // Tự động tái tải dữ liệu khi kết nối lại
      refreshInterval: 60000, // Tái tải dữ liệu mỗi 1 phút
    }
  );

  if (!token) {
    return <div>Loading token...</div>; // Trả về nếu chưa có token
  }

  if (isLoading) {
    return <div>Loading...</div>; // Trả về nếu đang tải dữ liệu
  }

  // Kiểm tra và ép kiểu cho 'error'
  if (error) {
    const errorMessage = (error as Error).message || "Error fetching data"; // Ép kiểu error thành Error
    console.error("Error fetching data:", errorMessage);
    return <div>{errorMessage}</div>; // Hiển thị thông báo lỗi
  }

  // Kiểm tra và truy cập đúng dữ liệu từ 'data.data'
  const arooms: Room[] = (data?.data ?? []).map((room: RoomAPIResponse) => ({
    id: room.room_type_id,
    name: room.room_type,
    price: room.price,
    available: "N/A", // Mặc định giá trị available
  }));

  return (
    <div>
      <div>
        {arooms
          .filter((aroom) => aroom.id && aroom.name && aroom.price) // Lọc phòng có dữ liệu hợp lệ
          .map(
            (
              aroom: Room // Chỉ định kiểu Room cho 'aroom'
            ) => (
              <Bookingtable
                key={aroom.id}
                aroom={aroom}
                handleShowClick={handleShowClick}
              />
            )
          )}
      </div>
    </div>
  );
};

export default BookingList;
