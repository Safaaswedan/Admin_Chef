import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, ChefHat, Truck, Users, 
  ShoppingBag, FileText, Settings, LogOut, 
  Shield, TrendingUp, Star, MapPin, Calendar,
   UserPlus,
  CreditCard, Bell, Home, Package, BarChart3
} from 'lucide-react';

const AdminSidebar = ({ user, onLogout, onLinkClick }) => {
const menuItems = [
  { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'لوحة التحكم', description: 'الإحصائيات والتقارير' },
  { path: '/admin/requests', icon: <UserPlus size={20} />, label: 'طلبات الاشتراك', description: 'مراجعة طلبات الطهاة والسائقين' }, // جديد
  { path: '/admin/chefs', icon: <ChefHat size={20} />, label: 'الطهاة', description: 'إدارة الطهاة المنزليين' },
  { path: '/admin/drivers', icon: <Truck size={20} />, label: 'السائقين', description: 'إدارة سائقي التوصيل' },
  { path: '/admin/customers', icon: <Users size={20} />, label: 'العملاء', description: 'إدارة العملاء والزبائن' },
  { path: '/admin/orders', icon: <ShoppingBag size={20} />, label: 'الطلبات', description: 'متابعة وإدارة الطلبات' },
  { path: '/admin/reports', icon: <FileText size={20} />, label: 'التقارير', description: 'تقارير وإحصائيات متقدمة' },
  { path: '/admin/settings', icon: <Settings size={20} />, label: 'الإعدادات', description: 'إعدادات المنصة' },
];

  return (
    <div className="sidebar-wrapper">
      {/* الشعار */}
      <div className="sidebar-logo-section">
        <div className="logo-icon">
          <Shield size={28} />
        </div>
        <div className="logo-text">
          <h2>Culinary</h2>
          <p>Admin Pro</p>
        </div>
      </div>

      {/* معلومات المستخدم */}
      <div className="sidebar-user-section">
        <div className="user-avatar">
          {user?.name?.[0] || 'أ'}
        </div>
        <div className="user-info">
          <h4>{user?.name || 'مدير النظام'}</h4>
          <span>مدير عام</span>
        </div>
      </div>

      {/* قائمة التنقل */}
      <nav className="sidebar-nav-section">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={onLinkClick}
          >
            <span className="nav-icon">{item.icon}</span>
            <div className="nav-text">
              <span className="nav-label">{item.label}</span>
              <span className="nav-description">{item.description}</span>
            </div>
          </NavLink>
        ))}
      </nav>

      {/* زر تسجيل الخروج */}
      <button className="sidebar-logout-btn" onClick={onLogout}>
        <LogOut size={20} />
        <div className="logout-text">
          <span>تسجيل خروج</span>
          <small>الخروج من حساب المدير</small>
        </div>
      </button>
    </div>
  );
};

export default AdminSidebar;