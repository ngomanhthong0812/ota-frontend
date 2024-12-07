import React from 'react';

interface BookingHeaderProps {
  onToggleView: (view: 'room' | 'info') => void; // Sửa kiểu ở đây
}

const BookingHeader: React.FC<BookingHeaderProps> = ({ onToggleView }) => {
  return (
    <div className="toolbar-top bg-white rounded-md p-2 flex justify-center text-xs border border-[var(--ht-neutral-100-)]">
      <div className="flex">
        <div className="toolbar-top-type bg-[var(--ht-body-bg-)] flex rounded-3xl p-1 font-[600]">
          <button
            className="toolbar-top-type_item active"
            onClick={() => onToggleView('room')}
          >
            Phòng trống
          </button>
          <button
            className="toolbar-top-type_item"
            onClick={() => onToggleView('info')}
          >
            Thông tin
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingHeader;
