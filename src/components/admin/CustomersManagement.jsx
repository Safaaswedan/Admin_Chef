import React, { useState, useEffect } from 'react';
import { customersAPI } from '../../api/customersAPI';
import { formatCurrency, formatPhoneNumber } from '../../utils/format';
import LoadingSpinner from '../common/LoadingSpinner';
import { Search, User, ShoppingBag, Calendar, Eye } from 'lucide-react';

const CustomersManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerOrders, setCustomerOrders] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await customersAPI.getAll();
      setCustomers(response.data || response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewOrders = async (customer) => {
    setSelectedCustomer(customer);
    const orders = await customersAPI.getCustomerOrders(customer.id);
    setCustomerOrders(orders);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone?.includes(searchTerm)
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="management-page">
      <div className="page-header">
        <div>
          <h1>إدارة العملاء</h1>
          <p>إدارة عملاء المنصة ومتابعة طلباتهم</p>
        </div>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <Search size={18} />
          <input type="text" placeholder="ابحث عن عميل..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>

      <div className="customers-table-container">
        <table className="customers-table">
          <thead>
            <tr>
              <th>العميل</th>
              <th>البريد الإلكتروني</th>
              <th>رقم الجوال</th>
              <th>المنطقة</th>
              <th>عدد الطلبات</th>
              <th>إجمالي المشتريات</th>
              <th>آخر طلب</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id}>
                <td><div className="customer-name"><User size={14} /> {customer.name}</div></td>
                <td>{customer.email}</td>
                <td>{formatPhoneNumber(customer.phone)}</td>
                <td>{customer.location}</td>
                <td>{customer.totalOrders || 0}</td>
                <td>{formatCurrency(customer.totalSpent || 0)}</td>
                <td>{customer.lastOrderDate || '-'}</td>
                <td><button className="view-btn" onClick={() => handleViewOrders(customer)}><Eye size={16} /> طلبات</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCustomer && (
        <div className="modal-overlay" onClick={() => setSelectedCustomer(null)}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <h2>طلبات {selectedCustomer.name}</h2>
            <table className="orders-table">
              <thead>
                <tr><th>رقم الطلب</th><th>التاريخ</th><th>المبلغ</th><th>الحالة</th></tr>
              </thead>
              <tbody>
                {customerOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.date}</td>
                    <td>{formatCurrency(order.totalAmount)}</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="close-btn" onClick={() => setSelectedCustomer(null)}>إغلاق</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersManagement;
