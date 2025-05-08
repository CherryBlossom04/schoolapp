import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StaffOverview from "@/components/staff/overview"
import { TransactionRateGraph } from "@/components/staff/TransactionRate.tsx"
import { Button } from "@/components/ui/button"
import { QrCode } from "lucide-react"
import { Link } from "react-router-dom"
import { StaffLayout } from "@/components/staff/StaffLayout.tsx";

export default function StaffDashboard() {
    return (
        <StaffLayout>
            <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">Staff Dashboard</h2>
                    <Button asChild>
                        <Link to="/staff/make-transaction">
                            <QrCode className="mr-2 h-4 w-4"/> Make Transaction
                        </Link>
                    </Button>
                </div>
                <Tabs defaultValue="overview" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="transactions">Transactions</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Today's Transactions</CardTitle>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="h-4 w-4 text-muted-foreground"
                                    >
                                        <rect width="20" height="14" x="2" y="5" rx="2"/>
                                        <path d="M2 10h20"/>
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">42</div>
                                    <p className="text-xs text-muted-foreground">+12% from yesterday</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="h-4 w-4 text-muted-foreground"
                                    >
                                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">₹4,250</div>
                                    <p className="text-xs text-muted-foreground">+8% from yesterday</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Failed Transactions</CardTitle>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="h-4 w-4 text-muted-foreground"
                                    >
                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">3</div>
                                    <p className="text-xs text-muted-foreground">-2 from yesterday</p>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                            <Card className="col-span-4">
                                <CardHeader>
                                    <CardTitle>Transaction Overview</CardTitle>
                                    <CardDescription>Daily transaction volume for the past week.</CardDescription>
                                </CardHeader>
                                <CardContent className="pl-2">
                                    <StaffOverview/>
                                </CardContent>
                            </Card>
                            <Card className="col-span-3">
                                <CardHeader>
                                    <CardTitle>Staff Information</CardTitle>
                                    <CardDescription>Your details and role.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col items-center space-y-4">
                                        <div className="h-24 w-24 rounded-full bg-gray-200 overflow-hidden">
                                            <img src="/placeholder.svg?height=96&width=96" alt="Staff"
                                                 className="h-full w-full object-cover"/>
                                        </div>
                                        <div className="text-center">
                                            <h3 className="text-lg font-medium">Priya Sharma</h3>
                                            <p className="text-sm text-muted-foreground">Canteen Manager</p>
                                            <p className="text-sm text-muted-foreground">ID: C002</p>
                                        </div>
                                        <div className="w-full pt-4">
                                            <div className="flex justify-between text-sm">
                                                <span>Daily Limit:</span>
                                                <span className="font-medium">₹10,000</span>
                                            </div>
                                            <div className="flex justify-between text-sm mt-2">
                                                <span>Today's Transactions:</span>
                                                <span className="font-medium">₹4,250 / ₹10,000</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="grid gap-4 md:grid-cols-1">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Transaction Rate</CardTitle>
                                    <CardDescription>Rate of transactions over the past week.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <TransactionRateGraph/>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                    <TabsContent value="transactions" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>All Transactions</CardTitle>
                                <CardDescription>Complete transaction history.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[400px] flex items-center justify-center border rounded-md">
                                    <p className="text-muted-foreground">Detailed transaction history will be displayed
                                        here.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </StaffLayout>
    )
}
