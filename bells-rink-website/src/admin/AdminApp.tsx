import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AdminAuthProvider, useAdminAuth } from './AdminAuthContext';
import AdminLayout from './components/AdminLayout';
import { Loading } from './components/ui';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Calendar from './pages/Calendar';
import Events from './pages/Events';
import Accounting from './pages/Accounting';
import CashEntry from './pages/CashEntry';
import Customers from './pages/Customers';
import Notifications from './pages/Notifications';
import Availability from './pages/Availability';
import './admin.css';

const Gate: React.FC = () => {
  const { session, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="admin-root">
        <Loading label="Loading your dashboard…" />
      </div>
    );
  }
  if (!session) {
    return (
      <div className="admin-root">
        <Login />
      </div>
    );
  }
  return (
    <div className="admin-root">
      <Routes>
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="events" element={<Events />} />
          <Route path="accounting" element={<Accounting />} />
          <Route path="cash" element={<CashEntry />} />
          <Route path="customers" element={<Customers />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="availability" element={<Availability />} />
          <Route path="*" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
};

const AdminApp: React.FC = () => (
  <AdminAuthProvider>
    <Gate />
  </AdminAuthProvider>
);

export default AdminApp;
