import { JSX, ReactNode } from 'react';
export interface RoomTypes {
    id: number;
    name: string;
    notes: string;
    standard_capacity: number;
    max_capacity: number;
    standard_children: number;
    max_children: number;
    hourly_rate: number;
    daily_rate: number;
    overnight_rate: number;
  }
  

  
  export interface RoomStateType {
    defaultPrice: number | null;
    roomId: number | null;
    roomType: string;
    roomNumber: number | null;
    source: string;
    adults: number;
    children: number;
  }
  
  export interface CustomerType {
    guestName: string;
    guestID: string;
    guestEmail: string;
    guestPhone: string;
    gender: "male" | "female" | null;
  }
  
  export interface PaymentType {
    subTotal: number;
    taxFee: number;
    paidAmount: number;
    remainingAmount: number;
    totalAmount: number;
    paymentMethod: String | null;
  }
  
  export interface DateType {
    startDate: string | "";
    endDate: string | "";
  }