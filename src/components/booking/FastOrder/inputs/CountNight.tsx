import React, { useEffect, useState } from "react";

interface ICountNight {
  startDate: string;
  endDate: string;
  CountNights?: number;
  setCountNights?: (value: number) => void; 
}

const CountNight: React.FC<ICountNight> = ({startDate, endDate, CountNights, setCountNights}) => {
  
  

   // Hàm tính số ngày giữa hai ngày
   const calculateNights = (start: string, end: string): number => {

      // Kiểm tra nếu một trong hai ngày không được cung cấp
      if (!start || !end) {
        return 0;
      } 
    const startDate = new Date(start);
    const endDate = new Date(end);

    // Đặt thời gian về 00:00:00 để không tính giờ
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    // Tính số ngày chênh lệch
    const diffTime = endDate.getTime() - startDate.getTime();

    // Chuyển đổi từ millisecond sang số ngày
    return Math.max(0, diffTime / (1000 * 3600 * 24)); // Đảm bảo không có giá trị âm
  };


 const countNights = calculateNights(startDate, endDate);
     // Hàm xử lý  giá mặc định
 useEffect(() => {
  if (countNights !== undefined) {
    if (setCountNights) {
      setCountNights(countNights);
    }
  }
}, [countNights]); // Chạy khi data.price thay đổi

 
  

  return (
    <div>
      <div className="flex items-center justify-center">
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="17"
            width="17"
            viewBox="0 0 512 512"
          >
            <path
              fill="var(--navbar-color-)"
              d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"
            />
            <path d="M184 232h144c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
          </svg>
        </button>
        <p className="text-[var(--room-empty-color-)] px-2">{CountNights  } đêm</p>

        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="17"
            width="17"
            viewBox="0 0 512 512"
          >
            <path
              fill="var(--navbar-color-)"
              d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"
            />
            <path d="M232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CountNight;
