import Link from "next/link";

import {
    BiSolidCart,
    BiUserPin,
    BiSolidStoreAlt,
    BiSolidWidget,
    BiCreditCard,
    BiSolidBuildings,
    BiSolidFileBlank,
    BiSolidEnvelope,
    BiSolidWallet,
    BiChevronRight,
    BiChevronLeftCircle
} from "react-icons/bi";
import { HotelSIDEBAR_NAV } from "@/constants/hotel-sidebar";

const HotelSidebar = () => {

    return (
        <nav className="menu-item-container">
            <ul>
                {HotelSIDEBAR_NAV.map(item => (
                    <li>
                        <Link href="" className={`menu-item ${item.active && 'active'}`}>
                            {item.icon}
                            <span>
                                {item.name}
                                {item.subMenus.length > 0 && <BiChevronRight size={20} className="menu-item_icon" />}
                            </span>
                            <p className="hidden-title">{item.name}</p>
                        </Link>
                        {item.subMenus.length > 0 &&
                            (
                                item.subMenus.map(submenu => (
                                    <ul className="submenu">
                                        <li>
                                            <Link href="" className="menu-item">
                                                {submenu.icon}
                                                <span>{submenu.name}</span>
                                                <p className="hidden-title">{submenu.name}</p>
                                            </Link>
                                        </li>
                                    </ul>
                                ))
                            )
                        }
                    </li>
                ))}
            </ul>
            <div
                className="btn-menu_toggle cursor-pointer fixed w-[200px] flex justify-end bottom-0 left-0 bg-[var(--navbar-color-)] p-1">
                <BiChevronLeftCircle size={25} />
            </div>
        </nav>
    );
}

export default HotelSidebar;