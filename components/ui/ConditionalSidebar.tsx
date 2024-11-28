'use client'
import { useAuth } from "@/app/context/authContext";
import { Sidebar } from "./sidebar";

export const ConditionalSidebarLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
  
    return (
      <div className={`h-screen overflow-hidden w-full`}>
        <div className="bg-gray-100 dark:bg-gray-900 h-screen flex transition-colors duration-300 overflow-hidden">
          <div className="flex flex-grow overflow-hidden">
            {isAuthenticated ? <Sidebar /> : null}
            {children}
          </div>
        </div>
      </div>
    );
  };