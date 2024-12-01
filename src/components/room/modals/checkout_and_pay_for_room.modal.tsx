"use client"

import {
    Dialog,
    DialogContent,
    DialogTitle,
  } from "@/components/ui/dialog"
 
import { toast } from "sonner"
 

interface IProps {
    showModal: boolean;
    closeModal: () => void;
    roomName: string;
    roomPrice: number;
}
const CheckOutAndPayModalForRoom = (props: IProps) => {

    const {showModal, closeModal, roomName, roomPrice} = props;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("vi-VN").format(amount);
    };

    const handleCheckOut = () => {
        closeModal();
        toast("Thanh toan thanh cong", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
            },
        })
    }

    return (
        <Dialog open={showModal} onOpenChange={closeModal}>
            <DialogContent>
                <DialogTitle>Thanh toán</DialogTitle>

                <div className="mt-3">
                    <ul>
                        <li>
                            <div className="flex items-center justify-between">
                                <p className="room-name">{roomName}</p>
                                <p className="room-price">{formatCurrency(roomPrice)} VND</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="grid grid-cols-3 gap-5 mt-5">
                    <div className="flex flex-col col-span-2">
                        <select name="" id="" className="btn">
                            <option value="">Tiền mặt</option>
                            <option value="">Chuyển khoản</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <select name="" id="" className="btn">
                            <option value="">VND</option>
                            <option value="">USD</option>
                        </select>
                    </div>
                </div>

                <div>
                    <div className="flex items-center mt-3">
                        <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox"/>
                            
                            <span className="ml-2 text-gray-700">Gửi email cho khách</span>
                        </label>
                    </div>
                </div>

                <footer className="modal-footer">
                    <div className="flex items-center justify-end gap-x-10 py-3 font-medium">
                        <div className="flex items-center justify-end gap-x-5 py-3 font-semibold">
                            <button 
                                className="text-[#d147a3] w-28 py-1 rounded-md border border-[#d147a3] hover:bg-[#d147a3] hover:text-white duration-200"
                                onClick={handleCheckOut}
                                >
                                Bỏ qua
                            </button>
                            <button 
                                className="w-28 py-1 bg-white border border-[var(--navbar-color-)] text-[var(--navbar-color-)]  rounded-md hover:bg-[var(--navbar-color-)] hover:text-white duration-200"
                                onClick={handleCheckOut}
                                >
                                Thanh toán
                            </button>
                        </div>
                    </div>
                </footer>

            </DialogContent>
        </Dialog>
    )
}

export default CheckOutAndPayModalForRoom;