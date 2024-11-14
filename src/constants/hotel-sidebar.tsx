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

export const HotelSIDEBAR_NAV: MenuItem[] = [
    {
        id: uuid(),
        name: 'Thông tin chung',
        href: '/hotel-management',
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
                href: '/hotel-management/room-layout',
                icon: <BiSolidHome size={20} />,
                active: false,
                subMenus: []
            },
            {
                id: uuid(),
                name: 'Tạo đặt phòng',
                href: '/hotel-management/create-booking',
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
                href: '/hotel-management/cash-fund',
                icon: <BiWallet size={20} />,
                active: false,
                subMenus: []
            },
            {
                id: uuid(),
                name: 'Quỹ tiền gửi',
                href: '/hotel-management/deposit-fund',
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
                href: '/hotel-management/sales-invoice-creation',
                icon: <BiWallet size={20} />,
                active: false,
                subMenus: []
            },
            {
                id: uuid(),
                name: 'Tìm hoá đơn',
                href: '/hotel-management/sales-invoice-search',
                icon: <BiCreditCard size={20} />,
                active: false,
                subMenus: []
            }
        ]
    },
    {
        id: uuid(),
        name: 'Buồng phòng',
        href: '/hotel-management/buong-phong',
        icon: <BiSolidBuildings size={20} />,
        active: false,
        subMenus: []
    },
    {
        id: uuid(),
        name: 'Email marketing',
        href: '/hotel-management/email-marketing',
        icon: <BiSolidEnvelope size={20} />,
        active: false,
        subMenus: []
    },
    {
        id: uuid(),
        name: 'Quản lý kho',
        href: '/hotel-management/quan-ly-kho',
        icon: <BiSolidStoreAlt size={20} />,
        active: false,
        subMenus: []
    },
    {
        id: uuid(),
        name: 'Báo cáo',
        href: '/hotel-management/bao-cao',
        icon: <BiSolidFileBlank size={20} />,
        active: false,
        subMenus: []
    },
] 