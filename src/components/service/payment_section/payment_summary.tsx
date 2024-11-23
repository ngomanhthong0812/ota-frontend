'use client'
import { useSelectedService } from "@/context/selectedService.context";
import useFormatPriceWithCommas from "@/hook/useFormatPriceWithCommas";
import { use, useEffect, useState } from "react";
import ModalAddDiscount from "../modal/modal_add_discount";
import { RequestPaymentService, TypeDiscountForm } from "@/types/backend";
import useSWR from "swr";
import { useAuth } from "@/context/auth.context";
import { CURRENCY_TYPES, PAYMENT_METHODS, PAYMENT_OPTIONS } from "@/constants/constants";

interface IProps {
    handleSavePaymentInfo: (paymentInfo: RequestPaymentService) => void,
}

const fetcher = (url: string, token: string | null) =>
    fetch(url,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json());

const PaymentSummary: React.FC<IProps> = ({ handleSavePaymentInfo }) => {
    const { user, token } = useAuth();
    const { formatPrice } = useFormatPriceWithCommas();

    const { totalServicePrice, selectedService } = useSelectedService();
    const [paymentInfo, setPaymentInfo] = useState<RequestPaymentService>({
        paymentOption: PAYMENT_OPTIONS.PAYMENT_AT_THE_COUNTER,
        currencyType: CURRENCY_TYPES.VND,
        totalPrice: totalServicePrice,
        paymentMethod: PAYMENT_METHODS.CASH,
        customerName: 'Anonymous',
        note: '',
        hotel_id: user?.hotel_id || null,
        selectedService: selectedService,
        discountForm: {
            discount: 0,
            note: '',
        },
        created_by: user?.name || null,
    });

    const [showModaAddDiscount, setShowModaAddDiscount] = useState<boolean>(false);

    const { data: customer, error, isLoading } = useSWR(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/room/info-roomsWithCustomerToday/${user?.hotel_id}`,
        (url: string) => fetcher(url, token),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );

    useEffect(() => {
        handleSavePaymentInfo(paymentInfo);
    }, [paymentInfo])

    useEffect(() => {
        setPaymentInfo(prev => ({
            ...prev,
            hotel_id: user?.hotel_id,
            selectedService: selectedService,
            totalPrice: totalServicePrice,
            created_by: user?.name,
        }))
    }, [totalServicePrice, selectedService, user])

    useEffect(() => {
        const name = paymentInfo.paymentOption.split('-');
        if (name.length > 1) {
            setPaymentInfo(prev => ({ ...prev, customerName: name[1].trim() }));
        } else {
            setPaymentInfo(prev => ({ ...prev, customerName: 'Anonymous' }));
        }
    }, [paymentInfo.paymentOption])

    const handleSetDicountForm = (discountValue: TypeDiscountForm) => {
        setPaymentInfo(prev => (
            {
                ...prev, discountForm: {
                    discount: discountValue.discount, note: discountValue.note
                }
            }
        ));
    }

    const handleSetUnModalAddDiscount = () => {
        setShowModaAddDiscount(false);
    }

    return (
        <div className="py-2 bg-white border !border-[var(--ht-neutral-100-)] rounded-md p-3 h-full">
            <div className="flex gap-2 mb-2">
                <div className="flex flex-col flex-1">
                    <span className="text-xs mb-1">Hình thức TT</span>
                    <select className="btn" onChange={(e) => setPaymentInfo(prev => ({ ...prev, paymentMethod: e.target.value }))}>
                        <option value="Tiền mặt">{PAYMENT_METHODS.CASH}</option>
                        <option value="Thẻ tín dụng">{PAYMENT_METHODS.CREDIT_CARD}</option>
                        <option value="Chuyển khoản NH">{PAYMENT_METHODS.BANK_TRANSFER}</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs mb-1">Tiền tệ</span>
                    <select
                        onChange={(e) => setPaymentInfo(prev => ({ ...prev, currencyType: e.target.value }))}
                        className="btn !w-auto"
                    >
                        <option value={CURRENCY_TYPES.VND}>{CURRENCY_TYPES.VND}</option>
                        <option value={CURRENCY_TYPES.USD}>{CURRENCY_TYPES.USD}</option>
                    </select>
                </div>
                <div className="flex flex-col flex-1">
                    <span className="text-xs mb-1">Số tiền phải trả</span>
                    <div className="btn">{formatPrice(String(paymentInfo.totalPrice))}</div>
                </div>
            </div>

            <div className="flex-1">
                <input type="text"
                    className="p-2 w-full border-b outline-none focus:!border-[var(--room-empty-color-)]"
                    placeholder="Nhập mô tả ngắn"
                    value={paymentInfo.note}
                    onChange={(e) => setPaymentInfo(prev => ({ ...prev, note: e.target.value }))}
                />
            </div>

            <div>
                <h1
                    className="text-[var(--room-empty-color-)] font-[500] py-2 mt-4 border-b border-[var(--ht-neutral-100-)] mb-2">
                    Thành tiền</h1>

                <div className="flex gap-2 mb-2">
                    <div className="flex flex-col flex-1">
                        <span className="text-xs mb-1">Tên khách hàng(*)</span>
                        <input type=" text"
                            value={paymentInfo.customerName}
                            onChange={(e) => setPaymentInfo(prev => ({ ...prev, customerName: e.target.value }))}
                            className="btn"
                            placeholder="Tên khách hàng" />
                    </div>
                    <div className="flex flex-col flex-1">
                        <span className="text-xs mb-1">Lựa chọn TT</span>
                        <select
                            name="" id=""
                            className="btn"
                            onChange={(e) => setPaymentInfo(prev => ({ ...prev, paymentOption: e.target.value }))}
                        >
                            <option>{PAYMENT_OPTIONS.PAYMENT_AT_THE_COUNTER}</option>
                            {customer?.data.map((item: any) => (
                                <option
                                    key={item.id}>
                                    {item?.name} - {item?.bookings[0]?.customer?.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex-1">
                    <p className="flex justify-between mb-2 font-[500]">Tổng tiền: <span
                        className="font-[400]">{formatPrice(String(paymentInfo.totalPrice))}</span></p>
                    <p className="flex justify-between mb-2 font-[500]">
                        <span className="flex items-center gap-1">
                            Giảm giá ({paymentInfo.discountForm.discount}%):
                            <button onClick={() => setShowModaAddDiscount(paymentInfo.totalPrice > 0)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={11} height={11}
                                    className="mt-[2px]">
                                    <path
                                        d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z" />
                                </svg>
                            </button>
                        </span><span className="font-[400]">{formatPrice(String((paymentInfo.totalPrice * (paymentInfo.discountForm.discount / 100))))}</span>
                    </p>
                    <p className="flex justify-between mb-2 font-[500]">Đã thanh toán: <span
                        className="font-[400]">0</span>
                    </p>
                    <p className="flex justify-between mb-2 font-[500]">Còn lại: <span
                        className="font-[500] text-red-500">{formatPrice(String(paymentInfo.totalPrice - (paymentInfo.totalPrice * (paymentInfo.discountForm.discount / 100))))}</span></p>
                </div>
            </div>
            <ModalAddDiscount
                showModaAddDiscount={showModaAddDiscount}
                handleSetUnModalAddDiscount={handleSetUnModalAddDiscount}
                handleSetDicountForm={handleSetDicountForm}
            />
        </div >
    )
}
export default PaymentSummary;