
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import SignIn from "@/pages/SignIn";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";

// Admin Routes
import AdminDashboard from "@/pages/admin/AdminDashboard";
import StudentsList from "@/pages/admin/students/StudentsList";
import AddStudent from "@/pages/admin/students/AddStudent";
import UpdateStudent from "@/pages/admin/students/UpdateStudent";
import DeleteStudent from "@/pages/admin/students/DeleteStudent";
import StaffList from "@/pages/admin/staff/StaffList";
import AddStaff from "@/pages/admin/staff/AddStaff";
import UpdateStaff from "@/pages/admin/staff/UpdateStaff";
import DeleteStaff from "@/pages/admin/staff/DeleteStaff";
import AdminSettings from "@/pages/admin/Settings";
import AdminNotifications from "@/pages/admin/Notifications";

// Parent Routes
import ParentDashboard from "@/pages/parent/ParentDashboard";
import AddFundsPage from "@/pages/parent/AddFunds.tsx";
import ParentNotificationsPage from "@/pages/parent/Notifications.tsx";
import VerifyRegister from "@/pages/parent/VerifyRegister.tsx";
import Transaction from "@/pages/parent/Transaction.tsx";
import TransactionLog from "@/pages/parent/TransactionLog.tsx";
import ParentSettings from "@/pages/parent/Settings";
// import Settings

// Staff Routes
import StaffDashboard from "@/pages/staff/StaffDashboard";
import MakeTransaction from "@/pages/staff/MakeTransaction";
import StaffSettings from "@/pages/staff/StaffSettings";



const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/students" element={<StudentsList />} />
      <Route path="/admin/students/add" element={<AddStudent />} />
      <Route path="/admin/students/update/:id" element={<UpdateStudent />} />
      <Route path="/admin/students/delete/:id" element={<DeleteStudent />} />
      <Route path="/admin/staff" element={<StaffList />} />
      <Route path="/admin/staff/add" element={<AddStaff />} />
      <Route path="/admin/staff/update/:id" element={<UpdateStaff />} />
      <Route path="/admin/staff/delete/:id" element={<DeleteStaff />} />
      <Route path="/admin/settings" element={<AdminSettings />} />
      <Route path="/admin/notifications" element={<AdminNotifications />} />
      
      {/* Parent Routes */}
        <Route path="/parent" element={<ParentDashboard />} />
        {/*<Route path="/parent/transactions" element={<ParentTransactions />} />*/}
        <Route path="/parent/transactionlog" element={<TransactionLog />} />
        <Route path="/parent/add-funds/:register" element={<AddFundsPage />} />
        <Route path="/parent/verify-register" element={<VerifyRegister />} />
        <Route path="/parent/transaction" element={<Transaction />} />
        <Route path="/parent/settings" element={<ParentSettings />} />
        <Route path="/parent/notifications" element={<ParentNotificationsPage />} />

        {/* Staff Routes */}
        <Route path="/staff" element={<StaffDashboard />} />
        <Route path="/staff/make-transaction" element={<MakeTransaction />} />
        <Route path="/staff/settings" element={<StaffSettings />} />
        {/*<Route path="/staff/notifications" element={<StaffNotifications />} />*/}

        {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
