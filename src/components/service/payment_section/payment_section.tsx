'use client'
import { UseSelectedService } from "@/context/selectedService.context";
import PaymentSummary from "./payment_summary";
import SelectedList from "./selected_list";

interface IProps { }

const PaymentSection: React.FC<IProps> = () => {
    const { totalService } = UseSelectedService();
    return (
        <div className="w-full lg:w-[35%]">
            <div className="toolbar-top pb-2 flex items-center justify-between text-xs px-3">
                <h1 className="text-base font-[500] flex items-center gap-1">
                    Thanh toán({totalService})
                </h1>
                <a href="./invoice_details.html" className="sbm group whitespace-nowrap">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                        className="icon !fill-[var(--room-empty-color-)] group-hover:!fill-white">
                        <path
                            d="M48 96l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-245.5c0-4.2-1.7-8.3-4.7-11.3l33.9-33.9c12 12 18.7 28.3 18.7 45.3L448 416c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l245.5 0c17 0 33.3 6.7 45.3 18.7l74.5 74.5-33.9 33.9L320.8 84.7c-.3-.3-.5-.5-.8-.8L320 184c0 13.3-10.7 24-24 24l-192 0c-13.3 0-24-10.7-24-24L80 80 64 80c-8.8 0-16 7.2-16 16zm80-16l0 80 144 0 0-80L128 80zm32 240a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z" />
                    </svg>
                    Lưu hoá đơn
                </a>
            </div>
            <div className="cash-fund_content h-full">
                <div className="flex gap-2 w-full">
                    <div className="w-full flex flex-col gap-2">
                        <SelectedList />
                        <PaymentSummary />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PaymentSection;