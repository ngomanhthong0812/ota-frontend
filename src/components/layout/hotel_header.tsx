'use client'
import { useAuth } from '@/context/auth.context';
import { FiSearch } from 'react-icons/fi';
import { DropdownMenuHotel } from './hotel_dropdown_menu';
import { useState } from 'react';

const HotelHeader = () => {
    const { user } = useAuth();
    const [isShowDropdownMenu, setIsShowDropdownMenu] = useState<boolean>(true);

    return (
        <header className="bg-[var(--navbar-color-)] flex justify-between p-2 h-[50px] fixed w-full text-white z-10">
            <div className="logo flex items-center flex-1">
                <div className="w-[200px] flex items-center gap-2">
                    <img src="https://i0.wp.com/www.writefromscratch.com/wp-content/uploads/2018/12/demo-logo.png?fit=539%2C244&ssl=1&w=640"
                        alt="logo" width="80" height="80" />
                    <div className="hotel-name font-[500]">
                        Demo
                    </div>
                </div>
                <div className="search relative flex-1">
                    <input type="text" placeholder="Tìm kiếm..."
                        className="w-full rounded-md px-6 py-2 text-sm text-black outline-none" />
                    <FiSearch className="absolute top-[50%] translate-y-[-50%] left-1 text-gray-400" size={18} />
                </div>
            </div>
            <div className=" flex flex-1 items-center justify-end gap-1">
                <div className="account center p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                        <path
                            d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z">
                        </path>
                    </svg>
                    {user?.name}
                </div>
                <div className="country">
                    <img src="/vietnam.png" alt="" width="18" height="18" />
                </div>
                <div className="notification p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                        <path
                            d="m5.705 3.71-1.41-1.42C1 5.563 1 7.935 1 11h1l1-.063C3 8.009 3 6.396 5.705 3.71zm13.999-1.42-1.408 1.42C21 6.396 21 8.009 21 11l2-.063c0-3.002 0-5.374-3.296-8.647zM12 22a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22zm7-7.414V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.184 4.073 5 6.783 5 10v4.586l-1.707 1.707A.996.996 0 0 0 3 17v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-1a.996.996 0 0 0-.293-.707L19 14.586z">
                        </path>
                    </svg>
                </div>
                <DropdownMenuHotel />
            </div>

        </header>
    )
}

export default HotelHeader;