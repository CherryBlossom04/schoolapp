
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { AdminLayout } from "@/components/admin/AdminLayout.tsx";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
    feeBalance: 0,
  },
];

const DeleteStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch student data
  useEffect(() => {
    // Simulate API call
    const foundStudent = mockStudents.find((s) => s.id === id);
    
    if (foundStudent) {
      setStudent(foundStudent);
    } else {
      toast.error("Student not found");
      navigate("/admin/students");
    }
  }, [id, navigate]);

  // Handle student deletion
  const handleDeleteStudent = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Student ${student?.name} has been deleted`);
      navigate("/admin/students");
    }, 1000);
  };

  if (!student) {
    return null; // Loading state
  }

  return (
    <AdminLayout
      title="Delete Student"
      description="Permanently remove a student from your institution"
      backUrl="/admin/students"
      backLabel="Back to Students"
    >
      <Card className="border-destructive/50">
        <CardHeader className="bg-destructive/5">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <CardTitle className="text-destructive">Delete Student Account</CardTitle>
          </div>
          <CardDescription>
            This action cannot be undone. The student will be permanently removed from your system.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Student Name</p>
                <p>{student.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Registration Number</p>
                <p>{student.regNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Class & Section</p>
                <p>Class {student.class} {student.section}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Parent Name</p>
                <p>{student.parentName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Parent Contact</p>
                <p>{student.parentMobile}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Fee Balance</p>
                <p className={student.feeBalance > 0 ? "text-red-500 font-medium" : ""}>
                  ₹{student.feeBalance.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="rounded-md bg-muted p-4 mt-4">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 mr-3" />
                <div>
                  <p className="font-medium">Warning</p>
                  <ul className="text-sm text-muted-foreground list-disc pl-4 mt-1 space-y-1">
                    <li>All transaction history will be lost</li>
                    <li>QR code will be deactivated</li>
                    <li>Parent access will be revoked</li>
                    <li>Attendance records will be removed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/students")}
          >
            Cancel
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                Delete Student
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the account
                  and remove all associated data for <strong>{student.name}</strong>.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteStudent}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  disabled={isLoading}
                >
                  {isLoading ? "Deleting..." : "Yes, Delete Student"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </AdminLayout>
  );
};

export default DeleteStudent;
