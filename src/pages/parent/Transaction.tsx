import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, BarChart, Users, UserPlus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Navbar } from "@/components/common/Navbar.tsx";

export default function Transaction() {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState("");

    const handlePayment = () => {
        if (!paymentMethod) {
            toast.error("Please select a payment method.");
            return;
        }
        // Dummy processing
        toast.success(`Payment method '${paymentMethod}' selected. Proceeding...`);
        // Navigate to some confirmation or dashboard page
        navigate("/parent");
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-4 pt-20">
                <div className="flex flex-col md:flex-row gap-6 pt-6">
                    {/* Sidebar */}
                    <aside className="w-full md:w-64 bg-white rounded-lg shadow-sm p-4">
                        <h2 className="text-xl font-bold mb-4">Parent Dashboard</h2>
                        <nav className="space-y-1">
                            <Link to="/parent">
                                <button className="w-full flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md">
                                    <BarChart className="mr-2 h-4 w-4" />
                                    Dashboard
                                </button>
                            </Link>
                            <Link to="/parent/add-funds">
                                <button className="w-full flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md">
                                    <Users className="mr-2 h-4 w-4" />
                                    Add Funds
                                </button>
                            </Link>
                            <Link to="/parent/notification">
                                <button className="w-full flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md">
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    Notification
                                </button>
                            </Link>
                            <Link to="/parent/settings">
                                <button className="w-full flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md">
                                    <Settings className="mr-2 h-4 w-4" />
                                    Settings
                                </button>
                            </Link>
                        </nav>
                    </aside>

                    {/* Main content */}
                    <main className="flex-1 flex justify-center items-start p-6">
                        <div className="w-full max-w-lg space-y-6">
                            <div className="flex items-center gap-4">
                                <Button variant="outline" size="icon" onClick={() => navigate("/parent/add-funds")}>
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                                <h2 className="text-3xl font-bold tracking-tight">Select Payment Method</h2>
                            </div>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Payment Options</CardTitle>
                                    <CardDescription>
                                        Choose a method to complete your payment.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="Credit Card"
                                                checked={paymentMethod === "Credit Card"}
                                                onChange={() => setPaymentMethod("Credit Card")}
                                            />
                                            <span>Credit Card</span>
                                        </label>
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="Debit Card"
                                                checked={paymentMethod === "Debit Card"}
                                                onChange={() => setPaymentMethod("Debit Card")}
                                            />
                                            <span>Debit Card</span>
                                        </label>
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="UPI"
                                                checked={paymentMethod === "UPI"}
                                                onChange={() => setPaymentMethod("UPI")}
                                            />
                                            <span>UPI</span>
                                        </label>
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="Net Banking"
                                                checked={paymentMethod === "Net Banking"}
                                                onChange={() => setPaymentMethod("Net Banking")}
                                            />
                                            <span>Net Banking</span>
                                        </label>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button variant="outline" onClick={() => navigate("/parent/add-funds")}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handlePayment}>Proceed</Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
