import { v4 as uuid } from "uuid";
import { BiUserPlus } from "react-icons/bi";
import { MdBedroomParent } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import { MdSettings } from "react-icons/md";
import { RiFlowerLine } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { RiUser4Fill } from "react-icons/ri";
import { GiStoneBlock } from "react-icons/gi";

import { MenuItem } from "@/types/backend";
import { GrTransaction } from "react-icons/gr";
import { LiaFileInvoiceSolid } from "react-icons/lia";

export const HOTELSIDEBARADMIN_NAV: MenuItem[] = [
  {
    id: uuid(),
    name: "Tổng quan",
    href: "/admin_management",
    icon: <FaEye size={20} />,
    active: true,
    subMenus: [],
  },
  {
    id: uuid(),
    name: "Phòng",
    href: null,
    icon: <MdBedroomParent size={20} />,
    active: false,
    subMenus: [
      {
        id: uuid(),
        name: "Phòng",
        href: "/admin_management/room_manager",
        icon: <MdBedroomParent size={20} />,
        active: false,
        subMenus: [],
      },
      // {
      //   id: uuid(),
      //   name: "Loại phòng",
      //   href: "/admin_management/create_booking",
      //   icon: <BiUserPlus size={20} />,
      //   active: false,
      //   subMenus: [],
      // },
    ],
  },
  {
    id: uuid(),
    name: "Nhân viên",
    href: null,
    icon: <FaUserGroup size={18} />,
    active: false,
    subMenus: [
      {
        id: uuid(),
        name: "Nhân viên",
        href: "/admin_management/employees",
        icon: <FaUserGroup size={18} />,
        active: false,
        subMenus: [],
      },
      // {
      //   id: uuid(),
      //   name: "Thiết lập nhân viên",
      //   href: "/admin_management/staff_setup",
      //   icon: <MdSettings size={20} />,
      //   active: false,
      //   subMenus: [],
      // },
      {
        id: uuid(),
        name: "Tài khoản",
        href: "/admin_management/users",
        icon: <RiUser4Fill size={20} />,
        active: false,
        subMenus: [],
      },
    ],
  },
  {
    id: uuid(),
    name: "Hàng hoá",
    href: null,
    icon: <GiStoneBlock size={18} />,
    active: false,
    subMenus: [
      {
        id: uuid(),
        name: "Hàng hoá",
        href: "/admin_management/services",
        icon: <GiStoneBlock size={18} />,
        active: false,
        subMenus: [],
      },
    ],
  },
  {
    id: uuid(),
    name: "Giao dịch",
    href: "",
    icon: <GrTransaction size={18} />,
    active: false,
    subMenus: [
      {
        id: uuid(),
        name: "Đặt phòng",
        href: "/admin_management/order_room",
        icon: <MdBedroomParent size={18} />,
        active: false,
        subMenus: [],
      },
      {
        id: uuid(),
        name: "Hóa đơn",
        href: "/admin_management/invoices",
        icon: <LiaFileInvoiceSolid size={18} />,
        active: false,
        subMenus: [],
      },
    ],
  },
  {
    id: uuid(),
    name: "Lễ tân",
    href: "/hotel_management",
    icon: <RiFlowerLine size={20} />,
    active: false,
    subMenus: [],
  },
];
