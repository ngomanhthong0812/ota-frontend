// components/RoomManagerDialog.tsx
import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Tab,
  Tabs,
  Box,
} from "@mui/material";
import { useState } from "react";
import { FaPencilAlt, FaRegSave } from "react-icons/fa";
import { FaBan } from "react-icons/fa6";
import ImageInput from "./ImageInput";
import axios from "axios";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";

interface RoomManagerDialogProps {
  open: boolean;
  onClose: () => void;
}
const cookies = parseCookies();
const token = cookies.access_token; // Giả sử cookie chứa access_token
const RoomManagerDialog: React.FC<RoomManagerDialogProps> = ({
  open,
  onClose,
}) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    notes: "",
    hourlyRate: "",
    dailyRate: "",
    overnightRate: "",
    standardCapacity: 2,
    standardChildren: 2,
    maxCapacity: 2,
    maxChildren: 2,
  });
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;

  //   // Kiểm tra nếu là trường số
  //   if (e.target.type === "number") {
  //     // Chuyển giá trị nhập thành số
  //     const numValue = Number(value);

  //     // Nếu giá trị không phải là số hoặc số âm, đặt lại giá trị về 0
  //     if (isNaN(numValue) || numValue < 0) {
  //       // Cập nhật lại formData với giá trị mặc định 0
  //       setFormData({
  //         ...formData,
  //         [name]: 0,
  //       });
  //       return;
  //     }

  //     // Cập nhật giá trị vào formData
  //     setFormData({
  //       ...formData,
  //       [name]: numValue, // Lưu giá trị là số
  //     });
  //   } else {
  //     // Nếu không phải là số, cập nhật giá trị dưới dạng chuỗi
  //     setFormData({
  //       ...formData,
  //       [name]: value,
  //     });
  //   }
  // };

  // Hàm reset formData khi đóng dialog
  const resetFormData = () => {
    setFormData({
      code: "",
      name: "",
      notes: "",
      hourlyRate: "",
      dailyRate: "",
      overnightRate: "",
      standardCapacity: 2,
      standardChildren: 2,
      maxCapacity: 2,
      maxChildren: 2,
    });
  };

  // Gọi resetFormData khi dialog đóng
  React.useEffect(() => {
    if (!open) {
      resetFormData();
    }
  }, [open]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hàm xử lý thay đổi giá trị input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Kiểm tra nếu là trường số
    if (e.target.type === "number") {
      const numValue = Number(value);
      if (isNaN(numValue) || numValue < 0) {
        setFormData({ ...formData, [name]: 0 });
        return;
      }
      setFormData({ ...formData, [name]: numValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Hàm gửi dữ liệu lên API
  const submitRoomData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/room-type`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Kiểm tra mã trạng thái trả về
      if (response.data.statusCode === 200) {
        // Nếu thành công, thông báo thành công
        toast.success(`Thêm thành công !`);
        onClose(); // Đóng dialog sau khi gửi thành công
      } else {
        toast.error(response.data.message || "Có lỗi xảy ra vui lòng thử lại sau.");
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("data gửi đi: ", formData);
    submitRoomData();
  };

  return (
    <div onSubmit={handleSubmit}>
      <Dialog
        open={open}
        onClose={() => {
          onClose();
          resetFormData();
        }}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle className="!bg-[#f1f3f4] p-2 text-sm font-bold ">
          Thêm Hạng Phòng Mới
        </DialogTitle>
        <DialogContent>
          <Box sx={{ width: "100%" }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Thông tin" className="text-sm capitalize" />
              <Tab label="Hình ảnh, Mô tả" className="text-sm capitalize" />
              <Tab label="Danh sách phòng" className="text-sm capitalize" />
            </Tabs>
            <Box sx={{ padding: "16px" }}>
              {tabValue === 0 && (
                <div className="flex flex-col gap-4 text-sm">
                  <div className="flex gap-5">
                    <label
                      htmlFor="codeRoom"
                      className="w-[20%] font-semibold text-black"
                    >
                      Mã hạng phòng:
                    </label>
                    <input
                      type="text"
                      id="codeRoom"
                      name="code"
                      value={formData.code}
                      onChange={handleInputChange}
                      className="focus:outline-none border-b w-full focus:border-green-800 focus:border-b-2"
                      placeholder="Mã hạng phòng tự động"
                    />
                  </div>
                  <div className="flex gap-5">
                    <label
                      htmlFor="roomName"
                      className="w-[20%] font-semibold text-black"
                    >
                      Tên hạng phòng:
                    </label>
                    <input
                      type="text"
                      id="roomName"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="focus:outline-none border-b  w-full focus:border-green-800 focus:border-b-2"
                    />
                  </div>
                  <div className="gio">
                    <div className="flex w-full gap-10">
                      <div className="flex flex-col w-1/2 gap-4 ">
                        <div className="flex gap-5 ">
                          <label
                            htmlFor="hourlyRate"
                            className="w-[50%] font-semibold text-black"
                          >
                            Giá giờ:
                          </label>
                          <input
                            type="number"
                            id="hourlyRate"
                            name="hourlyRate"
                            value={formData.hourlyRate}
                            onChange={handleInputChange}
                            className="focus:outline-none border-b w-full focus:border-green-800 focus:border-b-2 text-end"
                          />
                        </div>
                        <div className="flex gap-5 ">
                          <label
                            htmlFor="dailyRate"
                            className="w-[50%] font-semibold text-black"
                          >
                            Giá cả ngày giờ:
                          </label>
                          <input
                            type="number"
                            id="dailyRate"
                            name="dailyRate"
                            value={formData.dailyRate}
                            onChange={handleInputChange}
                            className="focus:outline-none border-b w-full focus:border-green-800 focus:border-b-2 text-end"
                          />
                        </div>
                        <div className="flex gap-5 ">
                          <label
                            htmlFor="overnightRate"
                            className="w-[50%] font-semibold text-black"
                          >
                            Giá qua đêm:
                          </label>
                          <input
                            type="number"
                            id="overnightRate"
                            name="overnightRate"
                            value={formData.overnightRate}
                            onChange={handleInputChange}
                            className="focus:outline-none border-b w-full focus:border-green-800 focus:border-b-2 text-end"
                          />
                        </div>
                      </div>
                      <div className="w-1/2 bg-[#f1f3f4] p-4 rounded-sm flex flex-col gap-3">
                        <div className="flex justify-between items-center text-sm">
                          <span>Thời gian nhận và trả quy định</span>
                          <FaPencilAlt size={15} className="fill-black" />
                        </div>
                        <div className="text-sm flex flex-col gap-3">
                          <li>Cả ngày tính từ 14:00 đến 12:00</li>
                          <li>Qua đêm tính từ 22:00 đến 11:00</li>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-md">
                    <h5 className="bg-[#f1f3f4] p-2 rounded-t-md font-semibold text-black">
                      Phụ thu quá giờ (khi quá giờ quy định)
                    </h5>
                    <div className="p-4">
                      <div className="flex w-full gap-5 mt-3 ">
                        <div className="flex gap-5  w-1/2 items-center text-center">
                          <span className="font-semibold text-black">
                            Hình thức
                          </span>
                          <select className="focus:outline-none border-b  focus:border-green-800 focus:border-b-2">
                            <option value="">Tính tiền mỗi giờ</option>
                            <option value="">
                              Tính tiền theo % tiền phòng
                            </option>
                          </select>
                        </div>
                        <div className="flex flex-col  w-1/2 gap-2">
                          <div className="flex gap-2 w-full">
                            <span className="font-semibold text-black w-24">
                              Nhận sớm từ
                            </span>
                            <input
                              type="number"
                              className="w-6 text-center focus:outline-none border-b"
                              value={1}
                              onChange={handleInputChange}
                            />
                            <span>giờ,phụ thu</span>
                            <input
                              type="number"
                              className="w-6 text-center focus:outline-none border-b"
                              value={2}
                              onChange={handleInputChange}
                            />
                            <span>%</span>
                          </div>
                          <div className="flex gap-2 w-full">
                            <span className="font-semibold text-black w-24">
                              Trả muộn từ
                            </span>
                            <input
                              type="number"
                              className="w-6 text-center focus:outline-none border-b"
                              value={2}
                              onChange={handleInputChange}
                            />
                            <span>giờ,phụ thu</span>
                            <input
                              type="number"
                              className="w-6 text-center focus:outline-none border-b"
                              value={2}
                              onChange={handleInputChange}
                            />
                            <span>%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <input type="checkbox" />
                        <span>Mặc định tính phụ thu cho hạng phòng</span>
                      </div>
                      <div className="flex gap-3">
                        <input type="checkbox" />
                        <span>Áp dụng cho tất cả hạng phòng</span>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-md ">
                    <h5 className="bg-[#f1f3f4] p-2 rounded-t-md font-semibold text-black">
                      Sức chứa
                    </h5>
                    <div className="p-2 flex flex-col gap-5">
                      <div className="flex gap-2">
                        <span className="font-semibold text-black w-20">
                          Tiêu chuẩn
                        </span>
                        <input
                          name="standardCapacity"
                          value={formData.standardCapacity}
                          onChange={handleInputChange}
                          min="0"
                          type="number"
                          className="w-6 text-center focus:outline-none border-b "
                        />
                        <span>người lớn</span>
                        <input
                          type="number"
                          className="w-6 text-center focus:outline-none border-b "
                          name="standardChildren"
                          value={formData.standardChildren}
                          onChange={handleInputChange}
                          min="0"
                        />
                        <span>Trẻ em</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-semibold text-black w-20">
                          Tối đa
                        </span>
                        <input
                          type="number"
                          className="w-6 text-center focus:outline-none border-b "
                          name="maxCapacity"
                          value={formData.maxCapacity}
                          onChange={handleInputChange}
                          min="0"
                        />
                        <span>người lớn</span>
                        <input
                          type="number"
                          className="w-6 text-center focus:outline-none border-b "
                          name="maxChildren"
                          value={formData.maxChildren}
                          onChange={handleInputChange}
                          min="0"
                        />
                        <span>Trẻ em</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {tabValue === 1 && (
                <div className="flex flex-col">
                  <div>
                    <label htmlFor="image">Hình ảnh phòng:</label>
                    <div className="flex gap-5">
                      <ImageInput />
                    </div>
                  </div>
                  <div className="flex gap-5 mt-5 ite">
                    <span className="w-20">Mô tả</span>
                    <input
                      type="text"
                      className="border w-full h-10"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}
              {tabValue === 2 && (
                <div>
                  <div className="flex gap-3">
                    <label htmlFor="roomList" className="w-30">
                      Danh sách phòng:
                    </label>
                    <input
                      type="text"
                      id="roomList"
                      className="focus:outline-none border-b w-auto focus:border-green-800 focus:border-b-2"
                    />
                  </div>
                </div>
              )}
            </Box>
          </Box>
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
    </div>
  );
};

export default RoomManagerDialog;
