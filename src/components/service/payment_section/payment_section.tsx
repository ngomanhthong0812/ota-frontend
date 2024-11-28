'use client'
import { useSelectedService } from "@/context/selectedService.context";
import PaymentSummary from "./payment_summary";
import SelectedList from "./selected_list";
import { useState } from "react";
import ModalInvoiceCreationConfirmation from "../modal/modal_invoice_creation_confirmation";
import { RequestPaymentService } from "@/types/backend";
import { CURRENCY_TYPES, PAYMENT_METHODS, PAYMENT_OPTIONS } from "@/constants/constants";
import { useAuth } from "@/context/auth.context";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

interface IProps { }

const PaymentSection: React.FC<IProps> = () => {
    const router = useRouter();
    const { user, token } = useAuth();
    const { totalService, selectedService } = useSelectedService();

    const [showModalInvoiceCreationConfirmation, setShowModalInvoiceCreationConfirmation] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [paymentInfoService, setPaymentInfoService] = useState<RequestPaymentService>({
        paymentOption: PAYMENT_OPTIONS.PAYMENT_AT_THE_COUNTER,
        currencyType: CURRENCY_TYPES.VND,
        totalPrice: 0,
        paymentMethod: PAYMENT_METHODS.CASH,
        customerName: 'Anonymous',
        note: '',
        hotel_id: user?.hotel_id,
        selectedService: selectedService,
        discountForm: {
            discount: 0,
            note: '',
        },
        user_id: user?.id
    });

    const handleSetUnModalInvoiceCreationConfirmation = () => {
        setShowModalInvoiceCreationConfirmation(false);
    }
    const handleSetInModalInvoiceCreationConfirmation = () => {
        if (paymentInfoService?.totalPrice > 0) {
            setShowModalInvoiceCreationConfirmation(true);
        }
    }

    const handleSavePaymentInfo = (paymentInfo: RequestPaymentService) => {
        setPaymentInfoService(paymentInfo);
    }

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/invoices/createInvoiceService`,
                paymentInfoService.user_id && paymentInfoService.hotel_id ?
                    paymentInfoService
                    : {
                        ...paymentInfoService,
                        hotel_id: user?.hotel_id,
                        user_id: user?.id
                    },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Thay token vào đây
                        "Content-Type": "application/json",
                    },
                }
            );

            // Kiểm tra phản hồi từ API
            if (response.data.statusCode === 200 || response.status === 201) {
                console.log("Gửi thành công");
                // Sau khi gửi thành công, điều hướng tới trang khác
                router.push(`sales_invoice_creation/invoice/${response.data.data.invoice_id}`);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(paymentInfoService);

            // In thông tin lỗi khi gặp sự cố
            console.log("Lỗi khi gửi dữ liệu:", error);
        }
    }

    const handleAddServiceForRoom = () => {
        alert("Chất năng đang phát triễn");
    }

    return (
        <div className="w-full lg:w-[35%]">
            <div className="toolbar-top pb-2 flex items-center justify-between text-xs px-3">
                <h1 className="text-base font-[500] flex items-center gap-1">
                    Thanh toán({totalService})
                </h1>
                {paymentInfoService?.paymentOption === PAYMENT_OPTIONS.PAYMENT_AT_THE_COUNTER
                    ? <button
                        onClick={handleSetInModalInvoiceCreationConfirmation}
                        className="sbm group whitespace-nowrap">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                            className="icon !fill-[var(--room-empty-color-)] group-hover:!fill-white">
                            <path
                                d="M48 96l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-245.5c0-4.2-1.7-8.3-4.7-11.3l33.9-33.9c12 12 18.7 28.3 18.7 45.3L448 416c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l245.5 0c17 0 33.3 6.7 45.3 18.7l74.5 74.5-33.9 33.9L320.8 84.7c-.3-.3-.5-.5-.8-.8L320 184c0 13.3-10.7 24-24 24l-192 0c-13.3 0-24-10.7-24-24L80 80 64 80c-8.8 0-16 7.2-16 16zm80-16l0 80 144 0 0-80L128 80zm32 240a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z" />
                        </svg>
                        Lưu hoá đơn
                    </button>
                    : <button
                        onClick={handleAddServiceForRoom}
                        className="sbm group whitespace-nowrap">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                            className="icon !fill-[var(--room-empty-color-)] group-hover:!fill-white">
                            <path
                                d="M48 96l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-245.5c0-4.2-1.7-8.3-4.7-11.3l33.9-33.9c12 12 18.7 28.3 18.7 45.3L448 416c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l245.5 0c17 0 33.3 6.7 45.3 18.7l74.5 74.5-33.9 33.9L320.8 84.7c-.3-.3-.5-.5-.8-.8L320 184c0 13.3-10.7 24-24 24l-192 0c-13.3 0-24-10.7-24-24L80 80 64 80c-8.8 0-16 7.2-16 16zm80-16l0 80 144 0 0-80L128 80zm32 240a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z" />
                        </svg>
                        Thêm dịch vụ
                    </button>
                }
            </div>
            <div className="cash-fund_content h-full">
                <div className="flex gap-2 w-full">
                    <div className="w-full flex flex-col gap-2">
                        <SelectedList />
                        <PaymentSummary
                            token={token}
                            user={user}
                            handleSavePaymentInfo={handleSavePaymentInfo}
                        />
                    </div>
                </div>
            </div>
            <ModalInvoiceCreationConfirmation
                paymentInfoService={paymentInfoService}
                showModalInvoiceCreationConfirmation={showModalInvoiceCreationConfirmation}
                handleSetUnModalInvoiceCreationConfirmation={handleSetUnModalInvoiceCreationConfirmation}
                handleSubmit={handleSubmit}
            />
            {isLoading
                && <div className="fixed z-[999] bg-black bg-opacity-45 top-0 left-0 w-full h-full flex items-center justify-center">
                    <ClipLoader size={50} color="fffff" />
                </div>
            }
        </div>
    )
}
export default PaymentSection;