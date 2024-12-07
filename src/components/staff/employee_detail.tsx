'use client'
import { useAuth } from "@/context/auth.context";
import { Employee } from "@/types/backend";
import ModalConfirm from "./modals/modal_confirm";

import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

import { CgTrash } from "react-icons/cg";
import { MdOutlineCheckBox } from "react-icons/md";
import { TbUserX } from "react-icons/tb";
import { MdRestore } from "react-icons/md";
import Image from "next/image";


interface IProps {
    data: Employee;
    itemActive: number | null;
    setShowModalUpdateEmployee: (b: boolean) => void;
    refreshData: () => void;
}
const EmployeeDetail: React.FC<IProps> = ({ data, itemActive, setShowModalUpdateEmployee, refreshData }) => {
    const { token } = useAuth();
    const [showModalConfirmDelete, setShowModalConfirmDelete] = useState<boolean>(false);
    const [showModalConfirmUpdateStatus, setShowModalConfirmUpdateStatus] = useState<boolean>(false);

    const handleDelete = async () => {
        if (data.id) {
            try {
                const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employees/deleteEmployees`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        data: { id: [data.id] }
                    }
                );

                // Kiểm tra phản hồi từ API
                if (response.data.statusCode === 200) {
                    console.log("Gửi thành công");
                    setShowModalConfirmDelete(false);
                    toast(`Xoá nhân viên ${data?.code} thành công`);
                    refreshData();
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                // In thông tin lỗi khi gặp sự cố
                console.log("Lỗi khi gửi dữ liệu:", error);
            }
        }

    }

    const handleUpdateStatus = async () => {
        if (data.id) {
            try {
                const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employees/updateStatus/${data.id}`,
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
                    toast(`Cập nhật nhân viên thành công`);
                    refreshData();
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.log(token);

                console.log(data?.id);

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
                        <div>
                            <img src="https://f09a3e0wmmobj.vcdn.cloud/default-product.png" alt="" className="w-[135px]" />
                        </div>
                        <div className="min-w-[230px]">
                            <p className="py-3 border-b flex gap-5 justify-between items-center w-full">
                                <span>Mã nhân viên:</span>
                                <span>{data?.code}</span>
                            </p>
                            <p className="py-3 border-b flex gap-5 justify-between items-center w-full">
                                <span>Tên nhân viên:</span>
                                <span>{data?.name}</span>
                            </p>
                            <p className="py-3 border-b flex gap-5 justify-between items-center w-full">
                                <span>Ngày sinh:</span>
                                <span>{data?.birthDate}</span>
                            </p>
                            <p className="py-3 border-b flex gap-5 justify-between items-center w-full">
                                <span>Giới tính:</span>
                                <span>{data?.gender}</span>
                            </p>
                            <p className="py-3 border-b flex gap-5 justify-between items-center w-full">
                                <span>Số CMND/CCCD:</span>
                                <span>{data?.idCard}</span>
                            </p>
                            <p className="py-3 border-b flex gap-5 justify-between items-center w-full">
                                <span>Chức danh:</span>
                                <span>{data?.position}</span>
                            </p>
                        </div>
                        <div className="min-w-[230px]">
                            <p className="py-3 border-b flex gap-5 justify-between items-center w-full">
                                <span>Ngày bắt đầu làm việc:</span>
                                <span>{data?.startDate}</span>
                            </p>
                            <p className="py-3 border-b flex gap-5 justify-between items-center w-full">
                                <span>Tài khoản Ota:</span>
                                <span>{data?.user_id}</span>
                            </p>
                            <p className="py-3 border-b flex gap-5 justify-between items-center w-full">
                                <span>Số điện thoại:</span>
                                <span>{data?.phoneNumber}</span>
                            </p>
                            <p className="py-3 border-b flex gap-5 justify-between items-center w-full">
                                <span>Email:</span>
                                <span>{data?.email}</span>
                            </p>
                            <p className="py-3 border-b flex gap-5 justify-between items-center w-full">
                                <span>Facebook:</span>
                                <span>{data?.facebook}</span>
                            </p>
                            <p className="py-3 border-b flex gap-5 justify-between items-center w-full">
                                <span>Địa chỉ:</span>
                                <span>{data?.address}</span>
                            </p>
                        </div>
                        <div className="flex-1">
                            <div className="px-2 border-l min-h-[50px] italic">{data.notes ? data?.notes : 'Ghi chú...'}</div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 text-white font-[600] mt-8">
                        {data?.status === 'Working'
                            ?
                            <>
                                <button
                                    onClick={() => setShowModalUpdateEmployee(true)}
                                    className="flex items-center justify-center gap-2 bg-[#4bac4d] hover:bg-[#419543] px-5 py-2 rounded-md duration-150">
                                    <MdOutlineCheckBox size={20} />Cập nhật</button>
                                <button
                                    onClick={() => setShowModalConfirmUpdateStatus(true)}
                                    className="flex items-center justify-center gap-2 bg-[#db4e65] hover:bg-[#d5324d] px-5 py-2 rounded-md duration-150">
                                    <TbUserX size={20} />Ngừng làm việc</button>
                            </>
                            :
                            <button
                                onClick={() => setShowModalConfirmUpdateStatus(true)}
                                className="flex items-center justify-center gap-2 bg-[#4bac4d] hover:bg-[#419543] px-5 py-2 rounded-md duration-150">
                                <MdRestore size={20} />Quay lại làm việc</button>
                        }
                        <button
                            onClick={() => setShowModalConfirmDelete(true)}
                            className="flex items-center justify-center gap-2 bg-[#db4e65] hover:bg-[#d5324d] px-5 py-2 rounded-md duration-150">
                            <CgTrash size={20} />Xoá nhân viên</button>
                    </div>
                </div>
                <ModalConfirm
                    showModalConfirm={showModalConfirmDelete}
                    setShowModalConfirm={setShowModalConfirmDelete}
                    title={'Xoá nhân viên'}
                    content={'Hệ thống sẽ <b>xóa hoàn toàn</b> nhân viên này nhưng vẫn giữ các dữ liệu chấm công và các phiếu lương nếu có. Bạn có chắc chắn muốn xóa?'}
                    handleSubmit={handleDelete}
                />
                {data?.status === 'Working'
                    ?
                    <ModalConfirm
                        showModalConfirm={showModalConfirmUpdateStatus}
                        setShowModalConfirm={setShowModalConfirmUpdateStatus}
                        title={'Xác nhận nhân viên ngừng làm việc?'}
                        content={`Hệ thống sẽ ghi nhận nhân viên ${data?.name} ngừng làm việc. Tuy nhiên, các dữ liệu chấm công phiếu lương nếu có của nhân viên này sẽ vẫn được giữ lại.`}
                        handleSubmit={handleUpdateStatus}
                    />
                    :
                    <ModalConfirm
                        showModalConfirm={showModalConfirmUpdateStatus}
                        setShowModalConfirm={setShowModalConfirmUpdateStatus}
                        title={'Xác nhận nhân viên quay lại làm việc?'}
                        content={`Hệ thống sẽ ghi nhận nhân viên ${data?.name} (Đã nghỉ) quay lại làm việc. Tuy nhiên, các dữ liệu chấm công và phiếu lương nếu có của nhân viên này sẽ vẫn được giữ lại.`}
                        handleSubmit={handleUpdateStatus}
                    />}
            </td>
        </tr>
    )
}
export default EmployeeDetail