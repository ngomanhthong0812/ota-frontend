import { useState, useEffect } from "react";

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
  rooms: Room[]; // Mảng phòng
}

interface BookingTableProps {
  aroom: RoomType;
  handleShowClick: (roomData: RoomType) => void;
  setPriceTypeDad: React.Dispatch<React.SetStateAction<string>>;
  setRoomCountDad: React.Dispatch<React.SetStateAction<number>>;
}

const BookingTable: React.FC<BookingTableProps> = ({
  aroom,
  handleShowClick,
  setPriceTypeDad,
  setRoomCountDad,
}) => {
  // Quản lý trạng thái cục bộ cho mỗi BookingTable
  const [roomCount, setRoomCount] = useState<number>(0);
  const [priceType, setPriceType] = useState<
    "hourly_rate" | "daily_rate" | "overnight_rate"
  >("daily_rate");

  const incrementRoom = () => {
    setRoomCount((prev) => {
      const newRoomCount = prev + 1;
      return newRoomCount <= aroom.available_rooms ? newRoomCount : prev;
    });
    handleShowClick(aroom); // Gọi hàm từ cha để hiển thị CreateOrderTable
  };

  const decrementRoom = () => {
    setRoomCount((prev) => {
      const newRoomCount = prev > 0 ? prev - 1 : 0;
      return newRoomCount;
    });
  };
  useEffect(() => {
    setRoomCountDad(roomCount);
  }, [roomCount, setRoomCountDad]);
  const handlePriceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPriceType(
      event.target.value as "hourly_rate" | "daily_rate" | "overnight_rate"
    );
    setPriceTypeDad(
      event.target.value as "hourly_rate" | "daily_rate" | "overnight_rate"
    );
  };

  // Lấy giá tương ứng với loại giá được chọn
  const getPrice = () => {
    switch (priceType) {
      case "hourly_rate":
        return aroom.hourly_rate ? aroom.hourly_rate.toLocaleString() : "N/A";
      case "overnight_rate":
        return aroom.overnight_rate
          ? aroom.overnight_rate.toLocaleString()
          : "N/A";
      case "daily_rate":
      default:
        return aroom.daily_rate ? aroom.daily_rate.toLocaleString() : "N/A";
    }
  };

  return (
    <div className="flex-1 duration-300 border border-[var(--ht-neutral-100-)] rounded-md bg-white">
      <div className="flex border-b border-stone-300 p-3 font-medium">
        <div className="w-2/12 flex justify-start items-center">
          <p>
            {aroom.name}
            {aroom.overnight_rate}
          </p>
        </div>

        <div className="flex items-center w-4/12 gap-2 number-group">
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <button
              onClick={decrementRoom}
              className="decrement flex items-center justify-center w-9 h-9 border-r border-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 448 512"
              >
                <path
                  fill="#279656"
                  d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"
                />
              </svg>
            </button>

            <input
              type="text"
              value={roomCount}
              onChange={(e) => setRoomCount(Number(e.target.value) || 0)}
              className="numberInput w-9 text-center border-0 focus:ring-0"
            />

            <button
              onClick={incrementRoom}
              className="increment flex items-center justify-center w-9 h-9 border-l border-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 448 512"
              >
                <path
                  fill="#279656"
                  d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"
                />
              </svg>
            </button>
          </div>
          <div className="flex">
            {aroom.available_rooms}/{aroom.available_rooms} phòng
          </div>
        </div>

        <div className="w-2/12">
          <select
            id="room"
            name="room"
            className="btn-loaigia"
            value={priceType}
            onChange={handlePriceChange}
          >
            <option value="daily_rate">Giá theo ngày</option>
            <option value="hourly_rate">Giá theo giờ</option>
            <option value="overnight_rate">Giá qua đêm</option>
          </select>
        </div>

        <div className="w-2/12 flex justify-end items-center">
          <span>{getPrice()} VND</span>
        </div>

        <div className="w-2/12 flex justify-end items-center">
          <div className="flex gap-2">
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="13"
                width="13"
                viewBox="0 0 448 512"
              >
                <path
                  fill="#a0a2a7"
                  d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"
                />
              </svg>
              <span className="text-black font-medium">
                {aroom.standard_capacity}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="13"
                width="13"
                viewBox="0 0 448 512"
              >
                <path
                  fill="#a0a2a7"
                  d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"
                />
              </svg>
              <span className="text-black font-medium">
                {aroom.standard_children}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingTable;
