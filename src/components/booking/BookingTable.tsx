import React, { useState } from "react";


interface BookingTableProps {
  aroom: {
    id: number;
    name: string;
    price: number;
    available: string;
  };
  handleShowClick: () => void;
}

const Bookingtable: React.FC<BookingTableProps> = ({aroom, handleShowClick }) => {
  const [roomCount, setRoomCount] = useState<number>(0);
  console.log(aroom); // Kiểm tra dữ liệu room
  


  const incrementRoom = () =>{
    setRoomCount((prev) => prev + 1); 
    handleShowClick(); // Gọi hàm từ cha để hiển thị CreateOrderTable
  } 
  const decrementRoom = () => setRoomCount((prev) => (prev > 0 ? prev - 1 : 0));

  return (
    
    
      <div className="flex-1 duration-300 border border-[var(--ht-neutral-100-)] rounded-md bg-white">
        <div >
      <div className="flex border-b border-stone-300  p-3 font-medium">
        {/** Tên phòng */}
        <div className="w-2/12 flex justify-start items-center">
        <p>{aroom.name}</p>
        </div>

        {/** Thêm giảm số phòng */}
        <div className="flex items-center w-4/12 gap-2 number-group">
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            {/* Nút giảm */}
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

            {/* Input hiển thị số lượng */}
            <input
              type="text"
              value={roomCount}
              onChange={(e) => setRoomCount(Number(e.target.value) || 0)}
              className="numberInput w-9 text-center border-0 focus:ring-0"
            />

            {/* Nút tăng */}
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

          {/* Thông tin số lượng */}
          <p>{aroom.available} còn lại</p>
          <span>*</span>
        </div>

        {/* Loại giá */}
        <div className="w-2/12">
          <select id="room" name="room" className="btn-loaigia">
            <option value="FR">Giá mặc định</option>
            <option value="US">Giá được giảm</option>
          </select>
        </div>

        {/* Giá */}
        <div className="w-2/12 flex justify-end  items-center">
        <p>{aroom.price.toLocaleString()} VND</p>
        </div>

        {/* Số lượng khách */}
        <div className="w-2/12 flex justify-end items-center">
          <div className="flex gap-2">

          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" height="13" width="13" viewBox="0 0 448 512">
              <path
                fill="#a0a2a7"
                d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"
              />
            </svg>
            <span className="text-black font-medium">2</span>
          </div>

          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 448 512">
              <path
                fill="#a0a2a7"
                d="M152 88a72 72 0 1 1 144 0A72 72 0 1 1 152 88zM39.7 144.5c13-17.9 38-21.8 55.9-8.8L131.8 162c26.8 19.5 59.1 30 92.2 30s65.4-10.5 92.2-30l36.2-26.4c17.9-13 42.9-9 55.9 8.8s9 42.9-8.8 55.9l-36.2 26.4c-13.6 9.9-28.1 18.2-43.3 25l0 36.3-192 0 0-36.3c-15.2-6.7-29.7-15.1-43.3-25L48.5 200.3c-17.9-13-21.8-38-8.8-55.9zm89.8 184.8l60.6 53-26 37.2 24.3 24.3c15.6 15.6 15.6 40.9 0 56.6s-40.9 15.6-56.6 0l-48-48C70 438.6 68.1 417 79.2 401.1l50.2-71.8zm128.5 53l60.6-53 50.2 71.8c11.1 15.9 9.2 37.5-4.5 51.2l-48 48c-15.6 15.6-40.9 15.6-56.6 0s-15.6-40.9 0-56.6L284 419.4l-26-37.2z"
              />
            </svg>
            <span className="text-black font-medium">0</span>
          </div>

          </div>
        </div>
      </div>
    </div>
    </div>
   
  );
};

export default Bookingtable;
