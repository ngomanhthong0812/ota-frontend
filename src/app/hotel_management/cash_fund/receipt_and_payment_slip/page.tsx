import DateFilter from "@/components/fund/DateFilter";
import Pagination from "@/components/fund/Pagination";
import TransactionTable from "@/components/fund/TransactionTable";
import { callApi } from "@/utils/api";
import apiClient from "@/utils/apiClient";
import axios from "axios";
import Link from "next/link";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import { GiCancel } from "react-icons/gi";
import { toast } from "react-toastify";
import useSWR from "swr";

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

  // Hàm xử lý khi thay đổi loại giao dịch
  const handleTransactionTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTransactionType(e.target.value);
  };
  // Gọi API để lấy danh sách transactions
  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get(
        `/api/transaction/cash_fund/cash_fund`,
        {
          params: {
            fromDate: startDate,
            toDate: endDate,
            page: page,
            type: transactionType,
          },
        }
      );
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

  // Hàm xử lý hủy giao dịch
  const deleteTransaction = async (id: number) => {
    try {
      const response = await apiClient.put(`/api/transaction/${id}`, {
        status: "cancelled",
      });
      if (response.data.statusCode === 200) {
        toast.success("Hủy thành công!");
        fetchTransactions(); // Làm mới dữ liệu
      } else {
        toast.error(
          response.data.message || "Có lỗi xảy ra khi hủy giao dịch."
        );
      }
    } catch (error) {
      console.error(`Error deleting transaction ${id}:`, error);
      toast.error("Có lỗi xảy ra khi hủy giao dịch.");
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

        <TransactionTable
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
