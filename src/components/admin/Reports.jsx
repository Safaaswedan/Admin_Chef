import React, { useState, useEffect } from 'react';
import { reportsAPI } from '../../api/reportsAPI';
import { statsAPI } from '../../api/statsAPI';
import { formatCurrency } from '../../utils/format';
import LoadingSpinner from '../common/LoadingSpinner';
import { FileText, Download, TrendingUp, Users, Truck, DollarSign, ChefHat, Award, Calendar, Printer } from 'lucide-react';

const Reports = () => {
  const [period, setPeriod] = useState('monthly');
  const [chefsReport, setChefsReport] = useState(null);
  const [driversReport, setDriversReport] = useState(null);
  const [financialReport, setFinancialReport] = useState(null);
  const [topChefs, setTopChefs] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('financial');

  useEffect(() => {
    fetchReports();
  }, [period]);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const [chefs, drivers, financial, topChefsData, topCustomersData] = await Promise.all([
        reportsAPI.getChefsReport(period),
        reportsAPI.getDriversReport(period),
        reportsAPI.getFinancialReport(period),
        statsAPI.getTopChefs(),
        statsAPI.getTopCustomers()
      ]);
      setChefsReport(chefs);
      setDriversReport(drivers);
      setFinancialReport(financial);
      setTopChefs(topChefsData);
      setTopCustomers(topCustomersData);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    const data = {
      period,
      chefsReport,
      driversReport,
      financialReport,
      generatedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report-${period}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="reports-page">
      <div className="page-header">
        <div>
          <h1>التقارير</h1>
          <p>تقارير وإحصائيات المنصة</p>
        </div>
        <div className="header-actions">
          <div className="period-selector">
            <button className={period === 'weekly' ? 'active' : ''} onClick={() => setPeriod('weekly')}>أسبوعي</button>
            <button className={period === 'monthly' ? 'active' : ''} onClick={() => setPeriod('monthly')}>شهري</button>
            <button className={period === 'yearly' ? 'active' : ''} onClick={() => setPeriod('yearly')}>سنوي</button>
          </div>
          <button className="btn-outline" onClick={handlePrint}>
            <Printer size={16} /> طباعة
          </button>
          <button className="btn-outline" onClick={handleExport}>
            <Download size={16} /> تصدير
          </button>
        </div>
      </div>

      {/* تبويبات التقارير */}
      <div className="reports-tabs">
        <button className={`tab-btn ${activeTab === 'financial' ? 'active' : ''}`} onClick={() => setActiveTab('financial')}>
          <DollarSign size={18} /> تقرير مالي
        </button>
        <button className={`tab-btn ${activeTab === 'chefs' ? 'active' : ''}`} onClick={() => setActiveTab('chefs')}>
          <ChefHat size={18} /> تقرير الطهاة
        </button>
        <button className={`tab-btn ${activeTab === 'drivers' ? 'active' : ''}`} onClick={() => setActiveTab('drivers')}>
          <Truck size={18} /> تقرير السائقين
        </button>
        <button className={`tab-btn ${activeTab === 'top' ? 'active' : ''}`} onClick={() => setActiveTab('top')}>
          <Award size={18} /> الأفضل
        </button>
      </div>

      {/* المحتوى حسب التبويب */}
      <div className="reports-content">
        {/* التقرير المالي */}
        {activeTab === 'financial' && financialReport && (
          <div className="report-section">
            <div className="report-header">
              <h2>التقرير المالي - {period === 'weekly' ? 'أسبوعي' : period === 'monthly' ? 'شهري' : 'سنوي'}</h2>
            </div>
            <div className="financial-stats-grid">
              <div className="financial-card">
                <div className="financial-icon revenue">
                  <DollarSign size={24} />
                </div>
                <div className="financial-info">
                  <h3>إجمالي الإيرادات</h3>
                  <p className="financial-value">{formatCurrency(financialReport.totalRevenue || 0)}</p>
                </div>
              </div>
              <div className="financial-card">
                <div className="financial-icon commission">
                  <TrendingUp size={24} />
                </div>
                <div className="financial-info">
                  <h3>عمولة المنصة (15%)</h3>
                  <p className="financial-value">{formatCurrency(financialReport.platformCommission || 0)}</p>
                </div>
              </div>
              <div className="financial-card">
                <div className="financial-icon chef-payout">
                  <ChefHat size={24} />
                </div>
                <div className="financial-info">
                  <h3>مستحقات الطهاة (70%)</h3>
                  <p className="financial-value">{formatCurrency(financialReport.chefPayouts || 0)}</p>
                </div>
              </div>
              <div className="financial-card">
                <div className="financial-icon driver-payout">
                  <Truck size={24} />
                </div>
                <div className="financial-info">
                  <h3>مستحقات السائقين</h3>
                  <p className="financial-value">{formatCurrency(financialReport.driverPayouts || 0)}</p>
                </div>
              </div>
              <div className="financial-card profit">
                <div className="financial-icon net-profit">
                  <Award size={24} />
                </div>
                <div className="financial-info">
                  <h3>صافي الربح</h3>
                  <p className="financial-value profit">{formatCurrency(financialReport.netProfit || 0)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* تقرير الطهاة */}
        {activeTab === 'chefs' && chefsReport && (
          <div className="report-section">
            <div className="report-header">
              <h2>تقرير أداء الطهاة</h2>
            </div>
            <div className="summary-stats">
              <div className="summary-card">
                <span className="summary-label">إجمالي الطهاة</span>
                <span className="summary-value">{chefsReport.totalChefs}</span>
              </div>
              <div className="summary-card">
                <span className="summary-label">طهاة نشطين</span>
                <span className="summary-value">{chefsReport.activeChefs}</span>
              </div>
              <div className="summary-card">
                <span className="summary-label">متوسط التقييم</span>
                <span className="summary-value">{chefsReport.avgRating} ★</span>
              </div>
              <div className="summary-card">
                <span className="summary-label">إجمالي الطلبات</span>
                <span className="summary-value">{chefsReport.totalOrdersFromChefs}</span>
              </div>
              <div className="summary-card">
                <span className="summary-label">إجمالي الإيرادات</span>
                <span className="summary-value">{formatCurrency(chefsReport.totalRevenueFromChefs)}</span>
              </div>
            </div>
            
            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>اسم الشيف</th>
                    <th>عدد الطلبات</th>
                    <th>الإيرادات</th>
                    <th>التقييم</th>
                  </tr>
                </thead>
                <tbody>
                  {chefsReport.chefs?.map((chef, index) => (
                    <tr key={index}>
                      <td>{chef.name}</td>
                      <td>{chef.orders}</td>
                      <td>{formatCurrency(chef.revenue)}</td>
                      <td>{chef.rating} ★</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* تقرير السائقين */}
        {activeTab === 'drivers' && driversReport && (
          <div className="report-section">
            <div className="report-header">
              <h2>تقرير أداء السائقين</h2>
            </div>
            <div className="summary-stats">
              <div className="summary-card">
                <span className="summary-label">إجمالي السائقين</span>
                <span className="summary-value">{driversReport.totalDrivers}</span>
              </div>
              <div className="summary-card">
                <span className="summary-label">سائقين نشطين</span>
                <span className="summary-value">{driversReport.activeDrivers}</span>
              </div>
              <div className="summary-card">
                <span className="summary-label">متوسط التقييم</span>
                <span className="summary-value">{driversReport.avgRating} ★</span>
              </div>
              <div className="summary-card">
                <span className="summary-label">إجمالي التوصيلات</span>
                <span className="summary-value">{driversReport.totalDeliveries}</span>
              </div>
            </div>
            
            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>اسم السائق</th>
                    <th>عدد التوصيلات</th>
                    <th>التقييم</th>
                  </tr>
                </thead>
                <tbody>
                  {driversReport.drivers?.map((driver, index) => (
                    <tr key={index}>
                      <td>{driver.name}</td>
                      <td>{driver.deliveries}</td>
                      <td>{driver.rating} ★</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* أفضل الطهاة والعملاء */}
        {activeTab === 'top' && (
          <div className="report-section">
            <div className="two-columns">
              <div className="column">
                <div className="report-header">
                  <h2>🏆 أفضل الطهاة</h2>
                </div>
                <div className="top-list">
                  {topChefs?.map((chef, index) => (
                    <div key={chef.id} className="top-item">
                      <div className="top-rank">#{index + 1}</div>
                      <div className="top-avatar">{chef.avatar || chef.name[0]}</div>
                      <div className="top-info">
                        <h4>{chef.name}</h4>
                        <p>{chef.specialty}</p>
                      </div>
                      <div className="top-stats">
                        <span>📦 {chef.totalOrders} طلب</span>
                        <span>⭐ {chef.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="column">
                <div className="report-header">
                  <h2>🏆 أفضل العملاء</h2>
                </div>
                <div className="top-list">
                  {topCustomers?.map((customer, index) => (
                    <div key={customer.id} className="top-item">
                      <div className="top-rank">#{index + 1}</div>
                      <div className="top-avatar">{customer.avatar || customer.name[0]}</div>
                      <div className="top-info">
                        <h4>{customer.name}</h4>
                        <p>{customer.location}</p>
                      </div>
                      <div className="top-stats">
                        <span>📦 {customer.totalOrders} طلب</span>
                        <span>💰 {formatCurrency(customer.totalSpent)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .reports-page { padding: 24px; }
        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 16px; }
        .page-header h1 { color: white; font-size: 24px; margin-bottom: 4px; }
        .page-header p { color: #9ca3af; font-size: 14px; }
        .header-actions { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
        .period-selector { display: flex; gap: 8px; background: rgba(255,255,255,0.05); padding: 4px; border-radius: 40px; }
        .period-selector button { padding: 8px 20px; border-radius: 32px; background: transparent; border: none; color: #9ca3af; cursor: pointer; transition: all 0.3s; }
        .period-selector button.active { background: linear-gradient(135deg, #f59e0b, #ea580c); color: white; }
        .btn-outline { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 8px 16px; border-radius: 10px; color: #e5e7eb; cursor: pointer; display: flex; align-items: center; gap: 8px; }
        .reports-tabs { display: flex; gap: 8px; margin-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 12px; flex-wrap: wrap; }
        .tab-btn { background: transparent; border: none; padding: 10px 20px; border-radius: 12px; color: #9ca3af; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.3s; }
        .tab-btn.active { background: rgba(245,158,11,0.2); color: #f59e0b; }
        .financial-stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
        .financial-card { background: rgba(255,255,255,0.05); border-radius: 20px; padding: 20px; display: flex; align-items: center; gap: 16px; transition: all 0.3s; }
        .financial-card:hover { background: rgba(255,255,255,0.08); transform: translateY(-2px); }
        .financial-icon { width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; }
        .financial-icon.revenue { background: rgba(16,185,129,0.1); color: #10b981; }
        .financial-icon.commission { background: rgba(245,158,11,0.1); color: #f59e0b; }
        .financial-icon.chef-payout { background: rgba(139,92,246,0.1); color: #8b5cf6; }
        .financial-icon.driver-payout { background: rgba(59,130,246,0.1); color: #3b82f6; }
        .financial-icon.net-profit { background: rgba(236,72,153,0.1); color: #ec4899; }
        .financial-info h3 { color: #9ca3af; font-size: 14px; margin-bottom: 8px; }
        .financial-value { color: white; font-size: 24px; font-weight: bold; }
        .financial-value.profit { color: #10b981; }
        .summary-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-bottom: 24px; }
        .summary-card { background: rgba(255,255,255,0.05); border-radius: 16px; padding: 16px; text-align: center; }
        .summary-label { display: block; color: #9ca3af; font-size: 13px; margin-bottom: 8px; }
        .summary-value { display: block; color: white; font-size: 28px; font-weight: bold; }
        .data-table-container { overflow-x: auto; }
        .data-table { width: 100%; border-collapse: collapse; }
        .data-table th { text-align: right; padding: 16px; color: #9ca3af; font-weight: 500; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .data-table td { padding: 16px; color: #e5e7eb; border-bottom: 1px solid rgba(255,255,255,0.03); }
        .two-columns { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .top-list { display: flex; flex-direction: column; gap: 12px; }
        .top-item { display: flex; align-items: center; gap: 16px; background: rgba(255,255,255,0.05); border-radius: 16px; padding: 16px; transition: all 0.3s; }
        .top-item:hover { background: rgba(255,255,255,0.08); }
        .top-rank { width: 40px; height: 40px; background: rgba(245,158,11,0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #f59e0b; font-weight: bold; }
        .top-avatar { width: 48px; height: 48px; background: linear-gradient(135deg, #f59e0b, #ea580c); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: bold; color: white; }
        .top-info { flex: 1; }
        .top-info h4 { color: white; font-size: 16px; margin-bottom: 4px; }
        .top-info p { color: #9ca3af; font-size: 12px; }
        .top-stats { display: flex; gap: 12px; color: #9ca3af; font-size: 12px; }
        @media (max-width: 768px) { .two-columns { grid-template-columns: 1fr; } .header-actions { flex-direction: column; width: 100%; } }
      `}</style>
    </div>
  );
};

export default Reports;