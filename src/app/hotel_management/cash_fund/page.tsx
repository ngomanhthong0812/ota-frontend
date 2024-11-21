"use client";
import { useState } from "react";

import ReceiptAndPaymentSlipPage from "./receipt_and_payment_slip/page";
import CashDetailsPage from "./cash_details/page";
import ComparePage from "./compare/page";

interface Page {
  title: string;
  component: React.ReactNode;
}
interface IProps {}
const DepositFundPage: React.FC<IProps> = () => {
  const pages: Page[] = [
    { title: "Lập phiếu thu chi", component: <ReceiptAndPaymentSlipPage /> },
    { title: "Kiểm kê", component: <ComparePage /> },
    { title: "Sổ chi tiết tiền mặt", component: <CashDetailsPage /> },
  ];

  // State để theo dõi nội dung trang đang được hiển thị
  const [activePage, setActivePage] = useState<string>("Lập phiếu thu chi");

  // Hàm để thay đổi nội dung khi click vào các link
  const handlePageChange = (pageTitle: string) => {
    setActivePage(pageTitle);
  };
  return (
    <div>
      {/* start Toolbar Top */}
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
      {/* end Toolbar Top */}
      {/* Nội dung thay đổi dựa trên activePage */}
      <div>
        {pages.find((page) => page.title === activePage)?.component}{" "}
        {/* Thay name bằng title */}
      </div>
    </div>
  );
};

export default DepositFundPage;
