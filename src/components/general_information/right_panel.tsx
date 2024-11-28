'use client'

import SheetChart from "@/components/general_information/sheet_chart";

import { FiMoreVertical } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";
import { FaChartColumn } from "react-icons/fa6";
import { useState } from "react";

interface IProps { }

const RightPanel: React.FC<IProps> = () => {
    const [isShowChart, setIsShowChart] = useState<boolean>(false);

    return (
        <div className="bg-white w-[45px] fixed top-[50px] right-0 h-full flex flex-col items-center px-1 py-3 gap-1">
            <button className="rounded-full flex items-center justify-center p-[7px] text-[var(--ht-neutral-300-)]">
                <FiMoreVertical size={20} />
            </button>
            <button
                onClick={() => setIsShowChart(true)}
                className="rounded-full flex items-center justify-center p-[7px] ">
                <FaChartColumn size={20} className="!fill-[var(--ht-neutral-300-)]" />
            </button>
            <button className="rounded-full flex items-center justify-center text-white bg-[var(--room-empty-color-)] p-[7px] mt-2">
                <BiSearch size={20} />
            </button>
            <SheetChart isShowChart={isShowChart} setIsShowChart={setIsShowChart} />
        </div>
    )
}
export default RightPanel;