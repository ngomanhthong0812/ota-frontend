import { BiSolidPlaneLand } from "react-icons/bi";
import { BiSolidPlaneTakeOff } from "react-icons/bi";

interface IProps { }

const ToolbarTop: React.FC<IProps> = () => {
    return (
        <div className="toolbar-top rounded-t-md pb-2 flex items-center justify-between text-xs">
            <div className="flex">
                <div className="toolbar-top-room-detail flex rounded-3xl p-1 font-[500] bg-white">
                    <button className="toolbar-top-type_item gap-1">
                        <BiSolidPlaneLand size={18} className="!fill-[var(--color-menu-icon-)]" />
                        Sẽ đến
                    </button>
                    <button className="toolbar-top-type_item gap-1">
                        <BiSolidPlaneTakeOff size={18} className="!fill-[var(--color-menu-icon-)]" />
                        Sẽ đi
                    </button>
                    <button className="toolbar-top-type_item gap-1">
                        Quá hạn sẽ đến
                    </button>
                    <button className="toolbar-top-type_item gap-1 active">
                        Khách đang ở
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ToolbarTop;