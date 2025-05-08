import { Link } from "react-router-dom";
import { BarChart, Bell, Settings, Users, UserPlus, Users2, ShoppingCart, Menu, Search } from "lucide-react";
import Sidebar, { SidebarItem } from "../common/SideBar.tsx";
import PageNavBar from "@/components/common/PageNavBar.tsx";
import PageFooter from "@/components/common/PageFooter.tsx";

interface AdminLayoutProps {
    children: React.ReactNode;
}

export function AdminLayout({children}: AdminLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-200 text-[20px]">
            <div className="container-fluid max-w-[1960px] mx-auto">
                <div className="flex flex-col md:flex-row">
                    <Sidebar>
                        <Link to="/admin"><SidebarItem icon={<BarChart size={20}/>} text="Dashboard"
                                                       active={location.pathname === "/admin"}/></Link>
                        <Link to="/admin/staff"><SidebarItem icon={<Users size={20}/>} text="Staff"
                                                             active={location.pathname === "/admin/staff"}/></Link>
                        <Link to="/admin/students"><SidebarItem icon={<Users2 size={20}/>} text="Students"
                                                                active={location.pathname === "/admin/students"}/></Link>
                        <Link to="/admin/settings"><SidebarItem icon={<Settings size={20}/>} text="Settings"
                                                                active={location.pathname === "/admin/settings"}/></Link>
                        <Link to="/admin/notifications"><SidebarItem icon={<Bell size={20}/>} text="Notifications"
                                                                     active={location.pathname === "/admin/notifications"}/></Link>
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

