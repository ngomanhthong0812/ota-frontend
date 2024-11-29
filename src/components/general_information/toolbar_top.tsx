import { TAB_GENERA_INFOMATION } from "@/constants/constants";
import { BiSolidPlaneLand } from "react-icons/bi";
import { BiSolidPlaneTakeOff } from "react-icons/bi";

interface IProps {
    tabActive: string,
    setTabActive: (name: string) => void,
}

const ToolbarTop: React.FC<IProps> = ({ tabActive, setTabActive }) => {
    return (
        <div className="toolbar-top rounded-t-md pb-2 flex items-center justify-between text-xs">
            <div className="flex">
                <div className="toolbar-top-room-detail flex rounded-3xl p-1 font-[500] bg-white">
                    <button
                        onClick={() => setTabActive(TAB_GENERA_INFOMATION.WILL_ARRIVE)}
                        className={`toolbar-top-type_item gap-1 ${TAB_GENERA_INFOMATION.WILL_ARRIVE === tabActive && 'active'}`}>
                        <BiSolidPlaneLand size={18} className="!fill-[var(--color-menu-icon-)]" />
                        {TAB_GENERA_INFOMATION.WILL_ARRIVE}
                    </button>
                    <button
                        onClick={() => setTabActive(TAB_GENERA_INFOMATION.WILL_DEPART)}
                        className={`toolbar-top-type_item gap-1 ${TAB_GENERA_INFOMATION.WILL_DEPART === tabActive && 'active'}`}>
                        <BiSolidPlaneTakeOff size={18} className="!fill-[var(--color-menu-icon-)]" />
                        {TAB_GENERA_INFOMATION.WILL_DEPART}
                    </button>
                    <button
                        onClick={() => setTabActive(TAB_GENERA_INFOMATION.OVERDUE_ARRIVE)}
                        className={`toolbar-top-type_item gap-1 ${TAB_GENERA_INFOMATION.OVERDUE_ARRIVE === tabActive && 'active'}`}>
                        {TAB_GENERA_INFOMATION.OVERDUE_ARRIVE}
                    </button>
                    <button
                        onClick={() => setTabActive(TAB_GENERA_INFOMATION.CURRENT_GUEST)}
                        className={`toolbar-top-type_item gap-1 ${TAB_GENERA_INFOMATION.CURRENT_GUEST === tabActive && 'active'}`}>
                        {TAB_GENERA_INFOMATION.CURRENT_GUEST}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ToolbarTop;