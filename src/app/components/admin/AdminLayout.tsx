import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { Menu, ShieldCheck } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import { adminApi } from '../../api/adminApi';
import '../../../styles/admin.css';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check auth on mount and route change
    const checkAuth = async () => {
      const isAuth = await adminApi.checkAuthSession();
      if (!isAuth) {
        navigate('/admin/login');
      } else {
        // Redirect to messages if hitting /admin exactly
        if (location.pathname === '/admin' || location.pathname === '/admin/') {
          navigate('/admin/messages');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [navigate, location.pathname]);

  if (isLoading) {
    return (
      <div className="admin-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <ShieldCheck size={48} color="var(--main-color-01)" className="animate-pulse" />
      </div>
    );
  }

  // Ensure body tag has admin styling
  document.body.className = 'admin-body';

  return (
    <div className="admin-layout">
      {/* Mobile Top Header */}
      <header className="admin-mobile-header">
        <div className="admin-mobile-logo">
          <ShieldCheck size={24} color="var(--main-color-01)" />
          Admin Panel
        </div>
        <button 
          className="admin-menu-btn" 
          onClick={() => setSidebarOpen(true)}
          aria-label="Open admin sidebar"
        >
          <Menu size={24} />
        </button>
      </header>

      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <main className="admin-main">
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
