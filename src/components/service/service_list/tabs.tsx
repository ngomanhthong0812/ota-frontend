'use client'
import { TAB_SERVICE_FINAL } from "@/constants/constants";
import { useAuth } from "@/context/auth.context";
import { Category } from "@/types/backend";
import { useState } from "react";
import useSWR from "swr";

interface IProps {
    handleChangeTab: (name: string) => void,
    tabActive: string,
}

const fetcher = (url: string, token: string | null) =>
    fetch(url,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json());

const Tabs: React.FC<IProps> = ({ handleChangeTab, tabActive }) => {
    const { user, token } = useAuth();
    const { data, error, isLoading } = useSWR(
        user?.hotel_id ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/categoriesByHotelId/${user?.hotel_id}` : null,
        (url: string) => fetcher(url, token),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );
    return (
        <div className="toolbar-top bg-white rounded-md flex text-xs">
            <div className="flex">
                <div
                    className="toolbar-top-type bg-[var(--ht-body-bg-)] flex-wrap flex rounded-3xl p-1 font-[500]">
                    <button
                        onClick={() => handleChangeTab(TAB_SERVICE_FINAL.ALL)}
                        className={`toolbar-top-type_item ${tabActive === TAB_SERVICE_FINAL.ALL && 'active'}`}>
                        Tất cả
                    </button>
                    {
                        data?.data?.map((item: Category) => (
                            <button
                                key={item.id}
                                onClick={() => handleChangeTab(item.name)}
                                className={`toolbar-top-type_item ${tabActive === item.name && 'active'}`}>
                                {item.name}
                            </button>
                        ))
                    }
                    <button
                        onClick={() => handleChangeTab(TAB_SERVICE_FINAL.EXTENDED_SERVICE)}
                        className={`toolbar-top-type_item ${tabActive === TAB_SERVICE_FINAL.EXTENDED_SERVICE && 'active'}`}>
                        Dịch vụ mở rộng
                    </button>
                </div>
            </div>
        </div >
    )
}
export default Tabs;