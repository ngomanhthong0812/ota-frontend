"use client"; // Add this line at the top

import React, { useState } from "react";
import BookingHeader from "@/components/booking/BookingHeader";
import CreatOrderTable from "@/components/booking/orderTable/creat_order_table";
import BookingSection from "@/components/booking/bookingSearch/BookingSection";
import OnlyRoom from "@/components/booking/Infomation/beforOrder/OnlyRoom";

interface IProps {}

const CreateBookingPage: React.FC<IProps> = () => {
  // State to control the current view
  const [currentView, setCurrentView] = useState<"room" | "info">("room");
  const [showCreatOrderTable, setShowCreatOrderTable] = useState(false);
  const [showBookingTab, setShowBookingTab] = useState(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedRoom, setSelectedRoom] = useState<{
    id: number;
    name: string;
    price: number;
    max_capacity: number;
    max_children: number;
    room_id: number;
    room_name: string;
  } | null>(null);

  // Hàm xử lý khi nhấn nút tìm kiếm Room
  const handleSearchClick = () => {
    setShowBookingTab(true);
  };

  // Hàm xử lý hiển thị bảng CreatOrderTable khi click vào nút "+"
  const handleShowClick = (roomData: {
    id: number;
    name: string;
    price: number;
    max_capacity: number;
    max_children: number;
    room_id: number;
    room_name: string;
  }) => {
    setSelectedRoom(roomData);
    setShowCreatOrderTable(true);
  };
  // Function to toggle between views
  const handleToggleView = (view: "room" | "info") => {
    setCurrentView(view);
  };

  return (
    <main className="text-sm text-[var(--color-menu-icon-)] toolbar-top-type">
      <BookingHeader onToggleView={handleToggleView} />

      <div className="body_content py-2">
        <section>
          <div className="body_content-room grid grid-cols-1 grid-rows-none sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-10 xl:grid-cols-10 2xl:grid-cols-10 gap-3">
            {/* BookingSection */}
            <div className="col-span-7 flex flex-col h-80">
              {currentView === "room" && (
                <BookingSection
                  startDate={startDate}
                  endDate={endDate}
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                  showBookingTab={showBookingTab}
                  handleSearchClick={handleSearchClick}
                  handleShowClick={handleShowClick}
                />
              )}
              {currentView === "info" && <OnlyRoom />}
            </div>
            {/* CreatOrderTable */}
            <div className="col-span-3 flex flex-col">
              {showCreatOrderTable && (
                <CreatOrderTable
                  roomData={selectedRoom}
                  startDate={startDate}
                  endDate={endDate}
                />
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default CreateBookingPage;
