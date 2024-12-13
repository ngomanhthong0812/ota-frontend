'use client'
import {
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    User,
    UserPlus,
    Phone,
    Users,
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react";

export function DropdownMenuHotel() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <DropdownMenu
            onOpenChange={(open) => setIsOpen(open)}
        >
            <DropdownMenuTrigger asChild>
                <div
                    className={`cursor-pointer hover:bg-white hover:bg-opacity-20 p-2 rounded-full duration-100 ${isOpen ? "bg-white" : "bg-transparent"
                        }`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        className={`${isOpen ? 'fill-[var(--room-empty-color-)] ' : 'fill-[white] '}`}
                    >
                        <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
                    </svg>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56  -translate-x-3">
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <User />
                        <span>Quản lý</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Users />
                        <span>Team</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Phone />
                    <span>Hổ trợ: <span className="text-[var(--room-empty-color-)]">039287demo</span></span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <LogOut />
                    <span>Đăng xuất</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
