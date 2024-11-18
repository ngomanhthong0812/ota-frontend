"use client"

import useSWR from 'swr';
import RoomCard from "./room_card";
import { useEffect, useState } from 'react';
import { Floor, TypeRoomCard } from '@/types/backend';
import { useToolbar } from '@/context/toolbarContext';
import { useAuth } from '@/context/authContext';
import { parseCookies } from 'nookies';

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
            {selectedToolbar === 'Tầng'
                && floors?.map((floor) => (
                    <FloorSection key={floor.id} floor={floor} data={data?.data || []} />
                ))
            }
            {selectedToolbar === 'Loại'
                && categories?.map((category, index) => (
                    <CategoriesSection key={index} category={category} data={data?.data || []} />
                ))
            }
            {selectedToolbar === 'Phòng'
                && <RoomSection data={data?.data || []} />
            }
        </div>
    )
}

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