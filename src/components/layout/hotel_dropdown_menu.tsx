'use client'
import {
    LogOut,
    User,
    Phone,
    Users,
} from "lucide-react"

import { useRouter } from 'next/navigation'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth.context";

export function DropdownMenuHotel() {
    const router = useRouter();
    const { user } = useAuth();
    const { clearToken } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const logout = () => {
        router.push('/');
        clearToken();
    }

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
                {user?.role === 'Admin' &&
                    <DropdownMenuGroup>
                        <Link href={'/admin_management'}>
                            <DropdownMenuItem>
                                <User />
                                <span>Quản lý</span>
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuGroup>
                }
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
                <DropdownMenuItem onClick={logout}>
                    <LogOut />
                    <span>Đăng xuất</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
