import { callApi } from "@/utils/api";
import RoomProgressChart from "./RoomProgressChart";
import { useEffect, useState } from "react";

interface IProps {}

const RoomProgressCard: React.FC<IProps> = ({}) => {
  const [roomStats, setRoomStats] = useState<{
    totalRooms: number;
    emptyRooms: number;
    bookedRooms: number;
    occupiedRooms: number;
    notCheckedOutRooms: number;
  } | null>(null);
  const fetchRoomTotal = async () => {
    try {
      const response = await callApi<any>(
        `/api/room/statistics/toalroom`, // Endpoint của API
        "GET"
      );
      console.log("api", response);

      setRoomStats(response.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchRoomTotal();
  }, []);
  return (
    <div>
      <div className="flex flex-col bg-white cash-fund_content border !border-[var(--ht-neutral-100-)] rounded-md p-3">
        <span className="text-black font-bold">Công suất phòng hiện tại</span>
        <div className="mt-5 flex justify-between ">
          <div className="flex justify-start items-start text-start w-full">
            {roomStats && (
              <RoomProgressChart
                totalRooms={roomStats?.totalRooms}
                occupiedRooms={roomStats?.occupiedRooms}
                description="Đang có khách"
                trailColor="#bdf6d4"
                pathColor="#177f42"
              />
            )}
          </div>
          <div className="flex justify-start items-start text-start w-full border-l pl-5">
            {roomStats && (
              <RoomProgressChart
                totalRooms={roomStats?.totalRooms}
                occupiedRooms={roomStats?.emptyRooms}
                description="Đang trống"
                trailColor="#f4e5c4"
                pathColor="#ffb74d"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomProgressCard;
