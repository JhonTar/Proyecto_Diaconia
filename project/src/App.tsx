import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Auth/Login';
import RepairTickets from './pages/WorkOrder/RepairTickets';
import RepairDetails from './pages/WorkOrder/RepairDetails';
import CreateRepairTicket from './pages/WorkOrder/CreateRepairTicket';
import Inventory from './pages/Inventory';
import Customers from './pages/Customers';
import CustomerDetails from './pages/CustomerDetails';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/repairs" element={<RepairTickets />} />
              <Route path="/repairs/new" element={<CreateRepairTicket />} />
              <Route path="/repairs/:id" element={<RepairDetails />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/customers/:id" element={<CustomerDetails />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;