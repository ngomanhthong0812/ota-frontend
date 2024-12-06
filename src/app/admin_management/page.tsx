"use client";
import { ChartRevenue } from "@/components/room_admin/ChartRevenue";
import RoomProgressCard from "@/components/room_admin/RoomProgressCard";
import RoomUsageLineChart from "@/components/room_admin/RoomUsageLineChart ";
import { useAuth } from "@/context/auth.context";

interface IProps {}
const GeneralInformationPage: React.FC<IProps> = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <div>
      <RoomProgressCard />
      <div className="mt-5 flex flex-col bg-white cash-fund_content border !border-[var(--ht-neutral-100-)] rounded-md p-3">
        <RoomUsageLineChart />
      </div>
      <div className="mt-5 mb-5">
        <ChartRevenue />
      </div>
    </div>
  );
};

export default GeneralInformationPage;
