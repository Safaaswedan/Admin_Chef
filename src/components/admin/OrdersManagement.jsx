import React, { useState, useEffect } from 'react';
import { ordersAPI } from '../../api/ordersAPI';
import { driversAPI } from '../../api/driversAPI';
import { formatCurrency, formatDateTime, getStatusText, getStatusColor } from '../../utils/format';
import LoadingSpinner from '../common/LoadingSpinner';
import { Search, Filter, Eye, Truck, CheckCircle, Clock, XCircle } from 'lucide-react';

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchData();
  }, [statusFilter]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [ordersRes, driversRes] = await Promise.all([
        ordersAPI.getAll({ status: statusFilter }),
        driversAPI.getAll({ status: 'active' })
      ]);
      setOrders(ordersRes.data || ordersRes);
      setDrivers(driversRes.data || driversRes);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, status) => {
    await ordersAPI.updateStatus(orderId, status);
    fetchData();
  };

  const handleAssignDriver = async (orderId, driverId) => {
    await ordersAPI.assignDriver(orderId, driverId);
    fetchData();
  };

  const filteredOrders = orders.filter(order =>
    order.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="management-page">
      <div className="page-header">
        <div>
          <h1>إدارة الطلبات</h1>
          <p>متابعة وإدارة جميع طلبات المنصة</p>
        </div>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <Search size={18} />
          <input type="text" placeholder="ابحث عن طلب..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="status-filters">
          <button className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`} onClick={() => setStatusFilter('all')}>الكل</button>
          <button className={`filter-btn ${statusFilter === 'pending' ? 'active' : ''}`} onClick={() => setStatusFilter('pending')}>قيد الانتظار</button>
          <button className={`filter-btn ${statusFilter === 'delivering' ? 'active' : ''}`} onClick={() => setStatusFilter('delivering')}>جاري التوصيل</button>
          <button className={`filter-btn ${statusFilter === 'completed' ? 'active' : ''}`} onClick={() => setStatusFilter('completed')}>مكتمل</button>
          <button className={`filter-btn ${statusFilter === 'cancelled' ? 'active' : ''}`} onClick={() => setStatusFilter('cancelled')}>ملغي</button>
        </div>
      </div>

      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>رقم الطلب</th>
              <th>العميل</th>
              <th>الشيف</th>
              <th>السائق</th>
              <th>المبلغ</th>
              <th>التاريخ</th>
              <th>الحالة</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="order-id">{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.chef}</td>
                <td>
                  {order.driver || (
                    <select onChange={(e) => handleAssignDriver(order.id, e.target.value)} defaultValue="">
                      <option value="">تعيين سائق</option>
                      {drivers.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                    </select>
                  )}
                </td>
                <td className="order-amount">{formatCurrency(order.totalAmount)}</td>
                <td>{order.date}</td>
                <td>
                  <select value={order.status} onChange={(e) => handleStatusUpdate(order.id, e.target.value)} style={{ color: getStatusColor(order.status), borderColor: getStatusColor(order.status) }}>
                    <option value="pending">قيد الانتظار</option>
                    <option value="delivering">جاري التوصيل</option>
                    <option value="completed">مكتمل</option>
                    <option value="cancelled">ملغي</option>
                  </select>
                </td>
                <td>
                  <button className="view-btn" onClick={() => setSelectedOrder(order)}><Eye size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <h2>تفاصيل الطلب {selectedOrder.id}</h2>
            <div className="order-details">
              <p><strong>العميل:</strong> {selectedOrder.customer} ({selectedOrder.customerPhone})</p>
              <p><strong>الشيف:</strong> {selectedOrder.chef}</p>
              <p><strong>السائق:</strong> {selectedOrder.driver || 'لم يعين بعد'}</p>
              <p><strong>عنوان التوصيل:</strong> {selectedOrder.deliveryAddress}</p>
              <p><strong>تاريخ الطلب:</strong> {formatDateTime(selectedOrder.date, selectedOrder.time)}</p>
              <p><strong>طريقة الدفع:</strong> {selectedOrder.paymentMethod}</p>
              <h3>الأطباق المطلوبة:</h3>
              <ul>
                {selectedOrder.items?.map((item, i) => (
                  <li key={i}>{item.name} x {item.quantity} = {formatCurrency(item.price * item.quantity)}</li>
                ))}
              </ul>
              <p><strong>المجموع:</strong> {formatCurrency(selectedOrder.totalAmount)}</p>
            </div>
            <button className="close-btn" onClick={() => setSelectedOrder(null)}>إغلاق</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersManagement;