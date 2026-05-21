export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
};

export const formatDateTime = (dateString, timeString) => {
  if (!dateString) return '';
  return `${formatDate(dateString)} ${timeString || ''}`;
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('ar-SA', { style: 'currency', currency: 'SAR' }).format(amount);
};

export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  return phone.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3');
};

export const getStatusColor = (status) => {
  const colors = {
    active: '#10b981',
    inactive: '#6b7280',
    pending: '#f59e0b',
    completed: '#10b981',
    delivering: '#3b82f6',
    cancelled: '#ef4444',
  };
  return colors[status] || '#6b7280';
};

export const getStatusText = (status) => {
  const texts = {
    active: 'نشط',
    inactive: 'غير نشط',
    pending: 'قيد المراجعة',
    completed: 'مكتمل',
    delivering: 'جاري التوصيل',
    cancelled: 'ملغي',
  };
  return texts[status] || status;
};