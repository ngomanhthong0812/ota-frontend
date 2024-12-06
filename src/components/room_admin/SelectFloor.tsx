import { callApi } from "@/utils/api";
import { useEffect, useState } from "react";

interface Props {
  value: string | number; // Giá trị hiện tại của floor (ID của tầng)
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; // Hàm xử lý khi thay đổi lựa chọn
}

interface Floor {
  id: number;
  name: string;
}

const SelectFloor: React.FC<Props> = ({ value, onChange }) => {
  const [floors, setFloors] = useState<Floor[]>([]); // Lưu danh sách các tầng
  const [loading, setLoading] = useState<boolean>(true); // Trạng thái loading
  const [error, setError] = useState<string | null>(null); // Trạng thái lỗi

  // Fetch dữ liệu từ API khi component mount
  useEffect(() => {
    const fetchFloors = async () => {
      try {
        const response = await callApi<any>(
          `/api/floor/all`, // Endpoint của API
          "GET"
        );
        setFloors(response.data.data); // Gán danh sách tầng
      } catch (error) {
        setError("Có lỗi khi lấy danh sách tầng. Vui lòng thử lại.");
        console.error("Có lỗi khi lấy danh sách tầng", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFloors();
  }, []); // Chỉ gọi lại khi component mount (lần đầu tiên)

  // Hiển thị loading nếu dữ liệu đang được tải
  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  // Hiển thị thông báo lỗi nếu có lỗi xảy ra
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <select
      name="floor_id"
      value={value} // Truyền vào giá trị của tầng đã chọn
      onChange={onChange} // Xử lý khi thay đổi tầng
      className="focus:outline-none w-full text-sm"
    >
      <option value="">--Lựa chọn--</option>
      {/* Option mặc định khi không có giá trị */}
      {floors && floors.length > 0 ? (
        floors.map((floor) => (
          <option key={floor.id} value={floor.id}>
            {floor.name}
          </option>
        ))
      ) : (
        <option value="" disabled>
          Chưa có tầng, vui lòng thêm tầng mới
        </option>
      )}
    </select>
  );
};

export default SelectFloor;
