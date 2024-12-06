import React, { useState } from "react";

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

interface TableProps {
  loading: boolean;
  error: string | null;
  roomTypes: RoomType[];
  deleteTransaction: (id: number, code: string) => void;
  handleOpenUpdateDialog: (roomTypeId: number) => void;
}

const TableRoomType: React.FC<TableProps> = ({
  loading,
  error,
  roomTypes,
  deleteTransaction,
  handleOpenUpdateDialog,
}) => {
  const [selectedRoomDetails, setSelectedRoomDetails] =
    useState<RoomType | null>(null);
  const [activeTab, setActiveTab] = useState<"info" | "list">("info");
  const [selectedRoomCode, setSelectedRoomCode] = useState<string | null>(null);
  // Hàm để xử lý chọn/deselect một hạng phòng
  const handleRoomSelect = (room: RoomType) => {
    setSelectedRoomDetails((prev) =>
      prev?.roomTypeCode === room.roomTypeCode ? null : room
    );

    selectedRoomCode === room.roomTypeCode
      ? setSelectedRoomCode(null)
      : setSelectedRoomCode(room.roomTypeCode);
    setActiveTab("info");
  };

  return (
    <table className="min-w-full table-auto rounded-t-[3px] overflow-hidden mt-3 border-x border">
      <thead className="border !border-[var(--ht-neutral-100-)] font-[500] text-[var(--color-menu-icon-)]">
        <tr className="bg-[var(--ht-neutral-100-)]">
          <th className="px-2 py-2 text-left border-b whitespace-nowrap">
            <input type="checkbox" />
          </th>
          <th className="px-2 py-2 text-left border-b whitespace-nowrap">
            Mã hạng phòng
          </th>
          <th className="px-2 py-2 text-left border-b whitespace-nowrap">
            Tên hạng phòng
          </th>
          <th className="px-2 py-2 text-center border-b whitespace-nowrap">
            SL phòng
          </th>
          <th className="px-2 py-2 text-center border-b whitespace-nowrap">
            Giá giờ
          </th>
          <th className="px-2 py-2 text-center border-b whitespace-nowrap">
            Giá cả ngày
          </th>
          <th className="px-2 py-2 text-center border-b whitespace-nowrap">
            Giá qua đêm
          </th>
          <th className="px-2 py-2 text-center border-b whitespace-nowrap">
            Trạng thái
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
          roomTypes?.map((room) => (
            <React.Fragment key={room.roomTypeCode}>
              <tr
                className={`cursor-pointer ${
                  selectedRoomDetails?.roomTypeCode === room.roomTypeCode
                    ? "!bg-[#ebf5ea]"
                    : "hover:bg-gray-100 border-b bg-white"
                }`}
                onClick={() => handleRoomSelect(room)}
              >
                <td className="px-2 py-2">
                  <input
                    type="checkbox"
                    checked={
                      selectedRoomDetails?.roomTypeCode === room.roomTypeCode
                    }
                    onChange={(e) => e.stopPropagation()}
                  />
                </td>
                <td className="px-2 py-2 ">{room.roomTypeCode}</td>
                <td className="px-2 py-2 ">{room.roomTypeName}</td>
                <td className="px-2 py-2 text-center">{room.totalRooms}</td>
                <td className="px-2 py-2 text-center">
                  {room.hourlyRate.toLocaleString()}
                </td>
                <td className="px-2 py-2 text-center">
                  {room.dailyRate.toLocaleString()}
                </td>
                <td className="px-2 py-2 text-center">
                  {room.overnightRate.toLocaleString()}
                </td>
                <td className="px-2 py-2 text-center">{room.status}</td>
              </tr>

              {selectedRoomDetails?.roomTypeCode === room.roomTypeCode && (
                <tr>
                  <td colSpan={9} className="border-none bg-[#ebf5ea] p-2 ">
                    <div className="flex gap-3 ml-5 border-0">
                      <div
                        onClick={() => setActiveTab("info")}
                        className={`cursor-pointer font-semibold ${
                          activeTab === "info"
                            ? "bg-white !text-[var(--room-empty-color-)]"
                            : ""
                        } px-3 py-2 text-center`}
                      >
                        Thông tin
                      </div>
                      <div
                        onClick={() => setActiveTab("list")}
                        className={`cursor-pointer font-semibold ${
                          activeTab === "list"
                            ? "bg-white !text-[var(--room-empty-color-)]"
                            : ""
                        } px-3 py-2 text-center`}
                      >
                        Danh sách phòng
                      </div>
                    </div>
                    <div className="bg-white ">
                      {activeTab === "info" && (
                        <div id="RoomDetails" className="flex">
                          <div className="w-[300px] h-[200px] p-4 ">
                            <img
                              src="https://via.placeholder.com/300x200"
                              alt="room image"
                              className="w-full h-auto rounded-xl"
                            />
                          </div>
                          <div className="w-3/4 p-4 ">
                            <div className="flex gap-20">
                              <div className="w-1/2">
                                <div className="flex w-full py-2 gap-5 border-b justify-between">
                                  <div>Mã hạng phòng:</div>
                                  <span>
                                    {selectedRoomDetails?.roomTypeCode}
                                  </span>
                                </div>
                                <div className="flex w-full py-2 gap-5 border-b justify-between">
                                  <div>Tên hạng phòng:</div>
                                  <span>
                                    {selectedRoomDetails?.roomTypeName}
                                  </span>
                                </div>
                                <div className="flex w-full py-2 gap-5 border-b justify-between">
                                  <div>Chi nhánh:</div>
                                  <span>Huế</span>
                                </div>
                                <div className="flex w-full py-2 gap-5 border-b justify-between">
                                  <div>Số lượng phòng:</div>
                                  <span>{selectedRoomDetails?.totalRooms}</span>
                                </div>
                                <div className="flex w-full py-2 gap-5 border-b justify-between">
                                  <div>Giá giờ:</div>
                                  <span>
                                    {selectedRoomDetails?.hourlyRate.toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex w-full py-2 gap-5 border-b justify-between">
                                  <div>Giá cả ngày:</div>
                                  <span>
                                    {selectedRoomDetails?.dailyRate.toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex w-full py-2 gap-5 border-b justify-between">
                                  <div>Giá qua đêm:</div>
                                  <span>
                                    {selectedRoomDetails?.overnightRate.toLocaleString()}
                                  </span>
                                </div>
                              </div>
                              <div className="w-1/2">
                                <div className="flex w-full py-2 gap-5 border-b justify-between">
                                  <div>Sức chứa tiêu chuẩn:</div>
                                  <span>
                                    {selectedRoomDetails?.standardCapacity}{" "}
                                    người lớn,{" "}
                                    {selectedRoomDetails?.standardChildren} trẻ
                                    em
                                  </span>
                                </div>
                                <div className="flex w-full py-2 gap-5 border-b justify-between">
                                  <div>Sức chứa tối đa:</div>
                                  <span>
                                    {selectedRoomDetails?.maxCapacity} người
                                    lớn, {selectedRoomDetails?.maxChildren} trẻ
                                    em
                                  </span>
                                </div>
                                <div className="flex w-full py-2 gap-5 border-b justify-between">
                                  <div>Mô tả:</div>
                                  <span>{selectedRoomDetails?.notes}</span>
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 flex space-x-4 justify-end">
                              <button
                                onClick={() =>
                                  handleOpenUpdateDialog(
                                    selectedRoomDetails.roomTypeId
                                  )
                                }
                                className="bg-green-500 text-white px-2 py-2 rounded"
                              >
                                Cập nhật
                              </button>
                              <button className="bg-red-500 text-white px-2 py-2 rounded">
                                Ngừng kinh doanh
                              </button>
                              <button
                                onClick={() =>
                                  deleteTransaction(
                                    selectedRoomDetails.roomTypeId,
                                    selectedRoomDetails.roomTypeCode
                                  )
                                }
                                className="bg-gray-500 text-white px-2 py-2 rounded"
                              >
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
                              {selectedRoomDetails?.rooms.map((room, index) => (
                                <tr key={index}>
                                  <td className="px-2 py-2 border-b">
                                    {room.roomName}
                                  </td>
                                  <td className="px-2 py-2 border-b">
                                    {room.floorName}
                                  </td>
                                  <td className="px-2 py-2 border-b">
                                    {room.status}
                                  </td>
                                </tr>
                              ))}
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

export default TableRoomType;
