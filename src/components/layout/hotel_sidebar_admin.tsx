'use client'

import Link from "next/link";

import { useEffect, useState } from "react";
import { MenuItem } from "@/types/backend";
import { usePathname } from 'next/navigation'
import { HOTELSIDEBARADMIN_NAV } from "@/constants/hotel_sidebar_admin";

interface IProps { }

const HotelSidebarAdmin: React.FC<IProps> = () => {
    const [menus, setMenus] = useState<MenuItem[]>(HOTELSIDEBARADMIN_NAV);
    const pathname = usePathname()

    useEffect(() => {
        setShowMenuActive(pathname);
    }, [])

    const setShowMenuActive = (pathname: string) => {
        let newMenus: MenuItem[] = []
        newMenus = menus.map(menu => {
            const menuitem = menu.href === pathname;
            const submenu = menu.subMenus.find(submenu => submenu.href === pathname);
            if (submenu) {
                menu.active = true;
            } else {
                if (menuitem) {
                    menu.active = true;
                } else {
                    menu.active = false;
                }
            }
            return menu;
        });
        setMenus(newMenus);
    }

    return (
        <div className="bg-[#0090da] w-full">
            <nav className={`menu-item-container-admin`}>
                <div className="flex justify-between">
                    <ul className="flex">
                        {menus
                            .filter(item => item.name !== "Lễ tân")
                            .map(item => (
                                <li key={item.id}
                                    onClick={() => item.subMenus.length <= 0 && setShowMenuActive(item.href || '')}
                                    className={`group rounded-md truncate`}>
                                    <Link href={item.href || ''}
                                        className={`menu-item !bg-transparent hover:!bg-[#0078b6] !text-white !duration-0 ${item.active && 'active'}`}>
                                        {item.icon}
                                        <span>
                                            {item.name}
                                        </span>
                                        <p className="hidden-title">{item.name}</p>
                                    </Link>
                                    {item.subMenus.length > 0 &&
                                        <ul
                                            className="absolute top-10 min-w-[280px] py-2 rounded-md invisible group-hover:visible bg-[#0078b6] shadow-[#808080] shadow-sm">
                                            {item.subMenus.map(submenu => (
                                                <li
                                                    onClick={() => setShowMenuActive(submenu.href || '')}
                                                    key={submenu.id}>
                                                    <Link href={submenu.href || ''}
                                                        className={`menu-item !bg-transparent !text-white !duration-0 hover:!bg-[#0090da] ${submenu.href === pathname && 'active'}`}>
                                                        {submenu.icon}
                                                        <span>{submenu.name}</span>
                                                        <p className="hidden-title">{submenu.name}</p>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    }
                                </li>
                            ))}
                    </ul>
                    <ul>
                        {menus
                            .filter(item => item.name === "Lễ tân")
                            .map(item => (
                                <li
                                    onClick={() => setShowMenuActive(item.href || '')}
                                    className={`group rounded-md truncate`}
                                    key={item.id}>
                                    <Link href={item.href || ''}
                                        className={`menu-item !text-white !duration-0 !bg-[#005c8f] hover:!bg-[#004f73] ${item.href === pathname && 'active'}`}>
                                        {item.icon}
                                        <span>{item.name}</span>
                                        <p className="hidden-title">{item.name}</p>
                                    </Link>
                                </li>
                            ))}
                    </ul>
                </div>
            </nav >
        </div>
    );
}

export default HotelSidebarAdmin;