import React from "react";
import { Menu, Search, Bell, ShoppingCart } from "lucide-react";

export default function PageFooter({children}) {
    return (
        <footer className="py-6 mt-10">
            <div className="container mx-auto px-4">
                <p className="text-center text-sm text-gray-600">
                    © {new Date().getFullYear()} Zero Cash. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
