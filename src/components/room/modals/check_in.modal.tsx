import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
import { useAuth } from "@/context/auth.context";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface IProps {
    showModal: boolean;
    closeModal: () => void;
    checkOutAt: string;
    bookingId: number | undefined;
    onCreateCheckInDate: (createCheckIn: string, createCheckOut: string) => void;
}

const CheckInModal = (props: IProps) => {
    
    
    const { showModal, closeModal, checkOutAt, bookingId, onCreateCheckInDate } = props;
    console.log(bookingId);
    console.log(checkOutAt);

    const { token } = useAuth(); // Lấy token từ context
    const [isLoading, setIsLoading] = useState(false);

    const getCurrentDateTimeISO = () => {
        const now = new Date();

        const year = now.getFullYear(); // Năm
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Tháng
        const day = String(now.getDate()).padStart(2, '0'); // Ngày

        const hours = String(now.getHours()).padStart(2, '0'); // Giờ
        const minutes = String(now.getMinutes()).padStart(2, '0'); // Phút

        // Định dạng thành YYYY-MM-DDTHH:mm
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const handleCheckIn = async () => {
        if (!bookingId) {
            toast.error("Không tìm thấy mã đặt phòng.");
            return;
        }

        setIsLoading(true);

        try {
            const currentDateTime = getCurrentDateTimeISO();
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings/${bookingId}`,
                {
                    check_in_at: currentDateTime,
                    check_out_at: checkOutAt,
                    status: "CheckedIn",
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                toast.success("Nhận phòng thành công!");
                onCreateCheckInDate(currentDateTime, checkOutAt);
                closeModal(); // Đóng modal sau khi hoàn thành
            } else {
                toast.error("Đã xảy ra lỗi. Vui lòng thử lại.");
            }
        } catch (error: any) {
            if (error.response) {
                toast.error(`Lỗi: ${error.response.data.message || "Không thể nhận phòng."}`);
            } else {
                toast.error("Không thể kết nối tới máy chủ. Vui lòng kiểm tra kết nối mạng.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={showModal} onOpenChange={closeModal}>
            <DialogContent
                className="rounded-xl overflow-auto p-0 bg-transparent border-none">

                <div className="rounded-xl">
                    <DialogTitle
                        className="text-white font-medium text-base bg-[var(--room-empty-color-)] px-4 py-2 rounded-t-xl">
                        Nhập phòng
                    </DialogTitle>

                    <div className="bg-white p-3">

                        <div className="text-black font-medium py-5 flex items-center gap-5">
                            <p>Nhận phòng và tạo thẻ</p>
                            <input type="checkbox" />
                        </div>

                        <footer className="modal-footer">
                            <div className="flex items-center justify-end gap-x-5 py-3 font-semibold">
                                <button
                                    className="text-[#d147a3] w-28 py-1 rounded-md border border-[#d147a3] hover:bg-[#d147a3] hover:text-white duration-200"
                                    onClick={closeModal}
                                    disabled={isLoading}
                                >
                                    Bỏ qua
                                </button>

                                <button
                                    className="w-28 py-1 bg-white border border-[var(--navbar-color-)] text-[var(--navbar-color-)]  rounded-md hover:bg-[var(--navbar-color-)] hover:text-white duration-200"
                                    onClick={handleCheckIn}
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Đang xử lý..." : "Nhận phòng"}
                                </button>
                            </div>
                        </footer>

                    </div>

                </div>

            </DialogContent>

        </Dialog>
    )
}

export default CheckInModal;