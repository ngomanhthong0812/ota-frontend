import axios from "axios";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

interface Props {
  value: string | number; // Giá trị hiện tại của creator
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  IdUser: number;
  CreatedBy: string;
}

interface User {
  id: number;
  user_name: string;
}

const cookies = parseCookies();
const token = cookies.access_token;

const SelectUserUpdate: React.FC<Props> = ({
  value,
  onChange,
  IdUser,
  CreatedBy,
}) => {
  const [users, setUsers] = useState<User[]>([]); // Lưu danh sách người dùng
  const [loading, setLoading] = useState<boolean>(true); // Trạng thái loading

  // Fetch dữ liệu người dùng từ API khi component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/userbyhotel/all`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Thay token vào đây
              "Content-Type": "application/json",
            },
          }
        );
        setUsers(response.data.data); // Giả sử dữ liệu trả về là response.data.data
      } catch (error) {
        console.error("Có lỗi khi lấy danh sách người dùng", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Chỉ gọi lại khi component mount (lần đầu tiên)

  // Hiển thị loading nếu dữ liệu đang được tải
  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  return (
    <select
      value={value} // Giá trị đã chọn (value có thể là string hoặc number)
      onChange={onChange} // Hàm xử lý thay đổi
      className="custom-select btn mb-4"
    >
      {/* Hiển thị option đầu tiên */}
      <option value={IdUser}>{CreatedBy}</option>

      {/* Hiển thị các user còn lại từ API, bỏ qua user trùng với IdUser */}
      {users.length > 0 ? (
        users
          .filter((user) => user.id !== IdUser) // Lọc ra user có id khác với IdUser
          .map((user) => (
            <option key={user.id} value={user.id}>
              {user.user_name}
            </option>
          ))
      ) : (
        <option value="">Không có người dùng</option>
      )}
    </select>
  );
};

export default SelectUserUpdate;
