import React, { useState } from "react";
import BookingTable from "./BookingTable";
import { useAuth } from "@/context/auth.context";
import useSWR from "swr";

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
  max_capacity: number; // Thêm thuộc tính max_capacity
  max_children: number; // Thêm thuộc tính max_children
  room_id: number; // Thêm thuộc tính room_id
  room_name: string; // Thêm thuộc tính room_name
}

interface BookingListProps {
  handleShowClick: (roomData: { id: number; name: string; price: number }) => void;
  startDate: string;
  endDate: string;
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

const BookingList: React.FC<{ handleShowClick: (roomData: { id: number; name: string; price: number;  max_capacity: number;  max_children: number; room_id: number; room_name: string;  }) => void;startDate: string; endDate: string }> = ({ handleShowClick,startDate,
  endDate }) => {
  const { token } = useAuth();
  const hotelId = 1;

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
   roomType.rooms.forEach((room) => {
     if (!roomMap.has(roomType.id)) {
       // Nếu id chưa tồn tại, thêm mới
       roomMap.set(roomType.id, {
         id: roomType.id,
         name: roomType.name,
         price: roomType.daily_rate, // Sử dụng giá hàng ngày
         available: `${roomType.available_rooms} `, // Số phòng trống
         standard_capacity: roomType.standard_capacity, // Thêm capacity
         standard_children: roomType.standard_children, // Thêm standard_children
         max_capacity: roomType.max_capacity, // Thêm max_capacity
         max_children: roomType.max_children, // Thêm max_children
         room_id: room.id, // Thêm room_id
         room_name: room.name, // Thêm room_name
       });
     } else {
       // Nếu id đã tồn tại, cập nhật số lượng phòng
       const existingRoom = roomMap.get(roomType.id)!;
       const updatedAvailable = parseInt(existingRoom.available) + roomType.available_rooms;
       roomMap.set(roomType.id, {
         ...existingRoom,
         available: `${updatedAvailable} `, // Cộng dồn số phòng
       });
     }
   });
 });
  // Chuyển dữ liệu từ Map sang danh sách
  const rooms: Room[] = Array.from(roomMap.values());

  return (
    <div>
      {rooms.length > 0 ? (
        rooms.map((room) => (
          <BookingTable
            key={room.id}
            aroom={room}
            handleShowClick={handleShowClick}
          />
        ))
      ) : (
        <p>No available rooms for the selected dates.</p>
      )}
    </div>
  );
};

export default BookingList;
