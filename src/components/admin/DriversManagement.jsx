import React, { useState, useEffect } from 'react';
import { driversAPI } from '../../api/driversAPI';
import { formatPhoneNumber, getStatusText } from '../../utils/format';
import LoadingSpinner from '../common/LoadingSpinner';
import { Plus, Edit2, Trash2, Search, Truck, MapPin, Star, CheckCircle } from 'lucide-react';

const DriversManagement = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', location: '', vehicleType: '', vehicleModel: '', plateNumber: '' });

  useEffect(() => {
    fetchDrivers();
  }, [statusFilter]);

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const response = await driversAPI.getAll({ status: statusFilter });
      setDrivers(response.data || response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا السائق؟')) {
      await driversAPI.delete(id);
      fetchDrivers();
    }
  };

  const handleStatusChange = async (id, status) => {
    await driversAPI.updateStatus(id, status);
    fetchDrivers();
  };

  const filteredDrivers = drivers.filter(driver =>
    driver.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="management-page">
      <div className="page-header">
        <div>
          <h1>إدارة السائقين</h1>
          <p>إدارة سائقي التوصيل على المنصة</p>
        </div>
        <button className="btn-primary" onClick={() => { setEditingDriver(null); setFormData({}); setShowModal(true); }}>
          <Plus size={18} /> إضافة سائق جديد
        </button>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <Search size={18} />
          <input type="text" placeholder="ابحث عن سائق..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="status-filters">
          <button className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`} onClick={() => setStatusFilter('all')}>الكل</button>
          <button className={`filter-btn ${statusFilter === 'active' ? 'active' : ''}`} onClick={() => setStatusFilter('active')}>نشط</button>
          <button className={`filter-btn ${statusFilter === 'inactive' ? 'active' : ''}`} onClick={() => setStatusFilter('inactive')}>غير نشط</button>
          <button className={`filter-btn ${statusFilter === 'pending' ? 'active' : ''}`} onClick={() => setStatusFilter('pending')}>قيد المراجعة</button>
        </div>
      </div>

      <div className="drivers-grid">
        {filteredDrivers.map((driver) => (
          <div key={driver.id} className="driver-card">
            <div className="driver-card-header">
              <div className="driver-avatar">{driver.avatar || driver.name[0]}</div>
              <div className="driver-actions">
                <button className="icon-btn edit"><Edit2 size={16} /></button>
                <button className="icon-btn delete" onClick={() => handleDelete(driver.id)}><Trash2 size={16} /></button>
              </div>
            </div>
            <h3 className="driver-name">{driver.name}</h3>
            <div className="driver-stats">
              <span><Star size={14} /> {driver.rating || 'جديد'}</span>
              <span><Truck size={14} /> {driver.totalDeliveries || 0} توصيلة</span>
            </div>
            <div className="driver-info">
              <p><MapPin size={14} /> {driver.location}</p>
              <p>📞 {formatPhoneNumber(driver.phone)}</p>
              <p>🚗 {driver.vehicleType} - {driver.vehicleModel}</p>
              <p>🚘 اللوحة: {driver.plateNumber}</p>
            </div>
            <div className="driver-status">
              <select value={driver.status} onChange={(e) => handleStatusChange(driver.id, e.target.value)}>
                <option value="active">نشط</option>
                <option value="inactive">غير نشط</option>
                <option value="pending">قيد المراجعة</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriversManagement;