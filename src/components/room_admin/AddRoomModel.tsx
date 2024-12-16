import React from "react";
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
import { toast } from "react-toastify";
import SelectRoomType from "./SelectRoomType";
import SelectFloor from "./SelectFloor";
import { callApi } from "@/utils/api";
interface AddRoomModelProps {
  open: boolean;
  onClose: () => void;
  onAddSuccess: () => void;
}

const AddRoomModel: React.FC<AddRoomModelProps> = ({
  open,
  onClose,
  onAddSuccess,
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
    start_date_use: "",
    notes: "",
  });
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
    try {
      setLoading(true);
      setError(null);
      console.log("data trước khi tạo  phòng: ", formData);

      // Sử dụng callApi thay vì axios trực tiếp
      const response = await callApi<any>(
        "/api/room", // Endpoint của API
        "POST",
        formData // Dữ liệu gửi lên
      );
      console.log(response);

      // Kiểm tra mã trạng thái trả về
      if (response.data.statusCode === 200) {
        // Nếu thành công, thông báo thành công
        toast.success(`Thêm thành công !`);
        onAddSuccess();
        onClose(); // Đóng dialog sau khi gửi thành công
      } else {
        toast.error(
          response.data.message || "Có lỗi xảy ra vui lòng thử lại sau."
        );
      }

      console.log("API Response: ", response.data);
    } catch (err: any) {
      if (err.response) {
        // Lỗi từ API
        const errorMessage = err.response.data.message
          ? err.response.data.message.join(", ") // Kết hợp các lỗi trong mảng message
          : "Có lỗi xảy ra.";

        // Hiển thị lỗi vào state hoặc popup thông báo
        setError(errorMessage);
        toast.error(error);
      } else if (err.request) {
        // Không nhận được phản hồi từ API
        setError("Không nhận được phản hồi từ server.");
        toast.error(error);
      } else {
        // Lỗi không xác định

        setError("Có lỗi xảy ra.");
        toast.error(error);
      }
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
                  value={formData.start_date_use}
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
        handleUpdateSuccess={onAddSuccess}
      />
      <RoomManagerDialog
        open={isRoomCategoryDialogOpen}
        onClose={handleRoomCategoryDialogClose}
        onAddSuccess={onAddSuccess}
      />
    </div>
  );
};

export default AddRoomModel;
