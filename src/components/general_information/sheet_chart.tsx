'use client'
import { FaChartColumn } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useAuth } from "@/context/auth.context";

interface IProps {
    isShowChart: boolean,
    setIsShowChart: (b: boolean) => void
}
const fetcher = (url: string, token: string | null) =>
    fetch(url,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json());

const SheetChart: React.FC<IProps> = ({ isShowChart, setIsShowChart }) => {
    const { user, token } = useAuth();
    const { data } = useSWR(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/statistics/getRoomCapacityAndOccupancy/${user?.hotel_id}`,
        (url: string) => fetcher(url, token)
    );

    const { data: dataTodayActivities } = useSWR(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/statistics/getTodayActivities/${user?.hotel_id}`,
        (url: string) => fetcher(url, token)
    );


    const [today, setToday] = useState<string>('');
    useEffect(() => {
        const today = new Date();

        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const day = dayNames[today.getDay()];
        const month = monthNames[today.getMonth()];
        const date = today.getDate();
        const year = today.getFullYear();

        const formattedDate = `${day} ${month} ${date}, ${year}`;

        setToday(formattedDate);
    }, [])
    return (
        <Sheet open={isShowChart} onOpenChange={open => {
            if (!open) {
                setIsShowChart(false);
            }
        }}>
            <SheetTrigger asChild>
            </SheetTrigger>
            <SheetContent className="px-2 !max-w-[300px]">
                <SheetHeader>
                    <SheetTitle className="font-[500] py-3">{today}</SheetTitle>
                </SheetHeader>
                <div>
                    <div className="bg-[var(--room-empty-color-)] p-4 flex items-center text-white gap-3 rounded-sm mt-4">
                        <div><FaChartColumn size={20} /></div>
                        <div className="leading-4">
                            <h3 className="font-[500] text-[18px]">{data?.data?.roomCapacity}</h3>
                            <span className="text-[12px]">Công suất phòng</span>
                        </div>
                    </div>

                    <div className="bg-[var(--room-booked-color-)] p-4 flex items-center text-white gap-3 rounded-sm mt-4">
                        <div><FaUser size={20} /></div>
                        <div className="leading-4">
                            <span className="flex gap-2">
                                <h3 className="font-[500] text-[18px]">{data?.data?.totalPeople?.adults + data?.data?.totalPeople?.children}</h3>
                                <span className="text-[12px]">Tổng khách hàng đang ở</span>
                            </span>
                            <span className="flex gap-4">
                                <span className="text-[12px]">{data?.data?.totalPeople?.adults} người lớn</span>
                                <span className="text-[12px]">{data?.data?.totalPeople?.children} trẻ em</span>
                            </span>
                        </div>
                    </div>

                    <div className="mt-4 text-[13px]">
                        <h1 className="text-[16px] px-1 pb-3">Hoạt động trong ngày</h1>
                        <p className="border-t py-2 px-1 flex justify-between">Đã đến <span>{dataTodayActivities?.data?.checkedIn}</span></p>
                        <p className="border-t py-2 px-1 flex justify-between">Dự kiến đến <span>{dataTodayActivities?.data?.expectedArrival}</span></p>
                        <p className="border-t py-2 px-1 flex justify-between">Đã đi <span>{dataTodayActivities?.data?.checkedOut}</span></p>
                        <p className="border-t py-2 px-1 flex justify-between">Dự kiến đi <span>{dataTodayActivities?.data?.expectedDeparture}</span></p>
                        <p className="border-t py-2 px-1 flex justify-between">Đến và đi trong ngày <span>{dataTodayActivities?.data?.arrivedAndDeparted}</span></p>
                    </div>
                </div>
                <SheetFooter>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default SheetChart;