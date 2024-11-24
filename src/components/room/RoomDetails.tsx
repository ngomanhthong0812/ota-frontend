import { Room } from "@/types/backend";
import React from "react";

interface RoomDetailsProps {
  room: Room;
}

const RoomDetails: React.FC<RoomDetailsProps> = ({ room }) => {
  return (
    <div className="flex">
      <div className="w-[300px] h-[200px] p-4">
        <img
          src="https://via.placeholder.com/300x200"
          alt="room image"
          className="w-full h-auto rounded-xl"
        />
      </div>
      <div className="w-3/4 p-4">
        <div className="flex gap-20">
          <div className="w-1/2">
            {/* Chi tiết bên trái */}
            <div className="flex w-full py-2 gap-5 border-b justify-between">
              <div>Tên phòng:</div>
              <span>{room.name}</span>
            </div>
            {/* ... Các thông tin khác */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
