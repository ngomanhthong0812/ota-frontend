import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog"
import { useAuth } from "@/context/auth.context";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface IProps {
    showModal: boolean;
    closeModal: () => void;
    roomName: string;
    customerName: string;
    checkInDate: string; 
    checkOutDate: string;
    bookingId: number | undefined;
    onUpdateBooking: (updatedCheckIn: string, updatedCheckOut: string) => void;
}
const ChangeDateModal = (props: IProps) => {
    const {showModal, closeModal, roomName, customerName, checkInDate, checkOutDate, bookingId, onUpdateBooking} = props;

    const { token } = useAuth(); // Lấy token từ context
    const [updatedCheckIn, setUpdatedCheckIn] = useState(checkInDate);
    const [updatedCheckOut, setUpdatedCheckOut] = useState(checkOutDate);

    useEffect(() => {
        setUpdatedCheckIn(checkInDate);
        setUpdatedCheckOut(checkOutDate);
    }, [checkInDate, checkOutDate]);

    const formatForInput = (dateString: Date): string => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
      
        return `${year}-${month}-${day}T${hours}:${minutes}`;
      };

    const handleSetToCurrent = () => {
        const now = new Date();
        const formattedNow = formatForInput(now);
        setUpdatedCheckOut(formattedNow)
    }

    const handleSaveDates = async () => {
        try {
            if (!bookingId || !token) {
                toast.error("Thiếu thông tin để cập nhật.");
                return;
            }
    
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings/${bookingId}`,
                {
                check_in_at: updatedCheckIn,
                check_out_at: updatedCheckOut,
                },
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                }
            );
    
            if (response.status === 200) {
                toast.success("Đổi ngày thành công");
                onUpdateBooking(updatedCheckIn, updatedCheckOut);
                closeModal();
            } else {
                toast.error("Đã xảy ra lỗi khi cập nhật.");
            }
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
            toast.error("Không thể kết nối tới máy chủ.");
        }
    };
    
    if (!showModal) return null;

    return (
        <Dialog open={showModal} onOpenChange={closeModal}>
            <DialogContent 
                className="rounded-xl overflow-auto p-0 bg-transparent border-none">

                <div className="rounded-xl">

                    <DialogTitle className="text-white font-medium text-base bg-[var(--room-empty-color-)] px-4 py-2 rounded-t-xl">
                        Đổi ngày ở
                    </DialogTitle>

                    <div className="bg-white p-3">

                        <div className="grid grid-cols-2 modal-body mt-3">
                            <div className="flex items-center gap-3">
                                
                                <p>Phòng: {roomName}</p>
                            </div>

                            <div>
                                <p className="flex items-center gap-2">
                                    Khách hàng: {customerName}
                                </p>
                            </div>
                        </div>

                        <div className="py-4 bg-white">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700">Sẽ đến</label>
                                <input 
                                    type="datetime-local" 
                                    className="btn"
                                    value={updatedCheckIn}
                                    onChange={(e) => setUpdatedCheckIn(e.target.value)}
                                />
                            </div>
                    
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mt-4">Sẽ đi</label>
                                <div className="grid grid-cols-3 gap-x-5">
                                    <input 
                                        type="datetime-local" 
                                        className="btn col-span-2"
                                        value={updatedCheckOut}
                                        onChange={(e) => setUpdatedCheckOut(e.target.value)} 
                                    />
                                    <button 
                                        id="current-date" 
                                        className="bg-white border border-[var(--navbar-color-)] text-[var(--navbar-color-)] font-semibold rounded-md hover:bg-[var(--navbar-color-)] hover:text-white duration-200"
                                        onClick={() => handleSetToCurrent()}
                                    >
                                        Hiện tại
                                    </button>
                                </div>
                            </div>
                        </div>

                        <footer className="modal-footer">
                            <div className="flex items-center justify-end gap-x-5 py-3 font-semibold">
                                <button 
                                    className="text-[#d147a3] w-24 py-1 rounded-md border border-[#d147a3] hover:bg-[#d147a3] hover:text-white duration-200"
                                    onClick={closeModal}
                                >
                                    Đóng
                                </button>
                                <button 
                                    className="w-24 py-1 bg-white border border-[var(--navbar-color-)] text-[var(--navbar-color-)]  rounded-md hover:bg-[var(--navbar-color-)] hover:text-white duration-200"
                                    onClick={handleSaveDates}
                                >
                                    Lưu
                                </button>
                            </div>
                        </footer>

                    </div>

                </div>
                
            </DialogContent>

        </Dialog>
    )
}

export default ChangeDateModal;