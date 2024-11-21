import { UseSelectedService } from "@/context/selectedService.context";
import useFormatPriceWithCommas from "@/hook/useFormatPriceWithCommas";
import { Services } from "@/types/backend";

interface IProps {
    data: Services;
}

const ServiceItem: React.FC<IProps> = ({ data }) => {
    const { handleAddSelectedService } = UseSelectedService();
    const { formatPrice } = useFormatPriceWithCommas();
    const selected = () => {
        handleAddSelectedService({
            id: data.id,
            name: data.name,
            unit_price: data.unit_price,
            quantity: 1,
        })
    }
    return (
        <div
            onClick={selected}
            className="card-service w-[100%] flex gap-2 rounded-md p-2 shadow-sm hover:shadow-md duration-300 cursor-pointer relative group">
            <div className="bg-[var(--ht-body-bg-)] rounded-md p-3">
                <img src="/restaurant.png" alt="" className="w-full" />
            </div>
            <div className="flex flex-col gap-1 items-start justify-center">
                <div className="name font-[500] line-clamp-1">{data.name}</div>
                <div className="price text-[var(--room-empty-color-)]">
                    {formatPrice(String(data.unit_price))}
                    <span className="text-xs"> VND</span>
                </div>
            </div>

            {/* Tooltip */}
            <div className="absolute z-20 top-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded shadow-md">
                {data.name}
            </div>
        </div>
    );
};
export default ServiceItem;
