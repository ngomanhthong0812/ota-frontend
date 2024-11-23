import { NextPage } from "next";
import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
interface Props {}

interface RoomType {
  code: string;
  name: string;
  description: string;
  quantity: number;
  pricePerHour: number;
  pricePerDay: number;
  pricePerNight: number;
  status: string;
  branch: string;
  standardCapacity: string;
  maxCapacity: string;
  extraCharge: string;
}

const roomsType: RoomType[] = [
  {
    code: "Double Bedroom",
    name: "Phòng 01 giường đôi cho 2 người",
    description: "Giường đôi cho 2 người",
    quantity: 3,
    pricePerHour: 180000,
    pricePerDay: 720000,
    pricePerNight: 720000,
    status: "Đang kinh doanh",
    branch: "Chi nhánh trung tâm",
    standardCapacity: "1 người lớn, 1 trẻ em",
    maxCapacity: "1 người lớn, 1 trẻ em",
    extraCharge: "Tính tiền mỗi giờ",
  },
  {
    code: "Single Bedroom",
    name: "Phòng 01 giường đơn",
    description: "Giường đơn cho 1 người",
    quantity: 3,
    pricePerHour: 150000,
    pricePerDay: 600000,
    pricePerNight: 600000,
    status: "Đang kinh doanh",
    branch: "Chi nhánh trung tâm",
    standardCapacity: "1 người lớn",
    maxCapacity: "1 người lớn",
    extraCharge: "Tính tiền mỗi giờ",
  },
  {
    code: "Triple Bedroom",
    name: "Phòng 01 giường đôi và 1 giường đơn cho 3 người",
    description: "Phòng cho 3 người",
    quantity: 3,
    pricePerHour: 250000,
    pricePerDay: 1000000,
    pricePerNight: 1000000,
    status: "Đang kinh doanh",
    branch: "Chi nhánh trung tâm",
    standardCapacity: "2 người lớn, 1 trẻ em",
    maxCapacity: "2 người lớn, 1 trẻ em",
    extraCharge: "Tính tiền mỗi giờ",
  },
  {
    code: "Twin Bedroom",
    name: "Phòng 02 giường đơn",
    description: "Giường đơn cho 2 người",
    quantity: 3,
    pricePerHour: 200000,
    pricePerDay: 800000,
    pricePerNight: 800000,
    status: "Đang kinh doanh",
    branch: "Chi nhánh trung tâm",
    standardCapacity: "2 người lớn",
    maxCapacity: "2 người lớn",
    extraCharge: "Tính tiền mỗi giờ",
  },
];

const RoomCategoryPage: NextPage<Props> = ({}) => {
  const [selectedRoomDetails, setSelectedRoomDetails] =
    useState<RoomType | null>(null);
  const [activeTab, setActiveTab] = useState<"info" | "list">("info");
  const [selectedRoomCode, setSelectedRoomCode] = useState<string | null>(null);
  // Hàm để xử lý chọn/deselect một hạng phòng
  const handleRoomSelect = (room: RoomType) => {
    setSelectedRoomDetails((prev) => (prev?.code === room.code ? null : room));

    selectedRoomCode === room.code
      ? setSelectedRoomCode(null)
      : setSelectedRoomCode(room.code);
    setActiveTab("info");
  };

  return (
    <div className="flex flex-col bg-white cash-fund_content border !border-[var(--ht-neutral-100-)] rounded-md p-3">
      <div className="flex gap-5 items-center text-center">
        <div className="border w-60 flex justify-center items-center py-1 px-2">
          <input
            type="text"
            placeholder="Tìm kiếm"
            className=" w-full  focus:outline-none focus:border-none"
          />
          <IoMdSearch />
        </div>
        <div className="flex gap-2 text-center items-center border py-1 px-2 bg-white">
          <span>Trạng thái:</span>
          <select
            name="status"
            className="focus:outline-none focus:border-none  "
            id=""
          >
            <option value="Tất cả">Tất cả</option>
            <option value="Đang kinh doanh">Đang kinh doanh</option>
            <option value="Ngừng kinh doanh">Ngừng kinh doanh</option>
          </select>
        </div>
      </div>
      {/* Danh sách hạng phòng */}
      <table className="min-w-full table-auto rounded-t-[3px] overflow-hidden mt-3 border-x border">
        <thead className=" border !border-[var(--ht-neutral-100-)] font-[500] text-[var(--color-menu-icon-)]">
          <tr className="bg-[var(--ht-neutral-100-)]">
            <th className="px-2 py-2 text-left border-b whitespace-nowrap">
              <input
                type="checkbox"
                // Chọn hoặc bỏ chọn tất cả các phòng nếu cần
              />
            </th>
            <th className="px-2 py-2 text-left border-b whitespace-nowrap">
              Mã hạng phòng
            </th>
            <th className="px-2 py-2 text-left border-b whitespace-nowrap">
              Tên hạng phòng
            </th>
            <th className="px-2 py-2 text-left border-b whitespace-nowrap">
              SL phòng
            </th>
            <th className="px-2 py-2 text-left border-b whitespace-nowrap">
              Giá giờ
            </th>
            <th className="px-2 py-2 text-left border-b whitespace-nowrap">
              Giá cả ngày
            </th>
            <th className="px-2 py-2 text-left border-b whitespace-nowrap">
              Giá qua đêm
            </th>
            <th className="px-2 py-2 text-left border-b whitespace-nowrap">
              Trạng thái
            </th>
            <th className="px-2 py-2 text-left border-b whitespace-nowrap">
              Chi nhánh
            </th>
          </tr>
        </thead>
        <tbody className="text-[14px]">
          {roomsType.map((room) => (
            <React.Fragment key={room.code}>
              {/* Dòng thông tin phòng */}
              <tr
                className={` cursor-pointer  ${
                  selectedRoomCode === room.code
                    ? "!bg-[#ebf5ea] "
                    : "hover:bg-gray-100 border-b bg-white"
                }`}
                onClick={() => handleRoomSelect(room)} // Khi click vào dòng, hiển thị chi tiết
              >
                <td className="px-2 py-2">
                  <input
                    type="checkbox"
                    checked={selectedRoomDetails?.code === room.code} // Checkbox sẽ chọn nếu phòng này đang được hiển thị chi tiết
                    onChange={(e) => e.stopPropagation()} // Ngừng sự kiện khi click vào checkbox
                  />
                </td>
                <td className="px-2 py-2 ">{room.code}</td>
                <td className="px-2 py-2 ">{room.name}</td>
                <td className="px-2 py-2  text-center">{room.quantity}</td>
                <td className="px-2 py-2 ">
                  {room.pricePerHour.toLocaleString()}
                </td>
                <td className="px-2 py-2 ">
                  {room.pricePerDay.toLocaleString()}
                </td>
                <td className="px-2 py-2 ">
                  {room.pricePerNight.toLocaleString()}
                </td>
                <td className="px-2 py-2 ">{room.status}</td>
                <td className="px-2 py-2 ">{room.branch}</td>
              </tr>

              {/* Dòng chi tiết phòng, chỉ hiển thị khi dòng này được chọn */}
              {selectedRoomDetails?.code === room.code && (
                <tr>
                  <td colSpan={9} className="  border-none bg-[#ebf5ea] p-2 ">
                    <div className="flex gap-3 ml-5 border-0">
                      <div
                        onClick={() => setActiveTab("info")}
                        className={`cursor-pointer font-semibold ${
                          activeTab === "info"
                            ? "bg-white !text-[var(--room-empty-color-)]"
                            : ""
                        }  px-3 py-2 text-center`}
                      >
                        Thông tin
                      </div>
                      <div
                        onClick={() => setActiveTab("list")}
                        className={`cursor-pointer font-semibold ${
                          activeTab === "list"
                            ? "bg-white !text-[var(--room-empty-color-)]"
                            : ""
                        }  px-3 py-2 text-center`}
                      >
                        Danh sách phòng
                      </div>
                    </div>
                    <div className="bg-white ">
                      {activeTab === "info" && (
                        <div id="RoomDetails" className="flex">
                          {/* Phần bên trái: Ảnh phòng */}
                          <div className=" w-[300px] h-[200px]  p-4 ">
                            <img
                              src="https://via.placeholder.com/300x200"
                              alt="room image"
                              className="w-full h-auto rounded-xl"
                            />
                          </div>
                          {/* Phần bên phải: Thông tin chi tiết */}
                          <div className="w-3/4 p-4 ">
                            <div className="flex gap-20">
                              <div className="w-1/2">
                                <div className="flex w-full py-2 gap-5 border-b justify-between">
                                  <div>Mã hạng phòng:</div>
                                  <span>{selectedRoomDetails.code}</span>
                                </div>
                                <div className="flex w-full py-2 gap-5 border-b justify-between">
                                  <div>Tên hạng phòng:</div>
                                  <span>{selectedRoomDetails.name}</span>
                                </div>
                                <div className="flex w-full py-2 gap-5 border-b justify-between">
                                  <div>Chi nhánh:</div>
                                  <span>{selectedRoomDetails.branch}</span>
                                </div>
                                <div className="flex w-full py-2 gap-5 border-b justify-between">
                                  <div>Số lượng phòng:</div>
                                  <span>{selectedRoomDetails.quantity}</span>
                                </div>
                                <div className="flex w-full py-2 gap-5 border-b justify-between">
                                  <div>Giá giờ:</div>
                                  <span>
                                    {selectedRoomDetails.pricePerHour.toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex w-full py-2 gap-5 border-b justify-between">
                                  <div>Giá cả ngày:</div>
                                  <span>
                                    {selectedRoomDetails.pricePerDay.toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex w-full py-2 gap-5 border-b justify-between">
                                  <div>Giá qua đêm:</div>
                                  <span>
                                    {selectedRoomDetails.pricePerNight.toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex w-full py-2 gap-5 border-b justify-between">
                                  <div>Phụ thu quá giờ:</div>
                                  <span>
                                    {selectedRoomDetails.extraCharge.toLocaleString()}
                                  </span>
                                </div>
                              </div>
                              <div className="w-1/2">
                                <div className="flex w-full py-2 gap-5 border-b justify-between">
                                  <div>Sức chứa tiêu chuẩn:</div>
                                  <span>
                                    {selectedRoomDetails.standardCapacity}
                                  </span>
                                </div>
                                <div className="flex w-full py-2 gap-5 border-b justify-between">
                                  <div>Sức chứa tối đa:</div>
                                  <span>{selectedRoomDetails.maxCapacity}</span>
                                </div>
                                <div className="flex w-full py-2 gap-5 border-b justify-between">
                                  <div>Mô tả:</div>
                                  <span>{selectedRoomDetails.description}</span>
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 flex space-x-4 justify-end">
                              <button className="bg-green-500 text-white px-2 py-2 rounded">
                                Cập nhật
                              </button>
                              <button className="bg-red-500 text-white px-2 py-2 rounded">
                                Ngừng kinh doanh
                              </button>
                              <button className="bg-gray-500 text-white px-2 py-2 rounded">
                                Xóa
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === "list" && (
                        <div id="listRoom" className="p-4">
                          <table className="min-w-full table-auto border-collapse border border-gray-200">
                            <thead className="bg-blue-100">
                              <tr>
                                <th className="px-2 py-2 text-left border-b whitespace-nowrap">
                                  Tên phòng
                                </th>
                                <th className="px-2 py-2 text-left border-b whitespace-nowrap">
                                  Khu vực
                                </th>
                                <th className="px-2 py-2 text-left border-b whitespace-nowrap">
                                  Trạng thái
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {/* Lấy danh sách phòng tại đây */}
                              <tr>
                                <td className="px-2 py-2 border-b">Phòng 1</td>
                                <td className="px-2 py-2 border-b">
                                  Chi nhánh A
                                </td>
                                <td className="px-2 py-2 border-b">
                                  Đang kinh doanh
                                </td>
                              </tr>
                              <tr>
                                <td className="px-2 py-2 border-b">Phòng 2</td>
                                <td className="px-2 py-2 border-b">
                                  Chi nhánh B
                                </td>
                                <td className="px-2 py-2 border-b">
                                  Đang bảo trì
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomCategoryPage;
