import { TypeRoomCard } from "@/types/backend";
import GeneralInformationItem from "./general_information_item";

interface IProps {
    data: TypeRoomCard[],
}

const GeneralInformationTable: React.FC<IProps> = ({ data }) => {
    console.log(data);

    return (
        <div className="bg-white cash-fund_content border !border-[var(--ht-neutral-100-)] rounded-md p-3">
            <table className="w-full rounded-t-[3px]">
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
                    {data?.map(item => (
                        <GeneralInformationItem key={item.id} data={item} />
                    ))}
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