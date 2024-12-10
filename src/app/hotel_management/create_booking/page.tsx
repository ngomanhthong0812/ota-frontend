"use client"; // Add this line at the top

import React, { useState, useEffect, useCallback } from "react";
import BookingHeader from "@/components/booking/BookingHeader";
import CreatOrderTable from "@/components/booking/orderTable/creat_order_table";
import BookingSection from "@/components/booking/bookingSearch/BookingSection";
import OnlyRoom from "@/components/booking/Infomation/beforOrder/OnlyRoom";
import { PriceProvider } from "@/context/PriceContext.context";
import BtnNextOrder from "@/components/booking/btn/btn_next";
import BtnCreatOrder from "@/components/booking/btn/btn_creatOrder";
import { toast } from "react-toastify";
import { callApi } from "@/utils/api";
import { useAuth } from "@/context/auth.context";
import { useRouter } from "next/navigation";

// Định nghĩa các interface cho Room và RoomType
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

const CreateBookingPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<"room" | "info">("room");
  const [showCreatOrderTable, setShowCreatOrderTable] = useState(false);
  const [showBookingTab, setShowBookingTab] = useState(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const [isNextStep, setIsNextStep] = useState(false);
  const [roomId, setRoomId] = useState<number | null>(null);
  const [adultCount, setAdultCount] = useState<number>(1);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [priceRoom, setPriceRoom] = useState<number>(0);
  const [nameCustomer, setNameCustomer] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [customerGender, setCustomerGender] = useState<string>("");

  const router = useRouter();
  // Hàm xử lý hiển thị bảng CreatOrderTable khi click vào nút "+"
  const handleShowClick = (roomData: RoomType) => {
    setSelectedRoom(roomData);
    setShowCreatOrderTable(true);
  };

  // Hàm chuyển tiếp giữa các bước
  const handleNextButtonClick = () => {
    setCurrentView("info");
    setIsNextStep(true);
  };

  // Hàm xử lý dữ liệu phòng khi người dùng chọn
  const handleOrderData = useCallback(
    (
      roomId: number | null,
      adultCount: number,
      childrenCount: number,
      totalAmount: number,
      priceRoom: number
    ) => {
      setRoomId(roomId);
      setAdultCount(adultCount);
      setChildrenCount(childrenCount);
      setTotalAmount(totalAmount);
      setPriceRoom(priceRoom);
    },
    [] // chỉ cần gọi lại khi không có dependencies thay đổi
  );

  // Hàm xử lý dữ liệu khách hàng khi điền thông tin
  const handleCustomerData = (
    nameCustomer: string,
    customerPhone: string,
    customerEmail: string,
    customerGender: string
  ) => {
    setNameCustomer(nameCustomer);
    setCustomerPhone(customerPhone);
    setCustomerEmail(customerEmail);
    setCustomerGender(customerGender);
  };
  const { user } = useAuth();
  const hotelId = user?.hotel_id;
  // Chuẩn bị dữ liệu gửi đi
  const bookingData = {
    customer_name: nameCustomer,
    customer_phone: customerPhone,
    customer_email: customerEmail,
    customer_gender: customerGender,
    hotel_id: hotelId, // Hotel ID, có thể thay đổi tùy thuộc vào logic
    booking_rooms: [{ room_id: roomId, price: priceRoom }],
    children: childrenCount,
    adults: adultCount,
    total_amount: totalAmount,
    check_in_at: null,
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
    e.preventDefault();
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
      const response = await callApi<any>("/api/bookings", "POST", bookingData);

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
      toast.error("Vui lòng nhập đầy đủ thông tin");
    }
  };

  return (
    <main className="text-sm text-[var(--color-menu-icon-)] toolbar-top-type">
      <BookingHeader currentView={currentView} onToggleView={setCurrentView} />
      <PriceProvider>
        <div className="body_content py-2">
          <section>
            <div className="body_content-room grid grid-cols-1 grid-rows-none sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-10 xl:grid-cols-10 2xl:grid-cols-10 gap-3">
              {/* BookingSection */}
              <div className="col-span-7 flex flex-col h-80">
                {currentView === "room" && (
                  <BookingSection
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    showBookingTab={showBookingTab}
                    handleShowClick={handleShowClick}
                  />
                )}
                {currentView === "info" && (
                  <OnlyRoom onCustomerData={handleCustomerData} />
                )}
              </div>
              {/* CreatOrderTable */}
              <div className="col-span-3 flex flex-col">
                {showCreatOrderTable && (
                  <div className="col-span-3 duration-300">
                    {/* Hiển thị nút "Next" */}
                    {currentView === "room" && !isNextStep && (
                      <BtnNextOrder onToggleView={handleNextButtonClick} />
                    )}
                    {/* Hiển thị nút "Create Order" */}
                    {currentView === "info" && isNextStep && (
                      <BtnCreatOrder onToggleView={handleSubmit} />
                    )}
                    <CreatOrderTable
                      roomData={selectedRoom}
                      startDate={startDate}
                      endDate={endDate}
                      onOrderData={handleOrderData} // Đảm bảo gọi ngoài render
                    />
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </PriceProvider>
    </main>
  );
};

export default CreateBookingPage;
