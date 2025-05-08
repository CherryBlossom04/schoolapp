import { MoreVertical } from "lucide-react";
import { createContext, useContext, ReactNode } from "react";

interface SidebarContextType {
    expanded: boolean;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProps {
    children: ReactNode;
}

export default function Sidebar({children}: SidebarProps) {
    // Sidebar is expanded only when hovered
    const expanded = true; // always true to provide context; UI handles shrink/expand via CSS

    return (
        <aside className="min-h-screen h-auto group relative ">
            <nav
                className="
      h-full
      flex flex-col
      shadow-sm
      transition-[max-width] duration-300 ease-in-out
      max-w-20 group-hover:max-w-64
      overflow-hidden bg-custom-blue rounded-lg border
    "
            >
                <div className="border-t flex p-3 pl-4 pt-4">
                    <img
                        src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
                        alt=""
                        className="w-10 h-10 rounded-md"
                    />
                    <div
                        className="
          flex justify-between items-center overflow-hidden
          transition-all duration-300
          group-hover:max-w-52 group-hover:ml-3 max-w-0 ml-0
        "
                    >
                        <div className="leading-4">
                            <h4 className="font-semibold text-white">John Doe</h4>
                            <span className="text-xs text-white">johndoe@gmail.com</span>
                        </div>
                    </div>
                </div>

                <div className="p-4 pb-2 flex justify-between items-center"/>

                <SidebarContext.Provider value={{expanded}}>
                    <ul className="flex-1 px-3">{children}</ul>
                </SidebarContext.Provider>
            </nav>
        </aside>
    );
}

interface SidebarItemProps {
    icon: ReactNode;
    text: string;
    active?: boolean;
    alert?: boolean;
}

export function SidebarItem({icon, text, active = false, alert = false}: SidebarItemProps) {
    const context = useContext(SidebarContext);
    if (!context) throw new Error("SidebarItem must be used within a Sidebar");

    const {expanded} = context;

    return (
        <li
            className={`relative flex items-center py-2 pl-4 pr-4 my-1 font-medium rounded-md cursor-pointer transition-colors group
        ${active ? "bg-gradient-to-tr from-custom-active-blue to-custom-active-blue text-custom-active-font-blue" : "hover:bg-custom-hover-blue text-white"}
      `}
        >
            {/* Fixed-size icon wrapper */}
            <div className="w-5 h-5 flex items-center justify-center mr-2">{icon}</div>

            {/* Text label */}
            <span
                className={`
          whitespace-nowrap overflow-hidden transition-all duration-300 
          ${expanded ? "w-52 ml-1" : "w-0 ml-0"} 
          ${active ? "text-custom-active-font-blue" : "text-white"}
        `}
            >
        {text}
      </span>

            {/* Alert bubble */}
            {alert && (
                <div className="absolute right-2 top-2 w-2 h-2 rounded-full bg-indigo-400" />
            )}

            {/* Tooltip: only shows when collapsed */}
            {!expanded && (
                <div
                    className="
            absolute left-full top-1/2 -translate-y-1/2 ml-2
            bg-indigo-100 text-indigo-800 text-sm px-2 py-1 rounded
            shadow-lg opacity-0 group-hover:opacity-100
            transition-opacity whitespace-nowrap
          "
                >
                    {text}
                </div>
            )}
        </li>
    );
}
