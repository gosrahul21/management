import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import GymPage from "./pages/GymPage";
import EmployeePage from "./pages/employee/AddEmployeePage";
import SubscriptionPage from "./pages/susbcription-page/SubscriptionPage";
import SubscriberPage from "./pages/SubscriberPage";
import DashboardPage from "./pages/DashboardPage";
import GymDashboard from "./pages/GymDashboard";
import SubscriberList from "./pages/subscribers/SubscriberList"; // Import the SubscriberList component
import PaymentPage from "./pages/PaymentPage";
import AcknowledgementPage from "./pages/AcknowledgementPage";
import OrdersPage from "./pages/OrdersPage";
import UserProfile from "./pages/UserProfilePage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ExpenseRevenueDashboard from "./pages/ExpenseRevenueDashboard";
import EmployeeList from "./pages/EmployeeList";
import GroupList from "./pages/group/Groups";
import AttendanceDashboard from "./pages/AttendancePage";
import SalaryManagementPage from "./pages/SalaryManagementPage";
import GroupAttendancePage from "./pages/GroupAttendancePage";
import ShopPage from "./pages/ShopPage";
import InquiryList from "./pages/EnquiryList";
import Notifications from "./pages/Notification";
import ManageLeaves from "./pages/ManageLeaves";
import EmployeeDetails from "./pages/EmployeeDetails";
import { AuthProvider } from "./context/authContext";
import { GymProvider } from "./context/GymContext";
import AddSubscriptionPage from "./pages/subscribers/AddSubscripionPage";
import ComingSoonPage from "./pages/ComingSoonPage";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT}>
      <Router>
        <AuthProvider>
          <GymProvider>
            <SnackbarProvider />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<DashboardPage />} />
              <Route path="/create-gym" element={<GymPage />} />
              <Route
                path="/gym/:gymId/add-employee"
                element={<EmployeePage />}
              />
              <Route
                path="/gym/:gymId/subscription"
                element={<SubscriptionPage />}
              />
              <Route path="/subscribe-gym" element={<SubscriberPage />} />
              <Route path="/gym/:gymId/dashboard" element={<GymDashboard />} />
              <Route
                path="/gym/:gymId/subscribers"
                element={<SubscriberList />}
              />{" "}
              {/* Add the route for SubscriberList */}
              <Route path="/gym/:gymId/employees" element={<EmployeeList />} />
              <Route
                path="/gym/:gymId/salary-management"
                element={<SalaryManagementPage />}
              />
              <Route path="/gym/:gymId/groups" element={<GroupList />} />
              <Route
                path="/gym/:gymId/add-subscription/:memberId"
                element={<AddSubscriptionPage />}
              />
              <Route
                path="/gym/:gymId/add-subscription/:memberId/:subscriptionId"
                element={<AddSubscriptionPage />}
              />
              <Route path="/gym/:gymId/payment" element={<PaymentPage />} />{" "}
              {/* Add the route for the PaymentPage */}
              <Route
                path="/acknowledgement"
                element={<AcknowledgementPage />}
              />
              <Route path="/orders" element={<OrdersPage />} />
              <Route
                path="/gym/:gymId/subscriber/profile/:id"
                element={<UserProfile />}
              />
              <Route
                path="/reports/income-expense"
                element={<ExpenseRevenueDashboard />}
              />
              <Route path="/gym/:gymId/shop" element={<ShopPage />} />{" "}
              <Route
                path="/gym/:gymId/attendance"
                element={<AttendanceDashboard />}
              />
              <Route path="/gym/:gymId/enquiry" element={<InquiryList />} />
              <Route
                path="/gym/:gymId/group-attendance"
                element={<GroupAttendancePage />}
              />
              <Route path="/notifications" element={<Notifications />} />
              <Route
                path="/gym/:gymId/staffs/manage-leaves"
                element={<ManageLeaves />}
              />
              <Route
                path="/employee-details/:id"
                element={<EmployeeDetails />}
              />
              <Route path="/coming-soon" element={<ComingSoonPage />} />
            </Routes>
            {/* <CheckIn/> */}
          </GymProvider>
        </AuthProvider>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
