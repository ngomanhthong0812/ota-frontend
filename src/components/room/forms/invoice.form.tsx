import { useState } from "react";
import CheckOutModal from "../modals/checkout.modal";
import { useParams } from "next/navigation";
import useFormatPriceWithCommas from "@/hook/useFormatPriceWithCommas";

interface Payments {
    id: number;
    payment_date: Date;
    amount: number;
    payment_method: string;
    note: string;
    roomName: string;
}

interface InvoiceFormProps {
    handleUpdatePayments: (newPayment: Payments) => void; // Thêm prop để nhận từ page.tsx
}
const InvoiceForm = ({ handleUpdatePayments }: InvoiceFormProps) => {

    const [showModalCheckOut, setShowModalCheckOut] = useState<boolean>(false);
    const [paymentMethod, setPaymentMethod] = useState<string>("Cash");
    const [amount, setAmount] = useState<number | string>("");
    const [note, setNote] = useState<string>("Thanh toan tien phong");
    const { formatPrice } = useFormatPriceWithCommas();

    const id = useParams()?.id;
    

    const handleSubmit = () => {
        if (amount <= 0) {
            alert("Số tiền phải lớn hơn 0.");
            return;
        }
        setShowModalCheckOut(true)
    }

    return(
        <>
            <div className="flex items-center gap-6 py-2 font-medium text-black">
                <div className="flex items-center gap-2">
                    <input type="radio" name="payment-option" defaultChecked/>
                    
                    <p>
                        <span>Thanh toán</span>
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <input type="radio" name="payment-option" />
                    <p>
                        <span>Hoàn tiền</span>
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-5 py-2">
                <div className="flex flex-col col-span-1">
                    <label htmlFor="" className="mb-1">
                        Hình thức TT
                    </label>

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

                <div className="flex flex-col col-span-1">
                    <label htmlFor="" className="mb-1">
                        Tiền tệ
                    </label>

                    <select name="" id="" className="btn">
                        <option value="vnd">VND</option>
                        <option value="usd">USD</option>
                    </select>
                </div>

                <div className="flex flex-col col-span-1">
                    <label htmlFor="" className="mb-1">
                        Số tiền
                    </label>

                    <input 
                        type="number" 
                        name="soTien" 
                        className="btn"
                        value={amount === 0 ? "" : amount}
                        onChange={(e) => setAmount(Number(e.target.value))} 
                    />
                </div>
            </div>

            <div className="py-2">
                <textarea
                    name="note"
                    id="note"
                    rows={5}
                    cols={50}
                    className="w-full btn px-2"
                    placeholder="Note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                ></textarea>
            </div>

            <div className="flex justify-end border-b !border-[var(--ht-neutral-100-)] pb-2">
                <button className="btn-fn bg-blue-100 text-[#60a5fa]"
                    onClick={handleSubmit}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={24}
                        height={24}
                        color={"#1FADA4"}
                        fill={"none"}
                        >
                        <path
                        d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        />
                        <path
                        d="M14.7102 10.0611C14.6111 9.29844 13.7354 8.06622 12.1608 8.06619C10.3312 8.06616 9.56136 9.07946 9.40515 9.58611C9.16145 10.2638 9.21019 11.6571 11.3547 11.809C14.0354 11.999 15.1093 12.3154 14.9727 13.956C14.836 15.5965 13.3417 15.951 12.1608 15.9129C10.9798 15.875 9.04764 15.3325 8.97266 13.8733M11.9734 6.99805V8.06982M11.9734 15.9031V16.998"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        />
                    </svg>
                    <p>
                        <span>Thanh toán</span>
                    </p>
                </button>
            </div>

            <CheckOutModal 
                showModal={showModalCheckOut}
                closeModal={() => setShowModalCheckOut(false)}

                invoiceId={id}
                paymentMethod={paymentMethod}
                amount={amount}
                note={note}

                handleUpdatePayments={handleUpdatePayments} // Truyền hàm từ page.tsx vào
            />
        </>
    )
}

export default InvoiceForm;