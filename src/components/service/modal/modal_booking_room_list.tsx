import {
    Dialog,
    DialogContent,
    DialogTitle
} from "@/components/ui/dialog"
import useFormatDate from "@/hook/useFormatDate";
import React from "react"

interface RoomBookingList {
    id: number,
    booking_at: string,
    check_in_at: string,
    check_out_at: string,
    customer: {
        id: number,
        name: string,
    }
}

interface IProps {
    bookingRoomList: RoomBookingList[],
    showModalBookingRoomList: boolean,
    handleSetUnModalBookingRoomList: () => void,
}

const ModalBookingRoomList: React.FC<IProps> = ({
    bookingRoomList,
    showModalBookingRoomList,
    handleSetUnModalBookingRoomList,
}) => {
    const { formatDate } = useFormatDate();

    return (
        <Dialog
            open={showModalBookingRoomList}
            onOpenChange={(open) => {
                if (!open) {
                    handleSetUnModalBookingRoomList();
                }
            }}>
            <DialogContent className="rounded-xl w-[250px] overflow-auto p-0 bg-transparent border-none">
                <div className="rounded-xl">
                    <DialogTitle
                        className="text-white font-medium text-base bg-[var(--room-empty-color-)] px-4 py-2 rounded-t-xl">
                        Danh sách đặt phòng
                    </DialogTitle>
                    <div className="bg-white">
                        <div className="px-4 pt-2 flex flex-col gap-7 text-[14px] text-[#656565] max-h-[500px] overflow-y-auto">
                            <div className="flex flex-col px-4">
                                {bookingRoomList?.map(item => (
                                    <div key={item.id} className="border-b-[1px] pt-3 pb-1">
                                        <h3 className="font-[500]">Mã đặt phòng: <span>{item.id}</span></h3>
                                        <div className="text-[13px]">Khách hàng: <span>{item.customer.name}</span></div>
                                        <div className="text-[13px]">Sẽ đến: <span>{formatDate(item.booking_at)}</span></div>
                                        <div className="text-[13px]">Sẽ đi: <span>{formatDate(item.check_out_at)}</span></div>
                                    </div>
                                ))}

                                {bookingRoomList?.length <= 0 && "Danh sách trống"}
                            </div>
                        </div>

                        <footer className="modal-footer px-4 rounded-b-xl text-[14px]">
                            <div className="flex items-center justify-end gap-x-5 py-3 font-[500]">
                                <button
                                    onClick={handleSetUnModalBookingRoomList}
                                    className="px-3 py-1 bg-white text-[var(--navbar-color-)]">
                                    Đóng
                                </button>
                            </div>
                        </footer>
                    </div>
                </div>
            </DialogContent>
        </Dialog >
    )
}
export default ModalBookingRoomList;
