// src/components/Navbar.tsx
"use client";
import Cookies from "js-cookie";
import { logoutProcess } from "@/services/auth";
import { LogOut, Share2, IdCard, Stethoscope, Pill, Calculator, BookOpen, Mail, Folder, BarChart2, Settings, BoxIcon, User2Icon, Home } from "lucide-react";
import { useRouter } from "next/navigation";




export default function Navbar() {

    const router = useRouter();

    const menus = [
         {
            label: "Dashboard",
            icon: Home,
            click: () => router.push("/dashboard"),
        },
        {
            label: "Produk",
            icon: BoxIcon,
            click: () => router.push("/product"),
        },
        // {
        //     label: "User",
        //     icon: User2Icon,
        //     click: () => router.push("/user"),
        // }
    ]
    const logout = async () => {
        const res = await logoutProcess();
        const token = Cookies.get("token");
        if (!token) {
            router.replace("/login");
        }
    }
    return (
        <div className="w-full">
            {/* Top Bar */}
            <div className="flex justify-between items-center bg-teal-500 px-6 py-2 text-white">
                <div className="flex items-center space-x-2">
                    <Share2 size={18} />
                    <span>Kisun Kreasi Digital</span>
                </div>
                {/* <div className="font-bold">Home Test</div> */}
                <div onClick={logout} className="bg-red-400 p-2 rounded-r-md cursor-pointer hover:bg-red-500">
                    <LogOut size={20} />
                </div>
            </div>

            <div className="flex justify-center space-x-10 bg-gray-800 text-white py-3 text-sm">
                {menus.map((menu, index) => (
                    <div onClick={menu.click} key={index} className="flex flex-col items-center cursor-pointer hover:text-teal-300">
                        <menu.icon size={22} />
                        <span>{menu.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
