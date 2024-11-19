import { v4 as uuid } from 'uuid';
import { RoomStatus } from '@/types/backend';

export const ROOM_STATUS = {
    EMPTY: 'Trống',
    BOOKED: 'Đã đặt',
    NOT_ARRIVED: 'Chưa đến',
    OCCUPIED: 'Có khách',
    NOT_CHECKED_OUT: 'Chưa đi'
};

export const HOTEL_ROOMSTATUS_NAV: RoomStatus[] = [
    {
        id: uuid(),
        name: ROOM_STATUS.EMPTY,
        count: 0,
        class: 'room-empty',
        classCard: 'room-item-empty',
        rootColor: '--room-empty-color-',
    },
    {
        id: uuid(),
        name: ROOM_STATUS.BOOKED,
        count: 0,
        class: 'room-booked',
        classCard: 'room-item-booked',
        rootColor: '--room-empty-color-',
    },
    {
        id: uuid(),
        name: ROOM_STATUS.NOT_ARRIVED,
        count: 0,
        class: 'room-not-arrived',
        classCard: 'room-item-not-arrived',
        rootColor: '--room-empty-color-',
    },
    {
        id: uuid(),
        name: ROOM_STATUS.OCCUPIED,
        count: 0,
        class: 'room-occupied',
        classCard: 'room-item-occupied',
        rootColor: '--room-empty-color-',
    },
    {
        id: uuid(),
        name: ROOM_STATUS.NOT_CHECKED_OUT,
        count: 0,
        class: 'room-not-checked-out',
        classCard: 'room-item-out-of-service',
        rootColor: '--room-empty-color-',
    }
]
