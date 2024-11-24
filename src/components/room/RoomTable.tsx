import React from "react";
import RoomRow from "./RoomRow";
import { Room } from "@/types/backend";

interface RoomTableProps {
  rooms: Room[];
  selectedRoom: Room | null;
  onSelectRoom: (room: Room) => void;
}

const RoomTable: React.FC<RoomTableProps> = ({
  rooms,
  selectedRoom,
  onSelectRoom,
}) => {
  return (
    <table className="min-w-full table-auto rounded-t-[3px] overflow-hidden mt-3 border-x border">
      <thead className="border font-[500] text-[var(--color-menu-icon-)]">
        <tr className="bg-[var(--ht-neutral-100-)]">
          <th className="px-2 py-2 text-left border-b whitespace-nowrap">
            <input type="checkbox" />
          </th>
          <th className="px-2 py-2 text-left border-b whitespace-nowrap">
            Tên phòng
          </th>
          <th className="px-2 py-2 text-left border-b whitespace-nowrap">
            Hạng phòng
          </th>
          <th className="px-2 py-2 text-left border-b whitespace-nowrap">
            Khu vực
          </th>
          <th className="px-2 py-2 text-left border-b whitespace-nowrap">
            Giá giờ
          </th>
          {/* ... */}
        </tr>
      </thead>
      <tbody>
        {rooms.map((room) => (
          <RoomRow
            key={room.code}
            room={room}
            isSelected={selectedRoom?.code === room.code}
            onSelect={onSelectRoom}
          />
        ))}
      </tbody>
    </table>
  );
};

export default RoomTable;
