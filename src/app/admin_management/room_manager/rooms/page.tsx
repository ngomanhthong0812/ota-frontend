"use client";
import AreaComponent from "@/components/room_admin/Area";
import RoomTable from "@/components/room_admin/RoomTable";
import UpdateRoomModel from "@/components/room_admin/UpdateRoomModel";
import { callApi } from "@/utils/api";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { toast } from "react-toastify";

// Định nghĩa các kiểu dữ liệu cần dùng
interface IProps {
  reloadTrigger: number;
}
interface roomType {
  code: string;
  name: string;
  notes: string;
  hourlyRate: number;
  dailyRate: number;
  overnightRate: number;
  standardCapacity: number;
  standardChildren: number;
  maxCapacity: number;
  maxChildren: number;
  created_at: Date;
  updated_at: Date;
}
interface floor {
  name: string;
  level: number;
  room_count: number;
}
interface Room {
  id: number;
  name: string;
  clean_status: boolean;
  price: string;
  notes: string;
  start_date_use: string;
  room_type: roomType;
  floor: floor;
  status: string;
}

const RoomsPage: React.FC<IProps> = ({ reloadTrigger }) => {
  // State để quản lý danh sách phòng và trạng thái liên quan
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [idRoom, setIdRoom] = useState<number | null>(null);
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("Tất cả");

  // Fetch danh sách phòng
  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await callApi<any>("/api/room/getrooms/all", "GET");
      if (Array.isArray(response.data.data)) {
        setRooms(response.data.data);
      } else {
        setError("Không tìm thấy dữ liệu phòng.");
      }
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra trong quá trình lấy dữ liệu.");
    } finally {
      setLoading(false);
    }
  };

  // Gọi API khi component mount
  useEffect(() => {
    fetchRooms();
  }, [reloadTrigger]);
  const handleUpdateSuccess = () => {
    fetchRooms(); // Gọi lại API để cập nhật danh sách
  };
  // Xóa phòng
  const deleteRoom = async (id: number, name: string) => {
    try {
      const response = await callApi<any>(`/api/room/${id}`, "DELETE");
      if (response.data.statusCode === 200) {
        toast.success(`Xóa phòng ${name} thành công!`);
        fetchRooms(); // Cập nhật danh sách phòng
      } else {
        toast.error(response.data.message || "Có lỗi xảy ra khi xóa phòng.");
      }
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        console.error(
          `Lỗi khi xóa phòng ID: ${id}`,
          err.response?.data || err.message
        );
      } else {
        console.error("Lỗi không xác định:", err);
      }
    }
  };

  // Mở dialog cập nhật phòng
  const handleOpenUpdateDialog = (id: number) => {
    setIdRoom(id);
    setUpdateDialogOpen(true);
  };

  const handleCloseUpdateDialog = () => {
    setIdRoom(null);
    setUpdateDialogOpen(false);
  };
  const removeVietnameseTones = (str: string): string => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu tiếng Việt
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase(); // Chuyển sang chữ thường
  };
  const filterRooms = (): Room[] => {
    return rooms.filter((room) => {
      // Chuẩn hóa dữ liệu tìm kiếm và dữ liệu gốc
      const normalizedSearchQuery = removeVietnameseTones(searchQuery);
      const normalizedRoomName = removeVietnameseTones(room.name);
      const normalizedRoomCode = removeVietnameseTones(room.room_type.name);

      // Kiểm tra trạng thái

      // Kiểm tra tìm kiếm (theo tên hoặc mã phòng)
      const matchesSearch =
        normalizedRoomName.includes(normalizedSearchQuery) ||
        normalizedRoomCode.includes(normalizedSearchQuery);

      // Kiểm tra trạng thái
      const matchesStatus =
        statusFilter === "Tất cả" || room.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  };
  return (
    <div className="flex gap-5">
      <AreaComponent />
      <div className="flex w-full flex-col bg-white border rounded-md p-3">
        {/* Bộ lọc và tìm kiếm */}
        <div className="flex gap-5 items-center">
          <div className="border w-60 flex items-center py-1 px-2">
            <input
              type="text"
              placeholder="Tìm kiếm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full focus:outline-none"
            />
            <IoMdSearch />
          </div>
          <div className="flex gap-2 items-center  py-1 px-2 bg-white">
            <span>Trạng thái:</span>
            <select
              name="status"
              className="focus:outline-none border  py-1 px-2"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="Tất cả">Tất cả</option>
              <option value="Có khách">Có khách</option>
              <option value="Đang đến">Đang đến</option>
              <option value="Trống">Trống</option>
              <option value="Đã đặt">Đã đặt</option>
            </select>
          </div>
        </div>

        {/* Component bảng danh sách phòng */}
        <RoomTable
          rooms={filterRooms()}
          loading={loading}
          error={error}
          handleOpenUpdateDialog={handleOpenUpdateDialog}
          deleteRoom={deleteRoom}
        />
      </div>

      {/* Dialog cập nhật thông tin phòng */}
      <UpdateRoomModel
        handleUpdateSuccess={handleUpdateSuccess}
        open={isUpdateDialogOpen}
        onClose={handleCloseUpdateDialog}
        idRoom={idRoom}
      />
    </div>
  );
};

export default RoomsPage;
