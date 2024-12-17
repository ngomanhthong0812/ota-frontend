import Link from "next/link";
import { GiCancel } from "react-icons/gi";
import IllustrationsNoData from "../illustrations/NoDataIllustrations";

interface Transaction {
  id: number;
  code: string;
  amount: number;
  content: string;
  notes: string;
  status: string;
  creator: string;
  created_at: Date;
  updated_at: string;
  type: string;
  hotel_id: number;
  transactionType: string;
}
interface IProps {
  tableData: Transaction[];
  deleteTransaction: (id: number) => void;
  isLoading: boolean;
  categoty: string;
}
const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

const TransactionTable: React.FC<IProps> = ({
  tableData,
  deleteTransaction,
  isLoading,
  categoty,
}) => {
  return (
    <table className="w-full rounded-t-[3px] overflow-hidden mt-3">
      <thead className="relative border !border-[var(--ht-neutral-100-)] font-[500] text-[var(--color-menu-icon-)]">
        <tr className="bg-[var(--ht-neutral-100-)]">
          <td className="w-[12%] p-2 ">
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
          <td className="w-[12%] p-2">
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
          <td className="w-[12%] p-2">
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
          <td className="w-[64%] p-2">
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
                href="/hotel_management/cash_fund/add_receipt"
                className="btn-receipt btn !flex items-center justify-center !bg-[var(--room-empty-color-)] !text-white border-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="15"
                  height="15"
                  style={{ marginTop: " 2px" }}
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
                href="/hotel_management/cash_fund/add_payment_slip"
                className="btn-payment-slip btn !flex items-center justify-center !bg-[var(--room-out-of-service-color-)] !text-white border-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="15"
                  height="15"
                  style={{ marginTop: " 2px" }}
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
        {isLoading ? (
          <tr>
            <td colSpan={7} className="loading-row">
              Loading...
            </td>
          </tr>
        ) : tableData && tableData.length > 0 ? (
          tableData.map((transaction, index) => (
            <tr
              key={index}
              className="group border-b !border-[var(--ht-neutral-100-)]"
            >
              <td className="p-2">
                <p>{new Date(transaction.created_at).toLocaleDateString()}</p>
                <p>{new Date(transaction.created_at).toLocaleTimeString()}</p>
              </td>
              <td
                className={`p-2  ${
                  transaction.transactionType === "income"
                    ? "text-[var(--room-empty-color-)]"
                    : "text-[var(--room-out-of-service-color-)]"
                }`}
              >
                <Link
                  href={`/hotel_management/${categoty}/ballot_details/${transaction.id}`}
                >
                  {transaction.code}
                </Link>
              </td>
              <td className="p-2 text-end">
                {formatter.format(transaction.amount)}
              </td>
              <td className="p-2 border-l">{transaction.content}</td>
              <td className="p-2">
                {transaction.status != "cancelled" ? (
                  <div className="flex">
                    <div className="flex invisible duration-75 group-hover:visible">
                      <Link
                        href={`/hotel_management/cash_fund/ballot_details/${transaction.id}`}
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
                      <GiCancel size={25} />
                    </button>
                  </div>
                ) : (
                  <span className="whitespace-nowrap text-[var(--room-dirty-color-)] font-[500]">
                    Đã huỷ
                  </span>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={9} className="no-data-row IllustrationsNoData ">
              <div className="flex justify-center items-center">
                <IllustrationsNoData />
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TransactionTable;
