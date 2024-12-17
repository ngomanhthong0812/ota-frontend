import apiClient from "@/utils/apiClient";
import { useState } from "react";
interface IProps {
  type: string;
}
const ExportButton: React.FC<IProps> = ({ type }) => {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      // Gọi API của backend để lấy file
      const response = await apiClient.get(
        `/api/transaction/file/transactionsexcel?type=${type}`,
        { responseType: "blob" } // Đảm bảo nhận file dưới dạng Blob
      );

      // Kiểm tra nếu response trả về thành công
      if (response.status === 200) {
        // Lấy dữ liệu file dưới dạng blob
        const blob = response.data;

        // Tạo URL cho file Blob
        const url = window.URL.createObjectURL(blob);

        // Tạo thẻ anchor để tải file về
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `Chi_Tiet_Giao_Dich_${type}.xlsx`); // Đặt tên file khi tải
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Giải phóng URL Blob sau khi tải xong
        window.URL.revokeObjectURL(url);
      } else {
        console.error("Error exporting transactions:", response.statusText);
      }
    } catch (error) {
      console.error("Error exporting transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="sbm !p-[6px] uppercase bg-[var(--room-empty-color-)] !text-white !text-xs hover:bg-[var(--room-empty-color-hover-)]"
      onClick={handleExport} // Gọi hàm handleExport khi click
      disabled={loading}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
        className="icon !fill-white !m-0"
      >
        <path d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 128-168 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l168 0 0 112c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zM384 336l0-48 110.1 0-39-39c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l80 80c9.4 9.4 9.4 24.6 0 33.9l-80 80c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l39-39L384 336zm0-208l-128 0L256 0 384 128z" />
      </svg>
      {loading ? "Đang xuất file..." : "Xuất file excel"}
    </button>
  );
};

export default ExportButton;
