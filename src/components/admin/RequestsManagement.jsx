import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { requestsAPI } from '../../api/requestsAPI';
import LoadingSpinner from '../common/LoadingSpinner';

import { 
  UserCheck, Eye, CheckCircle, XCircle, 
  Clock, Mail, Phone, MapPin, FileText,
  ChefHat, Truck, Car, Calendar, Search
} from 'lucide-react';

const RequestsManagement = () => {
  const [activeTab, setActiveTab] = useState('chefs');
  const [chefRequests, setChefRequests] = useState([]);
  const [driverRequests, setDriverRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [stats, setStats] = useState({ pendingChefs: 0, pendingDrivers: 0 });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [chefs, drivers, statsData] = await Promise.all([
        requestsAPI.getPendingChefRequests(),
        requestsAPI.getPendingDriverRequests(),
        requestsAPI.getRequestsStats()
      ]);
      setChefRequests(chefs || []);
      setDriverRequests(drivers || []);
      setStats(statsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (request, type) => {
    if (window.confirm(`هل أنت متأكد من قبول طلب ${request.name}؟`)) {
      try {
        if (type === 'chef') {
          await requestsAPI.approveChefRequest(request.id);
        } else {
          await requestsAPI.approveDriverRequest(request.id);
        }
        fetchData();
      } catch (err) {
        alert('حدث خطأ: ' + err.message);
      }
    }
  };

  const handleRejectSubmit = async () => {
    if (!rejectReason.trim()) {
      alert('الرجاء كتابة سبب الرفض');
      return;
    }
    
    try {
      if (activeTab === 'chefs') {
        await requestsAPI.rejectChefRequest(selectedRequest.id, rejectReason);
      } else {
        await requestsAPI.rejectDriverRequest(selectedRequest.id, rejectReason);
      }
      fetchData();
      setRejectModalOpen(false);
      setSelectedRequest(null);
      setRejectReason('');
    } catch (err) {
      alert('حدث خطأ: ' + err.message);
    }
  };

  const openRejectModal = (request) => {
    setSelectedRequest(request);
    setRejectModalOpen(true);
  };

  const filterRequests = (requests) => {
    if (!searchTerm) return requests;
    return requests.filter(r => 
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.phone.includes(searchTerm)
    );
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-container">{error}</div>;

  const currentRequests = activeTab === 'chefs' ? chefRequests : driverRequests;
  const filteredRequests = filterRequests(currentRequests);

  return (
    <div className="requests-page">
      {/* الهيدر */}
      <div className="page-header">
        <div>
          <h1>طلبات الاشتراك</h1>
          <p>مراجعة وقبول طلبات انضمام الطهاة والسائقين</p>
        </div>
        <div className="stats-badges">
          <div className="stat-badge chefs">
            <ChefHat size={16} />
            <span>طلبات الطهاة: {stats.pendingChefs}</span>
          </div>
          <div className="stat-badge drivers">
            <Truck size={16} />
            <span>طلبات السائقين: {stats.pendingDrivers}</span>
          </div>
        </div>
      </div>

      {/* تبويبات */}
      <div className="requests-tabs">
        <button 
          className={`tab-btn ${activeTab === 'chefs' ? 'active' : ''}`}
          onClick={() => setActiveTab('chefs')}
        >
          <ChefHat size={18} />
          <span>طلبات الطهاة</span>
          {stats.pendingChefs > 0 && <span className="badge">{stats.pendingChefs}</span>}
        </button>
        <button 
          className={`tab-btn ${activeTab === 'drivers' ? 'active' : ''}`}
          onClick={() => setActiveTab('drivers')}
        >
          <Truck size={18} />
          <span>طلبات السائقين</span>
          {stats.pendingDrivers > 0 && <span className="badge">{stats.pendingDrivers}</span>}
        </button>
      </div>

      {/* شريط البحث */}
      <div className="search-bar-requests">
        <Search size={18} />
        <input 
          type="text" 
          placeholder={`البحث في طلبات ${activeTab === 'chefs' ? 'الطهاة' : 'السائقين'}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="results-count">{filteredRequests.length} طلب</span>
      </div>

      {/* قائمة الطلبات */}
      <div className="requests-list">
        {filteredRequests.length === 0 ? (
          <div className="empty-requests">
            <UserCheck size={48} />
            <p>لا توجد طلبات {activeTab === 'chefs' ? 'طهاة' : 'سائقين'} قيد المراجعة</p>
          </div>
        ) : (
          filteredRequests.map((request) => (
            <div key={request.id} className="request-card">
              <div className="request-card-header">
                <div className="request-avatar">
                  {activeTab === 'chefs' ? <ChefHat size={24} /> : <Truck size={24} />}
                </div>
                <div className="request-basic-info">
                  <h3>{request.name}</h3>
                  <div className="request-meta">
                    <span><Mail size={12} /> {request.email}</span>
                    <span><Phone size={12} /> {request.phone}</span>
                    {activeTab === 'chefs' && (
                      <span><ChefHat size={12} /> {request.specialty}</span>
                    )}
                    {activeTab === 'drivers' && (
                      <span><Car size={12} /> {request.vehicleModel}</span>
                    )}
                  </div>
                </div>
                <div className="request-date">
                  <Calendar size={12} />
                  <span>{new Date(request.submittedAt).toLocaleDateString('ar-EG')}</span>
                </div>
              </div>

              <div className="request-card-details">
                <div className="detail-item">
                  <MapPin size={14} />
                  <span>{request.location}</span>
                </div>
                {activeTab === 'chefs' && (
                  <>
                    <div className="detail-item">
                      <Clock size={14} />
                      <span>الخبرة: {request.experience}</span>
                    </div>
                    <div className="detail-item">
                      <FileText size={14} />
                      <span>{request.previousWork || 'لا يوجد أعمال سابقة'}</span>
                    </div>
                  </>
                )}
                {activeTab === 'drivers' && (
                  <>
                    <div className="detail-item">
                      <Car size={14} />
                      <span>{request.vehicleType} - {request.vehicleModel}</span>
                    </div>
                    <div className="detail-item">
                      <FileText size={14} />
                      <span>رخصة: {request.licenseNumber}</span>
                    </div>
                    <div className="detail-item">
                      <span>🚘 اللوحة: {request.plateNumber}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="request-card-bio">
                <p>{request.bio}</p>
              </div>

              <div className="request-card-actions">
                {/* رابط لعرض الملف الكامل في صفحة منفصلة */}
                <NavLink 
                  to={activeTab === 'chefs' 
                    ? `/admin/requests/chef/${request.id}` 
                    : `/admin/requests/driver/${request.id}`
                  } 
                  className="btn-view"
                >
                  <Eye size={16} />
                  <span>عرض الملف الكامل</span>
                </NavLink>
                <button className="btn-approve" onClick={() => handleApprove(request, activeTab)}>
                  <CheckCircle size={16} />
                  <span>قبول</span>
                </button>
                <button className="btn-reject" onClick={() => openRejectModal(request)}>
                  <XCircle size={16} />
                  <span>رفض</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* مودال رفض الطلب */}
      {rejectModalOpen && selectedRequest && (
        <div className="modal-overlay" onClick={() => {
          setRejectModalOpen(false);
          setSelectedRequest(null);
          setRejectReason('');
        }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>رفض طلب {selectedRequest.name}</h2>
            <div className="reject-form">
              <label>سبب الرفض:</label>
              <textarea
                rows="4"
                placeholder="اكتب سبب رفض الطلب..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
              <div className="modal-buttons">
                <button className="btn-cancel" onClick={() => {
                  setRejectModalOpen(false);
                  setSelectedRequest(null);
                  setRejectReason('');
                }}>إلغاء</button>
                <button className="btn-confirm-reject" onClick={handleRejectSubmit}>تأكيد الرفض</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .requests-page { padding: 24px; }
        
        .stats-badges { display: flex; gap: 12px; }
        .stat-badge { display: flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 40px; font-size: 13px; }
        .stat-badge.chefs { background: rgba(245,158,11,0.15); color: #f59e0b; }
        .stat-badge.drivers { background: rgba(59,130,246,0.15); color: #3b82f6; }
        
        .requests-tabs { display: flex; gap: 12px; margin-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 12px; }
        .tab-btn { display: flex; align-items: center; gap: 8px; padding: 10px 20px; background: transparent; border: none; border-radius: 12px; color: #9ca3af; cursor: pointer; transition: all 0.3s; }
        .tab-btn.active { background: rgba(245,158,11,0.15); color: #f59e0b; }
        .tab-btn .badge { background: #ef4444; color: white; font-size: 10px; padding: 2px 6px; border-radius: 10px; margin-right: 4px; }
        
        .search-bar-requests { display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.05); border-radius: 14px; padding: 12px 16px; margin-bottom: 24px; }
        .search-bar-requests input { flex: 1; background: transparent; border: none; color: white; outline: none; }
        .results-count { color: #6b7280; font-size: 13px; }
        
        .requests-list { display: flex; flex-direction: column; gap: 16px; }
        .request-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 20px; transition: all 0.3s; }
        .request-card:hover { background: rgba(255,255,255,0.06); transform: translateY(-2px); }
        
        .request-card-header { display: flex; gap: 16px; margin-bottom: 16px; flex-wrap: wrap; }
        .request-avatar { width: 56px; height: 56px; background: linear-gradient(135deg, #f59e0b, #ea580c); border-radius: 16px; display: flex; align-items: center; justify-content: center; color: white; }
        .request-basic-info { flex: 1; }
        .request-basic-info h3 { color: white; font-size: 18px; margin-bottom: 8px; }
        .request-meta { display: flex; flex-wrap: wrap; gap: 16px; color: #9ca3af; font-size: 12px; }
        .request-meta span { display: flex; align-items: center; gap: 4px; }
        .request-date { display: flex; align-items: center; gap: 6px; color: #6b7280; font-size: 12px; }
        
        .request-card-details { display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 12px; padding: 12px; background: rgba(0,0,0,0.2); border-radius: 12px; }
        .detail-item { display: flex; align-items: center; gap: 6px; color: #9ca3af; font-size: 13px; }
        
        .request-card-bio { padding: 12px 0; border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05); margin-bottom: 16px; }
        .request-card-bio p { color: #d1d5db; font-size: 13px; line-height: 1.5; }
        
        .request-card-actions { display: flex; gap: 12px; justify-content: flex-end; flex-wrap: wrap; }
        .btn-view, .btn-approve, .btn-reject { display: flex; align-items: center; gap: 8px; padding: 8px 20px; border-radius: 12px; font-size: 13px; cursor: pointer; transition: all 0.3s; text-decoration: none; }
        .btn-view { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #e5e7eb; }
        .btn-approve { background: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.3); color: #10b981; }
        .btn-reject { background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.3); color: #ef4444; }
        .btn-view:hover { background: rgba(255,255,255,0.1); }
        .btn-approve:hover { background: rgba(16,185,129,0.25); transform: scale(1.02); }
        .btn-reject:hover { background: rgba(239,68,68,0.25); transform: scale(1.02); }
        
        .empty-requests { text-align: center; padding: 60px; color: #6b7280; }
        .empty-requests svg { margin-bottom: 16px; opacity: 0.5; }
        
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }
        
        .modal-content {
          background: #1f2937;
          border-radius: 24px;
          padding: 32px;
          width: 500px;
          max-width: 90%;
        }
        
        .modal-content h2 {
          color: white;
          margin-bottom: 24px;
        }
        
        .reject-form { display: flex; flex-direction: column; gap: 16px; }
        .reject-form label { color: #9ca3af; font-size: 14px; }
        .reject-form textarea { width: 100%; padding: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; color: white; resize: vertical; font-family: inherit; }
        
        .modal-buttons { display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px; }
        .btn-cancel { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 10px 20px; border-radius: 10px; color: #9ca3af; cursor: pointer; }
        .btn-confirm-reject { background: #ef4444; border: none; padding: 10px 20px; border-radius: 10px; color: white; cursor: pointer; }
        
        @media (max-width: 768px) {
          .requests-page { padding: 16px; }
          .request-card-header { flex-direction: column; }
          .request-meta { flex-direction: column; gap: 8px; }
          .request-card-actions { flex-wrap: wrap; }
          .stats-badges { flex-wrap: wrap; }
          .modal-content { width: 90%; padding: 20px; }
        }
      `}</style>
    </div>
  );
};

export default RequestsManagement;