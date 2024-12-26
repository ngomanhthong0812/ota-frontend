import { JSX, ReactNode } from "react";
interface MenuItem {
  id: string;
  name: string;
  href: string | null;
  icon: ReactNode;
  active: boolean;
  showSubMenu?: boolean;
  subMenus: MenuItem[];
}

interface RoomStatus {
  id: string;
  name: string;
  count: number;
  class: string;
  classCard: string;
  rootColor: string;
}

interface TypeRoomCard {
  map(arg0: (item: any, index: any) => JSX.Element): ReactNode;
  id: number;
  room_type_id: number; // ID loại phòng.
  overnightRate_price: number | null; // Giá qua đêm (nếu có).
  name: string;
  clean_status: false;
  status: string;
  price: number;
  room_type: string;
  floor: Floor;
  hotel: string;
  bookings: Bookings[];
}
interface Floor {
  id: number;
  name: string;
  lever: number;
  room_count: number;
  hotel_id: number;
}
interface Bookings {
  id: number;
  booking_at: string;
  check_in_at: string;
  check_out_at: string;
  status: string;
  children: number;
  adults: number;
  customer: Customer;
  invoice_id: number;
}
interface User {
  id: number;
  email: string;
  name: string;
  hotel_id: number;
  isActive: boolean;
  role: string,
}

interface UserAdmin {
  id: number;
  email: string;
  password: string;
  user_name: string;
  phone: string;
  code: string;
  hotel_id: number;
  note: string;
  status: string;
  isActive: boolean;
}

interface Category {
  id: number;
  name: string;
  description: string;
  hotel_id: number;
}

interface Services {
  id: number;
  name: string;
  description: string;
  unit_price: number;
  status: string;
  category: Category;
}

interface InvoiceItem {
  id: number;
  service_name: string;
  item_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  category: string;
  createdAt: string;
  invoice_id: number;
}

interface Customer {
  id: number;
  phone: string;
  email: string;
  gender: string;
  hotel_id: number;
  birthday: string;
  name: string;
}

interface Role {
  id: number;
  name: string;
  description: string;
  hotel_id: number;
}

interface SelectedServiceType {
  id: number;
  name: string;
  unit_price: number;
  quantity: number;
}

interface TypeDiscountForm {
  discount: number;
  note: string;
}

interface RequestPaymentService {
  paymentOption: string;
  currencyType: string;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  customerName: string;
  note: string;
  hotel_id: number;
  selectedService: SelectedServiceType[];
  discountForm: TypeDiscountForm;
  user_id: number;
}

interface InvoiceReceipt {
  id: number;
  code: string;
  amount: number;
  payment_method: string;
  note: string;
  customer_name: string;
  created_by: string;
  hotel_id: number;
  category: string;
  invoice_id: number | null;
  createdAt: string;
}

interface ResponseInvoice {
  id: number;
  status: string;
  discount_amount: number;
  discount_percentage: number;
  payment_method: string;
  code: string;
  created_by: string;
  customer_name: string;
  createdAt: string;
  amount: number;
  items: InvoiceItem[];
  customer: Customer;
}

interface ResponseInvoiceItem extends InvoiceItem {
  service: Services;
}
interface RequestTransaction {
  paymentOption: string;
  paymentMethod: string;
  currencyType: string;
  price: number;
  note: string;
  invoice_id: number;
  user_id: number;
  hotel_id: number;
}

interface ReceiptAndExpense {
  id: number;
  code: string;
  amount: number;
  payment_method: string;
  note: string;
  created_by: string;
  hotel_id: number;
  category: string;
  invoice_id: number | null;
  createdAt: string;
  type: string;
}

interface Employee {
  id: number;
  code: string;
  name: string;
  birthDate: string;
  gender: "Male" | "Female" | "Other";
  idCard: string;
  position: string;
  startDate: string;
  user_id: number;
  phoneNumber: string;
  email: string;
  facebook: string;
  address: string;
  notes: string;
  img: string;
  status: "Working" | "Resigned";
  hotel_id: number;
}

interface RoomAPIResponse {
  id: number;
  name: string;
  standard_capacity: number;
  max_capacity: number;
  standard_children: number;
  max_children: number;
  hourly_rate: number;
  daily_rate: number;
  overnight_rate: number;
  total_rooms: number;
  available_rooms: number;
  rooms: { id: number; name: string }[]; // Danh sách phòng chưa được đặt
}

interface RoomType {
  id: number;
  name: string;
  standard_capacity: number;
  max_capacity: number;
  standard_children: number;
  max_children: number;
  hourly_rate: number;
  daily_rate: number;
  overnight_rate: number;
  total_rooms: number;
  available_rooms: number;
  rooms: Room[];
}
interface Roomss {
  room_name: string;
  room_type_code: string;
  room_type_name: string;
  room_price: number;
  room_night_count: number;
  room_total_amount: number;
}

interface BookingHistory {
  booking_id: number;
  booking_status: string;
  booking_time: string;
  check_out_at: string;
  customer_name: string;
  total_amount: number;
  paid_amount: number;
  total_amount_to_pay: number;
  rooms: Roomss[];
}

interface CashTransaction {
  cashAmount: number;
}

interface BankTransaction {
  receiverAccount: string;
  receiverName: string;
  bankAmount: number;
}

interface Transaction {
  id: number;
  code: string;
  content: string;
  amount: number;
  transactionType: "income" | "expense";
  paymentType: "cash" | "bank";
  isHandedOver: boolean;
  createdAt: string;
  updatedAt: string | null;
  status: "active" | "cancelled";
  user: User;
  bankTransaction: BankTransaction | null;
  cashTransaction: CashTransaction | null;
}

interface Totals {
  cashIncome: number;
  cashExpense: number;
  bankIncome: number;
  bankExpense: number;
  totalIncome: number;
  totalExpense: number;
  totalNet: number;
}
