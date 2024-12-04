import React from "react";

interface IProps {
  totalIncome: number;
  totalExpense: number;
}
const FinancialSummary: React.FC<IProps> = ({ totalIncome, totalExpense }) => {
  const formatter = new Intl.NumberFormat("en-US");

  return (
    <div className="total flex justify-end py-2 border-t border-[var(--ht-neutral-100-)]">
      <div className="w-[450px]">
        <p className="flex items-center justify-between font-[500] p-1">
          <span>I. Số dư đầu kỳ ngày:</span>
          {formatter.format(11105350)}{" "}
          {/* Replace with dynamic value if needed */}
        </p>
        <p className="flex items-center justify-between font-[500] p-1">
          <span>II. Tổng tiền thu đối chiếu trong kỳ:</span>
          {formatter.format(totalIncome)}
        </p>
        <p className="flex items-center justify-between font-[500] p-1">
          <span>III. Tổng tiền chi đối chiếu trong kỳ:</span>
          {formatter.format(totalExpense)}
        </p>
        <p className="flex items-center justify-between font-[500] p-1">
          <span>Cuối kỳ (I+II-III)</span>
          {formatter.format(totalIncome - totalExpense)}
        </p>
      </div>
    </div>
  );
};

export default FinancialSummary;
