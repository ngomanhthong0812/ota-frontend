'use client'
import { IoBan, IoClose } from "react-icons/io5";
import { BiPencil, BiSave, BiTrash } from "react-icons/bi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "@/context/auth.context";
import { ClipLoader } from "react-spinners";
import { Role, UserAdmin } from "@/types/backend";

interface IProps {
    data?: UserAdmin;
    showModalAddAndUpdateUser: boolean;
    setShowModalAddAndUpdateUser: (b: boolean) => void;
    refreshData: () => void;
    roleList?: Role[];
}
interface UserForm {
    user_name: string,
    password: string,
    confirmPassword: string,
    position?: string,
    email: string,
    phoneNumber: string,
    note: string,
}

interface UserRequest {
    id: number | undefined,
    user_name: string,
    password: string,
    role_id: number | undefined,
    email: string,
    phone: string,
    note: string,
    hotel_id: number | undefined,
}

const ModalAddAndUpdateUser: React.FC<IProps> = ({ data, showModalAddAndUpdateUser, setShowModalAddAndUpdateUser, refreshData, roleList }) => {
    const { token, user } = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userForm, setUserForm] = useState<UserForm>({
        user_name: '',
        password: '',
        confirmPassword: '',
        position: '',
        email: '',
        phoneNumber: '',
        note: '',
    });
    const [userRequest, setUserRequest] = useState<UserRequest>({
        id: undefined,
        user_name: '',
        password: '',
        role_id: undefined,
        email: '',
        phone: '',
        note: '',
        hotel_id: undefined,
    });

    useEffect(() => {
        if (data) {
            resetForm();
        }
    }, [data])

    useEffect(() => {
        const role = roleList?.find(role => role.name === userForm.position);

        setUserRequest({
            id: data?.id,
            user_name: userForm.user_name,
            password: userForm.password,
            role_id: role?.id,
            email: userForm.email,
            phone: userForm.phoneNumber,
            note: userForm.note,
            hotel_id: user?.hotel_id,
        })
    }, [userForm, user])

    const resetForm = () => {
        setUserForm({
            user_name: data?.user_name || '',
            password: '',
            confirmPassword: '',
            position: '',
            email: data?.email || '',
            phoneNumber: data?.phone || '',
            note: data?.note || '',
        })
    }
    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Ngừng sự kiện lan truyền khi click vào các phần tử con của modal
    };

    const handleClose = () => {
        resetForm();
        setShowModalAddAndUpdateUser(false);
    }
    const validateForm = (): boolean => {
        if (!userForm?.user_name?.trim()) {
            toast.error("Bạn chưa nhập tên đăng nhập")
            return false;
        }
        if (!data) {
            if (!userForm?.password?.trim()) {
                toast.error("Bạn chưa nhập mật khẩu")
                return false;
            }

            if (!userForm?.position?.trim()) {
                toast.error("Bạn chưa phân quyền cho người dùng")
                return false;
            }
        }
        if (userForm?.password.trim() && userForm?.password?.length < 6) {
            toast.error("Mật khẩu chứa ít nhất 6 ký tự")
            return false;
        }
        if (userForm?.confirmPassword !== userForm?.password) {
            toast.error("Mật khẩu xác nhận không giống nhau")
            return false;
        }
        if (userForm.email.trim() && !isValidEmail(userForm.email.trim())) {
            toast.error("Định dạng email không hợp lệ");
            return false;
        }
        if (userForm.phoneNumber.trim() && userForm?.phoneNumber?.length < 10) {
            toast.error("Số điện thoại có ít nhất 10 số")
            return false;
        }
        return true;
    }
    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Biểu thức chính quy để kiểm tra định dạng email
        return emailRegex.test(email);
    };
    const handleAdd = async () => {
        if (validateForm()) {
            setIsLoading(true);
            try {
                const response = await axios.post('http://localhost:8080/api/users', cleanRequestData(userRequest), {
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
                const response = await axios.put('http://localhost:8080/api/users', cleanRequestData(userRequest), {
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


    return (
        <div>
            {/* Modal Overlay */}
            {showModalAddAndUpdateUser && (
                <div
                    className={`absolute w-full top-0 left-0 min-h-[100%] bg-black bg-opacity-50 flex justify-center items-start z-50 duration-200`}
                    onClick={handleClose}
                >
                    <div
                        onClick={handleModalClick}
                        className={`rounded-md min-w-[800px] max-w-full bg-white relative mt-[50px] py-5 px-8`}>
                        <div >
                            <h1 >
                                <span className="text-black text-[16px] font-[600]">Thêm mới tài khoản</span></h1>
                            <IoClose
                                onClick={handleClose}
                                size={20}
                                className="!fill-gray-400 absolute top-3 right-3 cursor-pointer" />
                        </div>
                        <div className="text-[13px] rounded-b-md mt-3">
                            <div className="grid grid-cols-2 gap-y-3 gap-x-8">
                                <div className="flex-1 flex gap-3 justify-between items-center">
                                    <span className="font-[500]">Tên đăng nhập</span>
                                    <input
                                        value={userForm?.user_name}
                                        onChange={e => setUserForm(prev => ({ ...prev, user_name: e.target.value }))}
                                        type="text"
                                        className="outline-none border-b border-[#9d9d9d] w-[230px] py-2 focus:border-[#0090da]" />
                                </div>
                                <div className="flex-1 flex gap-3 justify-between items-center">
                                    <span className="font-[500]">Email</span>
                                    <input
                                        value={userForm?.email}
                                        onChange={e => setUserForm(prev => ({ ...prev, email: e.target.value }))}
                                        type="text"
                                        className="outline-none border-b border-[#9d9d9d] w-[230px] py-2 focus:border-[#0090da]" />
                                </div>
                                <div className="flex-1 flex gap-3 justify-between items-center">
                                    <span className="font-[500]">Mật khẩu</span>
                                    <input
                                        value={userForm?.password}
                                        onChange={e => setUserForm(prev => ({ ...prev, password: e.target.value }))}
                                        type="text"
                                        className="outline-none border-b border-[#9d9d9d] w-[230px] py-2 focus:border-[#0090da]" />
                                </div>
                                <div className="flex-1 flex gap-3 justify-between items-center">
                                    <span className="font-[500]">SĐT</span>
                                    <input
                                        value={userForm?.phoneNumber}
                                        onChange={e => setUserForm(prev => ({ ...prev, phoneNumber: e.target.value }))}
                                        type="text"
                                        className="outline-none border-b border-[#9d9d9d] w-[230px] py-2 focus:border-[#0090da]" />
                                </div>
                                <div className="flex-1 flex gap-3 justify-between items-center">
                                    <span className="font-[500]">Nhập lại mật khẩu</span>
                                    <input
                                        value={userForm?.confirmPassword}
                                        onChange={e => setUserForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                        type="text"
                                        className="outline-none border-b border-[#9d9d9d] w-[230px] py-2 focus:border-[#0090da]" />
                                </div>
                                <div className="flex-1 flex gap-3 justify-between items-center relative">
                                    <span className="font-[500]">Ghi chú</span>
                                    <input
                                        value={userForm?.note}
                                        onChange={e => setUserForm(prev => ({ ...prev, note: e.target.value }))}
                                        type="text"
                                        className="outline-none border-b border-[#9d9d9d] w-[230px] py-2 focus:border-[#0090da] !pr-5" />
                                    <BiPencil size={18} className="!fill-gray-400 absolute top-1/2 right-0 -translate-y-1/2" />
                                </div>
                                {roleList && (
                                    <div className="flex-1 flex gap-3 justify-between items-center">
                                        <span className="font-[500]">Vai trò</span>
                                        <select
                                            value={userForm?.position}
                                            onChange={(e) => setUserForm((prev) => ({ ...prev, position: e.target.value }))}
                                            className="outline-none border-b border-[#9d9d9d] w-[230px] py-2 focus:border-[#0090da] bg-white">
                                            <option value="" disabled hidden>--Chọn vai trò--</option>
                                            {roleList?.map((role: Role) => (
                                                <option
                                                    value={role.name}
                                                    key={role.id}>{role.name}
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
export default ModalAddAndUpdateUser;