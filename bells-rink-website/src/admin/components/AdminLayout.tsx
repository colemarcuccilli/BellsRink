import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAdminAuth } from '../AdminAuthContext';

const NAV = [
  { to: '/admin', icon: '📊', label: 'Dashboard', end: true },
  { to: '/admin/bookings', icon: '📋', label: 'Party Bookings' },
  { to: '/admin/calendar', icon: '📅', label: 'Calendar' },
  { to: '/admin/events', icon: '🎉', label: 'Events' },
  { to: '/admin/accounting', icon: '💵', label: 'Money & Reports' },
  { to: '/admin/cash', icon: '🧾', label: 'Daily Cash' },
  { to: '/admin/customers', icon: '👥', label: 'Customers' },
  { to: '/admin/notifications', icon: '✉️', label: 'Send Messages' },
  { to: '/admin/availability', icon: '🚫', label: 'Closed Days' },
];

const AdminLayout: React.FC = () => {
  const { email, signOut } = useAdminAuth();
  const [open, setOpen] = useState(false);
  const initial = (email ?? 'A').charAt(0).toUpperCase();

  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar ${open ? 'open' : ''}`}>
        <div className="admin-brand">
          <div className="admin-brand-logo">🛼</div>
          <div className="admin-brand-text">
            <strong>Bell's Rink</strong>
            <span>Owner Dashboard</span>
          </div>
        </div>
        <nav className="admin-nav">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <span className="admin-nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="admin-sidebar-foot">
          <div className="admin-user">
            <div className="admin-user-avatar">{initial}</div>
            <span>{email}</span>
          </div>
          <button className="admin-signout" onClick={signOut}>
            Sign out
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <button
          className="a-btn a-btn-ghost"
          style={{ display: 'none' }}
          onClick={() => setOpen((o) => !o)}
        >
          ☰ Menu
        </button>
        <Outlet />
      </div>
    </div>
  );
};

// Per-page header + content wrapper.
export const Page: React.FC<{
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, subtitle, actions, children }) => (
  <>
    <div className="admin-topbar">
      <div className="a-flex-between">
        <div>
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {actions && <div className="a-page-actions">{actions}</div>}
      </div>
    </div>
    <div className="admin-content">{children}</div>
  </>
);

export default AdminLayout;
