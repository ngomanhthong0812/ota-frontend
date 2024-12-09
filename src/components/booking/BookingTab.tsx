"use client";
import BookingList from "./BookingList";
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
interface BookingTabProps {
  handleShowClick: (roomData: RoomType) => void;
  dataResponse: RoomType[];
  totalRooms: number;
}

const BookingTab: React.FC<BookingTabProps> = ({
  handleShowClick,
  dataResponse,
  totalRooms,
}) => {
  console.log(dataResponse);

  return (
    <div className="body_content-room ">
      <div className="col-span-7 flex flex-col">
        {/* Hiển thị tổng số phòng */}
        <section className="flex-1 duration-300 border border-[var(--ht-neutral-100-)] px-3 rounded-md bg-white">
          <div className="flex border-b border-stone-300  py-3  font-medium">
            <div className="w-2/12">
              <p>Loại phòng</p>
            </div>
            <div className="w-4/12">
              <p>Số phòng {totalRooms}(còn lại) </p>
            </div>
            <div className="w-2/12">
              <p>Loại giá</p>
            </div>
            <div className="w-2/12 justify-end flex">
              <p>Giá mặc định</p>
            </div>
            <div className="w-2/12 justify-end flex">
              <p>Khách</p>
            </div>
          </div>
        </section>

        {/* Bảng booking */}
        <BookingList handleShowClick={handleShowClick} data={dataResponse} />
      </div>
    </div>
  );
};

export default BookingTab;
