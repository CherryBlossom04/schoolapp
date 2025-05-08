import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { StaffLayout } from "@/components/staff/StaffLayout.tsx";

function StaffSettings() {
    return (
        <StaffLayout>
            <div className="space-y-4 p-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                </div>

                <Tabs defaultValue="account" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="notifications">Notifications</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                    </TabsList>

                    <TabsContent value="account" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Account Information</CardTitle>
                                <CardDescription>Update your account details.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" defaultValue="Priya Sharma"/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" defaultValue="priya.sharma@example.com"/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input id="phone" defaultValue="9876543211"/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="role">Role</Label>
                                    <Input id="role" defaultValue="Canteen Manager" readOnly/>
                                    <p className="text-sm text-muted-foreground">Your role cannot be changed. Contact
                                        admin for changes.</p>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Save Changes</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    <TabsContent value="notifications" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Notification Settings</CardTitle>
                                <CardDescription>Configure how you receive notifications.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Email Notifications</h3>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Switch id="email-transactions" defaultChecked/>
                                            <Label htmlFor="email-transactions">Transaction Alerts</Label>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Receive email notifications for transactions you process.
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Switch id="email-daily-summary" defaultChecked/>
                                            <Label htmlFor="email-daily-summary">Daily Summary</Label>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Receive a daily summary of all transactions you've processed.
                                        </p>
                                    </div>
                                </div>

                                <Separator/>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">System Notifications</h3>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Switch id="system-alerts" defaultChecked/>
                                            <Label htmlFor="system-alerts">System Alerts</Label>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Receive notifications about system updates and maintenance.
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Switch id="limit-alerts" defaultChecked/>
                                            <Label htmlFor="limit-alerts">Limit Alerts</Label>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Receive alerts when you're approaching your daily transaction limit.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Save Changes</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    <TabsContent value="security" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Security Settings</CardTitle>
                                <CardDescription>Manage your account security.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="current-password">Current Password</Label>
                                    <Input id="current-password" type="password"/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="new-password">New Password</Label>
                                    <Input id="new-password" type="password"/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                                    <Input id="confirm-password" type="password"/>
                                </div>

                                <Separator className="my-4"/>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Session Management</h3>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Switch id="auto-logout" defaultChecked/>
                                            <Label htmlFor="auto-logout">Auto Logout After Inactivity</Label>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Automatically log out after 30 minutes of inactivity.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Save Changes</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>

                <div className="pt-6">
                    <Link to="/">
                        <Button variant="outline">Go Back Home</Button>
                    </Link>
                </div>
            </div>
        </StaffLayout>
    );
}

export default StaffSettings;
