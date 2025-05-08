import { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Briefcase, School, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/common/Navbar";
import { debounce } from "next/dist/server/utils";
import axios from "axios";

const SignIn = () => {
  const [step, setStep] = useState(1);
  const [institution, setInstitution] = useState("");
  const [code, setCode] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  //Institution search
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();  // Initialize navigate

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const fetchInstitutions = debounce(async (query: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/signin/search?query=${query}`);
      setSuggestions(response.data.institutions);
    } catch (error) {
      console.error('Error fetching institutions:', error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, 500);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInstitution(value);
    if (value.trim().length > 0) {
      fetchInstitutions(value); // Fetch institutions based on input
    } else {
      setSuggestions([]); // Clear suggestions if the input is empty
    }
  };

  const handleSuggestionClick = (institutionName: string) => {
    setInstitution(institutionName);
    setSuggestions([]); // Clear suggestions after selection
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSend = {
      institution,
      role,
      username,
      password,
    };

    if (!institution || !role || !username || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/signin", dataToSend);
      console.log("Submitted Data:", dataToSend);
      console.log("Server response:", response.data);

      // Store institution ID from server response
      const institutionId = response?.data?.user?.institutionId;

      if (institutionId) {
        localStorage.setItem('institutionId', institutionId);
        const stored = localStorage.getItem('institutionId');
        console.log("Stored institutionId:", stored);
      } else {
        console.warn("institutionId not found in response");
      }

      // Navigate based on role
      if (role === "admin") {
        navigate(`/admin`);
      } else if (role === "staff") {
        navigate(`/staff`);
      } else if (role === "parent") {
        navigate(`/parent`);
      } else {
        alert("Please select a valid role.");
      }
    } catch (error: any) {
      console.error("Sign-in error:", error.response?.data || error.message);
      alert("Failed to sign in. Please check your credentials.");
    }
  };


  return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="container mx-auto px-4 pt-32 pb-16">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                {step === 1 && "Select Your Institution"}
                {step === 2 && "Select Your Role"}
                {step === 3 && "Enter Your Credentials"}
              </CardTitle>
              <CardDescription className="text-center">
                {step === 1 && "Enter your institution's name or code"}
                {step === 2 && "Choose your role in the institution"}
                {step === 3 && "Sign in to your account"}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="institution">Institution Name</Label>
                        <Input
                            id="institution"
                            placeholder="Enter institution name"
                            value={institution}
                            onChange={handleInputChange}
                            required
                        />

                        {loading && <p>Loading...</p>} {/* Loading message */}

                        {Array.isArray(suggestions) && suggestions.length > 0 && (
                            <ul className= "absolute bg-white border border-gray-300 w-full max-h-52 overflow-y-auto z-50">
                              {suggestions.map((institutionName, index) => (
                                  <li
                                      key={index}
                                      className="p-2 cursor-pointer hover:bg-gray-100"
                                      onClick={() => handleSuggestionClick(institutionName)}
                                  >
                                    {institutionName}
                                  </li>
                              ))}
                            </ul>
                        )}
                      </div>
                    <span className="text-muted-foreground">
                      Don't have a institution?
                    </span>
                        <Link
                            to="/register"
                            className="text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                          Register your institution
                        </Link>
                      </div>
                )}

                {step === 2 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div
                            className={`border rounded-lg p-4 flex flex-col items-center justify-center space-y-3 cursor-pointer hover:bg-indigo-50 transition-colors ${
                                role === "admin"
                                    ? "border-indigo-600 bg-indigo-50"
                                    : ""
                            }`}
                            onClick={() => setRole("admin")}
                        >
                          <School className="h-8 w-8 text-indigo-600" />
                          <span className="font-medium">Admin</span>
                        </div>
                        <div
                            className={`border rounded-lg p-4 flex flex-col items-center justify-center space-y-3 cursor-pointer hover:bg-indigo-50 transition-colors ${
                                role === "staff"
                                    ? "border-indigo-600 bg-indigo-50"
                                    : ""
                            }`}
                            onClick={() => setRole("staff")}
                        >
                          <Briefcase className="h-8 w-8 text-indigo-600" />
                          <span className="font-medium">Staff</span>
                        </div>
                        <div
                            className={`border rounded-lg p-4 flex flex-col items-center justify-center space-y-3 cursor-pointer hover:bg-indigo-50 transition-colors ${
                                role === "parent"
                                    ? "border-indigo-600 bg-indigo-50"
                                    : ""
                            }`}
                            onClick={() => setRole("parent")}
                        >
                          <Users className="h-8 w-8 text-indigo-600" />
                          <span className="font-medium">Parent</span>
                        </div>
                      </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                      </div>
                      {(role === "admin" || role === "parent") && (
                          <div className="space-y-2">
                            <Label htmlFor="otp">
                              {role === "admin" ? "Email OTP" : "SMS OTP"}
                            </Label>
                            <Input
                                id="otp"
                                placeholder={`Enter OTP sent to your ${
                                    role === "admin" ? "email" : "phone"
                                }`}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                            <div className="text-right">
                              <button
                                  type="button"
                                  className="text-sm text-indigo-600 hover:text-indigo-800"
                              >
                                Resend OTP
                              </button>
                            </div>
                          </div>
                      )}
                      <div className="flex justify-between text-sm pt-2">
                        <Link
                            to="/forgot-password"
                            className="text-indigo-600 hover:text-indigo-700"
                        >
                          Forgot password?
                        </Link>
                      </div>
                    </div>
                )}
              </form>
            </CardContent>

            <CardFooter className="flex flex-col space-y-2">
              {step === 1 && (
                  <Button
                      className="w-full"
                      onClick={handleNext}
                      disabled={!institution}
                  >
                    Next
                  </Button>
              )}

              {step === 2 && (
                  <div className="flex w-full space-x-2">
                    <Button
                        variant="outline"
                        onClick={handleBack}
                        className="flex-1"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button
                        className="flex-1"
                        onClick={handleNext}
                        disabled={!role}
                    >
                      Next
                    </Button>
                  </div>
              )}

              {step === 3 && (
                  <div className="flex w-full flex-col space-y-2">
                    <Button
                        type="submit"
                        className="w-full"
                        onClick={handleSubmit}
                        disabled={
                            !username || !password || (role !== "staff" && !otp)
                        }
                    >
                      Sign In
                    </Button>
                    <Button variant="outline" onClick={handleBack} className="w-full">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                  </div>
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

export default SignIn;
