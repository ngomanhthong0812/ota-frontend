'use client'
import { PAYMENT_METHODS } from "@/constants/constants";
import { useAuth } from "@/context/auth.context";
import useFormatDate from "@/hook/useFormatDate";
import useFormatPriceWithCommas from "@/hook/useFormatPriceWithCommas";
import { ResponseInvoice } from "@/types/backend";
import { useParams } from "next/navigation"
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
const ServiceInvoice: React.FC<IProps> = () => {
    const { id } = useParams();
    const { token } = useAuth();

    const { formatPrice } = useFormatPriceWithCommas();
    const { formatDate } = useFormatDate();

    const { data, error, isLoading } = useSWR(
        token ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/invoices/innvoiceByReceiptAndItemById/${id}` : null,
        (url: string) => fetcher(url, token),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const invoice: ResponseInvoice = data?.data;

    return (
        <>
            <div className="flex flex-col lg:flex-row gap-2 w-full">
                <div className="flex-1">
                    <div className="toolbar-top pb-2 flex items-center gap-1 text-xs">
                        <h1 className="text-base font-[500] flex items-center gap-1">
                            Thông tin hoá đơn
                        </h1>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                            className="icon cursor-pointer">
                            <path
                                d="M128 0C92.7 0 64 28.7 64 64l0 96 64 0 0-96 226.7 0L384 93.3l0 66.7 64 0 0-66.7c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0L128 0zM384 352l0 32 0 64-256 0 0-64 0-16 0-16 256 0zm64 32l32 0c17.7 0 32-14.3 32-32l0-96c0-35.3-28.7-64-64-64L64 192c-35.3 0-64 28.7-64 64l0 96c0 17.7 14.3 32 32 32l32 0 0 64c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-64zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z">
                            </path>
                        </svg>
                    </div>
                    <div className="bg-white border !border-[var(--ht-neutral-100-)] rounded-md  p-3">
                        <p className="flex items-center justify-between mb-4"><span>Số hoá đơn</span><span
                            className="text-blue-500">{invoice?.code}</span>
                        </p>
                        <p className="flex items-center justify-between mb-4"><span>Trạng thái</span><span
                            className="font-[500] text-red-500">{invoice?.status === "Paid" ? "Đã trả" : "Chưa thanh toán"}</span></p>
                        <p className="flex items-center justify-between mb-4"><span>Người
                            tạo</span><span>{invoice?.created_by}</span>
                        </p>
                        <p className="flex items-center justify-between mb-4"><span>Ngày tạo</span><span>{formatDate(invoice?.createdAt)}</span>
                        </p>
                        <p className="flex items-center justify-between mb-4"><span>Giảm tiền</span><span>VND {formatPrice(String(invoice?.discount_amount))}</span>
                        </p>
                        <p className="flex items-center justify-between mb-4"><span>Giảm giá %</span><span>{invoice?.discount_percentage} (%)</span>
                        </p>

                    </div>
                </div>

                <div className="flex-1">
                    <div className="toolbar-top pb-2 flex items-center justify-between text-xs">
                        <div className="flex items-center justify-between px-3 w-full rounded-md">
                            <div className="flex-1">
                                <h1 className="text-base font-[500]">
                                    Thông tin liên hệ
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-white border !border-[var(--ht-neutral-100-)] rounded-md  p-3">
                        <p className="flex items-center justify-between mb-4"><span>Tên đầy
                            đủ</span><span>{invoice?.customer_name}</span></p>
                        <p className="flex items-center justify-between mb-4"><span>Sinh nhật</span><span>N/A</span></p>
                        <p className="flex items-center justify-between mb-4"><span>CCCD</span><span>N/A</span></p>
                        <p className="flex items-center justify-between mb-4"><span>Di động</span><span>N/A</span></p>
                        <p className="flex items-center justify-between mb-4"><span>Email</span><span>N/A</span></p>
                        <p className="flex items-center justify-between mb-4"><span>Ghi chú</span><span>N/A</span></p>
                    </div>
                </div>
            </div>
            <div>
                <div className="toolbar-top py-2 flex items-center justify-between text-xs">
                    <div className="flex items-center justify-between px-3 w-full rounded-md">
                        <div className="flex-1">
                            <h1 className="text-base font-[500]">
                                Thanh toán
                            </h1>
                        </div>
                    </div>
                </div>

                <div>
                    <div
                        className="flex-1 bg-white border !border-[var(--ht-neutral-100-)] rounded-md  p-3 flex flex-col items-end">

                        <div
                            className="w-[100%] lg:w-[630px] flex flex-col gap-3 pb-3 border-b border-[var(--ht-neutral-100-)]">

                            {invoice?.items?.map(item => (
                                <div key={item.id} className="flex items-center justify-between">
                                    <span>
                                        <p>{item.service_name ? item.service_name : item.item_name} (x{item.quantity})</p>
                                        <p className="text-xs">Ngày tạo: {formatDate(invoice?.createdAt)}, Người tạo: {invoice?.created_by}</p>
                                    </span>
                                    <span>{formatPrice(String(item.total_price))}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-3 font-[500] mt-3">
                            <span>
                                Tổng tiền:
                            </span>
                            <span>VND {formatPrice(String(invoice?.amount))} (
                                {invoice?.payment_method === "Cash"
                                    ? PAYMENT_METHODS.CASH
                                    : invoice?.payment_method === "Bank_transfer"
                                        ? PAYMENT_METHODS.BANK_TRANSFER
                                        : invoice?.payment_method === "Credit_card"
                                            ? PAYMENT_METHODS.CREDIT_CARD
                                            : "Phương thức không xác định"})</span>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default ServiceInvoice