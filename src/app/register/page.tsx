'use client'
import styled from "@emotion/styled";
import { TextField, Container, InputAdornment } from "@mui/material";

import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { PuffLoader } from "react-spinners";

interface FormDataType {
    userName: string,
    hotelName: string,
    email: string,
    password: string,
    confirmPassword: string,
}
const CustomTextField = styled(TextField)({
    marginTop: "7px",
    "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
    },
    "& .MuiOutlinedInput-input": {
        padding: "12px",
    },
    "& .MuiFormLabel-root": {
        fontSize: "15px",
        top: '-3px',
        color: '#a8a8a8'
    },
});

const RegisterPage = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [isAgreed, setIsAgreed] = useState<boolean>(true);
    const [isRegister, setIsRegister] = useState<boolean>(false);
    const [resData, setResData] = useState<any>({});

    const [formData, setFormData] = useState<FormDataType>({
        userName: "",
        hotelName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState<any>({});

    const handleCloseTab = () => {
        window.close(); // Đóng tab hiện tại
    };
    const handleClickShowPassword = (e: any) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    }
    const handleClickShowConfirmPassword = (e: any) => {
        e.preventDefault();
        setShowConfirmPassword(!showConfirmPassword);
    }

    const validateForm = () => {
        const newErrors: any = {};
        if (!formData.userName) newErrors.userName = "Tên tài khoản không được để trống";
        if (!formData.hotelName) newErrors.hotelName = "Tên khách sạn không được để trống";
        if (!formData.email) {
            newErrors.email = "Email không được để trống";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email không hợp lệ";
        }
        if (!formData.password) {
            newErrors.password = "Mật khẩu không được để trống";
        } else if (formData.password.length < 6) {
            newErrors.password = "Mật khẩu phải chứa ít nhất 6 ký tự";
        }
        if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = "Mật khẩu không khớp";
        }

        if (!isAgreed) {
            newErrors.error = "Bạn chưa đồng ý với điều khoản và chính sách sử dụng của Ota";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            if (validateForm()) {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: formData.userName,
                        email: formData.email,
                        password: formData.password,
                        name_hotel: formData.hotelName,
                        role_name: 'Admin',
                    })
                })
                const responseData: any = await response.json();
                if (responseData.statusCode === 200) {
                    setResData({
                        id: responseData.data.id,
                        name: responseData.data.username,
                        email: responseData.data.email,
                    })
                    setIsRegister(true);
                } else {
                    setErrors((prevErrors: any) => ({ ...prevErrors, error: responseData.message }));
                }
            }
        } catch (error) {
            setErrors((prevErrors: any) => ({ ...prevErrors, error: 'Server Error' }));
            console.error('Error register:', error);
        }
    }

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsAgreed(event.target.checked);
    };

    const goToLogin = () => {
        router.push('/login');
    }
    return (
        <div className="w-full h-[100vh] bg-white flex">
            <div className="w-[42%] h-full banner-register text-white flex flex-col items-center justify-center">
                <span className="font-[600] text-[30px] text-center leading-10">
                    Quản lý khách sạn dễ dàng
                    <br />
                    Vận hành kinh doanh đơn giản
                </span>
                <p className="hotline">Hỗ trợ đăng ký 1800 2318</p>
            </div>
            <div className="w-[58%]">
                {isRegister
                    ? <div className="w-full h-full flex items-center justify-center">
                        < ActiveEmail resData={resData} goToLogin={goToLogin} />
                    </div>
                    : (
                        <div>
                            <div className="h-[130px] relative flex items-end justify-center font-[600] text-[23px] text-[#1f2328] mb-4">
                                <h1>Tạo tài khoản dùng thử miễn phí</h1>
                                <div className="absolute top-7 right-7 cursor-pointer" onClick={handleCloseTab}><IoCloseOutline size={25} /></div>
                            </div>
                            <Container maxWidth="sm"
                                sx={{
                                    width: "60%",
                                    margin: "0 auto",
                                }}
                            >
                                <CustomTextField
                                    label="Tên tài khoản"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={formData.userName}
                                    error={!!errors.userName}
                                    helperText={errors.userName}
                                    onChange={(e) => setFormData(prevData => ({ ...prevData, userName: e.target.value }))}
                                />
                                <CustomTextField
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={formData.email}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={(e) => setFormData(prevData => ({ ...prevData, email: e.target.value }))}
                                />
                                <TextField
                                    label="Mật khẩu"
                                    type={showPassword ? "text" : "password"}
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    sx={{
                                        marginTop: "7px",
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "8px",
                                        },
                                        "& .MuiOutlinedInput-input": {
                                            padding: "12px",
                                        },
                                        "& .MuiFormLabel-root": {
                                            fontSize: "15px",
                                            top: "-3px",
                                            color: "#a8a8a8",
                                        },
                                    }}
                                    value={formData.password}
                                    error={!!errors.password}
                                    helperText={errors.password}
                                    onChange={(e) =>
                                        setFormData((prevData) => ({ ...prevData, password: e.target.value }))
                                    }
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {showPassword ? (
                                                    <MdOutlineVisibilityOff
                                                        onClick={handleClickShowPassword}
                                                        size={18}
                                                        style={{ cursor: "pointer", fill: "#646464" }}
                                                    />
                                                ) : (
                                                    <MdOutlineVisibility
                                                        onClick={handleClickShowPassword}
                                                        size={18}
                                                        style={{ cursor: "pointer", fill: "#646464" }}
                                                    />
                                                )}
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    label="Nhập lại mật khẩu"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    sx={{
                                        marginTop: "7px",
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "8px",
                                        },
                                        "& .MuiOutlinedInput-input": {
                                            padding: "12px",
                                            paddingRight: "35px"
                                        },
                                        "& .MuiFormLabel-root": {
                                            fontSize: "15px",
                                            top: '-3px',
                                            color: '#a8a8a8'
                                        },
                                    }}
                                    value={formData.confirmPassword}
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword}
                                    onChange={(e) => setFormData(prevData => ({ ...prevData, confirmPassword: e.target.value }))}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {showConfirmPassword ? (
                                                    <MdOutlineVisibilityOff
                                                        onClick={handleClickShowConfirmPassword}
                                                        size={18}
                                                        style={{ cursor: "pointer", fill: "#646464" }}
                                                    />
                                                ) : (
                                                    <MdOutlineVisibility
                                                        onClick={handleClickShowConfirmPassword}
                                                        size={18}
                                                        style={{ cursor: "pointer", fill: "#646464" }}
                                                    />
                                                )}
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <CustomTextField
                                    label="Tên khách sạn"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={formData.hotelName}
                                    error={!!errors.hotelName}
                                    helperText={errors.hotelName}
                                    onChange={(e) => setFormData(prevData => ({ ...prevData, hotelName: e.target.value }))}
                                />
                                <p className="text-[14px] flex items-center gap-2 mt-[7px] ml-2 text-[#8a8a8a]">
                                    <input type="checkbox" checked={isAgreed} onChange={handleCheckboxChange} className="transform scale-150 cursor-pointer" />
                                    Tôi đã đọc và đồng ý
                                    <span className="text-[#0070f4] font-[500]">Điều khoản và chính sách sử dụng</span>
                                    của Ota
                                </p>
                                <span className="text-[#d32f2f] text-[0.75rem]">{errors.error}</span>
                                <div className="flex justify-end mt-[10px]">
                                    <button
                                        className="bg-[#0070f4] text-white text-[14px] font-[500] px-6 py-[8px] rounded-full"
                                        onClick={handleSubmit}
                                    >Đăng ký</button>
                                </div>
                            </Container>
                        </div>
                    )
                }

            </div>
        </div>
    );
}

interface ActiveEmailType {
    resData: any,
    goToLogin: () => void,
}

export const ActiveEmail: React.FC<ActiveEmailType> = ({ resData, goToLogin }) => {
    const [resendEmail, setResendEmail] = useState<boolean>(false);
    const [count, setCount] = useState<number>(60);
    const [code, setCode] = useState<string>('');
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    console.log(resData);

    useEffect(() => {
        if (resendEmail) {
            const time = setInterval(() => {
                setCount(prev => prev >= 1 ? prev - 1 : 60);
            }, 1000)
            return () => {
                clearInterval(time);
            }
        }
    }, [resendEmail])

    useEffect(() => {
        if (count === 0) {
            setResendEmail(false);
        }
    }, [count]);

    const handleResendEmail = async () => {
        try {
            if (!resendEmail) {

                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/mail`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(resData),
                })
                if (response.ok) {
                    setCount(60);
                    setResendEmail(true);
                }
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    const handleSubmit = async () => {
        if (code) {
            setIsLoading(true);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/activeCode`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: resData.id,
                        code,
                    }),
                })
                const responseData: any = await response.json();
                if (responseData.statusCode === 200) {
                    console.log("Xác nhận thành công");
                    setError('');
                    goToLogin();
                } else {
                    setError(responseData.message);
                    setIsLoading(false);
                }
            } catch (error) {
                setIsLoading(false);
                console.log('error', error);
                setError("Server Erorr");
            }
        } else {
            setError('vui lòng nhập mã xác nhận');
        }
    }

    return (
        <div className="text-center px-5 flex flex-col items-center justify-center">
            <div className="mb-4">Xác thực tài khoản, vui lòng nhập mã xác nhận đã được gửi tới email!</div>
            <CustomTextField
                label="Mã xác nhận"
                variant="outlined"
                fullWidth
                margin="normal"
                value={code}
                error={!!error}
                helperText={error}
                onChange={(e) => setCode(e.target.value)}
            />
            <div className="flex justify-end mt-[10px] gap-4">
                <button
                    disabled={resendEmail}
                    className="text-[#0070f4] text-[14px] font-[500] py-[8px] rounded-full"
                    onClick={handleResendEmail}
                >{resendEmail && count}Gửi lại mã</button>
                <button
                    className="bg-[#0070f4] text-white text-[14px] font-[500] px-6 py-[8px] rounded-full"
                    onClick={handleSubmit}
                >
                    {
                        isLoading
                            ? <PuffLoader color="white" size={20} />
                            : <span>Xác nhận</span>
                    }
                </button>
            </div>
        </div>
    )
}

export default RegisterPage;
