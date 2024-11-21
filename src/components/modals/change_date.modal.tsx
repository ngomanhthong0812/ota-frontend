import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import React, { useState } from "react";

interface ModalProps  {
    onSave: (data: { checkIn: string; checkOut: string }) => void;
    initialData: { checkIn: string; checkOut: string };

    isOpen: boolean;
    onClose: () => void;
}
const ChangeDateModal: React.FC<ModalProps> = ({ onSave, initialData, isOpen, onClose }) => {
    const [checkIn, setCheckIn] = useState(initialData.checkIn);
    const [checkOut, setCheckOut] = useState(initialData.checkOut);

    const handleSave = () => {
        onSave({ checkIn, checkOut });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Đổi ngày ở</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 modal-body mt-3">
                    <div className="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" style={{fill: "red", width: 20}}><path d="M32 32c17.7 0 32 14.3 32 32l0 256 224 0 0-160c0-17.7 14.3-32 32-32l224 0c53 0 96 43 96 96l0 224c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-32-224 0-32 0L64 416l0 32c0 17.7-14.3 32-32 32s-32-14.3-32-32L0 64C0 46.3 14.3 32 32 32zm144 96a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"/></svg>
                        <p>City view 102</p>
                    </div>

                    <div>
                        <p className="flex items-center gap-2">
                            Guest
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-2 py-4 bg-white">
                    <div>
                        Sẽ đến
                        <input 
                            type="datetime-local"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)} 
                            id="check-in" 
                            className="btn" 
                        />
                    </div>
            
                    <div>
                        Sẽ đi
                        <div className="grid grid-cols-3 gap-x-5">
                            <input 
                                type="datetime-local"
                                value={checkOut}
                                onChange={(e) => setCheckOut(e.target.value)}  
                                id="check-out" 
                                className="btn col-span-2" 
                            />
                            <button 
                                id="current-date" 
                                className="bg-white border border-[var(--navbar-color-)] text-[var(--navbar-color-)] font-semibold rounded-md hover:bg-[var(--navbar-color-)] hover:text-white duration-200">
                                Hiện tại
                            </button>
                        </div>
                    </div>
                </div>

                

                
                <DialogFooter>
                    <div className="flex items-center justify-end gap-x-10 py-3 font-medium">
                        <div className="flex items-center justify-end gap-x-5 py-3 font-semibold">
                            <button 
                                className="text-[#d147a3] w-28 py-1 rounded-md border border-[#d147a3] hover:bg-[#d147a3] hover:text-white duration-200"
                                onClick={onClose}
                            >
                                Đóng 
                            </button>
                            <button 
                                className="w-28 py-1 bg-white border border-[var(--navbar-color-)] text-[var(--navbar-color-)]  rounded-md hover:bg-[var(--navbar-color-)] hover:text-white duration-200"
                                onClick={handleSave}
                            >
                                Lưu
                            </button>
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ChangeDateModal;