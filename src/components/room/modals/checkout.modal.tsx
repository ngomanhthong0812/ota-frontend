"use client"

import {
    Dialog,
    DialogContent,
    DialogTitle,
  } from "@/components/ui/dialog"
import { useAuth } from "@/context/auth.context";
import { useParams } from "next/navigation";
import React from "react";
import axios from "axios";

interface Payments {
    id: number;
    payment_date: Date;
    amount: number;
    payment_method: string;
    note: string;
}

interface IProps {
    showModal: boolean;
    closeModal: () => void;
    
    invoiceId: any;
    paymentMethod: string;
    amount: number;
    note: string;

    handleUpdatePayments: (newPayment: Payments) => void; // Nhận thêm hàm từ props

}
const CheckOutModal = (props: IProps) => {

    const {showModal, closeModal, invoiceId, paymentMethod, amount, note, handleUpdatePayments} = props;

    const { token } = useAuth();

    const handleSavePayment = async () => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/invoicePayments`,
                {
                    invoice_id: invoiceId,
                    payment_method: paymentMethod,
                    amount,
                    note,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 201) {
                alert("Thanh toán thành công!");
                // Gọi handleUpdatePayments từ component cha
                const newPayment = {
                    id: response.data.id,
                    payment_date: new Date(),
                    amount: amount,
                    payment_method: paymentMethod,
                    note: note,
                };
                handleUpdatePayments(newPayment); // Gọi hàm để cập nhật payments
            }
        } catch (error) {
            console.error("Failed to create payment:", error);
            alert("Đã xảy ra lỗi khi thực hiện thanh toán.");
        } finally {
            closeModal();
        }
    };
    

    const handleCheckOut = () => {
        closeModal();
    }
    
    return (
        <Dialog open={showModal} onOpenChange={closeModal}>
            <DialogContent>
                <DialogTitle>Bạn có chắc chắn muốn thanh toán mới !</DialogTitle>
                <footer className="modal-footer">
                    <div className="flex items-center justify-end gap-x-5 py-3 font-semibold">
                        <button 
                            className="text-[#d147a3] w-24 py-1 rounded-md border border-[#d147a3] hover:bg-[#d147a3] hover:text-white duration-200"
                            onClick={handleCheckOut}
                        >
                            Huỷ
                        </button>
                        <button 
                            className="w-24 py-1 bg-white border border-[var(--navbar-color-)] text-[var(--navbar-color-)]  rounded-md hover:bg-[var(--navbar-color-)] hover:text-white duration-200"
                            onClick={handleSavePayment}
                        >
                            Đồng ý
                        </button>
                    </div>
                </footer>
            </DialogContent>
        </Dialog>
    )
}

export default CheckOutModal;