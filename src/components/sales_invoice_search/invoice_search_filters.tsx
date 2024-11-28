'use client'

import { useAuth } from '@/context/auth.context';
import { InvoiceReceipt } from '@/types/backend';
import React, { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';

interface IProps {
    handleFilterData: (data: InvoiceReceipt[]) => void,
    setTotalData: (total: number) => void,
    setPageSize: (size: number) => void,
    currentPage: number,
}

interface TypeFilterInvoiceService {
    period: string,
    startDate: string | null,
    endDate: string | null,
}

const PERIOD_SERVICE_FILTER = {
    TODAY: "Hôm nay",
    THIS_WEEK: "Tuần này",
    THIS_MONTH: "Tháng này",
    LAST_MONTH: "Tháng trước",
    THIS_QUARTER: "Quý này"
};

const InvoiceSearchFilters: React.FC<IProps> = ({ handleFilterData, setTotalData, setPageSize, currentPage }) => {
    const { user, token } = useAuth();
    const [data, setData] = useState<InvoiceReceipt[]>([]);
    const [renderData, setRenderData] = useState<boolean>(false);
    const pageSize = 10;

    const [filter, setFilter] = useState<TypeFilterInvoiceService>({
        period: PERIOD_SERVICE_FILTER.TODAY,
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date().toISOString().split("T")[0],
    });

    useEffect(() => {
        if (token) {
            const fetchData = async () => {
                try {
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/receipt/receiptServiceByHotelId?hotel_id=${user?.hotel_id}&currentPage=${currentPage}&pageSize=${pageSize}&startDate=${filter.startDate}&endDate=${filter.endDate}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'application/json',
                            },
                        }
                    );
                    const result = await response.json();
                    if (response.ok) {
                        setData(result.data.receipts); // Lưu dữ liệu vào state khi thành công
                        setTotalData(result.data.total);
                        setPageSize(pageSize);
                    } else {
                        throw new Error(result.message || 'Có lỗi xảy ra');
                    }
                } catch (error: any) {
                    console.log(error);
                }
            };

            fetchData();
        }
    }, [token, renderData, user?.hotel_id, currentPage]);

    useEffect(() => {
        handleFilterData(data);
    }, [data]);

    useEffect(() => {
        const today = new Date();
        let startDate = null;
        let endDate = null;

        switch (filter.period) {
            case PERIOD_SERVICE_FILTER.TODAY:
                startDate = today.toISOString().split("T")[0];
                endDate = startDate;
                break;

            case PERIOD_SERVICE_FILTER.THIS_WEEK:
                const firstDayOfWeek = new Date(today);
                firstDayOfWeek.setDate(today.getDate() - today.getDay() + 1); // Bắt đầu từ thứ Hai
                const lastDayOfWeek = new Date(firstDayOfWeek);
                lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6); // Chủ Nhật
                startDate = firstDayOfWeek.toISOString().split("T")[0];
                endDate = lastDayOfWeek.toISOString().split("T")[0];
                break;

            case PERIOD_SERVICE_FILTER.THIS_MONTH:
                const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                startDate = firstDayOfMonth.toISOString().split("T")[0];
                endDate = lastDayOfMonth.toISOString().split("T")[0];
                break;

            case PERIOD_SERVICE_FILTER.LAST_MONTH:
                const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
                startDate = firstDayOfLastMonth.toISOString().split("T")[0];
                endDate = lastDayOfLastMonth.toISOString().split("T")[0];
                break;

            case PERIOD_SERVICE_FILTER.THIS_QUARTER:
                const quarter = Math.floor(today.getMonth() / 3); // Lấy quý (0-3)
                const firstMonthOfQuarter = quarter * 3;
                const firstDayOfQuarter = new Date(today.getFullYear(), firstMonthOfQuarter, 1);
                const lastDayOfQuarter = new Date(today.getFullYear(), firstMonthOfQuarter + 3, 0);
                startDate = firstDayOfQuarter.toISOString().split("T")[0];
                endDate = lastDayOfQuarter.toISOString().split("T")[0];
                break;

            default:
                break;
        }
        setFilter(prev => ({
            ...prev,
            startDate,
            endDate,
        }))
    }, [filter.period])

    const handleFilter = () => {
        setRenderData(!renderData);
    }

    return (
        <div className="flex justify-between">
            <div className="flex items-center gap-8">
                <select
                    onChange={(e) => setFilter(prev => ({ ...prev, period: e.target.value }))}
                    className="btn !py-1 !px-2 !w-auto">
                    <option value={PERIOD_SERVICE_FILTER.TODAY}>{PERIOD_SERVICE_FILTER.TODAY}</option>
                    <option value={PERIOD_SERVICE_FILTER.THIS_WEEK}>{PERIOD_SERVICE_FILTER.THIS_WEEK}</option>
                    <option value={PERIOD_SERVICE_FILTER.THIS_MONTH}>{PERIOD_SERVICE_FILTER.THIS_MONTH}</option>
                    <option value={PERIOD_SERVICE_FILTER.LAST_MONTH}>{PERIOD_SERVICE_FILTER.LAST_MONTH}</option>
                    <option value={PERIOD_SERVICE_FILTER.THIS_QUARTER}>{PERIOD_SERVICE_FILTER.THIS_QUARTER}</option>
                </select>
                <div className="center">
                    <label>Từ</label>
                    <input
                        value={filter.startDate ? filter.startDate : ''}
                        onChange={(e) => setFilter(prev => ({ ...prev, startDate: e.target.value }))}
                        type="date"
                        id="start-date"
                        className="btn !py-1 !px-2 !w-auto ml-2"
                    />
                </div>
                <div className="center">
                    <label>Đến</label>
                    <input
                        value={filter.endDate ? filter.endDate : ''}
                        onChange={(e) => setFilter(prev => ({ ...prev, endDate: e.target.value }))}
                        type="date"
                        id="end-date"
                        className="btn !py-1 !px-2 !w-auto ml-2"
                    />
                </div>
                <button onClick={handleFilter} className="sbm group">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="group-hover:!fill-white !fill-[var(--room-empty-color-)] !w-[20px] !h-[20px]">
                        <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z">
                        </path>
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default InvoiceSearchFilters;
