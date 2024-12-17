import React from 'react';
import { useFormContext } from "../BookingForm";

const DateIput = () => {
  const { date, setDate } = useFormContext();
  const { startDate, endDate } = date;

  // Hàm xử lý khi người dùng thay đổi ngày bắt đầu
  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate((prev) => ({ ...prev, startDate: event.target.value }));
  };

  // Hàm xử lý khi người dùng thay đổi ngày kết thúc
  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate((prev) => ({ ...prev, endDate: event.target.value }));
  };



  // Get current date and time to set as min for startDate
  const currentDateTime = new Date().toISOString().slice(0, 16);

  return (
    <div className="text-md gap-2 flex">
        
      <input
        type="datetime-local"
        id="check-in"
        className="date-time"
        placeholder="Ngày giờ đặt phòng"
        value={startDate}
        onChange={handleStartDateChange}
        min={currentDateTime} // Giới hạn startDate không nhỏ hơn thời gian hiện tại
        max={endDate} // startDate không được lớn hơn endDate
      />
      <input
        type="datetime-local"
        id="check-out"
        className="date-time"
        placeholder="Ngày giờ đặt phòng"
        value={endDate}
        onChange={handleEndDateChange}
        min={startDate} // endDate không được nhỏ hơn startDate
      />
     
    </div>
  );
};

export default DateIput;
