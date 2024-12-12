import { useAuth } from "@/context/auth.context";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import ChangeDateModal from "./modals/change_date.modal";
import CheckInModal from "./modals/check_in.modal";
import UpdateCustomerInfoModal from "./modals/update_customer_info.modal";

const fetcher = (url: string, token: string | null) =>
    fetch(url,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json());

interface Customer {
    id: number;
    name: string;
    phone: string;
    email: string;
    gender: string;
    birthday: string;
    hotel_id: number;
}

interface Booking {
    id: number;
    booking_at: string;
    check_in_at: string;
    check_out_at: string;
    children: number;
    adults: number;
    status: string;
    customer: Customer;
}

interface Room {
    id: number;
    name: string;
    clean_status: boolean;
    status: string;
    price: number;
    room_type: string;
    floor: string;
    hotel: {
        id: number;
        name: string;
    };
    bookings: Booking;
}

const RoomInfo = () => {
    const id = useParams()?.id;
    const { token } = useAuth();

    const [rooms, setRooms] = useState<Room[]>([]);
    const [booking, setBooking] = useState<Booking | null>(null);
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [numberOfCustomer, setNumberOfCustomer] = useState<Booking | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [showModalCheckIn, setShowModalCheckIn] = useState<boolean>(false);
    const [showModalUpdateCustomerInfo, setShowModalUpdateCustomerInfo] = useState<boolean>(false);

    const { data, error, isLoading } = useSWR(
        token ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/invoices/room-details/${id}` : null,
        (url: string) => fetcher(url, token),
        
    );

    useEffect(() => {
        if (data) {
            setRooms(data?.data.rooms || []);
            setBooking(data?.data.booking);
            setCustomer(data?.data.booking.customer);
            setNumberOfCustomer(data?.data.booking);
        }
    }, [data])
    
    if (isLoading) return <div>Đang tải dữ liệu...</div>;
    if (error) return <div>Đã xảy ra lỗi: {error.message}</div>;
    

    const formatDateTime = (dateString: string): string => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} - ${hours}:${minutes}`;
    };
    
    const formatForInput = (dateString: string): string => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
    
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };
    
    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('vi-VN', {
            minimumFractionDigits: 0,
        }).format(amount) + ' VNĐ';
    };

    const handleUpdateBooking = (updatedCheckIn: string, updatedCheckOut: string) => {
        setBooking((prevBooking) => ({
            ...prevBooking!,
            check_in_at: updatedCheckIn,
            check_out_at: updatedCheckOut,
        }));
    };

    const handleCheckIn = (createCheckIn: string, createCheckOut: string) => {
        setBooking((prevBooking) => ({
            ...prevBooking!,
            check_in_at: createCheckIn,
            check_out_at: createCheckOut
        }));
    };

    const handleUpdateCustomerInfo = (customerName: string, phone: string, email: string, birthday: string) => {
        setCustomer((prevCustomer) => ({
            ...prevCustomer!,
            name: customerName,
            phone: phone,
            email: email,
            birthday: birthday
        }))
    };
    
    const handleUpdateNumberOfCusTomers = (children: number, adults: number) => {
        setNumberOfCustomer((prev) => ({
            ...prev!,
            children: children,
            adults: adults
        }))
    }

    return (
        <>
            <div className="border-r !border-[var(--ht-neutral-100-)]">
                <div>
                    <div className="flex items-center justify-between p-3 border-b !border-[var(--ht-neutral-100-)]">
                        <div className="flex items-center gap-3">
                                <div className="font-semibold text-black text-base">
                                    {rooms.map((item) => (
                                        <div key={item.id}>
                                        <p>{item.name}</p>
                                        </div>
                                    ))}
                                </div>

                                <button className="group mt-1 relative">
                                <div className="bg-gray-500 w-24 text-white rounded-md py-1 hidden absolute top-full left-1/2 -translate-x-1/2 group-hover:block">
                                    Tuỳ chọn
                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2"></div>
                                </div>
                                </button>
                        </div>

                        <div>
                            <div>
                                {booking?.check_in_at ? (
                                    <Link href={`/hotel_management/room/room_invoice/${id}`}>
                                    <button className="btn-fn bg-[var(--room-not-arrived-color-100-)] text-[var(--room-not-arrived-color-)]"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 text-pink-500">
                                        <path d="M11 3L10.3374 3.23384C7.75867 4.144 6.46928 4.59908 5.73464 5.63742C5 6.67576 5 8.0431 5 10.7778V13.2222C5 15.9569 5 17.3242 5.73464 18.3626C6.46928 19.4009 7.75867 19.856 10.3374 20.7662L11 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <path d="M21 12L11 12M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Trả phòng
                                    </button>
                                    </Link>
                                ) : (
                                    <button className="btn-fn bg-[var(--room-not-checked-out-color-200-)] text-white"
                                    onClick={() => setShowModalCheckIn(true)}
                                    >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 text-white">
                                        <path d="M2 3.5V20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M22 8.5L22 20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M2 8.5L6 10.5H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M2 15.5H6M22 15.5H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6 10.5V16.5C6 18.1547 6.34533 18.5 8 18.5H17C18.6547 18.5 19 18.1547 19 16.5V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6.81362 10.5C6.89385 10.076 7.0202 9.63248 6.99567 9.19713C6.95941 8.5536 6.63697 7.96625 6.1264 7.61368C5.92478 7.47446 5.48 7.33239 5.01268 7.21093C4.3308 7.0337 3.98986 6.94508 3.59142 7.03644C3.30841 7.10133 3.06258 7.25187 2.71115 7.52079C2.67243 7.55042 2.65307 7.56523 2.62289 7.59026C2.3843 7.78812 2.17276 8.07424 2.05352 8.36034C2.03844 8.39653 2.02562 8.43102 2 8.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Nhận phòng
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="px-3">
                        <ul className="text-black font-medium">
                            <li className="py-4 border-b !border-[var(--ht-neutral-100-)]">
                                <div className="flex items-center justify-between">


                                    <div className="flex items-center gap-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#000000"} fill={"none"}>
                                            <path d="M18 2V4M6 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M10 17L9.99999 13.3472C9.99999 13.1555 9.86325 13 9.69458 13H9M13.6297 17L14.9842 13.3492C15.0475 13.1785 14.9128 13 14.7207 13H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M6 8H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>

                                        <div className="flex flex-col">
                                            <p>
                                            {booking?.check_in_at ? "Nhận phòng" : "Đặt phòng"}:{" "}
                                            {formatDateTime(booking?.check_in_at ?? booking?.booking_at ?? "")}
                                            </p>
                                            <p>Trả phòng: {formatDateTime(booking?.check_out_at ?? "")}</p>
                                        </div>

                                    </div>

                                    <button onClick={() => setShowModal(true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#279656"} fill={"none"}>
                                            <path d="M20.5 5.5H9.5C5.78672 5.5 3 8.18503 3 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M3.5 18.5H14.5C18.2133 18.5 21 15.815 21 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M18.5 3C18.5 3 21 4.84122 21 5.50002C21 6.15882 18.5 8 18.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M5.49998 16C5.49998 16 3.00001 17.8412 3 18.5C2.99999 19.1588 5.5 21 5.5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>

                                </div>
                            </li>

                            <li className="py-4 border-b !border-[var(--ht-neutral-100-)]">
                                <div className="flex items-center gap-2">
                                    {rooms.map((room, index) => (
                                    <div key={index}>Mặc định: {formatCurrency(room.price)}</div>
                                    ))}
                                </div>

                            </li>

                            <li className="py-4 border-b !border-[var(--ht-neutral-100-)] flex items-center justify-between">
                                <div className="flex items-center gap-2">

                                    <p>{numberOfCustomer?.adults} người lớn,</p>
                                    <p>{numberOfCustomer?.children} trẻ em</p>

                                </div>
                            </li>

                            <li className="py-4 border-b !border-[var(--ht-neutral-100-)] flex items-center justify-between">

                                <p>Khách hàng: {customer?.name}</p>

                                <button className="group border border-green-400 hover:bg-[var(--navbar-color-)] duration-200 rounded-full p-[1px]"
                                    onClick={() => setShowModalUpdateCustomerInfo(true)}
                                >
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="text-green-500 w-4 h-4 group-hover:text-white"
                                    >
                                    <path
                                        d="M12 4V20M20 12H4"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <ChangeDateModal
                showModal={showModal}
                closeModal={() => setShowModal(false)}
                roomName={
                rooms.length > 0 && rooms[0].name
                    ? rooms[0].name : ""
                }
                customerName={customer?.name ?? ""}

                checkInDate={
                    booking?.check_in_at
                        ? formatForInput(booking?.check_in_at)
                        : booking?.booking_at
                        ? formatForInput(booking?.booking_at)
                        : ""
                }

                checkOutDate={
                    booking?.check_out_at
                        ? formatForInput(booking?.check_out_at)
                        : ""
                }

                bookingId={booking?.id ?? 0}
                onUpdateBooking={handleUpdateBooking}

            />

            <CheckInModal
                showModal={showModalCheckIn}
                closeModal={() => setShowModalCheckIn(false)}

                checkOutAt={
                    booking?.check_out_at ? booking?.check_out_at : ""
                }
                bookingId={booking?.id ?? 0}
                onCreateCheckInDate={handleCheckIn}
            />

            <UpdateCustomerInfoModal
                showModal={showModalUpdateCustomerInfo}
                closeModal={() => setShowModalUpdateCustomerInfo(false)}
                customerName={customer?.name ?? ""}
                onUpdateCustomer={handleUpdateCustomerInfo}
                onUpdateNumberOfCustomers={handleUpdateNumberOfCusTomers}
                customerGender={booking?.customer.gender ?? ""}
            />
        </>
    )
}

export default RoomInfo;