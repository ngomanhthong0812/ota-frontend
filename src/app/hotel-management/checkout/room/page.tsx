'use client'
import RoomDetailContent from "./room_detail/page"
import RoomCheckOutPage from "./room_checkout/page";
import { useState } from "react";

interface Page {
    title: string;
    component: React.ReactNode;
}
const RoomDetailPage = () => {

    const pages: Page[] = [
      { title: "Phòng", component: <RoomDetailContent /> },
      { title: "Thanh toán", component: <RoomCheckOutPage /> },
    ];
  
    // Trạng thái tab hiện tại
    const [activePage, setActivePage] = useState<string>("Phòng");
  
    // Xử lý chuyển tab
    const handlePageChange = (pageTitle: string) => {
      setActivePage(pageTitle);
    };
  
    return (
      <div>
        {/* Thanh điều hướng */}
        <div className="toolbar-top rounded-t-md pb-2 flex items-center justify-between text-xs">
          <div className="flex">
            <div className="toolbar-top-room-detail flex rounded-3xl p-1 font-[600] bg-white">
              {pages.map((page) => (
                <div
                  key={page.title}
                  onClick={() => handlePageChange(page.title)}
                  className={`toolbar-top-type_item ${
                    activePage === page.title ? "active" : ""
                  }`}
                >
                  {page.title}
                </div>
              ))}
            </div>
          </div>
        </div>
  
        {/* Hiển thị nội dung của tab */}
        <div>
          {pages.find((page) => page.title === activePage)?.component || (
            <div>Page not found</div>
          )}
        </div>
      </div>
    );
  }
export default RoomDetailPage;