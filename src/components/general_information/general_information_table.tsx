
import { BiSolidUserBadge } from "react-icons/bi";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaBed } from "react-icons/fa";
import { GiBackwardTime } from "react-icons/gi";

interface IProps { }

const GeneralInformationTable: React.FC<IProps> = () => {
    return (
        <div className="bg-white cash-fund_content border !border-[var(--ht-neutral-100-)] rounded-md p-3">
            <table className="w-full rounded-t-[3px] overflow-hidden">
                <thead
                    className="relative border !border-[var(--ht-neutral-100-)] font-[500] text-[var(--color-menu-icon-)]">
                    <tr className="bg-[var(--ht-neutral-100-)]">
                        <td className="w-[20%] p-2 ">
                            <div className="flex items-center justify-center">
                                <p className="whitespace-nowrap">Phòng</p>
                            </div>
                        </td>
                        <td className="w-[12%] p-2">
                            <div className="flex items-center justify-center">
                                <p className="whitespace-nowrap">Mã ĐP</p>
                            </div>
                        </td>
                        <td className="w-[20%] p-2">
                            <div className="flex items-center justify-center">
                                <p className="whitespace-nowrap">Tên</p>
                            </div>
                        </td>
                        <td className="w-[11%] p-2">
                            <div className="flex items-center">
                                <p className="whitespace-nowrap">Ngày đến</p>
                            </div>
                        </td>
                        <td className="w-[11%] p-2">
                            <div className="flex items-center">
                                <p className="whitespace-nowrap">Thời gian ở</p>
                            </div>
                        </td>
                        <td className="w-[11%] p-2">
                            <div className="flex items-center">
                                <p className="whitespace-nowrap">NL/TE</p>
                            </div>
                        </td>
                        <td className="w-[5%]"></td>
                    </tr>
                </thead>
                <tbody className="text-[14px]">
                    <tr className="group border-b !border-[var(--ht-neutral-100-)]">
                        <td className="p-2">
                            <div className="flex justify-between items-center">
                                <FaBed className="!w-[18px] !h-[18px]" />
                                101 (Phòng đôi)
                            </div>
                        </td>
                        <td className="p-2 flex justify-center">1</td>
                        <td className="p-2">
                            <div className="flex items-center gap-2">
                                <BiSolidUserBadge className="!w-[18px] !h-[18px]" />
                                Ngomanhthong 1
                            </div>
                        </td>
                        <td className="p-2">03/04 20:08</td>
                        <td className="p-2">01:19:32</td>
                        <td className="p-2">3/2</td>
                        <td className="p-2">
                            <div className="flex justify-end !text-[50px]">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                    className="mr-[10px] mt-[2px]">
                                    <path
                                        d="M128 0C92.7 0 64 28.7 64 64l0 96 64 0 0-96 226.7 0L384 93.3l0 66.7 64 0 0-66.7c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0L128 0zM384 352l0 32 0 64-256 0 0-64 0-16 0-16 256 0zm64 32l32 0c17.7 0 32-14.3 32-32l0-96c0-35.3-28.7-64-64-64L64 192c-35.3 0-64 28.7-64 64l0 96c0 17.7 14.3 32 32 32l32 0 0 64c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-64zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z">
                                    </path>
                                </svg>
                                <FiMoreHorizontal className="mr-[10px] mt-[2px]" />
                            </div>
                        </td>
                    </tr>
                    <tr className="group border-b !border-[var(--ht-neutral-100-)]">
                        <td className="p-2">
                            <div className="flex justify-between items-center">
                                <GiBackwardTime className="!w-[18px] !h-[18px]" />
                                102 (Phòng đơn)
                            </div>
                        </td>
                        <td className="p-2 flex justify-center">1</td>
                        <td className="p-2">
                            <div className="flex items-center gap-2">
                                <BiSolidUserBadge className="!w-[18px] !h-[18px]" />
                                Ngomanhthong 1
                            </div>
                        </td>
                        <td className="p-2">03/04 20:08</td>
                        <td className="p-2">01:19:32</td>
                        <td className="p-2">3/2</td>
                        <td className="p-2">
                            <div className="flex justify-end !text-[50px]">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                    className="mr-[10px] mt-[2px]">
                                    <path
                                        d="M128 0C92.7 0 64 28.7 64 64l0 96 64 0 0-96 226.7 0L384 93.3l0 66.7 64 0 0-66.7c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0L128 0zM384 352l0 32 0 64-256 0 0-64 0-16 0-16 256 0zm64 32l32 0c17.7 0 32-14.3 32-32l0-96c0-35.3-28.7-64-64-64L64 192c-35.3 0-64 28.7-64 64l0 96c0 17.7 14.3 32 32 32l32 0 0 64c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-64zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z">
                                    </path>
                                </svg>
                                <FiMoreHorizontal className="mr-[10px] mt-[2px]" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="pagination center !justify-end p-4 gap-3">
                <span>1-10 trên 15</span>
                <div
                    className="group center border p-[7px] rounded-[3px] cursor-pointer duration-75 hover:bg-[var(--room-empty-color-)]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
                        className="group-hover:!fill-white fill-[var(--ht-neutral-200-)]">
                        <path
                            d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                    </svg>
                </div>
                <div
                    className="group center border p-[7px] rounded-[3px] cursor-pointer duration-75 hover:bg-[var(--room-empty-color-)]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
                        className="group-hover:!fill-white">
                        <path
                            d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default GeneralInformationTable;