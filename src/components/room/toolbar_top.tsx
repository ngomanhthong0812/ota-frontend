'use client'
import { TAB_ROOM_FINAL } from "@/constants/constants";
import { HOTEL_ROOMSTATUS_NAV } from "@/constants/hotel_room-status";
import { useAuth } from "@/context/auth.context";
import { useToolbar } from "@/context/toolbar.context";
import { RoomStatus, TypeRoomCard } from "@/types/backend";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface IProps { }

const fetcher = (url: string, token: string | null) =>
    fetch(url,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json());

const ToolbarTop: React.FC<IProps> = () => {
    const [toolbarList, setToolbarList] = useState<RoomStatus[]>(HOTEL_ROOMSTATUS_NAV);
    const { selectedToolbar, handleSelectedToobar } = useToolbar();
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
        const status = data?.data?.map((item: TypeRoomCard) => {
            return item.status
        })

        const newToolbarList = toolbarList.map(item => {
            return {
                ...item,
                count: status?.filter((i: string) => i === item.name).length
            }
        })
        setToolbarList(newToolbarList);
    }, [data])

    return (
        <div className="toolbar-top bg-white rounded-md p-2 flex text-xs border border-[var(--ht-neutral-100-)]">
            <div className="flex-1 flex flex-col gap-3">
                <div className="status flex gap-3">
                    {toolbarList.map(item => (
                        <div key={item.id} className={`${item.class} status-item`}>{item.name} {item.count}</div>
                    ))}
                </div>
                <div className="flex">
                    <div className="toolbar-top-type bg-[var(--ht-body-bg-)] flex rounded-3xl p-1 font-[500]">
                        <button className={`toolbar-top-type_item ${selectedToolbar === TAB_ROOM_FINAL.BOOKING_ROOM && "active"}`} onClick={() => handleSelectedToobar(TAB_ROOM_FINAL.BOOKING_ROOM)}>
                            {TAB_ROOM_FINAL.BOOKING_ROOM}
                        </button>
                        <button className={`toolbar-top-type_item ${selectedToolbar === TAB_ROOM_FINAL.CATEGORIES && "active"}`} onClick={() => handleSelectedToobar(TAB_ROOM_FINAL.CATEGORIES)}>
                            {TAB_ROOM_FINAL.CATEGORIES}
                        </button>
                        <button className={`toolbar-top-type_item ${selectedToolbar === TAB_ROOM_FINAL.FLOOR && "active"}`} onClick={() => handleSelectedToobar(TAB_ROOM_FINAL.FLOOR)}>
                            {TAB_ROOM_FINAL.FLOOR}
                        </button>
                        <button className={`toolbar-top-type_item ${selectedToolbar === TAB_ROOM_FINAL.ROOM && "active"}`} onClick={() => handleSelectedToobar(TAB_ROOM_FINAL.ROOM)}>
                            {TAB_ROOM_FINAL.ROOM}
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col gap-3 items-end">
                <div className="flex gap-3">
                    <button
                        className="center px-2 gap-1 text-xs bg-[var(--room-not-checked-out-color-)] text-white rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 384 512"
                            className="fill-white">
                            <path
                                d="M64 464l256 0c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zM192 272l0 128c0 6.5-3.9 12.3-9.9 14.8s-12.9 1.1-17.4-3.5L129.4 376 112 376c-8.8 0-16-7.2-16-16l0-48c0-8.8 7.2-16 16-16l17.4 0 35.3-35.3c4.6-4.6 11.5-5.9 17.4-3.5s9.9 8.3 9.9 14.8zm85.8-4c11.6 20 18.2 43.3 18.2 68s-6.6 48-18.2 68c-6.6 11.5-21.3 15.4-32.8 8.8s-15.4-21.3-8.8-32.8c7.5-12.9 11.8-27.9 11.8-44s-4.3-31.1-11.8-44c-6.6-11.5-2.7-26.2 8.8-32.8s26.2-2.7 32.8 8.8z" />
                        </svg>Đọc thẻ</button>
                    <div className="relative flex-1 w-[100px]">
                        <input type="text" placeholder="Phòng"
                            className="w-full rounded-md px-6 py-[3px] text-xs text-black border outline-none" />
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                            className="absolute top-[50%] translate-y-[-45%] left-1 fill-[--ht-neutral-300-]">
                            <path
                                d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z">
                            </path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToolbarTop;