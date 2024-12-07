import { Employee } from "@/types/backend";
import Image from "next/image";

interface IProps {
    data: Employee;
    index: number,
    itemActive: number | null;
    setItemActive: (id: number | null) => void;
    checkedItems: number[];
    setCheckedItems: (e: React.MouseEvent, id: number) => void;
}
const EmployeeInfo: React.FC<IProps> = ({ data, index, itemActive, setItemActive, checkedItems, setCheckedItems }) => {

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
                <Image src={`${data.img ? data?.img : 'https://f09a3e0wmmobj.vcdn.cloud/default-product.png'}`} alt="" className="w-[35px] h-[25px]" />
            </td>
            <td className="p-2">{data?.code}</td>
            <td className="p-2">{data?.name}</td>
            <td className="p-2">{data?.phoneNumber}</td>
            <td className="p-2">{data?.idCard}</td>
            <td className="p-2">{data?.notes}</td>
        </tr>
    )
}
export default EmployeeInfo