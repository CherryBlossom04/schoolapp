
import { useState } from "react";
import { 
  Settings as SettingsIcon, 
  Bell, 
  Mail, 
  Phone, 
  Globe, 
  DollarSign, 
  ShieldAlert, 
  LogOut, 
  Save
} from "lucide-react";
import { toast } from "sonner";
import { AdminLayout } from "@/components/admin/AdminLayout.tsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
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

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [isLoading, setIsLoading] = useState(false);
  
  // General settings state
  const [generalSettings, setGeneralSettings] = useState({
    institutionName: "St. Mary's School",
    contactEmail: "info@stmarys.edu",
    contactPhone: "123-456-7890",
    address: "123 Education Street, Knowledge City",
    website: "www.stmarys.edu",
  });

  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    newStudentAdded: true,
    feePaymentReceived: true,
    lowBalanceAlert: true,
    systemUpdates: true,
  });

  // Financial settings state
  const [financialSettings, setFinancialSettings] = useState({
    currency: "INR",
    lowBalanceThreshold: "500",
    yearStart: "April",
    feeReminderDays: "5",
  });

  // Security settings state
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30",
    passwordExpiryDays: "90",
    allowStaffAccess: true,
    requireStrongPasswords: true,
  });

  // Handle general settings input change
  const handleGeneralInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGeneralSettings((prev) => ({ ...prev, [name]: value }));
  };

  // Handle notification settings switch change
  const handleNotificationSwitchChange = (name: string, checked: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [name]: checked }));
  };

  // Handle financial settings input change
  const handleFinancialInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFinancialSettings((prev) => ({ ...prev, [name]: value }));
  };

  // Handle security settings change
  const handleSecurityChange = (name: string, value: string | boolean) => {
    setSecuritySettings((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Settings updated successfully");
      console.log({
        generalSettings,
        notificationSettings,
        financialSettings,
        securitySettings,
      });
    }, 1000);
  };

  // Handle account logout
  const handleLogout = () => {
    toast.success("Logged out successfully");
    // In a real app, would redirect to login page
  };

  return (
    <AdminLayout
      title="Settings"
      description="Manage your institution and app settings"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="general">
            <SettingsIcon className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="financial">
            <DollarSign className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Financial</span>
          </TabsTrigger>
          <TabsTrigger value="security">
            <ShieldAlert className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage your institution's general information
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="institutionName">Institution Name</Label>
                  <Input
                    id="institutionName"
                    name="institutionName"
                    value={generalSettings.institutionName}
                    onChange={handleGeneralInputChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <div className="flex">
                      <Mail className="h-4 w-4 text-muted-foreground mr-2 mt-3" />
                      <Input
                        id="contactEmail"
                        name="contactEmail"
                        type="email"
                        value={generalSettings.contactEmail}
                        onChange={handleGeneralInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <div className="flex">
                      <Phone className="h-4 w-4 text-muted-foreground mr-2 mt-3" />
                      <Input
                        id="contactPhone"
                        name="contactPhone"
                        value={generalSettings.contactPhone}
                        onChange={handleGeneralInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={generalSettings.address}
                    onChange={handleGeneralInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <div className="flex">
                    <Globe className="h-4 w-4 text-muted-foreground mr-2 mt-3" />
                    <Input
                      id="website"
                      name="website"
                      value={generalSettings.website}
                      onChange={handleGeneralInputChange}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailNotifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => 
                        handleNotificationSwitchChange("emailNotifications", checked)
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="smsNotifications">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via SMS
                      </p>
                    </div>
                    <Switch
                      id="smsNotifications"
                      checked={notificationSettings.smsNotifications}
                      onCheckedChange={(checked) => 
                        handleNotificationSwitchChange("smsNotifications", checked)
                      }
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-foreground">Notification Types</h3>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="newStudentAdded">New Student Added</Label>
                    <Switch
                      id="newStudentAdded"
                      checked={notificationSettings.newStudentAdded}
                      onCheckedChange={(checked) => 
                        handleNotificationSwitchChange("newStudentAdded", checked)
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="feePaymentReceived">Fee Payment Received</Label>
                    <Switch
                      id="feePaymentReceived"
                      checked={notificationSettings.feePaymentReceived}
                      onCheckedChange={(checked) => 
                        handleNotificationSwitchChange("feePaymentReceived", checked)
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="lowBalanceAlert">Low Balance Alert</Label>
                    <Switch
                      id="lowBalanceAlert"
                      checked={notificationSettings.lowBalanceAlert}
                      onCheckedChange={(checked) => 
                        handleNotificationSwitchChange("lowBalanceAlert", checked)
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="systemUpdates">System Updates</Label>
                    <Switch
                      id="systemUpdates"
                      checked={notificationSettings.systemUpdates}
                      onCheckedChange={(checked) => 
                        handleNotificationSwitchChange("systemUpdates", checked)
                      }
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="financial">
          <Card>
            <CardHeader>
              <CardTitle>Financial Settings</CardTitle>
              <CardDescription>
                Configure payment and financial settings
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Input
                    id="currency"
                    name="currency"
                    value={financialSettings.currency}
                    onChange={handleFinancialInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lowBalanceThreshold">Low Balance Threshold (₹)</Label>
                  <Input
                    id="lowBalanceThreshold"
                    name="lowBalanceThreshold"
                    type="number"
                    value={financialSettings.lowBalanceThreshold}
                    onChange={handleFinancialInputChange}
                  />
                  <p className="text-sm text-muted-foreground">
                    Alert will be triggered when balance falls below this amount
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="yearStart">Financial Year Start</Label>
                    <Input
                      id="yearStart"
                      name="yearStart"
                      value={financialSettings.yearStart}
                      onChange={handleFinancialInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="feeReminderDays">Fee Reminder Days</Label>
                    <Input
                      id="feeReminderDays"
                      name="feeReminderDays"
                      type="number"
                      value={financialSettings.feeReminderDays}
                      onChange={handleFinancialInputChange}
                    />
                    <p className="text-sm text-muted-foreground">
                      Days before due date to send reminders
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage security and access settings for your account
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch
                      id="twoFactorAuth"
                      checked={securitySettings.twoFactorAuth}
                      onCheckedChange={(checked) => 
                        handleSecurityChange("twoFactorAuth", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="requireStrongPasswords">Require Strong Passwords</Label>
                      <p className="text-sm text-muted-foreground">
                        Enforce strong password policy for all users
                      </p>
                    </div>
                    <Switch
                      id="requireStrongPasswords"
                      checked={securitySettings.requireStrongPasswords}
                      onCheckedChange={(checked) => 
                        handleSecurityChange("requireStrongPasswords", checked)
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input
                      id="sessionTimeout"
                      name="sessionTimeout"
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => handleSecurityChange("sessionTimeout", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passwordExpiryDays">Password Expiry (days)</Label>
                    <Input
                      id="passwordExpiryDays"
                      name="passwordExpiryDays"
                      type="number"
                      value={securitySettings.passwordExpiryDays}
                      onChange={(e) => handleSecurityChange("passwordExpiryDays", e.target.value)}
                    />
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <h3 className="font-medium">Account</h3>
                  <Button 
                    variant="outline" 
                    type="button" 
                    className="text-red-500 hover:text-red-600"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminSettings;
