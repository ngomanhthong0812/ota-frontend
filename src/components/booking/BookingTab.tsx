"use client";

import { useAuth } from "@/context/auth.context";
import useSWR from "swr";
import BookingList from "./BookingList";

interface BookingTabProps {
  roomMap: Map<number, Room>; // Dữ liệu phòng được truyền vào
  
  startDate: string;

  endDate: string;
  handleShowClick: (roomData: { id: number; name: string; price: number;  max_capacity: number;  max_children: number; room_id: number; room_name: string;   }) => void;
}

interface RoomAPIResponse {
  id: number;
  name: string;
  standard_capacity: number;
  max_capacity: number;
  standard_children: number;
  max_children: number;
  hourly_rate: number;
  daily_rate: number;
  overnight_rate: number;
  total_rooms: number;
  available_rooms: number;
  rooms: { id: number; name: string }[]; // Danh sách phòng chưa được đặt
}

interface Room {
  id: number;
  name: string;
  price: number;
  available: string;
  standard_capacity: number; // Thêm thuộc tính mới
  standard_children: number; // Thêm thuộc tính mới
}

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

const BookingTab: React.FC<BookingTabProps> = ({ handleShowClick }) => {  
  const { token } = useAuth();
  const hotelId = 1;
  const startDate = "2024-12-01";
  const endDate = "2024-12-10";

  const { data, error } = useSWR(
    token
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings/available/rooms?hotelId=${hotelId}&startDate=${startDate}&endDate=${endDate}`
      : null,
    (url: string) => fetcher(url, token),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  // Xử lý khi đang tải dữ liệu
  if (!data && !error) return <div>Loading...</div>;

  // Xử lý khi có lỗi
  if (error) {
    console.error("Error fetching data:", error);
    return <div>Error fetching data: {error.message}</div>;
  }

  // Lọc và gộp dữ liệu dựa trên id (roomType.id)
  const roomMap = new Map<number, Room>();
  (data?.data ?? []).forEach((roomType: RoomAPIResponse) => {
    if (!roomMap.has(roomType.id)) {
      // Nếu id chưa tồn tại, thêm mới
      roomMap.set(roomType.id, {
        id: roomType.id,
        name: roomType.name,
        price: roomType.daily_rate, // Sử dụng giá hàng ngày
        available: `${roomType.available_rooms} `, // Số phòng trống
        standard_capacity: roomType.standard_capacity, // Thêm capacity
        standard_children: roomType.standard_children, // Thêm standard_children
      });
    } else {
      // Nếu id đã tồn tại, cập nhật số lượng phòng
      const existingRoom = roomMap.get(roomType.id)!;
      const updatedAvailable = parseInt(existingRoom.available) + roomType.available_rooms;
      roomMap.set(roomType.id, {
        ...existingRoom,
        available: `${updatedAvailable} rooms available`, // Cộng dồn số phòng
      });
    }
  });

  // Chuyển dữ liệu từ Map sang danh sách
  const rooms: Room[] = Array.from(roomMap.values());

  // Tính tổng số phòng trống
  const totalAvailableRooms = Array.from(roomMap.values()).reduce((sum, room) => {
    const availableCount = parseInt(room.available.split(" ")[0]); // Lấy số lượng phòng từ chuỗi
    return sum + availableCount;
  }, 0);
 

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
              <p>Phòng ( {totalAvailableRooms} còn lại ) </p>
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
       <BookingList  handleShowClick={handleShowClick} startDate={""} endDate={""}/>
      </div>
    </div>
  );
};

export default BookingTab;
function totalAvailableRooms(roomMap: Map<number, Room>) {
  throw new Error("Function not implemented.");
}

