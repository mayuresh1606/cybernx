"use client"
import React from "react"
import { Button } from "./button"
import { FileText, LogOut, Settings, Users, Home } from "lucide-react"
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/authContext";

export const Sidebar = () => {
    const { logout } = useAuth();
    const router = useRouter();
    return <>
        <aside className="bg-white dark:bg-gray-800 w-64 max-h-screen p-4 sticky">
            <nav className="space-y-2">
              <Button onClick={() => router.push("/")} variant="ghost" className="w-full justify-start flex h-[8%]">
                <Home className="flex justify-center my-auto mr-2  h-4 w-4" />
                Dashboard
              </Button>
              <Button onClick={() => router.push("/list")} variant="ghost" className="w-full justify-start flex h-[8%]">
                <Users className="flex justify-center my-auto mr-2  h-4 w-4" />
                Vendors
              </Button>
              <Button onClick={() => router.push("/form")} variant="ghost" className="w-full justify-start flex h-[8%]">
                <FileText className="flex justify-center my-auto mr-2  h-4 w-4" />
                Reports
              </Button>
              <Button variant="ghost" className="w-full justify-start flex h-[8%]">
                <Settings className="flex justify-center my-auto mr-2  h-4 w-4" />
                Settings
              </Button>
            </nav>
            <div className="absolute bottom-4 w-[80%] mx-auto">
              <Button onClick={() => logout()} variant="ghost" className="w-full justify-start flex h-[8%] text-red-600 dark:text-red-400">
                <LogOut className="flex my-auto mr-2 justify-center h-4 w-auto" />
                Logout
              </Button>
            </div>
          </aside>
    </>
}