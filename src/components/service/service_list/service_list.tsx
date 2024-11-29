'use client'
import Tabs from "./tabs";
import ServiceItem from "./service_item";
import Search from "./search";
import { useAuth } from "@/context/auth.context";
import useSWR from "swr";
import { Services } from "@/types/backend";
import { useEffect, useState } from "react";
import { TAB_SERVICE_FINAL } from "@/constants/constants"
import ExtendedServiceTab from "./extended_service_tab";

interface IProps { }

const fetcher = (url: string, token: string | null) =>
    fetch(url,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json());

const ServiceList: React.FC<IProps> = () => {
    const { user, token } = useAuth();
    const [dataOnTab, setDataOnTab] = useState<Services[]>();
    const [search, setSearch] = useState<string>('');
    const [tabActive, setTabActive] = useState<string>(TAB_SERVICE_FINAL.ALL);

    const { data, error, isLoading } = useSWR(
        user?.hotel_id ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/services/servicesByHotelId/${user?.hotel_id}` : null,
        (url: string) => fetcher(url, token),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );

    useEffect(() => {
        let newData: Services[] = data?.data;
        if (tabActive !== TAB_SERVICE_FINAL.ALL) {
            newData = newData?.filter((item: Services) => item.category.name === tabActive);
        }
        if (tabActive === TAB_SERVICE_FINAL.EXTENDED_SERVICE) newData = [];

        if (search) {
            newData = newData?.filter((item: Services) => item.name.toLowerCase().trim().includes(search.toLowerCase().trim()));
        }

        setDataOnTab(newData);

    }, [data, tabActive, search])

    const handleChangeTab = (name: string) => {
        setTabActive(name);
    }
    const handleChangeSearch = (key: string) => {
        setSearch(key);
    }
    return (
        <div className="w-full lg:w-[65%]">
            <Search handleChangeSearch={handleChangeSearch} />
            <div className="cash-fund_content">
                <div className="flex flex-col lg:flex-row gap-2 w-full">
                    <div className="w-full bg-white border !border-[var(--ht-neutral-100-)] rounded-md  p-3">
                        <Tabs handleChangeTab={handleChangeTab} tabActive={tabActive} />
                        <div className="tab-children py-3">
                            {isLoading && <div>Loading...</div>}
                            {!isLoading &&
                                <div
                                    className="tab-children-all grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-3">
                                    {dataOnTab?.map((item: Services) => (
                                        <ServiceItem data={item} key={item.id} />
                                    ))}
                                </div>
                            }
                            {tabActive === TAB_SERVICE_FINAL.EXTENDED_SERVICE && <ExtendedServiceTab />}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}



export default ServiceList;