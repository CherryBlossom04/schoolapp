
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { AdminLayout } from "@/components/admin/AdminLayout.tsx";
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
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

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

const DeleteStaff = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [staff, setStaff] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  // Fetch staff data
  useEffect(() => {
    // Simulate API call
    const foundStaff = mockStaff.find((s) => s.id === id);
    
    if (foundStaff) {
      setStaff(foundStaff);
    } else {
      toast.error("Staff member not found");
      navigate("/admin/staff");
    }
  }, [id, navigate]);

  // Handle staff deletion
  const handleDeleteStaff = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (confirmText !== "DELETE") {
      toast.error("Please type DELETE to confirm");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Staff member ${staff?.name} has been deleted`);
      navigate("/admin/staff");
    }, 1000);
  };

  // Check if delete button should be enabled
  const isDeleteEnabled = confirmText === "DELETE";

  if (!staff) {
    return null; // Loading state
  }

  return (
    <AdminLayout
      title="Delete Staff"
      description="Permanently remove a staff member from your institution"
      backUrl="/admin/staff"
      backLabel="Back to Staff"
    >
      <Card className="border-destructive/50">
        <CardHeader className="bg-destructive/5">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <CardTitle className="text-destructive">Delete Staff Account</CardTitle>
          </div>
          <CardDescription>
            This action cannot be undone. The staff member will be permanently removed from your system.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Name</p>
                <p>{staff.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Staff ID</p>
                <p>{staff.staffId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Role</p>
                <p>{staff.role}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Department</p>
                <p>{staff.department}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p>{staff.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Phone</p>
                <p>{staff.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Joining Date</p>
                <p>{new Date(staff.joiningDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Salary</p>
                <p>₹{staff.salary.toLocaleString()}</p>
              </div>
            </div>

            <Alert variant="destructive" className="mt-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription className="space-y-2">
                <p>Deleting this staff account will:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Remove all account access from this staff member</li>
                  <li>Delete all transaction records and history</li>
                  <li>Remove all assigned permissions and roles</li>
                  <li>Delete attendance and work records</li>
                  <li>Remove all system access and login credentials</li>
                </ul>
              </AlertDescription>
            </Alert>

            <form onSubmit={handleDeleteStaff} className="mt-6">
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  To confirm deletion, type "DELETE" in the field below:
                </p>
                <Input 
                  placeholder="Type DELETE to confirm"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  className="max-w-xs"
                />
              </div>
            </form>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/staff")}
          >
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            disabled={!isDeleteEnabled || isLoading}
            onClick={handleDeleteStaff}
          >
            {isLoading ? "Deleting..." : "Delete Staff Permanently"}
          </Button>
        </CardFooter>
      </Card>
    </AdminLayout>
  );
};

export default DeleteStaff;
