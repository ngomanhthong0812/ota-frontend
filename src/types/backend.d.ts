import { ReactNode } from 'react';
interface MenuItem {
    id: string,
    name: string,
    href: string | null,
    icon: ReactNode,
    active: boolean;
    showSubMenu?: boolean,
    subMenus: MenuItem[];
}

interface RoomStatus {
    id: string,
    name: string,
    count: number
    class: string,
    classCard: string,
    rootColor: string,
}

interface TypeRoomCard {
    id: number,
    name: string,
    clean_status: false,
    status: string,
    price: number,
    room_type: string,
    floor: Floor,
    hotel: string,
    bookings: Bookings[],
}
interface Floor {
    id: number,
    name: string,
    lever: number,
    room_count: number,
    hotel_id: number,
}
interface Bookings {
    id: number,
    check_in_at: string,
    check_out_at: string,
    status: string,
}
