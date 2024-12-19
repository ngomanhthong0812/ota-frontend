"use client";
import { BookingHistory, Services, User, UserAdmin } from "@/types/backend";

import { MdOutlineCheckBox } from "react-icons/md";
import { FaFileExport, FaPrint } from "react-icons/fa6";
import { GoLock } from "react-icons/go";
import ModalConfirm from "@/components/modal_confirm";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { callApi } from "@/utils/api";

interface IProps {
  data: BookingHistory;
  itemActive: number | null;
  onUpdateSuccess: () => void;
}
const RoomOrderDetail: React.FC<IProps> = ({
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
    if (data.booking_id) {
      try {
        if (data.booking_status === "CheckedOut") return toast(`Không thể hủy`);
        const response = await callApi<any>(
          `/api/bookings/${data.booking_id}`,
          "PUT",
          { status: "Cancelled" }
        );

        // Kiểm tra phản hồi từ API
        if (response.data.statusCode === 200) {
          setShowModalConfirmUpdateStatus(false);
          toast(`Hủy thành công DP00${data.booking_id}`);
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
          itemActive === data?.booking_id
            ? "border border-t-0 border-[#0090da] "
            : "hidden"
        }`}
      >
        <td colSpan={7} className="bg-[#ebf5ea] m-0 p-0">
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
                  <span>Mã đặt phòng:</span>
                  <span>DP00{data.booking_id}</span>
                </p>
                <p className="py-3 border-b flex gap-5 justify-between items-center w-full">
                  <span>Thời gian:</span>
                  <span>{formatDate(data.booking_time)}</span>
                </p>
                <p className="py-3 border-b flex gap-5 justify-between items-center w-full">
                  <span>Khách hàng:</span>
                  <span>{data.customer_name}</span>
                </p>
              </div>
              <div className="w-1/2">
                <p className="py-3 border-b flex gap-5 justify-between items-center w-full">
                  <span>Bảng giá:</span>
                  <span>Bảng giá chung</span>
                </p>
                <p className="py-3 border-b flex gap-5 justify-between items-center w-full">
                  <span>Kênh bán:</span>
                  <span>Khách đến trực tiếp</span>
                </p>
                <p className="py-3 border-b flex gap-5 justify-between items-center w-full">
                  <span>Trạng thái:</span>
                  <span>{data.booking_status}</span>
                </p>
                {/* <p className="py-3 border-b flex gap-5 justify-between items-center w-full">
                <span>Nhân viên đặt:</span>
                <span>Quang trịnh</span>
              </p> */}
              </div>
            </div>
            <div className="flex w-full flex-col mt-5">
              <table className="w-full border">
                <thead className="bg-[#E6F4FB] border border-[#E6F4FB]">
                  <tr className="text-black font-[600]">
                    <td className="p-2 w-[15%]">Mã hàng hóa</td>
                    <td className="p-2 w-[25%]">Tên hàng</td>
                    <td className="p-2 w-[15%] text-center">Số lượng ngày</td>
                    <td className="p-2 w-[15%]">Đơn giá</td>
                    <td className="p-2 w-[15%]">giá bán</td>
                    <td className="p-2 w-[20%]">Thành tiền</td>
                  </tr>
                </thead>
                <tbody>
                  {data.rooms.map((room, index) => (
                    <tr
                      key={index}
                      className={`cursor-pointer ${
                        index % 2 === 0 && "bg-[#f9f9f9]"
                      } hover:bg-[#ebf5ea] duration-200`}
                    >
                      <td className="p-2">{room.room_type_code}</td>
                      <td className="p-2 flex flex-col">
                        <div className="flex">
                          {room.room_type_name}:{room.room_name}
                        </div>
                        <div className="flex text-[10px] italic">
                          <span>{formatDate(data.booking_time)}</span>
                          <span>-</span>
                          <span>{formatDate(data.check_out_at)}</span>(
                          {room.room_night_count}ngày)
                        </div>
                      </td>
                      <td className="p-2 text-center">
                        {room.room_night_count}
                      </td>
                      <td className="p-2">{formatCurrency(room.room_price)}</td>
                      <td className="p-2">{formatCurrency(room.room_price)}</td>
                      <td className="p-2">
                        {formatCurrency(room.room_total_amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="justify-end items-end flex flex-col mt-5">
                <div className="flex justify-between w-1/4">
                  <span className="text-black">Tổng tiền hàng:</span>
                  <span className="font-bold text-black">
                    {formatCurrency(data.total_amount)}
                  </span>
                </div>
                <div className="flex justify-between w-1/4">
                  <span className="text-black">Khách đã trả: </span>
                  <span className="font-bold text-black">
                    {formatCurrency(data.paid_amount)}
                  </span>
                </div>
                <div className="flex justify-between w-1/4">
                  <span className="text-black"> Còn cần trả:</span>
                  <span className="font-bold text-black">
                    {formatCurrency(data.total_amount_to_pay)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 text-white font-[600] mt-8">
              <button className="flex items-center justify-center gap-2 bg-[#4bac4d] hover:bg-[#419543] px-5 py-2 rounded-md duration-150">
                <MdOutlineCheckBox size={20} />
                Lưu
              </button>
              <button className="flex items-center justify-center gap-2 bg-[#808080] hover:bg-[#419543] px-5 py-2 rounded-md duration-150">
                <FaPrint size={20} />
                In
              </button>
              <button className="flex gap-2 border-none py-[6px] px-4 text-white bg-[#808080] hover:bg-[#419543] rounded-sm duration-200">
                <FaFileExport size={20} />
                Xuất file
              </button>
              {data.booking_status === "Booked" ? (
                <button
                  onClick={() => setShowModalConfirmUpdateStatus(true)}
                  className="flex items-center justify-center gap-2 bg-[#db4e65] hover:bg-[#d5324d] px-5 py-2 rounded-md duration-150"
                >
                  <GoLock size={20} />
                  Hủy đặt phòng
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
          {data.booking_status === "Booked" ? (
            <ModalConfirm
              showModalConfirm={showModalConfirmUpdateStatus}
              setShowModalConfirm={setShowModalConfirmUpdateStatus}
              title={"Xác nhận"}
              content={`Bạn có chắc chắn muốn hủy đặt phòng này? Thông tin và giao dịch của dịch vụ vẫn sẽ được giữ.`}
              handleSubmit={handleUpdateStatus}
            />
          ) : (
            <ModalConfirm
              showModalConfirm={showModalConfirmUpdateStatus}
              setShowModalConfirm={setShowModalConfirmUpdateStatus}
              title={"Xác nhận"}
              content={`Bạn có chắc chắn muốn dịch vụ này hoạt động trở lại?`}
              handleSubmit={handleUpdateStatus}
            />
          )}
        </td>
      </tr>
    </>
  );
};
export default RoomOrderDetail;
