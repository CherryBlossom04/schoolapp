import React from "react";
import { Menu, Search, Bell, ShoppingCart } from "lucide-react";

export default function PageNavBar({children}) {
    return (
        <header
            className="sticky top-0 z-30 flex h-20 items-center justify-between border-b bg-white px-4 shadow-sm w-full">
            <div className="flex items-center gap-3">
                <button className="rounded-md p-2 text-gray-500 hover:bg-gray-100 lg:hidden">
                    <Menu size={20}/>
                </button>
                <div className="flex items-center gap-2">
                    <img
                        src="/zerocash.svg"
                        alt="Zero Cash"
                        className="rounded-lg object-cover"
                        width={130}
                        height={130}
                    />
                </div>
            </div>

            <div className="flex flex-1 items-center justify-end gap-4">
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"/>
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-64 rounded-full border border-gray-300 bg-gray-100 py-2 pl-10 pr-4 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                </div>

                <button className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100">
                    <Bell size={20}/>
                    <span
                        className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                2
            </span>
                </button>

                <button className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100">
                    <ShoppingCart size={20}/>
                    <span
                        className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-[10px] text-white">
                3
            </span>
                </button>

                <div className="flex items-center">
                    <img
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        alt="User"
                        className="h-8 w-8 rounded-full"
                    />
                </div>
            </div>
        </header>
    );
}
