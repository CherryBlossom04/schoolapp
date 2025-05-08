// src/components/ParentLayout.tsx

import { Navbar } from "@/components/common/Navbar.tsx";
import { Link } from "react-router-dom";
import {
    BarChart,
    Bell,
    Settings,
    Users2
} from "lucide-react";
import Sidebar, { SidebarItem } from "@/components/common/SideBar.tsx";
import PageNavBar from "@/components/common/PageNavBar.tsx";
import PageFooter from "@/components/common/PageFooter.tsx";

interface StaffLayoutProps {
    children: React.ReactNode;
}

export function StaffLayout({ children }: StaffLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-200 text-[20px]">
            <div className="container-fluid max-w-[1960px] mx-auto">
                <div className="flex flex-col md:flex-row">
                    <Sidebar>
                        <Link to="/staff"><SidebarItem icon={<BarChart size={20}/>} text="Dashboard"
                                                       active={location.pathname === "/staff"}/></Link>
                        <Link to="/staff/make-transaction"><SidebarItem icon={<Users2 size={20}/>} text="Add funds"
                                                                        active={location.pathname === "/staff/make-transaction"}/></Link>
                        <Link to="/staff/settings"><SidebarItem icon={<Settings size={20}/>} text="Settings"
                                                                active={location.pathname === "/staff/settings"}/></Link>
                        <Link to="/staff/notifications"><SidebarItem icon={<Bell size={20}/>} text="Notifications"
                                                                     active={location.pathname === "/staff/notifications"}/></Link>
                    </Sidebar>
                    <div className="flex flex-col flex-1 overflow-y-auto">
                        <PageNavBar></PageNavBar>
                        <div className="flex-1 space-y-3 ml-4 mt-3">
                            {children}
                        </div>
                        <PageFooter></PageFooter>
                    </div>
                </div>
            </div>
        </div>
    );
}
