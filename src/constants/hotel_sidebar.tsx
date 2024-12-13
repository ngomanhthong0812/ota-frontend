import { v4 as uuid } from 'uuid';
import {
    BiSolidCart,
    BiUserPin,
    BiSolidStoreAlt,
    BiSolidWidget,
    BiCreditCard,
    BiSolidBuildings,
    BiSolidFileBlank,
    BiSolidEnvelope,
    BiWallet,
    BiSolidHome,
    BiUserPlus
} from "react-icons/bi";
import { MenuItem } from '@/types/backend';

export const HOTELSIDEBAR_NAV: MenuItem[] = [
    {
        id: uuid(),
        name: 'Thông tin chung',
        href: '/hotel_management',
        icon: <BiSolidWidget size={20} />,
        active: true,
        subMenus: []
    },
    {
        id: uuid(),
        name: 'Quản lý đặt phòng',
        href: null,
        icon: <BiUserPin size={20} />,
        active: false,
        subMenus: [
            {
                id: uuid(),
                name: 'Sơ đồ phòng',
                href: '/hotel_management/room_layout/home',
                icon: <BiSolidHome size={20} />,
                active: false,
                subMenus: []
            },
            {
                id: uuid(),
                name: 'Tạo đặt phòng',
                href: '/hotel_management/create_booking',
                icon: <BiUserPlus size={20} />,
                active: false,
                subMenus: []
            }
        ]
    },
    {
        id: uuid(),
        name: 'Thu chi',
        href: null,
        icon: <BiCreditCard size={20} />,
        active: false,
        subMenus: [
            {
                id: uuid(),
                name: 'Quỹ tiền mặt',
                href: '/hotel_management/cash_fund',
                icon: <BiWallet size={20} />,
                active: false,
                subMenus: []
            },
            {
                id: uuid(),
                name: 'Quỹ tiền gửi',
                href: '/hotel_management/deposit_fund',
                icon: <BiCreditCard size={20} />,
                active: false,
                subMenus: []
            }
        ]
    },
    {
        id: uuid(),
        name: 'Quản lý bán hàng',
        href: null,
        icon: <BiSolidCart size={20} />,
        active: false,
        subMenus: [
            {
                id: uuid(),
                name: 'Tạo hoá đơn',
                href: '/hotel_management/sales_invoice_creation',
                icon: <BiWallet size={20} />,
                active: false,
                subMenus: []
            },
            {
                id: uuid(),
                name: 'Tìm hoá đơn',
                href: '/hotel_management/sales_invoice_search',
                icon: <BiCreditCard size={20} />,
                active: false,
                subMenus: []
            }
        ]
    },
    {
        id: uuid(),
        name: 'Buồng phòng',
        href: '/hotel_management/buong_phong',
        icon: <BiSolidBuildings size={20} />,
        active: false,
        subMenus: []
    },
    {
        id: uuid(),
        name: 'Email marketing',
        href: '/hotel_management/email_marketing',
        icon: <BiSolidEnvelope size={20} />,
        active: false,
        subMenus: []
    },
    {
        id: uuid(),
        name: 'Quản lý kho',
        href: '/hotel_management/quan_ly_kho',
        icon: <BiSolidStoreAlt size={20} />,
        active: false,
        subMenus: []
    },
    {
        id: uuid(),
        name: 'Báo cáo',
        href: '/hotel_management/bao_cao',
        icon: <BiSolidFileBlank size={20} />,
        active: false,
        subMenus: []
    },
] 