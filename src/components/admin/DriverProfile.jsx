import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { requestsAPI } from '../../api/requestsAPI';
import LoadingSpinner from '../common/LoadingSpinner';
import { 
  Truck, Mail, Phone, MapPin, Calendar, Clock, 
  FileText, CheckCircle, XCircle, Car,
  User, Shield, AlertCircle, ChevronLeft,
  Award, Navigation, Key, Star, Heart, Printer,
  Download, Share2, MoreVertical
} from 'lucide-react';

const DriverProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const mockData = {
        id: parseInt(id),
        name: 'سعد الحربي',
        email: 'saad.driver@example.com',
        phone: '+966 51 234 5710',
        location: 'الرياض - حي الملقا',
        vehicleType: 'سيارة',
        vehicleModel: 'تويوتا كورلا 2022',
        plateNumber: 'س ب ع 7890',
        licenseNumber: 'DL-123456',
        experience: '5 سنوات',
        bio: 'سائق محترف وملتزم بالمواعيد، لديه خبرة واسعة في توصيل الطلبات بكفاءة عالية. يمتلك سيارة حديثة ونظيفة، ويحرص على سلامة الطلبات وسرعة التوصيل.',
        submittedAt: '2025-05-10T09:15:00',
        status: 'pending'
      };
      
      try {
        const data = await requestsAPI.getDriverRequestById(id);
        setRequest(data || mockData);
      } catch (err) {
        setRequest(mockData);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (window.confirm(`✅ قبول الطلب\n\nهل أنت متأكد من قبول طلب ${request?.name}؟\nبعد القبول سيتمكن السائق من بدء استلام الطلبات.`)) {
      setActionLoading(true);
      try {
        await requestsAPI.approveDriverRequest(request.id);
        navigate('/admin/requests');
      } catch (err) {
        alert('حدث خطأ: ' + err.message);
      } finally {
        setActionLoading(false);
      }
    }
  };

  const handleReject = async () => {
    const reason = prompt('❌ رفض الطلب\n\nالرجاء كتابة سبب الرفض:');
    if (reason && reason.trim()) {
      setActionLoading(true);
      try {
        await requestsAPI.rejectDriverRequest(request.id, reason);
        navigate('/admin/requests');
      } catch (err) {
        alert('حدث خطأ: ' + err.message);
      } finally {
        setActionLoading(false);
      }
    }
  };

  const handlePrint = () => window.print();

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-container">{error}</div>;
  if (!request) return <div className="error-container">الطلب غير موجود</div>;

  return (
    <div className="driver-profile-page">
      <div className="profile-wrapper">
        {/* شريط الإجراءات العلوي */}
        <div className="action-header">
          <button className="back-action" onClick={() => navigate('/admin/requests')}>
            <ChevronLeft size={18} />
            <span>رجوع إلى الطلبات</span>
          </button>
          <div className="action-group">
            <button className="print-action" onClick={handlePrint}>
              <Printer size={16} />
              <span>طباعة</span>
            </button>
          </div>
        </div>

        {/* بطاقة الملف الشخصي */}
        <div className="profile-card-driver">
          
          {/* الشريط العلوي المزخرف */}
          <div className="hero-strip">
            <div className="strip-decoration"></div>
            <div className="strip-content">
              <div className="strip-badge">
                <span className="badge-icon">🚚</span>
                <span>طلب اشتراك جديد</span>
              </div>
              <div className="strip-info">
                <h2>مراجعة ملف السائق</h2>
                <p>قيد المراجعة • يحتاج إلى اتخاذ قرار</p>
              </div>
              <div className="strip-stats">
                <div className="stat-pill">
                  <FileText size={12} />
                  <span>رقم الطلب: #DRV-{String(request.id).padStart(4, '0')}</span>
                </div>
                <div className="stat-pill">
                  <Clock size={12} />
                  <span>مدة المراجعة: 3 أيام متبقية</span>
                </div>
              </div>
            </div>
          </div>

          {/* المحتوى الرئيسي */}
          <div className="profile-body">
            
            {/* رأس الملف */}
            <div className="profile-header-driver">
              <div className="avatar-section">
                <div className="avatar-ring"></div>
                <div className="avatar-icon">
                  <Truck size={52} />
                </div>
                <div className="avatar-badge">
                  <span>قيد المراجعة</span>
                </div>
              </div>
              <div className="info-section">
                <h1 className="driver-name">{request.name}</h1>
                <div className="tag-group">
                  <span className="tag tag-driver">
                    <Truck size={12} /> سائق توصيل
                  </span>
                  <span className="tag tag-pending">
                    <Clock size={12} /> قيد المراجعة
                  </span>
                </div>
                <div className="rating-group">
                  <div className="stars">
                    <Star size={14} className="star filled" />
                    <Star size={14} className="star filled" />
                    <Star size={14} className="star filled" />
                    <Star size={14} className="star filled" />
                    <Star size={14} className="star" />
                  </div>
                  <span className="rating-value">4.8</span>
                  <span className="rating-label">تقييم السائق</span>
                </div>
              </div>
              <div className="dates-section">
                <div className="date-card">
                  <Calendar size={14} />
                  <div>
                    <label>تاريخ التقديم</label>
                    <strong>{new Date(request.submittedAt).toLocaleDateString('ar-EG')}</strong>
                  </div>
                </div>
                <div className="date-card">
                  <Clock size={14} />
                  <div>
                    <label>وقت التقديم</label>
                    <strong>{new Date(request.submittedAt).toLocaleTimeString('ar-EG')}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* العمودين */}
            <div className="two-columns-grid">
              
              {/* العمود الأيمن */}
              <div className="column-right-driver">
                <div className="info-card-driver">
                  <div className="card-title">
                    <User size={16} />
                    <h3>معلومات الاتصال</h3>
                  </div>
                  <div className="card-content">
                    <div className="info-item">
                      <Mail size={14} />
                      <span>{request.email}</span>
                    </div>
                    <div className="info-item">
                      <Phone size={14} />
                      <span>{request.phone}</span>
                    </div>
                    <div className="info-item">
                      <MapPin size={14} />
                      <span>{request.location}</span>
                    </div>
                  </div>
                </div>

                <div className="info-card-driver">
                  <div className="card-title">
                    <Car size={16} />
                    <h3>معلومات المركبة</h3>
                  </div>
                  <div className="card-content">
                    <div className="info-item">
                      <Car size={14} />
                      <span><strong>النوع:</strong> {request.vehicleType}</span>
                    </div>
                    <div className="info-item">
                      <Award size={14} />
                      <span><strong>الموديل:</strong> {request.vehicleModel}</span>
                    </div>
                    <div className="info-item">
                      <Key size={14} />
                      <span><strong>اللوحة:</strong> {request.plateNumber}</span>
                    </div>
                    <div className="info-item">
                      <Navigation size={14} />
                      <span><strong>رخصة القيادة:</strong> {request.licenseNumber}</span>
                    </div>
                  </div>
                </div>

                <div className="info-card-driver">
                  <div className="card-title">
                    <FileText size={16} />
                    <h3>المستندات المرفقة</h3>
                  </div>
                  <div className="card-content">
                    <div className="docs-grid">
                      <button className="doc-button">
                        <FileText size={14} />
                        <span>رخصة القيادة</span>
                        <Download size={12} />
                      </button>
                      <button className="doc-button">
                        <FileText size={14} />
                        <span>استمارة المركبة</span>
                        <Download size={12} />
                      </button>
                      <button className="doc-button">
                        <FileText size={14} />
                        <span>صور المركبة</span>
                        <Download size={12} />
                      </button>
                      <button className="doc-button">
                        <Shield size={14} />
                        <span>شهادة حسن سيرة</span>
                        <Download size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* العمود الأيسر */}
              <div className="column-left-driver">
                <div className="info-card-driver bio-card-driver">
                  <div className="card-title">
                    <Heart size={16} />
                    <h3>السيرة الذاتية</h3>
                  </div>
                  <div className="card-content">
                    <p className="bio-text-driver">{request.bio}</p>
                  </div>
                </div>

                <div className="info-card-driver">
                  <div className="card-title">
                    <AlertCircle size={16} />
                    <h3>تفاصيل الطلب</h3>
                  </div>
                  <div className="card-content">
                    <div className="detail-item">
                      <span className="detail-label">رقم الطلب:</span>
                      <strong className="detail-value">#DRV-{String(request.id).padStart(4, '0')}</strong>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">حالة الطلب:</span>
                      <span className="status-badge-driver">
                        <span className="status-dot-driver"></span>
                        في انتظار المراجعة
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">سنوات الخبرة:</span>
                      <span className="detail-value">{request.experience}</span>
                    </div>
                  </div>
                </div>

                <div className="info-card-driver timer-card-driver">
                  <div className="card-title">
                    <Clock size={16} />
                    <h3>الوقت المتبقي للمراجعة</h3>
                  </div>
                  <div className="card-content">
                    <div className="timer-display-driver">
                      <div className="timer-block">
                        <span className="timer-number">02</span>
                        <span className="timer-label">يوم</span>
                      </div>
                      <span className="timer-separator">:</span>
                      <div className="timer-block">
                        <span className="timer-number">14</span>
                        <span className="timer-label">ساعة</span>
                      </div>
                      <span className="timer-separator">:</span>
                      <div className="timer-block">
                        <span className="timer-number">35</span>
                        <span className="timer-label">دقيقة</span>
                      </div>
                    </div>
                    <p className="timer-note">ينتهي وقت المراجعة بعد 3 أيام من تاريخ التقديم</p>
                  </div>
                </div>
              </div>
            </div>

            {/* أزرار الإجراءات */}
            <div className="action-buttons-driver">
              <button 
                className="action-btn approve-btn-driver" 
                onClick={handleApprove}
                disabled={actionLoading}
              >
                <CheckCircle size={18} />
                <span>{actionLoading ? 'جاري المعالجة...' : 'قبول الطلب'}</span>
                <div className="btn-shine"></div>
              </button>
              <button 
                className="action-btn reject-btn-driver" 
                onClick={handleReject}
                disabled={actionLoading}
              >
                <XCircle size={18} />
                <span>{actionLoading ? 'جاري المعالجة...' : 'رفض الطلب'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* ========== الصفحة الرئيسية ========== */
        .driver-profile-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0f 0%, #12121a 100%);
          padding: 24px;
          direction: rtl;
        }
        
        .profile-wrapper {
          max-width: 1400px;
          margin: 0 auto;
        }
        
        /* ========== شريط الإجراءات ========== */
        .action-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 16px;
        }
        
        .back-action {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 10px 20px;
          border-radius: 40px;
          color: #e5e7eb;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 14px;
        }
        
        .back-action:hover {
          background: rgba(59,130,246,0.15);
          border-color: rgba(59,130,246,0.4);
          color: #3b82f6;
          transform: translateX(-4px);
        }
        
        .action-group {
          display: flex;
          gap: 12px;
        }
        
        .print-action {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 10px 20px;
          border-radius: 40px;
          color: #e5e7eb;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .print-action:hover {
          background: rgba(59,130,246,0.15);
          border-color: rgba(59,130,246,0.4);
          color: #3b82f6;
        }
        
        /* ========== الشريط العلوي المزخرف ========== */
        .hero-strip {
          position: relative;
          background: linear-gradient(135deg, #1e3a5f 0%, #2563eb 50%, #1e3a5f 100%);
          border-radius: 24px 24px 0 0;
          overflow: hidden;
        }
        
        .strip-decoration {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 70%);
        }
        
        .strip-content {
          position: relative;
          padding: 24px 32px;
          z-index: 2;
        }
        
        .strip-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(4px);
          padding: 6px 16px;
          border-radius: 40px;
          font-size: 12px;
          color: white;
          margin-bottom: 16px;
        }
        
        .strip-info h2 {
          color: white;
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 6px;
        }
        
        .strip-info p {
          color: rgba(255,255,255,0.85);
          font-size: 13px;
        }
        
        .strip-stats {
          display: flex;
          gap: 16px;
          margin-top: 20px;
          flex-wrap: wrap;
        }
        
        .stat-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.12);
          padding: 6px 14px;
          border-radius: 40px;
          font-size: 12px;
          color: white;
        }
        
        /* ========== البطاقة الرئيسية ========== */
        .profile-card-driver {
          background: rgba(15,15,26,0.95);
          backdrop-filter: blur(10px);
          border-radius: 0 0 28px 28px;
          border: 1px solid rgba(255,255,255,0.05);
          border-top: none;
          overflow: hidden;
        }
        
        .profile-body {
          padding: 0 32px 32px 32px;
        }
        
        /* ========== رأس الملف ========== */
        .profile-header-driver {
          display: flex;
          align-items: center;
          gap: 28px;
          margin-top: -40px;
          margin-bottom: 32px;
          padding: 20px 28px;
          background: rgba(255,255,255,0.04);
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,0.06);
          flex-wrap: wrap;
        }
        
        .avatar-section {
          position: relative;
        }
        
        .avatar-ring {
          position: absolute;
          top: -6px;
          left: -6px;
          right: -6px;
          bottom: -6px;
          border: 2px solid rgba(59,130,246,0.4);
          border-radius: 28px;
          animation: ringPulse 2s infinite;
        }
        
        @keyframes ringPulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.05); opacity: 0.2; }
        }
        
        .avatar-icon {
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, #3b82f6, #1e3a5f);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid #0f0f1a;
          box-shadow: 0 15px 30px -8px rgba(0,0,0,0.4);
        }
        
        .avatar-icon svg {
          color: white;
          width: 50px;
          height: 50px;
        }
        
        .avatar-badge {
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(245,158,11,0.95);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 10px;
          color: white;
          white-space: nowrap;
        }
        
        .info-section {
          flex: 2;
        }
        
        .driver-name {
          color: white;
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 10px;
          letter-spacing: -0.5px;
        }
        
        .tag-group {
          display: flex;
          gap: 10px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }
        
        .tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 14px;
          border-radius: 30px;
          font-size: 12px;
          font-weight: 500;
        }
        
        .tag-driver {
          background: rgba(59,130,246,0.15);
          color: #3b82f6;
          border: 1px solid rgba(59,130,246,0.25);
        }
        
        .tag-pending {
          background: rgba(245,158,11,0.15);
          color: #f59e0b;
          border: 1px solid rgba(245,158,11,0.25);
        }
        
        .rating-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .stars {
          display: flex;
          gap: 3px;
        }
        
        .star {
          color: #4b5563;
        }
        
        .star.filled {
          color: #f59e0b;
          fill: #f59e0b;
        }
        
        .rating-value {
          color: white;
          font-weight: 600;
          font-size: 14px;
        }
        
        .rating-label {
          color: #6b7280;
          font-size: 11px;
        }
        
        .dates-section {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        
        .date-card {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(0,0,0,0.3);
          padding: 10px 16px;
          border-radius: 18px;
        }
        
        .date-card svg {
          color: #3b82f6;
        }
        
        .date-card label {
          display: block;
          font-size: 10px;
          color: #6b7280;
        }
        
        .date-card strong {
          font-size: 13px;
          color: white;
        }
        
        /* ========== العمودين ========== */
        .two-columns-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
          margin-bottom: 32px;
        }
        
        /* ========== البطاقات الداخلية ========== */
        .info-card-driver {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          margin-bottom: 24px;
          overflow: hidden;
          transition: all 0.3s;
        }
        
        .info-card-driver:hover {
          border-color: rgba(59,130,246,0.3);
          transform: translateY(-2px);
        }
        
        .card-title {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 16px 20px;
          background: rgba(255,255,255,0.02);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        
        .card-title svg {
          color: #3b82f6;
        }
        
        .card-title h3 {
          color: white;
          font-size: 15px;
          font-weight: 600;
          margin: 0;
        }
        
        .card-content {
          padding: 16px 20px;
        }
        
        .info-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 0;
          color: #d1d5db;
          font-size: 13px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        
        .info-item:last-child {
          border-bottom: none;
        }
        
        .info-item svg {
          color: #6b7280;
        }
        
        .docs-grid {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .doc-button {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 10px 14px;
          border-radius: 14px;
          color: #e5e7eb;
          cursor: pointer;
          transition: all 0.2s;
          width: 100%;
          font-size: 13px;
        }
        
        .doc-button:hover {
          background: rgba(59,130,246,0.1);
          border-color: rgba(59,130,246,0.3);
        }
        
        .doc-button svg:first-child {
          color: #3b82f6;
        }
        
        .doc-button svg:last-child {
          margin-right: auto;
          opacity: 0.5;
        }
        
        .bio-text-driver {
          color: #d1d5db;
          line-height: 1.7;
          background: rgba(0,0,0,0.25);
          padding: 16px;
          border-radius: 14px;
          margin: 0;
          font-size: 13px;
        }
        
        .detail-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        
        .detail-item:last-child {
          border-bottom: none;
        }
        
        .detail-label {
          color: #9ca3af;
          font-size: 12px;
        }
        
        .detail-value {
          color: white;
          font-weight: 500;
        }
        
        .status-badge-driver {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(245,158,11,0.15);
          padding: 5px 14px;
          border-radius: 30px;
          color: #f59e0b;
          font-size: 12px;
        }
        
        .status-dot-driver {
          width: 8px;
          height: 8px;
          background: #f59e0b;
          border-radius: 50%;
          animation: pulse 1.5s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        
        /* ========== المؤقت ========== */
        .timer-display-driver {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin: 16px 0;
        }
        
        .timer-block {
          text-align: center;
          background: linear-gradient(135deg, rgba(0,0,0,0.3), rgba(59,130,246,0.1));
          padding: 14px 20px;
          border-radius: 18px;
          min-width: 80px;
        }
        
        .timer-number {
          display: block;
          font-size: 32px;
          font-weight: 800;
          color: white;
          font-family: monospace;
          letter-spacing: 2px;
        }
        
        .timer-label {
          display: block;
          font-size: 10px;
          color: #6b7280;
          margin-top: 6px;
        }
        
        .timer-separator {
          color: #3b82f6;
          font-size: 28px;
          font-weight: bold;
        }
        
        .timer-note {
          color: #6b7280;
          font-size: 11px;
          text-align: center;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        
        /* ========== أزرار الإجراءات ========== */
        .action-buttons-driver {
          display: flex;
          gap: 20px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        
        .action-btn {
          flex: 1;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 16px 24px;
          border-radius: 20px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: all 0.3s;
        }
        
        .approve-btn-driver {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          box-shadow: 0 4px 15px rgba(16,185,129,0.3);
        }
        
        .approve-btn-driver:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(16,185,129,0.4);
        }
        
        .reject-btn-driver {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
          box-shadow: 0 4px 15px rgba(239,68,68,0.3);
        }
        
        .reject-btn-driver:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(239,68,68,0.4);
        }
        
        .action-btn:disabled {
          opacity: 0.6;
          transform: none;
          cursor: not-allowed;
        }
        
        .btn-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left 0.5s;
        }
        
        .approve-btn-driver:hover .btn-shine {
          left: 100%;
        }
        
        /* ========== طباعة ========== */
        @media print {
          .action-header, .hero-strip, .action-buttons-driver, .avatar-badge, .avatar-ring {
            display: none;
          }
          .profile-card-driver {
            background: white;
          }
          .info-card-driver {
            break-inside: avoid;
          }
        }
        
        /* ========== استجابة ========== */
        @media (max-width: 1000px) {
          .two-columns-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          
          .profile-header-driver {
            flex-direction: column;
            text-align: center;
          }
          
          .tag-group {
            justify-content: center;
          }
          
          .rating-group {
            justify-content: center;
          }
          
          .dates-section {
            justify-content: center;
          }
          
          .action-buttons-driver {
            flex-direction: column;
          }
          
          .profile-body {
            padding: 0 24px 24px 24px;
          }
          
          .strip-content {
            padding: 20px 24px;
          }
        }
        
        @media (max-width: 600px) {
          .driver-profile-page {
            padding: 16px;
          }
          
          .avatar-icon {
            width: 80px;
            height: 80px;
          }
          
          .avatar-icon svg {
            width: 40px;
            height: 40px;
          }
          
          .driver-name {
            font-size: 22px;
          }
          
          .timer-block {
            padding: 10px 14px;
            min-width: 60px;
          }
          
          .timer-number {
            font-size: 24px;
          }
          
          .timer-separator {
            font-size: 22px;
          }
          
          .strip-stats {
            flex-direction: column;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default DriverProfile;