// components/AddRoomModel.tsx
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

interface AddRoomModelProps {
  open: boolean;
  onClose: () => void;
}

const AddRoomModel: React.FC<AddRoomModelProps> = ({ open, onClose }) => {
  return (
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
                type="text"
                className="focus:outline-none border-b w-full focus:border-green-800 focus:border-b-2"
              />
            </div>
            <div className="flex w-full text-center items-center">
              <span className="w-44 text-sm font-bold text-start">Khu vực</span>
              <select
                name=""
                id=""
                className="focus:outline-none border-b w-full text-sm"
              >
                <option value="">--Lựa chọn--</option>
                <option value="">Tầng 1</option>
                <option value="">Tầng 2</option>
                <option value="">Tầng 3</option>
              </select>
            </div>
            <div className="flex w-full text-center items-center">
              <span className="w-44 text-sm font-bold text-start flex">
                Hạng phòng<span className="text-red-500">*</span>
              </span>
              <select
                name=""
                id=""
                className="focus:outline-none border-b w-full text-sm"
              >
                <option value="">--Lựa chọn--</option>
                <option value="">Phòng 1 gường đôi 2 người</option>
              </select>
            </div>
            <div className="flex w-full text-center items-center">
              <span className="w-44 text-sm font-bold text-start">
                Bắt đầu sử dụng
              </span>
              <input
                type="date"
                className="focus:outline-none border-b w-full text-sm focus:border-green-800 focus:border-b-2"
              />
            </div>
            <div className="flex w-full text-center items-center">
              <span className="w-44 text-sm font-bold text-start">Ghi chú</span>
              <input
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
          <ImageInput />
          <ImageInput />
          <ImageInput />
          <ImageInput />
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

export default AddRoomModel;
