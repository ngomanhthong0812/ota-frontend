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

    checkInDate: string; 
    checkOutDate: string;

    onSave: (updatedCheckIn: string, updatedCheckOut: string) => void;
}
const ChangeDateModal = (props: IProps) => {
    const {showModal, closeModal, roomName, checkInDate, checkOutDate, onSave} = props;

    const [updatedCheckIn, setUpdatedCheckIn] = useState(checkInDate);
    const [updatedCheckOut, setUpdatedCheckOut] = useState(checkOutDate);

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
                        
                        <p>{roomName}</p>
                    </div>

                    <div>
                        <p className="flex items-center gap-2">
                            
                            Guest
                        </p>
                    </div>
                </div>
                <div className="py-4 bg-white">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Sẽ đến</label>
                        <input 
                            type="datetime-local" 
                            className="btn"
                            value={checkInDate}
                            onChange={(e) => setUpdatedCheckIn(e.target.value)}
                        />
                    </div>
            
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mt-4">Sẽ đi</label>
                        <div className="grid grid-cols-3 gap-x-5">
                            <input 
                                type="datetime-local" 
                                className="btn col-span-2"
                                value={checkOutDate}
                                onChange={(e) => setUpdatedCheckOut(e.target.value)} 
                            />
                            <button 
                                id="current-date" 
                                className="bg-white border border-[var(--navbar-color-)] text-[var(--navbar-color-)] font-semibold rounded-md hover:bg-[var(--navbar-color-)] hover:text-white duration-200">
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