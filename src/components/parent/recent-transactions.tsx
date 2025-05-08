
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface ParentTransaction {
    id: string;
    student: string;
    class: string;
    amount: number;
    location: string;
    date: string;
    time: string;
    status: "success" | "pending" | "failed";
    type?: "credit" | "debit";
}

const parentTransactions: ParentTransaction[] = [
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

function ParentRecentTransactions(){
    return (
        <div className="rounded-md border p-4">
            <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {parentTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                            <TableCell>
                                <div className="font-medium">{transaction.student}</div>
                                <div className="text-sm text-muted-foreground">Class {transaction.class}</div>
                            </TableCell>
                            <TableCell className={transaction.type === "credit" ? "text-green-600 font-medium" : ""}>
                                {transaction.type === "credit" ? "+" : ""}₹{transaction.amount}
                            </TableCell>
                            <TableCell>{transaction.location}</TableCell>
                            <TableCell>
                                <div>{new Date(transaction.date).toLocaleDateString()}</div>
                                <div className="text-sm text-muted-foreground">{transaction.time}</div>
                            </TableCell>
                            <TableCell>
                                <Badge variant={statusToVariant[transaction.status] || "default"}>
                                    {transaction.status === "success"
                                        ? "Successful"
                                        : transaction.status === "pending"
                                            ? "Pending"
                                            : "Failed"}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default ParentRecentTransactions;
