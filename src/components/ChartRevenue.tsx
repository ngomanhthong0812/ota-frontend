"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Định nghĩa kiểu dữ liệu cho chart
type ChartData = {
  label: string; // Có thể là ngày, giờ, hoặc thứ
  revenue: number;
};

// Dữ liệu doanh thu theo ngày (Giả sử)
const dailyData: ChartData[] = [
  { label: "01/01", revenue: 800000000 },
  { label: "02/01", revenue: 900000000 },
  { label: "03/01", revenue: 1000000000 },
  { label: "04/01", revenue: 600000000 },
  { label: "05/01", revenue: 850000000 },
];

// Dữ liệu doanh thu theo giờ (Giả sử)
const hourlyData: ChartData[] = [
  { label: "1 AM", revenue: 100000000 },
  { label: "2 AM", revenue: 120000000 },
  { label: "3 AM", revenue: 150000000 },
  { label: "4 AM", revenue: 130000000 },
  { label: "5 AM", revenue: 170000000 },
];

// Dữ liệu doanh thu theo thứ (Giả sử)
const weeklyData: ChartData[] = [
  { label: "Thứ 2", revenue: 200000000 },
  { label: "Thứ 3", revenue: 300000000 },
  { label: "Thứ 4", revenue: 500000000 },
  { label: "Thứ 5", revenue: 450000000 },
  { label: "Thứ 6", revenue: 400000000 },
  { label: "Thứ 7", revenue: 600000000 },
  { label: "Chủ nhật", revenue: 700000000 },
];

// Cấu hình biểu đồ
const chartConfig = {
  revenue: {
    label: "Doanh thu ",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

// Hàm định dạng giá trị Y theo mệnh giá Việt Nam
const formatYAxisValue = (value: number) => {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)} tỷ`; // Trên 1 tỷ
  }
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}tr`; // Trên 1 triệu
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}k`; // Trên 1 nghìn
  }
  return value.toString(); // Dưới 1000
};

export function ChartRevenue() {
  const [dataType, setDataType] = useState("daily"); // Mặc định xem theo ngày
  const [chartData, setChartData] = useState<ChartData[]>(dailyData); // Dữ liệu mặc định là daily

  // Hàm xử lý sự kiện thay đổi lựa chọn
  const handleDataTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedType = event.target.value;
    setDataType(selectedType);

    // Cập nhật dữ liệu theo lựa chọn
    if (selectedType === "daily") {
      setChartData(dailyData);
    } else if (selectedType === "hourly") {
      setChartData(hourlyData);
    } else if (selectedType === "weekly") {
      setChartData(weeklyData);
    }
  };

  return (
    <Card>
      <div className="flex justify-between items-center">
        <CardHeader className="flex-1">
          <CardTitle>Doanh thu thuần tháng này</CardTitle>
          <CardDescription>
            {dataType === "daily"
              ? "Doanh thu theo ngày"
              : dataType === "hourly"
              ? "Doanh thu theo giờ"
              : "Doanh thu theo thứ"}
          </CardDescription>
        </CardHeader>

        {/* Dropdown lựa chọn */}
        <div className="ml-5 mr-5">
          <label htmlFor="data-type">Chọn loại dữ liệu: </label>
          <select
            id="data-type"
            value={dataType}
            onChange={handleDataTypeChange}
            className="ml-2 p-2 border border-gray-300 rounded"
          >
            <option value="daily">Theo ngày</option>
            <option value="hourly">Theo giờ</option>
            <option value="weekly">Theo thứ</option>
          </select>
        </div>
      </div>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-96 w-full">
          <BarChart width={600} height={150} data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="label" // Dùng 'label' để linh hoạt giữa ngày, giờ, và thứ
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 10)} // Hiển thị 3 chữ cái đầu của ngày, giờ, hoặc thứ
            />
            <YAxis
              tickFormatter={formatYAxisValue} // Sử dụng hàm định dạng đã tạo
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            {/* Chỉnh sửa chiều rộng của cột bằng barSize */}
            <Bar
              dataKey="revenue"
              fill="hsl(var(--chart-2))"
              radius={8}
              barSize={60}
            />
            {/* barSize=30 giúp chỉnh chiều rộng của cột */}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
