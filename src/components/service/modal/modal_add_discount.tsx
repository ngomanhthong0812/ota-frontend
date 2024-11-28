'use client'
import {
    Dialog,
    DialogContent,
    DialogTitle
} from "@/components/ui/dialog"
import { TypeDiscountForm } from "@/types/backend";
import React, { useState } from "react"

interface IProps {
    showModaAddDiscount: boolean,
    handleSetUnModalAddDiscount: () => void,
    handleSetDicountForm: (discountValue: TypeDiscountForm) => void,
}

const ModalAddDiscount: React.FC<IProps> = ({ showModaAddDiscount, handleSetUnModalAddDiscount, handleSetDicountForm }) => {
    const [discount, setDiscount] = useState<number>(0);
    const [note, setNote] = useState<string>('');

    const handleSaveDicount = () => {
        if (discount >= 0 && discount <= 100) {
            handleSetDicountForm({ discount, note });
        }
        handleSetUnModalAddDiscount();
    }

    return (
        <Dialog
            open={showModaAddDiscount}
            onOpenChange={(open) => {
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
                            <input type="number"
                                min={0}
                                max={100}
                                placeholder="Nhập % giảm giá"
                                className="btn !w-auto !py-1 flex-1"
                                value={discount}
                                onChange={(e) => setDiscount(Number(e.target.value))}
                            />
                        </div>
                        <div className="flex modal-body mt-3">
                            <textarea
                                name="note"
                                id="note"
                                rows={3}
                                cols={50}
                                className="btn"
                                placeholder="Lý do giảm giá"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
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
                                onClick={handleSaveDicount}
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
