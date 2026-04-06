import React from 'react';
import { NavLink, useNavigate } from 'react-router';
import { 
  MessageSquare, 
  Briefcase, 
  LogOut, 
  LayoutDashboard,
  ShieldCheck,
  BookOpen
} from 'lucide-react';
import { adminApi } from '../../api/adminApi';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await adminApi.logout();
    navigate('/admin/login');
  };

  return (
    <>
      <div 
        className={`admin-sidebar-overlay ${isOpen ? 'open' : ''}`} 
        onClick={onClose} 
        aria-hidden="true"
      />
      
      <aside 
        className={`admin-sidebar ${isOpen ? 'open' : ''}`}
        aria-label="Admin Sidebar"
      >
        <div className="admin-sidebar-header">
          <h2 className="admin-sidebar-logo">
            <ShieldCheck className="admin-nav-icon" style={{ color: 'var(--main-color-01)' }} />
            Admin Panel
          </h2>
        </div>
        
        <nav className="admin-sidebar-nav" aria-label="Admin Sidebar Navigation">
          <NavLink 
            to="/admin/messages" 
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            onClick={onClose}
            aria-label="View messages"
          >
            <MessageSquare className="admin-nav-icon" />
            Messages
          </NavLink>
          
          <NavLink 
            to="/admin/posts" 
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            onClick={onClose}
            aria-label="Manage job posts"
          >
            <Briefcase className="admin-nav-icon" />
            Job Posts
          </NavLink>
          
          <NavLink 
            to="/admin/blog" 
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            onClick={onClose}
            aria-label="Manage blog posts"
          >
            <BookOpen className="admin-nav-icon" />
            Manage Blog
          </NavLink>
        </nav>
        
        <div className="admin-sidebar-footer">
          <button 
            onClick={handleLogout} 
            className="admin-logout-btn"
            aria-label="Sign out of admin panel"
          >
            <LogOut className="admin-nav-icon" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
