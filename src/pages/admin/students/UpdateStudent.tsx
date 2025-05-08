
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { AdminLayout } from "@/components/admin/AdminLayout.tsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Mock student data
const mockStudents = [
  {
    id: "1",
    name: "Rahul Sharma",
    class: "10",
    section: "A",
    regNumber: "ZC2023001",
    parentName: "Amit Sharma",
    parentMobile: "9876543210",
    parentEmail: "amit.sharma@example.com",
    feeBalance: 5000,
  },
  {
    id: "2",
    name: "Priya Singh",
    class: "9",
    section: "B",
    regNumber: "ZC2023002",
    parentName: "Rajesh Singh",
    parentMobile: "9876543211",
    parentEmail: "rajesh.singh@example.com",
    feeBalance: 0,
  },
];

const UpdateStudent = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    section: "",
    regNumber: "",
    parentName: "",
    parentMobile: "",
    parentEmail: "",
    feeBalance: 0,
  });

  // Generate classes array
  const classes = Array.from({ length: 12 }, (_, i) => `${i + 1}`);
  
  // Generate sections array
  const sections = ["A", "B", "C", "D", "E"];

  // Fetch student data
  useEffect(() => {
    // Simulate API call
    const student = mockStudents.find(s => s.id === id);
    
    if (student) {
      setFormData({
        name: student.name,
        class: student.class,
        section: student.section,
        regNumber: student.regNumber,
        parentName: student.parentName,
        parentMobile: student.parentMobile,
        parentEmail: student.parentEmail || "",
        feeBalance: student.feeBalance,
      });
    } else {
      toast.error("Student not found");
    }
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Student updated successfully!");
      console.log("Updated student data:", formData);
    }, 1000);
  };

  return (
    <AdminLayout
      title="Update Student"
      description="Edit student information"
      backUrl="/admin/students"
      backLabel="Back to Students"
    >
      <Card>
        <CardHeader>
          <CardTitle>Student Information</CardTitle>
          <CardDescription>Update the details for {formData.name}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Student Name*</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="Full name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="class">Class*</Label>
                  <Select
                    value={formData.class}
                    onValueChange={(value) => handleSelectChange("class", value)}
                  >
                    <SelectTrigger id="class">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((classNum) => (
                        <SelectItem key={classNum} value={classNum}>
                          Class {classNum}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="section">Section*</Label>
                  <Select
                    value={formData.section}
                    onValueChange={(value) => handleSelectChange("section", value)}
                  >
                    <SelectTrigger id="section">
                      <SelectValue placeholder="Select section" />
                    </SelectTrigger>
                    <SelectContent>
                      {sections.map((section) => (
                        <SelectItem key={section} value={section}>
                          Section {section}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="regNumber">Registration Number*</Label>
              <Input
                id="regNumber"
                name="regNumber"
                required
                placeholder="e.g., ZC2023006"
                value={formData.regNumber}
                onChange={handleInputChange}
              />
            </div>

            <div className="border-t pt-4 mt-4">
              <h3 className="text-lg font-medium mb-4">Parent/Guardian Information</h3>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="parentName">Parent/Guardian Name*</Label>
                  <Input
                    id="parentName"
                    name="parentName"
                    required
                    placeholder="Primary parent/guardian name"
                    value={formData.parentName}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="parentMobile">Mobile Number*</Label>
                  <Input
                    id="parentMobile"
                    name="parentMobile"
                    required
                    type="tel"
                    pattern="[0-9]{10}"
                    placeholder="10-digit mobile number"
                    value={formData.parentMobile}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="parentEmail">Email Address</Label>
                <Input
                  id="parentEmail"
                  name="parentEmail"
                  type="email"
                  placeholder="parent@example.com"
                  value={formData.parentEmail}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="border-t pt-4 mt-4">
              <h3 className="text-lg font-medium mb-4">Financial Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="feeBalance">Fee Balance (₹)</Label>
                <Input
                  id="feeBalance"
                  name="feeBalance"
                  type="number"
                  placeholder="Outstanding balance"
                  value={formData.feeBalance}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => window.history.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving Changes..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </AdminLayout>
  );
};

export default UpdateStudent;
