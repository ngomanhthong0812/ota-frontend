'use client'

import { UseSelectedService } from "@/context/selectedService.context";
import useFormatPriceWithCommas from "@/hook/useFormatPriceWithCommas";
import { SelectedServiceType } from "@/types/backend";
import { useEffect, useState } from "react";

interface IProps {
    data: SelectedServiceType,
}

const SelectedItems: React.FC<IProps> = ({ data }) => {
    const { handleDecreaseQuantityService, handleIncreaseQuantityService, handleClearSelectedService } = UseSelectedService();
    const { formatPrice } = useFormatPriceWithCommas();
    const { formatPrice: formatPriceTotal } = useFormatPriceWithCommas();
    const [quanity, setQuantity] = useState<number>(data.quantity);

    useEffect(() => {
        setQuantity(data.quantity);
    }, [data])

    return (
        <tr className="border-b border-[var(--ht-neutral-100-)]">
            <td className="py-3 line-clamp-1">{data.name}</td>
            <td className="py-3">{formatPrice(String(data.unit_price))}</td>
            <td className="py-3">
                <div className="flex justify-end gap-2">
                    <div className="flex items-center justify-center gap-2">
                        <button
                            onClick={() => handleDecreaseQuantityService(1, data.id)}
                            className="bg-[var(--ht-neutral-100-)] p-1 rounded-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="!w-[11px] !h-[11px]">
                                <path
                                    d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                            </svg>
                        </button>

                        <span className="w-5 text-center outline-none">{quanity}</span>

                        <button
                            onClick={() => handleIncreaseQuantityService(1, data.id)}
                            className="bg-[var(--ht-neutral-100-)] p-1 rounded-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="!w-[11px] !h-[11px]">
                                <path
                                    d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                            </svg>
                        </button>
                    </div>
                    <span className="w-16 text-center">
                        {formatPriceTotal(String(data.unit_price * data.quantity))}
                    </span>
                    <button
                        onClick={() => handleClearSelectedService(data.id)}
                        className="pl-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={16} height={16}>
                            <path
                                d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                        </svg>
                    </button>
                </div>
            </td>
        </tr >
    )
}
export default SelectedItems;