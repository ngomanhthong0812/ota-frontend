"use client";
import DateFilter from "@/components/fund/DateFilter";
import ExportButton from "@/components/fund/ExportButton";
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
        <ExportButton type="bank" />
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
