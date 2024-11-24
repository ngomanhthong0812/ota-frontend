import { Room } from "@/types/backend";
import React from "react";

interface RoomRowProps {
  room: Room;
  isSelected: boolean;
  onSelect: (room: Room) => void;
}

const RoomRow: React.FC<RoomRowProps> = ({ room, isSelected, onSelect }) => {
  return (
    <tr
      className={`cursor-pointer ${
        isSelected ? "!bg-[#ebf5ea]" : "hover:bg-gray-100 border-b bg-white"
      }`}
      onClick={() => onSelect(room)}
    >
      <td className="px-2 py-2">
        <input type="checkbox" checked={isSelected} readOnly />
      </td>
      <td className="px-2 py-2">{room.name}</td>
      <td className="px-2 py-2">{room.roomCategory}</td>
      <td className="px-2 py-2 text-center">{room.area}</td>
      <td className="px-2 py-2">{room.pricePerHour.toLocaleString()}</td>
      <td className="px-2 py-2">{room.pricePerDay.toLocaleString()}</td>
      <td className="px-2 py-2">{room.pricePerNight.toLocaleString()}</td>
      <td className="px-2 py-2">{room.status}</td>
      <td className="px-2 py-2">{room.note}</td>
      <td className="px-2 py-2">{room.branch}</td>
    </tr>
  );
};

export default RoomRow;
