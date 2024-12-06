import React, { useState, useMemo } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import "@mui/material/styles";

const RoomUsageLineChart = () => {
  const [timeframe, setTimeframe] = useState("Tháng này");

  // Dữ liệu phòng sử dụng và tổng số phòng
  const totalRooms = 100; // Tổng số phòng cố định

  // Giả sử dữ liệu phòng đã sử dụng cho từng ngày trong tháng này (hoặc tháng trước)
  const occupiedRoomsForMonth = [
    45, 50, 55, 60, 70, 65, 72, 140, 85, 90, 92, 95, 100, 98, 96, 100, 102, 110,
  ];

  // Hàm tính phần trăm công suất sử dụng phòng và giới hạn ở 100%
  const calculatePercentage = (occupiedRooms: number[]) =>
    occupiedRooms.map((rooms) => Math.min((rooms / totalRooms) * 100, 100));

  // Lấy số ngày trong tháng hiện tại
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate(); // Trả về số ngày trong tháng
  };

  // Lấy ngày hiện tại
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // Tháng hiện tại (0-11)
  const currentYear = currentDate.getFullYear(); // Năm hiện tại
  const daysInCurrentMonth = getDaysInMonth(currentMonth + 1, currentYear); // Lấy số ngày trong tháng hiện tại

  // Tạo dữ liệu ngày cho xAxis (dựng mảng ngày từ 1 đến số ngày trong tháng)
  const xAxisData = useMemo(
    () => Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1),
    [daysInCurrentMonth]
  );

  // Sử dụng useMemo để tính toán dữ liệu cho biểu đồ dựa trên `timeframe`
  const selectedData = useMemo(() => {
    let data;
    switch (timeframe) {
      case "Hôm nay":
        data = calculatePercentage([occupiedRoomsForMonth[0]]);
        break;
      case "7 ngày qua":
        data = calculatePercentage(occupiedRoomsForMonth.slice(0, 7));
        break;
      case "Tháng này":
        const today = currentDate.getDate(); // Lấy ngày hôm nay
        data = calculatePercentage(occupiedRoomsForMonth.slice(0, today)); // Lấy dữ liệu đến ngày hôm nay
        break;
      case "Tháng trước":
        // Giả sử dữ liệu cho tháng trước có sẵn
        data = calculatePercentage(occupiedRoomsForMonth);
        break;
      default:
        data = calculatePercentage(occupiedRoomsForMonth); // Dữ liệu mặc định là "Tháng này"
        break;
    }
    return data;
  }, [timeframe, occupiedRoomsForMonth, currentDate]);

  return (
    <div>
      <div className="w-full flex justify-between font-bold text-black">
        <span>Công suất sử dụng phòng</span>
        <select
          className="focus:border-none"
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
        >
          <option value="Hôm nay">Hôm nay</option>
          <option value="7 ngày qua">7 ngày qua</option>
          <option value="Tháng này">Tháng này</option>
          <option value="Tháng trước">Tháng trước</option>
        </select>
      </div>

      <div className="chart-container">
        <LineChart
          xAxis={[
            {
              data: xAxisData, // Các ngày trong tháng (từ 1 đến số ngày hiện tại của tháng)
            },
          ]}
          series={[
            {
              data: selectedData, // Mảng dữ liệu tỷ lệ phần trăm công suất sử dụng phòng
              label: "Công suất sử dụng phòng (%)", // Đặt tên cho series
            },
          ]}
          height={400} // Đặt height lớn hơn
          className="chart"
        />
      </div>
    </div>
  );
};

export default RoomUsageLineChart;
