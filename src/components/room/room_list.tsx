"use client"

import useSWR from 'swr';
import RoomCard from "./room_card";
import { useEffect, useState } from 'react';
import { Floor, TypeRoomCard } from '@/types/backend';
import { useToolbar } from '@/context/toolbar.context';
import { ROOM_STATUS } from '@/constants/hotel_room-status';
import { useAuth } from '@/context/auth.context';
import { ROOM_BOOKINGS, TAB_ROOM_FINAL } from '@/constants/constants';
import { Skeleton } from '../ui/skeleton';

interface IProps { }

const fetcher = (url: string, token: string | null) =>
    fetch(url,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json());

const RoomList: React.FC<IProps> = () => {
    const [floors, setFloors] = useState<Floor[]>();
    const [categories, setCategories] = useState<string[]>();
    const [roomBookings, setRoomBookings] = useState<string[]>([
        ROOM_BOOKINGS.EMPTY_ROOM,
        ROOM_BOOKINGS.OUT_TODAY,
        ROOM_BOOKINGS.GUESTS_STAYING_OVER
    ]);

    const { selectedToolbar } = useToolbar();

    const { user, token } = useAuth();
    const { data, error, isLoading } = useSWR(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/room/info-bookingsToday/${user?.hotel_id}`,
        (url: string) => fetcher(url, token),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );

    useEffect(() => {
        const newFloors = data?.data?.map((item: TypeRoomCard) => {
            return item.floor
        })

        // Lấy floor duy nhất => loại bỏ các floor bị trùng
        const uniqueFloors = newFloors?.reduce((acc: Floor[], curr: Floor) => {
            if (!acc.some((item: Floor) => item.id === curr.id)) {
                acc.push(curr);
            }
            return acc;
        }, [])

        const newCategories = data?.data?.map((item: TypeRoomCard) => {
            return item.room_type
        })

        // Lấy floor duy nhất => loại bỏ các floor bị trùng
        const uniqueCategories = newCategories?.reduce((acc: string[], curr: string) => {
            if (!acc.includes(curr)) {
                acc.push(curr);
            }
            return acc;
        }, [])

        setFloors(uniqueFloors);
        setCategories(uniqueCategories);
    }, [data])

    if (error) return "An error has occurred.";
    if (isLoading) return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[50px] w-full rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
            </div>
        </div>
    );

    return (
        <div>
            {selectedToolbar === TAB_ROOM_FINAL.BOOKING_ROOM
                && roomBookings?.map((roomBooking, index) => (
                    <RoomBookingSection key={roomBooking + index} roomBooking={roomBooking} data={data?.data || []} />
                ))
            }
            {selectedToolbar === TAB_ROOM_FINAL.FLOOR
                && floors?.map((floor) => (
                    <FloorSection key={floor.id} floor={floor} data={data?.data || []} />
                ))
            }
            {selectedToolbar === TAB_ROOM_FINAL.CATEGORIES
                && categories?.map((category, index) => (
                    <CategoriesSection key={category + index} category={category} data={data?.data || []} />
                ))
            }
            {selectedToolbar === TAB_ROOM_FINAL.ROOM
                && <RoomSection data={data?.data || []} />
            }
        </div>
    )
}

interface RoomBookingSectionProps {
    roomBooking: string;
    data: TypeRoomCard[];
}

const RoomBookingSection: React.FC<RoomBookingSectionProps> = ({ roomBooking, data }) => {
    const [newData, setNewData] = useState<TypeRoomCard[]>([]);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    useEffect(() => {
        let dataFilter: TypeRoomCard[] = data;
        if (roomBooking === ROOM_BOOKINGS.EMPTY_ROOM) {
            dataFilter = dataFilter.filter(item => item.status === ROOM_STATUS.EMPTY);
        }
        if (roomBooking === ROOM_BOOKINGS.OUT_TODAY) {
            dataFilter = dataFilter.filter(item => {
                const checkOutDate = new Date(item.bookings?.[0]?.check_out_at);
                checkOutDate.setHours(0, 0, 0, 0); // Set giờ về 00:00 để chỉ so sánh ngày
                return checkOutDate.getTime() === today.getTime();
            })
        }
        if (roomBooking === ROOM_BOOKINGS.GUESTS_STAYING_OVER) {
            dataFilter = dataFilter.filter(item => {
                const checkOutDate = new Date(item.bookings?.[0]?.check_out_at);
                checkOutDate.setHours(0, 0, 0, 0); // Set giờ về 00:00 để chỉ so sánh ngày
                return checkOutDate.getTime() > today.getTime();
            })
        }
        setNewData(dataFilter);
    }, [roomBooking, data])
    return (
        <section>
            <div className="body_content-title flex gap-3">
                <h3 className="text-lg font-[500] text-black">{roomBooking}
                    <span className="font-[500] text-[var(--color-menu-icon-)]">
                        ({newData.length})
                    </span>
                </h3>
                <span className="body_content-line relative flex-1"></span>
            </div>
            <div
                className="body_content-room grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 py-3 gap-3">
                {newData?.map((item: TypeRoomCard) => (
                    <div key={item.id}>
                        <RoomCard data={item} />
                    </div>
                ))}
            </div>
        </section>
    );
};


interface FloorSectionProps {
    floor: Floor;
    data: TypeRoomCard[];
}

const FloorSection: React.FC<FloorSectionProps> = ({ floor, data }) => {
    return (
        <section>
            <div className="body_content-title flex gap-3">
                <h3 className="text-lg font-[500] text-black">{floor.name}
                    <span className="font-[500] text-[var(--color-menu-icon-)]">
                        ({data.filter((item: TypeRoomCard) => item.floor.id === floor.id).length})
                    </span>
                </h3>
                <span className="body_content-line relative flex-1"></span>
            </div>
            <div
                className="body_content-room grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 py-3 gap-3">
                {data.map((item: TypeRoomCard) => (
                    item.floor.id === floor.id && (
                        <div key={item.id}>
                            <RoomCard data={item} />
                        </div>
                    )
                ))}
            </div>
        </section>
    );
};

interface CategoriesSectionProps {
    category: string;
    data: TypeRoomCard[];
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ category, data }) => {
    return (
        <section>
            <div className="body_content-title flex gap-3">
                <h3 className="text-lg font-[500] text-black">{category}
                    <span className="font-[500] text-[var(--color-menu-icon-)]">
                        ({data.filter((item: TypeRoomCard) => item.room_type === category).length})
                    </span>
                </h3>
                <span className="body_content-line relative flex-1"></span>
            </div>
            <div
                className="body_content-room grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 py-3 gap-3">
                {data.map((item: TypeRoomCard) => (
                    item.room_type === category && (
                        <div key={item.id}>
                            <RoomCard data={item} />
                        </div>
                    )
                ))}
            </div>
        </section>
    );
};

interface RoomSectionProps {
    data: TypeRoomCard[];
}

const RoomSection: React.FC<RoomSectionProps> = ({ data }) => {
    return (
        <section>
            <div
                className="body_content-room grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 py-3 gap-3">
                {data.map((item: TypeRoomCard) => (
                    <div key={item.id}>
                        <RoomCard data={item} />
                    </div>
                ))}
            </div>
        </section>
    );
};


export default RoomList;