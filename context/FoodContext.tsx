// FoodContext.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import useFoods from "@/hooks/useFoods";

interface FoodContextType {
    foods: any[];
    courseCount: number;
    loading: boolean;
    error: Error | null;
    refetch: () => void;
}

const FoodContext = createContext<FoodContextType | undefined>(undefined);

export const FoodProvider: React.FC = ({ children }) => {
    const { foods, courseCount, loading, error, refetch } = useFoods();

    return (
        <FoodContext.Provider value={{ foods, courseCount, loading, error, refetch }}>
            {children}
        </FoodContext.Provider>
    );
};

export const useFoodContext = (): FoodContextType => {
    const context = useContext(FoodContext);
    if (context === undefined) {
        throw new Error("useFoodContext must be used within a FoodProvider");
    }
    return context;
};
