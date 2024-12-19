import { STATUS_SERVICE } from "@/constants/constants";
import useFormatPriceWithCommas from "@/hook/useFormatPriceWithCommas";
import { BookingHistory, Services, Transaction } from "@/types/backend";

interface IProps {
  data: Transaction;
  index: number;
  itemActive: number | null;
  setItemActive: (id: number | null) => void;
  checkedItems: number[];
  setCheckedItems: (e: React.MouseEvent, id: number) => void;
}
const TransactionInfo: React.FC<IProps> = ({
  data,
  index,
  itemActive,
  setItemActive,
  checkedItems,
  setCheckedItems,
}) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };
  const formatCurrency = (amount: number): string => {
    // Định dạng theo kiểu Việt Nam, sử dụng dấu phẩy là phân cách hàng nghìn
    return new Intl.NumberFormat("en-US").format(amount);
  };
  return (
    <tr
      onClick={() => setItemActive(data?.id === itemActive ? null : data?.id)}
      className={`cursor-pointer ${
        index % 2 === 0 && "bg-[#f9f9f9]"
      } hover:bg-[#ebf5ea] duration-200 ${
        itemActive === data?.id &&
        "border border-b-0 border-[#0090da] !bg-[#E6F4FB]"
      }`}
    >
      <td
        onClick={(e) => setCheckedItems(e, data?.id)}
        className="p-2 flex gap-3"
      >
        <input
          type="checkbox"
          onChange={() => {}}
          checked={checkedItems.includes(data?.id)}
        />
      </td>
      <td className="p-2">{data.code}</td>
      <td className="p-2">{formatDate(data.createdAt)}</td>
      <td className="p-2">
        {data.transactionType === "income" ? "Thu" : "Chi"}
      </td>
      <td className="p-2">
        {data.paymentType === "cash" ? "Tiền mặt" : "Chuyển khoản"}
      </td>
      <td className="p-2">{formatCurrency(data.amount)}</td>
      <td className="p-2">{data.user.name}</td>
      <td className="p-2">
        {data.status === "active" ? "Hoạt động" : "Đã hủy"}
      </td>
    </tr>
  );
};
export default TransactionInfo;
