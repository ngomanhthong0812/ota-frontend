import React from "react";

interface BookingHeaderProps {
  currentView: "room" | "info"; // Nhận giá trị view hiện tại
  onToggleView: (view: "room" | "info") => void;
}

const BookingHeader: React.FC<BookingHeaderProps> = ({
  currentView,
  onToggleView,
}) => {
  return (
    <div className="toolbar-top bg-white rounded-md p-2 flex justify-center text-xs border border-[var(--ht-neutral-100-)]">
      <div className="flex">
        <div className="toolbar-top-type bg-[var(--ht-body-bg-)] flex rounded-3xl p-1 font-[600]">
          <button
            className={`toolbar-top-type_item ${
              currentView === "room" ? "active" : ""
            }`} // Thêm lớp active nếu view là "room"
            onClick={() => onToggleView("room")}
          >
            Phòng trống
          </button>
          <button
            className={`toolbar-top-type_item ${
              currentView === "info" ? "active" : ""
            }`} // Thêm lớp active nếu view là "info"
            onClick={() => onToggleView("info")}
          >
            Thông tin
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingHeader;
