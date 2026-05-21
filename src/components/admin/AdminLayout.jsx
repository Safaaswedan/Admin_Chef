import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { authAPI } from '../../api/authAPI';
import { Menu, X } from 'lucide-react';

const AdminLayout = () => {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
      navigate('/admin/login');
    }
  };

  // إغلاق السايدبار عند الضغط على رابط (للموبايل)
  const handleLinkClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="admin-layout">
      {/* زر القائمة للموبايل */}
      <button 
        className="mobile-menu-btn" 
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* طبقة الظل عند فتح السايدبار في الموبايل */}
      {sidebarOpen && isMobile && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* السايدبار */}
      <div className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <AdminSidebar user={user} onLogout={handleLogout} onLinkClick={handleLinkClick} />
      </div>

      {/* المحتوى الرئيسي */}
      <main className="admin-main">
        <div className="main-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;