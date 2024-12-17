import React, { useEffect, useState } from "react";
import { useFormContext } from "../BookingForm";

const CountNight = () => {
  const {
    countNight: countNights,
    setCountNight: setCountNights,
    date,
    setDate,
  } = useFormContext();
  const { startDate, endDate } = date;

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

  const countNightsCalculated = calculateNights(startDate, endDate); // Tổng số đêm lưu vào countNightsCalculated

  // Hàm xử lý CountNight
  useEffect(() => {
    if (countNights !== undefined) {
      if (setCountNights) {
        setCountNights(countNightsCalculated);
      }
    }
  }, [countNightsCalculated]); // Chạy khi data.price thay đổi

  // Hàm tăng endDate lên một ngày
  const increaseEndDate = () => {
    const newEndDate = new Date(endDate);

    newEndDate.setHours(0, 0, 0, 0); // Đặt giờ, phút, giây về 00:00:00 để tránh sự thay đổi không mong muốn

    newEndDate.setDate(newEndDate.getDate() + 1); // Cộng thêm 1 ngày

    // Tạo lại chuỗi ngày theo định dạng YYYY-MM-DDTHH:mm để giữ nguyên giờ, phút
    const newEndDateStr = `${newEndDate.getFullYear()}-${(
      newEndDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${newEndDate
      .getDate()
      .toString()
      .padStart(2, "0")}T${newEndDate
      .getHours()
      .toString()
      .padStart(2, "0")}:${newEndDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    setDate((prev) => ({ ...prev, endDate: newEndDateStr }));
  };

  // Hàm giảm endDate xuống một ngày, không giảm qua ngày startDate
  const decreaseEndDate = () => {
    const newEndDate = new Date(endDate);
    const startDateObj = new Date(startDate); // Lấy ngày startDate để so sánh

    // Đặt giờ, phút, giây về 00:00:00 để tránh sự thay đổi không mong muốn
    newEndDate.setHours(0, 0, 0, 0);
    startDateObj.setHours(0, 0, 0, 0); // Đảm bảo startDate cũng có giờ là 00:00:00

    // Nếu endDate không nhỏ hơn startDate, mới thực hiện giảm
    if (newEndDate > startDateObj) {
      newEndDate.setDate(newEndDate.getDate() - 1); // Giảm đi 1 ngày
      // Tạo lại chuỗi ngày theo định dạng YYYY-MM-DDTHH:mm để giữ nguyên giờ, phút
      const newEndDateStr = `${newEndDate.getFullYear()}-${(
        newEndDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${newEndDate
        .getDate()
        .toString()
        .padStart(2, "0")}T${newEndDate
        .getHours()
        .toString()
        .padStart(2, "0")}:${newEndDate
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;

      setDate((prev) => ({ ...prev, endDate: newEndDateStr }));
    }
  };

  // Hàm giảm số đêm
  const decrementNights = () => {
    if (setCountNights) {
      setCountNights((prev) => Math.max(0, prev - 1)); // Không giảm xuống âm
    }

    // Sau khi giảm số đêm, giảm ngày kết thúc
    decreaseEndDate();
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        {/* Button trừ */}
        <button onClick={decrementNights}>
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
        <p className="text-[var(--room-empty-color-)] px-3">
          {countNights} đêm
        </p>
        {/* Button cộng */}
        <button onClick={increaseEndDate}>
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
