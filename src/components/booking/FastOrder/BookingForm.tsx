import React, { LegacyRef, useEffect, useRef, useState } from "react";
import { TypeRoomCard } from "@/types/backend";
import Date from "./inputs/Date";
import InputGuest from "./inputs/InputGuest";
import InputRoom from "./inputs/InputRoom";
import InputPayment from "./inputs/InputPayment";
import CountNight from "./inputs/CountNight";
import { useAuth } from "@/context/auth.context";
import { toast } from "react-toastify";
import { callApi } from "@/utils/api";
import { useRouter } from "next/navigation";

interface BookingFormProps {
  closeBookingForm: () => void;
  data: TypeRoomCard;
}

const BookingForm: React.FC<BookingFormProps> = ({
  closeBookingForm,
  data,
}) => {
  const router = useRouter();
  // Thông tin ngày giờ
  const [startDate, setStartDate] = useState(""); // Ngày bắt đầu
  const [endDate, setEndDate] = useState(""); // Ngày kết thúc

  const [CountNights, setCountNights] = useState<number>(0); // Số đêm
  const [defaultPrice, setDefaultPrice] = useState<number | undefined>(
    undefined
  ); // Giá mặc định roomprice
  const [roomId, setRoomId] = useState<number | undefined>(undefined); // ID phòng

  // Thông tin phòng
  const [roomType, setRoomType] = useState(""); // Loại phòng (Sea View,...)
  const [roomNumber, setRoomNumber] = useState(""); // Số phòng (101,...)

  const [source, setSource] = useState(""); // Nguồn đặt phòng

  // Thông tin số lượng người
  const [adults, setAdults] = useState(0); // Số người lớn (mặc định 0)
  const [children, setChildren] = useState(0); // Số trẻ em (mặc định 0)

  // Thông tin khách
  const [guestName, setGuestName] = useState(""); // Tên khách đại diện
  const [guestID, setGuestID] = useState(""); // CCCD/Hộ chiếu
  const [guestEmail, setGuestEmail] = useState(""); // Email
  const [guestPhone, setGuestPhone] = useState(""); // Số điện thoại
  const [gender, setGender] = useState(""); // Giới tính

  // Thông tin thanh toán
  const [totalAmount, setTotalAmount] = useState(0); // Thành tiền
  const [taxFee, setTaxFee] = useState(0); // Thuế/Phí
  const [paidAmount, setPaidAmount] = useState(0); // Số tiền thanh toán
  const [remainingAmount, setRemainingAmount] = useState(0); // Còn lại

  // Hàm xử lý khi người dùng thay đổi ngày bắt đầu
  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartDate(event.target.value);
  };

  // Hàm xử lý khi người dùng thay đổi ngày kết thúc
  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  // Hàm xử lý  giá mặc định
  useEffect(() => {
    if (data?.price !== undefined) {
      setDefaultPrice(data.price);
    }
  }, [data.price]); // Chạy khi data.price thay đổi

  const { user, token } = useAuth();
  const hotelId = user?.hotel_id;

  // Chuẩn bị dữ liệu gửi đi
  const bookingData = {
    customer_name: guestName,
    customer_phone: guestPhone,
    customer_email: guestEmail,
    customer_gender: gender,
    hotel_id: hotelId, // Hotel ID, có thể thay đổi tùy thuộc vào logic
    booking_rooms: [{ room_id: roomId, price: defaultPrice }],
    children: children,
    adults: adults,
    total_amount: totalAmount,
    check_in_at: startDate,
    check_out_at: endDate,
  };
  const validateBookingData = (data: any) => {
    // Kiểm tra trường bắt buộc: customer_name
    if (!data.customer_name || data.customer_name.trim() === "") {
      return "Tên khách hàng không được để trống.";
    }

    // Kiểm tra trường bắt buộc: customer_phone (có thể kiểm tra định dạng số điện thoại)
    if (!data.customer_phone || data.customer_phone.trim() === "") {
      return "Số điện thoại không được để trống.";
    }

    // Kiểm tra trường bắt buộc: hotel_id
    if (!data.hotel_id) {
      return "ID khách sạn không được để trống.";
    }

    // Kiểm tra trường bắt buộc: booking_rooms (có ít nhất 1 phòng được chọn)
    if (!data.booking_rooms || data.booking_rooms.length === 0) {
      return "Cần chọn ít nhất 1 phòng.";
    }

    // Kiểm tra các phòng trong booking_rooms (đảm bảo mỗi phòng có room_id và price hợp lệ)
    for (const room of data.booking_rooms) {
      if (!room.room_id || !room.price) {
        return "Thông tin phòng không hợp lệ.";
      }
    }

    // Kiểm tra ngày check-in và check-out (check-in phải nhỏ hơn check-out)
    if (!data.check_out_at) {
      return "Ngày nhận phòng ko được để trống.";
    }

    // Nếu không có lỗi, trả về null
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // e.preventDefault();
    console.log("Data trước khi gửi:", bookingData);
    // Kiểm tra dữ liệu trước khi gửi API
    const validationError = validateBookingData(bookingData);

    // Nếu có lỗi, hiển thị thông báo lỗi và dừng lại
    if (validationError) {
      toast.error(validationError);
      return; // Dừng lại nếu có lỗi
    }
    try {
      // Gọi API và xử lý phản hồi
      const response = await callApi<any>(
        "/api/bookings",
        "POST",
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );

      console.log("response", response);

      // Kiểm tra mã trạng thái trả về
      if (response.data.statusCode === 200) {
        // Nếu thành công, thông báo thành công
        toast.success(`Đặt phòng thành công`);
        router.push("/hotel_management/room_layout");
      } else {
        toast.error(
          response.data.message || "Có lỗi xảy ra vui lòng thử lại sau."
        );
      }
    } catch (error) {
      toast.error("Vui lòng nhập đầy đủ thông tin 12445r56r6");
    }
  };

  return (
    <div className="fixed inset-0 bg-[#00000080] z-[100] flex justify-end">
      <div className="absolute max-w-[440px] text-[14px] h-full px-3 text-[var(--color-menu-icon-)] bg-white">
        <div className="absolute top-2 left-[-25px] ">
          {/* Close button X */}
          <button onClick={closeBookingForm}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              width="20"
              viewBox="0 0 512 512"
            >
              <path
                fill="#ffffff"
                stroke="white"
                strokeWidth="10"
                d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"
              />
            </svg>
          </button>
        </div>
        <h2 className="uppercase bottom-line font-[500] !py-3 text-xz">
          đặt phòng nhanh {roomId}
        </h2>
        <div className="flex my-2 justify-between">
          <div>
            <h2 className="text-xz font-[500]">Thông tin phòng</h2>
          </div>
          {/* Số đêm */}
          <CountNight
            startDate={startDate}
            endDate={endDate}
            CountNights={CountNights}
            setCountNights={setCountNights}
          />
        </div>

        {/* Ngày giờ */}
        <Date
          startDate={startDate}
          endDate={endDate}
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
        />

        {/* Nhập thông tin phòng */}
        <InputRoom
          roomType={roomType}
          setRoomType={setRoomType}
          roomNumber={roomNumber}
          setRoomNumber={setRoomNumber}
          source={source}
          setSource={setSource}
          adults={adults}
          setAdults={setAdults}
          children={children}
          setChildren={setChildren}
          data={data}
          defaultPrice={defaultPrice}
          roomId={roomId}
          setRoomId={setRoomId}
        />

        <h2 className="my-2 text-sm  font-medium">Khách đại diện</h2>

        {/* Nhập thông tin khách hàng */}
        <InputGuest
          guestName={guestName}
          setGuestName={setGuestName}
          guestID={guestID}
          setGuestID={setGuestID}
          guestEmail={guestEmail}
          setGuestEmail={setGuestEmail}
          guestPhone={guestPhone}
          setGuestPhone={setGuestPhone}
          gender={gender}
          setGender={setGender}
        />

        {/* Thông tin thanh toán */}
        <InputPayment
          defaultPrice={defaultPrice}
          CountNights={CountNights}
          setCountNights={setCountNights}
          totalAmount={totalAmount}
          setTotalAmount={setTotalAmount}
          taxFee={taxFee}
          setTaxFee={setTaxFee}
          paidAmount={paidAmount}
          setPaidAmount={setPaidAmount}
          remainingAmount={remainingAmount}
          setRemainingAmount={setRemainingAmount}
        />

        {/* Button đặt phòng */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleSubmit}
            className="flex items-center justify-center bg-[var(--room-empty-color-)] text-white font-bold py-2 px-4 rounded hover:bg-[var(--room-empty-color-hover-)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="16"
              viewBox="0 0 448 512"
              className="mr-2"
            >
              <path
                fill="#ffffff"
                d="M64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80zM0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
              />
            </svg>
            Đặt Phòng
          </button>
          {/* Button nhận phòng */}
          <button className="flex items-center justify-center bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="15"
              width="15"
              viewBox="0 0 640 512"
              className="mr-2"
            >
              <path d="M32 32c17.7 0 32 14.3 32 32l0 256 224 0 0-160c0-17.7 14.3-32 32-32l224 0c53 0 96 43 96 96l0 224c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-32-224 0-32 0L64 416l0 32c0 17.7-14.3 32-32 32s-32-14.3-32-32L0 64C0 46.3 14.3 32 32 32zm144 96a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"></path>
            </svg>
            Nhận Phòng
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
