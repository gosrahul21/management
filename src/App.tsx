import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import GymPage from './pages/GymPage';
import EmployeePage from './pages/EmployeePage';
import SubscriptionPage from './pages/SubscriptionPage';
import SubscriberPage from './pages/SubscriberPage';
import DashboardPage from './pages/DashboardPage';
import GymDashboard from './pages/GymDashboard';
import SubscriberList from './pages/SubscriberList'; // Import the SubscriberList component
import PaymentPage from './pages/PaymentPage';
import AcknowledgementPage from './pages/AcknowledgementPage';
import OrdersPage from './pages/OrdersPage';
import UserProfile from './pages/UserProfilePage';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return ( 
    <GoogleOAuthProvider clientId='413773176963-f3r41461irvbjq00pboait6hd6aikf12.apps.googleusercontent.com'>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/create-gym" element={<GymPage />} />
        <Route path="/add-employee" element={<EmployeePage />} />
        <Route path="/add-subscription" element={<SubscriptionPage />} />
        <Route path="/subscribe-gym" element={<SubscriberPage />} />
        <Route path="/gym/dashboard/:id" element={<GymDashboard/>}/> 
        <Route path="/subscribers" element={<SubscriberList />} /> {/* Add the route for SubscriberList */}
        <Route path="/payment" element={<PaymentPage />} /> {/* Add the route for the PaymentPage */}
        <Route path="/acknowledgement" element={<AcknowledgementPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path='/subscriber/profile/:id' element={<UserProfile/>}/>
      </Routes>
    </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
