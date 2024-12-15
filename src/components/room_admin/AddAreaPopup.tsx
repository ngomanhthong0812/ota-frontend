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
import { toast } from "react-toastify";
import { callApi } from "@/utils/api";
import SelectFloor from "./SelectFloor";

interface Props {
  open: boolean;
  onClose: () => void;
  handleUpdateSuccess: () => void;
}

const AddAreaPopUp: React.FC<Props> = ({
  open,
  onClose,
  handleUpdateSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    note: "",
    floor_id: "",
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Ngừng hành động mặc định của form
    setLoading(true); // Đặt trạng thái loading khi gửi yêu cầu

    try {
      // Sử dụng callApi thay vì axios trực tiếp
      const response = await callApi<any>(
        "/api/floor", // Endpoint của API
        "POST",
        formData // Dữ liệu gửi lên
      );
      // Kiểm tra mã trạng thái trả về
      if (response.data.statusCode === 200) {
        // Nếu thành công, thông báo thành công
        toast.success(`Thêm thành công !`);
        handleUpdateSuccess();
        onClose(); // Đóng dialog sau khi gửi thành công
      } else {
        toast.error(
          response.data.message || "Có lỗi xảy ra vui lòng thử lại sau."
        );
      }
    } catch (error) {
      console.error("Có lỗi khi thêm tầng:", error);
    } finally {
      setLoading(false); // Đặt trạng thái loading về false
    }
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle className="!bg-[#f1f3f4] p-2 text-sm font-bold ">
        Thêm khu vực
      </DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-5 mt-5">
          <div className="flex w-full text-center items-center ">
            <span className="w-36 text-sm font-bold text-start flex justify-between">
              Khu vực <span className="text-red-500 text-lg mr-1">*</span>
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
            <span className="w-36 text-sm font-bold text-start flex">
              Ghi chú
            </span>
            <input
              name="note"
              value={formData.note}
              onChange={handleInputChange}
              type="text"
              className="focus:outline-none border-b w-full focus:border-green-800 focus:border-b-2"
            />
          </div>
          <div className="flex w-full text-center items-center">
            <span className="w-36 text-sm font-bold text-start">
              Khu vực cha
            </span>
            <div className="focus:outline-none border-b w-full text-sm">
              <SelectFloor
                value={formData.floor_id}
                onChange={handleSelectChange}
              />
            </div>
          </div>
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
  );
};

export default AddAreaPopUp;
