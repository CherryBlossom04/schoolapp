import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ParentLayout } from "@/components/parent/ParentLayout.tsx";

const notifications = [
    {
        id: "1",
        date: "2023-04-15",
        time: "10:30 AM",
        title: "Low Balance Alert",
        message: "Your child's balance is below ₹100. Please add funds.",
        type: "warning",
        read: false,
    },
    {
        id: "2",
        date: "2023-04-14",
        time: "12:15 PM",
        title: "Transaction Alert",
        message: "₹120 was spent at the Bookstore.",
        type: "info",
        read: true,
    },
    {
        id: "3",
        date: "2023-04-12",
        time: "09:45 AM",
        title: "Transaction Alert",
        message: "₹35 was spent at the Canteen.",
        type: "info",
        read: true,
    },
    {
        id: "4",
        date: "2023-04-10",
        time: "02:30 PM",
        title: "Funds Added",
        message: "₹500 was added to your child's account.",
        type: "success",
        read: true,
    },
    {
        id: "5",
        date: "2023-04-08",
        time: "11:20 AM",
        title: "Points Earned",
        message: "Your child earned 15 points from recent transactions.",
        type: "info",
        read: true,
    },
    {
        id: "6",
        date: "2023-04-05",
        time: "10:10 AM",
        title: "Failed Transaction",
        message: "A transaction of ₹200 at the Bookstore failed due to insufficient balance.",
        type: "error",
        read: true,
    },
    {
        id: "7",
        date: "2023-04-01",
        time: "09:00 AM",
        title: "Weekly Summary",
        message: "Your child spent ₹350 last week. View detailed report.",
        type: "info",
        read: true,
    },
]

export default function ParentNotificationsPage() {
    return (
        <ParentLayout>
            <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>

                <Card>
                    <CardHeader>
                        <CardTitle>All Notifications</CardTitle>
                        <CardDescription>View all notifications related to your child's account.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[180px]">Date & Time</TableHead>
                                        <TableHead>Message</TableHead>
                                        <TableHead className="w-[100px]">Type</TableHead>
                                        <TableHead className="w-[80px]">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {notifications.map((notification) => (
                                        <TableRow key={notification.id}
                                                  className={notification.read ? "" : "bg-blue-50"}>
                                            <TableCell>
                                                <div
                                                    className="font-medium">{new Date(notification.date).toLocaleDateString()}</div>
                                                <div className="text-sm text-muted-foreground">{notification.time}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium">{notification.title}</div>
                                                <div
                                                    className="text-sm text-muted-foreground">{notification.message}</div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        notification.type === "warning"
                                                            ? "outline"
                                                            : notification.type === "error"
                                                                ? "destructive"
                                                                : notification.type === "success"
                                                                    ? "default"
                                                                    : "secondary"
                                                    }
                                                >
                                                    {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={notification.read ? "outline" : "default"}>
                                                    {notification.read ? "Read" : "Unread"}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </ParentLayout>
    )
}
