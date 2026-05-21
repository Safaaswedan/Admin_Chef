import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { requestsAPI } from '../../api/requestsAPI';
import LoadingSpinner from '../common/LoadingSpinner';
import { 
  ChefHat, Mail, Phone, MapPin, Calendar, Clock, 
  FileText, Image, CheckCircle, XCircle,
  Award, Briefcase, User, Shield, AlertCircle,
  ChevronLeft, Printer, ExternalLink, Heart,
  Star
} from 'lucide-react';

const ChefProfile = () => {
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
        name: 'شيف أحمد',
        email: 'ahmed.chef@example.com',
        phone: '+966512345700',
        location: 'الرياض - حي النخيل',
        specialty: 'مطبخ سوري',
        experience: '8 سنوات',
        bio: 'خبرة كبيرة في المطبخ السوري والحلويات الشرقية. أتقن تحضير المندي والمضغوط والكنافة.',
        previousWork: 'مطعم ألف ليلة وليلة',
        submittedAt: '2025-05-10T08:30:00',
        status: 'pending'
      };
      
      try {
        const data = await requestsAPI.getChefRequestById(id);
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
    if (window.confirm(`✅ قبول الطلب\n\nهل أنت متأكد من قبول طلب ${request?.name}؟`)) {
      setActionLoading(true);
      try {
        await requestsAPI.approveChefRequest(request.id);
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
        await requestsAPI.rejectChefRequest(request.id, reason);
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
    <div className="chef-profile-page">
      <div className="profile-container">
        {/* شريط الإجراءات العلوي */}
        <div className="action-bar">
          <button className="back-button" onClick={() => navigate('/admin/requests')}>
            <ChevronLeft size={18} />
            <span>رجوع إلى الطلبات</span>
          </button>
          <button className="print-button" onClick={handlePrint}>
            <Printer size={16} />
            <span>طباعة الملف</span>
          </button>
        </div>

        {/* البطاقة الرئيسية */}
        <div className="profile-card">
          {/* الشريط البرتقالي */}
          <div className="orange-bar">
            <div className="orange-bar-content">
              <div className="orange-badge">✨ طلب اشتراك جديد</div>
              <div className="orange-title">
                <h2>مراجعة ملف الطاهي</h2>
                <p>قيد المراجعة • يحتاج إلى اتخاذ قرار</p>
              </div>
              <div className="orange-stats">
                <span className="orange-stat">
                  <FileText size={12} /> رقم الطلب: #CHF-{String(request.id).padStart(4, '0')}
                </span>
                <span className="orange-stat">
                  <Clock size={12} /> مدة المراجعة: 3 أيام متبقية
                </span>
              </div>
            </div>
          </div>

          {/* المحتوى */}
          <div className="profile-content">
            {/* رأس الملف */}
            <div className="profile-head">
              <div className="profile-avatar">
                <ChefHat size={48} />
              </div>
              <div className="profile-head-info">
                <h1>{request.name}</h1>
                <div className="profile-tags">
                  <span className="tag-green">👨‍🍳 طاهي محترف</span>
                  <span className="tag-orange">⏳ قيد المراجعة</span>
                </div>
                <div className="profile-rating">
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                  <Star size={14} fill="#4b5563" color="#4b5563" />
                  <span>4.8</span>
                </div>
              </div>
              <div className="profile-dates">
                <div className="date-chip">
                  <Calendar size={14} />
                  <div>
                    <small>تاريخ التقديم</small>
                    <strong>{new Date(request.submittedAt).toLocaleDateString('ar-EG')}</strong>
                  </div>
                </div>
                <div className="date-chip">
                  <Clock size={14} />
                  <div>
                    <small>وقت التقديم</small>
                    <strong>{new Date(request.submittedAt).toLocaleTimeString('ar-EG')}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* العمودين - هذا هو الجزء المهم */}
            <div className="two-columns">
              
              {/* العمود الأيمن */}
              <div className="column-right">
                <div className="info-block">
                  <h3><User size={16} /> معلومات الاتصال</h3>
                  <div className="info-line">
                    <Mail size={14} />
                    <span>{request.email}</span>
                  </div>
                  <div className="info-line">
                    <Phone size={14} />
                    <span>{request.phone}</span>
                  </div>
                  <div className="info-line">
                    <MapPin size={14} />
                    <span>{request.location}</span>
                  </div>
                </div>

                <div className="info-block">
                  <h3><Award size={16} /> المعلومات المهنية</h3>
                  <div className="info-line">
                    <ChefHat size={14} />
                    <span><strong>التخصص:</strong> {request.specialty}</span>
                  </div>
                  <div className="info-line">
                    <Clock size={14} />
                    <span><strong>الخبرة:</strong> {request.experience}</span>
                  </div>
                  <div className="info-line">
                    <Briefcase size={14} />
                    <span><strong>الأعمال السابقة:</strong> {request.previousWork}</span>
                  </div>
                </div>

                <div className="info-block">
                  <h3><FileText size={16} /> المستندات</h3>
                  <div className="docs-list">
                    <button className="doc-button">📄 بطاقة الهوية</button>
                    <button className="doc-button">🛡️ شهادة صحية</button>
                    <button className="doc-button">📷 صور المطبخ</button>
                  </div>
                </div>
              </div>

              {/* العمود الأيسر - السيرة الذاتية وتفاصيل الطلب */}
              <div className="column-left">
                <div className="info-block bio-block">
                  <h3><Heart size={16} /> السيرة الذاتية</h3>
                  <p className="bio-text">{request.bio}</p>
                </div>

                <div className="info-block">
                  <h3><AlertCircle size={16} /> تفاصيل الطلب</h3>
                  <div className="detail-line">
                    <span>رقم الطلب:</span>
                    <strong>#CHF-{String(request.id).padStart(4, '0')}</strong>
                  </div>
                  <div className="detail-line">
                    <span>حالة الطلب:</span>
                    <span className="status-badge">
                      <span className="dot"></span> في انتظار المراجعة
                    </span>
                  </div>
                  <div className="detail-line">
                    <span>تاريخ التقديم:</span>
                    <span>{new Date(request.submittedAt).toLocaleDateString('ar-EG')}</span>
                  </div>
                </div>

                <div className="info-block timer-block">
                  <h3><Clock size={16} /> الوقت المتبقي</h3>
                  <div className="timer">
                    <div className="timer-item">
                      <span>02</span>
                      <small>يوم</small>
                    </div>
                    <span className="timer-dot">:</span>
                    <div className="timer-item">
                      <span>14</span>
                      <small>ساعة</small>
                    </div>
                    <span className="timer-dot">:</span>
                    <div className="timer-item">
                      <span>35</span>
                      <small>دقيقة</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* الأزرار */}
            <div className="action-buttons">
              <button className="btn-success" onClick={handleApprove} disabled={actionLoading}>
                <CheckCircle size={18} />
                {actionLoading ? 'جاري المعالجة...' : 'قبول الطلب'}
              </button>
              <button className="btn-danger" onClick={handleReject} disabled={actionLoading}>
                <XCircle size={18} />
                {actionLoading ? 'جاري المعالجة...' : 'رفض الطلب'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* الصفحة الرئيسية */
        .chef-profile-page {
          min-height: 100vh;
          background: #0a0a0f;
          padding: 24px;
          direction: rtl;
        }
        
        .profile-container {
          max-width: 1300px;
          margin: 0 auto;
        }
        
        /* شريط الإجراءات */
        .action-bar {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        
        .back-button, .print-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 8px 18px;
          border-radius: 40px;
          color: #e5e7eb;
          cursor: pointer;
        }
        
        /* الشريط البرتقالي */
        .orange-bar {
          background: linear-gradient(135deg, #f59e0b, #ea580c);
          padding: 20px 28px;
        }
        
        .orange-bar-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        
        .orange-badge {
          background: rgba(255,255,255,0.2);
          padding: 4px 12px;
          border-radius: 30px;
          font-size: 12px;
          color: white;
          width: fit-content;
        }
        
        .orange-title h2 {
          color: white;
          font-size: 18px;
          margin-bottom: 4px;
        }
        
        .orange-title p {
          color: rgba(255,255,255,0.8);
          font-size: 12px;
        }
        
        .orange-stats {
          display: flex;
          gap: 12px;
        }
        
        .orange-stat {
          background: rgba(255,255,255,0.15);
          padding: 5px 12px;
          border-radius: 30px;
          font-size: 11px;
          color: white;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        /* البطاقة */
        .profile-card {
          background: rgba(15,15,26,0.95);
          border-radius: 0 0 28px 28px;
          overflow: hidden;
        }
        
        .profile-content {
          padding: 24px 28px 28px;
        }
        
        /* رأس الملف */
        .profile-head {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 32px;
          padding: 16px 20px;
          background: rgba(255,255,255,0.03);
          border-radius: 20px;
          flex-wrap: wrap;
        }
        
        .profile-avatar {
          width: 85px;
          height: 85px;
          background: linear-gradient(135deg, #f59e0b, #ea580c);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid #0f0f1a;
        }
        
        .profile-avatar svg {
          color: white;
          width: 42px;
          height: 42px;
        }
        
        .profile-head-info {
          flex: 2;
        }
        
        .profile-head-info h1 {
          color: white;
          font-size: 22px;
          margin-bottom: 8px;
        }
        
        .profile-tags {
          display: flex;
          gap: 10px;
          margin-bottom: 8px;
        }
        
        .tag-green {
          background: rgba(16,185,129,0.15);
          color: #10b981;
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 11px;
        }
        
        .tag-orange {
          background: rgba(245,158,11,0.15);
          color: #f59e0b;
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 11px;
        }
        
        .profile-rating {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .profile-rating span {
          color: #e5e7eb;
          font-size: 12px;
          margin-right: 6px;
        }
        
        .profile-dates {
          display: flex;
          gap: 12px;
        }
        
        .date-chip {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(0,0,0,0.3);
          padding: 8px 14px;
          border-radius: 14px;
        }
        
        .date-chip svg {
          color: #f59e0b;
        }
        
        .date-chip small {
          font-size: 10px;
          color: #6b7280;
          display: block;
        }
        
        .date-chip strong {
          font-size: 12px;
          color: white;
        }
        
        /* ========== العمودين ========== */
        .two-columns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 32px;
        }
        
        /* البطاقات */
        .info-block {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 18px;
          padding: 18px;
          margin-bottom: 20px;
        }
        
        .info-block h3 {
          color: #f59e0b;
          font-size: 14px;
          margin-bottom: 14px;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .info-line {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 0;
          color: #d1d5db;
          font-size: 13px;
          border-bottom: 1px solid rgba(255,255,255,0.03);
        }
        
        .info-line:last-child {
          border-bottom: none;
        }
        
        .docs-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .doc-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 8px 12px;
          border-radius: 12px;
          color: #e5e7eb;
          cursor: pointer;
          font-size: 12px;
        }
        
        .doc-button:hover {
          background: rgba(245,158,11,0.1);
        }
        
        .bio-text {
          color: #d1d5db;
          line-height: 1.6;
          background: rgba(0,0,0,0.2);
          padding: 14px;
          border-radius: 12px;
          margin: 0;
          font-size: 13px;
        }
        
        .detail-line {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid rgba(255,255,255,0.03);
        }
        
        .detail-line:last-child {
          border-bottom: none;
        }
        
        .detail-line span:first-child {
          color: #9ca3af;
          font-size: 12px;
        }
        
        .detail-line strong {
          color: white;
          font-size: 13px;
        }
        
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(245,158,11,0.15);
          padding: 3px 10px;
          border-radius: 20px;
          color: #f59e0b;
          font-size: 11px;
        }
        
        .dot {
          width: 6px;
          height: 6px;
          background: #f59e0b;
          border-radius: 50%;
          animation: blink 1.5s infinite;
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        
        /* المؤقت */
        .timer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }
        
        .timer-item {
          text-align: center;
          background: rgba(0,0,0,0.3);
          padding: 10px 16px;
          border-radius: 14px;
        }
        
        .timer-item span {
          display: block;
          font-size: 24px;
          font-weight: bold;
          color: white;
          font-family: monospace;
        }
        
        .timer-item small {
          font-size: 10px;
          color: #6b7280;
        }
        
        .timer-dot {
          color: #f59e0b;
          font-size: 22px;
          font-weight: bold;
        }
        
        /* الأزرار */
        .action-buttons {
          display: flex;
          gap: 16px;
          padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        
        .btn-success, .btn-danger {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          border: none;
        }
        
        .btn-success {
          background: #10b981;
          color: white;
        }
        
        .btn-danger {
          background: #ef4444;
          color: white;
        }
        
        .btn-success:hover, .btn-danger:hover {
          transform: translateY(-2px);
        }
        
        /* استجابة */
        @media (max-width: 900px) {
          .two-columns {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          
          .profile-head {
            flex-direction: column;
            text-align: center;
          }
          
          .profile-tags {
            justify-content: center;
          }
          
          .profile-rating {
            justify-content: center;
          }
          
          .profile-dates {
            justify-content: center;
          }
          
          .action-buttons {
            flex-direction: column;
          }
          
          .orange-bar-content {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .orange-stats {
            flex-wrap: wrap;
          }
        }
        
        @media (max-width: 550px) {
          .profile-avatar {
            width: 70px;
            height: 70px;
          }
          
          .profile-avatar svg {
            width: 34px;
            height: 34px;
          }
          
          .profile-head-info h1 {
            font-size: 20px;
          }
          
          .timer-item {
            padding: 6px 12px;
          }
          
          .timer-item span {
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
};

export default ChefProfile;