import axios from "axios";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

interface Props {
  value: string | number; // Giá trị hiện tại của floor
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface Floor {
  id: number;
  name: string;
}

const cookies = parseCookies();
const token = cookies.access_token;

const SelectFloor: React.FC<Props> = ({ value, onChange }) => {
  const [floors, setFloors] = useState<Floor[]>([]); // Lưu danh sách các tầng
  const [loading, setLoading] = useState<boolean>(true); // Trạng thái loading

  // Fetch dữ liệu từ API khi component mount
  useEffect(() => {
    const fetchFloors = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/floor/all`, // Thay endpoint với API lấy tầng
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setFloors(response.data.data); // Gán danh sách tầng
      } catch (error) {
        console.error("Có lỗi khi lấy danh sách tầng", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFloors();
  }, []); // Chỉ gọi lại khi component mount (lần đầu tiên)

  // Hiển thị loading nếu dữ liệu đang được tải
  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  return (
    <select
      name="floor_id"
      value={value}
      onChange={onChange}
      className="focus:outline-none w-full text-sm"
    >
      {floors.length > 0 ? (
        <>
          <option value="">--Lựa chọn--</option>
          {floors.map((floor) => (
            <option key={floor.id} value={floor.id}>
              {floor.name}
            </option>
          ))}
        </>
      ) : (
        <option value="" disabled>
          Chưa có tầng, vui lòng thêm tầng mới
        </option>
      )}
    </select>
  );
};

export default SelectFloor;
