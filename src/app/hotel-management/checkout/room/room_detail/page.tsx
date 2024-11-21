"use client"

import React, { useEffect, useState } from "react";

import ChooseCompanySelect from "@/components/selects/choose_company.select";
import SourceSelect from "@/components/selects/source.select";
import ChooseTheMarketSelect from "@/components/selects/choose_the_market.select";
import ChangeDateModal from "@/components/modals/change_date.modal";
import { FaCirclePlus } from "react-icons/fa6";


// Component chi tiết phòng
const RoomDetailContent = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const [roomInfo, setRoomInfo] = useState({
        checkIn: "2024-11-21T14:00",
        checkOut: "2024-11-23T12:00",
      });

      const [formattedDates, setFormattedDates] = useState({
        checkIn: "",
        checkOut: "",
      });

      useEffect(() => {
        setFormattedDates({
          checkIn: new Date(roomInfo.checkIn).toLocaleString(),
          checkOut: new Date(roomInfo.checkOut).toLocaleString(),
        });
      }, [roomInfo]);  

    const handleSaveModal = (data: { checkIn: string; checkOut: string }) => {
        setRoomInfo(data); // Cập nhật thông tin từ modal
    };

  return (
    <div>
      <div className="bg-white border !border-[var(--ht-neutral-100-)] rounded-md">
        <div className="h-full">
          <div className="flex justify-end p-2 border-b !border-[var(--ht-neutral-100-)]">
            <button className="group w-10 h-10 border p-[6px] center border-[var(--navbar-color-)] rounded-md hover:bg-[var(--navbar-color-)] duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="text-green-500 w-4 h-4 group-hover:text-white">
                <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-3">
            <div className="border-r !border-[var(--ht-neutral-100-)]">
              <div>
                <div className="flex items-center justify-between p-3 border-b !border-[var(--ht-neutral-100-)]">
                  <div className="flex items-center gap-3">
                    <p className="font-semibold text-black text-base">
                      City view 102
                    </p>

                    <button className="group mt-1 relative">
                      <div className="bg-gray-500 w-24 text-white rounded-md py-1 hidden absolute top-full left-1/2 -translate-x-1/2 group-hover:block">
                        Tuỳ chọn
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2"></div>
                      </div>
                    </button>
                  </div>

                  <div>
                    <button className="btn-fn bg-[var(--room-not-arrived-color-100-)] text-[var(--room-not-arrived-color-)]">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 text-pink-500 font-bold">
                        <path d="M11 3L10.3374 3.23384C7.75867 4.144 6.46928 4.59908 5.73464 5.63742C5 6.67576 5 8.0431 5 10.7778V13.2222C5 15.9569 5 17.3242 5.73464 18.3626C6.46928 19.4009 7.75867 19.856 10.3374 20.7662L11 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M21 12L11 12M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
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
                          isOpen={isModalOpen}
                          onClose={closeModal}
                          onSave={handleSaveModal}
                          initialData={roomInfo}
                        />

                        <div className="flex items-center gap-3">
                          <div>{formattedDates.checkIn}</div>
                          <div>{formattedDates.checkOut}</div>
                        </div>

                        <button onClick={openModal}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-500">
                            <path d="M20.5 5.5H9.5C5.78672 5.5 3 8.18503 3 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M3.5 18.5H14.5C18.2133 18.5 21 15.815 21 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M18.5 3C18.5 3 21 4.84122 21 5.50002C21 6.15882 18.5 8 18.5 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M5.49998 16C5.49998 16 3.00001 17.8412 3 18.5C2.99999 19.1588 5.5 21 5.5 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                        </button>
                      </div>
                    </li>

                    <li className="py-4 border-b !border-[var(--ht-neutral-100-)]">
                      <div className="flex items-center gap-2">
                        Mặc định (Tổng: 4,500,350 VND)
                      </div>
                    </li>

                    <li className="py-4 border-b !border-[var(--ht-neutral-100-)] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        3 người lớn, 2 trẻ em
                      </div>

                      <button className="group border border-green-400 hover:bg-[var(--navbar-color-)] duration-200 rounded-full p-[1px]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="text-green-500 w-4 h-4 group-hover:text-white">
                          <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
                  <ChooseCompanySelect />

                  <button className="group border border-green-400 hover:bg-[var(--navbar-color-)] duration-200 rounded-full p-[1px]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="text-green-500 w-4 h-4 group-hover:text-white">
                      <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-x-2 py-1">
                  <div className="flex items-center gap-x-1">
                    <SourceSelect />

                    <button className="group border border-green-400 hover:bg-[var(--navbar-color-)] duration-200 rounded-full p-[1px]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="text-green-500 w-4 h-4 group-hover:text-white">
                      <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  </div>

                  <div className="flex items-center gap-x-1">
                    <ChooseTheMarketSelect />

                    <button className="group border border-green-400 hover:bg-[var(--navbar-color-)] duration-200 rounded-full p-[1px]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="text-green-500 w-4 h-4 group-hover:text-white">
                      <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="text-green-500 w-4 h-4 group-hover:text-white">
                      <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

export default RoomDetailContent;
