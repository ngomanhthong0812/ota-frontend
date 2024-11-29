import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

interface IProps {
    showModal: boolean;
    closeModal: () => void;
    checkOutAt: string;
    onSave: (createCheckIn: string, createCheckOut: string) => void;
}

const CheckInModal = (props: IProps) => {

    const {showModal, closeModal, checkOutAt, onSave} = props;

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
        setIsLoading(true);
        const currentDateTime = getCurrentDateTimeISO();
        await onSave(currentDateTime, checkOutAt);
        setIsLoading(false);
        closeModal(); // Đóng modal sau khi hoàn thành
    };

    return (
        <Dialog open={showModal} onOpenChange={closeModal}>
            <DialogContent>
                <DialogTitle>Nhập phòng</DialogTitle>

                <div className="text-black font-medium py-5 flex items-center gap-5">
                    <p>Nhận phòng và tạo thẻ</p>
                    <input type="checkbox" />
                </div>

                <footer className="modal-footer p-3 px-5">
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
            </DialogContent>
        </Dialog>
    )
}

export default CheckInModal;