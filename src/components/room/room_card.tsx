'use client'

import { useEffect, useRef, useState } from "react";
import UnusedRoomPopup from "./unused_room_popup";
import InusedRoomPopup from "./inused_room_popup";
import { TypeRoomCard } from "@/types/backend";
import { HOTEL_ROOMSTATUS_NAV } from "@/constants/hotel_room-status";
import axios from "axios";
import { useAuth } from "@/context/auth.context";

interface IProps {
    data: TypeRoomCard,
    refreshData: () => void
}

const RoomCard: React.FC<IProps> = ({ data, refreshData }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [showPopupStatusClean, setShowPopupStatusClean] = useState(false);
    const [popupPosition, setPopupPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
    const popupRef = useRef<HTMLDivElement>(null);
    const roomCardRef = useRef<HTMLDivElement>(null);
    const popupStatusCleanRef = useRef<HTMLDivElement>(null);
    const [status, setStatus] = useState(HOTEL_ROOMSTATUS_NAV.find(item => item.name === data.status));
    const [cleanStatus, setCleanStatus] = useState<boolean>(data.clean_status);
    const { token } = useAuth();

    const handleClickOutside = (e: MouseEvent) => {
        // Kiểm tra nếu click không phải trong phần tử đã tham chiếu
        if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
            setShowPopup(false);
        }

        if (popupStatusCleanRef.current && !popupStatusCleanRef.current.contains(e.target as Node)) {
            setShowPopupStatusClean(false);
        }
    };

    const handleRightClickOutside = (e: MouseEvent) => {
        const rect = roomCardRef.current?.getBoundingClientRect();
        setShowPopupStatusClean(false);
        // Kiểm tra nếu chuột phải không phải trong phần tử đã tham chiếu
        if (rect) {
            const isOutside =
                e.clientX < rect.left ||
                e.clientX > rect.right ||
                e.clientY < rect.top ||
                e.clientY > rect.bottom;

            if (isOutside) {
                setShowPopup(false); // Đóng popup khi chuột phải ra ngoài phần tử
            }
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        document.addEventListener('contextmenu', handleRightClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('contextmenu', handleRightClickOutside);
        };
    }, []);

    const handleOpenPopup = (e: React.MouseEvent) => {
        e.preventDefault();

        setTimeout(() => {
            setShowPopup(true);
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const rect = roomCardRef.current?.getBoundingClientRect();
            if (!rect) return;

            const menuWidth = popupRef.current?.offsetWidth || 0;
            const menuHeight = popupRef.current?.offsetHeight || 0;

            let xPos = e.clientX - rect.left;
            let yPos = e.clientY - rect.top;

            // var pageYOffset = window.pageYOffset;

            // Điều chỉnh hướng hiển thị nếu không gian không đủ
            if (e.clientX + menuWidth > windowWidth) {
                xPos = xPos - menuWidth; // Hiển thị sang trái
            }
            if (e.clientY + menuHeight > windowHeight) {
                yPos = yPos - menuHeight; // Hiển thị lên trên
            }

            // Cập nhật vị trí popup
            setPopupPosition({ x: xPos, y: yPos });
        }, 0)
    }

    const handleOpenPopupStatusClean = () => {
        setShowPopupStatusClean(!showPopupStatusClean);
    }

    const handleFormattedDate = (check_in_at: string, check_out_at: string) => {
        const dateCheckIn = new Date(check_in_at);
        const dateCheckOut = new Date(check_out_at);

        // Định dạng ngày tháng giờ (không có năm)
        const formattedDateCheckIn = `${(dateCheckIn.getMonth() + 1).toString().padStart(2, '0')}/${dateCheckIn.getDate().toString().padStart(2, '0')} ${dateCheckIn.getHours().toString().padStart(2, '0')}:${dateCheckIn.getMinutes().toString().padStart(2, '0')}`;
        const formattedDateCheckOut = `${(dateCheckOut.getMonth() + 1).toString().padStart(2, '0')}/${dateCheckOut.getDate().toString().padStart(2, '0')} ${dateCheckOut.getHours().toString().padStart(2, '0')}:${dateCheckOut.getMinutes().toString().padStart(2, '0')}`;

        return formattedDateCheckIn + ' - ' + formattedDateCheckOut;
    }

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
                refreshData();
            }
        } catch (error) {
            // In thông tin lỗi khi gặp sự cố
            console.error("Lỗi khi gửi dữ liệu:", error);
        }
    }
    return (
        <section
            ref={roomCardRef}
            className={`room-item ${status?.classCard} duration-300 cursor-pointer border relative border-[var(--ht-neutral-100-)] bg-white rounded-xl w-[100%] h-[160px]`}
            onContextMenu={handleOpenPopup}
        >
            <p className="text-white p-2 text-center rounded-t-xl">
                {data.room_type}</p>
            <div className="p-3">
                <div className="flex mb-1 justify-between">
                    {
                        cleanStatus
                            ? (
                                <div
                                    className="center bg-[var(--ht-body-bg-)] rounded-full px-2 py-[3px] text-xs gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"
                                        viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                                    </svg>
                                    Sạch
                                </div>
                            )
                            : (
                                <div
                                    className="center bg-[var(--room-dirty-color-200-)] text-[var(--room-dirty-color-)] rounded-full px-2 py-[3px] text-xs gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13"
                                        className=" fill-[var(--room-dirty-color-)]"
                                        viewBox="0 0 576 512">
                                        <path
                                            d="M566.6 54.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192-34.7-34.7c-4.2-4.2-10-6.6-16-6.6c-12.5 0-22.6 10.1-22.6 22.6l0 29.1L364.3 320l29.1 0c12.5 0 22.6-10.1 22.6-22.6c0-6-2.4-11.8-6.6-16l-34.7-34.7 192-192zM341.1 353.4L222.6 234.9c-42.7-3.7-85.2 11.7-115.8 42.3l-8 8C76.5 307.5 64 337.7 64 369.2c0 6.8 7.1 11.2 13.2 8.2l51.1-25.5c5-2.5 9.5 4.1 5.4 7.9L7.3 473.4C2.7 477.6 0 483.6 0 489.9C0 502.1 9.9 512 22.1 512l173.3 0c38.8 0 75.9-15.4 103.4-42.8c30.6-30.6 45.9-73.1 42.3-115.8z" />
                                    </svg>
                                    Chưa dọn
                                </div>
                            )
                    }
                    <div
                        ref={popupStatusCleanRef}
                        className="relative"
                        onClick={handleOpenPopupStatusClean}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                            className="rounded-full hover:bg-[var(--ht-body-bg-)] duration-200 fill-[var(--ht-neutral-300-)] cursor-pointer">
                            <path
                                d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z">
                            </path>
                        </svg>
                        {
                            showPopupStatusClean &&
                            (
                                cleanStatus
                                    ? <button
                                        onClick={handleSetStatusClean}
                                        className="popup-container !w-[70px] py-1 px-2 right-0 whitespace-nowrap text-xs hover:!bg-[var(--ht-neutral-100-)]">Chưa dọn</button>
                                    : <button
                                        onClick={handleSetStatusClean}
                                        className="popup-container !w-[70px] py-1 px-2 right-0 whitespace-nowrap text-xs hover:!bg-[var(--ht-neutral-100-)] ">Làm sạch</button>
                            )
                        }
                    </div>
                </div>
                <h1 className="text-[18px] font-medium text-black truncate">{data.name}</h1>
                {data.bookings &&
                    <div className="flex absolute bottom-3">
                        <div
                            className="center time-check-out bg-opacity-3 text-white rounded-full px-2 py-[3px] text-xs gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"
                                viewBox="0 0 24 24" className="fill-current">
                                <path
                                    d="M12.25 2c-5.514 0-10 4.486-10 10s4.486 10 10 10 10-4.486 10-10-4.486-10-10-10zM18 13h-6.75V6h2v5H18v2z">
                                </path>
                            </svg>
                            {handleFormattedDate(data.bookings[0].booking_at, data.bookings[0].check_out_at)}
                        </div>
                    </div>
                }
            </div>

            {data.status === "Trống"
                ?
                <UnusedRoomPopup
                    ref={popupRef}
                    showPopup={showPopup}
                    position={popupPosition}
                    data={data}
                    handleSetStatusClean={handleSetStatusClean}
                    cleanStatus={cleanStatus} />
                :
                <InusedRoomPopup
                    ref={popupRef}
                    showPopup={showPopup}
                    position={popupPosition}
                    data={data}
                    handleSetStatusClean={handleSetStatusClean}
                    cleanStatus={cleanStatus} />
            }

        </section>
    )
}

export default RoomCard;