import { v4 as uuid } from 'uuid';
import { RoomStatus } from '@/types/backend';

export const HOTEL_ROOMSTATUS_NAV: RoomStatus[] = [
    {
        id: uuid(),
        name: 'Trống',
        count: 0,
        class: 'room-empty',
        classCard: 'room-item-empty',
        rootColor: '--room-empty-color-',
    },
    {
        id: uuid(),
        name: 'Đã đặt',
        count: 0,
        class: 'room-booked',
        classCard: 'room-item-booked',
        rootColor: '--room-empty-color-',
    },
    {
        id: uuid(),
        name: 'Chưa đến',
        count: 0,
        class: 'room-not-arrived',
        classCard: 'room-item-not-arrived',
        rootColor: '--room-empty-color-',
    },
    {
        id: uuid(),
        name: 'Có khách',
        count: 0,
        class: 'room-occupied',
        classCard: 'room-item-occupied',
        rootColor: '--room-empty-color-',
    },
    {
        id: uuid(),
        name: 'Chưa đi',
        count: 0,
        class: 'room-not-checked-out',
        classCard: 'room-item-out-of-service',
        rootColor: '--room-empty-color-',
    }
]
