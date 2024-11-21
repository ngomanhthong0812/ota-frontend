import PaymentSection from "@/components/service/payment_section/payment_section";
import ServiceList from "@/components/service/service_list/service_list";

interface IProps { }
const SalesInvoiceCreationPage: React.FC<IProps> = () => {
    return (
        <div className="flex flex-col lg:flex-row gap-2">
            <ServiceList />
            <PaymentSection />
        </div>
    );
}

export default SalesInvoiceCreationPage