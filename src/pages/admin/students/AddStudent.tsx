
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

const AddStudent = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") === "upload" ? "upload" : "manual";

  const [activeTab, setActiveTab] = useState(initialTab);
  const [isUploading, setIsUploading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    section: "",
    regNumber: "",
    parentName: "",
    parentMobile: "",
    parentEmail: "",
    secondaryParentName: "",
    secondaryParentMobile: "",
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
    toast.success("Student added successfully!");
    console.log("Student data:", formData);
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

  // Generate classes array
  const classes = Array.from({ length: 12 }, (_, i) => `${i + 1}`);

  // Generate sections array
  const sections = ["A", "B", "C", "D", "E"];

  return (
    <AdminLayout
      title="Add New Student"
      description="Add a new student to your institution"
      backUrl="/admin/students"
      backLabel="Back to Students"
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
                <p className="text-sm text-muted-foreground">
                  Unique identifier for the student in your institution
                </p>
              </div>

              <div className="border-t pt-6 mt-2">
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

                <div className="space-y-2 mb-4">
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

                <h4 className="text-md font-medium mb-3 mt-6">Secondary Contact (Optional)</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="secondaryParentName">Secondary Contact Name</Label>
                    <Input
                      id="secondaryParentName"
                      name="secondaryParentName"
                      placeholder="Secondary parent/guardian name"
                      value={formData.secondaryParentName}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="secondaryParentMobile">Mobile Number</Label>
                    <Input
                      id="secondaryParentMobile"
                      name="secondaryParentMobile"
                      type="tel"
                      pattern="[0-9]{10}"
                      placeholder="10-digit mobile number"
                      value={formData.secondaryParentMobile}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-8">
              <Button type="button" variant="outline" onClick={() => setFormData({
                name: "",
                class: "",
                section: "",
                regNumber: "",
                parentName: "",
                parentMobile: "",
                parentEmail: "",
                secondaryParentName: "",
                secondaryParentMobile: "",
              })}>
                Cancel
              </Button>
              <Button type="submit">
                Save Student
              </Button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload Student Data</CardTitle>
              <CardDescription>
                Upload an Excel or CSV file containing student information
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
                      Your Excel/CSV file should have columns for Student Name, Class, Section,
                      Registration Number, Parent Name, and Parent Mobile.
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

export default AddStudent;
