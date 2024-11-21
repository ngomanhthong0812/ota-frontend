import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CurrencySelect from "../selects/currency.select";
import PaymentMethodSelect from "../selects/payment_method.select";

const CheckOutAndPayModal = () => {
    return (
        <Dialog>
            <DialogTrigger>Trả phòng</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Thanh toán</DialogTitle>
                </DialogHeader>
                <div className="mt-3">
                    <ul>
                        <li>
                            <div className="flex items-center justify-between">
                                <p className="room-name">City view 202</p>
        
                                <p className="room-fee text-red-500">+ VNĐ 600,000</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="grid grid-cols-3 gap-5 mt-5">
                    <div className="flex flex-col col-span-2">
                        <PaymentMethodSelect/>
                    </div>

                    <div className="flex flex-col col-span-1">
                        <CurrencySelect/>

                    </div>
                </div>

                <div>
                    <div className="flex items-center mt-3 gap-2">
                        <input 
                            type="checkbox"
                        />
                        Gửi mail cho khách
                    </div>
                </div>

                
                <DialogFooter>
                    <div className="flex items-center justify-end gap-x-10 py-3 font-medium">
                        <div className="flex items-center justify-end gap-x-5 py-3 font-semibold">
                            <button 
                                className="text-[#d147a3] w-28 py-1 rounded-md border border-[#d147a3] hover:bg-[#d147a3] hover:text-white duration-200">
                                Bỏ qua
                            </button>
                            <button 
                                className="w-28 py-1 bg-white border border-[var(--navbar-color-)] text-[var(--navbar-color-)]  rounded-md hover:bg-[var(--navbar-color-)] hover:text-white duration-200">
                                Thanh toán
                            </button>
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CheckOutAndPayModal;