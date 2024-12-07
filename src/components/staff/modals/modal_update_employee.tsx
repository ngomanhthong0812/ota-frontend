'use client'

import { BiSave } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { MdCameraAlt } from "react-icons/md";
import { BiPencil } from "react-icons/bi";
import { IoBan } from "react-icons/io5";
import { HiOutlineChevronDown } from "react-icons/hi";
import { HiOutlineChevronUp } from "react-icons/hi";

import { useEffect, useState } from "react";
import { Employee } from "@/types/backend";
import ModalConfirm from "./modal_confirm";
import axios from "axios";
import { useAuth } from "@/context/auth.context";
import { toast } from "react-toastify";
import Image from "next/image";

interface IProps {
    data: Employee;
    showModalUpdateEmployee: boolean;
    setShowModalUpdateEmployee: (b: boolean) => void;
    refreshData: () => void;
}
interface RequestEmployee {
    id: number
    code: string;
    name: string;
    birthDate: string;
    gender: 'Male' | 'Female' | 'Other';
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
}

const ModalUpdateEmployee: React.FC<IProps> = ({ data, showModalUpdateEmployee, setShowModalUpdateEmployee, refreshData }) => {
    const { token } = useAuth();
    const [scrollY, setScrollY] = useState(0); // Biến lưu vị trí cuộn hiện tại
    const [savedScrollY, setSavedScrollY] = useState(0); // Biến lưu vị trí cuộn trước khi mở modal
    const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);

    const [employeePayload, setEmployeePayload] = useState<RequestEmployee>({
        id: data?.id,
        code: data?.code,
        name: data?.name,
        birthDate: data?.birthDate,
        gender: data?.gender,
        idCard: data?.idCard,
        position: data?.position,
        startDate: data?.startDate,
        user_id: data?.user_id,
        phoneNumber: data?.phoneNumber,
        email: data?.email,
        facebook: data?.facebook,
        address: data?.address,
        notes: data?.notes,
        img: data?.img,
    });

    useEffect(() => {
        setEmployeePayload({
            id: data?.id,
            code: data?.code,
            name: data?.name,
            birthDate: data?.birthDate,
            gender: data?.gender,
            idCard: data?.idCard,
            position: data?.position,
            startDate: data?.startDate,
            user_id: data?.user_id,
            phoneNumber: data?.phoneNumber,
            email: data?.email,
            facebook: data?.facebook,
            address: data?.address,
            notes: data?.notes,
            img: data?.img,
        })
    }, [data])

    const [isMore, isSetMore] = useState<boolean>(false);
    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Ngừng sự kiện lan truyền khi click vào các phần tử con của modal
    };
    const handleClose = () => {
        setShowModalConfirm(false);
        setShowModalUpdateEmployee(false);
        isSetMore(false);
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employees`,
                employeePayload,
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
                toast('Cập nhật nhân viên thành công');
                refreshData();
                handleClose();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log("Lỗi khi gửi dữ liệu:", error);
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY); // Cập nhật vị trí cuộn hiện tại
        };

        // Thêm sự kiện scroll khi component được mount
        window.addEventListener('scroll', handleScroll);

        // Xóa sự kiện khi component bị unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (!showModalUpdateEmployee) {
            window.scrollTo(0, savedScrollY);
        } else {
            setSavedScrollY(scrollY)
            window.scrollTo(0, 0);
        }
    }, [showModalUpdateEmployee, scrollY, savedScrollY]);
    return (
        <div>
            {/* Modal Overlay */}
            {showModalUpdateEmployee && (
                <div
                    className={`absolute w-full top-0 left-0 min-h-[100%] bg-black bg-opacity-50 flex justify-center items-start z-50 duration-200`}
                    onClick={handleClose}
                >
                    <div
                        onClick={handleModalClick}
                        className={`rounded-md min-w-[1100px] max-w-full bg-white relative mt-[50px]`}>
                        <div >
                            <h1 className="py-5 px-8">
                                <span className="text-black text-[16px] font-[600]">Cập nhật nhân viên</span>
                                <span className="font-[400] text-[14px]" > - thong</span></h1>
                            <div>
                                <button className="font-[400] text-[14px] py-2 px-8 border-b-2 border-[#0090da]">Thông tin</button>
                            </div>
                            <IoClose
                                onClick={handleClose}
                                size={20}
                                className="!fill-gray-400 absolute top-3 right-3 cursor-pointer" />
                        </div>
                        <div className="text-[13px] bg-[#e5e5e5] p-8 rounded-b-md">
                            <div className="flex gap-6">
                                <div className="flex flex-col gap-3">
                                    <div className="group border-dashed border border-gray-400 relative rounded-sm">
                                        <Image src="https://f09a3e0wmmobj.vcdn.cloud/default-product.png"
                                            alt=""
                                            className="w-[135px] h-[135px] bg-white" />
                                        <MdCameraAlt size={25} className="!fill-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                        <IoClose size={20} className="!fill-red-400 absolute top-0 right-0 invisible group-hover:visible" />
                                    </div>
                                    <button className="bg-white p-1 rounded-sm font-[600] border border-gray-400">Chọn ảnh</button>
                                </div>
                                <div className="flex-1 flex flex-col gap-4">
                                    <div className="w-full bg-white rounded-lg p-4 shadow-md shadow-[#d6d6d6]">
                                        <h1 className="text-black text-[16px] font-[500] pb-4">Thông tin khởi tạo</h1>
                                        <div className="grid grid-cols-2 gap-12 mb-2">
                                            <div className="flex-1 flex gap-3 justify-between items-center">
                                                <span className="font-[500]">Mã nhân viên</span>
                                                <input
                                                    type="text"
                                                    value={employeePayload.code}
                                                    onChange={() => setEmployeePayload(prev => ({ ...prev, code: employeePayload.code }))}
                                                    placeholder="Mã nhân viên tự động"
                                                    className="outline-none border-b border-[#9d9d9d] w-[230px] py-2 focus:border-[#0090da]" />
                                            </div>
                                            <div className="flex-1 flex gap-3 justify-between items-center">
                                                <span className="font-[500]">Tên nhân viên</span>
                                                <input
                                                    type="text"
                                                    value={employeePayload.name}
                                                    onChange={e => setEmployeePayload(prev => ({ ...prev, name: e.target.value }))}
                                                    className="outline-none border-b border-[#9d9d9d] w-[230px] py-2 focus:border-[#0090da]" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-12 mb-2">
                                            <div className="flex-1 flex gap-3 justify-between items-center">
                                                <span className="font-[500]">Số điện thoại</span>
                                                <input
                                                    type="text"
                                                    value={employeePayload.phoneNumber}
                                                    onChange={e => setEmployeePayload(prev => ({ ...prev, phoneNumber: e.target.value }))}
                                                    className="outline-none border-b border-[#9d9d9d] w-[230px] py-2 focus:border-[#0090da]" />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        {!isMore
                                            ? <button
                                                onClick={() => isSetMore(true)}
                                                className="flex items-center justify-center p-[5px] min-w-[200px] rounded-lg font-[600] gap-3 bg-white text-[#0090da]">
                                                Thêm thông tin
                                                <HiOutlineChevronDown size={15} />
                                            </button>
                                            : <button
                                                onClick={() => isSetMore(false)}
                                                className="flex items-center justify-center p-[5px] min-w-[200px] rounded-lg font-[600] gap-3 bg-white text-[#0090da]">
                                                Ẩn thông tin
                                                <HiOutlineChevronUp size={15} />
                                            </button>}
                                    </div>
                                    {isMore &&
                                        <>
                                            <div className="w-full bg-white rounded-lg p-4 shadow-md shadow-[#d6d6d6]">
                                                <h1 className="text-black text-[16px] font-[500] pb-4">Thông tin công việc</h1>
                                                <div className="grid grid-cols-2 gap-12 mb-2">
                                                    <div className="flex-1 flex gap-3 justify-between items-center">
                                                        <span className="font-[500]">Ngày bắt đầu làm việc</span>
                                                        <input
                                                            type="date"
                                                            value={employeePayload.startDate}
                                                            onChange={e => setEmployeePayload(prev => ({ ...prev, startDate: e.target.value }))}
                                                            className="outline-none border-b border-[#9d9d9d] w-[230px] py-2 focus:border-[#0090da]" />
                                                    </div>
                                                    <div className="flex-1 flex gap-3 justify-between items-center">
                                                        <span className="font-[500]">Tài khoản</span>
                                                        <select
                                                            value={employeePayload.startDate}
                                                            onChange={e => setEmployeePayload(prev => ({ ...prev, startDate: e.target.value }))}//demo
                                                            className="outline-none border-b border-[#9d9d9d] w-[230px] py-2 focus:border-[#0090da]" >
                                                            <option value="">Chọn tài khoản</option>
                                                            <option value="">Nhân viên 1</option>
                                                            <option value="">Nhân viên 2</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-12 mb-2">
                                                    <div className="flex-1 flex gap-3 justify-between items-center">
                                                        <span className="font-[500]">Chức danh</span>
                                                        <select
                                                            onChange={e => setEmployeePayload(prev => ({ ...prev, position: e.target.value }))}
                                                            className="outline-none border-b border-[#9d9d9d] w-[230px] py-2 focus:border-[#0090da]" >
                                                            <option value="" >Chọn chức danh</option>
                                                            <option value="">Demo</option>
                                                            <option value="">Demo</option>
                                                        </select>
                                                    </div>
                                                    <div className="flex-1 flex gap-3 justify-between items-center relative">
                                                        <span className="font-[500]">Ghi chú</span>
                                                        <input
                                                            type="text"
                                                            value={employeePayload.notes}
                                                            onChange={e => setEmployeePayload(prev => ({ ...prev, notes: e.target.value }))}
                                                            className="outline-none border-b border-[#9d9d9d] w-[230px] py-2 focus:border-[#0090da] !pr-5" />
                                                        <BiPencil size={18} className="!fill-gray-400 absolute top-1/2 right-0 -translate-y-1/2" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full bg-white rounded-lg p-4 shadow-md shadow-[#d6d6d6]">
                                                <h1 className="text-black text-[16px] font-[500] pb-4">Thông tin cá nhân</h1>
                                                <div className="grid grid-cols-2 gap-12 mb-2">
                                                    <div className="flex-1 flex gap-3 justify-between items-center">
                                                        <span className="font-[500]">Số CMND/CCCD</span>
                                                        <input
                                                            type="text"
                                                            value={employeePayload.idCard}
                                                            onChange={e => setEmployeePayload(prev => ({ ...prev, idCard: e.target.value }))}
                                                            className="outline-none border-b border-[#9d9d9d] w-[230px] py-2 focus:border-[#0090da]" />
                                                    </div>
                                                    <div className="flex-1 flex gap-3 justify-between items-center">
                                                        <span className="font-[500]">Ngày sinh</span>
                                                        <input
                                                            type="date"
                                                            value={employeePayload.birthDate}
                                                            onChange={e => setEmployeePayload(prev => ({ ...prev, birthDate: e.target.value }))}
                                                            className="outline-none border-b border-[#9d9d9d] w-[230px] py-2 focus:border-[#0090da]" />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-12 mb-2">
                                                    <div className="flex-1 flex gap-3 justify-between items-center">
                                                        <span className="font-[500]">Giới tính</span>
                                                        <div className="flex items-center gap-2 mr-14 py-2">
                                                            <input
                                                                type="radio"
                                                                id="male"
                                                                name="gender"
                                                                value="Male"
                                                                checked={employeePayload.gender === 'Male'}
                                                                onChange={(e) => setEmployeePayload({ ...employeePayload, gender: e.target.value as 'Male' | 'Female' | 'Other' })} />
                                                            <label htmlFor="male">Nam</label>

                                                            <input
                                                                type="radio"
                                                                id="female"
                                                                name="gender"
                                                                value="Female"
                                                                className="ml-5"
                                                                checked={employeePayload.gender === 'Female'}
                                                                onChange={(e) => setEmployeePayload({ ...employeePayload, gender: e.target.value as 'Male' | 'Female' | 'Other' })} />
                                                            <label htmlFor="female">Nữ</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full bg-white rounded-lg p-4 shadow-md shadow-[#d6d6d6]">
                                                <h1 className="text-black text-[16px] font-[500] pb-4">Thông tin liên hệ</h1>
                                                <div className="grid grid-cols-2 gap-12 mb-2">
                                                    <div className="flex-1 flex gap-3 justify-between items-center">
                                                        <span className="font-[500]">Địa chỉ</span>
                                                        <input
                                                            type="text"
                                                            value={employeePayload.address}
                                                            onChange={e => setEmployeePayload(prev => ({ ...prev, address: e.target.value }))}
                                                            className="outline-none border-b border-[#9d9d9d] w-[230px] py-2 focus:border-[#0090da]" />
                                                    </div>
                                                    <div className="flex-1 flex gap-3 justify-between items-center">
                                                        <span className="font-[500]">Khu vực</span>
                                                        <input type="text"
                                                            className="outline-none border-b border-[#9d9d9d] w-[230px] py-2 focus:border-[#0090da]" />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-12 mb-2">
                                                    <div className="flex-1 flex gap-3 justify-between items-center">
                                                        <span className="font-[500]">Email</span>
                                                        <input
                                                            type="text"
                                                            value={employeePayload.email}
                                                            onChange={e => setEmployeePayload(prev => ({ ...prev, email: e.target.value }))}
                                                            className="outline-none border-b border-[#9d9d9d] w-[230px] py-2 focus:border-[#0090da]" />
                                                    </div>
                                                    <div className="flex-1 flex gap-3 justify-between items-center">
                                                        <span className="font-[500]">Phường xã</span>
                                                        <input type="text"
                                                            className="outline-none border-b border-[#9d9d9d] w-[230px] py-2 focus:border-[#0090da]" />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-12 mb-2">
                                                    <div className="flex-1 flex gap-3 justify-between items-center">
                                                    </div>
                                                    <div className="flex-1 flex gap-3 justify-between items-center">
                                                        <span className="font-[500]">Facebook</span>
                                                        <input
                                                            type="text"
                                                            value={employeePayload.facebook}
                                                            onChange={e => setEmployeePayload(prev => ({ ...prev, facebook: e.target.value }))}
                                                            className="outline-none border-b border-[#9d9d9d] w-[230px] py-2 focus:border-[#0090da]" />
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>

                            <footer className="modal-footer mt-10">
                                <div className="flex items-center justify-end gap-3 font-[500]">
                                    <button
                                        onClick={() => setShowModalConfirm(true)}
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
                    <ModalConfirm
                        showModalConfirm={showModalConfirm}
                        setShowModalConfirm={setShowModalConfirm}
                        title={'Xác nhận thay đổi'}
                        content={'Thay đổi này có thể làm ảnh hưởng đến các Phiếu lương tạm tính và các Phiếu thanh toán liên quan của nhân viên nếu có. Bạn có chắc chắn lưu?'}
                        handleSubmit={handleSubmit}
                    />
                </div>
            )}
        </div>
    );
};

export default ModalUpdateEmployee;
