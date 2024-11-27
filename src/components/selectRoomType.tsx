import axios from "axios";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

interface Props {
  value: string | number; // Giá trị hiện tại của room type
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface RoomType {
  roomTypeId: number;
  roomTypeName: string;
}

const cookies = parseCookies();
const token = cookies.access_token;

const SelectRoomType: React.FC<Props> = ({ value, onChange }) => {
  const [roomtypes, setRoomTypes] = useState<RoomType[]>([]); // Lưu danh sách room type
  const [loading, setLoading] = useState<boolean>(true); // Trạng thái loading

  // Fetch dữ liệu từ API khi component mount
  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/room-type/findAllRoomType`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setRoomTypes(response.data.data); // Gán danh sách room types
      } catch (error) {
        console.error("Có lỗi khi lấy danh sách room types", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomTypes();
  }, []); // Chỉ gọi lại khi component mount (lần đầu tiên)

  // Hiển thị loading nếu dữ liệu đang được tải
  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  return (
    <select
      name="room_type_id"
      value={value}
      onChange={onChange}
      className="focus:outline-none w-full text-sm"
    >
          {roomtypes.length > 0 ? (
        <>
          <option value="">--Lựa chọn--</option>
          {roomtypes.map((roomType) => (
            <option key={roomType.roomTypeId} value={roomType.roomTypeId}>
              {roomType.roomTypeName}
            </option>
          ))}
        </>
      ) : (
        <option value="" disabled>
          Chưa có loại phòng, vui lòng thêm loại phòng mới
        </option>
      )}
    </select>
  );
};

export default SelectRoomType;
