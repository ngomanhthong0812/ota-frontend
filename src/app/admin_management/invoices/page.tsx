"use client";
import { useAuth } from "@/context/auth.context";
import { Totals, Transaction } from "@/types/backend";

import React, { useEffect, useState } from "react";

import { BiMenuAltLeft, BiChevronDown } from "react-icons/bi";
import { CgTrash } from "react-icons/cg";
import { FaFileExport } from "react-icons/fa6";
import { callApi } from "@/utils/api";
import TransactionInfo from "@/components/fund/TransactionInfo";
import TransactionDetail from "@/components/fund/TransactionDetail";

const InvoicesPage = () => {
  const [itemActive, setItemActive] = useState<number | null>(null);
  const [totals, setTotals] = useState<Totals>();

  const [historyTransaction, setHistoryTransaction] = useState<Transaction[]>(
    []
  );
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [checkedAll, setCheckedAll] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  const [status, setStatus] = useState<string>("all");
  const { user } = useAuth();

  const fetchHistoryTransaction = async () => {
    if (!user) return; // Đảm bảo user đã có giá trị
    try {
      setLoading(true);
      setError(null);
      const response = await callApi<any>(
        `/api/transaction/hotel/${user.hotel_id}`,
        "GET"
      );

      if (
        Array.isArray(
          response.data.data.transactions || response.data.data.totals
        )
      ) {
        setHistoryTransaction(response.data.data.transactions);
        setTotals(response.data.data.totals);
      } else {
        setError("Không tìm thấy dữ liệu.");
      }
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra trong quá trình lấy dữ liệu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoryTransaction();
  }, [user]); // Duy trì gọi lại khi `user` thay đổi
  const handleUpdateSuccess = () => {
    fetchHistoryTransaction(); // Gọi lại API để cập nhật danh sách
  };
  useEffect(() => {
    if (historyTransaction?.length > 0) {
      if (historyTransaction?.length === checkedItems.length) {
        setCheckedAll(true);
      } else {
        setCheckedAll(false);
      }
    }
  }, [checkedItems, historyTransaction]);

  const handleSetCheckedItem = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setCheckedItems((prevId) => {
      if (prevId.includes(id)) {
        return prevId.filter((item) => item !== id);
      } else {
        return [...prevId, id];
      }
    });
  };

  const handleSetCheckedAll = (b: boolean) => {
    setCheckedAll(b);
    if (b) {
      const items: number[] = [];
      historyTransaction.forEach((item) => {
        items.push(item.id);
      });
      setCheckedItems(items);
    } else {
      setCheckedItems([]);
    }
  };

  const removeVietnameseTones = (str: string): string => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const filterHistoryTransaction = (): Transaction[] => {
    return historyTransaction.filter((Transaction) => {
      const normalizedSearchQuery = removeVietnameseTones(search.toLowerCase());
      const normalizedCode = removeVietnameseTones(
        Transaction.code.toLowerCase()
      );
      const normalizedName = removeVietnameseTones(
        Transaction.user.name.toLowerCase()
      );

      const matchesSearchQuery =
        normalizedCode.includes(normalizedSearchQuery) ||
        normalizedName.includes(normalizedSearchQuery);

      const matchesBookingStatus =
        status === "all" || Transaction.status === status;

      return matchesSearchQuery && matchesBookingStatus;
    });
  };
  const formatCurrency = (amount: number): string => {
    // Định dạng theo kiểu Việt Nam, sử dụng dấu phẩy là phân cách hàng nghìn
    return new Intl.NumberFormat("en-US").format(amount);
  };
  return (
    <div className="flex gap-5">
      <div className="min-w-[234px]">
        <section className="mb-4 bg-white p-3 pb-4 rounded-md flex flex-col gap-3 text-[13px] shadow-sm shadow-[#d6d6d6]">
          <h3 className="text-black font-[600]">Tìm kiếm</h3>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="outline-none border-b border-[#9d9d9d] w-[230px] py-2 focus:border-[var(--room-empty-color-)] focus:border-b-2"
            placeholder="Theo tên hoặc mã phiếu"
          />
        </section>
        <section className="mb-4 bg-white p-3 pb-4 rounded-md flex flex-col gap-3 text-[13px] shadow-sm shadow-[#d6d6d6]">
          <h3 className="text-black font-[600]">Tổng tiền</h3>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2 text-gray-800">
              <span className="font-semibold">Thu tiền mặt:</span>
              <span>{formatCurrency(totals?.cashIncome ?? 0)}</span>
            </li>
            <li className="flex items-center gap-2 text-gray-800">
              <span className="font-semibold">Chi tiền mặt:</span>
              <span>{formatCurrency(totals?.cashExpense ?? 0)}</span>
            </li>
            <li className="flex items-center gap-2 text-gray-800">
              <span className="font-semibold">Thu tiền chuyển khoản:</span>
              <span>{formatCurrency(totals?.bankIncome ?? 0)}</span>
            </li>
            <li className="flex items-center gap-2 text-gray-800">
              <span className="font-semibold">Chi tiền chuyển khoản:</span>
              <span>{formatCurrency(totals?.bankExpense ?? 0)}</span>
            </li>
            <li className="flex items-center gap-2 text-green-600">
              <span className="font-semibold">Tổng thu:</span>
              <span>{formatCurrency(totals?.totalIncome ?? 0)}</span>
            </li>
            <li className="flex items-center gap-2 text-red-600">
              <span className="font-semibold">Tổng chi:</span>
              <span>{formatCurrency(totals?.totalExpense ?? 0)}</span>
            </li>
            <li className="flex items-center gap-2 text-blue-600">
              <span className="font-semibold">Tổng thu - chi:</span>
              <span>{formatCurrency(totals?.totalNet ?? 0)}</span>
            </li>
          </ul>
        </section>
        <section className="mb-4 bg-white p-3 pb-4 rounded-md flex flex-col gap-3 text-[13px] shadow-sm shadow-[#d6d6d6]">
          <h3 className="text-black font-[600]">Trạng thái</h3>
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-1">
              <input
                onChange={(e) => setStatus(e.target.value)}
                checked={status === "all"}
                type="radio"
                name="userStatus"
                value="all"
              />
              Tất cả
            </li>
            <li className="flex items-center gap-1">
              <input
                onChange={(e) => setStatus(e.target.value)}
                checked={status === "active"}
                type="radio"
                name="userStatus"
                value="active"
              />
              Hoạt động
            </li>
            <li className="flex items-center gap-1">
              <input
                onChange={(e) => setStatus(e.target.value)}
                checked={status === "cancelled"}
                type="radio"
                name="userStatus"
                value="cancelled"
              />
              Đã hủy
            </li>
          </ul>
        </section>
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <p className="font-[600] text-2xl text-[#323232]">Hóa đơn</p>
          <div className="flex gap-2">
            {checkedItems.length > 0 && (
              <button className="relative group flex gap-2 border-none py-[6px] px-4 text-white bg-[#4bac4d] hover:bg-[#419543] rounded-sm duration-200">
                <BiMenuAltLeft size={20} /> Thao tác <BiChevronDown size={20} />
                <div className="absolute left-0 top-8 min-w-[230px] py-2 rounded-md text-[#565656] bg-white invisible group-hover:visible">
                  <p className="py-2 px-5 hover:bg-slate-50 flex gap-1">
                    <CgTrash size={20} />
                    Xóa
                  </p>
                </div>
              </button>
            )}
            <button className="flex gap-2 border-none py-[6px] px-4 text-white bg-[#4bac4d] hover:bg-[#419543] rounded-sm duration-200">
              <FaFileExport size={20} />
              Xuất file
            </button>
          </div>
        </div>
        <table className="w-full bg-white mt-3 text-[13px]">
          <thead className="bg-[#E6F4FB] border border-[#E6F4FB]">
            <tr className="text-black font-[600]">
              <td
                className="p-2 w-[5%]"
                onClick={() => handleSetCheckedAll(!checkedAll)}
              >
                <input
                  type="checkbox"
                  onChange={() => {}}
                  checked={checkedAll}
                />
              </td>
              <td className="p-2 w-[15%]">Mã phiếu</td>
              <td className="p-2 w-[15%]">Ngày tạo</td>
              <td className="p-2 w-[10%]">Loại phiếu</td>
              <td className="p-2 w-[15%]">Phương thức</td>
              <td className="p-2 w-[20%]">Tổng tiền</td>
              <td className="p-2 w-[10%]">Người tạo</td>
              <td className="p-2 w-[20%]">Trạng thái</td>
            </tr>
          </thead>
          <tbody>
            {filterHistoryTransaction().map(
              (item: Transaction, index: number) => (
                <React.Fragment key={item.id}>
                  <TransactionInfo
                    data={item}
                    index={index}
                    itemActive={itemActive}
                    setItemActive={setItemActive}
                    checkedItems={checkedItems}
                    setCheckedItems={handleSetCheckedItem}
                  />
                  <TransactionDetail
                    data={item}
                    itemActive={itemActive}
                    onUpdateSuccess={handleUpdateSuccess}
                  />
                </React.Fragment>
              )
            )}
            {historyTransaction?.length === 0 && (
              <tr>
                <td colSpan={6} className="p-2">
                  Không tìm thấy dịch vụ...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoicesPage;
