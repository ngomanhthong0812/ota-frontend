import React, { useState, useEffect } from "react";

interface BookingTableProps {
  aroom: {
    id: number;
    name: string;
    price: number;
    available: string;
    standard_capacity: number; 
    standard_children: number; 
    max_capacity: number; 
    max_children: number; 
    room_id: number; 
    room_name: string; 
  };
  handleShowClick: (roomData: { id: number; name: string; price: number;  max_capacity: number;  max_children: number; room_id: number; room_name: string;  }) => void;
}

const BookingTable: React.FC<BookingTableProps> = ({ aroom, handleShowClick }) => {
  const [roomCount, setRoomCount] = useState<number>(0);//đếm số phòng
  const [roomData, setRoomData] = useState<{ id: number; name: string; price: number;  max_capacity: number;  max_children: number; room_id: number; room_name: string; }>({
    id: 0,
    name: "",
    price: 0,
    max_capacity: 0,
    max_children: 0,
    room_id: 0,
    room_name: "",
  });

  // Cập nhật roomData khi prop aroom thay đổi
  useEffect(() => {
    setRoomData({
      id: aroom.id,       // Lưu id của phòng
      name: aroom.name,   // Lưu tên phòng
      price: aroom.price, // Lưu giá phòng
      max_capacity: aroom.max_capacity, // Lưu max_capacity
      max_children: aroom.max_children, // Lưu max_children
      room_id: aroom.room_id, // Lưu room_id
      room_name: aroom.room_name, // Lưu room_name
    });
    console.log("Dữ liệu phòng đã được cập nhật:", roomData);
  }, [aroom]);

  const incrementRoom = ({}) => {
    setRoomCount((prev) => prev + 1);
    handleShowClick(roomData); // Gọi hàm từ cha để hiển thị CreateOrderTable
  };

  const decrementRoom = () => setRoomCount((prev) => (prev > 0 ? prev - 1 : 0));

  return (
    <div className="flex-1 duration-300 border border-[var(--ht-neutral-100-)] rounded-md bg-white">
      <div className="flex border-b border-stone-300 p-3 font-medium">
        <div className="w-2/12 flex justify-start items-center">
          <p>{aroom.name}</p>
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

          {/* <p>{aroom.available}/{aroom.available} còn lại *</p> */}
        </div>

        <div className="w-2/12">
          <select id="room" name="room" className="btn-loaigia">
            <option value="FR">Giá mặc định</option>
            <option value="US">Giá được giảm</option>
          </select>
        </div>

        <div className="w-2/12 flex justify-end items-center">
          <p>{aroom.price ? aroom.price.toLocaleString() : 'N/A'} VND</p>
        </div>

        <div className="w-2/12 flex justify-end items-center">
          <div className="flex gap-2">
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" height="13" width="13" viewBox="0 0 448 512">
                <path
                  fill="#a0a2a7"
                  d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"
                />
              </svg>
              <span className="text-black font-medium">{aroom.standard_capacity}</span>
            </div>

            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" height="13" width="13" viewBox="0 0 448 512">
                <path
                  fill="#a0a2a7"
                  d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"
                />
              </svg>
              <span className="text-black font-medium">{aroom.standard_children}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingTable;
