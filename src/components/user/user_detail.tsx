'use client'
import { useAuth } from "@/context/auth.context";
import { User, UserAdmin } from "@/types/backend";
import ModalConfirm from "@/components/modal_confirm";

import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

import { CgTrash } from "react-icons/cg";
import { MdOutlineCheckBox } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { GoLock } from "react-icons/go";

import { STATUS_USER } from "@/constants/constants";


interface IProps {
    data: UserAdmin;
    itemActive: number | null;
    setShowModalUpdateUser: (b: boolean) => void;
    refreshData: () => void;
}
const UserDetail: React.FC<IProps> = ({ data, itemActive, setShowModalUpdateUser, refreshData }) => {
    const { token } = useAuth();
    const [showModalConfirmDelete, setShowModalConfirmDelete] = useState<boolean>(false);
    const [showModalConfirmUpdateStatus, setShowModalConfirmUpdateStatus] = useState<boolean>(false);

    const handleDelete = async () => {
        if (data.id) {
            try {
                const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${data.id}`,
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
                    toast(`Xoá tài khoản ${data?.code} thành công`);
                    refreshData();
                } else {
                    setShowModalConfirmDelete(false);
                    toast.error(response.data.message);
                }
            } catch (error) {
                // In thông tin lỗi khi gặp sự cố
                setShowModalConfirmDelete(false);
                console.log("Lỗi khi gửi dữ liệu:", error);
            }
        }

    }

    const handleUpdateStatus = async () => {
        if (data.id) {
            try {
                const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/updateStatus/${data.id}`,
                    {},
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
                    setShowModalConfirmUpdateStatus(false);
                    toast(`Cập nhật tài khoản thành công`);
                    refreshData();
                } else {
                    setShowModalConfirmUpdateStatus(false);
                    toast.error(response.data.message);
                }
            } catch (error) {
                setShowModalConfirmUpdateStatus(false);
                // In thông tin lỗi khi gặp sự cố
                console.log("Lỗi khi gửi dữ liệu:", error);
            }
        }
    }
    return (
        <tr className={`${itemActive === data?.id ? 'border border-t-0 border-[#0090da] ' : 'hidden'}`}>
            <td colSpan={6} className="bg-[#ebf5ea] m-0 p-0">
                <div className="toolbar px-8 flex">
                    <button className="bg-white border border-b-white py-[4px] px-3 rounded-t-sm border-[#d1d1d1] font-[500] mb-[-1px]">Thông tin</button>
                    {/* <div className="py-[6px] px-4 rounded-t-sm font-[500]">Lịch làm việc</div> */}
                </div>
                <div className="content bg-white px-8 py-5  border-t border-[#d1d1d1]">
                    <div className="flex gap-8">
                        <div className="min-w-[280px]">
                            <p className="py-3 border-b flex gap-5 justify-between items-center w-full">
                                <span>Tên đăng nhập:</span>
                                <span>{data?.user_name}</span>
                            </p>
                            <p className="py-3 border-b flex gap-5 justify-between items-center w-full">
                                <span>Email:</span>
                                <span>{data?.email}</span>
                            </p>
                            <p className="py-3 border-b flex gap-5 justify-between items-center w-full">
                                <span>Số điện thoại:</span>
                                <span>{data?.phone}</span>
                            </p>
                        </div>
                        <div className="min-w-[280px]">
                            <p className="py-3 border-b flex gap-5 justify-between items-center w-full">
                                <span>Mã nhân viên:</span>
                                <span>{data?.code}</span>
                            </p>
                            <p className="py-3 border-b flex gap-5 justify-between items-center w-full">
                                <span>Trạng thái:</span>
                                <span className="font-[600]">{data?.status === 'active' ? STATUS_USER.ACTIVE : STATUS_USER.INACTIVE}</span>
                            </p>
                        </div>
                        <div className="flex-1">
                            <div className="px-2 border-l min-h-[50px] italic">{data.note ? data?.note : 'Ghi chú...'}</div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 text-white font-[600] mt-8">

                        <button
                            onClick={() => setShowModalUpdateUser(true)}
                            className="flex items-center justify-center gap-2 bg-[#4bac4d] hover:bg-[#419543] px-5 py-2 rounded-md duration-150">
                            <MdOutlineCheckBox size={20} />Cập nhật</button>
                        {data.status === 'active'
                            ?
                            <button
                                onClick={() => setShowModalConfirmUpdateStatus(true)}
                                className="flex items-center justify-center gap-2 bg-[#db4e65] hover:bg-[#d5324d] px-5 py-2 rounded-md duration-150">
                                <GoLock size={20} />Ngừng hoạt động</button>
                            :
                            <button
                                onClick={() => setShowModalConfirmUpdateStatus(true)}
                                className="flex items-center justify-center gap-2 bg-[#4bac4d] hover:bg-[#419543] px-5 py-2 rounded-md duration-150">
                                <FaCheck size={20} />Cho phép hoạt động</button>
                        }
                        <button
                            onClick={() => setShowModalConfirmDelete(true)}
                            className="flex items-center justify-center gap-2 bg-[#db4e65] hover:bg-[#d5324d] px-5 py-2 rounded-md duration-150">
                            <CgTrash size={20} />Xoá tài khoản</button>
                    </div>
                </div>
                <ModalConfirm
                    showModalConfirm={showModalConfirmDelete}
                    setShowModalConfirm={setShowModalConfirmDelete}
                    title={'Xóa tài khoản'}
                    content={`Hệ thống sẽ <b>xóa hoàn toàn</b> tài <b>${data.user_name}<b/> nhưng vẫn giữ giao dịch lịch sử nếu có. Bạn có chắc chắn muốn xóa?`}
                    handleSubmit={handleDelete}
                />

                {data.status === 'active'
                    ?
                    <ModalConfirm
                        showModalConfirm={showModalConfirmUpdateStatus}
                        setShowModalConfirm={setShowModalConfirmUpdateStatus}
                        title={'Xác nhận'}
                        content={`Bạn có chắc chắn muốn ngừng hoạt động tài khoản này? Thông tin và giao dịch của tài khoản vẫn sẽ được giữ.`}
                        handleSubmit={handleUpdateStatus}
                    />
                    :
                    <ModalConfirm
                        showModalConfirm={showModalConfirmUpdateStatus}
                        setShowModalConfirm={setShowModalConfirmUpdateStatus}
                        title={'Xác nhận'}
                        content={`Bạn có chắc chắn muốn nhân viên này hoạt động trở lại?`}
                        handleSubmit={handleUpdateStatus}
                    />
                }
            </td>
        </tr>
    )
}
export default UserDetail