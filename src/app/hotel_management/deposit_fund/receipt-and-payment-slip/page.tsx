import { callApi } from "@/utils/api";
import axios from "axios";
import { NextPage } from "next";
import { GiCancel } from "react-icons/gi";
import Link from "next/link";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import { toast } from "react-toastify";
import useSWR from "swr";
import Pagination from "@/components/fund/Pagination";
import DateFilter from "@/components/fund/DateFilter";
import apiClient from "@/utils/apiClient";
import TransactionBankTable from "@/components/fund/TransactionBankTable";
interface Transaction {
  id: number;
  code: string;
  amount: number;
  content: string;
  date: Date;
  receiverAccount: string;
  status: string;
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
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Hàm xử lý khi thay đổi ngày bắt đầu
  const handleDateChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setter(e.target.value);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get(`/api/transaction/bank`, {
        params: {
          fromDate: startDate,
          toDate: endDate,
          page: page,
          type: transactionType,
        },
      });
      console.log(response.data.data);

      setTransactions(response.data.data.transactions || []);
      setTotalPages(response.data.totalPages || 1);
      setTransactions(response.data.data.transactions);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast.error("Không thể tải danh sách giao dịch.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchTransactions();
  }, [page, startDate, endDate, transactionType]);
  // Hàm xử lý khi thay đổi loại giao dịch
  const handleTransactionTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTransactionType(e.target.value);
  };

  const deleteTransaction = async (id: number) => {
    try {
      const response = await callApi<any>(
        `/api/transaction/${id}`, // Endpoint của API
        "PUT",
        {
          status: "cancelled", // Dữ liệu bạn muốn cập nhật, ví dụ thay đổi trạng thái
        }
      );
      console.log(response);

      // Kiểm tra mã trạng thái trả về
      if (response.data.statusCode === 200) {
        // Nếu thành công, thông báo thành công
        fetchTransactions();
        toast.success(`Hủy thành công!`);
      } else {
        // Nếu thất bại (ví dụ: mã lỗi 404), thông báo thất bại với message trả về từ API
        toast.error(response.data.message || "Có lỗi xảy ra khi hủy.");
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(`Error deleting transaction ${id}:`, error);
    }
  };
  return (
    <div>
      {/* <!-- start Body Content --> */}
      <div className="bg-white cash-fund_content border !border-[var(--ht-neutral-100-)] rounded-md p-3">
        <div className="flex gap-5">
          <DateFilter
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            handleDateChange={handleDateChange}
          />
          <select
            className="btn !py-1 !px-2 !w-auto"
            onChange={handleTransactionTypeChange}
          >
            <option value="">All</option>
            <option value="income">Phiếu thu tiền</option>
            <option value="expense">Phiếu chi tiền</option>
          </select>
        </div>
        <TransactionBankTable
          deleteTransaction={deleteTransaction}
          tableData={transactions}
          isLoading={isLoading}
        />
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
      {/* <!-- end Body Content --> */}
    </div>
  );
};

export default ReceiptAndPaymentSlipPage;
