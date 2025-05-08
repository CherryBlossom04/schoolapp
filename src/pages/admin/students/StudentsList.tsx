
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Search, 
  FileUp, 
  Plus, 
  MoreHorizontal, 
  Download,
  Trash,
  Eye,
  Edit,
  QrCode
} from "lucide-react";
import { toast } from "sonner";
import { AdminLayout } from "@/components/admin/AdminLayout.tsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for students
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
  {
    id: "3",
    name: "Arjun Patel",
    class: "8",
    section: "C",
    regNumber: "ZC2023003",
    parentName: "Suresh Patel",
    parentMobile: "9876543212",
    feeBalance: 2500,
  },
  {
    id: "4",
    name: "Sneha Verma",
    class: "11",
    section: "A",
    regNumber: "ZC2023004",
    parentName: "Vijay Verma",
    parentMobile: "9876543213",
    feeBalance: 1000,
  },
  {
    id: "5",
    name: "Karan Malhotra",
    class: "12",
    section: "B",
    regNumber: "ZC2023005",
    parentName: "Rakesh Malhotra",
    parentMobile: "9876543214",
    feeBalance: 7500,
  },
];

const StudentsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  
  // Filter students based on search query
  const filteredStudents = mockStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.regNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.parentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map((student) => student.id));
    }
  };

  // Handle individual student selection
  const handleSelectStudent = (studentId: string) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  // Handle export selected students
  const handleExportSelected = () => {
    toast.success(`Exported ${selectedStudents.length} students`);
  };

  // Handle delete selected students
  const handleDeleteSelected = () => {
    toast.success(`Deleted ${selectedStudents.length} students`);
    setSelectedStudents([]);
  };

  return (
    <AdminLayout
      title="Students List"
      description="Manage all students registered in your institution"
    >
      {/* Search and actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search by name, reg number or parent..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Link to="/admin/students/add">
            <Button className="w-full sm:w-auto">
              <Plus className="mr-1 h-4 w-4" />
              Add Student
            </Button>
          </Link>
          <Link to="/admin/students/add?tab=upload">
            <Button variant="outline" className="w-full sm:w-auto">
              <FileUp className="mr-1 h-4 w-4" />
              Bulk Upload
            </Button>
          </Link>
        </div>
      </div>

      {/* Selected students actions */}
      {selectedStudents.length > 0 && (
        <div className="bg-muted/50 rounded-md p-3 mb-4 flex flex-wrap justify-between items-center gap-2">
          <span className="text-sm font-medium">
            {selectedStudents.length} student{selectedStudents.length > 1 ? "s" : ""} selected
          </span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={handleExportSelected}>
              <Download className="mr-1 h-3.5 w-3.5" />
              Export Selected
            </Button>
            <Button size="sm" variant="destructive" onClick={handleDeleteSelected}>
              <Trash className="mr-1 h-3.5 w-3.5" />
              Delete Selected
            </Button>
          </div>
        </div>
      )}

      {/* Students table */}
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden sm:table-cell">Class</TableHead>
              <TableHead className="hidden md:table-cell">Reg Number</TableHead>
              <TableHead className="hidden lg:table-cell">Parent Name</TableHead>
              <TableHead className="hidden md:table-cell">Mobile</TableHead>
              <TableHead className="text-right">Fee Balance</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedStudents.includes(student.id)}
                      onCheckedChange={() => handleSelectStudent(student.id)}
                      aria-label={`Select ${student.name}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell className="hidden sm:table-cell">{student.class} {student.section}</TableCell>
                  <TableCell className="hidden md:table-cell">{student.regNumber}</TableCell>
                  <TableCell className="hidden lg:table-cell">{student.parentName}</TableCell>
                  <TableCell className="hidden md:table-cell">{student.parentMobile}</TableCell>
                  <TableCell className="text-right">
                    <span className={student.feeBalance > 0 ? "text-red-500 font-medium" : "text-green-500"}>
                      ₹{student.feeBalance.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => toast.info(`View details for ${student.name}`)}
                        >
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/admin/students/update/${student.id}`}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => toast.info(`Generated QR code for ${student.name}`)}
                        >
                          <QrCode className="mr-2 h-4 w-4" /> Generate QR
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/admin/students/delete/${student.id}`} className="text-red-500 focus:text-red-500">
                            <Trash className="mr-2 h-4 w-4" /> Delete
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No students found matching your search criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default StudentsList;
