'use client'

import { useAuth } from "@/context/auth.context";
import Link from "next/link";

const AppHeader = () => {
    const { token, clearToken } = useAuth();

    return (
        <>
            <div className="flex justify-between layout-container">
                <div className="py-5">
                    <img src="https://i0.wp.com/www.writefromscratch.com/wp-content/uploads/2018/12/demo-logo.png?fit=539%2C244&ssl=1&w=640"
                        alt="" width={90} />
                </div>

                <div className="flex items-center gap-4 py-5">
                    <nav className="menu">
                        <ul className="flex text-[14px] font-[500]">
                            <Link href={'/hotel_management'} className="px-4 py-[6px] duration-200 rounded-full hover:bg-white hover:shadow">
                                Quản lý khách sạn
                            </Link>
                            <li className="px-4 py-[6px] duration-200 rounded-full hover:bg-white hover:shadow">
                                Bảng giá
                            </li>
                            <li className="px-4 py-[6px] duration-200 rounded-full hover:bg-white hover:shadow">
                                Hỗ trợ
                            </li>
                            <li className="px-4 py-[6px] duration-200 rounded-full hover:bg-white hover:shadow">
                                Về Ota
                            </li>
                        </ul>
                    </nav>
                    {!token
                        ?
                        <div className="flex gap-2">
                            <Link href={'/login'}
                                className="border border-[#0070f4] hover:bg-[#e0eefe] text-[#0070f4] text-[14px] duration-200 font-[500] px-4 py-[6px] rounded-full">
                                Đăng nhập
                            </Link>
                            <a
                                target="_blank"
                                href={'/register'}
                                className="bg-[#0070f4] text-white text-[14px] font-[500] px-4 py-[6px] rounded-full">
                                Đăng ký
                            </a>
                        </div>

                        : <button onClick={clearToken}>Đăng xuất</button>
                    }
                </div>
            </div>
        </>
    );
}

export default AppHeader