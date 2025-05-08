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

export default function AddFunds() {
    const navigate = useNavigate();

    const [amount, setAmount] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [studentVerified, setStudentVerified] = useState(false);

    const handleSendOTP = () => {
        setOtpSent(true);
        toast.success("OTP sent successfully!");
    };

    const handleVerifyOTP = () => {
        if (!otp) {
            toast.error("Please enter the OTP.");
            return;
        }
        if (otp === "123456") {
            setStudentVerified(true);
            toast.success("OTP verified successfully!");
        } else {
            toast.error("Invalid OTP. Please try again.");
        }
    };

    const handleAddFunds = () => {
        console.log("Adding funds:", { amount, otp });
        toast.success(`₹${amount} added to your child's account.`);
        navigate("/parent/transaction");
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
                                <button className="w-full flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md bg-gray-200">
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
                            {/* Header with back button */}
                            <div className="flex items-center gap-4">
                                <Button variant="outline" size="icon" onClick={() => navigate("/parent")}>
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                                <h2 className="text-3xl font-bold tracking-tight">Add Funds</h2>
                            </div>

                            {/* Form Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Add Funds to Student Account</CardTitle>
                                    <CardDescription>Add money to your child's account securely.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="amount" className="block font-medium mb-1">
                                                Amount (₹)*
                                            </label>
                                            <input
                                                id="amount"
                                                type="number"
                                                min={1}
                                                placeholder="Enter amount"
                                                className="w-full rounded border px-3 py-2"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                disabled={otpSent}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="otp" className="block font-medium mb-1">
                                                OTP*
                                            </label>
                                            <input
                                                id="otp"
                                                type="text"
                                                placeholder="Enter OTP"
                                                className="w-full rounded border px-3 py-2"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                                disabled={!otpSent || studentVerified}
                                                required
                                            />
                                        </div>

                                        <div className="flex space-x-4">
                                            {!otpSent && (
                                                <Button variant="outline" onClick={handleSendOTP}>
                                                    Send OTP
                                                </Button>
                                            )}

                                            {otpSent && !studentVerified && (
                                                <Button variant="outline" onClick={handleVerifyOTP}>
                                                    Verify OTP
                                                </Button>
                                            )}

                                            {studentVerified && (
                                                <p className="text-green-600 font-medium mt-2 self-center">
                                                    OTP Verified ✔️
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>

                                <CardFooter className="flex justify-between">
                                    <Button variant="outline" onClick={() => navigate("/parent")}>
                                        Cancel
                                    </Button>
                                    {studentVerified && (
                                        <Button onClick={handleAddFunds} disabled={!amount}>
                                            Add ₹{amount || "0"}
                                        </Button>
                                    )}
                                </CardFooter>
                            </Card>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
