import React from "react";
import { GrLinkNext } from "react-icons/gr";

interface BtnNextOrderProps {
  onToggleView: () => void; // Thêm props onClick để nhận hàm từ parent component
}

const BtnNextOrder: React.FC<BtnNextOrderProps> = ({ onToggleView }) => {
  return (
    <button
      onClick={onToggleView} // Gọi onClick khi bấm vào nút
      className="w-full flex items-center justify-center gap-2 bg-[var(--room-booked-color-100-)] text-white font-bold p-[10px] rounded-md hover:bg-[var(--room-booked-color-200-)]"
    >
      Chuyển tiếp
      <GrLinkNext />
    </button>
  );
};

export default BtnNextOrder;
