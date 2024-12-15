import { STATUS_SERVICE } from "@/constants/constants";
import useFormatPriceWithCommas from "@/hook/useFormatPriceWithCommas";
import { Services } from "@/types/backend";

interface IProps {
    data: Services;
    index: number,
    itemActive: number | null;
    setItemActive: (id: number | null) => void;
    checkedItems: number[];
    setCheckedItems: (e: React.MouseEvent, id: number) => void;
}
const UserInfo: React.FC<IProps> = ({ data, index, itemActive, setItemActive, checkedItems, setCheckedItems }) => {
    const { formatPrice } = useFormatPriceWithCommas();
    return (
        <tr
            onClick={() => setItemActive(data?.id === itemActive ? null : data.id)}
            className={`cursor-pointer ${index % 2 === 0 && 'bg-[#f9f9f9]'} hover:bg-[#ebf5ea] duration-200 ${itemActive === data.id && 'border border-b-0 border-[#0090da] !bg-[#E6F4FB]'}`}>
            <td
                onClick={(e) => setCheckedItems(e, data.id)}
                className="p-2 flex gap-3">
                <input
                    type="checkbox"
                    onChange={() => { }}
                    checked={checkedItems.includes(data.id)}
                />
            </td>
            <td className="p-2">{data?.id}</td>
            <td className="p-2">{data?.name}</td>
            <td className="p-2">{formatPrice(String(data?.unit_price))}</td>
            <td className="p-2">{data?.description}</td>
            <td className="p-2">{data?.status === 'in_business' ? STATUS_SERVICE.IN_BUSINESS : STATUS_SERVICE.OUT_OF_BUSINESS}</td>
        </tr>
    )
}
export default UserInfo