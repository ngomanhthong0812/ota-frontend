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