'use client'
import { IoClose } from "react-icons/io5";
import { BiTrash } from "react-icons/bi";
import { IoAddOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "@/context/auth.context";
import { ClipLoader } from "react-spinners";

interface IProps {
    showModalAddEmployee: boolean;
    setShowModalAddEmployee: (b: boolean) => void;
    refreshData: () => void;
}
interface AddEmployee {
    code: string,
    name: string,
    phoneNumber: string,
}

const ModalAddEmployee: React.FC<IProps> = ({ showModalAddEmployee, setShowModalAddEmployee, refreshData }) => {
    const [employeeList, setEmployeeList] = useState<AddEmployee[]>([]);
    const { token, user } = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        setEmployeeList([
            { code: generateEmployeeCode(), name: '', phoneNumber: '' },
            { code: generateEmployeeCode(), name: '', phoneNumber: '' },
        ])
    }, []);
    const generateEmployeeCode = () => {
        // Sinh một số ngẫu nhiên từ 10000 đến 99999
        const randomCode = Math.floor(Math.random() * 90000) + 10000;
        return `NV${randomCode}`;
    };
    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Ngừng sự kiện lan truyền khi click vào các phần tử con của modal
    };
    const handleAddForm = () => {
        setEmployeeList(prev => ([
            ...prev,
            {
                code: generateEmployeeCode(),
                name: '',
                phoneNumber: ''
            }
        ]));
    }
    const handleRemoveForm = (code: string) => {
        setEmployeeList(prev => prev.filter(item => item.code !== code));
    }
    const handleInputChange = (index: number, key: keyof AddEmployee, value: string) => {
        const updatedList = [...employeeList];
        updatedList[index][key] = value;
        setEmployeeList(updatedList);
    }
    const handleClose = () => {
        setEmployeeList([
            { code: generateEmployeeCode(), name: '', phoneNumber: '' },
            { code: generateEmployeeCode(), name: '', phoneNumber: '' },
        ])
        setShowModalAddEmployee(false);
    }
    const validateForm = (): string | null => {
        const emptyName = employeeList.find(item => item.name === '');
        const emptyPhone = employeeList.find(item => item.phoneNumber === '');
        if (emptyName) {
            toast.error("Tên nhân viên không được để trống")
            return "Tên nhân viên không được để trống"
        }
        if (emptyPhone) {
            toast.error("Số điện thoại không được để trống")
            return "Số điện thoại không được để trống"
        }
        return null;
    }
    const handleSubmit = async () => {
        if (!validateForm()) {
            setIsLoading(true);
            const updatedEmployeeList = employeeList.map(employee => ({
                ...employee,
                hotel_id: user?.hotel_id,
            }));
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employees`,
                    updatedEmployeeList,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Thay token vào đây
                            "Content-Type": "application/json",
                        },
                    }
                );

                // Kiểm tra phản hồi từ API
                if (response.data.statusCode === 200) {
                    console.log("Gửi thành công");
                    toast('Thiết lập nhân viên thành công');
                    refreshData();
                    setIsLoading(false);
                    handleClose();
                } else {
                    setIsLoading(false);
                    toast.error(response.data.message);
                }
            } catch (error) {
                setIsLoading(false);
                // In thông tin lỗi khi gặp sự cố
                console.log("Lỗi khi gửi dữ liệu:", error);
            }
        }

    }

    return (
        <div>
            {/* Modal Overlay */}
            {showModalAddEmployee && (
                <div
                    className={`absolute w-full top-0 left-0 min-h-[100%] bg-black bg-opacity-50 flex justify-center items-start z-50 duration-200`}
                    onClick={handleClose}
                >
                    <div
                        onClick={handleModalClick}
                        className="flex rounded-md min-w-[1050px] max-w-full bg-white mt-[50px] relative">
                        <div className="py-5 px-8 flex-1">
                            <h1 className="mb-10">
                                <span className="text-black text-[16px] font-[600]">Thêm mới nhân viên</span>
                            </h1>
                            {employeeList?.map((item, index) => (
                                <div key={item.code}>
                                    <h3 className="flex items-center justify-between px-5 mt-6 mb-2">
                                        <span className="font-[600]">Nhân viên {index + 1}</span>
                                        <BiTrash
                                            onClick={() => handleRemoveForm(item.code)}
                                            size={20}
                                            className="fill-[#5d6877] cursor-pointer" />
                                    </h3>
                                    <div className="border rounded-lg text-[13px]">
                                        <div className="grid grid-cols-2 gap-12 p-5">
                                            <div className="flex-1 flex gap-3 justify-between items-center">
                                                <span className="font-[500]">Tên nhân viên</span>
                                                <input
                                                    value={item.name}
                                                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                                                    type="text"
                                                    className="outline-none border-b border-[#9d9d9d] w-[230px] py-2 focus:border-[#0090da]" />
                                            </div>
                                            <div className="flex-1 flex gap-3 justify-between items-center">
                                                <span className="font-[500]">Số điện thoại</span>
                                                <input
                                                    value={item.phoneNumber}
                                                    onChange={(e) => handleInputChange(index, 'phoneNumber', e.target.value)}
                                                    type="text"
                                                    className="outline-none border-b border-[#9d9d9d] w-[230px] py-2 focus:border-[#0090da]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button
                                onClick={handleAddForm}
                                className="mt-5 duration-100 flex gap-2 py-[6px] px-4 border rounded-sm hover:bg-[#e5e5e5] hover:border-[#626262]">
                                <IoAddOutline size={18} className="text-black" /> Thêm nhân viên
                            </button>
                            <footer className="modal-footer mt-5">
                                <div className="flex items-center justify-end gap-3 font-[500]">
                                    <button
                                        onClick={handleClose}
                                        className="flex gap-2 border-none py-[6px] px-4 text-white bg-[#898c8d] hover:bg-[#787b7d] rounded-sm duration-200">
                                        Bỏ qua
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        className="flex gap-2 border-none py-[6px] px-4 text-white bg-[#4bac4d] hover:bg-[#419543] rounded-sm duration-200">
                                        Thêm
                                    </button>
                                </div>
                            </footer>
                        </div>
                        <div className="max-w-[250px] bg-[#e5e5e5] rounded-r-md p-8 flex items-center justify-center">
                            <img src="/staff-management.png" alt="" className="!w-full" />
                        </div>
                        <IoClose
                            onClick={handleClose}
                            size={20}
                            className="!fill-gray-400 absolute top-3 right-3 cursor-pointer" />
                    </div>
                </div>
            )}
            {isLoading
                && <div className="fixed z-[999] bg-black bg-opacity-45 top-0 left-0 w-full h-full flex items-center justify-center">
                    <ClipLoader size={50} color="fffff" />
                </div>
            }
        </div>
    )
}
export default ModalAddEmployee;