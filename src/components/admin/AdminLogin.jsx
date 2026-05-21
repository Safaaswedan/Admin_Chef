import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../api/authAPI';
import { 
  Shield, Mail, Lock, Eye, EyeOff, Globe, 
  ChefHat, Truck, Users, Sparkles, CheckCircle,
  AlertCircle, ArrowRight, Network, Server, Cpu
} from 'lucide-react';

const AdminLogin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('admin@kitchenx.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await authAPI.login(email, password);
      if (response.success || response.access_token) {
        localStorage.setItem('access_token', response.access_token || response.data?.access_token);
        localStorage.setItem('user', JSON.stringify(response.user || response.data?.user));
        localStorage.setItem('isLoggedIn', 'true');
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
        }
        onLoginSuccess(true);
        navigate('/admin');
      } else {
        setError('فشل تسجيل الدخول');
      }
    } catch (err) {
      setError(err.message || 'البريد الإلكتروني أو كلمة المرور غير صحيحة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container-new">
      {/* خلفية متحركة */}
      <div className="login-bg-animated">
        <div className="bg-gradient"></div>
        <div className="bg-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{ 
              left: `${Math.random() * 100}%`, 
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }} />
          ))}
        </div>
        <div className="bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>

      {/* أيقونات عائمة */}
      <div className="floating-icons">
        <div className="float-icon chef"><ChefHat size={24} /></div>
        <div className="float-icon truck"><Truck size={24} /></div>
        <div className="float-icon users"><Users size={24} /></div>
        <div className="float-icon shield"><Shield size={24} /></div>
      </div>

      {/* بطاقة تسجيل الدخول */}
      <div className={`login-card-new ${isVisible ? 'visible' : ''}`}>
        {/* شريط حالة الخادم */}
        <div className="server-status-new">
          <div className="status-dot-new">
            <span className="pulse"></span>
          </div>
          <span>جميع الأنظمة تعمل بكفاءة</span>
          <Network size={14} />
        </div>

        {/* الشعار */}
        <div className="logo-section">
          <div className="logo-wrapper">
            <div className="logo-ring"></div>
            <div className="logo-icon-new">
              <Shield size={36} />
            </div>
          </div>
          <h1 className="logo-title">
            Culinary <span>Admin Pro</span>
          </h1>
          <p className="logo-subtitle">منصة إدارة متكاملة للطهاة المنزليين</p>
        </div>

        {/* خطأ */}
        {error && (
          <div className="error-alert">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* نموذج تسجيل الدخول */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group-new">
            <div className="input-icon">
              <Mail size={18} />
            </div>
            <input
              type="email"
              placeholder="البريد الإلكتروني للمدير"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
            />
            <div className="input-focus-border"></div>
          </div>

          <div className="input-group-new">
            <div className="input-icon">
              <Lock size={18} />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />
            <button 
              type="button" 
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            <div className="input-focus-border"></div>
          </div>

          <div className="form-footer">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="checkmark"></span>
              <span className="checkbox-text">ذكر الجلسة</span>
            </label>
            <a href="#" className="forgot-link">
              نسيت كلمة المرور؟
            </a>
          </div>

          <button 
            type="submit" 
            className="login-btn-new"
            disabled={loading}
          >
            {loading ? (
              <div className="btn-loader">
                <div className="loader-spinner"></div>
                <span>جاري التحقق...</span>
              </div>
            ) : (
              <div className="btn-content">
                <span>دخول آمن للمنصة</span>
                <ArrowRight size={18} className="btn-icon" />
              </div>
            )}
          </button>
        </form>

        {/* معلومات إضافية */}
        <div className="login-footer-new">
          <div className="security-badge">
            <Shield size={12} />
            <span>اتصال آمن</span>
          </div>
          <div className="footer-divider"></div>
          <div className="copyright">
            <p>© 2025 KitchenX – Culinary Admin Pro</p>
          </div>
        </div>

        {/* أيقونات تقنية */}
        <div className="tech-badges">
          <div className="tech-badge">
            <Server size={12} />
            <span>خادم آمن</span>
          </div>
          <div className="tech-badge">
            <Cpu size={12} />
            <span>SSL مشفر</span>
          </div>
          <div className="tech-badge">
            <Globe size={12} />
            <span>API v2.0</span>
          </div>
        </div>
      </div>

      <style>{`
        /* ========== الحاوية الرئيسية ========== */
        .login-container-new {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          direction: rtl;
        }

        /* ========== خلفية متحركة ========== */
        .login-bg-animated {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;
        }

        .bg-gradient {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%);
        }

        .bg-gradient::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 20% 50%, rgba(245,158,11,0.08) 0%, transparent 50%);
        }

        .bg-gradient::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 80% 80%, rgba(234,88,12,0.08) 0%, transparent 50%);
        }

        /* جزيئات متحركة */
        .bg-particles {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          bottom: -100px;
          width: 2px;
          height: 2px;
          background: linear-gradient(135deg, #f59e0b, #ea580c);
          border-radius: 50%;
          opacity: 0;
          animation: particleFloat 4s ease-in-out infinite;
        }

        @keyframes particleFloat {
          0% {
            transform: translateY(0) scale(0);
            opacity: 0;
          }
          20% {
            opacity: 0.5;
          }
          80% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100vh) scale(1);
            opacity: 0;
          }
        }

        /* أشكال هندسية متحركة */
        .bg-shapes {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .shape {
          position: absolute;
          opacity: 0.05;
          animation: shapeFloat 20s ease-in-out infinite;
        }

        .shape-1 {
          top: 10%;
          left: -5%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, #f59e0b, transparent);
          border-radius: 50%;
          filter: blur(60px);
        }

        .shape-2 {
          bottom: 10%;
          right: -5%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #ea580c, transparent);
          border-radius: 50%;
          filter: blur(80px);
          animation-delay: -5s;
        }

        .shape-3 {
          top: 50%;
          left: 20%;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, #f59e0b, transparent);
          border-radius: 50%;
          filter: blur(50px);
          animation-delay: -10s;
        }

        @keyframes shapeFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -30px) scale(1.1); }
        }

        /* ========== أيقونات عائمة ========== */
        .floating-icons {
          position: fixed;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .float-icon {
          position: absolute;
          color: rgba(245,158,11,0.15);
          animation: float 6s ease-in-out infinite;
        }

        .float-icon.chef { top: 15%; left: 10%; animation-delay: 0s; }
        .float-icon.truck { bottom: 20%; right: 8%; animation-delay: -2s; }
        .float-icon.users { top: 30%; right: 15%; animation-delay: -4s; }
        .float-icon.shield { bottom: 30%; left: 12%; animation-delay: -1s; }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }

        /* ========== بطاقة تسجيل الدخول ========== */
        .login-card-new {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 460px;
          margin: 20px;
          background: rgba(15, 15, 26, 0.85);
          backdrop-filter: blur(20px);
          border-radius: 32px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 40px 32px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
          transform: translateY(30px) scale(0.98);
        }

        .login-card-new.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .login-card-new:hover {
          border-color: rgba(245,158,11,0.2);
          box-shadow: 0 30px 60px -12px rgba(245,158,11,0.15);
        }

        /* شريط حالة الخادم */
        .server-status-new {
          position: absolute;
          top: -16px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(16,185,129,0.15);
          backdrop-filter: blur(8px);
          border-radius: 40px;
          padding: 6px 18px;
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid rgba(16,185,129,0.3);
          font-size: 12px;
          color: #34d399;
          white-space: nowrap;
        }

        .status-dot-new {
          position: relative;
          width: 8px;
          height: 8px;
        }

        .status-dot-new .pulse {
          position: absolute;
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
        }

        .status-dot-new .pulse::before {
          content: '';
          position: absolute;
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          animation: pulse-ring 1.5s infinite;
        }

        @keyframes pulse-ring {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(3);
            opacity: 0;
          }
        }

        /* قسم الشعار */
        .logo-section {
          text-align: center;
          margin-bottom: 32px;
        }

        .logo-wrapper {
          position: relative;
          display: inline-block;
          margin-bottom: 16px;
        }

        .logo-ring {
          position: absolute;
          top: -8px;
          left: -8px;
          right: -8px;
          bottom: -8px;
          border: 2px solid rgba(245,158,11,0.3);
          border-radius: 24px;
          animation: ringPulse 2s ease-in-out infinite;
        }

        @keyframes ringPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.08);
            opacity: 0.2;
          }
        }

        .logo-icon-new {
          width: 72px;
          height: 72px;
          background: linear-gradient(135deg, #f59e0b, #ea580c);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 25px -5px rgba(245,158,11,0.4);
          transition: transform 0.3s ease;
        }

        .logo-icon-new svg {
          color: white;
        }

        .logo-title {
          font-size: 26px;
          font-weight: 700;
          color: white;
          margin-bottom: 6px;
        }

        .logo-title span {
          background: linear-gradient(135deg, #f59e0b, #ea580c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .logo-subtitle {
          color: #9ca3af;
          font-size: 13px;
        }

        /* تنبيه الخطأ */
        .error-alert {
          background: rgba(239,68,68,0.12);
          border: 1px solid rgba(239,68,68,0.25);
          border-radius: 14px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          color: #f87171;
          font-size: 13px;
          margin-bottom: 24px;
          animation: shake 0.5s ease-in-out;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        /* نموذج الدخول */
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .input-group-new {
          position: relative;
        }

        .input-icon {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #6b7280;
          z-index: 2;
          transition: color 0.3s ease;
        }

        .login-input {
          width: 100%;
          padding: 14px 48px 14px 16px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          color: white;
          font-size: 14px;
          transition: all 0.3s ease;
          outline: none;
        }

        .login-input:focus {
          border-color: #f59e0b;
          background: rgba(255, 255, 255, 0.06);
        }

        .login-input:focus ~ .input-icon {
          color: #f59e0b;
        }

        .input-focus-border {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #f59e0b, #ea580c);
          transition: width 0.3s ease;
          border-radius: 2px;
        }

        .login-input:focus ~ .input-focus-border {
          width: 100%;
        }

        .password-toggle {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #6b7280;
          cursor: pointer;
          transition: color 0.3s ease;
          z-index: 2;
        }

        .password-toggle:hover {
          color: #f59e0b;
        }

        /* خيارات إضافية */
        .form-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          color: #9ca3af;
        }

        .checkbox-label input {
          display: none;
        }

        .checkmark {
          width: 18px;
          height: 18px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 5px;
          display: inline-block;
          position: relative;
          transition: all 0.2s ease;
        }

        .checkbox-label input:checked + .checkmark {
          background: linear-gradient(135deg, #f59e0b, #ea580c);
          border-color: #f59e0b;
        }

        .checkbox-label input:checked + .checkmark::after {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 11px;
        }

        .checkbox-text {
          transition: color 0.2s ease;
        }

        .checkbox-label:hover .checkbox-text {
          color: white;
        }

        .forgot-link {
          color: #f59e0b;
          text-decoration: none;
          font-size: 13px;
          transition: opacity 0.2s ease;
        }

        .forgot-link:hover {
          opacity: 0.8;
        }

        /* زر تسجيل الدخول */
        .login-btn-new {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #f59e0b, #ea580c);
          border: none;
          border-radius: 16px;
          color: white;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 8px;
          position: relative;
          overflow: hidden;
        }

        .login-btn-new::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }

        .login-btn-new:hover::before {
          left: 100%;
        }

        .login-btn-new:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px -5px rgba(245,158,11,0.4);
        }

        .login-btn-new:active {
          transform: translateY(0);
        }

        .login-btn-new:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .btn-content, .btn-loader {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .btn-icon {
          transition: transform 0.3s ease;
        }

        .login-btn-new:hover .btn-icon {
          transform: translateX(5px);
        }

        .loader-spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* تذييل */
        .login-footer-new {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-top: 28px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .security-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #10b981;
          font-size: 11px;
          background: rgba(16,185,129,0.1);
          padding: 4px 10px;
          border-radius: 20px;
        }

        .footer-divider {
          width: 1px;
          height: 20px;
          background: rgba(255, 255, 255, 0.1);
        }

        .copyright p {
          color: #6b7280;
          font-size: 11px;
        }

        /* شارات تقنية */
        .tech-badges {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 20px;
          flex-wrap: wrap;
        }

        .tech-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 5px 12px;
          color: #6b7280;
          font-size: 10px;
        }

        /* ========== ريسبونسيف ========== */
        @media (max-width: 640px) {
          .login-card-new {
            padding: 32px 24px;
            margin: 16px;
          }
          
          .logo-title {
            font-size: 22px;
          }
          
          .logo-icon-new {
            width: 60px;
            height: 60px;
          }
          
          .server-status-new {
            white-space: nowrap;
            font-size: 10px;
            padding: 4px 14px;
          }
          
          .form-footer {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }
          
          .tech-badges {
            gap: 8px;
          }
          
          .tech-badge {
            font-size: 9px;
            padding: 4px 10px;
          }
        }

        @media (max-width: 480px) {
          .login-card-new {
            padding: 28px 20px;
          }
          
          .logo-title {
            font-size: 20px;
          }
          
          .logo-subtitle {
            font-size: 11px;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;