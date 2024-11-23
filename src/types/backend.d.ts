import { ReactNode } from 'react';
interface MenuItem {
    id: string,
    name: string,
    href: string | null,
    icon: ReactNode,
    active: boolean;
    showSubMenu?: boolean,
    subMenus: MenuItem[];
}

interface RoomStatus {
    id: string,
    name: string,
    count: number
    class: string,
    classCard: string,
    rootColor: string,
}

interface TypeRoomCard {
    id: number,
    name: string,
    clean_status: false,
    status: string,
    price: number,
    room_type: string,
    floor: Floor,
    hotel: string,
    bookings: Bookings[],
}
interface Floor {
    id: number,
    name: string,
    lever: number,
    room_count: number,
    hotel_id: number,
}
interface Bookings {
    id: number,
    check_in_at: string,
    check_out_at: string,
    status: string,
}
interface User {
    id: number,
    email: string,
    name: string,
    hotel_id: number,
    isActive: boolean,
}

interface Category {
    id: number,
    name: string,
    description: string,
    hotel_id: number,
}

interface Services {
    id: number,
    name: string,
    description: string,
    unit_price: number,
    category: Category
}


interface InvoiceItem {
    id: number,
    service_name: string,
    item_name: string,
    quantity: number,
    unit_price: number,
    total_price: number,
    invoice_id: number,
}

interface Customer {
    id: number,
    phone: string,
    email: string,
    gender: string,
    hotel_id: number,
    birthday: string,
    name: string,
}

interface SelectedServiceType {
    id: number,
    name: string,
    unit_price: number,
    quantity: number,
}

interface TypeDiscountForm {
    discount: number,
    note: string,
}

interface RequestPaymentService {
    paymentOption: string,
    currencyType: string,
    totalPrice: number,
    paymentMethod: PaymentMethod,
    customerName: string,
    note: string,
    hotel_id: number | null,
    selectedService: SelectedServiceType[],
    discountForm: TypeDiscountForm,
    created_by: string | null,
}

interface InvoiceReceipt {
    id: number,
    code: string,
    amount: number,
    payment_method: string,
    note: string,
    customer_name: string,
    created_by: string,
    hotel_id: number,
    category: string,
    invoice_id: number | null,
    createdAt: string,
}

interface ResponseInvoice {
    id: number,
    status: string,
    discount_amount: number,
    discount_percentage: number,
    payment_method: string,
    code: string,
    created_by: string,
    customer_name: string,
    createdAt: string,
    amount: number,
    items: InvoiceItem[],
    customer: Customer,
}
