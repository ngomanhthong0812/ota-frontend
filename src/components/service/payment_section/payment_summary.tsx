'use client'
import { UseSelectedService } from "@/context/selectedService.context";
import useFormatPriceWithCommas from "@/hook/useFormatPriceWithCommas";
import { useState } from "react";
import ModalAddDiscount from "../modal/modal_add_discount";

interface IProps { }

const PaymentSummary: React.FC<IProps> = () => {
    const { totalServicePrice } = UseSelectedService();
    const { formatPrice } = useFormatPriceWithCommas();

    const [customerName, setCustomerName] = useState("Anonymous");
    const [showModaAddDiscount, setShowModaAddDiscount] = useState<boolean>(false);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomerName(e.target.value);
    };
    const handleSetUnModalAddDiscount = () => {
        setShowModaAddDiscount(false);
    }

    return (
        <div className="py-2 bg-white border !border-[var(--ht-neutral-100-)] rounded-md p-3 h-full">
            <div className="flex gap-2 mb-2">
                <div className="flex flex-col flex-1">
                    <span className="text-xs mb-1">Hình thức TT</span>
                    <select className="btn">
                        <option value="Tiền mặt">Tiền mặt</option>
                        <option value="Thẻ tín dụng">Thẻ tín dụng</option>
                        <option value="Chuyển khoản NH">Chuyển khoản NH</option>
                        <option value="Công nợ">Công nợ</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs mb-1">Tiền tệ</span>
                    <select className="btn !w-auto">
                        <option value="VND">VND</option>
                        {/* <option value="USD">USD</option> */}
                    </select>
                </div>
                <div className="flex flex-col flex-1">
                    <span className="text-xs mb-1">Số tiền phải trả</span>
                    <div className="btn">{formatPrice(String(totalServicePrice))}</div>
                </div>
            </div>

            <div className="flex-1">
                <input type="text"
                    className="p-2 w-full border-b outline-none focus:!border-[var(--room-empty-color-)]"
                    placeholder="Nhập mô tả ngắn" />
            </div>

            <div>
                <h1
                    className="text-[var(--room-empty-color-)] font-[500] py-2 mt-4 border-b border-[var(--ht-neutral-100-)] mb-2">
                    Thành tiền</h1>

                <div className="flex gap-2 mb-2">
                    <div className="flex flex-col flex-1">
                        <span className="text-xs mb-1">Tên khách hàng(*)</span>
                        <input type=" text"
                            value={customerName}
                            onChange={handleChange}
                            className="btn"
                            placeholder="Tên khách hàng" />
                    </div>
                    <div className="flex flex-col flex-1">
                        <span className="text-xs mb-1">Lựa chọn TT</span>
                        <select name="" id="" className="btn">
                            <option>Thanh toán tại quầy</option>
                            <option>201 - Nguyễn Văn A</option>
                            <option>101 - Guest</option>
                            <option>201 - Guest</option>
                            <option>201 - Guest</option>
                            <option>201 - Guest</option>
                            <option>201 - Guest</option>
                        </select>
                    </div>
                </div>

                <div className="flex-1">
                    <p className="flex justify-between mb-2 font-[500]">Tổng tiền: <span
                        className="font-[400]">{formatPrice(String(totalServicePrice))}</span></p>
                    <p className="flex justify-between mb-2 font-[500]">
                        <span className="flex items-center gap-1">
                            Giảm giá (0%):
                            <button onClick={() => setShowModaAddDiscount(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={11} height={11}
                                    className="mt-[2px]">
                                    <path
                                        d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z" />
                                </svg>
                            </button>
                        </span><span className="font-[400]">0</span>
                    </p>
                    <p className="flex justify-between mb-2 font-[500]">Đã thanh toán: <span
                        className="font-[400]">0</span>
                    </p>
                    <p className="flex justify-between mb-2 font-[500]">Còn lại: <span
                        className="font-[500] text-red-500">{formatPrice(String(totalServicePrice))}</span></p>
                </div>
            </div>
            <ModalAddDiscount showModaAddDiscount={showModaAddDiscount} handleSetUnModalAddDiscount={handleSetUnModalAddDiscount} />
        </div>
    )
}
export default PaymentSummary;