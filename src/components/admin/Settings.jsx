import React, { useState, useEffect } from 'react';
import { authAPI } from '../../api/authAPI';
import { Bell, Lock, Globe, User, Shield, Save, Moon, Sun, Languages, CreditCard, Database } from 'lucide-react';

const Settings = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [activeSection, setActiveSection] = useState('profile');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      setProfile(userData);
      setFormData(prev => ({ ...prev, name: userData.name || '', email: userData.email || '' }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    try {
      // هنا سيتم الاتصال بال API الحقيقي
      await new Promise(resolve => setTimeout(resolve, 800));
      setSuccess('تم تحديث الملف الشخصي بنجاح');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert('كلمة المرور الجديدة غير متطابقة');
      return;
    }
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setSuccess('تم تغيير كلمة المرور بنجاح');
      setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const sections = [
    { id: 'profile', icon: <User size={20} />, title: 'الملف الشخصي', description: 'تعديل معلومات حساب المدير' },
    { id: 'security', icon: <Lock size={20} />, title: 'الأمان', description: 'تغيير كلمة المرور وإعدادات الحماية' },
    { id: 'notifications', icon: <Bell size={20} />, title: 'الإشعارات', description: 'إعدادات التنبيهات والإشعارات' },
    { id: 'localization', icon: <Globe size={20} />, title: 'اللغة والمنطقة', description: 'إعدادات اللغة والعملة والتوقيت' },
    { id: 'appearance', icon: <Moon size={20} />, title: 'المظهر', description: 'الوضع المظلم والفاتح' },
  ];

  return (
    <div className="settings-page">
      <div className="page-header">
        <div>
          <h1>الإعدادات</h1>
          <p>إدارة إعدادات المنصة وحساب المدير</p>
        </div>
      </div>

      {success && <div className="success-message">{success}</div>}

      <div className="settings-container">
        <div className="settings-sidebar">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`settings-nav-btn ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              {section.icon}
              <div className="nav-text">
                <span>{section.title}</span>
                <small>{section.description}</small>
              </div>
            </button>
          ))}
        </div>

        <div className="settings-content">
          {/* الملف الشخصي */}
          {activeSection === 'profile' && (
            <div className="settings-card">
              <h2>الملف الشخصي</h2>
              <form onSubmit={handleProfileUpdate}>
                <div className="form-group">
                  <label>الاسم</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>البريد الإلكتروني</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>الدور</label>
                  <input type="text" value={profile?.role || 'مدير عام'} disabled />
                </div>
                <button type="submit" className="save-btn" disabled={loading}>
                  <Save size={18} /> {loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                </button>
              </form>
            </div>
          )}

          {/* الأمان */}
          {activeSection === 'security' && (
            <div className="settings-card">
              <h2>تغيير كلمة المرور</h2>
              <form onSubmit={handlePasswordChange}>
                <div className="form-group">
                  <label>كلمة المرور الحالية</label>
                  <input type="password" placeholder="••••••••" value={formData.currentPassword} onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>كلمة المرور الجديدة</label>
                  <input type="password" placeholder="••••••••" value={formData.newPassword} onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>تأكيد كلمة المرور الجديدة</label>
                  <input type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} required />
                </div>
                <button type="submit" className="save-btn" disabled={loading}>
                  <Lock size={18} /> {loading ? 'جاري التغيير...' : 'تغيير كلمة المرور'}
                </button>
              </form>
            </div>
          )}

          {/* الإشعارات */}
          {activeSection === 'notifications' && (
            <div className="settings-card">
              <h2>إعدادات الإشعارات</h2>
              <div className="notification-item">
                <div className="notification-info">
                  <Bell size={18} />
                  <span>إشعارات الطلبات الجديدة</span>
                </div>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="notification-item">
                <div className="notification-info">
                  <Bell size={18} />
                  <span>إشعارات الطهاة الجدد</span>
                </div>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="notification-item">
                <div className="notification-info">
                  <Bell size={18} />
                  <span>التقارير الأسبوعية</span>
                </div>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          )}

          {/* اللغة والمنطقة */}
          {activeSection === 'localization' && (
            <div className="settings-card">
              <h2>اللغة والمنطقة</h2>
              <div className="form-group">
                <label>اللغة</label>
                <select defaultValue="ar">
                  <option value="ar">العربية</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div className="form-group">
                <label>العملة</label>
                <select defaultValue="SAR">
                  <option value="SAR">ريال سعودي (SAR)</option>
                  <option value="USD">دولار أمريكي (USD)</option>
                </select>
              </div>
              <div className="form-group">
                <label>المنطقة الزمنية</label>
                <select defaultValue="Riyadh">
                  <option value="Riyadh">الرياض (GMT+3)</option>
                  <option value="Dubai">دبي (GMT+4)</option>
                </select>
              </div>
            </div>
          )}

          {/* المظهر */}
          {activeSection === 'appearance' && (
            <div className="settings-card">
              <h2>المظهر</h2>
              <div className="theme-options">
                <div className="theme-card dark active">
                  <div className="theme-preview dark"></div>
                  <span>وضع مظلم</span>
                </div>
                <div className="theme-card light">
                  <div className="theme-preview light"></div>
                  <span>وضع فاتح</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .settings-page { padding: 24px; }
        .settings-container { display: flex; gap: 24px; flex-wrap: wrap; }
        .settings-sidebar { width: 280px; background: rgba(255,255,255,0.05); border-radius: 20px; padding: 16px; }
        .settings-nav-btn { width: 100%; display: flex; align-items: center; gap: 12px; padding: 14px 16px; background: transparent; border: none; border-radius: 12px; color: #9ca3af; cursor: pointer; transition: all 0.3s; text-align: left; margin-bottom: 4px; }
        .settings-nav-btn:hover { background: rgba(255,255,255,0.05); color: #f59e0b; }
        .settings-nav-btn.active { background: rgba(245,158,11,0.15); color: #f59e0b; }
        .nav-text small { display: block; font-size: 11px; color: #6b7280; margin-top: 2px; }
        .settings-content { flex: 1; min-width: 300px; }
        .settings-card { background: rgba(255,255,255,0.05); border-radius: 20px; padding: 24px; }
        .settings-card h2 { color: white; font-size: 18px; margin-bottom: 20px; }
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; color: #9ca3af; font-size: 13px; margin-bottom: 8px; }
        .form-group input, .form-group select { width: 100%; padding: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; color: white; outline: none; }
        .save-btn { background: linear-gradient(135deg, #f59e0b, #ea580c); border: none; padding: 12px 24px; border-radius: 12px; color: white; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; }
        .notification-item { display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .notification-info { display: flex; align-items: center; gap: 12px; color: #e5e7eb; }
        .switch { position: relative; display: inline-block; width: 50px; height: 24px; }
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #4b5563; transition: 0.3s; border-radius: 34px; }
        .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: 0.3s; border-radius: 50%; }
        input:checked + .slider { background-color: #f59e0b; }
        input:checked + .slider:before { transform: translateX(26px); }
        .theme-options { display: flex; gap: 20px; }
        .theme-card { text-align: center; cursor: pointer; opacity: 0.6; transition: all 0.3s; }
        .theme-card.active { opacity: 1; }
        .theme-preview { width: 120px; height: 80px; border-radius: 12px; margin-bottom: 8px; border: 2px solid transparent; }
        .theme-preview.dark { background: #1a1a2e; border-color: #f59e0b; }
        .theme-preview.light { background: #f3f4f6; }
        .success-message { background: rgba(16,185,129,0.2); border: 1px solid #10b981; color: #10b981; padding: 12px 20px; border-radius: 12px; margin-bottom: 20px; }
        @media (max-width: 768px) { .settings-sidebar { width: 100%; } }
      `}</style>
    </div>
  );
};

export default Settings;