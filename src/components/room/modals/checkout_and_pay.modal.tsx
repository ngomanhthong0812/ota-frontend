"use client"

import {
    Dialog,
    DialogContent,
    DialogTitle,
  } from "@/components/ui/dialog"
import { useAuth } from "@/context/auth.context";
import useFormatPriceWithCommas from "@/hook/useFormatPriceWithCommas";
import { useParams } from "next/navigation";
import useSWR from "swr";
import axios from "axios";
import { useState } from "react";

interface IProps {
    showModal: boolean;
    closeModal: () => void;
    roomDetails: { name: string }[];  // Thông tin phòng và giá
    roomPrice: number;
    id: any;

    handleUpdatePayments: (newPayment: Payments) => void; // Nhận thêm hàm từ props
}

interface Payments {
    id: number;
    payment_date: Date;
    amount: number;
    payment_method: string;
    note: string;
}

const CheckOutAndPayModal = (props: IProps) => {

    const {showModal, closeModal, roomDetails, id, roomPrice, handleUpdatePayments} = props;
    const { formatPrice } = useFormatPriceWithCommas();
    const [paymentMethod, setPaymentMethod] = useState<string>("Cash");
    const invoiceId = id;

    const { token } = useAuth();

    const handleSavePayment = async () => {
        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/invoices/${invoiceId}`,
                {
                    total_amount: roomPrice,
                    payment_method: paymentMethod,
                    status: "Paid"
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                alert("Thanh toán thành công!");

                const newPayment = {
                    id: response.data.id,
                    payment_date: new Date(),
                    amount: roomPrice,
                    payment_method: paymentMethod,
                    note: "note",
                };
                handleUpdatePayments(newPayment);
            }
        } catch (error) {
            console.error("Failed to create payment:", error);
            alert("Đã xảy ra lỗi khi thực hiện thanh toán.");
        } finally {
            closeModal();
        }
    };

    
    const handleSubmit = () => {
        closeModal();
    }

    return (
        <Dialog open={showModal} onOpenChange={closeModal}>
            <DialogContent className="overflow-auto p-0 bg-transparent border-none">
                
                <div className="rounded-xl">
                    <DialogTitle 
                        className="text-white font-medium text-base bg-[var(--room-empty-color-)] px-4 py-2 rounded-t-xl">
                            Thanh toán
                    </DialogTitle>

                    <div className="bg-white p-4">
                        <div className="">
                            <ul>
                                {roomDetails.length > 0 ? (
                                    roomDetails.map((room, index) => (
                                        <li key={index}>
                                            <div className="flex items-center justify-between">
                                                <p className="room-name">{room.name}</p>

                                                <p className="room-price">{formatPrice(String(roomPrice))} VNĐ</p>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <li>No rooms available</li>
                                )}
                            </ul>
                        
                        </div>

                        <div className="grid grid-cols-3 gap-5 mt-5">
                            <div className="flex flex-col col-span-2">
                                <select 
                                    className="btn"
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    >
                                    <option value="Cash">Tiền mặt</option>
                                    <option value="Credit_card">Thẻ tín dụng</option>
                                    <option value="Bank_transfer">Chuyển khoản NH</option>
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
                                        onClick={handleSubmit}
                                        >
                                        Bỏ qua
                                    </button>
                                    <button 
                                        className="w-28 py-1 bg-white border border-[var(--navbar-color-)] text-[var(--navbar-color-)]  rounded-md hover:bg-[var(--navbar-color-)] hover:text-white duration-200"
                                        onClick={handleSavePayment}
                                        >
                                        Thanh toán
                                    </button>
                                </div>
                            </div>
                        </footer>

                    </div>
                </div>


            </DialogContent>
        </Dialog>
    )
}

export default CheckOutAndPayModal;