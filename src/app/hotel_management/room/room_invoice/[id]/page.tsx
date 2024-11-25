'use client'

import { FaPrint } from "react-icons/fa6";
import { CiCircleRemove } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { use, useEffect, useState } from "react";
import AddServicesModal from "@/components/room/modals/add_services.modal";
import { useRouter } from "next/navigation";
import NavigationTabs from "@/components/layout/navigation_room_tabs";
import { parseCookies } from "nookies";
import useSWR from "swr";
import CheckOutModal from "@/components/room/modals/checkout.modal";
import CheckOutAndPayModal from "@/components/room/modals/checkout_and_pay.modal";

const cookies = parseCookies();
const token = cookies.access_token;
const RoomInvoicePage = ({ params }: { params: Promise<{ id: number }> }) => {

    const router = useRouter();

    const [activeTab, setActiveTab] = useState<string>("denHienTai");
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [roomName, setRoomName] = useState<string>("");
    const [roomPrice, setRoomPrice] = useState<number>("");
    const [showModalCheckOut, setShowModalCheckOut] = useState(false);
    const [showModalCheckOutAndPay, setShowModalCheckOutAndPay] = useState(false);

    const formattedPrice = new Intl.NumberFormat("vi-VN").format(roomPrice);

    const {id} = use(params);

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
    const { data, error, isLoading } = useSWR(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/room/${id}`,
      fetcher,
      {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }
    );
  
    useEffect(() => {
      if(data) {
        setRoomName(data.data.name)
        setRoomPrice(data.data.price)
      }
    },[data])
  
    if (isLoading) return "Loading...";
    if (error) return "An error has occurred.";


    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    
    return (
      <div>
        
        <NavigationTabs id={id}/>

        <div className="flex items-center justify-between gap-1 mb-3">
          <button
            className={`w-1/2 py-2 text-sm font-medium text-black bg-gray-200 rounded-md 
                                ${
                                  activeTab === "denHienTai"
                                    ? "bg-green-400 text-white"
                                    : "bg-gray-200"
                                }`}
            onClick={() => setActiveTab("denHienTai")}
          >
            Đến hiện tại
          </button>
          <button
            className={`w-1/2 py-2 text-sm text-black bg-gray-200 rounded-md font-medium
                                ${
                                  activeTab === "denKhiTraPhong"
                                    ? "bg-green-400 text-white"
                                    : "bg-gray-200"
                                }`}
            onClick={() => setActiveTab("denKhiTraPhong")}
          >
            Đến khi trả phòng
          </button>
        </div>

        {activeTab === "denHienTai" && (
          <>
            <div className="flex flex-wrap bg-white p-3 rounded-md">
              <div className="basis-[100%] md:basis-[55%] pr-3">
                <div className="">
                  <div className="flex items-center justify-between text-black text-xl font-bold py-3 border-b !border-[var(--ht-neutral-100-)]">
                    <p>
                      <span>Hoá đơn</span>
                    </p>
                    <p className="price">
                      <span>{formattedPrice} VND</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-4 py-3 border-b !border-[var(--ht-neutral-100-)]">
                    <div className="col-span-1">
                      <p>
                        <span>Tiền phòng</span>
                      </p>
                    </div>
                    <div className="flex flex-col col-span-3">
                      <div className="flex justify-between py-1">
                        <span>Giá đêm (03/04 21:00 - 04/04 12:00)</span>
                        <div>300,000</div>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Giá đêm (03/04 21:00 - 04/04 12:00)</span>
                        <div>300,000</div>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Nhận phòng sớm (49 phút)</span>
                        <div>50,000</div>
                      </div>
                    </div>
                  </div>

                  <div className="text-left py-3 border-b !border-[var(--ht-neutral-100-)]">
                    <div className="">
                      <div className="flex items-center gap-2 text-green-500">
                        <button
                          className="group border border-green-400 hover:bg-[var(--navbar-color-)] duration-200 rounded-full p-[1px]"
                          onClick={openModal}
                        >
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
                        Dịch vụ
                        <AddServicesModal
                          isOpen={isModalOpen}
                          onClose={closeModal}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 py-3 border-b !border-[var(--ht-neutral-100-)]">
                    <div className="col-span-1 font-medium text-green-400">
                      <p>
                        <span>Giảm giá</span>
                      </p>
                    </div>
                    <div className="flex flex-col col-span-2">
                      <p>
                        <span>0</span>
                      </p>
                    </div>
                    <div className="col-span-1 text-right">
                      <p>
                        <span>0</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-left py-3 border-b !border-[var(--ht-neutral-100-)]">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <p>
                        <span>Thuế/Phí</span>
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 pb-3">
                    <div className="col-span-1"></div>
                    <div className="flex flex-col col-span-3 font-medium text-black">
                      <div>
                        <div className="flex items-center justify-between py-2 border-b !border-[var(--ht-neutral-100-)]">
                          <p>
                            <span>Cần thanh toán</span>
                          </p>
                          <p>
                            <span>0</span>
                          </p>
                        </div>

                        <div className="flex items-center justify-between py-2 border-b !border-[var(--ht-neutral-100-)]">
                          <p>
                            <span>Đã thanh toán</span>
                          </p>
                          <p>
                            <span>0</span>
                          </p>
                        </div>

                        <div className="flex items-center justify-between py-2 border-b !border-[var(--ht-neutral-100-)]">
                          <p>
                            <span>Còn lại</span>
                          </p>
                          <p>
                            <span>0</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 md: col-span-2 border-l !border-[var(--ht-neutral-100-)] pl-3">
                <div className="flex justify-end border-b !border-[var(--ht-neutral-100-)] pb-2">

                  <button className="btn-fn bg-[var(--room-not-arrived-color-100-)] text-[var(--room-not-arrived-color-)]"
                    onClick={() => setShowModalCheckOutAndPay(true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width={24}
                      height={24}
                      color={"#EA3DA1"}
                      fill={"none"}
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

                <div className="flex items-center gap-6 py-2 font-medium text-black">
                  <div className="flex items-center gap-2">
                    <input type="radio" name="payment-option" />
                    <p>
                      <span>Thanh toán</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <input type="radio" name="payment-option" />
                    <p>
                      <span>Hoàn tiền</span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-5 py-2">
                  <div className="flex flex-col col-span-1">
                    <label htmlFor="" className="mb-1">
                      Hình thức TT
                    </label>

                    <select name="" id="" className="btn">
                      <option value="">Tiền mặt</option>
                      <option value="">Thẻ tín dụng</option>
                      <option value="">Chuyển khoản NH</option>
                      <option value="">Công nợ</option>
                    </select>
                  </div>

                  <div className="flex flex-col col-span-1">
                    <label htmlFor="" className="mb-1">
                      Tiền tệ
                    </label>

                    <select name="" id="" className="btn">
                      <option value="">VND</option>
                      <option value="">USD</option>
                    </select>
                  </div>

                  <div className="flex flex-col col-span-1">
                    <label htmlFor="" className="mb-1">
                      Số tiền
                    </label>

                    <input type="number" name="soTien" className="btn" />
                  </div>
                </div>

                <div className="py-2">
                  <textarea
                    name="note"
                    id="note"
                    rows={5}
                    cols={50}
                    className="w-full btn px-2"
                    placeholder="Note"
                  ></textarea>
                </div>

                <div className="flex justify-end border-b !border-[var(--ht-neutral-100-)] pb-2">
                  <button className="btn-fn bg-blue-100 text-[#60a5fa]"
                    onClick={() => setShowModalCheckOut(true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width={24}
                      height={24}
                      color={"#1FADA4"}
                      fill={"none"}
                    >
                      <path
                        d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M14.7102 10.0611C14.6111 9.29844 13.7354 8.06622 12.1608 8.06619C10.3312 8.06616 9.56136 9.07946 9.40515 9.58611C9.16145 10.2638 9.21019 11.6571 11.3547 11.809C14.0354 11.999 15.1093 12.3154 14.9727 13.956C14.836 15.5965 13.3417 15.951 12.1608 15.9129C10.9798 15.875 9.04764 15.3325 8.97266 13.8733M11.9734 6.99805V8.06982M11.9734 15.9031V16.998"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <p>
                      <span>Thanh toán</span>
                    </p>
                  </button>
                </div>

                <div className="py-2">
                  <div>
                    <span className="font-medium">Đã thanh toán</span>
                  </div>

                  <div className="border-b !border-[var(--ht-neutral-100-)] py-2 checkout-detail">
                    <div className="flex items-center justify-between">
                      <p>City view 102 (Tiền mặt)</p>
                      <span className="font-medium text-[#fa6060] price">
                        -100,000 VND
                      </span>
                      <div className="gap-2 select hidden">
                        <FaPrint />
                        <button className="bg-[var(--room-dirty-color-100-)] border-none rounded-full p-[1px]">
                          <CiCircleRemove />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-[#8a8a8a]">
                      16:36-07-04-2022-Test
                    </p>
                    <p className="text-xs text-[#8a8a8a]">
                      Khach tim duoc the phong
                    </p>
                  </div>

                  <div className="border-b !border-[var(--ht-neutral-100-)] py-2 checkout-detail">
                    <div className="flex items-center justify-between">
                      <p>City view 102 (Tiền mặt)</p>
                      <span className="font-medium text-[#60a5fa] price">
                        +2,750,000 VND
                      </span>
                      <div className="gap-2 select hidden">
                        <FaPrint />
                        <button className="bg-[var(--room-dirty-color-100-)] border-none rounded-full p-[1px]">
                          <CiCircleRemove />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-[#8a8a8a]">
                      16:36-07-04-2022-Test
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "denKhiTraPhong" && (
          <>
            <div className="flex flex-wrap bg-white p-3 rounded-md">
              <div className="basis-[100%] md:basis-[55%] pr-3">
                <div className="">
                  <div className="flex items-center justify-between text-black text-xl font-bold py-3 border-b !border-[var(--ht-neutral-100-)]">
                    <p>
                      <span>Hoá đơn</span>
                    </p>
                    <p className="price">
                      <span>{formattedPrice} VND</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-4 py-3 border-b !border-[var(--ht-neutral-100-)]">
                    <div className="col-span-1">
                      <p>
                        <span>Tiền phòng</span>
                      </p>
                    </div>
                    <div className="flex flex-col col-span-3">
                      <div className="flex justify-between py-1">
                        <span>Giá đêm (03/04 21:00 - 04/04 12:00)</span>
                        <div>300,000</div>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Giá đêm (03/04 21:00 - 04/04 12:00)</span>
                        <div>300,000</div>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Nhận phòng sớm (49 phút)</span>
                        <div>50,000</div>
                      </div>
                    </div>
                  </div>

                  <div className="text-left py-3 border-b !border-[var(--ht-neutral-100-)]">
                    <div className="">
                      <div className="flex items-center gap-2 text-green-500">
                        <button
                          className="group border border-green-400 hover:bg-[var(--navbar-color-)] duration-200 rounded-full p-[1px]"
                          onClick={openModal}
                        >
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
                        Dịch vụ
                        <AddServicesModal
                          isOpen={isModalOpen}
                          onClose={closeModal}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 py-3 border-b !border-[var(--ht-neutral-100-)]">
                    <div className="col-span-1 font-medium text-green-400">
                      <p>
                        <span>Giảm giá</span>
                      </p>
                    </div>
                    <div className="flex flex-col col-span-2">
                      <p>
                        <span>0</span>
                      </p>
                    </div>
                    <div className="col-span-1 text-right">
                      <p>
                        <span>0</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-left py-3 border-b !border-[var(--ht-neutral-100-)]">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <p>
                        <span>Thuế/Phí</span>
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 pb-3">
                    <div className="col-span-1"></div>
                    <div className="flex flex-col col-span-3 font-medium text-black">
                      <div>
                        <div className="flex items-center justify-between py-2 border-b !border-[var(--ht-neutral-100-)]">
                          <p>
                            <span>Cần thanh toán</span>
                          </p>
                          <p>
                            <span>0</span>
                          </p>
                        </div>

                        <div className="flex items-center justify-between py-2 border-b !border-[var(--ht-neutral-100-)]">
                          <p>
                            <span>Đã thanh toán</span>
                          </p>
                          <p>
                            <span>0</span>
                          </p>
                        </div>

                        <div className="flex items-center justify-between py-2 border-b !border-[var(--ht-neutral-100-)]">
                          <p>
                            <span>Còn lại</span>
                          </p>
                          <p>
                            <span>0</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 md: col-span-2 border-l !border-[var(--ht-neutral-100-)] pl-3">
                <div className="flex justify-end border-b !border-[var(--ht-neutral-100-)] pb-2">
                  <button className="btn-fn bg-[var(--room-not-arrived-color-100-)] text-[var(--room-not-arrived-color-)]"
                    onClick={() => setShowModalCheckOutAndPay(true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width={24}
                      height={24}
                      color={"#EA3DA1"}
                      fill={"none"}
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

                <div className="flex items-center gap-6 py-2 font-medium text-black">
                  <div className="flex items-center gap-2">
                    <input type="radio" name="payment-option" />
                    <p>
                      <span>Thanh toán</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <input type="radio" name="payment-option" />
                    <p>
                      <span>Hoàn tiền</span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-5 py-2">
                  <div className="flex flex-col col-span-1">
                    <label htmlFor="" className="mb-1">
                      Hình thức TT
                    </label>

                    <select name="" id="" className="btn">
                      <option value="">Tiền mặt</option>
                      <option value="">Thẻ tín dụng</option>
                      <option value="">Chuyển khoản NH</option>
                      <option value="">Công nợ</option>
                    </select>
                  </div>

                  <div className="flex flex-col col-span-1">
                    <label htmlFor="" className="mb-1">
                      Tiền tệ
                    </label>

                    <select name="" id="" className="btn">
                      <option value="">VND</option>
                      <option value="">USD</option>
                    </select>
                  </div>

                  <div className="flex flex-col col-span-1">
                    <label htmlFor="" className="mb-1">
                      Số tiền
                    </label>

                    <input type="number" name="soTien" className="btn" />
                  </div>
                </div>

                <div className="py-2">
                  <textarea
                    name="note"
                    id="note"
                    rows={5}
                    cols={50}
                    className="w-full btn px-2"
                    placeholder="Note"
                  ></textarea>
                </div>

                <div className="flex justify-end border-b !border-[var(--ht-neutral-100-)] pb-2">
                  <button className="btn-fn bg-blue-100 text-[#60a5fa]"
                    onClick={() => setShowModalCheckOut(true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width={24}
                      height={24}
                      color={"#1FADA4"}
                      fill={"none"}
                    >
                      <path
                        d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M14.7102 10.0611C14.6111 9.29844 13.7354 8.06622 12.1608 8.06619C10.3312 8.06616 9.56136 9.07946 9.40515 9.58611C9.16145 10.2638 9.21019 11.6571 11.3547 11.809C14.0354 11.999 15.1093 12.3154 14.9727 13.956C14.836 15.5965 13.3417 15.951 12.1608 15.9129C10.9798 15.875 9.04764 15.3325 8.97266 13.8733M11.9734 6.99805V8.06982M11.9734 15.9031V16.998"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <p>
                      <span>Thanh toán</span>
                    </p>
                  </button>
                </div>

                <div className="py-2">
                  <div>
                    <span className="font-medium">Đã thanh toán</span>
                  </div>

                  <div className="border-b !border-[var(--ht-neutral-100-)] py-2 checkout-detail">
                    <div className="flex items-center justify-between">
                      <p>City view 102 (Tiền mặt)</p>
                      <span className="font-medium text-[#fa6060] price">
                        -100,000 VND
                      </span>
                      <div className="gap-2 select hidden">
                        <FaPrint />
                        <button className="bg-[var(--room-dirty-color-100-)] border-none rounded-full p-[1px]">
                          <CiCircleRemove />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-[#8a8a8a]">
                      16:36-07-04-2022-Test
                    </p>
                    <p className="text-xs text-[#8a8a8a]">
                      Khach tim duoc the phong
                    </p>
                  </div>

                  <div className="border-b !border-[var(--ht-neutral-100-)] py-2 checkout-detail">
                    <div className="flex items-center justify-between">
                      <p>City view 102 (Tiền mặt)</p>
                      <span className="font-medium text-[#60a5fa] price">
                        +2,750,000 VND
                      </span>
                      <div className="gap-2 select hidden">
                        <FaPrint />
                        <button className="bg-[var(--room-dirty-color-100-)] border-none rounded-full p-[1px]">
                          <CiCircleRemove />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-[#8a8a8a]">
                      16:36-07-04-2022-Test
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <CheckOutAndPayModal
                    showModal={showModalCheckOutAndPay}
                    closeModal={() => setShowModalCheckOutAndPay(false)}
                    roomName={roomName}
                    roomPrice={roomPrice}
                  />        

        <CheckOutModal 
          showModal={showModalCheckOut}
          closeModal={() => setShowModalCheckOut(false)}
        />
      </div>
    );
}

export default RoomInvoicePage;