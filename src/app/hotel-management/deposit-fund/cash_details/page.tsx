import { NextPage } from "next";

interface Props {}
interface Transaction {
  date: string;
  receiptNumber: string;
  paymentSlip: string;
  description: string;
  income: string;
  expenditure: string;
  creator: string;
}

// Dữ liệu mẫu
const tableData: Transaction[] = [
  {
    date: "09/10/2024 16:18:58",
    receiptNumber: "PTTM1",
    paymentSlip: "",
    description: "Nhập quỹ tiền mặt",
    income: "500,000",
    expenditure: "0",
    creator: "thonngo@123",
  },
  {
    date: "08/04/2024 08:29:10",
    receiptNumber: "",
    paymentSlip: "PCTM1",
    description: "	Kết chuyển tiền",
    income: "0",
    expenditure: "500,000,000",
    creator: "Quang Trịnh",
  },
];
const CashDetailsPage: NextPage<Props> = ({}) => {
  return (
    <div>
      {/* <!-- start Body Content --> */}
      <div className="bg-white cash-fund_content border !border-[var(--ht-neutral-100-)] rounded-md p-3">
        <div className="flex justify-between">
          <div className="flex items-center gap-8">
            <select className="btn !py-1 !px-2 !w-auto">
              <option value="today">Hôm nay</option>
              <option value="week">Tuần này</option>
              <option value="month">Tháng này</option>
              <option value="month">Tháng trước</option>
              <option value="month">Quý này</option>
            </select>
            <div className="center">
              <label form="start-date">Từ</label>
              <input
                type="date"
                id="start-date"
                className="btn !py-1 !px-2 !w-auto ml-2"
              />
              {/* <!-- Lấy thời gian hiện tại làm mặt định qua js --> */}
            </div>
            <div className="center">
              <label form="end-date">Đến</label>
              <input
                type="date"
                id="end-date"
                className="btn !py-1 !px-2 !w-auto ml-2"
              />
              {/* <!-- Lấy thời gian hiện tại làm mặt định qua js--> */}
            </div>
            <button className="sbm group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fontStyle="fill: var(--room-empty-color-); width: 20px; height: 20px;"
                className="group-hover:!fill-white"
              >
                <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
              </svg>
            </button>
          </div>
          <button className="sbm !p-[6px] uppercase bg-[var(--room-empty-color-)] !text-white !text-xs hover:bg-[var(--room-empty-color-hover-)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              className="icon !fill-white !m-0"
            >
              {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
              <path d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 128-168 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l168 0 0 112c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zM384 336l0-48 110.1 0-39-39c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l80 80c9.4 9.4 9.4 24.6 0 33.9l-80 80c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l39-39L384 336zm0-208l-128 0L256 0 384 128z" />
            </svg>
            Xuất file excel
          </button>
        </div>
        <table className="w-full rounded-t-[3px] overflow-hidden mt-3">
          <thead className="relative border border-[var(--ht-neutral-100-)] font-[500] text-[var(--color-menu-icon-)]">
            <tr className="bg-[var(--ht-neutral-100-)]">
              <td className="p-2 w-[5%]">STT</td>
              <td className="p-2 w-[15%]">Ngày</td>
              <td className="p-2 w-[10%]">Số phiếu thu</td>
              <td className="p-2 w-[10%]">Số thiếu chi</td>
              <td className="p-2 w-[25%]">Thu chi</td>
              <td className="p-2 w-[10%] text-center">Mục thu (VND)</td>
              <td className="p-2 w-[10%] text-center">Mục chi (VND)</td>
              <td className="p-2 w-[15%] text-center">Người tạo</td>
            </tr>
          </thead>
          <tbody className="text-[14px]">
            {tableData.map((transaction, index) => (
              <tr
                key={index}
                className="group border-b !border-[var(--ht-neutral-100-)]"
              >
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{transaction.date}</td>
                <td>
                  <a
                    href="./add_receipt.html"
                    className="p-2 text-[var(--room-empty-color-)]"
                  >
                    {transaction.receiptNumber}
                  </a>
                </td>
                <td>
                  <a
                    href="./add_payment_slip.html"
                    className="p-2 text-[var(--room-out-of-service-color-)]"
                  >
                    {transaction.paymentSlip}
                  </a>
                </td>

                <td className="p-2">{transaction.description}</td>
                <td className="p-2 border-x !border-[var(--ht-neutral-100-)] text-center">
                  {transaction.income}
                </td>
                <td className="p-2 border-x !border-[var(--ht-neutral-100-)] text-center">
                  {transaction.expenditure}
                </td>
                <td className="p-2 text-center">{transaction.creator}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination center !justify-end p-4 gap-3">
          <span>1-10 trên 15</span>
          <div className="group center border p-[7px] rounded-[3px] cursor-pointer duration-75 hover:bg-[var(--room-empty-color-)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              fontStyle="fill: var(--ht-neutral-200-);"
              className="group-hover:!fill-white"
            >
              {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
            </svg>
          </div>
          <div className="group center border p-[7px] rounded-[3px] cursor-pointer duration-75 hover:bg-[var(--room-empty-color-)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              className="group-hover:!fill-white"
            >
              {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
              <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
            </svg>
          </div>
        </div>
        <div className="total flex justify-end py-2 border-t border-[var(--ht-neutral-100-)]">
          <div className="w-[450px]">
            <p className="flex items-center justify-between font-[500] p-1">
              <span>I. Số dư đầu kỳ ngày:</span>VND 11,105,350
            </p>
            <p className="flex items-center justify-between font-[500] p-1">
              <span>II. Tổng tiền thu đối chiếu trong kỳ:</span>VND 500,000
            </p>
            <p className="flex items-center justify-between font-[500] p-1">
              <span>III. Tổng tiền chi đối chiếu trong kỳ:</span>VND 5,000,000
            </p>
            <p className="flex items-center justify-between font-[500] p-1">
              <span>Cuối kỳ (I+II-III)</span>VND 6,605,350
            </p>
          </div>
        </div>
      </div>
      {/* <!-- end Body Content --> */}
    </div>
  );
};

export default CashDetailsPage;
