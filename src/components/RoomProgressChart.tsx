import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface RoomProgressChartProps {
  totalRooms: number;
  occupiedRooms: number;
  description: string;
  pathColor: string;
  trailColor: string;
}

const RoomProgressChart: React.FC<RoomProgressChartProps> = ({
  totalRooms,
  occupiedRooms,
  description,
  pathColor,
  trailColor,
}) => {
  const percentage = (occupiedRooms / totalRooms) * 100;

  return (
    <div className="flex items-center gap-5">
      <div className={`chart`}>
        {/* Tăng kích thước container */}
        <CircularProgressbar
          value={percentage}
          text={`${Math.round(percentage)}%`}
          styles={buildStyles({
            textSize: "20px", // Tăng kích thước chữ
            pathColor: pathColor, // Màu vòng
            trailColor: trailColor, // Màu nền vòng
            strokeLinecap: "round", // Đầu vòng tròn bo tròn
            textColor: pathColor,
          })}
        />
      </div>
      <div>
        <div>
          <div className="font-semibold">
            <span className={`font-bold text-lg`} style={{ color: pathColor }}>
              {occupiedRooms}
            </span>
            /{totalRooms} phòng
          </div>
        </div>
        <div className="font-bold text-slate-900">{description}</div>
      </div>
    </div>
  );
};

export default RoomProgressChart;
