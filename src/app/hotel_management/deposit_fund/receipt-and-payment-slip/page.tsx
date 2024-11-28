import axios from "axios";
import { NextPage } from "next";
import Link from "next/link";
import { parseCookies } from "nookies";
import { useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import useSWR from "swr";
interface Transaction {
  id: number;
  code: string;
  amount: number;
  content: string;
  date: Date;
  receiverAccount: string;
}
const cookies = parseCookies();
const token = cookies.access_token;
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
const ReceiptAndPaymentSlipPage: React.FC = ({}) => {
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [transactionType, setTransactionType] = useState("");

  console.log("check gửi api", page, endDate, transactionType);

  // Hàm xử lý khi thay đổi ngày bắt đầu
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  // Hàm xử lý khi thay đổi ngày kết thúc
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  // Hàm xử lý khi thay đổi loại giao dịch
  const handleTransactionTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTransactionType(e.target.value);
  };
  const { data, error, isLoading, mutate } = useSWR(
    `http://localhost:8080/api/transaction/bank?fromDate=${startDate}&toDate=${endDate}&page=${page}&type=${transactionType}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 100000,
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
  console.log(totalPages);

  const formatter = new Intl.NumberFormat("en-US");
  const deleteTransaction = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/transaction/${id}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InF1YW5nY3V0ZUBnbWFpbC5jb20iLCJzdWIiOjIsImlhdCI6MTczMTk4NzU4MCwiZXhwIjoxNzMyNTkyMzgwfQ.oKWKQ4vXpDR4mGL3jMSd3nEexekI0412_aDHeKTdMro",
          "Content-Type": "application/json",
        },
      });
      console.log(`xóa thành công ${id}`);
      mutate();
    } catch (error) {
      console.error(`Error deleting transaction ${id}:`, error);
    }
  };

  return (
    <div>
      {/* <!-- start Body Content --> */}
      <div className="bg-white cash-fund_content border !border-[var(--ht-neutral-100-)] rounded-md p-3">
        <div className="flex items-center gap-8">
          {/* <select className="btn !py-1 !px-2 !w-auto">
            <option value="today">Hôm nay</option>
            <option value="week">Tuần này</option>
            <option value="month">Tháng này</option>

            <option value="quarter">Quý này</option>
          </select> */}
          <div className="center">
            <label form="start-date">Từ</label>
            <input
              type="date"
              id="start-date"
              className="btn !py-1 !px-2 !w-auto ml-2"
              value={startDate}
              onChange={handleStartDateChange}
            />
            {/* <!-- Lấy thời gian hiện tại làm mặt định qua js --> */}
          </div>
          <div className="center">
            <label form="end-date">Đến</label>
            <input
              type="date"
              id="end-date"
              className="btn !py-1 !px-2 !w-auto ml-2"
              value={endDate}
              onChange={handleEndDateChange}
            />
            {/* <!-- Lấy thời gian hiện tại làm mặt định qua js--> */}
          </div>
          <select
            className="btn !py-1 !px-2 !w-auto"
            onChange={handleTransactionTypeChange}
          >
            <option value="">All</option>
            <option value="income">Phiếu thu tiền</option>
            <option value="expense">Phiếu chi tiền</option>
          </select>
          {/* bấm gửi  */}
          {/* <button className="sbm group" onClick={handleSubmit}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              style={{
                fill: "var(--room-empty-color-)",
                width: "20px",
                height: "20px",
              }}
              className="group-hover:!fill-white"
            >
              <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
            </svg>
          </button> */}
        </div>
        <table className="w-full rounded-t-[3px] overflow-hidden mt-3">
          <thead className="relative border !border-[var(--ht-neutral-100-)] font-[500] text-[var(--color-menu-icon-)]">
            <tr className="bg-[var(--ht-neutral-100-)]">
              <td className="w-[10%] p-2 ">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    style={{ marginRight: "10px", marginTop: "2px" }}
                  >
                    {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                    <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                  </svg>
                  <p className="whitespace-nowrap">Ngày</p>
                </div>
              </td>
              <td className="w-[25%] p-2">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    style={{ marginRight: "10px", marginTop: "2px" }}
                  >
                    {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                    <path d="M243.4 2.6l-224 96c-14 6-21.8 21-18.7 35.8S16.8 160 32 160l0 8c0 13.3 10.7 24 24 24l400 0c13.3 0 24-10.7 24-24l0-8c15.2 0 28.3-10.7 31.3-25.6s-4.8-29.9-18.7-35.8l-224-96c-8-3.4-17.2-3.4-25.2 0zM128 224l-64 0 0 196.3c-.6 .3-1.2 .7-1.8 1.1l-48 32c-11.7 7.8-17 22.4-12.9 35.9S17.9 512 32 512l448 0c14.1 0 26.5-9.2 30.6-22.7s-1.1-28.1-12.9-35.9l-48-32c-.6-.4-1.2-.7-1.8-1.1L448 224l-64 0 0 192-40 0 0-192-64 0 0 192-48 0 0-192-64 0 0 192-40 0 0-192zM256 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                  </svg>
                  <p className="whitespace-nowrap">Tài khoản</p>
                </div>
              </td>
              <td className="w-[10%] p-2">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    style={{ marginRight: "10px", marginTop: "2px" }}
                  >
                    {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                    <path d="M64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l448 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80zM0 96C0 60.7 28.7 32 64 32l448 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zm96 64a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm104 0c0-13.3 10.7-24 24-24l224 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-224 0c-13.3 0-24-10.7-24-24zm0 96c0-13.3 10.7-24 24-24l224 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-224 0c-13.3 0-24-10.7-24-24zm0 96c0-13.3 10.7-24 24-24l224 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-224 0c-13.3 0-24-10.7-24-24zm-72-64a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM96 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                  </svg>
                  <p className="whitespace-nowrap">Số chứng từ</p>
                </div>
              </td>
              <td className="w-[15%] p-2">
                <div className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                    style={{ marginRight: "10px", marginTop: "2px" }}
                  >
                    {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                    <path d="M160 0c17.7 0 32 14.3 32 32l0 35.7c1.6 .2 3.1 .4 4.7 .7c.4 .1 .7 .1 1.1 .2l48 8.8c17.4 3.2 28.9 19.9 25.7 37.2s-19.9 28.9-37.2 25.7l-47.5-8.7c-31.3-4.6-58.9-1.5-78.3 6.2s-27.2 18.3-29 28.1c-2 10.7-.5 16.7 1.2 20.4c1.8 3.9 5.5 8.3 12.8 13.2c16.3 10.7 41.3 17.7 73.7 26.3l2.9 .8c28.6 7.6 63.6 16.8 89.6 33.8c14.2 9.3 27.6 21.9 35.9 39.5c8.5 17.9 10.3 37.9 6.4 59.2c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11l0 33.4c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-34.9c-.4-.1-.9-.1-1.3-.2l-.2 0s0 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.1-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.5 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.6 .4-16.7-1.3-20.4c-1.9-4-5.6-8.4-13-13.3c-16.4-10.7-41.5-17.7-74-26.3l-2.8-.7s0 0 0 0C119.4 279.3 84.4 270 58.4 253c-14.2-9.3-27.5-22-35.8-39.6c-8.4-17.9-10.1-37.9-6.1-59.2C23.7 116 52.3 91.2 84.8 78.3c13.3-5.3 27.9-8.9 43.2-11L128 32c0-17.7 14.3-32 32-32z" />
                  </svg>
                  <p className="whitespace-nowrap">Số tiền (VND)</p>
                </div>
              </td>
              <td className="w-[40%] p-2">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    style={{ marginRight: "10px", marginTop: "2px" }}
                  >
                    {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                    <path d="M256 448c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9c-5.5 9.2-11.1 16.6-15.2 21.6c-2.1 2.5-3.7 4.4-4.9 5.7c-.6 .6-1 1.1-1.3 1.4l-.3 .3c0 0 0 0 0 0c0 0 0 0 0 0s0 0 0 0s0 0 0 0c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9zM128 208a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm128 0a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                  </svg>
                  <p className="whitespace-nowrap">Lý do</p>
                </div>
              </td>
              <td className="w-[100px] absolute top-[50%] right-0 translate-y-[-50%]">
                <div className="flex gap-1 p-1">
                  <Link
                    href="/hotel_management/deposit_fund/add_receipt"
                    className="btn-receipt btn !flex items-center justify-center !bg-[var(--room-empty-color-)] !text-white border-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="15"
                      height="15"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12h14m-7 7V5"
                      ></path>
                    </svg>
                  </Link>
                  <Link
                    href="/hotel_management/deposit_fund/add_payment_slip"
                    className="btn-payment-slip btn !flex items-center justify-center !bg-[var(--room-out-of-service-color-)] !text-white border-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="15"
                      height="15"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12h14m-7 7V5"
                      ></path>
                    </svg>
                  </Link>
                </div>
              </td>
            </tr>
          </thead>
          <tbody className="text-[14px]">
            {tableData.map((transaction, index) => (
              <tr
                key={index}
                className="group border-b !border-[var(--ht-neutral-100-)]"
              >
                <td className="p-2">
                  <p>{new Date(transaction.date).toLocaleDateString()}</p>
                  <p>{new Date(transaction.date).toLocaleTimeString()}</p>
                </td>

                <td className="p-2">{transaction.receiverAccount}</td>

                <td className="p-2 text-[var(--room-empty-color-)] text-center">
                  {transaction.code}
                </td>

                <td className="p-2 text-center">
                  {" "}
                  {formatter.format(transaction.amount)}
                </td>
                <td className="p-2 border-l">{transaction.content}</td>

                <td className="p-2">
                  <div className="flex">
                    <div className="flex invisible duration-75 group-hover:visible">
                      <Link
                        href={`/hotel_management/deposit_fund/ballot_details/${transaction.id}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          style={{ marginRight: "10px", marginTop: "2px" }}
                        >
                          {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                          <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z" />
                        </svg>
                      </Link>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        style={{ marginRight: "10px", marginTop: "2px" }}
                      >
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"></path>
                      </svg>
                    </div>
                    <button onClick={() => deleteTransaction(transaction.id)}>
                      <FaDeleteLeft size={25} />
                    </button>
                  </div>
                </td>
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
      </div>
      {/* <!-- end Body Content --> */}
    </div>
  );
};

export default ReceiptAndPaymentSlipPage;
