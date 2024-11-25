"use client"

import ChangeDateModal from "@/components/room/modals/change_date.modal";
import NavigationTabs from "@/components/layout/navigation_room_tabs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { use, useEffect, useState } from "react";
import useSWR, { Fetcher } from "swr";
import CheckOutAndPayModal from "@/components/room/modals/checkout_and_pay.modal";

const cookies = parseCookies();
const token = cookies.access_token;

interface Booking {
    id: number;
    booking_at: string;
    check_in_at: string;
    check_out_at: string;
    children: number;
    adults: number;
    status: string;
}
  
interface Hotel {
    id: number;
    name: string;
}

interface Room {
  id: number;
  name: string;
  price:number
  status: string;
  clean_status:boolean;
  room_type: string;
  room_type_id:number;
  floor_id:number;
  hotel_id:number;
  floor: string;
  hotel: Hotel;
  bookings: Booking[];
}

const ViewDetailRoom = ({ params }: { params: Promise<{ id: number }> }) => {

  const router = useRouter();

  const [roomName, setRoomName] = useState<string>("");
  const [roomPrice, setRoomPrice] = useState<number>(0);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalCheckOutAndPay, setShowModalCheckOutAndPay] = useState(false);

  const { id } = use(params);
  const fetcher = (url: string) =>
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  const { data, error, isLoading } = useSWR<Room>(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/room/details/${id}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    if(data) {
      setRoomName(data.name || "");
      setRoomPrice(data.price || 0);
      setBookings(data.bookings || []);
    }
  },[data])

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred.";

  const formattedPrice = new Intl.NumberFormat("vi-VN").format(roomPrice);

  const handleSaveDates = async (updatedCheckIn: string, updatedCheckOut: string) => {
    try {
      const bookingId = bookings[0]?.id;
      if (!bookingId) return;
  
      // Gửi yêu cầu cập nhật lên API
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings/${bookingId}`,
        {
          check_in_at: updatedCheckIn,
          check_out_at: updatedCheckOut,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 200) {
        // Cập nhật bookings trong state
        setBookings((prev) =>
          prev.map((booking) =>
            booking.id === bookingId
              ? { ...booking, check_in_at: updatedCheckIn, check_out_at: updatedCheckOut }
              : booking
          )
        );
      }
    } catch (error) {
      console.error("Failed to update booking dates:", error);
    }
  };
  

  return (
    <div>

      <NavigationTabs id={id} />

      <div className="bg-white border !border-[var(--ht-neutral-100-)] rounded-md">
        <div className="h-full">
          <div className="flex justify-end p-2 border-b !border-[var(--ht-neutral-100-)]">
            <button className="group w-10 h-10 border p-[6px] center border-[var(--navbar-color-)] rounded-md hover:bg-[var(--navbar-color-)] duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                className="text-green-500 w-4 h-4 group-hover:text-white"
              >
                <path
                  d="M12 4V20M20 12H4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-3">
            <div className="border-r !border-[var(--ht-neutral-100-)]">
              <div>
                <div className="flex items-center justify-between p-3 border-b !border-[var(--ht-neutral-100-)]">
                  <div className="flex items-center gap-3">
                    <p className="font-semibold text-black text-base">
                      {roomName}
                    </p>

                    <button className="group mt-1 relative">
                      <div className="bg-gray-500 w-24 text-white rounded-md py-1 hidden absolute top-full left-1/2 -translate-x-1/2 group-hover:block">
                        Tuỳ chọn
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2"></div>
                      </div>
                    </button>
                  </div>

                  <div>
                    
                    <CheckOutAndPayModal
                        showModal={showModalCheckOutAndPay}
                        closeModal={() => setShowModalCheckOutAndPay(false)}
                        roomName={roomName}
                        roomPrice={roomPrice}
                    />


                    <button className="btn-fn bg-[var(--room-not-arrived-color-100-)] text-[var(--room-not-arrived-color-)]"
                        onClick={() => setShowModalCheckOutAndPay(true)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-4 h-4 text-pink-500 font-bold"
                      >
                        <path
                          d="M11 3L10.3374 3.23384C7.75867 4.144 6.46928 4.59908 5.73464 5.63742C5 6.67576 5 8.0431 5 10.7778V13.2222C5 15.9569 5 17.3242 5.73464 18.3626C6.46928 19.4009 7.75867 19.856 10.3374 20.7662L11 21"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M21 12L11 12M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p>
                        <span>Trả phòng</span>
                      </p>
                    </button>
                  </div>
                </div>

                <div className="px-3">
                  <ul className="text-black font-medium">
                    <li className="py-4 border-b !border-[var(--ht-neutral-100-)]">
                      <div className="flex items-center justify-between">
                       
                        <ChangeDateModal
                            showModal={showModal}
                            closeModal={() => setShowModal(false)}
                            roomName={roomName}
                            checkInDate={
                                bookings.length > 0 
                                    ? new Date(bookings[0].check_in_at).toISOString().slice(0, 16) 
                                    : ""
                            }

                            checkOutDate={
                                bookings.length > 0 
                                    ? new Date(bookings[0].check_out_at).toISOString().slice(0, 16) 
                                    : ""
                            }
                            onSave={handleSaveDates}
                        />
                        
                        <div className="flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#000000"} fill={"none"}>
                                <path d="M18 2V4M6 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M10 17L9.99999 13.3472C9.99999 13.1555 9.86325 13 9.69458 13H9M13.6297 17L14.9842 13.3492C15.0475 13.1785 14.9128 13 14.7207 13H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6 8H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                            {bookings.length > 0 ? (
                                bookings.map((booking) => (
                                <div key={booking.id}>
                                    <p>Check-in: {new Date(booking.check_in_at).toLocaleString()}</p>
                                    <p>Check-out: {new Date(booking.check_out_at).toLocaleString()}</p>
                                </div>
                                ))
                            ) : (
                                <p>No bookings available</p>
                            )}
                        </div>

                        <button onClick={() => setShowModal(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#279656"} fill={"none"}>
                                <path d="M20.5 5.5H9.5C5.78672 5.5 3 8.18503 3 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M3.5 18.5H14.5C18.2133 18.5 21 15.815 21 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M18.5 3C18.5 3 21 4.84122 21 5.50002C21 6.15882 18.5 8 18.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M5.49998 16C5.49998 16 3.00001 17.8412 3 18.5C2.99999 19.1588 5.5 21 5.5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                      </div>
                    </li>

                    <li className="py-4 border-b !border-[var(--ht-neutral-100-)]">
                      <div className="flex items-center gap-2">
                        Mặc định {formattedPrice} VND
                      </div>
                    </li>

                    <li className="py-4 border-b !border-[var(--ht-neutral-100-)] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {bookings.map((booking) => (
                            <div key={booking.id} className="flex gap-2">
                                <p>{booking.adults} người lớn,</p>
                                <p>{booking.children} trẻ em</p>
                            </div>
                        ))}
                      </div>

                      <button className="group border border-green-400 hover:bg-[var(--navbar-color-)] duration-200 rounded-full p-[1px]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="text-green-500 w-4 h-4 group-hover:text-white"
                        >
                          <path
                            d="M12 4V20M20 12H4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </li>

                    <li className="py-4 border-b !border-[var(--ht-neutral-100-)] flex items-center justify-between">
                      <p className="flex items-center gap-2">Guest</p>

                      <button></button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-r !border-[var(--ht-neutral-100-)]">
              <div className="p-3">
                <textarea
                  name="note"
                  id="note"
                  rows={5}
                  cols={50}
                  className="btn"
                  placeholder="Ghi chú"
                ></textarea>

                <div className="flex items-center justify-between py-2 gap-x-1">
                  {/* <ChooseCompanySelect /> */}
                  <select className="btn">
                    <option value="" className="cursor-pointer">
                      Công ty A
                    </option>
                    <option value="" className="cursor-pointer">
                      Công ty B
                    </option>
                    <option value="" className="cursor-pointer">
                      Công ty C
                    </option>
                  </select>

                  <button className="group border border-green-400 hover:bg-[var(--navbar-color-)] duration-200 rounded-full p-[1px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-green-500 w-4 h-4 group-hover:text-white"
                    >
                      <path
                        d="M12 4V20M20 12H4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-x-2 py-1">
                  <div className="flex items-center gap-x-1">
                    {/* <SourceSelect /> */}

                    <select className="btn">
                      <option value="" selected disabled hidden>
                        Chọn nguồn
                      </option>
                      <option value="" className="cursor-pointer">
                        Mạng xã hội
                      </option>
                      <option value="" className="cursor-pointer">
                        Youtube
                      </option>
                      <option value="" className="cursor-pointer">
                        Facebook
                      </option>
                    </select>

                    <button className="group border border-green-400 hover:bg-[var(--navbar-color-)] duration-200 rounded-full p-[1px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-green-500 w-4 h-4 group-hover:text-white"
                      >
                        <path
                          d="M12 4V20M20 12H4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center gap-x-1">
                    {/* <ChooseTheMarketSelect /> */}

                    <select className="btn">
                      <option value="" selected disabled hidden>
                        Chọn thị trường
                      </option>
                      <option value="" className="cursor-pointer">
                        Việt Nam
                      </option>
                      <option value="" className="cursor-pointer">
                        Châu Á
                      </option>
                      <option value="" className="cursor-pointer">
                        Châu Âu
                      </option>
                    </select>

                    <button className="group border border-green-400 hover:bg-[var(--navbar-color-)] duration-200 rounded-full p-[1px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-green-500 w-4 h-4 group-hover:text-white"
                      >
                        <path
                          d="M12 4V20M20 12H4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex justify-end py-2">
                  <button className="py-1 px-8 border border-[var(--navbar-color-)] text-[var(--navbar-color-)] font-semibold rounded-md hover:bg-[var(--navbar-color-)] hover:text-white duration-200">
                    Lưu
                  </button>
                </div>
              </div>

              <div className="border-t !border-[var(--ht-neutral-100-)] py-2 px-4">
                <div>
                  <p className="flex items-center gap-2">Ăn sáng: 4/4 - 13/4</p>
                </div>
              </div>
            </div>

            <div className="p-3">
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-black font-medium">
                    Dịch vụ
                    <span className="text-gray-600 font-normal">
                      Tổng (VND): 100,000
                    </span>
                  </p>

                  <button className="group border border-green-400 hover:bg-[var(--navbar-color-)] duration-200 rounded-full p-[1px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-green-500 w-4 h-4 group-hover:text-white"
                    >
                      <path
                        d="M12 4V20M20 12H4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                <div className="mt-8">
                  <p>07/04 16:41 - Test</p>

                  <div className="flex items-center justify-between">
                    <p>Room key/ Thẻ khoá phòng(1)</p>

                    <div className="flex items-center gap-2">
                      <p>100,000</p>

                      <button className="bg-[var(--room-dirty-color-100-)] border-none rounded-full p-[1px]"></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailRoom;
