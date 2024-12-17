'use client'
import { IoBan, IoClose } from "react-icons/io5";
import { BiPencil, BiSave, BiTrash } from "react-icons/bi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "@/context/auth.context";
import { ClipLoader } from "react-spinners";
import { Category, Services } from "@/types/backend";
import ModalConfirm from "@/components/modal_confirm";
import { CgTrash } from "react-icons/cg";

interface IProps {
    data?: Category | null;
    showModalAddAndUpdateCategory: boolean;
    setShowModalAddAndUpdateCategory: (b: boolean) => void;
    refreshData: () => void;
}
interface CategoryForm {
    name: string,
    description: string,
}

interface CategoryRequest {
    id: number | undefined,
    name: string,
    description: string,
    hotel_id: number | undefined,
}

const ModalAddAndUpdateCategory: React.FC<IProps> = ({ data, showModalAddAndUpdateCategory, setShowModalAddAndUpdateCategory, refreshData }) => {
    const { token, user } = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [scrollY, setScrollY] = useState(0); // Biến lưu vị trí cuộn hiện tại
    const [savedScrollY, setSavedScrollY] = useState(0); // Biến lưu vị trí cuộn trước khi mở modal

    const [showModalConfirmDelete, setShowModalConfirmDelete] = useState(false);

    const [categoryForm, setCategoryForm] = useState<CategoryForm>({
        name: '',
        description: '',
    });
    const [categoryRequest, setCategoryRequest] = useState<CategoryRequest>({
        id: undefined,
        name: '',
        description: '',
        hotel_id: undefined,
    });

    useEffect(() => {
        if (data) {
            resetForm();
        }
    }, [data])

    useEffect(() => {
        setCategoryRequest({
            id: data?.id,
            name: categoryForm.name,
            description: categoryForm.description,
            hotel_id: user?.hotel_id,
        })
    }, [categoryForm, user])

    const resetForm = () => {
        setCategoryForm({
            name: data?.name || '',
            description: data?.description || ''
        })
    }
    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Ngừng sự kiện lan truyền khi click vào các phần tử con của modal
    };

    const handleClose = () => {
        resetForm();
        setShowModalAddAndUpdateCategory(false);
    }
    const validateForm = (): boolean => {
        if (!categoryForm?.name?.trim()) {
            toast.error("Vui lòng nhập Tên loại dịch vụ trước khi lưu.")
            return false;
        }
        return true;
    }
    const handleAdd = async () => {
        if (validateForm()) {
            setIsLoading(true);
            try {
                const response = await axios.post('http://localhost:8080/api/categories', cleanRequestData(categoryRequest), {
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
            const newData = { ...categoryRequest, hotel_id: undefined }
            try {
                const response = await axios.put('http://localhost:8080/api/categories', cleanRequestData(newData), {
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

    const handleDelete = async () => {
        if (data?.id) {
            try {
                const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/${data.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                // Kiểm tra phản hồi từ API
                if (response.data.statusCode === 200) {
                    console.log("Gửi thành công");
                    setShowModalConfirmDelete(false);
                    handleClose();
                    toast(`Xoá loại dịch vụ ${data?.name} thành công`);
                    refreshData();
                } else {
                    setShowModalConfirmDelete(false);
                    handleClose();
                    toast.error(response.data.message);
                }
            } catch (error) {
                // In thông tin lỗi khi gặp sự cố
                setShowModalConfirmDelete(false);
                handleClose();
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
        if (!showModalAddAndUpdateCategory) {
            window.scrollTo(0, savedScrollY);
        } else {
            setSavedScrollY(scrollY)
            window.scrollTo(0, 0);
        }
    }, [showModalAddAndUpdateCategory]);


    return (
        <div>
            {/* Modal Overlay */}
            {showModalAddAndUpdateCategory && (
                <div
                    className={`absolute w-full top-0 left-0 min-h-[100%] bg-black bg-opacity-50 flex justify-center items-start z-50 duration-200`}
                    onClick={handleClose}
                >
                    <div
                        onClick={handleModalClick}
                        className={`rounded-md min-w-[500px] max-w-full bg-white relative mt-[50px] py-5 px-8`}>
                        <div >
                            <h1 >
                                <span className="text-black text-[16px] font-[600]">
                                    {!data
                                        ? 'Thêm loại dịch vụ'
                                        : 'Sửa loại dịch vụ'}
                                </span></h1>
                            <IoClose
                                onClick={handleClose}
                                size={20}
                                className="!fill-gray-400 absolute top-3 right-3 cursor-pointer" />
                        </div>
                        <div className="text-[13px] rounded-b-md mt-3">
                            <div className="grid grid-cols-1 gap-y-3 gap-x-8">
                                <div className="flex-1 flex gap-3 justify-between items-center">
                                    <span className="font-[500]">Tên loại dịch vụ</span>
                                    <input
                                        value={categoryForm?.name}
                                        onChange={e => setCategoryForm(prev => ({ ...prev, name: e.target.value }))}
                                        type="text"
                                        className="outline-none border-b border-[#9d9d9d] w-[280px] py-2 focus:border-[#0090da]" />
                                </div>
                                <div className="flex-1 flex gap-3 justify-between items-center">
                                    <span className="font-[500]">Mô tả</span>
                                    <textarea
                                        value={categoryForm?.description}
                                        onChange={e => {
                                            setCategoryForm(prev => ({ ...prev, description: e.target.value }));
                                            e.target.style.height = "auto"; // Reset chiều cao để đo lại
                                            e.target.style.height = `${e.target.scrollHeight}px`; // Điều chỉnh chiều cao theo nội dung
                                        }}
                                        className="outline-none border border-[#9d9d9d] w-[280px] py-2 px-2 rounded-sm overflow-hidden" />
                                </div>

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
                                {data &&
                                    <button
                                        onClick={() => setShowModalConfirmDelete(true)}
                                        className="flex gap-2 border-none py-[6px] px-4 text-white bg-[#db4e65] hover:bg-[#d5324d] rounded-sm duration-200">
                                        <CgTrash size={20} /> Xoá
                                    </button>}
                            </div>
                        </footer>
                    </div>
                </div>
            )}
            <ModalConfirm
                showModalConfirm={showModalConfirmDelete}
                setShowModalConfirm={setShowModalConfirmDelete}
                title={'Xoá loại dịch vụ'}
                content={`Bạn có chắc chắn muốn xóa loại dịch vụ này?`}
                handleSubmit={handleDelete}
            />
            {isLoading
                && <div className="fixed z-[999] bg-black bg-opacity-45 top-0 left-0 w-full h-full flex items-center justify-center">
                    <ClipLoader size={50} color="fffff" />
                </div>
            }
        </div>
    )
}
export default ModalAddAndUpdateCategory;