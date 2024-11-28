"use client"
import { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
    isDarkTheme: true | false;
    toggleTheme: () => void;
}

const AppContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
      }
    return context;
}

export const ThemeProvider = ({ children }: { children: React.ReactNode; }) => {
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    }

    useEffect(() => {
        const html = document.documentElement;
        if (isDarkTheme){
            html.classList.add("dark");
        }else {
            html.classList.remove("dark");
        }
    }, [isDarkTheme])

    return <AppContext.Provider value={{ isDarkTheme, toggleTheme  }}>{children}</AppContext.Provider>
}