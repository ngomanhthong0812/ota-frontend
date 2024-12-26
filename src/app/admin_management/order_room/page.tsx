"use client";
import { useAuth } from "@/context/auth.context";
import { BookingHistory } from "@/types/backend";
import { STATUS_BOOKINGS } from "@/constants/constants";

import React, { useEffect, useState } from "react";

import { BiMenuAltLeft, BiChevronDown } from "react-icons/bi";
import { CgTrash } from "react-icons/cg";
import RoomOrderInfo from "@/components/room/room_order/RoomOrderInfo";
import RoomOrderDetail from "@/components/room/room_order/RoomOrderDetail";
import { FaFileExport } from "react-icons/fa6";
import { callApi } from "@/utils/api";
import ModalConfirm from "@/components/modal_confirm";

const OrderRoomPage = () => {
  const [itemActive, setItemActive] = useState<number | null>(null);

  const [historyBookings, setHistoryBookings] = useState<BookingHistory[]>([]);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [checkedAll, setCheckedAll] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  const [status, setStatus] = useState<string>("all");
  const { user } = useAuth();

  const fetchHistoryBookings = async () => {
    if (!user) return; // Đảm bảo user đã có giá trị
    try {
      setLoading(true);
      setError(null);
      const response = await callApi<any>(
        `/api/bookings/history/bookings?hotelId=${user.hotel_id}`,
        "GET"
      );
      if (Array.isArray(response.data.data)) {
        setHistoryBookings(response.data.data);
      } else {
        setError("Không tìm thấy dữ liệu phòng.");
      }
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra trong quá trình lấy dữ liệu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoryBookings();
  }, [user]); // Duy trì gọi lại khi `user` thay đổi
  const handleUpdateSuccess = () => {
    fetchHistoryBookings(); // Gọi lại API để cập nhật danh sách
  };
  useEffect(() => {
    if (historyBookings?.length > 0) {
      if (historyBookings?.length === checkedItems.length) {
        setCheckedAll(true);
      } else {
        setCheckedAll(false);
      }
    }
  }, [checkedItems, historyBookings]);

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
      historyBookings.forEach((item) => {
        items.push(item.booking_id);
      });
      setCheckedItems(items);
    } else {
      setCheckedItems([]);
    }
  };

  const removeVietnameseTones = (str: string): string => {
    if (!str) { return '' }
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const filterHistoryBookings = (): BookingHistory[] => {
    return historyBookings.filter((booking) => {
      const normalizedSearchQuery = removeVietnameseTones(search.toLowerCase());
      const normalizedCustomerName = removeVietnameseTones(
        booking.customer_name.toLowerCase()
      );
      const normalizedBookingStatus = removeVietnameseTones(
        booking.booking_status.toLowerCase()
      );
      const normalizedBookingId = removeVietnameseTones(
        String(booking.booking_id).toLowerCase()
      );

      const matchesRoomName = booking.rooms.some((room) =>
        removeVietnameseTones(room.room_name?.toLowerCase()).includes(
          normalizedSearchQuery
        )
      );

      const matchesSearchQuery =
        normalizedCustomerName.includes(normalizedSearchQuery) ||
        normalizedBookingStatus.includes(normalizedSearchQuery) ||
        normalizedBookingId.includes(normalizedSearchQuery) ||
        matchesRoomName;

      const matchesBookingStatus =
        status === "all" || booking.booking_status === status;

      return matchesSearchQuery && matchesBookingStatus;
    });
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
            placeholder="Phòng,mã phòng hoặc tên khách hàng"
          />
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
                checked={status === "Booked"}
                type="radio"
                name="userStatus"
                value="Booked"
              />
              {STATUS_BOOKINGS.BOOKED}
            </li>
            <li className="flex items-center gap-1">
              <input
                onChange={(e) => setStatus(e.target.value)}
                checked={status === "Cancelled"}
                type="radio"
                name="userStatus"
                value="Cancelled"
              />
              {STATUS_BOOKINGS.CANCELLED}
            </li>
            <li className="flex items-center gap-1">
              <input
                onChange={(e) => setStatus(e.target.value)}
                checked={status === "CheckedIn"}
                type="radio"
                name="userStatus"
                value="CheckedIn"
              />
              {STATUS_BOOKINGS.CHECKED_IN}
            </li>
            <li className="flex items-center gap-1">
              <input
                onChange={(e) => setStatus(e.target.value)}
                checked={status === "CheckedOut"}
                type="radio"
                name="userStatus"
                value="CheckedOut"
              />
              {STATUS_BOOKINGS.CHECKED_OUT}
            </li>
            <li className="flex items-center gap-1">
              <input
                onChange={(e) => setStatus(e.target.value)}
                checked={status === "NoShow"}
                type="radio"
                name="userStatus"
                value="NoShow"
              />
              {STATUS_BOOKINGS.NO_SHOW}
            </li>
          </ul>
        </section>
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <p className="font-[600] text-2xl text-[#323232]">Đặt phòng</p>
          <div className="flex gap-2">
            {checkedItems.length > 0 && (
              <button className="relative group flex gap-2 border-none py-[6px] px-4 text-white bg-[#4bac4d] hover:bg-[#419543] rounded-sm duration-200">
                <BiMenuAltLeft size={20} /> Thao tác <BiChevronDown size={20} />
                <div className="absolute left-0 top-8 min-w-[230px] py-2 rounded-md text-[#565656] bg-white invisible group-hover:visible">
                  <p className="py-2 px-5 hover:bg-slate-50 flex gap-1">
                    <CgTrash size={20} />
                    Hủy đạt phòng
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
                  onChange={() => { }}
                  checked={checkedAll}
                />
              </td>
              <td className="p-2 w-[15%]">Mã đặt phòng</td>
              <td className="p-2 w-[15%]">Trạng thái</td>
              <td className="p-2 w-[20%]">Thời gian đặt</td>
              <td className="p-2 w-[15%]">Tên phòng</td>
              <td className="p-2 w-[20%]">Khách hàng</td>
              <td className="p-2 w-[20%]">Tổng tiền</td>
            </tr>
          </thead>
          <tbody>
            {filterHistoryBookings().map(
              (item: BookingHistory, index: number) => (
                <React.Fragment key={item.booking_id}>
                  <RoomOrderInfo
                    data={item}
                    index={index}
                    itemActive={itemActive}
                    setItemActive={setItemActive}
                    checkedItems={checkedItems}
                    setCheckedItems={handleSetCheckedItem}
                  />
                  <RoomOrderDetail
                    data={item}
                    itemActive={itemActive}
                    onUpdateSuccess={handleUpdateSuccess}
                  />
                </React.Fragment>
              )
            )}
            {historyBookings?.length === 0 && (
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

export default OrderRoomPage;
