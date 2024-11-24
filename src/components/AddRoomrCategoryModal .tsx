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

interface RoomManagerDialogProps {
  open: boolean;
  onClose: () => void;
}

const RoomManagerDialog: React.FC<RoomManagerDialogProps> = ({
  open,
  onClose,
}) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
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
                    className="focus:outline-none border-b font-semibold text-black w-full focus:border-green-800 focus:border-b-2"
                  />
                </div>
                <div className="gio">
                  <div className="flex w-full gap-10">
                    <div className="flex flex-col w-1/2 gap-4 ">
                      <div className="flex gap-5 ">
                        <label
                          htmlFor="priceHourly"
                          className="w-[50%] font-semibold text-black"
                        >
                          Giá giờ:
                        </label>
                        <input
                          type="number"
                          id="priceHourly"
                          className="focus:outline-none border-b w-full focus:border-green-800 focus:border-b-2 text-end"
                          defaultValue={0}
                        />
                      </div>
                      <div className="flex gap-5 ">
                        <label
                          htmlFor="priceHourly"
                          className="w-[50%] font-semibold text-black"
                        >
                          Giá cả ngày giờ:
                        </label>
                        <input
                          type="number"
                          id="priceHourly"
                          className="focus:outline-none border-b w-full focus:border-green-800 focus:border-b-2 text-end"
                          defaultValue={0}
                        />
                      </div>
                      <div className="flex gap-5 ">
                        <label
                          htmlFor="priceHourly"
                          className="w-[50%] font-semibold text-black"
                        >
                          Giá qua đêm:
                        </label>
                        <input
                          type="number"
                          id="priceHourly"
                          className="focus:outline-none border-b w-full focus:border-green-800 focus:border-b-2 text-end"
                          defaultValue={0}
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
                          <option value="">Tính tiền theo % tiền phòng</option>
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
                            defaultValue={1}
                          />
                          <span>giờ,phụ thu</span>
                          <input
                            type="number"
                            className="w-6 text-center focus:outline-none border-b"
                            defaultValue={2}
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
                            defaultValue={2}
                          />
                          <span>giờ,phụ thu</span>
                          <input
                            type="number"
                            className="w-6 text-center focus:outline-none border-b"
                            defaultValue={2}
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
                        type="number"
                        className="w-6 text-center focus:outline-none border-b "
                        defaultValue={2}
                      />
                      <span>người lớn</span>
                      <input
                        type="number"
                        className="w-6 text-center focus:outline-none border-b "
                        defaultValue={2}
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
                        defaultValue={2}
                      />
                      <span>người lớn</span>
                      <input
                        type="number"
                        className="w-6 text-center focus:outline-none border-b "
                        defaultValue={2}
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
                    <ImageInput />
                    <ImageInput />
                    <ImageInput />
                    <ImageInput />
                    <ImageInput />
                  </div>
                </div>
                <div className="">
                  <span>Mô tả</span>
                  <input type="text" className="" />
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
          onClick={() => alert("Đã lưu")}
          className="!bg-[var(--room-empty-color-200-)] text-white gap-3 font-bold hover:!bg-[var(--navbar-color-)]"
        >
          <FaRegSave size={20} />
          <span>Lưu</span>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RoomManagerDialog;
