'use client'

import Link from "next/link";

import {
    BiChevronRight,
    BiChevronLeftCircle
} from "react-icons/bi";
import { HotelSIDEBAR_NAV } from "@/constants/hotel-sidebar";
import { useCallback, useEffect, useState } from "react";
import { MenuItem } from "@/types/backend";
import { usePathname } from 'next/navigation'


interface IProps { }

const HotelSidebar: React.FC<IProps> = () => {
    const [menus, setMenus] = useState<MenuItem[]>(HotelSIDEBAR_NAV);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);
    const pathname = usePathname()

    useEffect(() => {
        setShowMenuActive(pathname);
    }, [])
    const handleActiveMenu = useCallback((e: React.MouseEvent<HTMLLIElement>, id: string, idParent: string, submenusParent: MenuItem[]) => {
        let newMenus: MenuItem[] = []
        e.stopPropagation(); // ngăn event ảnh hưởng ptu cha

        if (submenusParent.length > 0) {
            newMenus = menus.map(menu => {
                // Kiểm tra nếu là menu chính
                if (menu.id === id) {
                    return { ...menu, showSubMenu: !menu.showSubMenu }; // Toggled submenu
                }
                if (menu.id !== id && menu.id !== idParent) {
                    menu.showSubMenu = false;
                }

                //kiểm tra submenu
                if (menu.subMenus && menu.subMenus.length > 0) {
                    menu.subMenus = menu.subMenus.map(subItem => {
                        if (subItem.id === id) {
                            menus.forEach(menu => menu.active = false);
                            return { ...subItem, active: true }
                        } else {
                            return { ...subItem, active: false }
                        }
                    })
                }
                return menu;
            })
        } else {
            newMenus = menus.map(menu => {
                menu.showSubMenu = false;
                menu.subMenus.forEach(menu => menu.active = false);
                return menu.id === id ? { ...menu, active: true } : { ...menu, active: false }
            })
        }
        setMenus(newMenus);
    }, [menus]);

    const handleToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }
    const setShowMenuActive = (pathname: string) => {
        let newMenus: MenuItem[] = []
        newMenus = menus.map(menu => {
            const submenu = menu.subMenus.find(submenu => submenu.href === pathname);
            if (submenu) {
                menu.showSubMenu = true;
            }
            return menu;
        });
        setMenus(newMenus);
    }

    return (
        <nav className={`menu-item-container ${!isMenuOpen && 'menu-item-container_toggle'}`}>
            <ul>
                {menus.map(item => (
                    <li key={item.id} onClick={(e) => handleActiveMenu(e, item.id, item.id, item.subMenus)} className={`${item.showSubMenu && 'show-submenu'}`}>
                        <Link href={item.href || ''} className={`menu-item ${item.href === pathname && 'active'}`}>
                            {item.icon}
                            <span>
                                {item.name}
                                {item.subMenus.length > 0 && <BiChevronRight size={20} className="menu-item_icon" />}
                            </span>
                            <p className="hidden-title">{item.name}</p>
                        </Link>
                        {item.subMenus.length > 0 &&
                            (
                                <ul className="submenu">
                                    {item.subMenus.map(submenu => (
                                        <li key={submenu.id} onClick={(e) => handleActiveMenu(e, submenu.id, item.id, item.subMenus)}>
                                            <Link href={submenu.href || ''} className={`menu-item ${submenu.href === pathname && 'active'}`}>
                                                {submenu.icon}
                                                <span>{submenu.name}</span>
                                                <p className="hidden-title">{submenu.name}</p>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )
                        }
                    </li>
                ))}
            </ul>
            <div
                className="btn-menu_toggle cursor-pointer fixed w-[210px] flex justify-end bottom-0 left-0 bg-[var(--navbar-color-)] p-1"
                onClick={handleToggleMenu}>
                <BiChevronLeftCircle size={25} />
            </div>
        </nav >
    );
}

export default HotelSidebar;