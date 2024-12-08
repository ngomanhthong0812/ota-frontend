import React, { useEffect, useState } from "react";
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
interface CreatOrderTableProps {
  startDate: string;
  endDate: string;
  roomData: RoomType | null; // Dữ liệu phòng được truyền vào
  onOrderData: (
    roomId: number,
    adultCount: number,
    childrenCount: number,
    totalAmount: number,
    priceRoom: number
  ) => void;
}
const creatOrderTable: React.FC<CreatOrderTableProps> = ({
  startDate,
  endDate,
  roomData, // Nhận roomData từ props
  onOrderData,
}) => {
  const [paidAmount, setPaidAmount] = useState(0); // Số tiền đã thanh toán
  // Khởi tạo state cho số lượng người lớn và trẻ em
  const [quantityCapaciti, setQuantityCapaciti] = useState<number>(0); // Số lượng của người lớn
  const [quantityChildren, setQuantityChildren] = useState<number>(0); // Số lượng của trẻ em
  const [selectedRoomId, setSelectedRoomId] = useState<number>(0);
  const [isChecked, setIsChecked] = useState(false); // Theo dõi trạng thái checkbox

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked); // Cập nhật trạng thái checkbox
  };
  const handleRoomChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const roomId = parseInt(event.target.value, 10); // Chuyển đổi value thành số
    setSelectedRoomId(roomId); // Cập nhật ID của phòng đã chọn
    console.log("Selected room ID:", roomId); // Kiểm tra ID của phòng
  };
  // Hàm định dạng ngày và giờ
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${formattedDate} • ${formattedTime}`; // Không có dấu phẩy
  };

  // Hàm tính số ngày giữa startDate và endDate
  const calculateDaysBetweenDates = (
    startDate: string,
    endDate: string
  ): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Đặt thời gian của cả hai ngày về 00:00:00 để không tính thời gian
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    // Tính toán sự khác biệt giữa hai ngày
    const diffTime = end.getTime() - start.getTime();

    // Chuyển đổi sự khác biệt thành số ngày
    return diffTime / (1000 * 3600 * 24);
  };

  // Hàm cập nhật số lượng cho input 1
  const handleQuantityChangeCapaciti = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Math.min(Math.max(parseInt(e.target.value), 0), 5); // Giới hạn số lượng từ 0 đến 5
    setQuantityCapaciti(value);
  };

  // Hàm cập nhật số lượng cho input 2
  const handleQuantityChangeChildren = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Math.min(Math.max(parseInt(e.target.value), 0), 5); // Giới hạn số lượng từ 0 đến 5
    setQuantityChildren(value);
  };

  const totalDays = calculateDaysBetweenDates(startDate, endDate); // Tính số ngày giữa startDate và endDate
  const taxRate = 0.1; // 10% thuế/phí

  // Hàm tính toán tổng tiền
  const calculateTotalAmount = (
    roomPrice: number = 0,
    totalDays: number,
    taxRate: number = 0
  ): { subTotal: number; tax: number; totalAmount: number } => {
    const subTotal = roomPrice * totalDays;

    // Tính thuế chỉ khi checkbox được tích vào
    const tax = isChecked ? subTotal * taxRate : 0;

    const totalAmount = subTotal + tax;

    return { subTotal, tax, totalAmount };
  };

  const { subTotal, tax, totalAmount } = calculateTotalAmount(
    roomData?.daily_rate,
    totalDays,
    taxRate
  );

  // Tính phần còn lại
  const remainingAmount = Math.max(totalAmount - paidAmount, 0); // Không cho âm

  console.log("id", selectedRoomId);
  const priceRoom = roomData?.daily_rate ?? 0;

  useEffect(() => {
    onOrderData(
      selectedRoomId,
      quantityCapaciti,
      quantityChildren,
      totalAmount,
      priceRoom
    );
  }, [
    selectedRoomId,
    quantityCapaciti,
    quantityChildren,
    totalAmount,
    priceRoom,
    onOrderData,
  ]);

  return (
    <div className="">
      <section className="">
        <div className="px-3 rounded-md bg-white border border-[var(--ht-neutral-100-)] mt-2">
          <div className="grid grid-cols-12 text-sm border-b border-[var(--ht-neutral-100-)] text-black font-medium py-2">
            <div className="flex gap-2 col-span-10">
              {formatDateTime(startDate)} - {formatDateTime(endDate)}
            </div>
            <div className="flex col-span-2 justify-end items-center">
              <p className="flex items-center">{totalDays} đêm</p>
            </div>
          </div>

          <div className="flex justify-between mt-3">
            <div className=" gap-2 flex justify-between items-center">
              <div>
                <p className="text-black font-medium items-center ">
                  {roomData?.name}
                </p>
              </div>
              <div>
                <select
                  id="room"
                  name="room"
                  className="btn text-black font-normal"
                  onChange={handleRoomChange}
                >
                  <option></option>
                  {roomData?.rooms && roomData.rooms.length > 0 ? (
                    roomData.rooms.map((room, index) => (
                      <option key={index} value={room.room_id}>
                        {room.room_name}
                      </option>
                    ))
                  ) : (
                    <option disabled>Loading...</option> // Thêm thông báo nếu chưa có phòng
                  )}
                </select>
              </div>
            </div>
            <div className="flex justify-end items-center text-black font-medium">
              <span>{roomData?.daily_rate.toLocaleString()} VNĐ</span>
            </div>
          </div>

          <div className="flex gap-2 border-b border-[var(--ht-neutral-100-)] py-3 pb-28">
            <div className="flex gap-2">
              <div className="relative w-[90px]">
                {/* <!-- Icon người dùng phía trước --> */}
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
                  ></path>
                </svg>
                <input
                  type="number"
                  min="0"
                  max={roomData?.max_capacity}
                  value={quantityCapaciti}
                  onChange={handleQuantityChangeCapaciti}
                  name="country"
                  className="btn-soluong"
                />
              </div>

              <div className="relative w-[90px]">
                {/* <!-- Icon SVG mới phía trước --> */}
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
                  ></path>
                </svg>

                <input
                  type="number"
                  min="0"
                  max={roomData?.max_children}
                  value={quantityChildren}
                  onChange={handleQuantityChangeChildren}
                  name="country"
                  className="btn-soluong"
                />
              </div>
            </div>
          </div>

          <div className="flex py-2 justify-between pb-3">
            <div className="flex gap-2">
              <div className="flex items-center gap-1 ">
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
                  {quantityCapaciti}
                </span>
              </div>
              <div className="flex items-center gap-1 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="14"
                  width="14"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="#a0a2a7"
                    d="M152 88a72 72 0 1 1 144 0A72 72 0 1 1 152 88zM39.7 144.5c13-17.9 38-21.8 55.9-8.8L131.8 162c26.8 19.5 59.1 30 92.2 30s65.4-10.5 92.2-30l36.2-26.4c17.9-13 42.9-9 55.9 8.8s9 42.9-8.8 55.9l-36.2 26.4c-13.6 9.9-28.1 18.2-43.3 25l0 36.3-192 0 0-36.3c-15.2-6.7-29.7-15.1-43.3-25L48.5 200.3c-17.9-13-21.8-38-8.8-55.9zm89.8 184.8l60.6 53-26 37.2 24.3 24.3c15.6 15.6 15.6 40.9 0 56.6s-40.9 15.6-56.6 0l-48-48C70 438.6 68.1 417 79.2 401.1l50.2-71.8zm128.5 53l60.6-53 50.2 71.8c11.1 15.9 9.2 37.5-4.5 51.2l-48 48c-15.6 15.6-40.9 15.6-56.6 0s-15.6-40.9 0-56.6L284 419.4l-26-37.2z"
                  ></path>
                </svg>
                <span className="text-black font-medium">
                  {quantityChildren}
                </span>
              </div>
            </div>
            <div className="flex justify-end ">
              <span className="text-black font-medium">1 Phòng</span>
            </div>
          </div>

          {/* <!-- THành-tiền --> */}
          <div className="grid grid-cols-2 py-2 text-black font-medium">
            <div>
              <p className="text-xz">Thành tiền</p>
            </div>
            <div className="flex justify-end">
              <span className=" text-xz ">
                <span>{subTotal.toLocaleString()}</span>
              </span>
            </div>
          </div>

          {/* <!-- End-thành-tiền --> */}

          {/* <!--THuế-phí --> */}
          <div className="grid grid-cols-2 py-2 text-black font-medium">
            <div className="flex items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  id="subscribe"
                  name="subscribe"
                  className="checkbox-thuephi"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <span className="text-xz">Thuế/Phí</span>
              </label>
            </div>
            <div>
              <span className="flex justify-end text-xz">
                {tax.toLocaleString()}{" "}
              </span>
            </div>
          </div>
          {/* <!-- end- thue phi --> */}

          {/* <!-- Tổng-tiền --> */}
          <div className="grid grid-cols-2 py-2 text-black font-medium">
            <div>
              <p className="text-xz">Tổng tiền</p>
            </div>
            <div>
              <span className="flex justify-end text-xz">
                {totalAmount.toLocaleString()}
              </span>
            </div>
          </div>
          {/* <!-- End-Tổng-tiền--> */}

          <div className=" py-2 text-black font-medium">
            <p className="text-xz">Thanh toán</p>
          </div>

          <div className="flex gap-2">
            <select id="VND" name="VND" className="btn !w-auto">
              <option value="FR">VNĐ</option>
              <option value="US">USD</option>
              <option value="JP">EUR</option>
            </select>

            <select id="a" name="a" className="btn !w-auto">
              <option value="FR">Tiền mặt</option>
              <option value="US">Chuyển khoản</option>
            </select>

            <input
              type="text"
              id="passport"
              name="passport"
              value={paidAmount}
              onChange={(e) => setPaidAmount(parseFloat(e.target.value) || 0)}
              className="btn"
            />
          </div>
          {/* <!-- End-thanh-toan --> */}

          {/* <!-- Còn-lại --> */}
          <div className="grid grid-cols-2 py-4">
            <div>
              <p className="text-black font-medium">Còn lại</p>
            </div>
            <div>
              <span className="flex justify-end text-red-500 font-semibold text-xz ">
                {remainingAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default creatOrderTable;
