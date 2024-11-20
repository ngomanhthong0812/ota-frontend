"use client"

import useSWR from 'swr';
import RoomCard from "./room_card";
import { useEffect, useState } from 'react';
import { Floor, TypeRoomCard } from '@/types/backend';
import { useToolbar } from '@/context/toolbarContext';
import { parseCookies } from 'nookies';
import { ROOM_STATUS } from '@/constants/hotel_room-status';

interface IProps { }

const ROOM_BOOKINGS = {
    EMPTY_ROOM: "Phòng trống",
    OUT_TODAY: "Khách đi hôm nay",
    GUESTS_STAYING_OVER: "Khách ở qua ngày",
}

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

    const cookies = parseCookies();
    const token = cookies.access_token;
    const { data, error, isLoading } = useSWR(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/room/info-bookingsToday`,
        (url) => fetcher(url, token),
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
    if (isLoading) return "Loading...";


    return (
        <div>
            {selectedToolbar === 'Đặt phòng'
                && roomBookings?.map((roomBooking, index) => (
                    <RoomBookingSection key={roomBooking + index} roomBooking={roomBooking} data={data?.data || []} />
                ))
            }
            {selectedToolbar === 'Tầng'
                && floors?.map((floor) => (
                    <FloorSection key={floor.id} floor={floor} data={data?.data || []} />
                ))
            }
            {selectedToolbar === 'Loại'
                && categories?.map((category, index) => (
                    <CategoriesSection key={category + index} category={category} data={data?.data || []} />
                ))
            }
            {selectedToolbar === 'Phòng'
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
    const [newData, setNewData] = useState<TypeRoomCard[]>(data);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    useEffect(() => {
        let dataFilter: TypeRoomCard[] = [];
        if (roomBooking === ROOM_BOOKINGS.EMPTY_ROOM) {
            dataFilter = newData.filter(item => item.status === ROOM_STATUS.EMPTY);
        }
        if (roomBooking === ROOM_BOOKINGS.OUT_TODAY) {
            dataFilter = newData.filter(item => {
                const checkOutDate = new Date(item.bookings?.[0]?.check_out_at);
                checkOutDate.setHours(0, 0, 0, 0); // Set giờ về 00:00 để chỉ so sánh ngày
                return checkOutDate.getTime() === today.getTime();
            })
        }
        if (roomBooking === ROOM_BOOKINGS.GUESTS_STAYING_OVER) {
            dataFilter = newData.filter(item => {
                const checkOutDate = new Date(item.bookings?.[0]?.check_out_at);
                checkOutDate.setHours(0, 0, 0, 0); // Set giờ về 00:00 để chỉ so sánh ngày
                return checkOutDate.getTime() > today.getTime();
            })
        }
        setNewData(dataFilter);
    }, [])
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
                {newData.map((item: TypeRoomCard) => (
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