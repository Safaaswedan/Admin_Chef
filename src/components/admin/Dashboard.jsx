import React, { useState, useEffect } from 'react';
import { statsAPI } from '../../api/statsAPI';
import { ordersAPI } from '../../api/ordersAPI';
import { formatCurrency } from '../../utils/format';
import LoadingSpinner from '../common/LoadingSpinner';
import { 
  TrendingUp, TrendingDown, Users, Truck, 
  ShoppingBag, DollarSign, Clock, CheckCircle,
  Eye, Star, Calendar, ChefHat, Award,
  Package, CreditCard, MapPin, Phone, Monitor, Code, Shield
} from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsData, ordersData] = await Promise.all([
        statsAPI.getDashboardStats(),
        ordersAPI.getRecent(5)
      ]);
      setStats(statsData);
      setRecentOrders(ordersData || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-container">{error}</div>;

  const statCards = [
    { title: 'الطهاة', value: stats?.totalChefs || 0, sub: `${stats?.activeChefs || 0} نشط`, icon: <ChefHat size={24} />, color: '#f59e0b', bg: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))' },
    { title: 'السائقين', value: stats?.totalDrivers || 0, sub: `${stats?.activeDrivers || 0} نشط`, icon: <Truck size={24} />, color: '#3b82f6', bg: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(59,130,246,0.05))' },
    { title: 'العملاء', value: stats?.totalCustomers || 0, sub: `${stats?.activeCustomers || 0} نشط`, icon: <Users size={24} />, color: '#10b981', bg: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))' },
    { title: 'الطلبات', value: stats?.totalOrders || 0, sub: `${stats?.completedOrders || 0} مكتمل`, icon: <ShoppingBag size={24} />, color: '#8b5cf6', bg: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(139,92,246,0.05))' },
    { title: 'الإيرادات', value: formatCurrency(stats?.totalRevenue || 0), sub: `اليوم: ${formatCurrency(stats?.todayRevenue || 0)}`, icon: <DollarSign size={24} />, color: '#ec4899', bg: 'linear-gradient(135deg, rgba(236,72,153,0.15), rgba(236,72,153,0.05))' },
    { title: 'متوسط الطلب', value: formatCurrency(stats?.averageOrderValue || 0), sub: `${stats?.todayOrders || 0} طلب اليوم`, icon: <TrendingUp size={24} />, color: '#14b8a6', bg: 'linear-gradient(135deg, rgba(20,184,166,0.15), rgba(20,184,166,0.05))' },
  ];

  const getStatusBadge = (status) => {
    const badges = {
      completed: { text: 'مكتمل', color: '#10b981', bg: 'rgba(16,185,129,0.15)', icon: <CheckCircle size={12} /> },
      delivering: { text: 'جاري التوصيل', color: '#3b82f6', bg: 'rgba(59,130,246,0.15)', icon: <Truck size={12} /> },
      pending: { text: 'قيد الانتظار', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)', icon: <Clock size={12} /> },
      cancelled: { text: 'ملغي', color: '#ef4444', bg: 'rgba(239,68,68,0.15)', icon: null },
    };
    return badges[status] || badges.pending;
  };

  return (
    <div className="dashboard">
      {/* الترحيب */}
      <div className="welcome-section">
        <div className="welcome-text">
          <h1>مرحباً بك في لوحة التحكم</h1>
          <p>نظرة عامة على أداء المنصة وإحصائيات اليوم</p>
        </div>
        <div className="date-badge">
          <Calendar size={16} />
          <span>{new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      {/* بطاقات الإحصائيات */}
      <div className="stats-grid">
        {statCards.map((card, index) => (
          <div key={index} className="stat-card" style={{ background: card.bg, borderLeftColor: card.color }}>
            <div className="stat-icon" style={{ color: card.color, background: `${card.color}15` }}>
              {card.icon}
            </div>
            <div className="stat-info">
              <h3>{card.title}</h3>
              <p className="stat-value">{card.value}</p>
              <span className="stat-sub">{card.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* الطلبات الأخيرة */}
      <div className="recent-section">
        <div className="section-header">
          <div className="section-title">
            <Package size={20} />
            <h2>آخر الطلبات</h2>
          </div>
          <button className="view-all-btn">
            <Eye size={16} />
            <span>عرض الكل</span>
          </button>
        </div>

        <div className="recent-orders">
          {recentOrders.length > 0 ? (
            <div className="orders-list">
              {recentOrders.map((order) => {
                const badge = getStatusBadge(order.status);
                return (
                  <div key={order.id} className="order-item">
                    <div className="order-main">
                      <div className="order-id-badge">
                        <span className="order-id">{order.id}</span>
                        <span className="order-date">{order.date}</span>
                      </div>
                      <div className="order-details">
                        <span className="customer-name">{order.customer}</span>
                        <span className="chef-name">
                          <ChefHat size={12} />
                          {order.chef}
                        </span>
                      </div>
                      <div className="order-amount">{formatCurrency(order.totalAmount || order.amount)}</div>
                    </div>
                    <div className="order-footer">
                      <span className="status-badge" style={{ background: badge.bg, color: badge.color }}>
                        {badge.icon && badge.icon}
                        {badge.text}
                      </span>
                      <span className="delivery-address">
                        <MapPin size={12} />
                        {order.deliveryAddress || 'عنوان غير محدد'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-orders">
              <Package size={48} />
              <p>لا توجد طلبات حديثة</p>
            </div>
          )}
        </div>
      </div>

      {/* معلومات إضافية */}
      <div className="info-section">
        <div className="info-card">
          <div className="info-icon terminal">
            <Monitor size={24} />
          </div>
          <div className="info-content">
            <h3>نظام التشغيل</h3>
            <p>Windows 11 Pro - الإصدار 23H2</p>
            <span className="info-badge">محدث</span>
          </div>
        </div>
        <div className="info-card">
          <div className="info-icon version">
            <Code size={24} />
          </div>
          <div className="info-content">
            <h3>إصدار النظام</h3>
            <p>KitchenX v2.0.0 - Admin Panel</p>
            <span className="info-badge">أحدث إصدار</span>
          </div>
        </div>
        <div className="info-card">
          <div className="info-icon status">
            <Shield size={24} />
          </div>
          <div className="info-content">
            <h3>حالة الخادم</h3>
            <p>جميع الخدمات تعمل بشكل طبيعي</p>
            <span className="info-badge active">✓ نشط</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;