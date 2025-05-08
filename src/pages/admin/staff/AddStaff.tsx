
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { 
  Upload, 
  Download, 
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import { AdminLayout } from "@/components/admin/AdminLayout.tsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddStaff = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") === "upload" ? "upload" : "manual";
  
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isUploading, setIsUploading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    phone: "",
    email: "",
    staffId: "",
    password: "",
    salary: "",
    joiningDate: "",
  });

  // File upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Handle manual form submission
  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Staff member added successfully!");
    console.log("Staff data:", formData);
  };

  // Handle file upload
  const handleFileUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }
    
    setIsUploading(true);
    
    // Simulate file upload
    setTimeout(() => {
      setIsUploading(false);
      toast.success(`File "${selectedFile.name}" uploaded successfully!`);
      setSelectedFile(null);
    }, 2000);
  };

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

  // Generate current date in YYYY-MM-DD format
  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <AdminLayout
      title="Add New Staff"
      description="Add a new staff member to your institution"
      backUrl="/admin/staff"
      backLabel="Back to Staff"
    >
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full sm:w-auto mb-6">
          <TabsTrigger value="manual" className="flex-1 sm:flex-none">Manual Entry</TabsTrigger>
          <TabsTrigger value="upload" className="flex-1 sm:flex-none">Upload Excel/CSV</TabsTrigger>
        </TabsList>
        
        <TabsContent value="manual">
          <form onSubmit={handleManualSubmit}>
            <div className="grid gap-6 mb-6">
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
                  <Label htmlFor="staffId">Staff ID</Label>
                  <Input
                    id="staffId"
                    name="staffId"
                    placeholder="Unique staff identifier"
                    value={formData.staffId}
                    onChange={handleInputChange}
                  />
                  <p className="text-sm text-muted-foreground">
                    Leave blank to auto-generate
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Initial Password*</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Temporary password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <p className="text-sm text-muted-foreground">
                    Staff will be asked to change on first login
                  </p>
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
                    max={currentDate}
                    value={formData.joiningDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-8">
              <Button type="button" variant="outline" onClick={() => setFormData({
                name: "",
                role: "",
                phone: "",
                email: "",
                staffId: "",
                password: "",
                salary: "",
                joiningDate: "",
              })}>
                Cancel
              </Button>
              <Button type="submit">
                Save Staff
              </Button>
            </div>
          </form>
        </TabsContent>
        
        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload Staff Data</CardTitle>
              <CardDescription>
                Upload an Excel or CSV file containing staff information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFileUpload} className="space-y-6">
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <Upload className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <p className="mb-2 font-medium">Drag and drop your file here or click to browse</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Supported formats: .xlsx, .xls, .csv (max 5MB)
                  </p>
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <div className="flex justify-center">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      Browse Files
                    </Button>
                  </div>
                  {selectedFile && (
                    <div className="mt-4 text-sm font-medium">
                      Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
                    </div>
                  )}
                </div>
                
                <div className="bg-muted/50 rounded-lg p-4 flex items-start">
                  <AlertCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium">File Format Requirements</p>
                    <p className="text-muted-foreground">
                      Your Excel/CSV file should have columns for Name, Role, Phone, 
                      Email, Staff ID (optional), and Joining Date.
                    </p>
                    <p className="mt-2">
                      <Button variant="link" className="p-0 h-auto" onClick={() => 
                        toast.info("Template downloaded")
                      }>
                        <Download className="h-4 w-4 mr-1" />
                        Download template
                      </Button>
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 mt-8">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setSelectedFile(null)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={!selectedFile || isUploading}
                  >
                    {isUploading ? "Uploading..." : "Upload File"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AddStaff;
