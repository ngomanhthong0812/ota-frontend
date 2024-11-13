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
    BiSolidWallet,
} from "react-icons/bi";

export const HotelSIDEBAR_NAV = [
    {
        id: uuid(),
        name: 'Thông tin chung',
        icon: <BiSolidWidget size={20} />,
        active: true,
        subMenus: []
    },
    {
        id: uuid(),
        name: 'Quản lý đặt phòng',
        icon: <BiUserPin size={20} />,
        active: false,
        subMenus: []
    },
    {
        id: uuid(),
        name: 'Thu chi',
        icon: <BiCreditCard size={20} />,
        active: false,
        subMenus: [
            {
                id: uuid(),
                name: 'Quỹ tiền mặt',
                icon: <BiSolidWallet size={20} />,
                active: false,
                subMenus: []
            },
            {
                id: uuid(),
                name: 'Quỹ tiền gửi',
                icon: <BiCreditCard size={20} />,
                active: false,
                subMenus: []
            }
        ]
    },
    {
        id: uuid(),
        name: 'Quản lý bán hàng',
        icon: <BiSolidCart size={20} />,
        active: false,
        subMenus: []
    },
    {
        id: uuid(),
        name: 'Buồng phòng',
        icon: <BiSolidBuildings size={20} />,
        active: false,
        subMenus: []
    },
    {
        id: uuid(),
        name: 'Email marketing',
        icon: <BiSolidEnvelope size={20} />,
        active: false,
        subMenus: []
    },
    {
        id: uuid(),
        name: 'Quản lý kho',
        icon: <BiSolidStoreAlt size={20} />,
        active: false,
        subMenus: []
    },
    {
        id: uuid(),
        name: 'Báo cáo',
        icon: <BiSolidFileBlank size={20} />,
        active: false,
        subMenus: []
    },
] 