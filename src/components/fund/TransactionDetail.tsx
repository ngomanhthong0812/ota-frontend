"use client";
import {
  BookingHistory,
  Services,
  Transaction,
  User,
  UserAdmin,
} from "@/types/backend";

import { MdOutlineCheckBox } from "react-icons/md";
import { FaFileExport, FaPrint } from "react-icons/fa6";
import { GoLock } from "react-icons/go";
import ModalConfirm from "@/components/modal_confirm";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { callApi } from "@/utils/api";

interface IProps {
  data: Transaction;
  itemActive: number | null;
  onUpdateSuccess: () => void;
}
const TransactionDetail: React.FC<IProps> = ({
  data,
  itemActive,
  onUpdateSuccess,
}) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };
  const formatCurrency = (amount: number): string => {
    // Định dạng theo kiểu Việt Nam, sử dụng dấu phẩy là phân cách hàng nghìn
    return new Intl.NumberFormat("en-US").format(amount);
  };
  const [showModalConfirmUpdateStatus, setShowModalConfirmUpdateStatus] =
    useState<boolean>(false);
  const handleUpdateStatus = async () => {
    if (data.id) {
      try {
        if (data.status === "cancelled") return toast(`Không thể hủy`);
        const response = await callApi<any>(`/api/bookings/${data.id}`, "PUT", {
          status: "Cancelled",
        });

        // Kiểm tra phản hồi từ API
        if (response.data.statusCode === 200) {
          setShowModalConfirmUpdateStatus(false);
          toast(`Hủy thành công DP00${data.id}`);
          onUpdateSuccess();
        } else {
          setShowModalConfirmUpdateStatus(false);
          toast.error(response.data.message);
        }
      } catch (error) {
        setShowModalConfirmUpdateStatus(false);
        // In thông tin lỗi khi gặp sự cố
        console.log("Lỗi khi gửi dữ liệu:", error);
      }
    }
  };
  return (
    <>
      <tr
        className={`${
          itemActive === data?.id
            ? "border border-t-0 border-[#0090da] "
            : "hidden"
        }`}
      >
        <td colSpan={8} className="bg-[#ebf5ea] m-0 p-0">
          <div className="toolbar px-8 flex">
            <button className="bg-white border border-b-white py-[4px] px-3 rounded-t-sm border-[#d1d1d1] font-[500] mb-[-1px]">
              Thông tin
            </button>
            {/* <div className="py-[6px] px-4 rounded-t-sm font-[500]">Lịch làm việc</div> */}
          </div>
          <div className="content bg-white px-8 py-5  border-t border-[#d1d1d1]">
            <div className="flex gap-8 w-full">
              <div className="w-1/2">
                <p className="py-3 border-b flex gap-5 justify-between items-center w-full">
                  <span>Mã phiếu:</span>
                  <span>{data.code}</span>
                </p>
                <p className="py-3 border-b flex gap-5 justify-between items-center w-full">
                  <span>Thời gian:</span>
                  <span>{formatDate(data.createdAt)}</span>
                </p>
                <p className="py-3 border-b flex gap-5 justify-between items-center w-full">
                  <span>Người tạo:</span>
                  <span>{data.user.name}</span>
                </p>
                <p className="py-3 border-b flex gap-5 justify-between items-center w-full">
                  <span>Nội dung:</span>
                  <span>{data.content}</span>
                </p>
              </div>
              <div className="w-1/2">
                <p className="py-3 border-b flex gap-5 justify-between items-center w-full">
                  <span>Bảng giá:</span>
                  <span>{formatCurrency(data.amount)}</span>
                </p>
                <p className="py-3 border-b flex gap-5 justify-between items-center w-full">
                  <span>Phương thức:</span>
                  <span>
                    {data.paymentType === "cash" ? "Tiền mặt" : "Chuyển khoản"}
                  </span>
                </p>
                <p className="py-3 border-b flex gap-5 justify-between items-center w-full">
                  <span>Trạng thái:</span>
                  <span>
                    {data.status === "active" ? "Hoạt động" : "Đã hủy"}
                  </span>
                </p>
                <p className="py-3 border-b flex gap-5 justify-between items-center w-full">
                  <span>Tài khoản nhận:</span>
                  <span>{data.bankTransaction?.receiverAccount}</span>
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 text-white font-[600] mt-8">
              <button className="flex items-center justify-center gap-2 bg-[#808080] hover:bg-[#419543] px-5 py-2 rounded-md duration-150">
                <FaPrint size={20} />
                In
              </button>
              <button className="flex gap-2 border-none py-[6px] px-4 text-white bg-[#808080] hover:bg-[#419543] rounded-sm duration-200">
                <FaFileExport size={20} />
                Xuất file
              </button>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};
export default TransactionDetail;
