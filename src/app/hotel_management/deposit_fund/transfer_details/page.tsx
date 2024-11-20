import { NextPage } from "next";
import { parseCookies } from "nookies";
import { useState } from "react";
import useSWR from "swr";

interface Transaction {
  id: number;
  ExpenseVoucherCode: string;
  ExpenseAmount: number;
  IncomeAmount: number;
  IncomeVoucherCode: string;
  TransactionType: string;
  CreatedBy: string;
  Date: Date;
  type: string;
  content: number;
  ReceiverName: string;
  ReceiverAccount: string;
}
const cookies = parseCookies();
const token = cookies.access_token;
const TransferDetailsPage: React.FC = ({}) => {
  const [page, setPage] = useState(1);
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
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/transaction/details/bank?page=${page}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 1000,
    }
  );

  if (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading data...</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const tableData: Transaction[] = data?.data.transactions;
  const totalPages = data?.data.totalPages;
  const totalIncome = data?.data.totalIncome;
  const totalExpense = data?.data.totalExpense;
  console.log(totalPages);

  const formatter = new Intl.NumberFormat("en-US");
  return (
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
              <td className="p-2">
                {new Date(transaction.Date).toLocaleDateString()}{" "}
                {new Date(transaction.Date).toLocaleTimeString()}
              </td>
              <td>
                <a
                  href="./add_receipt.html"
                  className="p-2 text-[var(--room-empty-color-)]"
                >
                  {transaction.IncomeVoucherCode}
                </a>
              </td>
              <td>
                <a
                  href="./add_payment_slip.html"
                  className="p-2 text-[var(--room-out-of-service-color-)]"
                >
                  {transaction.ExpenseVoucherCode}
                </a>
              </td>

              <td className="p-2">{transaction.content}</td>
              <td className="p-2 border-x !border-[var(--ht-neutral-100-)] text-center">
                {formatter.format(transaction.IncomeAmount)}
              </td>
              <td className="p-2 border-x !border-[var(--ht-neutral-100-)] text-center">
                {formatter.format(transaction.ExpenseAmount)}
              </td>
              <td className="p-2 text-center">{transaction.CreatedBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination center !justify-end p-4 gap-3">
        <span>
          1-{totalPages} trên {page}
        </span>
        <button
          onClick={() => setPage(page > 1 ? page - 1 : 1)}
          disabled={page === 1}
          className="group center border p-[7px] rounded-[3px] cursor-pointer duration-75 hover:bg-[var(--room-empty-color-)]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            fontStyle="fill: var(--ht-neutral-200-);"
            className="group-hover:!fill-white"
          >
            {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
          </svg>
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="group center border p-[7px] rounded-[3px] cursor-pointer duration-75 hover:bg-[var(--room-empty-color-)]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            className="group-hover:!fill-white"
          >
            {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
          </svg>
        </button>
      </div>
      <div className="total flex justify-end py-2 border-t border-[var(--ht-neutral-100-)]">
        <div className="w-[450px]">
          <p className="flex items-center justify-between font-[500] p-1">
            <span>I. Số dư đầu kỳ ngày:</span>VND 11,105,350
          </p>
          <p className="flex items-center justify-between font-[500] p-1">
            <span>II. Tổng tiền thu đối chiếu trong kỳ:</span>VND{" "}
            {formatter.format(totalIncome)}
          </p>
          <p className="flex items-center justify-between font-[500] p-1">
            <span>III. Tổng tiền chi đối chiếu trong kỳ:</span>VND{" "}
            {formatter.format(totalExpense)}
          </p>
          <p className="flex items-center justify-between font-[500] p-1">
            <span>Cuối kỳ (I+II-III)</span>VND{" "}
            {formatter.format(totalIncome - totalExpense)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransferDetailsPage;
