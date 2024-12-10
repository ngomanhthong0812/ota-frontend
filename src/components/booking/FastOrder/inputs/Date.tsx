import React, { useState } from 'react'

interface IDate {
  startDate: string;
  endDate: string;
  handleStartDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEndDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


const Date: React.FC<IDate> = ({startDate,  endDate, handleStartDateChange, handleEndDateChange}) => {

  
  return (
    <div className="text-md gap-2 flex">
          <input
            type="datetime-local"
            id="check-in"
            className="date-time"
            placeholder="Ngày giờ đặt phòng"
            value={startDate}
            onChange={handleStartDateChange}
          />
          <input
            type="datetime-local"
            id="check-out"
            className="date-time"
            placeholder="Ngày giờ đặt phòng"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>
  )
}

export default Date