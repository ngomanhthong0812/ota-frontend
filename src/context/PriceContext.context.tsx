import React, { createContext, useState, ReactNode, useContext } from "react";

// Tạo context với kiểu dữ liệu
type PriceContextType = {
  priceType: "hourly_rate" | "daily_rate" | "overnight_rate";
  setPriceTypeContext: React.Dispatch<
    React.SetStateAction<"hourly_rate" | "daily_rate" | "overnight_rate">
  >;
  roomCount: number;
  setRoomCountContext: React.Dispatch<React.SetStateAction<number>>;
};

// Tạo context
const PriceContext = createContext<PriceContextType | undefined>(undefined);

// Tạo Provider để cung cấp giá trị cho các component con
export const PriceProvider = ({ children }: { children: ReactNode }) => {
  const [priceType, setPriceTypeContext] = useState<
    "hourly_rate" | "daily_rate" | "overnight_rate"
  >("daily_rate");
  const [roomCount, setRoomCountContext] = useState<number>(0);

  return (
    <PriceContext.Provider
      value={{ priceType, setPriceTypeContext, roomCount, setRoomCountContext }}
    >
      {children}
    </PriceContext.Provider>
  );
};

// Hook custom để sử dụng context
export const usePrice = () => {
  const context = useContext(PriceContext);
  if (!context) {
    throw new Error("usePrice must be used within a PriceProvider");
  }
  return context;
};
