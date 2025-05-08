
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
  ToggleLeft,
  Filter
} from "lucide-react";
import { toast } from "sonner";
import { AdminLayout } from "@/components/admin/AdminLayout.tsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
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

// Mock data for staff
const mockStaff = [
  {
    id: "1",
    name: "Anjali Mehta",
    phone: "9876543210",
    email: "anjali.mehta@example.com",
    role: "Teacher",
    status: "active",
    joinDate: "2022-06-15",
  },
  {
    id: "2",
    name: "Rajiv Kumar",
    phone: "9876543211",
    email: "rajiv.kumar@example.com",
    role: "Administrator",
    status: "active",
    joinDate: "2021-03-08",
  },
  {
    id: "3",
    name: "Sunita Sharma",
    phone: "9876543212",
    email: "sunita.sharma@example.com",
    role: "Accountant",
    status: "inactive",
    joinDate: "2022-11-21",
  },
  {
    id: "4",
    name: "Vikram Singh",
    phone: "9876543213",
    email: "vikram.singh@example.com",
    role: "Canteen Staff",
    status: "active",
    joinDate: "2023-01-10",
  },
  {
    id: "5",
    name: "Meena Patel",
    phone: "9876543214",
    email: "meena.patel@example.com",
    role: "Librarian",
    status: "active",
    joinDate: "2021-08-15",
  },
];

const StaffList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStaff, setSelectedStaff] = useState<string[]>([]);
  
  // Filter staff based on search query
  const filteredStaff = mockStaff.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectedStaff.length === filteredStaff.length) {
      setSelectedStaff([]);
    } else {
      setSelectedStaff(filteredStaff.map((staff) => staff.id));
    }
  };

  // Handle individual staff selection
  const handleSelectStaff = (staffId: string) => {
    if (selectedStaff.includes(staffId)) {
      setSelectedStaff(selectedStaff.filter((id) => id !== staffId));
    } else {
      setSelectedStaff([...selectedStaff, staffId]);
    }
  };

  // Handle export selected staff
  const handleExportSelected = () => {
    toast.success(`Exported ${selectedStaff.length} staff members`);
  };

  // Handle delete selected staff
  const handleDeleteSelected = () => {
    toast.success(`Deleted ${selectedStaff.length} staff members`);
    setSelectedStaff([]);
  };

  // Handle toggle staff status
  const handleToggleStatus = (staff: typeof mockStaff[0]) => {
    const newStatus = staff.status === "active" ? "inactive" : "active";
    toast.success(`${staff.name} is now ${newStatus}`);
  };

  return (
    <AdminLayout
      title="Staff List"
      description="Manage all staff members in your institution"
    >
      {/* Search and actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search by name, role, or email..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="mr-1 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => toast.info("Filter by role")}>
                Role
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info("Filter by status")}>
                Status
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info("Filter by join date")}>
                Join Date
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link to="/admin/staff/add">
            <Button className="w-full sm:w-auto">
              <Plus className="mr-1 h-4 w-4" />
              Add Staff
            </Button>
          </Link>
          <Link to="/admin/staff/add?tab=upload">
            <Button variant="outline" className="w-full sm:w-auto">
              <FileUp className="mr-1 h-4 w-4" />
              Bulk Upload
            </Button>
          </Link>
        </div>
      </div>

      {/* Selected staff actions */}
      {selectedStaff.length > 0 && (
        <div className="bg-muted/50 rounded-md p-3 mb-4 flex flex-wrap justify-between items-center gap-2">
          <span className="text-sm font-medium">
            {selectedStaff.length} staff member{selectedStaff.length > 1 ? "s" : ""} selected
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

      {/* Staff table */}
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedStaff.length === filteredStaff.length && filteredStaff.length > 0}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Role</TableHead>
              <TableHead className="hidden lg:table-cell">Phone</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden lg:table-cell">Join Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStaff.length > 0 ? (
              filteredStaff.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedStaff.includes(staff.id)}
                      onCheckedChange={() => handleSelectStaff(staff.id)}
                      aria-label={`Select ${staff.name}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{staff.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{staff.role}</TableCell>
                  <TableCell className="hidden lg:table-cell">{staff.phone}</TableCell>
                  <TableCell className="hidden md:table-cell">{staff.email}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {new Date(staff.joinDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={staff.status === "active" ? "default" : "secondary"}
                      className={staff.status === "active" ? "bg-green-500" : "bg-gray-500"}
                    >
                      {staff.status === "active" ? "Active" : "Inactive"}
                    </Badge>
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
                          onClick={() => toast.info(`View details for ${staff.name}`)}
                        >
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/admin/staff/update/${staff.id}`}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleToggleStatus(staff)}
                        >
                          <ToggleLeft className="mr-2 h-4 w-4" />
                          {staff.status === "active" ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/admin/staff/delete/${staff.id}`} className="text-red-500 focus:text-red-500">
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
                  No staff members found matching your search criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default StaffList;
