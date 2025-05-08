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
import { ParentLayout } from "@/components/parent/ParentLayout.tsx";

export default function VerifyRegister() {
    const navigate = useNavigate();
    const [regNo, setRegNo] = useState("");
    const [verified, setVerified] = useState(false);

    const handleVerifyRegNo = () => {
        if (!regNo) {
            toast.error("Please enter a registration number.");
            return;
        }

        if (regNo === "REG1234") {
            setVerified(true);
            toast.success("Registration number verified!");
            setTimeout(() => navigate(`/parent/add-funds/${regNo}`), 1000);
        } else {
            toast.error("Invalid registration number.");
        }
    };

    return (
        <ParentLayout>
            {/* Main content */}
            <main className="flex-1 flex justify-center items-start p-6">
                <div className="w-full max-w-lg space-y-6">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" onClick={() => navigate("/parent")}>
                            <ArrowLeft className="h-4 w-4"/>
                        </Button>
                        <h2 className="text-3xl font-bold tracking-tight">Verify Registration No.</h2>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Enter Student Registration Number</CardTitle>
                            <CardDescription>
                                Please verify the registration number before adding funds.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <input
                                type="text"
                                placeholder="Enter registration number"
                                className="w-full rounded border px-3 py-2"
                                value={regNo}
                                onChange={(e) => setRegNo(e.target.value)}
                            />
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" onClick={() => navigate("/parent")}>
                                Cancel
                            </Button>
                            <Button onClick={handleVerifyRegNo} disabled={!regNo}>
                                Verify
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </main>

        </ParentLayout>

    );
}
