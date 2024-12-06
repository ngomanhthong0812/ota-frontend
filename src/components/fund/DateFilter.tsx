import React, { useEffect } from "react";

interface DateFilterProps {
  startDate: string;
  endDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  handleDateChange: (
    setDate: React.Dispatch<React.SetStateAction<string>>
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  handleDateChange,
}) => {
  useEffect(() => {
    // Nếu startDate hoặc endDate chưa được chọn, mặc định là hôm nay
    if (!startDate) {
      const today = new Date().toISOString().split("T")[0]; // Lấy ngày hôm nay (YYYY-MM-DD)
      setStartDate(today);
    }
    if (!endDate) {
      const today = new Date().toISOString().split("T")[0]; // Lấy ngày hôm nay (YYYY-MM-DD)
      setEndDate(today);
    }
  }, [startDate, endDate, setStartDate, setEndDate]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const today = new Date();
    let newStartDate = "";
    let newEndDate = "";

    switch (selectedValue) {
      case "today":
        newStartDate = today.toISOString().split("T")[0];
        newEndDate = today.toISOString().split("T")[0];
        break;
      case "week":
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay()); // Đặt ngày bắt đầu của tuần
        newStartDate = startOfWeek.toISOString().split("T")[0];
        newEndDate = today.toISOString().split("T")[0]; // Đến ngày hôm nay
        break;
      case "month":
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // Ngày đầu tháng
        newStartDate = startOfMonth.toISOString().split("T")[0];
        newEndDate = today.toISOString().split("T")[0]; // Đến ngày hôm nay
        break;
      case "previousMonth":
        const previousMonth = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          1
        ); // Ngày đầu tháng trước
        const endOfPreviousMonth = new Date(
          today.getFullYear(),
          today.getMonth(),
          0
        ); // Ngày cuối tháng trước
        newStartDate = previousMonth.toISOString().split("T")[0];
        newEndDate = endOfPreviousMonth.toISOString().split("T")[0];
        break;
      case "quarter":
        const quarterStartMonth = Math.floor(today.getMonth() / 3) * 3;
        const startOfQuarter = new Date(
          today.getFullYear(),
          quarterStartMonth,
          1
        ); // Ngày đầu quý
        newStartDate = startOfQuarter.toISOString().split("T")[0];
        newEndDate = today.toISOString().split("T")[0]; // Đến ngày hôm nay
        break;
      default:
        break;
    }

    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  return (
    <div className="flex items-center gap-8">
      <select className="btn !py-1 !px-2 !w-auto" onChange={handleSelectChange}>
        <option value="today">Hôm nay</option>
        <option value="week">Tuần này</option>
        <option value="month">Tháng này</option>
        <option value="previousMonth">Tháng trước</option>
        <option value="quarter">Quý này</option>
      </select>

      <div className="center">
        <label htmlFor="start-date">Từ</label>
        <input
          type="date"
          id="start-date"
          value={startDate}
          onChange={handleDateChange(setStartDate)}
          className="btn !py-1 !px-2 !w-auto ml-2"
        />
      </div>

      <div className="center">
        <label htmlFor="end-date">Đến</label>
        <input
          type="date"
          id="end-date"
          value={endDate}
          onChange={handleDateChange(setEndDate)}
          className="btn !py-1 !px-2 !w-auto ml-2"
        />
      </div>
    </div>
  );
};

export default DateFilter;
