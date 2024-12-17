import React, { useEffect, useRef, useState } from "react";
interface Room {
  room_id: number;
  room_name: string;
  room_price: number;
  [key: string]: any;
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
    adultCount: number,
    childrenCount: number,
    totalAmount: number,
    paidAmount: number | string,
    paymentMethod: string | "Cash"
  ) => void;
  priceTypeDad: string;
  roomCountDad: number;
  handlebookingRoomsChange: (selectedRooms: Room[]) => void;
}
const creatOrderTable: React.FC<CreatOrderTableProps> = ({
  startDate, 
  endDate,
  roomData, // Nhận roomData từ props
  onOrderData,
  priceTypeDad,
  roomCountDad,
  handlebookingRoomsChange,
}) => {
  const [paidAmount, setPaidAmount] = useState<number | string>(""); // Giá trị thô
  const [paymentMethod, setPaymentMethod] = useState<string>("Cash");
  // Khởi tạo state cho số lượng người lớn và trẻ em
  const [quantityCapaciti, setQuantityCapaciti] = useState<number>(0); // Số lượng của người lớn
  const [quantityChildren, setQuantityChildren] = useState<number>(0); // Số lượng của trẻ em
  const [selectedRoomId, setSelectedRoomId] = useState<number>(0);
  const [isChecked, setIsChecked] = useState(false); // Theo dõi trạng thái checkbox

  useEffect(() => {
    if (roomData?.rooms[0]?.room_id) {
      setSelectedRoomId(roomData.rooms[0].room_id);
    }
  }, [roomData?.rooms])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\./g, ""); // Xóa dấu chấm
    if (!isNaN(Number(rawValue)) || rawValue === "") {
      setPaidAmount(rawValue); // Lưu giá trị thô
    }
  };
  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPaymentMethod(e.target.value); // Cập nhật phương thức thanh toán
  };
  const handleBlur = () => {
    const numericPaidAmount = Number(paidAmount);
    if (!isNaN(numericPaidAmount)) {
      setPaidAmount(numericPaidAmount); // Lưu lại giá trị thô dưới dạng số
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked); // Cập nhật trạng thái checkbox
  };
  const handleRoomChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const roomId = parseInt(event.target.value, 10); // Chuyển đổi value thành số
    setSelectedRoomId(roomId); // Cập nhật ID của phòng đã chọn
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
  let priceRoomType = 0;
  switch (priceTypeDad) {
    case "hourly_rate":
      priceRoomType = roomData?.hourly_rate ?? 0;
      break;
    case "daily_rate":
      priceRoomType = roomData?.daily_rate ?? 0;
      break;
    case "overnight_rate":
      priceRoomType = roomData?.overnight_rate ?? 0;
      break;
    default:
      priceRoomType = roomData?.daily_rate ?? 0;
      break;
  }
  // Hàm tính toán tổng tiền
  const calculateTotalAmount = (
    roomPrice: number = 0, // Giá tiền mỗi phòng
    totalDays: number = 1, // Tổng số ngày (mặc định 1 nếu không được truyền)
    taxRate: number = 0, // Tỉ lệ thuế (mặc định 0)
    roomCountDad: number = 1 // Số lượng phòng (mặc định 1)
  ): { subTotal: number; tax: number; totalAmount: number } => {
    // Tính tiền trước thuế (subtotal)
    const subTotal = roomPrice * totalDays * roomCountDad;

    // Tính thuế (chỉ khi checkbox được chọn)
    const tax = isChecked ? subTotal * taxRate : 0;

    // Tính tổng tiền (total)
    const totalAmount = subTotal + tax;

    return { subTotal, tax, totalAmount };
  };

  // Sử dụng hàm
  const { subTotal, tax, totalAmount } = calculateTotalAmount(
    priceRoomType, // Giá tiền mỗi phòng
    totalDays, // Tổng số ngày
    taxRate, // Tỉ lệ thuế
    roomCountDad // Số lượng phòng
  );

  // Tính phần còn lại
  const numericPaidAmount =
    typeof paidAmount === "number" ? paidAmount : parseFloat(paidAmount);
  const remainingAmount = Math.max(
    totalAmount - (isNaN(numericPaidAmount) ? 0 : numericPaidAmount)
  );

  // Gửi dữ liệu phòng về cha khi roomCountDad > 1
  const prevRoomCountDad = useRef(roomCountDad);
  const prevRoomData = useRef(roomData);
  const prevPriceTypeDad = useRef(priceTypeDad);
  const prevSelectedRoomId = useRef(selectedRoomId);
  useEffect(() => {
    // Kiểm tra nếu giá trị thay đổi thực sự
    if (
      roomCountDad > 1 &&
      (roomCountDad !== prevRoomCountDad.current ||
        roomData !== prevRoomData.current ||
        priceTypeDad !== prevPriceTypeDad.current)
    ) {
      const selectedRooms = roomData?.rooms
        .slice(0, roomCountDad)
        .map((room) => ({
          room_id: room.room_id,
          room_name: room.room_name,
          room_price: priceRoomType, // Lấy giá theo priceTypeDad hoặc default là hourly_rate
        }));
      handlebookingRoomsChange(selectedRooms ?? []); // Gửi mảng phòng đã chọn về cha

      // Lưu lại giá trị cũ để so sánh trong lần sau
      prevRoomCountDad.current = roomCountDad;
      prevRoomData.current = roomData;
      prevPriceTypeDad.current = priceTypeDad;
    }

    // Kiểm tra nếu chỉ có 1 phòng được chọn và selectedRoomId thay đổi
    if (roomCountDad === 1 && selectedRoomId !== prevSelectedRoomId.current) {
      const selectedRoom = roomData?.rooms.find(
        (room) => room.room_id === selectedRoomId
      );
      if (selectedRoom) {
        handlebookingRoomsChange([
          {
            room_id: selectedRoom.room_id,
            room_name: selectedRoom.room_name,
            room_price: priceRoomType,
          },
        ]);
      }
      prevSelectedRoomId.current = selectedRoomId; // Cập nhật selectedRoomId
    }
  }, [roomCountDad, roomData, priceTypeDad, handlebookingRoomsChange]);
  // ------------------------
  useEffect(() => {
    onOrderData(
      quantityCapaciti,
      quantityChildren,
      remainingAmount,
      paidAmount,
      paymentMethod
    );
  }, [
    quantityCapaciti,
    quantityChildren,
    remainingAmount,
    paidAmount,
    paymentMethod,
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
              <p className="flex items-center">{roomData?.overnight_rate} đêm</p>
            </div>
          </div>

          <div className="flex justify-between mt-3">
            <div className=" gap-2 flex justify-between items-center">
              <div>
                <p className="text-black font-medium items-center ">
                  {roomData?.name}{}
                </p>
              </div>
              <div>
                {roomCountDad > 1 ? (
                  <div className="text-black font-normal">x {roomCountDad}</div> // Nếu số phòng > 1, hiển thị số phòng
                ) : (
                  <select
                    id="room"
                    name="room"
                    className="btn text-black font-normal"
                    onChange={handleRoomChange}
                  >
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
                )}
              </div>
            </div>
            <div className="flex justify-end items-center text-black font-medium flex-col">
              <span>{priceRoomType.toLocaleString()} VNĐ</span>
            </div>
          </div>
          {roomCountDad > 1 ? (
            <ul className="flex gap-5">
              {roomData?.rooms.slice(0, roomCountDad).map((room, index) => (
                <li key={index}>{room.room_name}</li>
              ))}
            </ul>
          ) : (
            <div></div>
          )}

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
              <span className="text-black font-medium">
                {roomCountDad} Phòng
              </span>
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

            <select
              id="a"
              name="a"
              className="btn !w-auto"
              value={paymentMethod} // Liên kết với state
              onChange={handlePaymentMethodChange} // Xử lý sự kiện khi thay đổi
            >
              <option value="Cash">Tiền mặt</option>
              <option value="Bank_transfer">Chuyển khoản</option>
            </select>

            <input
              type="text"
              id="paidAmount"
              name="paidAmount"
              value={paidAmount.toLocaleString()}
              onChange={handleInputChange}
              onBlur={handleBlur}
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
