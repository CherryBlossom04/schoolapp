import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, QrCode, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/common/Navbar";
import { StaffLayout } from "@/components/staff/StaffLayout.tsx";

const MakeTransaction = () => {
    const [step, setStep] = useState(1);
    const [amount, setAmount] = useState("");
    const [studentInfo, setStudentInfo] = useState<{
        name: string;
        id: string;
        class: string;
        balance: number;
    } | null>(null);
    const [transactionComplete, setTransactionComplete] = useState(false);

    const handleScanQR = () => {
        // In a real app, this would activate the camera/QR scanner
        // For demo, we'll simulate finding a student after a brief delay
        setTimeout(() => {
            setStudentInfo({
                name: "Alex Johnson",
                id: "ST12345",
                class: "Grade 10-A",
                balance: 2000,
            });
            setStep(3);
        }, 1000);
    };

    const handleVerifyStudent = () => {
        setStep(4);
    };

    const handleCompleteTransaction = () => {
        setTransactionComplete(true);
        setStep(5);
    };

    const handleReset = () => {
        setStep(1);
        setAmount("");
        setStudentInfo(null);
        setTransactionComplete(false);
    };

    return (
        <StaffLayout>
            <div className="min-h-screen bg-gray-50">
                <Navbar/>

                <div className="container mx-auto px-4 pt-20 pb-10">
                    <div className="flex items-center mb-6">
                        <h1 className="text-2xl font-bold">Make Transaction</h1>
                    </div>

                    <Card className="max-w-xl mx-auto">
                        <CardHeader>
                            <CardTitle>
                                {step === 1 && "Enter Transaction Amount"}
                                {step === 2 && "Scan QR Code"}
                                {step === 3 && "Verify Student Identity"}
                                {step === 4 && "Confirm Transaction"}
                                {step === 5 && "Transaction " + (transactionComplete ? "Complete" : "Failed")}
                            </CardTitle>
                            <CardDescription>
                                {step === 1 && "Enter the amount to charge the student"}
                                {step === 2 && "Scan student's QR code to identify them"}
                                {step === 3 && "Verify that the student matches the account"}
                                {step === 4 && "Review and complete the transaction"}
                                {step === 5 && (transactionComplete ? "Transaction was successfully processed" : "There was an issue with the transaction")}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            {step === 1 && (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="amount">Transaction Amount (₹)</Label>
                                        <Input
                                            id="amount"
                                            type="number"
                                            placeholder="Enter amount"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            min="1"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="py-10 text-center">
                                    <div className="bg-gray-100 rounded-lg p-12 mb-6 flex items-center justify-center">
                                        <QrCode className="h-24 w-24 text-gray-400" strokeWidth={1}/>
                                    </div>
                                    <p className="text-gray-600 mb-4">Position the QR code within the scanner area</p>
                                    <p className="text-sm text-gray-500">Simulating QR scan for demo purposes</p>
                                </div>
                            )}

                            {step === 3 && studentInfo && (
                                <div className="space-y-4">
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h3 className="font-medium text-lg mb-2">Student Information</h3>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <p className="text-sm text-gray-500">Name</p>
                                                <p className="font-medium">{studentInfo.name}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Student ID</p>
                                                <p className="font-medium">{studentInfo.id}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Class</p>
                                                <p className="font-medium">{studentInfo.class}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Wallet Balance</p>
                                                <p className="font-medium">₹{studentInfo.balance.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {Number(amount) > studentInfo.balance && (
                                        <div
                                            className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
                                            <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5"/>
                                            <div>
                                                <h4 className="font-medium text-red-800">Insufficient Balance</h4>
                                                <p className="text-sm text-red-600">
                                                    The student does not have enough funds for this transaction.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {step === 4 && studentInfo && (
                                <div className="space-y-4">
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h3 className="font-medium text-lg mb-4">Transaction Summary</h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Student</span>
                                                <span className="font-medium">{studentInfo.name}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Student ID</span>
                                                <span className="font-medium">{studentInfo.id}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Transaction Amount</span>
                                                <span className="font-medium">₹{Number(amount).toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">New Balance After Transaction</span>
                                                <span
                                                    className="font-medium">₹{(studentInfo.balance - Number(amount)).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                                        <p className="text-sm text-amber-800">
                                            Please verify the transaction details before completing. This action cannot
                                            be undone.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {step === 5 && (
                                <div className="py-8 text-center space-y-4">
                                    {transactionComplete ? (
                                        <>
                                            <div
                                                className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center">
                                                <CheckCircle className="h-10 w-10 text-green-600"/>
                                            </div>
                                            <h3 className="text-xl font-semibold text-green-700">Payment
                                                Successful!</h3>
                                            <div className="bg-gray-50 rounded-lg p-4 mx-auto max-w-md">
                                                <div className="space-y-2">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500">Amount</span>
                                                        <span
                                                            className="font-medium">₹{Number(amount).toLocaleString()}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500">Student</span>
                                                        <span className="font-medium">{studentInfo?.name}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500">Transaction ID</span>
                                                        <span
                                                            className="font-medium">TXN-{Math.floor(100000 + Math.random() * 900000)}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500">Date & Time</span>
                                                        <span
                                                            className="font-medium">{new Date().toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div
                                                className="bg-red-100 rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center">
                                                <AlertCircle className="h-10 w-10 text-red-600"/>
                                            </div>
                                            <h3 className="text-xl font-semibold text-red-700">Payment Failed</h3>
                                            <p className="text-gray-600">
                                                There was an issue processing this transaction. Please try again.
                                            </p>
                                        </>
                                    )}
                                </div>
                            )}
                        </CardContent>

                        <CardFooter className="flex flex-col space-y-2">
                            {step === 1 && (
                                <Button
                                    className="w-full"
                                    onClick={() => setStep(2)}
                                    disabled={!amount || Number(amount) <= 0}
                                >
                                    <QrCode className="mr-2 h-4 w-4"/>
                                    Scan QR Code
                                </Button>
                            )}

                            {step === 2 && (
                                <div className="w-full space-y-2">
                                    <Button
                                        className="w-full"
                                        onClick={handleScanQR}
                                    >
                                        Simulate QR Scan
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => setStep(1)}
                                    >
                                        <ArrowLeft className="mr-2 h-4 w-4"/>
                                        Back
                                    </Button>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="w-full space-y-2">
                                    <Button
                                        className="w-full"
                                        onClick={handleVerifyStudent}
                                        disabled={Number(amount) > (studentInfo?.balance || 0)}
                                    >
                                        Verify Identity
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => setStep(1)}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            )}

                            {step === 4 && (
                                <div className="w-full space-y-2">
                                    <Button
                                        className="w-full"
                                        onClick={handleCompleteTransaction}
                                    >
                                        Complete Transaction
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => setStep(3)}
                                    >
                                        Back
                                    </Button>
                                </div>
                            )}

                            {step === 5 && (
                                <Button
                                    className="w-full"
                                    onClick={handleReset}
                                >
                                    Make Another Transaction
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </StaffLayout>
    );
};

export default MakeTransaction;
