import { STATUS_USER } from "@/constants/constants";
import { UserAdmin } from "@/types/backend";

interface IProps {
    data: UserAdmin;
    index: number,
    itemActive: number | null;
    setItemActive: (id: number | null) => void;
    checkedItems: number[];
    setCheckedItems: (e: React.MouseEvent, id: number) => void;
}
const UserInfo: React.FC<IProps> = ({ data, index, itemActive, setItemActive, checkedItems, setCheckedItems }) => {

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
            <td className="p-2">{data?.user_name}</td>
            <td className="p-2">{data?.phone}</td>
            <td className="p-2">{data?.note}</td>
            <td className="p-2">{data?.status === 'active' ? STATUS_USER.ACTIVE : STATUS_USER.INACTIVE}</td>
        </tr>
    )
}
export default UserInfo