
import { Routes, Route, Navigate } from "react-router-dom";
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

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const institutionId = localStorage.getItem('institutionId');
    return institutionId ? children : <Navigate to="/sign-in" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}/>
        <Route path="/admin/students" element={<ProtectedRoute><StudentsList /></ProtectedRoute>}/>
        <Route path="/admin/students/add" element={<ProtectedRoute><AddStudent /></ProtectedRoute>}/>
        <Route path="/admin/students/update/:id" element={<ProtectedRoute><UpdateStudent /></ProtectedRoute>}/>
        <Route path="/admin/students/delete/:id" element={<ProtectedRoute><DeleteStudent /></ProtectedRoute>}/>
        <Route path="/admin/staff" element={<ProtectedRoute><StaffList /></ProtectedRoute>}/>
        <Route path="/admin/staff/add" element={<ProtectedRoute><AddStaff /></ProtectedRoute>}/>
        <Route path="/admin/staff/update/:id" element={<ProtectedRoute><UpdateStaff /></ProtectedRoute>}/>
        <Route path="/admin/staff/delete/:id" element={<ProtectedRoute><DeleteStaff /></ProtectedRoute>}/>
        <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>}/>
        <Route path="/admin/notifications" element={<ProtectedRoute><AdminNotifications /></ProtectedRoute>}/>

        <Route path="*" element={<Navigate to="/sign-in" replace />} />
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
