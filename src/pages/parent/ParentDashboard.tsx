import { ParentLayout } from "@/components/parent/ParentLayout.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart, Bell, Settings, UserPlus, Users, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { ParentOverview } from "@/components/parent/overview";
import ParentRecentTransactions from "@/components/parent/recent-transactions.tsx";
import StudentSpending from "@/components/parent/StudentSpending.tsx";
import StudentStats from "@/components/admin/student-stats.tsx";

export default function ParentDashboard() {
  return (
      <ParentLayout>
            {/* Main Content */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-5xl font-bold tracking-tight py-4 pl-3">Welcome, Parent</h2>
                <Button asChild>
                  <Link to="/parent/add-funds">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Funds
                  </Link>
                </Button>
              </div>

              <Tabs defaultValue="overview" className="space-y-4">

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {/* Current Balance */}
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">₹2,500</div>
                        <p className="text-xs text-muted-foreground">
                          Last added: ₹500 on 15 Apr 2025
                        </p>
                      </CardContent>
                    </Card>

                    {/* Monthly Spending */}
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Monthly Spending</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">₹1,200</div>
                        <p className="text-xs text-muted-foreground">+8% from last month</p>
                      </CardContent>
                    </Card>

                    {/* Reward Points */}
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Reward Points</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">240 points</div>
                        <p className="text-xs text-muted-foreground">Worth ₹48</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Graph and Student Info */}
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    {/* Spending Overview Chart */}
                    <Card className="col-span-4">
                      <CardHeader>
                        <CardTitle>Spending Overview</CardTitle>
                        <CardDescription>Monthly trend analysis.</CardDescription>
                      </CardHeader>
                      <CardContent className="pl-2">
                        <ParentOverview />
                      </CardContent>
                    </Card>

                    {/* Student Info */}
                    <Card className="col-span-3">
                      <CardHeader>
                        <CardTitle>Student Statistics</CardTitle>
                        <CardDescription>Distribution of students by class.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <StudentStats />
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recent Transactions */}
                  <div className="grid gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Transactions</CardTitle>
                        <CardDescription>Recent activities made by your child.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ParentRecentTransactions />
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Transactions Tab */}
                <TabsContent value="transactions" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>All Transactions</CardTitle>
                      <CardDescription>Complete history of all transactions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[400px] flex items-center justify-center border rounded-md">
                        <p className="text-muted-foreground">
                          All transactions will appear here soon.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

              </Tabs>
            </div>
      </ParentLayout>
  );
}