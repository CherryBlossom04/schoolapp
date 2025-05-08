import Sidebar, { SidebarItem } from "@/components/common/SideBar.tsx";
import { Link } from "react-router-dom";
import {
    BarChart,
    Bell,
    Menu,
    PlusCircle,
    Search,
    Settings,
    ShoppingCart,
    UserPlus,
    Users,
    Users2
} from "lucide-react";
import PageNavBar from "@/components/common/PageNavBar.tsx";
import PageFooter from "@/components/common/PageFooter.tsx";


interface ParentLayoutProps {
    children: React.ReactNode;
}

export function ParentLayout({ children }: ParentLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-200 text-[20px]">
            <div className="container-fluid max-w-[1960px] mx-auto">
                <div className="flex flex-col md:flex-row">
                    <Sidebar>
                        <Link to="/parent"><SidebarItem icon={<BarChart size={20}/>} text="Dashboard"
                                                        active={location.pathname === "/parent"}/></Link>
                        <Link to="/parent/transactionlog"><SidebarItem icon={<Users size={20}/>} text="Transactions"
                                                                       active={location.pathname === "/parent/transactionlog"}/></Link>
                        <Link to="/parent/verify-register"><SidebarItem icon={<Users2 size={20}/>} text="Add funds"
                                                                        active={location.pathname === "/parent/verify-register"}/></Link>
                        <Link to="/parent/settings"><SidebarItem icon={<Settings size={20}/>} text="Settings"
                                                                 active={location.pathname === "/parent/settings"}/></Link>
                        <Link to="/parent/notifications"><SidebarItem icon={<Bell size={20}/>} text="Notifications"
                                                                      active={location.pathname === "/parent/notifications"}/></Link>
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
