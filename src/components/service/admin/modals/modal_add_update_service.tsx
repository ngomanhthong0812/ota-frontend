'use client'
import { IoBan, IoClose } from "react-icons/io5";
import { BiPencil, BiSave, BiTrash } from "react-icons/bi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "@/context/auth.context";
import { ClipLoader } from "react-spinners";
import { Services } from "@/types/backend";

interface IProps {
    data?: Services;
    showModalAddAndUpdateService: boolean;
    setShowModalAddAndUpdateService: (b: boolean) => void;
    refreshData: () => void;
    serviceList?: Services[];
}
interface ServiceForm {
    name: string,
    description: string,
    unit_price: number,
    category: string,
}

interface ServiceRequest {
    id: number | undefined,
    name: string,
    description: string,
    unit_price: number,
    category_id: number | undefined,
}

const ModalAddAndUpdateService: React.FC<IProps> = ({ data, showModalAddAndUpdateService, setShowModalAddAndUpdateService, refreshData, serviceList }) => {
    const { token, user } = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [scrollY, setScrollY] = useState(0); // Biến lưu vị trí cuộn hiện tại
    const [savedScrollY, setSavedScrollY] = useState(0); // Biến lưu vị trí cuộn trước khi mở modal

    const [serviceForm, setServiceForm] = useState<ServiceForm>({
        name: '',
        description: '',
        unit_price: 0,
        category: '',
    });
    const [serviceRequest, setServiceRequest] = useState<ServiceRequest>({
        id: undefined,
        name: '',
        description: '',
        unit_price: 0,
        category_id: undefined,
    });

    useEffect(() => {
        if (data) {
            resetForm();
        }
    }, [data])

    useEffect(() => {
        const category = serviceList?.find(role => role.name === serviceForm.category);

        setServiceRequest({
            id: data?.id,
            name: serviceForm.name,
            description: serviceForm.description,
            unit_price: serviceForm.unit_price,
            category_id: category?.id,
        })
    }, [serviceForm, user])

    const resetForm = () => {
        setServiceForm({
            name: data?.name || '',
            description: data?.description || '',
            unit_price: data?.unit_price || 0,
            category: data?.category.name || '',
        })
    }
    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Ngừng sự kiện lan truyền khi click vào các phần tử con của modal
    };

    const handleClose = () => {
        resetForm();
        setShowModalAddAndUpdateService(false);
    }
    const validateForm = (): boolean => {
        if (!serviceForm?.name?.trim()) {
            toast.error("Vui lòng nhập Tên dịch vụ trước khi lưu.")
            return false;
        }
        if (serviceForm?.unit_price <= 0) {
            toast.error("Vui lòng nhập Giá dịch vụ trước khi lưu.")
            return false;
        }
        if (!serviceForm?.category?.trim()) {
            toast.error("Vui lòng chọn loại dịch vụ.")
            return false;
        }
        return true;
    }
    const handleAdd = async () => {
        if (validateForm()) {
            setIsLoading(true);
            try {
                const response = await axios.post('http://localhost:8080/api/services', cleanRequestData(serviceRequest), {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                // Kiểm tra phản hồi từ API
                if (response.data.statusCode === 200) {
                    toast('Cập nhật dữ liệu thành công');
                    refreshData();
                    setIsLoading(false);
                    handleClose();
                } else {
                    setIsLoading(false);
                    toast.error(response.data.message);
                }
            } catch (error) {
                setIsLoading(false);
                handleClose();
                // In thông tin lỗi khi gặp sự cố
                console.log("Lỗi khi gửi dữ liệu:", error);
            }
        }
    }
    const handleUpdate = async () => {
        if (validateForm()) {
            setIsLoading(true);
            try {
                const response = await axios.put('http://localhost:8080/api/services', cleanRequestData(serviceRequest), {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                // Kiểm tra phản hồi từ API
                if (response.data.statusCode === 200) {
                    toast('Cập nhật dữ liệu thành công');
                    refreshData();
                    setIsLoading(false);
                    handleClose();
                } else {
                    setIsLoading(false);
                    toast.error(response.data.message);
                }
            } catch (error) {
                setIsLoading(false);
                handleClose();
                // In thông tin lỗi khi gặp sự cố
                console.log("Lỗi khi gửi dữ liệu:", error);
            }
        }
    }

    const cleanRequestData = (data: any) => {
        return Object.fromEntries(
            Object.entries(data).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
        );
    }

    useEffect(() => {
        if (!showModalAddAndUpdateService) {
            window.scrollTo(0, savedScrollY);
        } else {
            setSavedScrollY(scrollY)
            window.scrollTo(0, 0);
        }
    }, [showModalAddAndUpdateService]);


    return (
        <div>
            {/* Modal Overlay */}
            {showModalAddAndUpdateService && (
                <div
                    className={`absolute w-full top-0 left-0 min-h-[100%] bg-black bg-opacity-50 flex justify-center items-start z-50 duration-200`}
                    onClick={handleClose}
                >
                    <div
                        onClick={handleModalClick}
                        className={`rounded-md min-w-[800px] max-w-full bg-white relative mt-[50px] py-5 px-8`}>
                        <div >
                            <h1 >
                                <span className="text-black text-[16px] font-[600]">
                                    {!data
                                        ? 'Thêm dịch vụ'
                                        : 'Sửa dịch vụ'}
                                </span></h1>
                            <IoClose
                                onClick={handleClose}
                                size={20}
                                className="!fill-gray-400 absolute top-3 right-3 cursor-pointer" />
                        </div>
                        <div className="text-[13px] rounded-b-md mt-3">
                            <div className="grid grid-cols-2 gap-y-3 gap-x-8">
                                <div className="flex-1 flex gap-3 justify-between items-center">
                                    <span className="font-[500]">Tên dịch vụ</span>
                                    <input
                                        value={serviceForm?.name}
                                        onChange={e => setServiceForm(prev => ({ ...prev, name: e.target.value }))}
                                        type="text"
                                        className="outline-none border-b border-[#9d9d9d] w-[230px] py-2 focus:border-[#0090da]" />
                                </div>
                                <div className="flex-1 flex gap-3 justify-between items-center">
                                    <span className="font-[500]">Giá dịch vụ</span>
                                    <input
                                        value={serviceForm?.unit_price}
                                        onChange={e => setServiceForm(prev => ({ ...prev, unit_price: Number(e.target.value) }))}
                                        type="number"
                                        className="outline-none border-b border-[#9d9d9d] w-[230px] py-2 focus:border-[#0090da]" />
                                </div>
                                <div className="flex-1 flex gap-3 justify-between items-center">
                                    <span className="font-[500]">Mô tả</span>
                                    <textarea
                                        value={serviceForm?.description}
                                        onChange={e => {
                                            setServiceForm(prev => ({ ...prev, description: e.target.value }));
                                            e.target.style.height = "auto"; // Reset chiều cao để đo lại
                                            e.target.style.height = `${e.target.scrollHeight}px`; // Điều chỉnh chiều cao theo nội dung
                                        }}
                                        rows={1} // Số dòng hiển thị mặc định
                                        className="outline-none border border-[#9d9d9d] w-[230px] py-2 px-2 rounded-sm overflow-hidden" />
                                </div>
                                {serviceList && (
                                    <div className="flex-1 flex gap-3 justify-between items-center">
                                        <span className="font-[500]">Vai trò</span>
                                        <select
                                            value={serviceForm?.category}
                                            onChange={(e) => setServiceForm((prev) => ({ ...prev, category: e.target.value }))}
                                            className="outline-none border-b border-[#9d9d9d] w-[230px] py-2 focus:border-[#0090da] bg-white">
                                            <option value="" disabled hidden>--Chọn vai trò--</option>
                                            {serviceList?.map((service: Services) => (
                                                <option
                                                    value={service.name}
                                                    key={service.id}>{service.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                            </div>
                        </div>

                        <footer className="modal-footer mt-10">
                            <div className="flex items-center justify-end gap-3 font-[500]">
                                <button
                                    onClick={data ? handleUpdate : handleAdd}
                                    className="flex gap-2 border-none py-[6px] px-4 text-white bg-[#4bac4d] hover:bg-[#419543] rounded-sm duration-200">
                                    <BiSave size={20} /> Lưu
                                </button>
                                <button
                                    onClick={handleClose}
                                    className="flex gap-2 border-none py-[6px] px-4 text-white bg-[#898c8d] hover:bg-[#787b7d] rounded-sm duration-200">
                                    <IoBan size={20} /> Bỏ qua
                                </button>
                            </div>
                        </footer>
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
export default ModalAddAndUpdateService;