import { Table } from "lucide-react";
import { NextPage } from "next";
import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";

interface IProps {}
interface Room {
  code: string;
  name: string;
  roomCategory: string;
  area: string;
  pricePerHour: number;
  pricePerDay: number;
  pricePerNight: number;
  status: string;
  branch: string;
  startUsing: string;
  maxCapacity: string;
  extraCharge: string;
  note: string;
}

const rooms: Room[] = [
  {
    code: "Double Bedroom",
    name: "P.501",
    roomCategory: "Giường đôi cho 2 người",
    area: "Tầng 5",
    pricePerHour: 180000,
    pricePerDay: 720000,
    pricePerNight: 720000,
    status: "Đang hoạt động",
    branch: "Chi nhánh trung tâm",
    startUsing: "22/11/2024",
    maxCapacity: "1 người lớn, 1 trẻ em",
    extraCharge: "Tính tiền mỗi giờ",
    note: "",
  },
  {
    code: "Single Bedroom",
    name: "P.401",
    roomCategory: "Giường đơn cho 1 người",
    area: "Tầng 4",
    pricePerHour: 150000,
    pricePerDay: 600000,
    pricePerNight: 600000,
    status: "Đang hoạt động",
    branch: "Chi nhánh trung tâm",
    startUsing: "22/11/2024",
    maxCapacity: "1 người lớn",
    extraCharge: "Tính tiền mỗi giờ",
    note: "xxxxxxxxxxxxxxxxxxx",
  },
  {
    code: "Triple Bedroom",
    name: "P.101",
    roomCategory: "Phòng cho 3 người",
    area: "Tầng 1",
    pricePerHour: 250000,
    pricePerDay: 1000000,
    pricePerNight: 1000000,
    status: "Đang hoạt động",
    branch: "Chi nhánh trung tâm",
    startUsing: "22/11/2024",
    maxCapacity: "2 người lớn, 1 trẻ em",
    extraCharge: "Tính tiền mỗi giờ",
    note: "",
  },
  {
    code: "Twin Bedroom",
    name: "P.202",
    roomCategory: "Giường đơn cho 2 người",
    area: "Tầng 2",
    pricePerHour: 200000,
    pricePerDay: 800000,
    pricePerNight: 800000,
    status: "Đang hoạt động",
    branch: "Chi nhánh trung tâm",
    startUsing: "22/11/2024",
    maxCapacity: "2 người lớn",
    extraCharge: "Tính tiền mỗi giờ",
    note: "",
  },
];

const RoomsPage: React.FC<IProps> = () => {
  const [selectedRoomDetails, setSelectedRoomDetails] = useState<Room | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<
    "info" | "booking_history" | "transaction_history" | "housekeeping_history"
  >("info");
  const [selectedRoomCode, setSelectedRoomCode] = useState<string | null>(null);
  // Hàm để xử lý chọn/deselect một hạng phòng
  const handleRoomSelect = (room: Room) => {
    setSelectedRoomDetails((prev) => (prev?.code === room.code ? null : room));

    selectedRoomCode === room.code
      ? setSelectedRoomCode(null)
      : setSelectedRoomCode(room.code);
    setActiveTab("info");
  };

  return (
    <div className="">
      <div className="flex  flex-col bg-white cash-fund_content border !border-[var(--ht-neutral-100-)] rounded-md p-3">
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
              <option value="Đang hoạt động">Đang hoạt động</option>
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
                Tên phòng
              </th>
              <th className="px-2 py-2 text-left border-b whitespace-nowrap">
                Hạng phòng
              </th>
              <th className="px-2 py-2 text-left border-b whitespace-nowrap">
                Khu vực
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
                Ghi chú
              </th>
              <th className="px-2 py-2 text-left border-b whitespace-nowrap">
                Chi nhánh
              </th>
            </tr>
          </thead>
          <tbody className="text-[14px]">
            {rooms.map((room) => (
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
                  <td className="px-2 py-2 ">{room.name}</td>
                  <td className="px-2 py-2 ">{room.roomCategory}</td>
                  <td className="px-2 py-2 ">{room.area}</td>
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
                  <td className="px-2 py-2 ">{room.note}</td>
                  <td className="px-2 py-2 ">{room.branch}</td>
                </tr>

                {/* Dòng chi tiết phòng, chỉ hiển thị khi dòng này được chọn */}
                {selectedRoomDetails?.code === room.code && (
                  <tr>
                    <td
                      colSpan={10}
                      className="  border-none bg-[#ebf5ea] p-2 "
                    >
                      <div className="flex  ml-5 border-0">
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
                          onClick={() => setActiveTab("booking_history")}
                          className={`cursor-pointer font-semibold ${
                            activeTab === "booking_history"
                              ? "bg-white !text-[var(--room-empty-color-)]"
                              : ""
                          }  px-3 py-2 text-center`}
                        >
                          Lịch sử đặt phòng
                        </div>
                        <div
                          onClick={() => setActiveTab("transaction_history")}
                          className={`cursor-pointer font-semibold ${
                            activeTab === "transaction_history"
                              ? "bg-white !text-[var(--room-empty-color-)]"
                              : ""
                          }  px-3 py-2 text-center`}
                        >
                          Lịch giao dịch
                        </div>
                        <div
                          onClick={() => setActiveTab("housekeeping_history")}
                          className={`cursor-pointer font-semibold ${
                            activeTab === "housekeeping_history"
                              ? "bg-white !text-[var(--room-empty-color-)]"
                              : ""
                          }  px-3 py-2 text-center`}
                        >
                          Lịch dọn phòng
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
                                    <div>Tên phòng:</div>
                                    <span>{selectedRoomDetails.name}</span>
                                  </div>
                                  <div className="flex w-full py-2 gap-5 border-b justify-between">
                                    <div>Hạng phòng:</div>
                                    <span>
                                      {selectedRoomDetails.roomCategory}
                                    </span>
                                  </div>
                                  <div className="flex w-full py-2 gap-5 border-b justify-between">
                                    <div>Chi nhánh:</div>
                                    <span>{selectedRoomDetails.branch}</span>
                                  </div>
                                  <div className="flex w-full py-2 gap-5 border-b justify-between">
                                    <div>Khu vực:</div>
                                    <span>{selectedRoomDetails.area}</span>
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
                                    <div>Bắt đầu sử dụng:</div>
                                    <span>
                                      {selectedRoomDetails.startUsing}
                                    </span>
                                  </div>
                                  <div className="flex w-full py-2 gap-5 border-b justify-between">
                                    <div>Mô tả:</div>
                                    <span>{selectedRoomDetails.note}</span>
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

                        {activeTab === "booking_history" && (
                          <div id="listRoom" className="p-4">
                            <table className="min-w-full table-auto border-collapse border border-gray-200">
                              <thead className="bg-blue-100">
                                <tr>
                                  <th className="px-2 py-2 text-left border-b whitespace-nowrap">
                                    Mã đặt phòng
                                  </th>
                                  <th className="px-2 py-2 text-left border-b whitespace-nowrap">
                                    Thời gian đặt
                                  </th>
                                  <th className="px-2 py-2 text-left border-b whitespace-nowrap">
                                    Nhân viên đặt
                                  </th>
                                  <th className="px-2 py-2 text-left border-b whitespace-nowrap">
                                    Tổng cộng
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="px-2 py-2 border-b">DP01</td>
                                  <td className="px-2 py-2 border-b">
                                    23/11/2024
                                  </td>
                                  <td className="px-2 py-2 border-b">
                                    QuangTrinh
                                  </td>
                                  <td className="px-2 py-2 border-b">
                                    1.000.000
                                  </td>
                                </tr>
                                <tr>
                                  <td className="px-2 py-2 border-b">DP01</td>
                                  <td className="px-2 py-2 border-b">
                                    22/11/2024
                                  </td>
                                  <td className="px-2 py-2 border-b">
                                    QuangTrinh
                                  </td>
                                  <td className="px-2 py-2 border-b">
                                    1.000.000
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        )}

                        {activeTab === "transaction_history" && (
                          <div className="p-4">
                            <table className="min-w-full table-auto border-collapse border border-gray-200">
                              <thead className="bg-blue-100">
                                <tr>
                                  <th className="px-2 py-2 text-left border-b whitespace-nowrap">
                                    Mã hóa đơn
                                  </th>
                                  <th className="px-2 py-2 text-left border-b whitespace-nowrap">
                                    Thời gian
                                  </th>
                                  <th className="px-2 py-2 text-left border-b whitespace-nowrap">
                                    Thu ngân
                                  </th>
                                  <th className="px-2 py-2 text-left border-b whitespace-nowrap">
                                    Tổng cộng
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {/* Lấy danh sách phòng tại đây */}
                                <tr>
                                  <td className="px-2 py-2 border-b">PT01</td>
                                  <td className="px-2 py-2 border-b">
                                    23/11/2024 11:22:30
                                  </td>
                                  <td className="px-2 py-2 border-b">Quang</td>
                                  <td className="px-2 py-2 border-b">
                                    1.000.000
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        )}
                        {activeTab === "housekeeping_history" && (
                          <div className="p-4">
                            <table className="min-w-full table-auto border-collapse border border-gray-200">
                              <thead className="bg-blue-100">
                                <tr>
                                  <th className="px-2 py-2 text-left border-b whitespace-nowrap">
                                    Thời gian
                                  </th>
                                  <th className="px-2 py-2 text-left border-b whitespace-nowrap">
                                    Người dọn
                                  </th>
                                  <th className="px-2 py-2 text-left border-b whitespace-nowrap">
                                    vai trò
                                  </th>
                                  <th className="px-2 py-2 text-left border-b whitespace-nowrap">
                                    Trạng thái
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="px-2 py-2 border-b">
                                    23/11/2024 11:22:30
                                  </td>
                                  <td className="px-2 py-2 border-b">
                                    Nguyễn Văn B
                                  </td>
                                  <td className="px-2 py-2 border-b">
                                    Lao công
                                  </td>
                                  <td className="px-2 py-2 border-b">Đã dọn</td>
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
    </div>
  );
};

export default RoomsPage;
