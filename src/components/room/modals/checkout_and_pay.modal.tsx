'use client'
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog"
import { CURRENCY_TYPES, PAYMENT_METHODS, PAYMENT_OPTIONS, PAYMENT_OPTIONS_INVOICE_ROOM } from "@/constants/constants";
import { ROOM_STATUS } from "@/constants/constants";
import { useAuth } from "@/context/auth.context";
import useFormatPriceWithCommas from "@/hook/useFormatPriceWithCommas";
import { RequestTransaction } from "@/types/backend";
import axios from "axios";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface IProps {
    showModal: boolean;
    closeModal: () => void;
    roomName: string;  // Thông tin phòng và giá
    remainingAmount: number;
    invoice_id: number;
    room_id: number;
    booking_id: number;
}
const CheckOutAndPayModal: React.FC<IProps> = ({ showModal, closeModal, roomName, remainingAmount, invoice_id, room_id, booking_id }) => {
    const router = useRouter();
    const { formatPrice } = useFormatPriceWithCommas();
    const { user, token } = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [transactionRequest, setTransactionRequest] = useState<RequestTransaction>({
        paymentOption: remainingAmount > 0 ? PAYMENT_OPTIONS_INVOICE_ROOM.PAYMENT : PAYMENT_OPTIONS_INVOICE_ROOM.REFUND,
        paymentMethod: PAYMENT_METHODS.CASH,
        currencyType: CURRENCY_TYPES.VND,
        price: Math.abs(remainingAmount),
        note: `Thanh toán tiền còn lại của phòng ${roomName}`,
        invoice_id: Number(invoice_id),
        user_id: user?.id,
        hotel_id: user?.hotel_id,
    });


    useEffect(() => {
        setTransactionRequest(prev => ({
            ...prev,
            paymentOption: remainingAmount > 0 ? PAYMENT_OPTIONS_INVOICE_ROOM.PAYMENT : PAYMENT_OPTIONS_INVOICE_ROOM.REFUND,
            note: `Thanh toán tiền còn lại của phòng ${roomName}`,
            price: Math.abs(remainingAmount),
            user_id: user?.id,
            hotel_id: user?.hotel_id,
        }))
    }, [user, remainingAmount, roomName]);

    const handleCheckOut = async () => {
        setIsLoading(true)

        if (transactionRequest.price !== 0) {
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/invoicePayments/handleTransaction/`,
                    transactionRequest,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                // Kiểm tra phản hồi từ API
                if (response.data.statusCode === 200 || response.status === 201) {
                    console.log("Gửi thành công");
                    await handleSavePayment();

                    //-> cập nhật trạng thái phòng && chuyển tới trang hoá đơn hoặc trang home
                    handleUpdateBookingStatus();
                    handleUpdateRoomStatus();
                    router.push('/hotel_management')
                    toast("Thanh toan thanh cong")
                    //-> cập nhật trạng thái phòng,booking && chuyển tới trang hoá đơn hoặc trang home
                }
            } catch (error) {
                setIsLoading(false);
                // In thông tin lỗi khi gặp sự cố
                console.log("Lỗi khi gửi dữ liệu:", error);
            }
        } else {
            handleSavePayment();
            setIsLoading(false)
        }
    }

    const handleSavePayment = async () => {
        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/invoices/${invoice_id}`,
                {
                    payment_method: transactionRequest.paymentMethod === PAYMENT_METHODS.CASH ? 'Cash' : 'Bank_transfer',
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
                toast("Thanh toán thành công!");
            }
        } catch (error) {
            console.error("Failed to create payment:", error);
            alert("Đã xảy ra lỗi khi thực hiện thanh toán.");
        } finally {
            closeModal();
        }
    };

    const handleUpdateBookingStatus = async () => {
        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings/${booking_id}`,
                {
                    status: "Checkout"
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                // toast("Cap nhat booking thành công!");
            }
        } catch (error) {
            console.error("Failed to create payment:", error);
            alert("Đã xảy ra lỗi khi thực hiện thanh toán.");
        } finally {
            closeModal();
        }
    }

    const handleUpdateRoomStatus = async () => {
        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/room/${room_id}`,
                {
                    status: ROOM_STATUS.EMPTY,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                // toast("Cap nhat phong thành công!");
            }
        } catch (error) {
            console.error("Failed to create payment:", error);
            alert("Đã xảy ra lỗi khi thực hiện cap nhat phong.");
        } finally {
            closeModal();
        }
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
                                <p className="room-price">{remainingAmount >= 0 ? formatPrice(String(remainingAmount)) : '-' + formatPrice(String(remainingAmount))} VND</p>
                            </div>
                        </li>
                    </ul>

                </div>

                <div className="grid grid-cols-3 gap-5 mt-5">
                    <div className="flex flex-col col-span-2">
                        <select
                            onChange={e => setTransactionRequest(prev => ({ ...prev, paymentMethod: e.target.value }))}
                            name="" id="" className="btn">
                            <option>{PAYMENT_METHODS.CASH}</option>
                            <option>{PAYMENT_METHODS.BANK_TRANSFER}</option>
                            <option>{PAYMENT_METHODS.CREDIT_CARD}</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <select
                            onChange={e => setTransactionRequest(prev => ({ ...prev, currencyType: e.target.value }))}
                            name="" id=""
                            className="btn">
                            <option value="">{CURRENCY_TYPES.VND}</option>
                            <option value="">{CURRENCY_TYPES.USD}</option>
                        </select>
                    </div>
                </div>

                <div>
                    <div className="flex items-center mt-3">
                        <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" />

                            <span className="ml-2 text-gray-700">Gửi email cho khách</span>
                        </label>
                    </div>
                </div>

                <footer className="modal-footer">
                    <div className="flex items-center justify-end gap-x-10 py-3 font-medium">
                        <div className="flex items-center justify-end gap-x-5 py-3 font-semibold">
                            <button
                                className="text-[#d147a3] w-28 py-1 rounded-md border border-[#d147a3] hover:bg-[#d147a3] hover:text-white duration-200"
                                onClick={closeModal}
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
                {isLoading
                    && <div className="fixed z-[999] bg-black bg-opacity-45 top-0 left-0 w-full h-full flex items-center justify-center">
                        <ClipLoader size={50} color="fffff" />
                    </div>
                }
            </DialogContent>
        </Dialog>
    )
}

export default CheckOutAndPayModal;
