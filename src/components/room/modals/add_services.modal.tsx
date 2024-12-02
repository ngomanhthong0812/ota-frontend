'use client'
import SelectedItems from "@/components/service/payment_section/selected_items";
import ExtendedServiceTab from "@/components/service/service_list/extended_service_tab";
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog"
import { TAB_SERVICE_FINAL } from "@/constants/constants";
import { useAuth } from "@/context/auth.context";
import { useSelectedService } from "@/context/selectedService.context";
import useFormatPriceWithCommas from "@/hook/useFormatPriceWithCommas";
import { Category, Services } from "@/types/backend";
import axios from "axios";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import useSWR from "swr";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    invoiceId: number;
}

const fetcher = (url: string, token: string | null) =>
    fetch(url,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json());

const AddServicesModal = (props: IProps) => {
    const { isOpen, onClose, invoiceId } = props;
    const { formatPrice } = useFormatPriceWithCommas();

    const { token, user } = useAuth();
    const [dataOnTab, setDataOnTab] = useState<Services[]>();
    const [tabActive, setTabActive] = useState<string>(TAB_SERVICE_FINAL.ALL);
    const [search, setSearch] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { data } = useSWR(
        user?.hotel_id ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/services/servicesByHotelId/${user?.hotel_id}` : null,
        (url: string) => fetcher(url, token),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );

    const { data: categories } = useSWR(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/categoriesByHotelId/${user?.hotel_id}`,
        (url: string) => fetcher(url, token),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );

    const { handleAddSelectedService, handleClearAllSelectedService, totalServicePrice, selectedService } = useSelectedService();

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

    }, [data, tabActive, search]);

    const selected = (id: number, name: string, unit_price: number) => {
        handleAddSelectedService({
            id: id,
            name: name,
            unit_price: unit_price,
            quantity: 1,
        })
    }

    const handleSubmit = async () => {
        if (selectedService.length > 0) {
            setIsLoading(true)
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/invoiceItems/createInvoices/${invoiceId}`,
                    selectedService,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                // Kiểm tra phản hồi từ API
                if (response.data.statusCode === 200 || response.status === 201) {
                    console.log("Gửi thành công");
                    onClose();
                    handleClearAllSelectedService();
                    setIsLoading(false);
                    toast('Thêm dịch vụ thành công')
                }
            } catch (error) {
                setIsLoading(false);
                // In thông tin lỗi khi gặp sự cố
                console.log("Lỗi khi gửi dữ liệu:", error);
            }
        } else {
            onClose();
        }

    }

    return (
        <Dialog
            open={isOpen} onOpenChange={onClose}
        >
            <DialogContent
                aria-describedby={undefined}
                className="max-w-6xl w-full h-auto p-6 bg-white rounded-lg shadow-lg"
            >
                <header className="flex items-center py-2 modal-header">
                    <div className="w-1/2">
                        <DialogTitle>Thêm dịch vụ</DialogTitle>
                    </div>

                    <div className="w-1/2">
                        <div className="flex items-center gap-2 p-1 border rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={19} height={19} color={"#000000"} fill={"none"}>
                                <path d="M17.5 17.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                            </svg>

                            <input
                                onChange={(e) => setSearch(e.target.value)}
                                type="text"
                                className="w-full outline-none text-[14px]"
                                placeholder="Tìm kiếm dịch vụ" />
                        </div>
                    </div>
                </header>

                <div className="flex modal-body">
                    <div className="flex-1 truncate">
                        <div className=" flex items-center py-2 gap-4 border-t border-b nav-tab text-black text-[15px] overflow-x-auto">
                            <button
                                onClick={() => setTabActive(TAB_SERVICE_FINAL.ALL)}
                                className={`relative px-3 font-medium duration-200 ${tabActive === TAB_SERVICE_FINAL.ALL && 'text-[var(--navbar-color-)]'} hover:text-[var(--navbar-color-)]`}>{TAB_SERVICE_FINAL.ALL}</button>
                            {categories?.data?.map((item: Category) => (
                                <button
                                    key={item.id}
                                    onClick={() => setTabActive(item.name)}
                                    className={`relative px-3 font-medium duration-200 ${tabActive === item.name && 'text-[var(--navbar-color-)]'} hover:text-[var(--navbar-color-)]`}>{item.name}</button>
                            ))}
                            <button
                                onClick={() => setTabActive(TAB_SERVICE_FINAL.EXTENDED_SERVICE)}
                                className={`relative px-3 font-medium duration-200 ${tabActive === TAB_SERVICE_FINAL.EXTENDED_SERVICE && 'text-[var(--navbar-color-)]'} hover:text-[var(--navbar-color-)]`}>{TAB_SERVICE_FINAL.EXTENDED_SERVICE}</button>
                        </div>

                        <div className="flex h-auto py-2 text-sm">
                            <div className="w-full overflow-y-auto h-72 scrollbar-custom">
                                <ul className="">
                                    {dataOnTab?.map((item: Services) => (
                                        <li
                                            onClick={() => selected(item.id, item.name, item.unit_price)}
                                            key={item.id}
                                            className="flex items-center justify-between px-4 py-3 border-b cursor-pointer">
                                            <p className="name-service">{item.name}</p>
                                            <span className="name-price p-2 outline-none border rounded-md text-end">{formatPrice(String(item.unit_price))}</span>
                                        </li>
                                    ))}
                                    {tabActive === TAB_SERVICE_FINAL.EXTENDED_SERVICE && <div className="pr-2"><ExtendedServiceTab /></div>}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="w-[40%] border-t border-l">
                        <div className="px-3 py-2 font-medium text-black text-[15px] border-b">
                            <p>Chi tiết hoá đơn</p>
                        </div>

                        <div className="h-72 bg-white text-[14px] rounded-md p-3 overflow-y-auto">
                            {selectedService.length > 0
                                ?
                                <table className="w-full">
                                    <tbody>
                                        {selectedService.map(item => (
                                            <SelectedItems key={item.id} data={item} />
                                        ))}
                                    </tbody>
                                </table>
                                :
                                <div className="flex h-full items-center justify-center">
                                    <p>Chua co dich vu duoc them</p>
                                </div>
                            }
                        </div>

                        <div className="w-full px-3 ">
                            <div className="flex items-center justify-between mb-2 font-medium text-black">
                                <p>Tổng tiền:</p>

                                <p>{formatPrice(String(totalServicePrice))} VND</p>
                            </div>

                            <div className="">
                                <button className="group flex items-center justify-center w-full gap-2 bg-white py-1 border border-[var(--navbar-color-)] text-[var(--navbar-color-)] font-semibold rounded-md hover:bg-[var(--navbar-color-)] hover:text-white duration-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill={"none"} className="text-[var(--navbar-color-)] group-hover:text-white">
                                        <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                    <p className="font-[500]" onClick={handleSubmit}>Thêm vào phòng</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {isLoading
                    && <div className="fixed z-[999] bg-black bg-opacity-45 top-0 left-0 w-full h-full flex items-center justify-center">
                        <ClipLoader size={50} color="fffff" />
                    </div>
                }
            </DialogContent>
        </Dialog>
    )
}

export default AddServicesModal;