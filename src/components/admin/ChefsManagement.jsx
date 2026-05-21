import React, { useState, useEffect } from 'react';
import { chefsAPI } from '../../api/chefsAPI';
import { formatCurrency, formatPhoneNumber, getStatusText, getStatusColor } from '../../utils/format';
import LoadingSpinner from '../common/LoadingSpinner';
import { Plus, Edit2, Trash2, Search, Filter, Eye, Star, CheckCircle, XCircle, Clock } from 'lucide-react';

const ChefsManagement = () => {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingChef, setEditingChef] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', specialty: '', bio: '' });

  useEffect(() => {
    fetchChefs();
  }, [statusFilter]);

  const fetchChefs = async () => {
    try {
      setLoading(true);
      const response = await chefsAPI.getAll({ status: statusFilter });
      setChefs(response.data || response);
    } catch (error) {
      console.error('Error fetching chefs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الشيف؟')) {
      await chefsAPI.delete(id);
      fetchChefs();
    }
  };

  const handleStatusChange = async (id, status) => {
    await chefsAPI.updateStatus(id, status);
    fetchChefs();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingChef) {
      await chefsAPI.update(editingChef.id, formData);
    } else {
      await chefsAPI.create(formData);
    }
    setShowModal(false);
    setEditingChef(null);
    setFormData({ name: '', email: '', phone: '', specialty: '', bio: '' });
    fetchChefs();
  };

  const filteredChefs = chefs.filter(chef =>
    chef.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chef.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="management-page">
      <div className="page-header">
        <div>
          <h1>إدارة الطهاة</h1>
          <p>إدارة الطهاة المنزليين على المنصة</p>
        </div>
        <button className="btn-primary" onClick={() => { setEditingChef(null); setFormData({ name: '', email: '', phone: '', specialty: '', bio: '' }); setShowModal(true); }}>
          <Plus size={18} /> إضافة شيف جديد
        </button>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <Search size={18} />
          <input type="text" placeholder="ابحث عن شيف..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="status-filters">
          <button className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`} onClick={() => setStatusFilter('all')}>الكل</button>
          <button className={`filter-btn ${statusFilter === 'active' ? 'active' : ''}`} onClick={() => setStatusFilter('active')}>نشط</button>
          <button className={`filter-btn ${statusFilter === 'inactive' ? 'active' : ''}`} onClick={() => setStatusFilter('inactive')}>غير نشط</button>
          <button className={`filter-btn ${statusFilter === 'pending' ? 'active' : ''}`} onClick={() => setStatusFilter('pending')}>قيد المراجعة</button>
        </div>
      </div>

      <div className="chefs-grid">
        {filteredChefs.map((chef) => (
          <div key={chef.id} className="chef-card">
            <div className="chef-card-header">
              <div className="chef-avatar">{chef.avatar || chef.name[0]}</div>
              <div className="chef-actions">
                <button className="icon-btn edit" onClick={() => { setEditingChef(chef); setFormData(chef); setShowModal(true); }}><Edit2 size={16} /></button>
                <button className="icon-btn delete" onClick={() => handleDelete(chef.id)}><Trash2 size={16} /></button>
              </div>
            </div>
            <h3 className="chef-name">{chef.name}</h3>
            <p className="chef-specialty">{chef.specialty}</p>
            <div className="chef-stats">
              <span><Star size={14} /> {chef.rating || 'جديد'}</span>
              <span>📦 {chef.totalOrders || 0} طلب</span>
              <span>💰 {formatCurrency(chef.revenue || 0)}</span>
            </div>
            <div className="chef-contact">
              <p>📞 {formatPhoneNumber(chef.phone)}</p>
              <p>📧 {chef.email}</p>
            </div>
            <div className="chef-status">
              <select value={chef.status} onChange={(e) => handleStatusChange(chef.id, e.target.value)} style={{ color: getStatusColor(chef.status), borderColor: getStatusColor(chef.status) }}>
                <option value="active">نشط</option>
                <option value="inactive">غير نشط</option>
                <option value="pending">قيد المراجعة</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{editingChef ? 'تعديل شيف' : 'إضافة شيف جديد'}</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="الاسم" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              <input type="email" placeholder="البريد الإلكتروني" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
              <input type="tel" placeholder="رقم الجوال" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
              <input type="text" placeholder="التخصص" value={formData.specialty} onChange={(e) => setFormData({ ...formData, specialty: e.target.value })} required />
              <textarea placeholder="نبذة عن الشيف" value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} rows="3" />
              <div className="modal-buttons">
                <button type="button" onClick={() => setShowModal(false)}>إلغاء</button>
                <button type="submit">حفظ</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChefsManagement;