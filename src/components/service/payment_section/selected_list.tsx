'use client'

import { useSelectedService } from "@/context/selectedService.context";
import { SelectedServiceType } from "@/types/backend";
import SelectedItems from "./selected_items";
import { useEffect } from "react";

interface IProps { }

const SelectedList: React.FC<IProps> = () => {
    const { selectedService, handleClearAllSelectedService } = useSelectedService();
    useEffect(() => {
        handleClearAllSelectedService();
    }, [])

    return (
        <div
            className="bg-white border  !border-[var(--ht-neutral-100-)] rounded-md p-3 !pt-0">
            {selectedService.length > 0
                ? <table className="w-full">
                    <tbody>
                        {selectedService.map((item: SelectedServiceType) => (
                            <SelectedItems data={item} key={item?.id} />
                        ))}
                    </tbody>

                </table>
                : <div className="text-xs mt-3">Hãy chọn dịch vụ!</div>
            }
        </div>
    )
}
export default SelectedList;