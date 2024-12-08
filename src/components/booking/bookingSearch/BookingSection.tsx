import React, { useState } from "react";
import BookingTab from "@/components/booking/BookingTab";
import { toast } from "react-toastify";
import { callApi } from "@/utils/api";
import { useAuth } from "@/context/auth.context";

interface Room {
  room_id: number;
  room_name: string;
  room_clean_status: number;
  room_status: string;
  room_price: number;
  room_notes: string;
  room_start_date_use: string;
  room_room_type_id: number;
  room_floor_id: number;
  room_hotel_id: number;
}

interface RoomType {
  id: number;
  name: string;
  standard_capacity: number;
  max_capacity: number;
  standard_children: number;
  max_children: number;
  hourly_rate: number;
  daily_rate: number;
  overnight_rate: number;
  total_rooms: number;
  available_rooms: number;
  rooms: Room[];
}

interface BookingSectionProps {
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  showBookingTab: boolean;
  handleShowClick: (roomData: RoomType) => void;
}

const BookingSection: React.FC<BookingSectionProps> = ({
  setStartDate,
  setEndDate,
  handleShowClick,
}) => {
  // Tạo state cho startDate và endDate
  const [startDate, setStartDateS] = useState<string>(""); // Ban đầu là chuỗi rỗng
  const [endDate, setEndDateS] = useState<string>(""); // Ban đầu là chuỗi rỗng
  const [dataResponse, setDataResponse] = useState<RoomType[]>([]);
  const [totalRooms, settotalRoom] = useState<number>(0);
  const { user } = useAuth();
  const hotelId = user?.hotel_id;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Ngừng việc gửi lại form mặc định
    try {
      const response = await callApi<any>(
        `/api/bookings/available/rooms?hotelId=${hotelId}&startDate=${startDate}&endDate=${endDate}`,
        "GET"
      );

      if (response.data.statusCode === 200) {
        setStartDate(startDate);
        setEndDate(endDate);
        setDataResponse(response?.data?.data);
        const totalRooms = response.data.data.reduce(
          (sum: number, roomType: any) => {
            return sum + roomType.available_rooms;
          },
          0
        );
        settotalRoom(totalRooms);
      } else {
        toast.error(
          response.data.message || "Có lỗi xảy ra, vui lòng thử lại."
        );
      }
    } catch (err: any) {
      console.error("Error: ", err);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
    }
  };

  return (
    <div>
      {/* Checkin-Checkout-Search */}
      <section className="mb-2 duration-300 border border-neutral-100 rounded-md relative bg-white p-2.5">
        <div className="flex justify-between">
          {/* checkin-checkout */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <input
                type="datetime-local"
                id="check-in"
                className="focus:outline-none bg-white rounded"
                placeholder="Ngày giờ nhận phòng"
                value={startDate}
                onChange={(e) => setStartDateS(e.target.value)}
              />
              <span className="flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="14"
                  width="14"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="#18191b"
                    d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                  />
                </svg>
              </span>
              <input
                type="datetime-local"
                id="check-out"
                className="focus:outline-none bg-white rounded"
                placeholder="Ngày giờ trả phòng"
                value={endDate}
                onChange={(e) => setEndDateS(e.target.value)}
              />
            </div>
          </div>
          {/* search */}
          <div
            className="flex justify-center items-center cursor-pointer"
            onClick={handleSubmit}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="15"
              width="15"
              viewBox="0 0 512 512"
            >
              <path
                fill="#279656"
                d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Table list Room */}
      <section className="flex-1 duration-300 border border-neutral-100 rounded-md bg-white">
        {dataResponse.length === 0 ? (
          <div className="flex border-b border-stone-300 pb-4 p-3 px-3 gap-6 font-medium h-80 justify-center items-center">
            <p>Chọn ngày để tìm phòng trống</p>
          </div>
        ) : totalRooms === 0 ? (
          <div className="flex border-b border-stone-300 pb-4 p-3 px-3 gap-6 font-medium h-80 justify-center items-center">
            <p>Không còn phòng trống vui lòng chọn ngày khác</p>
          </div>
        ) : (
          <BookingTab
            totalRooms={totalRooms}
            handleShowClick={handleShowClick}
            dataResponse={dataResponse}
          />
        )}
      </section>

      <div className="flex text-sm mt-2">
        <span className="text-red-500">*</span>
        <p>
          Phòng thẳng chặn: phòng thẳng chặn có thể book mà không phải chuyển
          phòng
        </p>
      </div>
    </div>
  );
};

export default BookingSection;
