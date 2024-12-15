'use client'
import { useAuth } from "@/context/auth.context";
import { Services, User, UserAdmin } from "@/types/backend";
import ModalConfirm from "@/components/modal_confirm";

import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

import { CgTrash } from "react-icons/cg";
import { MdOutlineCheckBox } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { GoLock } from "react-icons/go";

import { STATUS_SERVICE, STATUS_USER } from "@/constants/constants";
import useFormatPriceWithCommas from "@/hook/useFormatPriceWithCommas";


interface IProps {
    data: Services;
    itemActive: number | null;
    setShowModalUpdateService: (b: boolean) => void;
    refreshData: () => void;
}
const ServiceDetail: React.FC<IProps> = ({ data, itemActive, setShowModalUpdateService, refreshData }) => {
    const { token } = useAuth();
    const { formatPrice } = useFormatPriceWithCommas();
    const [showModalConfirmDelete, setShowModalConfirmDelete] = useState<boolean>(false);
    const [showModalConfirmUpdateStatus, setShowModalConfirmUpdateStatus] = useState<boolean>(false);

    const handleDelete = async () => {
        if (data.id) {
            try {
                const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/services/${data.id}`,
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
                    toast(`Xoá dịch vụ ${data?.name} thành công`);
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
                const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/services/updateStatus/${data.id}`,
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
                        <div className="min-w-[230px]">
                            <p className="py-3 border-b flex gap-5 justify-between items-center w-full">
                                <span>Mã dịch vụ:</span>
                                <span>{data?.id}</span>
                            </p>
                            <p className="py-3 border-b flex gap-5 justify-between items-center w-full">
                                <span>Tên dịch vụ:</span>
                                <span>{data?.name}</span>
                            </p>
                            <p className="py-3 border-b flex gap-5 justify-between items-center w-full">
                                <span>Giá bán:</span>
                                <span>{formatPrice(String(data?.unit_price))}</span>
                            </p>
                        </div>
                        <div className="min-w-[230px]">
                            <p className="py-3 border-b flex gap-5 justify-between items-center w-full">
                                <span>Loại dịch vụ:</span>
                                <span>{data?.category.name}</span>
                            </p>
                            <p className="py-3 border-b flex gap-5 justify-between items-center w-full">
                                <span>Trạng thái:</span>
                                <span>{data?.status === 'in_business' ? STATUS_SERVICE.IN_BUSINESS : STATUS_SERVICE.OUT_OF_BUSINESS}</span>
                            </p>
                        </div>
                        <div className="flex-1">
                            <div className="px-2 border-l min-h-[50px] italic">{data.description ? data?.description : 'Mô tả...'}</div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 text-white font-[600] mt-8">

                        <button
                            onClick={() => setShowModalUpdateService(true)}
                            className="flex items-center justify-center gap-2 bg-[#4bac4d] hover:bg-[#419543] px-5 py-2 rounded-md duration-150">
                            <MdOutlineCheckBox size={20} />Cập nhật</button>
                        {data.status === 'in_business'
                            ?
                            <button
                                onClick={() => setShowModalConfirmUpdateStatus(true)}
                                className="flex items-center justify-center gap-2 bg-[#db4e65] hover:bg-[#d5324d] px-5 py-2 rounded-md duration-150">
                                <GoLock size={20} />Ngừng kinh doanh</button>
                            :
                            <button
                                onClick={() => setShowModalConfirmUpdateStatus(true)}
                                className="flex items-center justify-center gap-2 bg-[#4bac4d] hover:bg-[#419543] px-5 py-2 rounded-md duration-150">
                                <FaCheck size={20} />Cho phép kinh doanh</button>
                        }
                        <button
                            onClick={() => setShowModalConfirmDelete(true)}
                            className="flex items-center justify-center gap-2 bg-[#db4e65] hover:bg-[#d5324d] px-5 py-2 rounded-md duration-150">
                            <CgTrash size={20} />Xoá</button>
                    </div>
                </div>
                <ModalConfirm
                    showModalConfirm={showModalConfirmDelete}
                    setShowModalConfirm={setShowModalConfirmDelete}
                    title={'Xóa tài khoản'}
                    content={`Hệ thống sẽ <b>xóa hoàn toàn</b> dịch vụ <b>${data.name}</b> nhưng vẫn giữ giao dịch lịch sử nếu có. Bạn có chắc chắn muốn xóa?`}
                    handleSubmit={handleDelete}
                />

                {data.status === 'active'
                    ?
                    <ModalConfirm
                        showModalConfirm={showModalConfirmUpdateStatus}
                        setShowModalConfirm={setShowModalConfirmUpdateStatus}
                        title={'Xác nhận'}
                        content={`Bạn có chắc chắn muốn ngừng kinh doanh dịch vụ này? Thông tin và giao dịch của dịch vụ vẫn sẽ được giữ.`}
                        handleSubmit={handleUpdateStatus}
                    />
                    :
                    <ModalConfirm
                        showModalConfirm={showModalConfirmUpdateStatus}
                        setShowModalConfirm={setShowModalConfirmUpdateStatus}
                        title={'Xác nhận'}
                        content={`Bạn có chắc chắn muốn dịch vụ này hoạt động trở lại?`}
                        handleSubmit={handleUpdateStatus}
                    />
                }
            </td>
        </tr>
    )
}
export default ServiceDetail