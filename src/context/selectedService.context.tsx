'use client'
import { SelectedServiceType } from '@/types/backend';
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
interface TypeSelectedServiceContext {
    selectedService: SelectedServiceType[],
    totalService: number,
    totalServicePrice: number,
    handleAddSelectedService: (service: SelectedServiceType) => void,
    handleClearSelectedService: (id: number) => void,
    handleIncreaseQuantityService: (quantity: number, id: number) => void,
    handleDecreaseQuantityService: (quantity: number, id: number) => void,
    handleClearAllSelectedService: () => void,
}
const SelectedServiceContext = createContext<TypeSelectedServiceContext | undefined>(undefined);

export const SelectedServiceProvider = ({ children }: { children: ReactNode }) => {
    const [selectedService, setSelectedService] = useState<SelectedServiceType[]>([]);
    const [totalService, setTotalService] = useState<number>(0);
    const [totalServicePrice, setTotalServicePrice] = useState<number>(0);

    useEffect(() => {
        let countQuantity: number = 0;
        let totalPrice: number = 0;
        selectedService.forEach(item => {
            countQuantity += item.quantity;
            totalPrice += item.unit_price * item.quantity;
        });
        setTotalService(countQuantity);
        setTotalServicePrice(totalPrice);
    }, [selectedService]);

    const handleAddSelectedService = (service: SelectedServiceType) => {
        if (selectedService.find(item => item.id === service.id)) {
            setSelectedService(prev => prev.map(item => {
                return item.id === service.id ? { ...item, quantity: item.quantity + 1 } : item;
            }));
        } else {
            setSelectedService(prev => [...prev, service])
        }
    }
    const handleClearSelectedService = (id: number) => {
        setSelectedService(prev => prev.filter(item => item.id !== id));
    }
    const handleIncreaseQuantityService = (quantity: number, id: number) => {
        setSelectedService(prev => prev.map(item => {
            return item.id === id ? { ...item, quantity: item.quantity + quantity } : item;
        }));
    }
    const handleDecreaseQuantityService = (quantity: number, id: number) => {
        setSelectedService(prev => prev.map(item => {
            return (item.id === id && item.quantity > 1) ? { ...item, quantity: item.quantity - quantity } : item;
        }));
    }
    const handleClearAllSelectedService = () => {
        setSelectedService([]);
    }
    return (
        <SelectedServiceContext.Provider
            value={{
                selectedService,
                totalService,
                totalServicePrice,
                handleAddSelectedService,
                handleClearSelectedService,
                handleIncreaseQuantityService,
                handleDecreaseQuantityService,
                handleClearAllSelectedService,
            }}>
            {children}
        </SelectedServiceContext.Provider>
    )
}

export const useSelectedService = () => {
    const context = useContext(SelectedServiceContext);
    if (!context) {
        throw new Error('useToolbar must be used within a ToolbarProvider');
    }
    return context;
}