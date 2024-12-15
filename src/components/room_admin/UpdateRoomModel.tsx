// components/UpdateRoomModel.tsx
import React, { useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { useState } from "react";
import { FaRegSave } from "react-icons/fa";
import { FaBan } from "react-icons/fa6";
import ImageInput from "./ImageInput";
import AddAreaPopUp from "./AddAreaPopup";
import { FaPlus } from "react-icons/fa";
import RoomManagerDialog from "./AddRoomrCategoryModal ";
import axios from "axios";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";
import SelectRoomType from "./SelectRoomType";
import SelectFloor from "./SelectFloor";
import { callApi } from "@/utils/api";
interface UpdateRoomModelProps {
  open: boolean;
  onClose: () => void;
  handleUpdateSuccess: () => void;
  idRoom: number | null;
}
const UpdateRoomModel: React.FC<UpdateRoomModelProps> = ({
  open,
  onClose,
  idRoom,
  handleUpdateSuccess,
}) => {
  const [openAreaPopup, setOpenAreaPopup] = useState(false); // Trạng thái để điều khiển popup con
  const [isRoomCategoryDialogOpen, setRoomCategoryDialogOpen] = useState(false);
  const handleRoomCategoryDialogOpen = () => setRoomCategoryDialogOpen(true);
  const handleRoomCategoryDialogClose = () => setRoomCategoryDialogOpen(false);
  const handleOpenAreaPopup = () => {
    setOpenAreaPopup(true); // Mở AddAreaPopUp
  };

  const handleCloseAreaPopup = () => {
    setOpenAreaPopup(false); // Đóng AddAreaPopUp
  };

  const [formData, setFormData] = useState({
    name: "",
    floor_id: "",
    room_type_id: "",
    start_date_use: "", // Đảm bảo chỉ có một nơi khai báo thuộc tính này
    notes: "",
  });

  // Hàm lấy dữ liệu phòng từ API
  useEffect(() => {
    if (open && idRoom) {
      console.log("test update");
      fetchRoomTypes();
    }
  }, [open, idRoom]);

  // Hàm fetchRoomTypes cập nhật formData
  const fetchRoomTypes = async () => {
    try {
      // Sử dụng callApi thay vì axios trực tiếp
      const response = await callApi<any>(
        `/api/room/${idRoom}`, // Endpoint của API
        "GET",
        formData // Dữ liệu gửi lên
      );
      if (response.data.statusCode === 200 && response.data.data) {
        const data = response.data.data;
        setFormData({
          name: data.name ?? "",
          floor_id: data.floor_id ?? "",
          room_type_id: data.room_type_id ?? "",
          start_date_use: data.start_date_use ?? "",
          notes: data.notes ?? "",
        });
      } else {
        console.error("Dữ liệu không hợp lệ:", response.data);
      }
    } catch (err) {
      console.error("Failed to fetch room type:", err);
      toast.error(`Lỗi ${err}`);
    }
  };
  // Gọi resetFormData khi dialog đóng
  // Hàm xử lý khi lựa chọn thay đổi trong select
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // Cập nhật trường được thay đổi trong state
    }));
  };
  // Hàm xử lý khi giá trị input thay đổi
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // Cập nhật trường được thay đổi trong state
    }));
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Ngừng hành động mặc định của form
    try {
      setLoading(true);
      setError(null); // Đặt lại lỗi cũ

      console.log("data trước khi tạo phòng: ", formData);
      // Sử dụng callApi thay vì axios trực tiếp
      const response = await callApi<any>(
        `/api/room/${idRoom}`, // Endpoint của API
        "PUT",
        formData // Dữ liệu gửi lên
      );

      console.log(response);

      if (response.data.statusCode === 200) {
        toast.success(`Cập nhật thành công!`);
        handleUpdateSuccess();
        onClose(); // Đóng dialog sau khi gửi thành công
      } else {
        toast.error(
          response.data.message || "Có lỗi xảy ra vui lòng thử lại sau."
        );
      }
    } catch (err: any) {
      // Kiểm tra loại lỗi và xử lý nếu không phải mảng
      const errorMessage =
        err?.response?.data?.message instanceof Array
          ? err?.response?.data?.message.join(", ") // Nếu message là mảng, join các lỗi lại
          : err?.response?.data?.message || err?.message || "Có lỗi xảy ra."; // Nếu không phải mảng, sử dụng message mặc định

      setError(errorMessage);
      toast.error(errorMessage); // Hiển thị lỗi bằng toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div onSubmit={handleSubmit}>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle className="!bg-[#f1f3f4] p-2 text-sm font-bold ">
          Phòng
        </DialogTitle>
        <DialogContent>
          <div className="flex w-full p-3 gap-5">
            <div className="w-1/2 flex flex-col gap-5">
              <div className="flex w-full text-center items-center">
                <span className="w-44 text-sm font-bold text-start flex">
                  Tên phòng <span className="text-red-500">*</span>
                </span>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  type="text"
                  className="focus:outline-none border-b w-full focus:border-green-800 focus:border-b-2"
                />
              </div>
              <div className="flex w-full text-center items-center">
                <span className="w-44 text-sm font-bold text-start flex">
                  Khu vực<span className="text-red-500">*</span>
                </span>
                <div className="flex w-full border-b gap-2">
                  <SelectFloor
                    value={formData.floor_id}
                    onChange={handleSelectChange}
                  />
                  <button
                    onClick={handleOpenAreaPopup}
                    className="text-lg font-bold  hover:bg-slate-100 rounded-full flex justify-center items-center text-center"
                  >
                    <FaPlus className="fill-lime-700 m-2" size={15} />
                  </button>
                </div>
              </div>
              <div className="flex w-full text-center items-center">
                <span className="w-44 text-sm font-bold text-start flex">
                  Hạng phòng<span className="text-red-500">*</span>
                </span>
                <div className="flex w-full border-b gap-2">
                  <SelectRoomType
                    value={formData.room_type_id}
                    onChange={handleSelectChange}
                  />
                  <button
                    onClick={handleRoomCategoryDialogOpen}
                    className="text-lg font-bold  hover:bg-slate-100 rounded-full flex justify-center items-center text-center"
                  >
                    <FaPlus className="fill-lime-700 m-2" size={15} />
                  </button>
                </div>
              </div>
              <div className="flex w-full text-center items-center">
                <span className="w-44 text-sm font-bold text-start">
                  Bắt đầu sử dụng
                </span>
                <input
                  value={formData.start_date_use.split("T")[0]}
                  onChange={handleInputChange}
                  name="start_date_use"
                  type="date"
                  className="focus:outline-none border-b w-full text-sm focus:border-green-800 focus:border-b-2"
                />
              </div>
              <div className="flex w-full text-center items-center">
                <span className="w-44 text-sm font-bold text-start">
                  Ghi chú
                </span>
                <input
                  value={formData.notes}
                  onChange={handleInputChange}
                  name="notes"
                  type="text"
                  className="focus:outline-none border-b w-full focus:border-green-800 focus:border-b-2"
                />
              </div>
            </div>
            <div className="w-1/2  rounded-sm flex flex-col gap-2">
              <div className="bg-[#f1f3f4] p-3 rounded-md">
                <div className="flex justify-between items-center text-sm">
                  Phòng sẽ được áp dụng theo giá của hạng phòng
                </div>
                <div className="text-sm flex flex-col gap-3">
                  <li>Giá giờ:</li>
                  <li>Giá cả ngày:</li>
                  <li>Giá qua đêm:</li>
                  <li>Phụ thu quá giờ:</li>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-5">
            <ImageInput />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            className="!bg-[var(--color-menu-icon-)] text-white gap-3 font-bold "
          >
            <FaBan />
            <span>Bỏ qua</span>
          </Button>
          <Button
            onClick={handleSubmit}
            className="!bg-[var(--room-empty-color-200-)] text-white gap-3 font-bold hover:!bg-[var(--navbar-color-)]"
          >
            <FaRegSave size={20} />
            <span>Lưu</span>
          </Button>
        </DialogActions>
      </Dialog>

      {/* Hiển thị AddAreaPopUp khi openAreaPopup là true */}
      <AddAreaPopUp
        open={openAreaPopup}
        onClose={handleCloseAreaPopup}
        handleUpdateSuccess={handleUpdateSuccess}
      />
      <RoomManagerDialog
        open={isRoomCategoryDialogOpen}
        onClose={handleRoomCategoryDialogClose}
      />
    </div>
  );
};

export default UpdateRoomModel;
