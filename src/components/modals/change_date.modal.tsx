import {
    Dialog,
    DialogContent,
    DialogTitle,
  } from "@/components/ui/dialog"
import { useState } from "react";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (dates: { arrivalDate: string; departureDate: string }) => void;
    initialDates: { arrivalDate: string; departureDate: string };
    
    roomName:string
}
const ChangeDateModal = (props: IProps) => {
    const {isOpen, onClose, onSave, initialDates, roomName} = props;

    const [arrivalDate, setArrivalDate] = useState(initialDates.arrivalDate);
    const [departureDate, setDepartureDate] = useState(initialDates.departureDate);

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
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
                            id="check-in" 
                            className="btn" 
                            placeholder="Chọn ngày đến"
                            value={arrivalDate}
                            onChange={(e) => setArrivalDate(e.target.value)}
                        />
                    </div>
            
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mt-4">Sẽ đi</label>
                        <div className="grid grid-cols-3 gap-x-5">
                            <input 
                                type="datetime-local" 
                                id="check-out" 
                                className="btn col-span-2" 
                                placeholder="Chọn ngày đi"
                                value={departureDate}
                                onChange={(e) => setDepartureDate(e.target.value)}
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
                        >
                            Đóng
                        </button>
                        <button 
                            className="w-24 py-1 bg-white border border-[var(--navbar-color-)] text-[var(--navbar-color-)]  rounded-md hover:bg-[var(--navbar-color-)] hover:text-white duration-200"
                            onClick={() => onSave({ arrivalDate, departureDate})}
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