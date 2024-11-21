import { UseSelectedService } from "@/context/selectedService.context";
import { SelectedServiceType } from "@/types/backend";
import { useState } from "react";

interface IProps { }

const ExtendedServiceTab: React.FC<IProps> = () => {
    const { handleAddSelectedService } = UseSelectedService();
    const [service, setService] = useState<SelectedServiceType>({
        id: Math.random() * 1000,
        name: '',
        unit_price: 0,
        quantity: 1,
    });
    const [errorForm, setErrorForm] = useState<string>('');

    const handleSave = () => {
        if (service.name && service.unit_price !== 0 && service.quantity !== 0) {
            handleAddSelectedService(service);
            setErrorForm('')
            setService({
                id: Math.random() * 1000,
                name: '',
                unit_price: 0,
                quantity: 1,
            });
        } else {
            setErrorForm('Vui lòng nhập các trường bắt buộc hoặc số lượng phải lớn hơn 0')
        }
    }

    return (
        <>
            <div className="flex-1 mb-4">
                <input type="text"
                    className="p-2 w-full border-b outline-none focus:!border-[var(--room-empty-color-)]"
                    placeholder="Tên dịch vụ (Bắt buộc)*"
                    value={service.name}
                    onChange={(e) => setService(prev => ({ ...prev, name: e.target.value }))}
                />
            </div>
            <div className="flex gap-2 mb-4">
                <div className="flex-1">
                    <input type="number"
                        className="p-2 w-full border-b outline-none focus:!border-[var(--room-empty-color-)]"
                        min="1"
                        value={service.quantity}
                        onChange={(e) => setService(prev => ({ ...prev, quantity: Number(e.target.value) }))}
                        placeholder="Số lượng" />
                </div>
                <div className="flex-1">
                    <input type="text"
                        className="p-2 w-full border-b outline-none focus:!border-[var(--room-empty-color-)]"
                        placeholder="Giá VND (Bắt buộc)*"
                        value={service.unit_price !== 0 ? service.unit_price : ''}
                        onChange={(e) => setService(prev => ({ ...prev, unit_price: Number(e.target.value) }))}
                    />
                </div>
            </div>
            <span className="text-[#d32f2f] text-[0.75rem]">{errorForm}</span>
            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    className="sbm group whitespace-nowrap">
                    Thêm
                </button>
            </div>
        </>
    )
}
export default ExtendedServiceTab;