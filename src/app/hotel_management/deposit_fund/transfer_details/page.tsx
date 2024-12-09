"use client";
import DateFilter from "@/components/fund/DateFilter";
import FinancialSummary from "@/components/fund/FinancialSummary";
import Pagination from "@/components/fund/Pagination";
import TransactionDetailsTable from "@/components/fund/TranscationDetails";
import apiClient from "@/utils/apiClient";
import { useEffect, useState } from "react";

interface Transaction {
  ID: number;
  ExpenseVoucherCode: string;
  ExpenseAmount: number;
  IncomeAmount: number;
  IncomeVoucherCode: string;
  TransactionType: string;
  CreatedBy: string;
  Date: Date;
  type: string;
  content: string;
}

const TransferDetailsPage: React.FC = ({}) => {
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get(
        `/api/transaction/details/bank?page=${page}&fromDate=${startDate}&toDate=${endDate}`
      );

      // Kiểm tra phản hồi từ API
      if (response.status !== 200) {
        throw new Error("Failed to fetch data");
      }

      const data = response.data.data;
      setTransactions(data.transactions);
      setTotalPages(data.totalPages);
      setTotalIncome(data.totalIncome);
      setTotalExpense(data.totalExpense);
    } catch (error) {
      setError("Error loading data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, startDate, endDate]);

  // Hàm xử lý khi thay đổi ngày bắt đầu
  const handleDateChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setter(e.target.value);

  const formatter = new Intl.NumberFormat("en-US");
  return (
    <div className="bg-white cash-fund_content border !border-[var(--ht-neutral-100-)] rounded-md p-3">
      <div className="flex justify-between">
        <DateFilter
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          handleDateChange={handleDateChange}
        />
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

      <TransactionDetailsTable
        transactions={transactions}
        formatter={formatter}
        isLoading={loading}
        categoty="deposit_fund"
      />
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />

      <FinancialSummary totalIncome={totalIncome} totalExpense={totalExpense} />
    </div>
  );
};

export default TransferDetailsPage;
