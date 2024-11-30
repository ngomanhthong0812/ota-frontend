'use client'
import { BiSolidUserBadge } from "react-icons/bi";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaBed } from "react-icons/fa";
import { GiBackwardTime } from "react-icons/gi";
import { TypeRoomCard } from "@/types/backend";
import useFormatDate from "@/hook/useFormatDate";
import { ROOM_STATUS } from "@/constants/constants";
import InusedRoomPopup from "../room/inused_room_popup";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/auth.context";

interface IProps {
    data: TypeRoomCard,
}

const GeneralInformationItem: React.FC<IProps> = ({ data }) => {
    const { formatDate } = useFormatDate();
    const { token } = useAuth();
    const popupRef = useRef<HTMLDivElement>(null);
    const [showPopup, setShowPopup] = useState(false);
    const [popupPosition, setPopupPosition] = useState<{ x: number, y: number }>({ x: -200, y: 20 });
    const [cleanStatus, setCleanStatus] = useState<boolean>(data.clean_status);

    const handleClickOutside = (event: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
            setShowPopup(false);
        }
    };

    useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Tính thời gian ở từ booking_at
    const getStayDuration = () => {
        if (data?.bookings?.[0]?.check_in_at) {
            const bookingDate = new Date(data.bookings[0].check_in_at);
            const now = new Date();
            const duration = now.getTime() - bookingDate.getTime();
            const hours = Math.floor(duration / (1000 * 60 * 60));
            const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((duration % (1000 * 60)) / 1000);
            return `${hours} : ${minutes} : ${seconds}`;
        }
        return "Chưa xác định";
    };

    const handleSetStatusClean = async () => {
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/room/${data.id}`,
                JSON.stringify({
                    clean_status: !cleanStatus,
                }),
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Thay token vào đây
                        "Content-Type": "application/json",
                    },
                }
            );

            // Kiểm tra phản hồi từ API
            if (response.data.statusCode === 200 || response.status === 201) {
                console.log("Gửi thành công");
                setCleanStatus(!cleanStatus);
            }
        } catch (error) {
            // In thông tin lỗi khi gặp sự cố
            console.error("Lỗi khi gửi dữ liệu:", error);
        }
    }
    return (
        <tr
            className="group border-b !border-[var(--ht-neutral-100-)]">
            <td className="p-2">
                <div className="flex justify-between items-center">
                    {data?.status === ROOM_STATUS.NOT_CHECKED_OUT
                        ? <GiBackwardTime className="!w-[18px] !h-[18px]" />
                        : <FaBed className="!w-[18px] !h-[18px]" />
                    }
                    {data?.name} ({data?.room_type})
                </div>
            </td>
            <td className="p-2 flex justify-center">{data?.id}</td>
            <td className="p-2">
                <div className="flex items-center gap-2">
                    <BiSolidUserBadge className="!w-[18px] !h-[18px]" />
                    {data?.bookings[0]?.customer.name}
                </div>
            </td>
            <td className="p-2">{formatDate(data?.bookings[0]?.booking_at)}</td>
            <td className="p-2">{getStayDuration()}</td>
            <td className="p-2">{data?.bookings[0]?.adults}/{data?.bookings[0]?.children}</td>
            <td className="p-2">
                <div className="flex justify-end !text-[50px]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                        className="mr-[10px] mt-[2px]">
                        <path
                            d="M128 0C92.7 0 64 28.7 64 64l0 96 64 0 0-96 226.7 0L384 93.3l0 66.7 64 0 0-66.7c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0L128 0zM384 352l0 32 0 64-256 0 0-64 0-16 0-16 256 0zm64 32l32 0c17.7 0 32-14.3 32-32l0-96c0-35.3-28.7-64-64-64L64 192c-35.3 0-64 28.7-64 64l0 96c0 17.7 14.3 32 32 32l32 0 0 64c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-64zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z">
                        </path>
                    </svg>
                    <div className="relative">
                        <FiMoreHorizontal
                            onClick={() => setShowPopup(true)}
                            className="mr-[10px] mt-[2px]" />
                        <InusedRoomPopup
                            ref={popupRef}
                            showPopup={showPopup}
                            position={popupPosition}
                            data={data}
                            handleSetStatusClean={handleSetStatusClean}
                            cleanStatus={cleanStatus} />
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default GeneralInformationItem;