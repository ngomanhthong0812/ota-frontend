import React, { LegacyRef, useContext, useEffect, useMemo, useRef, useState } from "react";
import { TypeRoomCard } from "@/types/backend";
import InputGuest from "./inputs/InputGuest";
import InputRoom from "./inputs/InputRoom";
import InputPayment from "./inputs/InputPayment";
import CountNight from "./inputs/CountNight";
import { useAuth } from "@/context/auth.context";
import { toast } from "react-toastify";
import { callApi } from "@/utils/api";
import { useRouter } from "next/navigation";
import { inititalFormContext } from "@/context/form.context";
import{DateType,  RoomStateType, PaymentType, CustomerType} from "@/types/types";
import DateIput from "./inputs/Date";


interface BookingFormProps {
  closeBookingForm: () => void;
  data: TypeRoomCard;
  dataResponses: RoomTypes[];  // Thêm dataResponse vào props
}
interface Room {
  room_id: number;              // ID của phòng
  room_name: string;            // Tên phòng
  room_clean_status: number;    // Trạng thái vệ sinh (1: sạch, 0: bẩn)
  room_status: string;          // Trạng thái phòng (Trống, Đặt trước, ...)
  room_price: number;           // Giá phòng
  room_notes: string;           // Ghi chú về phòng
  room_start_date_use: string;  // Ngày bắt đầu sử dụng phòng
  room_room_type_id: number;    // ID loại phòng
  room_floor_id: number;        // ID tầng
  room_hotel_id: number;        // ID khách sạn
}

// Interface cho RoomType (loại phòng)
interface RoomTypes {
  id: number;                   // ID loại phòng
  name: string;                 // Tên loại phòng
  standard_capacity: number;    // Sức chứa tiêu chuẩn (số người lớn)
  max_capacity: number;         // Sức chứa tối đa (số người lớn)
  standard_children: number;    // Sức chứa tiêu chuẩn cho trẻ em
  max_children: number;         // Sức chứa tối đa cho trẻ em
  hourly_rate: number;          // Giá theo giờ
  daily_rate: number;           // Giá theo ngày
  overnight_rate: number;       // Giá qua đêm
  total_rooms: number;          // Tổng số phòng
  available_rooms: number;      // Số phòng còn trống
  rooms: Room[];                // Mảng phòng thuộc loại phòng này
}


export const FormContext = React.createContext<{
  countNight: number;
  date: DateType;
  room: RoomStateType;
  payment: PaymentType;
  customer: CustomerType;
  setRoom: React.Dispatch<React.SetStateAction<RoomStateType>>;
  setPayment: React.Dispatch<React.SetStateAction<PaymentType>>;
  setCustomer: React.Dispatch<React.SetStateAction<CustomerType>>;
  setDate: React.Dispatch<React.SetStateAction<DateType>>;
  setCountNight: React.Dispatch<React.SetStateAction<number>>;
}>(inititalFormContext);

export const useFormContext = () => {
  return useContext(FormContext);
};

const BookingForm: React.FC<BookingFormProps> = ({
  closeBookingForm,
  data,
  dataResponses,


}) => {

     const [availableRoom, setAvailableRoom] = useState<RoomTypes | null>(null); // Phòng trống


  const router = useRouter();
  
  //  State đếm số đêm
  const [countNight, setCountNight] = useState<number>(0);
  // State ngày đên và ngày đi
  const [date, setDate] = useState<DateType>({
    startDate: "",
    endDate: "",
  });
  // State thông tin phòng
  const [room, setRoom] = useState<RoomStateType>({
    defaultPrice: null,
    roomId: null,
    roomType: "",
    roomNumber: null,
    source: "",
    adults: 0,
    children: 0,
  });
  // State thông tin khách hàng
  const [customer, setCustomer] = useState<CustomerType>({
    guestName: "",
    guestID: "",
    guestEmail: "",
    guestPhone: "",
    gender: null,
  });
  // State thông tin thanh toán
  const [payment, setPayment] = useState<PaymentType>({
    subTotal: 0, // Thành tiền
    taxFee: 0, // Thuế
    paidAmount: 0, // Số tiền đã thanh toán
    remainingAmount: 0, // Số tiền còn lại
    totalAmount: 0, // Tổng tiền
    paymentMethod: null,
  });

  // lấy userId, hotel_id và token từ useAuth
  const { user, token } = useAuth();
  const hotelId = user?.hotel_id;



  // Lấy các field cần thiết từ object truyền vào bookingData
  const { gender, guestEmail, guestID, guestName, guestPhone } = customer;
  const {
    roomId,
    adults,
    children,
    defaultPrice,
    roomNumber,
    roomType,
    source,
  } = room;
  const { paidAmount, remainingAmount, taxFee, totalAmount ,paymentMethod } = payment;
  const { startDate, endDate } = date;

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
    paidAmount: paidAmount || 0,
    paymentMethod: paymentMethod,
  };
  const validateBookingData = (data: any) => {
    // Kiểm tra trường bắt buộc: customer_name
    if (!data.customer_name || data.customer_name.trim() === "") {
      return "Tên khách hàng không được để trống.";
    }

    // Kiểm tra trường bắt buộc: customer_phone (có thể kiểm tra định dạng số điện thoại)
    if (!data.customer_phone || String(data.customer_phone).trim() === "") {
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

  const formContextValue = useMemo(
    () => ({
      room,
      payment,
      customer,
      date,
      setRoom,
      setPayment,
      setCustomer,
      setDate,
      countNight,
      setCountNight,
    }),
    [
      room,
      payment,
      customer,
      date,
      setRoom,
      setPayment,
      setCustomer,
      setDate,
      countNight,
      setCountNight,
    ]
  );


  return (
    <FormContext.Provider value={formContextValue}>
      <div className="fixed inset-0 bg-[#0000004c] z-[100] flex justify-end">
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
            đặt phòng nhanh 
          </h2>
          <div className="flex my-2 justify-between">
            <div>
              <h2 className="text-xz font-[500]">Thông tin phòng</h2>
              
            </div>
            {/* Số đêm */}
            <CountNight />
          </div>

          {/* Ngày giờ */}
          <DateIput />

          {/* Nhập thông tin phòng */}
          <InputRoom data={data} dataResponses={dataResponses}/> 
          

          <h2 className="my-2 text-sm  font-medium">Khách đại diện</h2>
          <ul>
      </ul>

          {/* Nhập thông tin khách hàng */}
          <InputGuest />

          {/* Thông tin thanh toán */}
          <InputPayment />

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
    </FormContext.Provider>
  );
};

export default BookingForm;
