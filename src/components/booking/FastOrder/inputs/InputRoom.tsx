import { RoomAPIResponse, TypeRoomCard } from "@/types/backend";
import React, { useEffect, useState } from "react";
import { useFormContext } from "../BookingForm";
import useFormatPriceWithCommas from "@/hook/useFormatPriceWithCommas";
import { PriceProvider, usePrice } from "@/context/PriceContext.context";
import { useAuth } from "@/context/auth.context";
import { callApi } from "@/utils/api";
import { toast } from "react-toastify";

interface IPutRoom {
  data: TypeRoomCard;
}

const InputRoom: React.FC<IPutRoom> = ({ data }) => {
  const { room, setRoom } = useFormContext();
  const {
    roomType,
    roomNumber,
    source,
    adults,
    children,
    roomId,
    defaultPrice,
  } = room;
  const { formatPrice } = useFormatPriceWithCommas();

  const roomTypeMap: Record<number, string> = {
    1: "Stardar",
    2: "Sea view",
    3: "City view",
    4: "Familys",
  };

  const roomTypeDescriptions: Record<string, string> = {
    Stardar: "(Phòng cơ bản)",
    "Sea View": "(Phòng view Biển)",
    "City view": "(Phòng view phố)",
    Familys: "(Phòng gia đình)",
  };

  // Set the initial values of roomType and roomNumber when the component is mounted
  useEffect(() => {
    console.log("Dữ liệu của data:", data); // Log dữ liệu data
    if (data?.room_type && setRoom) {
      setRoom((prev) => ({ ...prev, roomType: data.room_type }));
    }
    if (data?.name && setRoom) {
      setRoom((prev) => ({ ...prev, roomNumber: Number(data.name) }));
    }
    if (data?.id !== undefined && setRoom) {
      setRoom((prev) => ({ ...prev, roomId: data.id }));
    }
    if (data?.overnightRate_price !== undefined && setRoom) {
      setRoom((prev) => ({ ...prev, defaultPrice: data.overnightRate_price }));
    }
  }, [data, setRoom]);

  // Hàm xử lý khi người dùng chọn loại phòng
  const handleRoomTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRoom((prev) => ({ ...prev, room_type: event.target.value }));
  };

  // Hàm xử lý khi người dùng chọn số phòng
  const handleRoomNumberChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRoom((prev) => ({ ...prev, roomId: Number(event.target.value) }));
  };

  // Hàm xử lý chọn nguồn
  const handleSourceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRoom((prev) => ({ ...prev, source: event.target.value }));
  };

  // Hàm xử lý khi người dùng chọn số người lớn
  const handleAdultsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoom &&
      setRoom((prev) => ({ ...prev, adults: Number(event.target.value) }));
  };
  // Hàm xử lý khi người dùng chọn số trẻ em
  const handleChildrenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoom &&
      setRoom((prev) => ({ ...prev, children: Number(event.target.value) }));
  };

  return (
    <PriceProvider>
      <div>
        {/* Loại phòng */}
        <div className="flex my-2 gap-2">
          <div className="w-1/2">
            <select
              id="country"
              name="country"
              className="btn"
              value={roomType}
              onChange={handleRoomTypeChange}
            >
              <option value={data.id}>
                {data.room_type}{" "}
                {roomTypeDescriptions[data.room_type] || "(Ghi chú không có)"}
              </option>
            </select>
          </div>

          {/* Số Phòng*/}
          <div className="w-1/2">
            <select
              id="room"
              name="room"
              className="btn"
              value={roomNumber ?? ""}
              onChange={handleRoomNumberChange}
            >
              <option value={data.id}>{data.name}</option>
            </select>
          </div>
        </div>
        {/* kiểu giá */}
        <div className="flex my-2 gap-2">
          <div className="w-1/2">
            <select id="country" name="country" className="btn">
              <option value="FR">Giá mặc định</option>
              <option value="US">Giá được giảm</option>
            </select>
          </div>
          {/* Giá phòng*/}
          <div className="w-1/2 flex justify-end items-center text-center">
            {}
            <p className=" text-xz ">
              {" "}
              {formatPrice(String(defaultPrice ?? ""))} VNĐ
            </p>
          </div>
        </div>
        {/* Nguồn đặt phòng */}
        <div className="flex my-2 gap-2 bottom-line">
          <div className="flex-1">
            <select id="country" name="country" className="btn">
              <option value="FR">Chọn nguồn</option>
              <option value="US">Online</option>
              <option value="JP">Email</option>
            </select>
          </div>
          {/* Số lượng người lơn và trẻ nhỏ */}
          <div className="flex gap-2 flex-1">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-2 top-1/2 transform -translate-y-1/2"
                height="13"
                width="13"
                viewBox="0 0 448 515"
              >
                <path
                  fill="#a0a2a7"
                  d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"
                />
              </svg>
              <input
                type="number"
                min="0"
                placeholder="0"
                value={adults}
                name="country"
                className="btn !p-2 !pl-6"
                onChange={handleAdultsChange}
              />
            </div>

            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="14"
                width="14"
                className="absolute left-2 top-1/2 transform -translate-y-1/2"
                viewBox="0 0 448 512"
              >
                <path
                  fill="#a0a2a7"
                  d="M152 88a72 72 0 1 1 144 0A72 72 0 1 1 152 88zM39.7 144.5c13-17.9 38-21.8 55.9-8.8L131.8 162c26.8 19.5 59.1 30 92.2 30s65.4-10.5 92.2-30l36.2-26.4c17.9-13 42.9-9 55.9 8.8s9 42.9-8.8 55.9l-36.2 26.4c-13.6 9.9-28.1 18.2-43.3 25l0 36.3-192 0 0-36.3c-15.2-6.7-29.7-15.1-43.3-25L48.5 200.3c-17.9-13-21.8-38-8.8-55.9zm89.8 184.8l60.6 53-26 37.2 24.3 24.3c15.6 15.6 15.6 40.9 0 56.6s-40.9 15.6-56.6 0l-48-48C70 438.6 68.1 417 79.2 401.1l50.2-71.8zm128.5 53l60.6-53 50.2 71.8c11.1 15.9 9.2 37.5-4.5 51.2l-48 48c-15.6 15.6-40.9 15.6-56.6 0s-15.6-40.9 0-56.6L284 419.4l-26-37.2z"
                />
              </svg>

              <input
                type="number"
                min="0"
                placeholder="0"
                value={children}
                name="country"
                className="btn !p-2 !pl-6"
                onChange={handleChildrenChange}
              />
            </div>
          </div>
        </div>
      </div>
    </PriceProvider>
  );
};

export default InputRoom;
