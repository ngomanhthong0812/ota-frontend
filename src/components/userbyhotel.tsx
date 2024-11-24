import React, { useEffect, useState } from "react";
import axios from "axios";
import { parseCookies } from "nookies";

interface User {
  id: number;
  user_name: string;
}

interface UserSelectProps {
  value: string; // Giá trị hiện tại của creator
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; // Hàm xử lý khi người dùng chọn một option
}
const cookies = parseCookies();
const token = cookies.access_token;
const UserSelect: React.FC<UserSelectProps> = ({ value, onChange }) => {
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
      name="creator"
      value={value}
      onChange={onChange}
      className="custom-select btn mb-4"
    >
      <option value="">Tìm kiếm nhân viên...</option>
      {users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.user_name}
        </option>
      ))}
    </select>
  );
};

export default UserSelect;
