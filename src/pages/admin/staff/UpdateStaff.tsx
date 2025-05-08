
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

// Mock staff data
const mockStaff = [
  {
    id: "1",
    name: "Anjali Mehta",
    phone: "9876543210",
    email: "anjali.mehta@example.com",
    role: "Teacher",
    staffId: "ZCS001",
    department: "Science",
    salary: 45000,
    joiningDate: "2022-06-15",
  },
  {
    id: "2",
    name: "Rajiv Kumar",
    phone: "9876543211",
    email: "rajiv.kumar@example.com",
    role: "Administrator",
    staffId: "ZCS002",
    department: "Administration",
    salary: 60000,
    joiningDate: "2021-03-08",
  },
];

const UpdateStaff = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    phone: "",
    email: "",
    staffId: "",
    department: "",
    salary: "",
    joiningDate: "",
  });

  // Role options
  const roleOptions = [
    "Teacher",
    "Administrator",
    "Accountant",
    "Canteen Staff",
    "Librarian",
    "Security",
    "Maintenance",
    "Other",
  ];

  // Department options
  const departmentOptions = [
    "Science",
    "Mathematics",
    "Languages",
    "Arts",
    "Physical Education",
    "Administration",
    "Finance",
    "Maintenance",
    "Other",
  ];

  // Fetch staff data
  useEffect(() => {
    // Simulate API call
    const staff = mockStaff.find(s => s.id === id);
    
    if (staff) {
      setFormData({
        name: staff.name,
        role: staff.role,
        phone: staff.phone,
        email: staff.email,
        staffId: staff.staffId,
        department: staff.department,
        salary: staff.salary.toString(),
        joiningDate: staff.joiningDate,
      });
    } else {
      toast.error("Staff member not found");
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
      toast.success("Staff information updated successfully!");
      console.log("Updated staff data:", formData);
    }, 1000);
  };

  return (
    <AdminLayout
      title="Update Staff"
      description="Edit staff member information"
      backUrl="/admin/staff"
      backLabel="Back to Staff"
    >
      <Card>
        <CardHeader>
          <CardTitle>Staff Information</CardTitle>
          <CardDescription>Update the details for {formData.name}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name*</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="Staff full name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="staffId">Staff ID*</Label>
                <Input
                  id="staffId"
                  name="staffId"
                  required
                  placeholder="Unique staff identifier"
                  value={formData.staffId}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department*</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => handleSelectChange("department", value)}
                >
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departmentOptions.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role*</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => handleSelectChange("role", value)}
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number*</Label>
                <Input
                  id="phone"
                  name="phone"
                  required
                  type="tel"
                  pattern="[0-9]{10}"
                  placeholder="10-digit mobile number"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address*</Label>
                <Input
                  id="email"
                  name="email"
                  required
                  type="email"
                  placeholder="staff@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="salary">Monthly Salary (₹)</Label>
                <Input
                  id="salary"
                  name="salary"
                  type="number"
                  placeholder="Enter amount"
                  value={formData.salary}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="joiningDate">Joining Date</Label>
                <Input
                  id="joiningDate"
                  name="joiningDate"
                  type="date"
                  value={formData.joiningDate}
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

export default UpdateStaff;
