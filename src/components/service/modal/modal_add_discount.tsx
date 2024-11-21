import {
    Dialog,
    DialogContent,
    DialogTitle
} from "@/components/ui/dialog"
import React from "react"

interface IProps {
    showModaAddDiscount: boolean,
    handleSetUnModalAddDiscount: () => void,
}

const ModalAddDiscount: React.FC<IProps> = ({ showModaAddDiscount, handleSetUnModalAddDiscount }) => {
    return (
        <Dialog open={showModaAddDiscount} onOpenChange={(open) => {
            if (!open) {
                handleSetUnModalAddDiscount();
            }
        }}>
            <DialogContent>
                <DialogTitle className="font-[500]">Thêm giảm giá</DialogTitle>
                <div className="h-auto bg-white text-[15px]">
                    <div>
                        <div className="flex items-center gap-2">
                            <span>Giảm giá (%):</span>
                            <input type="number" min="0" max="100" placeholder="Nhập % giảm giá"
                                className="btn !w-auto !py-1 flex-1" />
                        </div>
                        <div className="flex modal-body mt-3">
                            <textarea name="note" id="note" rows={3} cols={50} className="btn"
                                placeholder="Lý do giảm giá" />
                        </div>
                    </div>

                    <footer className="modal-footer">
                        <div className="flex items-center justify-end gap-x-5 py-3 font-[500]">
                            <button
                                onClick={handleSetUnModalAddDiscount}
                                className="text-[#d147a3] w-28 py-1 rounded-md border border-[#d147a3] hover:bg-[#d147a3] hover:text-white duration-200">
                                Bỏ qua
                            </button>
                            <button
                                className="w-28 py-1 bg-white border border-[var(--navbar-color-)] text-[var(--navbar-color-)]  rounded-md hover:bg-[var(--navbar-color-)] hover:text-white duration-200">
                                Thêm
                            </button>
                        </div>
                    </footer>
                </div>
            </DialogContent>
        </Dialog >
    )
}
export default ModalAddDiscount;
