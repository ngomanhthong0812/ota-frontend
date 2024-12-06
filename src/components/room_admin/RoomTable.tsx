import React, { useState } from "react";

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
interface RoomTableProps {
  rooms: Room[];
  loading: boolean;
  error?: string | null;
  handleOpenUpdateDialog: (roomId: number) => void;
  deleteRoom: (roomId: number, roomName: string) => void;
}

const RoomTable: React.FC<RoomTableProps> = ({
  rooms,
  loading,
  error,
  handleOpenUpdateDialog,
  deleteRoom,
}) => {
  const [selectedRoomDetails, setSelectedRoomDetails] = useState<Room | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<
    "info" | "booking_history" | "transaction_history" | "housekeeping_history"
  >("info");
  const [selectedRoomCode, setSelectedRoomCode] = useState<string | null>(null);

  // Xử lý chọn hoặc bỏ chọn một phòng
  const handleRoomSelect = (room: Room) => {
    const isSelected = selectedRoomCode === room.name;
    setSelectedRoomDetails(isSelected ? null : room);
    setSelectedRoomCode(isSelected ? null : room.name);
    setActiveTab("info");
  };

  return (
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
        </tr>
      </thead>
      <tbody className="text-[14px]">
        {loading ? (
          <tr>
            <td className="text-center py-4">Đang tải...</td>
          </tr>
        ) : error ? (
          <tr>
            <td className="text-center py-4">Error: {error}</td>
          </tr>
        ) : (
          rooms?.map((room, index) => (
            <React.Fragment key={index}>
              {/* Dòng thông tin phòng */}
              <tr
                className={` cursor-pointer  ${
                  selectedRoomCode === room.name
                    ? "!bg-[#ebf5ea] "
                    : "hover:bg-gray-100 border-b bg-white"
                }`}
                onClick={() => handleRoomSelect(room)} // Khi click vào dòng, hiển thị chi tiết
              >
                <td className="px-2 py-2">
                  <input
                    type="checkbox"
                    checked={selectedRoomDetails?.name === room.name} // Checkbox sẽ chọn nếu phòng này đang được hiển thị chi tiết
                    onChange={(e) => e.stopPropagation()} // Ngừng sự kiện khi click vào checkbox
                  />
                </td>
                <td className="px-2 py-2 ">{room.name}</td>
                <td className="px-2 py-2 ">{room.room_type.name}</td>
                <td className="px-2 py-2 ">{room.floor.name}</td>
                <td className="px-2 py-2 ">
                  {room.room_type.hourlyRate.toLocaleString()}
                </td>
                <td className="px-2 py-2 ">
                  {room.room_type.dailyRate.toLocaleString()}
                </td>
                <td className="px-2 py-2 ">
                  {room.room_type.overnightRate.toLocaleString()}
                </td>
                <td className="px-2 py-2 ">{room.status}</td>
                <td className="px-2 py-2 ">{room.notes}</td>
              </tr>

              {/* Dòng chi tiết phòng, chỉ hiển thị khi dòng này được chọn */}
              {selectedRoomDetails?.name === room.name && (
                <tr>
                  <td colSpan={10} className="  border-none bg-[#ebf5ea] p-2 ">
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
                                    {selectedRoomDetails.room_type.name}
                                  </span>
                                </div>
                                <div className="flex w-full py-2 gap-5 border-b justify-between">
                                  <div>Chi nhánh:</div>
                                  <span>Huế</span>
                                </div>
                                <div className="flex w-full py-2 gap-5 border-b justify-between">
                                  <div>Khu vực:</div>
                                  <span>{selectedRoomDetails.floor.name}</span>
                                </div>
                                <div className="flex w-full py-2 gap-5 border-b justify-between">
                                  <div>Giá giờ:</div>
                                  <span>
                                    {selectedRoomDetails.room_type.hourlyRate.toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex w-full py-2 gap-5 border-b justify-between">
                                  <div>Giá cả ngày:</div>
                                  <span>
                                    {selectedRoomDetails.room_type.dailyRate.toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex w-full py-2 gap-5 border-b justify-between">
                                  <div>Giá qua đêm:</div>
                                  <span>
                                    {selectedRoomDetails.room_type.overnightRate.toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex w-full py-2 gap-5 border-b justify-between">
                                  <div>Phụ thu quá giờ:</div>
                                  <span>
                                    {/* {selectedRoomDetails.extraCharge.toLocaleString()} */}
                                  </span>
                                </div>
                              </div>
                              <div className="w-1/2">
                                <div className="flex w-full py-2 gap-5 border-b justify-between">
                                  <div>Bắt đầu sử dụng:</div>
                                  <span>
                                    {new Date(
                                      room.start_date_use
                                    ).toLocaleDateString("vi-VN")}
                                  </span>
                                </div>
                                <div className="flex w-full py-2 gap-5 border-b justify-between">
                                  <div>Mô tả:</div>
                                  <span>{selectedRoomDetails.notes}</span>
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 flex space-x-4 justify-end">
                              <button
                                onClick={() => handleOpenUpdateDialog(room.id)}
                                className="bg-green-500 text-white px-2 py-2 rounded"
                              >
                                Cập nhật
                              </button>
                              <button className="bg-red-500 text-white px-2 py-2 rounded">
                                Ngừng kinh doanh
                              </button>
                              <button
                                onClick={() => deleteRoom(room.id, room.name)}
                                className="bg-gray-500 text-white px-2 py-2 rounded"
                              >
                                Xóa phòng
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
                                <td className="px-2 py-2 border-b">Lao công</td>
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
          ))
        )}
      </tbody>
    </table>
  );
};

export default RoomTable;
