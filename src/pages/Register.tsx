import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, CheckCircle, School } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/common/Navbar";
import axios from "axios";
import { navigate } from "next/dist/client/components/segment-cache";

const Register = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    // Institution details
    const [institutionName, setInstitutionName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [udiseCode, setUdiseCode] = useState("");

    // Admin details
    const [adminName, setAdminName] = useState("");
    const [adminEmail, setAdminEmail] = useState("");
    const [adminPhone, setAdminPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Success state
    const [institutionCode, setInstitutionCode] = useState("");

    //otp
    const [role, setRole] = useState("admin");
    const [otp, setOtp] = useState("");
    const [isSent, setIsSent] = useState(false);
    const [sending, setSending] = useState(false);

    const handleNext = () => {
        setStep(prev => prev + 1);
    };

    const handleBack = () => {
        setStep(prev => prev - 1);
    };

    const isStepOneValid = () => {
        return institutionName && address && email && phone && udiseCode;
    };

    const isStepTwoValid = () => {
        return adminName && adminEmail && adminPhone && password && confirmPassword && password === confirmPassword;
    };

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        if (step === 2) {
            try {
                const otpResponse = await axios.post('/api/register/send-otp', {
                    email: adminEmail,
                });

                if (otpResponse.data.success) {
                    alert('OTP sent to email!');
                    setStep(3);
                }
            } catch (err) {
                console.error(err);
                alert('Error sending OTP.');
            } finally {
                setSending(false);
            }
        } else if (step === 3) {
            try {
                const finalResponse = await axios.post('/api/register/verify', {
                    institutionName,
                    address,
                    email,
                    phone,
                    udiseCode,
                    adminName,
                    adminEmail,
                    adminPhone,
                    password,
                    otp
                });

                if (finalResponse.data.success) {
                    setInstitutionCode(finalResponse.data.institutionCode);
                    setStep(4);
                }
            } catch (err) {
                console.error(err);
                alert("Registration failed. Try again.");
            }
        }

    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = {
            institutionName,
            address,
            email,
            phone,
            udiseCode,
            adminName,
            adminEmail,
            adminPhone,
            password,
        };

        try {
            const response = await axios.post("http://localhost:5000/register/", formData);
            if (response.data.success) {
                alert('Data saved successfully!');
                navigate("/sign-in");
            }
        } catch (error) {
            console.error(error);
            alert('Failed to save data.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar/>

            <div className="container mx-auto px-4 pt-32 pb-16">
                <Card className="max-w-2xl mx-auto">
                    <CardHeader className="space-y-1">
                        <div className="flex items-center justify-center mb-2">
                            <School className="h-10 w-10 text-indigo-600 mr-2"/>
                            <CardTitle className="text-2xl">Register Your Institution</CardTitle>
                        </div>
                        <CardDescription className="text-center">
                            {step === 1 && "Enter your institution details to get started"}
                            {step === 2 && "Setup admin account for institution management"}
                            {step === 3 && "Review your information before submission"}
                            {step === 4 && "Registration completed successfully"}
                        </CardDescription>

                        {/* Stepper */}
                        <div className="flex justify-between items-center w-full mt-6">
                            <div className={`flex flex-col items-center`}>
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                    1
                                </div>
                                <span className="text-xs mt-1">Institution</span>
                            </div>
                            <div className={`flex-1 h-1 ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
                            <div className={`flex flex-col items-center`}>
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                    2
                                </div>
                                <span className="text-xs mt-1">Admin</span>
                            </div>
                            <div className={`flex-1 h-1 ${step >= 3 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
                            <div className={`flex flex-col items-center`}>
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                    3
                                </div>
                                <span className="text-xs mt-1">Review</span>
                            </div>
                            <div className={`flex-1 h-1 ${step >= 4 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
                            <div className={`flex flex-col items-center`}>
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 4 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                    4
                                </div>
                                <span className="text-xs mt-1">Success</span>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="mt-4">
                        <form onSubmit={handleSubmit}>
                            {step === 1 && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="institutionName">Institution Name</Label>
                                            <Input
                                                id="institutionName"
                                                placeholder="Enter institution name"
                                                value={institutionName}
                                                onChange={(e) => setInstitutionName(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="address">Address</Label>
                                            <Input
                                                id="address"
                                                placeholder="Enter complete address"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="institution@example.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input
                                                id="phone"
                                                placeholder="Enter phone number"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="udiseCode">UDISE Code</Label>
                                            <Input
                                                id="udiseCode"
                                                placeholder="Enter UDISE code"
                                                value={udiseCode}
                                                onChange={(e) => setUdiseCode(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="adminName">Admin Name</Label>
                                            <Input
                                                id="adminName"
                                                placeholder="Enter admin name"
                                                value={adminName}
                                                onChange={(e) => setAdminName(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="adminEmail">Admin Email</Label>
                                            <Input
                                                id="adminEmail"
                                                type="email"
                                                placeholder="admin@example.com"
                                                value={adminEmail}
                                                onChange={(e) => setAdminEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="adminPhone">Admin Phone</Label>
                                            <Input
                                                id="adminPhone"
                                                placeholder="Enter admin phone number"
                                                value={adminPhone}
                                                onChange={(e) => setAdminPhone(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="password">Password</Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                placeholder="Create a strong password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                                            <Input
                                                id="confirmPassword"
                                                type="password"
                                                placeholder="Confirm your password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                            />
                                            {password && confirmPassword && password !== confirmPassword && (
                                                <p className="text-sm text-red-500">Passwords do not match</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                            )}

                            {step === 3 && (
                                <div className="space-y-6">
                                    <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                                        <h3 className="font-medium text-gray-900">Institution Details</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-500">Institution Name</p>
                                                <p className="text-sm font-medium">{institutionName}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Address</p>
                                                <p className="text-sm font-medium">{address}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Email</p>
                                                <p className="text-sm font-medium">{email}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Phone</p>
                                                <p className="text-sm font-medium">{phone}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">UDISE Code</p>
                                                <p className="text-sm font-medium">{udiseCode}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                                        <h3 className="font-medium text-gray-900">Admin Details</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-500">Admin Name</p>
                                                <p className="text-sm font-medium">{adminName}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Admin Email</p>
                                                <p className="text-sm font-medium">{adminEmail}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Admin Phone</p>
                                                <p className="text-sm font-medium">{adminPhone}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Password</p>
                                                <p className="text-sm font-medium">••••••••</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/*<div className="space-y-2">
                            <Label htmlFor="otp">{role === "admin" ? "Email OTP" : "SMS OTP"}</Label>
                            <Input
                                id="otp"
                                placeholder={`Enter OTP sent to your ${role === "admin" ? "email" : "phone"}`}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                            <div className="text-right">
                                <button
                                    type="button"
                                    className="text-sm text-indigo-600 hover:text-indigo-800 disabled:opacity-50"
                                    onClick={handleSendOtp}
                                    disabled={sending}
                                >
                                    {isSent ? "Resend OTP" : "Send OTP"}
                                </button>
                                <button
                                    type="button"
                                    className="text-sm text-indigo-600 hover:text-indigo-800 disabled:opacity-50"
                                    onClick={handleVerifyOtp}
                                    disabled={sending}
                                >
                                    {isSent ? "Resend OTP" : "Send OTP"}
                                </button>
                            </div>
                        </div>*/}

                                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                                        <p className="text-sm text-amber-800">
                                            By submitting this form, you agree to the terms and conditions of Zero Cash.
                                            Your institution will be assigned a unique code that will be used for
                                            authentication.
                                        </p>
                                    </div>
                                </div>

                            )}

                            {step === 4 && (
                                <div className="flex flex-col items-center justify-center py-8 space-y-6">
                                    <div className="rounded-full bg-green-100 p-3">
                                        <CheckCircle className="h-12 w-12 text-green-600"/>
                                    </div>
                                    <div className="text-center space-y-2">
                                        <h3 className="text-xl font-semibold">Registration Successful!</h3>
                                        <p className="text-gray-600">Your institution has been registered
                                            successfully.</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg w-full text-center">
                                        <p className="text-sm text-gray-600">Your Institution Code</p>
                                        <p className="text-2xl font-bold text-indigo-600">{institutionCode}</p>
                                        <p className="text-xs text-gray-500 mt-1">Keep this code safe. It will be
                                            required for
                                            authentication.</p>
                                    </div>
                                </div>
                            )}
                        </form>
                    </CardContent>

                    <CardFooter className={`flex ${step !== 4 ? 'justify-between' : 'justify-center'}`}>
                        {step === 1 && (
                            <div className="flex w-full justify-end">
                                <Button
                                    onClick={handleNext}
                                    disabled={!isStepOneValid()}
                                >
                                    Next
                                    <ArrowRight className="ml-2 h-4 w-4"/>
                                </Button>
                            </div>
                        )}

                        {step === 2 && (
                            <>
                                <Button
                                    variant="outline"
                                    onClick={handleBack}
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4"/>
                                    Back
                                </Button>
                                <Button
                                    onClick={handleNext}
                                    disabled={!isStepTwoValid()}
                                >
                                    Next
                                    <ArrowRight className="ml-2 h-4 w-4"/>
                                </Button>
                            </>
                        )}

                        {step === 3 && (
                            <>
                                <Button
                                    variant="outline"
                                    onClick={handleBack}
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4"/>
                                    Back
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                >
                                    Submit Registration
                                </Button>
                            </>
                        )}

                        {step === 4 && (
                            <Link to="/sign-in">
                                <Button>
                                    Proceed to Sign In
                                </Button>
                            </Link>
                        )}
                    </CardFooter>
                </Card>

                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-600">
                        © {new Date().getFullYear()} Zero Cash. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
