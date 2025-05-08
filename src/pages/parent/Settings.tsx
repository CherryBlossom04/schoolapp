// src/pages/ParentSettingsPage.jsx
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { AlertTriangle } from "lucide-react"
import { ParentLayout } from "@/components/parent/ParentLayout.tsx";

export default function ParentSettings() {
    const [reportLostQR, setReportLostQR] = useState(false)

    return (
        <ParentLayout>
            <div className="space-y-4 p-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                </div>

                <Tabs defaultValue="account" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="notifications">Notifications</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                        <TabsTrigger value="qr-management">QR Management</TabsTrigger>
                    </TabsList>

                    {/* Account Tab */}
                    <TabsContent value="account" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Account Information</CardTitle>
                                <CardDescription>Update your account details.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {["Name", "Email", "Phone Number"].map((label, idx) => (
                                    <div className="space-y-2" key={idx}>
                                        <Label htmlFor={label.toLowerCase().replace(" ", "-")}>{label}</Label>
                                        <Input
                                            id={label.toLowerCase().replace(" ", "-")}
                                            type={label === "Email" ? "email" : "text"}
                                            defaultValue={
                                                label === "Name" ? "Vikram Sharma" :
                                                    label === "Email" ? "vikram.sharma@example.com" :
                                                        "9876543210"
                                            }
                                        />
                                    </div>
                                ))}
                            </CardContent>
                            <CardFooter>
                                <Button>Save Changes</Button>
                            </CardFooter>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Student Information</CardTitle>
                                <CardDescription>View your child's information.</CardDescription>
                            </CardHeader>
                            <CardContent
                                className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-lg bg-gray-50 border">
                                <div className="h-20 w-20 rounded-full bg-gray-200 overflow-hidden">
                                    <img src="/placeholder.svg?height=80&width=80" alt="Student"
                                         className="h-full w-full object-cover"/>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium">Rahul Sharma</h3>
                                    <p className="text-sm text-muted-foreground">Class 10A</p>
                                    <p className="text-sm text-muted-foreground">Registration: S10001</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Notifications Tab */}
                    <TabsContent value="notifications" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Notification Settings</CardTitle>
                                <CardDescription>Configure how you receive notifications.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[
                                    {
                                        title: "SMS Notifications",
                                        settings: ["Transaction Alerts", "Low Balance Alerts"]
                                    },
                                    {
                                        title: "Email Notifications",
                                        settings: ["Transaction Alerts", "Low Balance Alerts", "Weekly Summary"]
                                    },
                                ].map((group, idx) => (
                                    <div className="space-y-4" key={idx}>
                                        <h3 className="text-lg font-medium">{group.title}</h3>
                                        {group.settings.map((setting, jdx) => (
                                            <div key={jdx} className="space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    <Switch
                                                        id={`${group.title.split(" ")[0].toLowerCase()}-${setting.toLowerCase().replace(/ /g, "-")}`}
                                                        defaultChecked/>
                                                    <Label
                                                        htmlFor={`${group.title.split(" ")[0].toLowerCase()}-${setting.toLowerCase().replace(/ /g, "-")}`}>{setting}</Label>
                                                </div>
                                                <p className="text-sm text-muted-foreground">Receive {group.title.split(" ")[0]} notifications
                                                    for {setting.toLowerCase()}.</p>
                                            </div>
                                        ))}
                                        {idx === 0 && <Separator/>}
                                    </div>
                                ))}
                            </CardContent>
                            <CardFooter>
                                <Button>Save Changes</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    {/* Security Tab */}
                    <TabsContent value="security" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Security Settings</CardTitle>
                                <CardDescription>Manage your account security.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {["Current Password", "New Password", "Confirm New Password"].map((field, idx) => (
                                    <div className="space-y-2" key={idx}>
                                        <Label htmlFor={field.toLowerCase().replace(/ /g, "-")}>{field}</Label>
                                        <Input id={field.toLowerCase().replace(/ /g, "-")} type="password"/>
                                    </div>
                                ))}
                                <Separator className="my-4"/>
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                                    <div className="flex items-center space-x-2">
                                        <Switch id="enable-2fa"/>
                                        <Label htmlFor="enable-2fa">Enable Two-Factor Authentication</Label>
                                    </div>
                                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your
                                        account.</p>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Save Changes</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    {/* QR Management Tab */}
                    <TabsContent value="qr-management" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>QR Code Management</CardTitle>
                                <CardDescription>Manage your child's QR code.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* QR Info */}
                                <div
                                    className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-lg bg-gray-50 border">
                                    <div
                                        className="h-32 w-32 bg-white border rounded-lg flex items-center justify-center">
                                        <img src="/placeholder.svg?height=128&width=128" alt="QR Code"
                                             className="h-24 w-24"/>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium">Rahul Sharma's QR Code</h3>
                                        <p className="text-sm text-muted-foreground">Status: Active</p>
                                        <p className="text-sm text-muted-foreground">Last Generated: 15 Mar 2023</p>
                                        <div className="flex gap-2 mt-2">
                                            <Button variant="outline" size="sm">Download</Button>
                                            <Button variant="outline" size="sm">Print</Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Lost QR */}
                                <div className="rounded-md bg-yellow-50 p-4 border border-yellow-200">
                                    <div className="flex items-start gap-4">
                                        <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5"/>
                                        <div>
                                            <h3 className="text-sm font-medium text-yellow-800">Report Lost QR Code</h3>
                                            <p className="text-sm text-yellow-700 mt-1">
                                                If your child's QR code is lost or stolen, report it immediately to
                                                block it.
                                            </p>
                                            <div className="mt-4 space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    <Switch id="report-lost-qr" checked={reportLostQR}
                                                            onCheckedChange={setReportLostQR}/>
                                                    <Label htmlFor="report-lost-qr">I confirm the QR code is lost or
                                                        stolen</Label>
                                                </div>
                                            </div>
                                            <Button variant="destructive" className="mt-4" disabled={!reportLostQR}>
                                                Block QR Code
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Request New */}
                                <div className="rounded-md bg-gray-50 p-4 border">
                                    <h3 className="text-sm font-medium">Request New QR Code</h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Requesting a new QR code will invalidate the old one.
                                    </p>
                                    <Button variant="outline" className="mt-4">Request New QR Code</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </ParentLayout>
    )
}
