'use client'
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';

interface TypeToolbarContext {
    selectedToolbar: string,
    handleSelectedToobar: (value: string) => void,
}

const ToolbarContext = createContext<TypeToolbarContext | undefined>(undefined);

export const ToolbarProvider = ({ children }: { children: ReactNode }) => {
    const [selectedToolbar, setSelectedToolbar] = useState<string>('Đặt phòng');

    const handleSelectedToobar = (name: string) => {
        setSelectedToolbar(name);
    }

    return (
        <ToolbarContext.Provider value={{ selectedToolbar, handleSelectedToobar }}>
            {children}
        </ToolbarContext.Provider>
    )
}

export const useToolbar = () => {
    const context = useContext(ToolbarContext);

    if (!context) {
        throw new Error('useToolbar must be used within a ToolbarProvider');
    }
    return context;
};