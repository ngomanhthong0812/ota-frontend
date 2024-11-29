'use client'

import ToolbarTop from "@/components/general_information/toolbar_top";
import GeneralInformationTable from "@/components/general_information/general_information_table";
import RightPanel from "@/components/general_information/right_panel";
import useSWR from "swr";
import { useAuth } from "@/context/auth.context";
import { useEffect, useState } from "react";
import { ROOM_STATUS, TAB_GENERA_INFOMATION } from "@/constants/constants";
import { TypeRoomCard } from "@/types/backend";

interface IProps { }

const fetcher = (url: string, token: string | null) =>
    fetch(url,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json());
const GeneralInformationPage: React.FC<IProps> = () => {
    const { user, token } = useAuth();
    const [tabActive, setTabActive] = useState<string>(TAB_GENERA_INFOMATION.WILL_ARRIVE);
    const [newData, setNewData] = useState<TypeRoomCard[]>([]);
    const { data, error, isLoading } = useSWR(
        user?.hotel_id ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/room/info-roomInusedToday/${user?.hotel_id}` : null,
        (url: string) => fetcher(url, token),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    useEffect(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (data) {
            let dataFilter: TypeRoomCard[] = data?.data;
            if (tabActive === TAB_GENERA_INFOMATION.WILL_ARRIVE) {
                dataFilter = dataFilter.filter(item => {
                    const bookingDate = new Date(item.bookings?.[0]?.booking_at);
                    bookingDate.setHours(0, 0, 0, 0); // Set giờ về 00:00 để chỉ so sánh ngày
                    return bookingDate.getTime() === today.getTime();
                })
            }
            if (tabActive === TAB_GENERA_INFOMATION.WILL_DEPART) {
                dataFilter = dataFilter.filter(item => {
                    const checkOutDate = new Date(item.bookings?.[0]?.check_out_at);
                    checkOutDate.setHours(0, 0, 0, 0); // Set giờ về 00:00 để chỉ so sánh ngày
                    return checkOutDate.getTime() === today.getTime();
                })
            }
            if (tabActive === TAB_GENERA_INFOMATION.OVERDUE_ARRIVE) {
                const now = new Date();

                dataFilter = dataFilter.filter(item => {
                    const bookingDate = item.bookings?.[0]?.booking_at
                        ? new Date(item.bookings[0].booking_at)
                        : null;
                    const checkInDate = item.bookings?.[0]?.check_in_at
                        ? new Date(item.bookings[0].check_in_at)
                        : null;

                    // Kiểm tra: checkInDate null và hiện tại đã qua 3 giờ kể từ bookingDate
                    return (
                        checkInDate === null &&
                        bookingDate !== null &&
                        now.getTime() - bookingDate.getTime() > 3 * 60 * 60 * 1000
                    );
                });
            }

            if (tabActive === TAB_GENERA_INFOMATION.CURRENT_GUEST) {
                dataFilter = dataFilter.filter(item => {
                    return item.status === ROOM_STATUS.OCCUPIED
                });
            }
            setNewData(dataFilter);
        }
    }, [data, tabActive]);

    return (
        <div className="flex relative">
            <div className="flex-1 mr-[45px]">
                <ToolbarTop tabActive={tabActive} setTabActive={setTabActive} />
                {
                    tabActive === TAB_GENERA_INFOMATION.WILL_ARRIVE
                    && <GeneralInformationTable data={newData} />
                }
                {
                    tabActive === TAB_GENERA_INFOMATION.WILL_DEPART
                    && <GeneralInformationTable data={newData} />
                }
                {
                    tabActive === TAB_GENERA_INFOMATION.OVERDUE_ARRIVE
                    && <GeneralInformationTable data={newData} />
                }
                {
                    tabActive === TAB_GENERA_INFOMATION.CURRENT_GUEST
                    && <GeneralInformationTable data={newData} />
                }
            </div>
            <RightPanel />
        </div>
    );
}

export default GeneralInformationPage;

