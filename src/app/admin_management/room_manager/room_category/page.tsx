import axios from "axios";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { toast } from "react-toastify";
import UpdateRoomManagerDialog from "@/components/UpdateRoomType";
import { callApi } from "@/utils/api";
interface Props {}
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

const RoomCategoryPage: NextPage<Props> = ({}) => {
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
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  //
  const [selectedRoomTypeId, setSelectedRoomTypeId] = useState<number | null>(
    null
  );
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);

  // Mở dialog với roomTypeId
  const handleOpenUpdateDialog = (id: number) => {
    setSelectedRoomTypeId(id);
    setUpdateDialogOpen(true);
  };

  const handleCloseUpdateDialog = () => {
    setSelectedRoomTypeId(null);
    setUpdateDialogOpen(false);
  };

  // Callback khi cập nhật thành công
  const handleUpdateSuccess = () => {
    fetchRoomTypes(); // Gọi lại API để cập nhật danh sách
  };
  // Hàm lấy dữ liệu phòng từ API
  const fetchRoomTypes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await callApi<any>(
        `/api/room-type/findAllRoomType`, // Endpoint của API
        "GET"
      );

      // Log dữ liệu trả về để kiểm tra cấu trúc
      console.log("API Response: ", response.data.data);

      // Kiểm tra nếu response trả về mảng và gán vào state roomTypes
      if (Array.isArray(response.data.data)) {
        setRoomTypes(response.data.data);
      } else {
        setError("Không có data");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Hàm xóa hạng phòng
  const deleteTransaction = async (id: number, code: string) => {
    try {
      // Gửi yêu cầu xóa dữ liệu
      const response = await callApi<any>(
        `/api/room-type/${id}`, // Endpoint của API
        "DELETE"
      );

      // Kiểm tra mã trạng thái trả về
      if (response.data.statusCode === 200) {
        // Nếu thành công, thông báo thành công
        toast.success(`Xóa hạng phòng ${code} thành công!`);
      } else {
        // Nếu thất bại (ví dụ: mã lỗi 404), thông báo thất bại với message trả về từ API
        toast.error(response.data.message || "Có lỗi xảy ra khi xóa.");
      }

      fetchRoomTypes();
    } catch (err: any) {
      // Kiểm tra và log chi tiết lỗi
      if (axios.isAxiosError(err)) {
        // Nếu là lỗi axios, log thông tin trả về
        console.error(
          `Lỗi khi xóa hạng phòng với ID: ${id}`,
          err.response?.data || err.message
        );
      } else {
        // Log lỗi khác ngoài axios (nếu có)
        console.error("Lỗi không xác định:", error);
      }
    }
  };

  // Gọi fetchRoomTypes khi component mount
  useEffect(() => {
    fetchRoomTypes();
  }, []); // Chạy 1 lần khi component mount

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
            <th className="px-2 py-2 text-center border-b whitespace-nowrap">
              SL phòng
            </th>
            <th className="px-2 py-2 text-center border-b whitespace-nowrap">
              Giá giờ
            </th>
            <th className="px-2 py-2 text-center border-b whitespace-nowrap ">
              Giá cả ngày
            </th>
            <th className="px-2 py-2 text-center border-b whitespace-nowrap ">
              Giá qua đêm
            </th>
            <th className="px-2 py-2 text-center border-b whitespace-nowrap ">
              Trạng thái
            </th>
            <th className="px-2 py-2 text-center border-b whitespace-nowrap ">
              Chi nhánh
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
            roomTypes.map((room) => (
              <React.Fragment key={room.roomTypeCode}>
                {/* Dòng thông tin phòng */}
                <tr
                  className={` cursor-pointer  ${
                    selectedRoomCode === room.roomTypeCode
                      ? "!bg-[#ebf5ea] "
                      : "hover:bg-gray-100 border-b bg-white"
                  }`}
                  onClick={() => handleRoomSelect(room)} // Khi click vào dòng, hiển thị chi tiết
                >
                  <td className="px-2 py-2">
                    <input
                      type="checkbox"
                      checked={
                        selectedRoomDetails?.roomTypeCode === room.roomTypeCode
                      } // Checkbox sẽ chọn nếu phòng này đang được hiển thị chi tiết
                      onChange={(e) => e.stopPropagation()} // Ngừng sự kiện khi click vào checkbox
                    />
                  </td>
                  <td className="px-2 py-2 ">{room.roomTypeCode}</td>
                  <td className="px-2 py-2 ">{room.roomTypeName}</td>
                  <td className="px-2 py-2 text-center ">{room.totalRooms}</td>
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
                  <td className="px-2 py-2 text-center">Huế</td>
                </tr>

                {/* Dòng chi tiết phòng, chỉ hiển thị khi dòng này được chọn */}
                {selectedRoomDetails?.roomTypeCode === room.roomTypeCode && (
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
                                    <span>
                                      {selectedRoomDetails?.totalRooms}
                                    </span>
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
                                  <div className="flex w-full py-2 gap-5 border-b justify-between">
                                    <div>Phụ thu quá giờ:</div>
                                    <span>
                                      {/* {selectedRoomDetails.extraCharge.toLocaleString()} */}
                                    </span>
                                  </div>
                                </div>
                                <div className="w-1/2">
                                  <div className="flex w-full py-2 gap-5 border-b justify-between">
                                    <div>Sức chứa tiêu chuẩn:</div>
                                    <span>
                                      {selectedRoomDetails?.standardCapacity}{" "}
                                      người lớn,{" "}
                                      {selectedRoomDetails?.standardChildren}{" "}
                                      trẻ em
                                    </span>
                                  </div>
                                  <div className="flex w-full py-2 gap-5 border-b justify-between">
                                    <div>Sức chứa tối đa:</div>
                                    <span>
                                      {selectedRoomDetails?.maxCapacity} người
                                      lớn, {selectedRoomDetails?.maxChildren}{" "}
                                      trẻ em
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
                                    handleOpenUpdateDialog(room.roomTypeId)
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
                                      room.roomTypeId,
                                      room.roomTypeCode
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
                                {/* Lấy danh sách phòng tại đây */}
                                {room.rooms.map((room, index) => (
                                  <tr key={index}>
                                    <td className="px-2 py-2 border-b">
                                      {room.roomName}
                                    </td>
                                    <td className="px-2 py-2 border-b">
                                      Chi nhánh A
                                    </td>
                                    <td className="px-2 py-2 border-b">
                                      {room.status}
                                    </td>
                                  </tr>
                                ))}

                                <tr>
                                  <td className="px-2 py-2 border-b">
                                    Phòng 2
                                  </td>
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
            ))
          )}
        </tbody>
      </table>

      {/* Dialog Update */}
      <UpdateRoomManagerDialog
        isOpen={isUpdateDialogOpen}
        onClose={handleCloseUpdateDialog}
        roomTypeId={selectedRoomTypeId}
        onUpdateSuccess={handleUpdateSuccess}
      />
    </div>
  );
};

export default RoomCategoryPage;
