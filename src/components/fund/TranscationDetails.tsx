// src/components/TransactionDetailsTable.tsx
import Link from "next/link";
import React from "react";
import IllustrationsNoData from "../illustrations/NoDataIllustrations";

interface Transaction {
  ID: number;
  Date: Date;
  IncomeVoucherCode: string;
  ExpenseVoucherCode: string;
  content: string;
  IncomeAmount: number;
  ExpenseAmount: number;
  CreatedBy: string;
}

interface TransactionDetailsTableProps {
  transactions: Transaction[];
  formatter: Intl.NumberFormat;
  isLoading: boolean;
  categoty: string;
}

const TransactionDetailsTable: React.FC<TransactionDetailsTableProps> = ({
  transactions,
  formatter,
  isLoading,
  categoty
}) => {
  return (
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
        {isLoading ? (
          <tr>
            <td colSpan={8} className="loading-row text-center">
              Loading...
            </td>
          </tr>
        ) : transactions && transactions.length > 0 ? (
          transactions.map((transaction, index) => (
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
                <Link
                  href={`/hotel_management/${categoty}/ballot_details/${transaction.ID}`}
                  className="p-2 text-[var(--room-empty-color-)]"
                >
                  {transaction.IncomeVoucherCode}
                </Link>
              </td>
              <td>
                <Link
                  href={`/hotel_management/${categoty}/ballot_details/${transaction.ID}`}
                  className="p-2 text-[var(--room-out-of-service-color-)]"
                >
                  {transaction.ExpenseVoucherCode}
                </Link>
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
          ))
        ):(
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

export default TransactionDetailsTable;
