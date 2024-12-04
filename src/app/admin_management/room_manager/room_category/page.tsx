import axios from "axios";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { toast } from "react-toastify";
import UpdateRoomManagerDialog from "@/components/room_admin/UpdateRoomType";
import { callApi } from "@/utils/api";
import TableRoomType from "@/components/room_admin/TableRoomType";
interface Props {}
interface Room {
  roomId: number;
  roomName: string;
  floorName: string;
  status: string;
  cleanStatus: boolean;
  price: number;
}
interface RoomType {
  roomTypeId: number;
  roomTypeCode: string;
  roomTypeName: string;
  notes: string;
  hourlyRate: number;
  dailyRate: number;
  overnightRate: number;
  standardCapacity: number;
  standardChildren: number;
  maxCapacity: number;
  maxChildren: number;
  status: string;
  totalRooms: number;
  rooms: Room[];
}

const RoomCategoryPage: NextPage<Props> = ({}) => {
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(""); // Từ khóa tìm kiếm
  const [filterStatus, setFilterStatus] = useState<string>("Tất cả"); // Trạng thái lọc
  //--------------------------
  const [selectedRoomTypeId, setSelectedRoomTypeId] = useState<number | null>(
    null
  );
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);

  // Mở dialog với roomTypeId
  const handleOpenUpdateDialog = (id: number) => {
    setSelectedRoomTypeId(id);
    setUpdateDialogOpen(true);
  };

  const handleCloseUpdateDialog = () => {
    setSelectedRoomTypeId(null);
    setUpdateDialogOpen(false);
  };

  // Callback khi cập nhật thành công
  const handleUpdateSuccess = () => {
    fetchRoomTypes(); // Gọi lại API để cập nhật danh sách
  };
  // Hàm lấy dữ liệu phòng từ API
  const fetchRoomTypes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await callApi<any>(
        `/api/room-type/findAllRoomType`, // Endpoint của API
        "GET"
      );

      // Kiểm tra nếu response trả về mảng và gán vào state roomTypes
      if (Array.isArray(response.data.data)) {
        setRoomTypes(response.data.data);
      } else {
        setError("Không có data");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Hàm xóa hạng phòng
  const deleteTransaction = async (id: number, code: string) => {
    try {
      // Gửi yêu cầu xóa dữ liệu
      const response = await callApi<any>(
        `/api/room-type/${id}`, // Endpoint của API
        "DELETE"
      );

      // Kiểm tra mã trạng thái trả về
      if (response.data.statusCode === 200) {
        // Nếu thành công, thông báo thành công
        toast.success(`Xóa hạng phòng ${code} thành công!`);
      } else {
        // Nếu thất bại (ví dụ: mã lỗi 404), thông báo thất bại với message trả về từ API
        toast.error(response.data.message || "Có lỗi xảy ra khi xóa.");
      }

      fetchRoomTypes();
    } catch (err: any) {
      // Kiểm tra và log chi tiết lỗi
      if (axios.isAxiosError(err)) {
        // Nếu là lỗi axios, log thông tin trả về
        console.error(
          `Lỗi khi xóa hạng phòng với ID: ${id}`,
          err.response?.data || err.message
        );
      } else {
        // Log lỗi khác ngoài axios (nếu có)
        console.error("Lỗi không xác định:", error);
      }
    }
  };

  // Gọi fetchRoomTypes khi component mount
  useEffect(() => {
    fetchRoomTypes();
  }, []); // Chạy 1 lần khi component mount

  const removeVietnameseTones = (str: string): string => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu tiếng Việt
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase(); // Chuyển sang chữ thường
  };
  const filterRoomTypes = (): RoomType[] => {
    return roomTypes.filter((roomType) => {
      // Chuẩn hóa dữ liệu tìm kiếm và dữ liệu gốc
      const normalizedSearchQuery = removeVietnameseTones(searchQuery);
      const normalizedRoomTypeName = removeVietnameseTones(
        roomType.roomTypeName
      );
      const normalizedRoomTypeCode = removeVietnameseTones(
        roomType.roomTypeCode
      );

      // Kiểm tra trạng thái
      const matchesStatus =
        filterStatus === "Tất cả" || roomType.status === filterStatus;

      // Kiểm tra tìm kiếm (theo tên hoặc mã phòng)
      const matchesSearch =
        normalizedRoomTypeName.includes(normalizedSearchQuery) ||
        normalizedRoomTypeCode.includes(normalizedSearchQuery);

      return matchesStatus && matchesSearch;
    });
  };

  return (
    <div className="flex flex-col bg-white cash-fund_content border !border-[var(--ht-neutral-100-)] rounded-md p-3">
      <div className="flex gap-5 items-center text-center">
        <div className="border w-60 flex justify-center items-center py-1 px-2">
          <input
            type="text"
            placeholder="Tìm kiếm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className=" w-full  focus:outline-none focus:border-none"
          />
          <IoMdSearch />
        </div>
        <div className="flex gap-2 text-center items-center py-1 px-2 bg-white">
          <span>Trạng thái:</span>
          <select
            name="status"
            className="focus:outline-none   border  py-1 px-2 "
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="Tất cả">Tất cả</option>
            <option value="ACTIVE">Đang kinh doanh</option>
            <option value="Ngừng kinh doanh">Ngừng kinh doanh</option>
          </select>
        </div>
      </div>
      {/* Danh sách hạng phòng */}
      <TableRoomType
        loading={loading}
        error={error}
        roomTypes={filterRoomTypes()}
        deleteTransaction={deleteTransaction}
        handleOpenUpdateDialog={handleOpenUpdateDialog}
      />
      {/* Dialog Update */}
      <UpdateRoomManagerDialog
        isOpen={isUpdateDialogOpen}
        onClose={handleCloseUpdateDialog}
        roomTypeId={selectedRoomTypeId}
        onUpdateSuccess={handleUpdateSuccess}
      />
    </div>
  );
};

export default RoomCategoryPage;
