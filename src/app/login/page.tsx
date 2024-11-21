'use client'

import { useState } from "react";
import { useRouter } from 'next/navigation'

import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { BiSolidHotel } from "react-icons/bi";
import { PiUsersFill } from "react-icons/pi";
import { LiaPhoneSquareSolid } from "react-icons/lia";
import { useAuth } from "@/context/auth.context";
import { PuffLoader } from "react-spinners";
import DialogActive from "@/components/dialog_active";
import { User } from "@/types/backend";

interface IProps { }
interface FormDataType {
    username: string,
    password: string,
}

const LoginPage: React.FC<IProps> = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState<boolean>(true);
    const [isLoadingHotel, setIsLoadingHotel] = useState<boolean>(false);
    const [isLoadingStaff, setIsLoadingStaff] = useState<boolean>(false);
    const [useInfo, setUserInfo] = useState<User>();
    const [showModalActive, setShowModalActive] = useState<boolean>(false);

    const [formData, setFormData] = useState<FormDataType>({
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState<any>({});
    const { saveToken } = useAuth();

    const validateForm = () => {
        const newErrors: any = {}
        if (!formData.username) newErrors.username = "Tên người dùng không được để trống"
        if (!formData.password) newErrors.password = "Mật khẩu không được để trống"

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async (e: any, url: string) => {
        e.preventDefault();
        if (validateForm()) {
            if (url === '/hotel_management') {
                setIsLoadingHotel(true);
            } else {
                setIsLoadingStaff(true);
            }
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                })
                const responseData: any = await response.json();
                if (response.ok) {
                    console.log("login success");
                    let newUserInfo: User;
                    newUserInfo = {
                        id: responseData.user.id,
                        name: responseData.user.username,
                        email: responseData.user.email,
                        hotel_id: responseData.user.hotel_id,
                        isActive: responseData.user.isActive,
                    }
                    setUserInfo(newUserInfo);
                    if (responseData.user.isActive) {
                        saveToken(
                            responseData.access_token,
                            rememberMe,
                            newUserInfo);
                        router.push(url);
                    } else {
                        setShowModalActive(true);
                        setIsLoadingStaff(false);
                    }
                } else {
                    setIsLoadingHotel(false);
                    setIsLoadingStaff(false);
                    setErrors((prevErrors: any) => ({ ...prevErrors, error: responseData.message || 'Tài khoản hoặc mật khẩu không đúng' }));
                }

            } catch (error) {
                setIsLoadingHotel(false);
                setIsLoadingStaff(false);
                setErrors((prevErrors: any) => ({ ...prevErrors, error: 'Server Error' }));
                console.error('Error during login:', error);
            }
        }
    }

    const handleClickShowPassword = (e: any) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    }

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRememberMe(event.target.checked);
    };

    const handleSetUnModalActive = () => {
        setShowModalActive(false);
        setIsLoadingHotel(false);
        setIsLoadingStaff(false);
    }
    return (
        <div className="relative">
            <div className="bg-login"></div>
            <div className="absolute top-0 left-0 flex flex-col items-center justify-between pt-32 pb-16 w-full h-full bg-black bg-opacity-50">
                <DialogActive resData={{ id: useInfo?.id, name: useInfo?.name, email: useInfo?.email }} showModalActive={showModalActive} handleSetUnModalActive={handleSetUnModalActive} />
                <div className="form-login">
                    <form action="" className="w-[420px] bg-white py-7 px-5 rounded-t-2xl">
                        <div className="flex items-center justify-center">
                            <img src="https://logo.kiotviet.vn/KiotViet-Logo-Horizontal.svg" alt="" width={130} />
                        </div>
                        <div className="flex flex-col mt-6 gap-4">
                            <input
                                type="text"
                                placeholder="Tên tài khoản hoặc email"
                                value={formData.username}
                                onChange={(e) => setFormData(prevData => ({ ...prevData, username: e.target.value }))}
                                className="outline-none border-b border-[#d7d7d7] py-2 px-1 text-[15px] focus:border-b-[0.1rem] focus:border-[#00B63E] w-full" />
                            {errors.username && <span className="text-[#d32f2f] text-[0.75rem]">{errors.username}</span>}
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Mật khẩu"
                                    value={formData.password}
                                    onChange={(e) => setFormData(prevData => ({ ...prevData, password: e.target.value }))}
                                    className="outline-none border-b border-[#d7d7d7] py-2 px-1 text-[15px] focus:border-b-[0.1rem] focus:border-[#00B63E]  w-full pr-9" />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 ">
                                    {showPassword
                                        ? <MdOutlineVisibilityOff onClick={handleClickShowPassword} size={18} className="!fill-[#646464]" />
                                        : <MdOutlineVisibility onClick={handleClickShowPassword} size={18} className="!fill-[#646464]" />
                                    }
                                </div>
                            </div>
                            {errors.password && <span className="text-[#d32f2f] text-[0.75rem]">{errors.password}</span>}
                        </div>
                        <span className="text-[#d32f2f] text-[0.75rem]">{errors.error}</span>
                        <div className="flex text-[13px] justify-between mt-5">
                            <span className=" flex gap-2 items-center">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={handleCheckboxChange} />
                                Duy trì đăng nhập
                            </span>
                            <span className="text-[#0070F4] cursor-pointer">Quên mật khẩu?</span>
                        </div>
                    </form>
                    <div className="text-white text-[15px] w-full flex font-[600]">
                        <button
                            disabled={(isLoadingHotel || isLoadingStaff) ? true : false}
                            onClick={(e) => handleSubmit(e, '/hotel_management')}
                            className="flex item-center justify-center gap-2 bg-[#00B63E] hover:bg-[#009232] duration-200 border-none flex-1 rounded-bl-2xl px-2 py-3">
                            {
                                isLoadingHotel
                                    ? <PuffLoader color="white" size={20} />
                                    : <>
                                        <BiSolidHotel size={23} />
                                        QL Đặt phòng
                                    </>
                            }
                        </button>
                        <button
                            disabled={(isLoadingHotel || isLoadingStaff) ? true : false}
                            onClick={(e) => handleSubmit(e, '/staff_management')}
                            className="flex item-center justify-center gap-2 bg-[#0070F4] hover:bg-[#005ac3] duration-200 border-none flex-1 rounded-br-2xl px-2 py-3">
                            {
                                isLoadingStaff
                                    ? <PuffLoader color="white" size={20} />
                                    : <>
                                        <PiUsersFill size={23} />
                                        QL Nhân viên
                                    </>
                            }
                        </button>
                    </div>
                </div>
                <div className="text-[#d7d7d7] flex items-center justify-center gap-2 text-[13px]">
                    <LiaPhoneSquareSolid size={20} />
                    Hỗ trợ: 1800 2318
                </div>
            </div>
        </div>
    )
}

export default LoginPage;