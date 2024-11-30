import {
    Dialog,
    DialogContent,
    DialogTitle,
  } from "@/components/ui/dialog"
import { useEffect, useState } from "react";

interface IProps {
    showModal: boolean;
    closeModal: () => void;
    roomName: string;
    customerName: string;
    checkInDate: string; 
    checkOutDate: string;

    onSave: (updatedCheckIn: string, updatedCheckOut: string) => void;
}
const ChangeDateModal = (props: IProps) => {
    const {showModal, closeModal, roomName, customerName, checkInDate, checkOutDate, onSave} = props;

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

    const handleSave = () => {
        onSave(updatedCheckIn, updatedCheckOut);
        closeModal(); // Đóng modal sau khi lưu
    };
    
    if (!showModal) return null;

    return (
        <Dialog open={showModal} onOpenChange={closeModal}>
            <DialogContent>
                <DialogTitle className="modal-title text-lg font-medium text-black">
                    Đổi ngày ở
                </DialogTitle>
                
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
                            onClick={handleSave}
                        >
                            Lưu
                        </button>
                    </div>
                </footer>
            </DialogContent>
        </Dialog>
    )
}

export default ChangeDateModal;