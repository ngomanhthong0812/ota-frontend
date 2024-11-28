"use client";

import BookingHeader from "@/components/booking/BookingHeader";
import BookingTab from "@/components/booking/BookingTab";
import InputDay from "@/components/btn/inputDay";
import CreatOrderTable from "@/components/orderTable/creat_order_table";
import React, { useState } from "react";

interface IProps {}
const CreateBookingPage: React.FC<IProps> = () => {
  const [showBookingTab, setShowBookingTab] = useState(false);
  const [showCreatOrderTable, setShowCreatOrderTable] = useState(false);

  // Hàm xử lý khi nhấn nút tìm kiếm Room
  const handleSearchClick = () => {
    setShowBookingTab(true);
  };
// Hàm xử lý hiển thị bảng CreatOrderTable khi click vào nút "+"
const handleShowClick = () => {
  setShowCreatOrderTable(true);
};

  return (
    <main className="  text-sm text-[var(--color-menu-icon-)] toolbar-top-type">
      <BookingHeader />

      <div className="body_content py-2">
        <section>
          <div className="body_content-room grid grid-cols-1 grid-rows-none sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-10 xl:grid-cols-10 2xl:grid-cols-10 gap-3 ">
            <div className="col-span-7 flex flex-col h-80">
              {/**Checkin-Checkout-Search */}
              <section className="mb-2 duration-300 border border-[var(--ht-neutral-100-)] rounded-md relative  bg-white p-[8.9px]">
                <div className="flex justify-between ">
                  {/**checkin-checkout */}
                  <InputDay />
                  {/**search */}
                  <div
                    className="flex justify-center items-center cursor-pointer "
                    onClick={handleSearchClick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="15"
                      width="15"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="#279656"
                        d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                      />
                    </svg>
                  </div>
                </div>
              </section>
              {/**Table list Room*/}
              <section className="flex-1 duration-300 border border-[var(--ht-neutral-100-)] rounded-md bg-white ">
                {!showBookingTab ? (
                  <div className="flex border-b border-stone-300 pb-4 p-3 px-3 gap-6 font-medium h-80 justify-center items-center ">
                    <p>Chọn ngày để tìm phòng trống</p>
                  </div>
                ) : (
                  <BookingTab handleShowClick={handleShowClick} />
                )}
              </section>
              <div className="flex text-sm">
                <span className="text-[var(--room-empty-color-)]">*</span>
                <p>
                  Phòng thẳng chặn: phòng thẳng chặn có thể book mà không phải
                  chuyển phòng
                </p>
              </div>
            </div>

            <div className="col-span-3 flex flex-col">
             {showCreatOrderTable &&  <CreatOrderTable />}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default CreateBookingPage;
