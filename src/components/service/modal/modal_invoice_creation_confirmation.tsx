import {
    Dialog,
    DialogContent,
    DialogTitle
} from "@/components/ui/dialog"
import useFormatPriceWithCommas from "@/hook/useFormatPriceWithCommas";
import { RequestPaymentService } from "@/types/backend"
import React from "react"

interface IProps {
    paymentInfoService: RequestPaymentService,
    showModalInvoiceCreationConfirmation: boolean,
    handleSetUnModalInvoiceCreationConfirmation: () => void,
    handleSubmit: () => void,
}

const ModalInvoiceCreationConfirmation: React.FC<IProps> = ({
    paymentInfoService,
    showModalInvoiceCreationConfirmation,
    handleSetUnModalInvoiceCreationConfirmation,
    handleSubmit,
}) => {
    const { formatPrice } = useFormatPriceWithCommas();

    return (
        <Dialog
            open={showModalInvoiceCreationConfirmation}
            onOpenChange={(open) => {
                if (!open) {
                    handleSetUnModalInvoiceCreationConfirmation();
                }
            }}>
            <DialogContent className="bg-white rounded-xl min-w-[700px] max-h-full overflow-auto p-0 bg-transparent border-none">
                <div className="bg-white rounded-xl">
                    <DialogTitle
                        className="text-white font-medium text-base bg-[var(--room-empty-color-)] px-4 py-2 rounded-t-xl">
                        Xác nhận tạo hoá đơn
                    </DialogTitle>
                    <div className="px-4 pt-3 flex flex-col gap-7 text-[14px] text-[#656565]">
                        <h4 className="text-xs text-red-500">Đề nghị kiểm tra lại thông tin hoá đơn trước khi lưu</h4>
                        <div className="flex flex-col gap-4 px-4">
                            <p className="flex items-center justify-between">
                                <span>Khách hàng</span>
                                <span>{paymentInfoService?.customerName}</span>
                            </p>
                            <p className="flex items-center justify-between">
                                <span>Tổng tiền</span>
                                <span>VND {formatPrice(String(paymentInfoService?.totalPrice))}</span>
                            </p>
                            <p className="flex items-center justify-between">
                                <span>Tổng giảm giá</span>
                                <span>VND {paymentInfoService?.totalPrice
                                    ? formatPrice(String(paymentInfoService?.totalPrice * (paymentInfoService?.discountForm?.discount / 100)))
                                    : 0}
                                </span>
                            </p>
                            <p className="flex items-center justify-between">
                                <span>Đã thanh toán</span>
                                <span>VND {formatPrice(String(paymentInfoService?.totalPrice - (paymentInfoService?.totalPrice * (paymentInfoService?.discountForm?.discount / 100))))}</span>
                            </p>
                            <p className="flex items-center justify-between">
                                <span>Còn lại</span>
                                <span>VND 0</span>
                            </p>
                        </div>
                    </div>

                    <footer className="modal-footer px-4 py-3 rounded-b-xl text-[14px]">
                        <div className="flex items-center justify-end gap-x-5 py-3 font-[500]">
                            <button
                                onClick={handleSetUnModalInvoiceCreationConfirmation}
                                className="text-[#d147a3] w-28 py-1 rounded-md border border-[#d147a3] hover:bg-[#d147a3] hover:text-white duration-200">
                                Bỏ qua
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="w-28 py-1 bg-white border border-[var(--navbar-color-)] text-[var(--navbar-color-)]  rounded-md hover:bg-[var(--navbar-color-)] hover:text-white duration-200">
                                Lưu
                            </button>
                        </div>
                    </footer>
                </div>
            </DialogContent>
        </Dialog >
    )
}
export default ModalInvoiceCreationConfirmation;
