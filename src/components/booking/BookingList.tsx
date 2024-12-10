import React, { useState } from "react";
import BookingTable from "./BookingTable";

interface Room {
  room_id: number;
  room_name: string;
  room_clean_status: number;
  room_status: string;
  room_price: number;
  room_notes: string;
  room_start_date_use: string;
  room_room_type_id: number;
  room_floor_id: number;
  room_hotel_id: number;
}

interface RoomType {
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
  rooms: Room[];
}

const BookingList: React.FC<{
  handleShowClick: (roomData: RoomType) => void;
  data: RoomType[];
  setPriceTypeDad: React.Dispatch<React.SetStateAction<string>>;
  setRoomCountDad: React.Dispatch<React.SetStateAction<number>>;
}> = ({ handleShowClick, data, setPriceTypeDad, setRoomCountDad }) => {
  const roomTypes = data;

  return (
    <div>
      {roomTypes?.length > 0 ? (
        roomTypes.map((roomType) => (
          <BookingTable
            key={roomType.id}
            aroom={roomType}
            handleShowClick={handleShowClick}
            setPriceTypeDad={setPriceTypeDad}
            setRoomCountDad={setRoomCountDad}
          />
        ))
      ) : (
        <p>No available rooms for the selected dates.</p>
      )}
    </div>
  );
};

export default BookingList;
