
import { useState, useEffect } from "react";
import { 
  Bell, 
  X, 
  Check, 
  Info, 
  AlertTriangle, 
  Clock, 
  Trash,
  CheckCircle 
} from "lucide-react";
import { toast } from "sonner";
import { AdminLayout } from "@/components/admin/AdminLayout.tsx";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Mock data for notifications
const mockNotifications = [
  {
    id: "1",
    title: "New Student Registered",
    message: "Rahul Sharma has been registered by parent Amit Sharma",
    type: "info",
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(), // 25 minutes ago
  },
  {
    id: "2",
    title: "Payment Received",
    message: "₹5,000 payment received for Priya Singh",
    type: "success",
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: "3",
    title: "Low Balance Alert",
    message: "Arjun Patel's account balance is below ₹500",
    type: "warning",
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
  },
  {
    id: "4",
    title: "System Update",
    message: "Zero Cash system will be updated tonight at 2:00 AM",
    type: "info",
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    id: "5",
    title: "Staff Account Created",
    message: "New staff account created for Meena Patel",
    type: "info",
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
  },
];

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  timestamp: string;
}

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  
  // Initialize notifications from mock data
  useEffect(() => {
    setNotifications(mockNotifications);
  }, []);

  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !notification.read;
    return notification.type === activeTab;
  });

  // Format timestamp to relative time
  const formatRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  };

  // Mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
    toast.success("All notifications marked as read");
  };

  // Delete a notification
  const deleteNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
    toast.success("Notification deleted");
  };

  // Delete all read notifications
  const deleteAllRead = () => {
    setNotifications((prev) =>
      prev.filter((notification) => !notification.read)
    );
    toast.success("All read notifications deleted");
  };

  // Get notification icon based on type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "error":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AdminLayout
      title="Notifications"
      description="View and manage your system notifications"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h2 className="text-lg font-medium">
            Notifications
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-2 bg-primary text-primary-foreground">
                {unreadCount} New
              </Badge>
            )}
          </h2>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <Check className="mr-1 h-4 w-4" />
            Mark All Read
          </Button>
          <Button variant="outline" size="sm" onClick={deleteAllRead}>
            <Trash className="mr-1 h-4 w-4" />
            Clear Read
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="w-full md:w-auto grid grid-cols-5 md:flex">
          <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
          <TabsTrigger value="unread" className="flex-1">
            Unread
            {unreadCount > 0 && (
              <Badge className="ml-1 bg-primary text-primary-foreground" variant="secondary">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="info" className="flex-1">Info</TabsTrigger>
          <TabsTrigger value="success" className="flex-1">Success</TabsTrigger>
          <TabsTrigger value="warning" className="flex-1">Warning</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>
            {activeTab === "all"
              ? "All Notifications"
              : activeTab === "unread"
              ? "Unread Notifications"
              : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Notifications`}
          </CardTitle>
          <CardDescription>
            {activeTab === "all"
              ? "View all your system notifications"
              : activeTab === "unread"
              ? "Notifications you haven't read yet"
              : `Notifications of ${activeTab} type`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start p-4 border rounded-lg ${
                    !notification.read ? "bg-muted/30" : ""
                  }`}
                >
                  <div className="flex-shrink-0 mr-3 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h4 className={`font-medium ${!notification.read ? "font-semibold" : ""}`}>
                        {notification.title}
                      </h4>
                      <div className="flex items-center ml-2">
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatRelativeTime(notification.timestamp)}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm mt-1 text-muted-foreground">{notification.message}</p>
                    <div className="flex justify-end mt-2 gap-1">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs px-2"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Mark as Read
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs px-2 text-destructive hover:text-destructive"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <X className="h-3 w-3 mr-1" />
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <Bell className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <h3 className="font-medium mb-1">No notifications</h3>
                <p className="text-sm text-muted-foreground">
                  You don't have any{activeTab !== "all" ? ` ${activeTab}` : ""} notifications at the moment
                </p>
              </div>
            )}
          </div>
        </CardContent>
        {filteredNotifications.length > 5 && (
          <CardFooter>
            <Button variant="outline" className="w-full">
              Load More
            </Button>
          </CardFooter>
        )}
      </Card>
    </AdminLayout>
  );
};

export default AdminNotifications;
