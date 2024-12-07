import React from "react";
import InputDay from "@/components/booking/btn/inputDay";
import BookingTab from "@/components/booking/BookingTab";

interface BookingSectionProps {
  startDate: string;
  endDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  showBookingTab: boolean;
  handleSearchClick: () => void;
  handleShowClick: (roomData: {
    id: number;
    name: string;
    price: number;
    max_capacity: number;
    max_children: number;
    room_id: number;
    room_name: string;
  }) => void;
}

const BookingSection: React.FC<BookingSectionProps> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  showBookingTab,
  handleSearchClick,
  handleShowClick,
}) => {
  return (
    <div>
      {/** Checkin-Checkout-Search */}
      <section className="mb-2 duration-300 border border-[var(--ht-neutral-100-)] rounded-md relative bg-white p-[8.9px]">
        <div className="flex justify-between">
          {/** checkin-checkout */}
          <InputDay setStartDate={setStartDate} setEndDate={setEndDate} />
          {/** search */}
          <div
            className="flex justify-center items-center cursor-pointer"
            onClick={handleSearchClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 512 512">
              <path
                fill="#279656"
                d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
              />
            </svg>
          </div>
        </div>
      </section>

      {/** Table list Room */}
      <section className="flex-1 duration-300 border border-[var(--ht-neutral-100-)] rounded-md bg-white">
        {!showBookingTab ? (
          <div className="flex border-b border-stone-300 pb-4 p-3 px-3 gap-6 font-medium h-80 justify-center items-center">
            <p>Chọn ngày để tìm phòng trống</p>
          </div>
        ) : (
          <BookingTab
            handleShowClick={handleShowClick}
            roomMap={new Map()}
            startDate={startDate}
            endDate={endDate}
          />
        )}
      </section>

      <div className="flex text-sm">
        <span className="text-[var(--room-empty-color-)]">*</span>
        <p>
          Phòng thẳng chặn: phòng thẳng chặn có thể book mà không phải chuyển phòng
        </p>
      </div>
    </div>
  );
};

export default BookingSection;
