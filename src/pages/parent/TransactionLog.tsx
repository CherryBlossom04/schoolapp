import { Navbar } from "@/components/common/Navbar.tsx";
import { Link } from "react-router-dom";
import { BarChart, Bell, PlusCircle, Settings, UserPlus, Users } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import ParentRecentTransactions from "@/components/parent/recent-transactions.tsx";
import { ParentLayout } from "@/components/parent/ParentLayout.tsx";

export default function TransactionLog() {
    const parentTransactions = [
        {
            id: "1",
            student: "Rahul Sharma",
            class: "10A",
            amount: 45,
            location: "Canteen",
            date: "2023-04-15",
            time: "10:30 AM",
            status: "success",
        },
        {
            id: "2",
            student: "Priya Patel",
            class: "9B",
            amount: 120,
            location: "Bookstore",
            date: "2023-04-14",
            time: "12:15 PM",
            status: "success",
        },
        {
            id: "3",
            student: "Arjun Singh",
            class: "11C",
            amount: 35,
            location: "Canteen",
            date: "2023-04-12",
            time: "09:45 AM",
            status: "success",
        },
        {
            id: "4",
            student: "Ananya Gupta",
            class: "8A",
            amount: 500,
            location: "Online",
            date: "2023-04-10",
            time: "02:30 PM",
            status: "success",
            type: "credit",
        },
        {
            id: "5",
            student: "Mohammed Khan",
            class: "12B",
            amount: 75,
            location: "Canteen",
            date: "2023-04-08",
            time: "11:20 AM",
            status: "success",
        },
        {
            id: "6",
            student: "Sneha Reddy",
            class: "7C",
            amount: 200,
            location: "Bookstore",
            date: "2023-04-05",
            time: "10:10 AM",
            status: "failed",
        },
    ];

    const statusToVariant = {
        success: "default",
        pending: "outline",
        failed: "destructive",
    } as const;

    return (
        <ParentLayout>
            {/* Main Content */}
            <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">Transaction Log</h2>
                    <Button asChild>
                        <Link to="/parent/add-funds">
                            <PlusCircle className="mr-2 h-4 w-4"/> Add Funds
                        </Link>
                    </Button>
                </div>
                < ParentRecentTransactions/>
            </div>
        </ParentLayout>
    );
}
