import {
    Dialog,
    DialogContent,
    DialogTitle,
  } from "@/components/ui/dialog"
import { useAuth } from "@/context/auth.context";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { toast } from "react-toastify";

interface IProps {
    showModal: boolean;
    closeModal: () => void;
    customerName: string;
    onUpdateCustomer: (customerName: string, phone: string, email: string, birthday: string) => void;
    onUpdateNumberOfCustomers: (children: number, adults: number) => void;
    customerGender: string;
}

const fetcher = (url: string, token: string | null) =>
    fetch(url,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json());
const UpdateCustomerInfoModal = (props: IProps) => {

    const { showModal, closeModal, customerName, onUpdateCustomer, onUpdateNumberOfCustomers, customerGender } = props;
    const id = useParams()?.id;
    const { token } = useAuth();

    const [ roomName, setRoomName ] = useState<string>("");
    const [ customerId, setCustomerId ] = useState<number>(0);
    const [ bookingId, setBookingId ] = useState<number>(0);
    const [ editCustomerName, setEditCustomerName ] = useState<string>("");
    const [ children, setChildren ] = useState<number>(0);
    const [ adults, setAdults ] = useState<number>(0);
    const [phone, setPhone] = useState<string>("");
    const [ email, setEmail ] = useState<string>("");
    const [ birthday, setBirthday ] = useState<string>("");
    const [ gender, setGender ] = useState<string>(customerGender);
    const [clicked, setClicked] = useState(false); 

    const { data, error, isLoading } = useSWR(
        token ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/invoices/room-details/${id}` : null,
        (url: string) => fetcher(url, token),
        
    );

    useEffect(() => {
        if (data) {
            setRoomName(data?.data.rooms?.[0]?.name || "");
            setCustomerId(data?.data.booking?.customer?.id || 0);
            setBookingId(data?.data.booking?.id || 0);
            setEditCustomerName(data?.data.booking?.customer?.name || "");
            setAdults(data?.data.booking?.adults || 0);
            setChildren(data?.data.booking?.children || 0);
            setPhone(data?.data.booking?.customer?.phone || "");
            setEmail(data?.data.booking?.customer?.email || "");
            setBirthday(data?.data.booking?.customer?.birthday?.split("T")[0] || "");
        }
    }, [data]);

    if (isLoading) return "Loading...";
    if (error) return "An error has occurred.";

    const formatBirthdayForInput = (dateString: string): string => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
    
        return `${year}-${month}-${day}`;
    };

    const handleClick = (value: string) => {
        setGender(value); // Cập nhật giá trị của gender khi bấm vào nút
        setClicked(true); // Thay đổi trạng thái clicked để giữ màu trắng
    };

    const handleSubmit = () => {
        handleUpdateCustomer();
        handleUpdateNumberOfCustomers();
    }
    
    const handleUpdateCustomer = async () => {
        try {

            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customers/${customerId}`,
                {
                    phone: String(phone),
                    email: email,
                    birthday: birthday,
                    name: editCustomerName,
                    gender: gender,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                onUpdateCustomer(editCustomerName, phone, email, birthday)
                toast.success("Cập nhật thông tin khách hàng thành công")
            }
        } catch (error) {
            console.error("Failed to update customer:", error);
            toast.error("Không thể cập nhật khách hàng.");
        } finally {
            closeModal();
        }
    };

    const handleUpdateNumberOfCustomers = async () => {
        try {

            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings/${bookingId}`,
                {
                    children: children,
                    adults: adults,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                onUpdateNumberOfCustomers(children, adults)
                toast.success("Cập nhật số lượng khách hàng thành công")
            }
        } catch (error) {
            console.error("Failed to update customer:", error);
            toast.error("Không thể cập nhật số lượng khách hàng.");
        } finally {
            closeModal();
        }
    }

    return (
        <Dialog open={showModal} onOpenChange={closeModal}>
            <DialogContent className="max-w-[1000px] overflow-auto p-0 bg-transparent border-none">

                <div className="rounded-xl">
                    <DialogTitle 
                        className="text-white font-medium text-base bg-[var(--room-empty-color-)] px-4 py-2 rounded-t-xl">
                        Sửa khách
                    </DialogTitle>

                    <div className="bg-white">
                        <div className="border-b">
                            <div className="grid grid-cols-3 p-3">
                                <div className="col-span-1 flex items-center gap-2 text-base">
                                    <svg className="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M4 9.05H3v2h1v-2Zm16 2h1v-2h-1v2ZM10 14a1 1 0 1 0 0 2v-2Zm4 2a1 1 0 1 0 0-2v2Zm-3 1a1 1 0 1 0 2 0h-2Zm2-4a1 1 0 1 0-2 0h2Zm-2-5.95a1 1 0 1 0 2 0h-2Zm2-3a1 1 0 1 0-2 0h2Zm-7 3a1 1 0 0 0 2 0H6Zm2-3a1 1 0 1 0-2 0h2Zm8 3a1 1 0 1 0 2 0h-2Zm2-3a1 1 0 1 0-2 0h2Zm-13 3h14v-2H5v2Zm14 0v12h2v-12h-2Zm0 12H5v2h14v-2Zm-14 0v-12H3v12h2Zm0 0H3a2 2 0 0 0 2 2v-2Zm14 0v2a2 2 0 0 0 2-2h-2Zm0-12h2a2 2 0 0 0-2-2v2Zm-14-2a2 2 0 0 0-2 2h2v-2Zm-1 6h16v-2H4v2ZM10 16h4v-2h-4v2Zm3 1v-4h-2v4h2Zm0-9.95v-3h-2v3h2Zm-5 0v-3H6v3h2Zm10 0v-3h-2v3h2Z"/>
                                    </svg>
                                    <p>{roomName}</p>
                                </div>

                                <div className="col-span-2 ">
                                    <div className="flex items-center gap-3">
                                        <div className="w-20 pl-2 border flex items-center rounded-md focus:border-green-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 text-black">
                                                <path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="currentColor" strokeWidth="1.5" />
                                            </svg>

                                            <input 
                                                type="number" 
                                                className="w-full p-2 outline-none"
                                                value={adults}
                                                onChange={(e) => setAdults(Number(e.target.value))}
                                            />
                                        </div>

                                        <div className="w-20 pl-2 border flex items-center rounded-md focus:border-green-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 text-black">
                                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M14 5.73791C14 5.73791 12.8849 6.23808 12.1017 5.85651C11.1464 5.39118 10.1991 3.44619 12.0914 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M8.00897 9H8M16 9H15.991" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M8 15C8.91212 16.2144 10.3643 17 12 17C13.6357 17 15.0879 16.2144 16 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>

                                            <input 
                                                type="number" 
                                                className="w-full p-2 outline-none"
                                                value={children}
                                                onChange={(e) => setChildren(Number(e.target.value))}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 p-3 gap-3">
                            <div className="col-span-1 ">
                                <div>
                                    <ul>
                                        <li className="flex items-center justify-between text-sm border hover:border-green-400 py-3 px-2 rounded-md">
                                            <div className="flex items-center gap-3">
                                                <p>Khách hàng: {customerName}</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-span-2 ">
                                <div className="flex flex-col">
                                    <label className="text-black text-sm mb-1 font-medium">Tên khách</label>
                                    
                                    <div className="grid grid-cols-3 gap-5">
                                        <div className="col-span-2">
                                            <input 
                                                type="text" 
                                                id="userName" 
                                                className="btn"
                                                value={editCustomerName}
                                                onChange={(e) => setEditCustomerName(e.target.value)}
                                            />
                                        </div>
                
                                        <div className="flex items-center gap-2">
                                            <button
                                                className={`w-full p-2 rounded-[6px] text-white border border-[var(--room-empty-color-200-)] font-medium 
                                                ${clicked && gender === 'Male' ? 'bg-white text-[var(--room-empty-color-200-)]' : 'bg-[var(--room-empty-color-200-)] hover:bg-white hover:text-[var(--room-empty-color-200-)]'}`}
                                                onClick={() => handleClick('Male')} // Truyền giá trị vào hàm handleClick
                                            >
                                                Nam
                                            </button>

                                            <button
                                                className={`w-full p-2 rounded-[6px] text-white border border-[var(--room-not-arrived-color-200-)] font-medium 
                                                ${clicked && gender === 'Female' ? 'bg-white text-[var(--room-not-arrived-color-200-)]' : 'bg-[var(--room-not-arrived-color-200-)] hover:bg-white hover:text-[var(--room-not-arrived-color-200-)]'}`}
                                                onClick={() => handleClick('Female')} // Truyền giá trị vào hàm handleClick
                                            >
                                                Nữ
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-5 mt-2">
                                    <div className="flex flex-col">
                                        <label className="text-black text-sm mb-1 font-medium">Di động</label>
                                        <input 
                                            type="tel" 
                                            id="phone" 
                                            className="btn"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            inputMode="tel"  // Đảm bảo người dùng chỉ có thể nhập số
                                            pattern="^[0-9]{10,15}$"  // Đảm bảo đầu vào chỉ chứa số
                                        />

                                    </div>

                                    <div className="flex flex-col">
                                        <label className="text-black text-sm mb-1 font-medium">Email</label>
                                        <input 
                                            type="text" 
                                            id="email" 
                                            className="btn"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="text-black text-sm mb-1 font-medium">Ngày sinh</label>
                                        <input 
                                            type="date" 
                                            className="btn" 
                                            id="date-of-birth"
                                            value={formatBirthdayForInput(birthday)}
                                            onChange={(e) => setBirthday(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="mt-2">
                                    <textarea name="note" id="note" rows={2} cols={50} className="w-full btn" placeholder="Ghi chú"></textarea>
                                </div>
                            </div>
                        </div>

                        <footer className="modal-footer p-3">
                            <div className="flex items-center justify-end gap-x-5 font-medium">
                                <button 
                                    className="w-24 p-2 rounded-[6px] text-white border border-[var(--room-empty-color-200-)]
                                                font-medium bg-[var(--room-empty-color-200-)] hover:bg-white hover:text-[var(--room-empty-color-200-)]"
                                    onClick={() => closeModal()}      
                                >
                                    Đóng
                                </button>

                                <button 
                                    className="w-24 p-2 rounded-[6px] text-white border border-[var(--room-not-arrived-color-200-)]
                                                font-medium bg-[var(--room-not-arrived-color-200-)] hover:bg-white hover:text-[var(--room-not-arrived-color-200-)]"
                                    onClick={handleSubmit}
                                    >
                                    Lưu
                                </button>
                            </div>
                        </footer>
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateCustomerInfoModal;