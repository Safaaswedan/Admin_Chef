// src/api/mockAPI.js
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ============== بيانات الطهاة ==============
let mockChefs = [
  { id: 1, name: 'شيف عمر', email: 'omar@kitchenx.com', phone: '+966512345670', specialty: 'مطبخ شرقي', rating: 4.8, totalOrders: 234, completedOrders: 220, revenue: 11700, status: 'active', joinDate: '2024-10-01', avatar: 'ع', bio: 'خبرة 10 سنوات في المطبخ الشرقي' },
  { id: 2, name: 'شيف نادين', email: 'nadin@kitchenx.com', phone: '+966512345671', specialty: 'حلويات', rating: 4.9, totalOrders: 187, completedOrders: 180, revenue: 8415, status: 'active', joinDate: '2024-09-15', avatar: 'ن', bio: 'متخصصة في الحلويات الشرقية والغربية' },
  { id: 3, name: 'شيف كريم', email: 'karim@kitchenx.com', phone: '+966512345672', specialty: 'مطبخ إيطالي', rating: 4.7, totalOrders: 156, completedOrders: 148, revenue: 9360, status: 'inactive', joinDate: '2024-08-20', avatar: 'ك', bio: 'بيتزا وباستا احترافية' },
  { id: 4, name: 'شيف ليلى', email: 'laila@kitchenx.com', phone: '+966512345673', specialty: 'مأكولات بحرية', rating: 4.9, totalOrders: 203, completedOrders: 198, revenue: 14200, status: 'active', joinDate: '2024-07-10', avatar: 'ل', bio: 'متخصصة في المأكولات البحرية الطازجة' },
  { id: 5, name: 'شيف سعد', email: 'saad@kitchenx.com', phone: '+966512345674', specialty: 'مشاوي', rating: 4.8, totalOrders: 178, completedOrders: 170, revenue: 9790, status: 'active', joinDate: '2024-06-05', avatar: 'س', bio: 'مشاوي على الفحم' },
  { id: 6, name: 'شيف منى', email: 'mona@kitchenx.com', phone: '+966512345675', specialty: 'مطبخ سوري', rating: 4.6, totalOrders: 98, completedOrders: 92, revenue: 4900, status: 'pending', joinDate: '2025-03-01', avatar: 'م', bio: 'أطباق سورية تقليدية' },
];

// ============== بيانات السائقين ==============
let mockDrivers = [
  { id: 1, name: 'أحمد محمد', email: 'ahmed@kitchenx.com', phone: '+966512345680', location: 'الرياض', status: 'active', totalDeliveries: 456, rating: 4.8, vehicleType: 'سيارة', vehicleModel: 'تويوتا كورلا 2020', plateNumber: 'س ب ع 1234', joinDate: '2024-08-01', avatar: 'أ' },
  { id: 2, name: 'خالد إبراهيم', email: 'khalid@kitchenx.com', phone: '+966512345681', location: 'جدة', status: 'active', totalDeliveries: 389, rating: 4.9, vehicleType: 'دراجة نارية', vehicleModel: 'هوندا CB150R', plateNumber: 'ج د ن 5678', joinDate: '2024-07-15', avatar: 'خ' },
  { id: 3, name: 'ناصر القحطاني', email: 'nasser@kitchenx.com', phone: '+966512345682', location: 'الدمام', status: 'inactive', totalDeliveries: 178, rating: 4.5, vehicleType: 'سيارة', vehicleModel: 'هوندا اكورد 2019', plateNumber: 'د م م 9012', joinDate: '2024-09-10', avatar: 'ن' },
  { id: 4, name: 'عمر السعيد', email: 'omar@kitchenx.com', phone: '+966512345683', location: 'الخبر', status: 'pending', totalDeliveries: 0, rating: 0, vehicleType: 'سيارة', vehicleModel: 'كيا سبورتاج 2022', plateNumber: 'خ ب ر 3456', joinDate: '2025-05-01', avatar: 'ع' },
  { id: 5, name: 'سعد الحربي', email: 'saad@kitchenx.com', phone: '+966512345684', location: 'الرياض', status: 'active', totalDeliveries: 234, rating: 4.7, vehicleType: 'سيارة', vehicleModel: 'نيسان صني 2021', plateNumber: 'ر ي د 7890', joinDate: '2024-10-20', avatar: 'س' },
];

// ============== بيانات العملاء/الزبائن ==============
let mockCustomers = [
  { id: 1, name: 'أحمد محمد', email: 'ahmed.c@kitchenx.com', phone: '+966512345690', location: 'الرياض', totalOrders: 45, totalSpent: 2250, lastOrderDate: '2025-05-09', joinDate: '2024-10-01', status: 'active', avatar: 'أ' },
  { id: 2, name: 'سارة أحمد', email: 'sara@kitchenx.com', phone: '+966512345691', location: 'الرياض', totalOrders: 32, totalSpent: 1600, lastOrderDate: '2025-05-08', joinDate: '2024-11-15', status: 'active', avatar: 'س' },
  { id: 3, name: 'محمد علي', email: 'mohammed@kitchenx.com', phone: '+966512345692', location: 'جدة', totalOrders: 56, totalSpent: 2800, lastOrderDate: '2025-05-07', joinDate: '2024-09-20', status: 'active', avatar: 'م' },
  { id: 4, name: 'نورا حسن', email: 'nora@kitchenx.com', phone: '+966512345693', location: 'الدمام', totalOrders: 23, totalSpent: 1150, lastOrderDate: '2025-05-05', joinDate: '2024-12-10', status: 'inactive', avatar: 'ن' },
  { id: 5, name: 'خالد العتيبي', email: 'khalid.c@kitchenx.com', phone: '+966512345694', location: 'الخبر', totalOrders: 67, totalSpent: 3350, lastOrderDate: '2025-05-09', joinDate: '2024-08-05', status: 'active', avatar: 'خ' },
  { id: 6, name: 'فاطمة الزهراني', email: 'fatima@kitchenx.com', phone: '+966512345695', location: 'جدة', totalOrders: 18, totalSpent: 900, lastOrderDate: '2025-05-04', joinDate: '2025-01-15', status: 'active', avatar: 'ف' },
];

// ============== بيانات الطلبات ==============
let mockOrders = [
  { id: 'ORD-001', customer: 'أحمد محمد', customerId: 1, customerPhone: '+966512345690', chef: 'شيف عمر', chefId: 1, driver: 'أحمد محمد', driverId: 1, items: [{ name: 'مندي دجاج', quantity: 2, price: 35 }, { name: 'مضغوط لحم', quantity: 1, price: 45 }], subtotal: 115, deliveryFee: 10, totalAmount: 125, status: 'completed', paymentMethod: 'بطاقة ائتمان', date: '2025-05-09', time: '12:30', deliveryAddress: 'الرياض - حي النخيل - شارع الأمير محمد بن سلمان' },
  { id: 'ORD-002', customer: 'سارة أحمد', customerId: 2, customerPhone: '+966512345691', chef: 'شيف نادين', chefId: 2, driver: 'خالد إبراهيم', driverId: 2, items: [{ name: 'تشيز كيك', quantity: 3, price: 25 }, { name: 'كنافة', quantity: 2, price: 20 }], subtotal: 115, deliveryFee: 10, totalAmount: 125, status: 'delivering', paymentMethod: 'كاش', date: '2025-05-09', time: '13:45', deliveryAddress: 'الرياض - حي الملقا - شارع الأمير تركي' },
  { id: 'ORD-003', customer: 'محمد علي', customerId: 3, customerPhone: '+966512345692', chef: 'شيف كريم', chefId: 3, driver: 'سعد الحربي', driverId: 5, items: [{ name: 'بيتا مارغريتا', quantity: 2, price: 40 }, { name: 'باستا ألفريدو', quantity: 1, price: 35 }], subtotal: 115, deliveryFee: 10, totalAmount: 125, status: 'pending', paymentMethod: 'بطاقة ائتمان', date: '2025-05-09', time: '14:20', deliveryAddress: 'جدة - حي الروضة - شارع الأندلس' },
  { id: 'ORD-004', customer: 'نورا حسن', customerId: 4, customerPhone: '+966512345693', chef: 'شيف ليلى', chefId: 4, driver: 'أحمد محمد', driverId: 1, items: [{ name: 'سمك مشوي', quantity: 2, price: 60 }, { name: 'ربيان مقلي', quantity: 1, price: 45 }], subtotal: 165, deliveryFee: 10, totalAmount: 175, status: 'completed', paymentMethod: 'كاش', date: '2025-05-08', time: '19:00', deliveryAddress: 'الدمام - حي الفيحاء - شارع الملك سعود' },
  { id: 'ORD-005', customer: 'خالد العتيبي', customerId: 5, customerPhone: '+966512345694', chef: 'شيف سعد', chefId: 5, driver: 'خالد إبراهيم', driverId: 2, items: [{ name: 'مندي لحم', quantity: 2, price: 50 }, { name: 'مشاوي مشكلة', quantity: 1, price: 65 }], subtotal: 165, deliveryFee: 10, totalAmount: 175, status: 'completed', paymentMethod: 'بطاقة ائتمان', date: '2025-05-07', time: '20:30', deliveryAddress: 'الخبر - حي الكورنيش - شارع البساتين' },
  { id: 'ORD-006', customer: 'فاطمة الزهراني', customerId: 6, customerPhone: '+966512345695', chef: 'شيف عمر', chefId: 1, driver: null, items: [{ name: 'مضغوط دجاج', quantity: 2, price: 40 }], subtotal: 80, deliveryFee: 10, totalAmount: 90, status: 'cancelled', paymentMethod: 'كاش', date: '2025-05-06', time: '18:15', deliveryAddress: 'جدة - حي السلامة - شارع حراء' },
];

// ============== إحصائيات ==============
const getDashboardStats = () => {
  const totalChefs = mockChefs.length;
  const activeChefs = mockChefs.filter(c => c.status === 'active').length;
  const totalDrivers = mockDrivers.length;
  const activeDrivers = mockDrivers.filter(d => d.status === 'active').length;
  const totalCustomers = mockCustomers.length;
  const totalOrders = mockOrders.length;
  const completedOrders = mockOrders.filter(o => o.status === 'completed').length;
  const totalRevenue = mockOrders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.totalAmount, 0);
  
  // الطلبات اليوم (تاريخ اليوم)
  const today = new Date().toISOString().split('T')[0];
  const todayOrders = mockOrders.filter(o => o.date === today).length;
  const todayRevenue = mockOrders.filter(o => o.date === today && o.status === 'completed').reduce((sum, o) => sum + o.totalAmount, 0);
  
  return {
    totalChefs, activeChefs, pendingChefs: mockChefs.filter(c => c.status === 'pending').length,
    totalDrivers, activeDrivers, pendingDrivers: mockDrivers.filter(d => d.status === 'pending').length,
    totalCustomers, activeCustomers: mockCustomers.filter(c => c.status === 'active').length,
    totalOrders, completedOrders, pendingOrders: mockOrders.filter(o => o.status === 'pending').length,
    deliveringOrders: mockOrders.filter(o => o.status === 'delivering').length,
    totalRevenue,
    todayOrders, todayRevenue,
    averageOrderValue: totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0,
  };
};

// ============== دوال API ==============
export const mockAuthAPI = {
  login: async (email, password) => {
    await delay(800);
    if (email === 'admin@kitchenx.com' && password === 'admin123') {
      return {
        success: true,
        data: {
          access_token: 'mock-token-12345',
          user: { id: 1, name: 'مدير النظام', email: email, role: 'admin' }
        }
      };
    }
    throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
  },
  logout: async () => {
    await delay(300);
    return { success: true };
  },
  getProfile: async () => {
    await delay(300);
    return { id: 1, name: 'مدير النظام', email: 'admin@kitchenx.com', role: 'admin' };
  }
};

export const mockChefsAPI = {
  getAll: async (params = {}) => {
    await delay(500);
    let filtered = [...mockChefs];
    if (params.status && params.status !== 'all') {
      filtered = filtered.filter(c => c.status === params.status);
    }
    if (params.search) {
      filtered = filtered.filter(c => c.name.includes(params.search) || c.email.includes(params.search));
    }
    return { data: filtered, total: filtered.length };
  },
  getById: async (id) => {
    await delay(300);
    const chef = mockChefs.find(c => c.id === parseInt(id));
    if (!chef) throw new Error('شيف غير موجود');
    return chef;
  },
  create: async (data) => {
    await delay(600);
    const newChef = { 
      id: mockChefs.length + 1, 
      ...data, 
      rating: 0, 
      totalOrders: 0, 
      completedOrders: 0, 
      revenue: 0,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    mockChefs.push(newChef);
    return newChef;
  },
  update: async (id, data) => {
    await delay(500);
    const index = mockChefs.findIndex(c => c.id === parseInt(id));
    if (index === -1) throw new Error('شيف غير موجود');
    mockChefs[index] = { ...mockChefs[index], ...data };
    return mockChefs[index];
  },
  delete: async (id) => {
    await delay(400);
    const index = mockChefs.findIndex(c => c.id === parseInt(id));
    if (index === -1) throw new Error('شيف غير موجود');
    mockChefs.splice(index, 1);
    return { success: true };
  },
  updateStatus: async (id, status) => {
    await delay(400);
    const index = mockChefs.findIndex(c => c.id === parseInt(id));
    if (index === -1) throw new Error('شيف غير موجود');
    mockChefs[index].status = status;
    return mockChefs[index];
  }
};

export const mockDriversAPI = {
  getAll: async (params = {}) => {
    await delay(500);
    let filtered = [...mockDrivers];
    if (params.status && params.status !== 'all') {
      filtered = filtered.filter(d => d.status === params.status);
    }
    if (params.search) {
      filtered = filtered.filter(d => d.name.includes(params.search) || d.email.includes(params.search));
    }
    return { data: filtered, total: filtered.length };
  },
  getById: async (id) => {
    await delay(300);
    const driver = mockDrivers.find(d => d.id === parseInt(id));
    if (!driver) throw new Error('سائق غير موجود');
    return driver;
  },
  create: async (data) => {
    await delay(600);
    const newDriver = { 
      id: mockDrivers.length + 1, 
      ...data, 
      totalDeliveries: 0, 
      rating: 0,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    mockDrivers.push(newDriver);
    return newDriver;
  },
  update: async (id, data) => {
    await delay(500);
    const index = mockDrivers.findIndex(d => d.id === parseInt(id));
    if (index === -1) throw new Error('سائق غير موجود');
    mockDrivers[index] = { ...mockDrivers[index], ...data };
    return mockDrivers[index];
  },
  delete: async (id) => {
    await delay(400);
    const index = mockDrivers.findIndex(d => d.id === parseInt(id));
    if (index === -1) throw new Error('سائق غير موجود');
    mockDrivers.splice(index, 1);
    return { success: true };
  },
  updateStatus: async (id, status) => {
    await delay(400);
    const index = mockDrivers.findIndex(d => d.id === parseInt(id));
    if (index === -1) throw new Error('سائق غير موجود');
    mockDrivers[index].status = status;
    return mockDrivers[index];
  }
};

export const mockCustomersAPI = {
  getAll: async (params = {}) => {
    await delay(500);
    let filtered = [...mockCustomers];
    if (params.search) {
      filtered = filtered.filter(c => c.name.includes(params.search) || c.email.includes(params.search) || c.phone.includes(params.search));
    }
    return { data: filtered, total: filtered.length };
  },
  getById: async (id) => {
    await delay(300);
    const customer = mockCustomers.find(c => c.id === parseInt(id));
    if (!customer) throw new Error('عميل غير موجود');
    return customer;
  },
  updateStatus: async (id, status) => {
    await delay(400);
    const index = mockCustomers.findIndex(c => c.id === parseInt(id));
    if (index === -1) throw new Error('عميل غير موجود');
    mockCustomers[index].status = status;
    return mockCustomers[index];
  },
  getCustomerOrders: async (customerId) => {
    await delay(400);
    const orders = mockOrders.filter(o => o.customerId === parseInt(customerId));
    return orders;
  }
};

export const mockOrdersAPI = {
  getAll: async (params = {}) => {
    await delay(500);
    let filtered = [...mockOrders];
    if (params.status && params.status !== 'all') {
      filtered = filtered.filter(o => o.status === params.status);
    }
    if (params.search) {
      filtered = filtered.filter(o => o.id.includes(params.search) || o.customer.includes(params.search));
    }
    if (params.date) {
      filtered = filtered.filter(o => o.date === params.date);
    }
    return { data: filtered, total: filtered.length };
  },
  getById: async (id) => {
    await delay(300);
    const order = mockOrders.find(o => o.id === id);
    if (!order) throw new Error('طلب غير موجود');
    return order;
  },
  updateStatus: async (id, status) => {
    await delay(400);
    const index = mockOrders.findIndex(o => o.id === id);
    if (index === -1) throw new Error('طلب غير موجود');
    mockOrders[index].status = status;
    return mockOrders[index];
  },
  assignDriver: async (id, driverId) => {
    await delay(400);
    const index = mockOrders.findIndex(o => o.id === id);
    if (index === -1) throw new Error('طلب غير موجود');
    const driver = mockDrivers.find(d => d.id === driverId);
    if (driver) {
      mockOrders[index].driver = driver.name;
      mockOrders[index].driverId = driverId;
    }
    return mockOrders[index];
  },
  getRecent: async (limit = 10) => {
    await delay(400);
    return mockOrders.slice(0, limit);
  }
};

export const mockStatsAPI = {
  getDashboardStats: async () => {
    await delay(400);
    return getDashboardStats();
  },
  getMonthlyRevenue: async () => {
    await delay(500);
    return {
      labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
      values: [8500, 9200, 10100, 11800, 13500, 0]
    };
  },
  getOrdersByStatus: async () => {
    await delay(400);
    return {
      labels: ['مكتمل', 'جاري التوصيل', 'قيد الانتظار', 'ملغي'],
      values: [
        mockOrders.filter(o => o.status === 'completed').length,
        mockOrders.filter(o => o.status === 'delivering').length,
        mockOrders.filter(o => o.status === 'pending').length,
        mockOrders.filter(o => o.status === 'cancelled').length
      ]
    };
  },
  getTopChefs: async () => {
    await delay(500);
    return [...mockChefs].sort((a, b) => b.totalOrders - a.totalOrders).slice(0, 5);
  },
  getTopCustomers: async () => {
    await delay(500);
    return [...mockCustomers].sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 5);
  }
};

export const mockReportsAPI = {
  getChefsReport: async (period = 'monthly') => {
    await delay(800);
    return {
      totalChefs: mockChefs.length,
      activeChefs: mockChefs.filter(c => c.status === 'active').length,
      avgRating: (mockChefs.reduce((sum, c) => sum + c.rating, 0) / mockChefs.filter(c => c.rating > 0).length).toFixed(1),
      totalOrdersFromChefs: mockChefs.reduce((sum, c) => sum + c.totalOrders, 0),
      totalRevenueFromChefs: mockChefs.reduce((sum, c) => sum + c.revenue, 0),
      chefs: mockChefs.map(c => ({ name: c.name, orders: c.totalOrders, revenue: c.revenue, rating: c.rating }))
    };
  },
  getDriversReport: async (period = 'monthly') => {
    await delay(800);
    return {
      totalDrivers: mockDrivers.length,
      activeDrivers: mockDrivers.filter(d => d.status === 'active').length,
      avgRating: (mockDrivers.reduce((sum, d) => sum + d.rating, 0) / mockDrivers.filter(d => d.rating > 0).length).toFixed(1),
      totalDeliveries: mockDrivers.reduce((sum, d) => sum + d.totalDeliveries, 0),
      drivers: mockDrivers.map(d => ({ name: d.name, deliveries: d.totalDeliveries, rating: d.rating }))
    };
  },
  getFinancialReport: async (period = 'monthly') => {
    await delay(800);
    const completedOrders = mockOrders.filter(o => o.status === 'completed');
    const totalRevenue = completedOrders.reduce((sum, o) => sum + o.totalAmount, 0);
    const platformCommission = totalRevenue * 0.15; // 15% عمولة المنصة
    const chefPayouts = totalRevenue * 0.70; // 70% للطهاة
    const driverPayouts = completedOrders.reduce((sum, o) => sum + (o.deliveryFee || 10), 0); // رسوم التوصيل للسائقين
    
    return {
      totalRevenue,
      platformCommission,
      chefPayouts,
      driverPayouts,
      netProfit: platformCommission - driverPayouts,
      period
    };
  }
};
// ============== طلبات اشتراك الطهاة (قيد المراجعة) ==============
let pendingChefRequests = [
  { 
    id: 1, 
    name: 'شيف أحمد', 
    email: 'ahmed.chef@example.com', 
    phone: '+966512345700',
    specialty: 'مطبخ سوري',
    experience: '8 سنوات',
    bio: 'خبرة كبيرة في المطبخ السوري والحلويات الشرقية',
    documents: {
      idCard: 'id_card_1.pdf',
      healthCertificate: 'health_cert_1.pdf',
      kitchenPhotos: ['kitchen1.jpg', 'kitchen2.jpg']
    },
    status: 'pending',
    submittedAt: '2025-05-10T08:30:00',
    rating: 0,
    previousWork: 'مطعم ألف ليلة وليلة - دمشق',
    location: 'الرياض - حي النخيل'
  },
  { 
    id: 2, 
    name: 'شيف نورا', 
    email: 'nora.chef@example.com', 
    phone: '+966512345701',
    specialty: 'مطبخ إيطالي',
    experience: '5 سنوات',
    bio: 'متخصصة في البيتزا والمعجنات الإيطالية',
    documents: {
      idCard: 'id_card_2.pdf',
      healthCertificate: 'health_cert_2.pdf',
      kitchenPhotos: ['kitchen3.jpg', 'kitchen4.jpg']
    },
    status: 'pending',
    submittedAt: '2025-05-09T14:20:00',
    rating: 0,
    previousWork: 'مطعم تراتوريا - جدة',
    location: 'جدة - حي الروضة'
  },
  { 
    id: 3, 
    name: 'شيف خالد', 
    email: 'khalid.chef@example.com', 
    phone: '+966512345702',
    specialty: 'مأكولات بحرية',
    experience: '10 سنوات',
    bio: 'شيف متخصص في المأكولات البحرية الطازجة',
    documents: {
      idCard: 'id_card_3.pdf',
      healthCertificate: 'health_cert_3.pdf',
      kitchenPhotos: ['kitchen5.jpg', 'kitchen6.jpg']
    },
    status: 'pending',
    submittedAt: '2025-05-08T11:45:00',
    rating: 0,
    previousWork: 'مطعم البحار - الدمام',
    location: 'الدمام - حي الفيحاء'
  },
];

// ============== طلبات اشتراك السائقين (قيد المراجعة) ==============
let pendingDriverRequests = [
  { 
    id: 1, 
    name: 'سعد الحربي', 
    email: 'saad.driver@example.com', 
    phone: '+966512345710',
    location: 'الرياض',
    vehicleType: 'سيارة',
    vehicleModel: 'تويوتا كورلا 2022',
    plateNumber: 'س ب ع 7890',
    licenseNumber: 'DL-123456',
    experience: '3 سنوات',
    bio: 'سائق محترف وملتزم بالمواعيد',
    documents: {
      drivingLicense: 'license_1.pdf',
      carRegistration: 'registration_1.pdf',
      vehiclePhotos: ['car1.jpg', 'car2.jpg']
    },
    status: 'pending',
    submittedAt: '2025-05-10T09:15:00',
    rating: 0,
    criminalRecord: 'clean',
    isAvailable: true
  },
  { 
    id: 2, 
    name: 'فهد العتيبي', 
    email: 'fahd.driver@example.com', 
    phone: '+966512345711',
    location: 'جدة',
    vehicleType: 'دراجة نارية',
    vehicleModel: 'هوندا CB150R',
    plateNumber: 'ج د ن 5678',
    licenseNumber: 'DL-789012',
    experience: '2 سنوات',
    bio: 'سائق دراجات محترف وسريع التوصيل',
    documents: {
      drivingLicense: 'license_2.pdf',
      carRegistration: 'registration_2.pdf',
      vehiclePhotos: ['bike1.jpg', 'bike2.jpg']
    },
    status: 'pending',
    submittedAt: '2025-05-09T16:30:00',
    rating: 0,
    criminalRecord: 'clean',
    isAvailable: true
  },
  { 
    id: 3, 
    name: 'ناصر القحطاني', 
    email: 'nasser.driver@example.com', 
    phone: '+966512345712',
    location: 'الرياض',
    vehicleType: 'سيارة',
    vehicleModel: 'هونداي النترا 2021',
    plateNumber: 'ر ي د 3456',
    licenseNumber: 'DL-345678',
    experience: '5 سنوات',
    bio: 'سائق ذو خبرة في توصيل الطلبات',
    documents: {
      drivingLicense: 'license_3.pdf',
      carRegistration: 'registration_3.pdf',
      vehiclePhotos: ['car3.jpg', 'car4.jpg']
    },
    status: 'pending',
    submittedAt: '2025-05-08T10:00:00',
    rating: 0,
    criminalRecord: 'clean',
    isAvailable: true
  },
];

// ============== دوال API لطلبات الاشتراك ==============
export const mockRequestsAPI = {
  // طلبات الطهاة
  getPendingChefRequests: async () => {
    await delay(500);
    return pendingChefRequests.filter(r => r.status === 'pending');
  },
  getChefRequestById: async (id) => {
    await delay(300);
    const request = pendingChefRequests.find(r => r.id === parseInt(id));
    if (!request) throw new Error('طلب غير موجود');
    return request;
  },
  approveChefRequest: async (id) => {
    await delay(600);
    const index = pendingChefRequests.findIndex(r => r.id === parseInt(id));
    if (index === -1) throw new Error('طلب غير موجود');
    pendingChefRequests[index].status = 'approved';
    
    // إضافة الشيف إلى قائمة الطهاة النشطين
    const approvedChef = pendingChefRequests[index];
    mockChefs.push({
      id: mockChefs.length + 1,
      name: approvedChef.name,
      email: approvedChef.email,
      phone: approvedChef.phone,
      specialty: approvedChef.specialty,
      rating: 0,
      totalOrders: 0,
      completedOrders: 0,
      revenue: 0,
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0],
      location: approvedChef.location,
      bio: approvedChef.bio
    });
    
    return { success: true };
  },
  rejectChefRequest: async (id, reason) => {
    await delay(500);
    const index = pendingChefRequests.findIndex(r => r.id === parseInt(id));
    if (index === -1) throw new Error('طلب غير موجود');
    pendingChefRequests[index].status = 'rejected';
    pendingChefRequests[index].rejectionReason = reason;
    return { success: true };
  },
  
  // طلبات السائقين
  getPendingDriverRequests: async () => {
    await delay(500);
    return pendingDriverRequests.filter(r => r.status === 'pending');
  },
  getDriverRequestById: async (id) => {
    await delay(300);
    const request = pendingDriverRequests.find(r => r.id === parseInt(id));
    if (!request) throw new Error('طلب غير موجود');
    return request;
  },
  approveDriverRequest: async (id) => {
    await delay(600);
    const index = pendingDriverRequests.findIndex(r => r.id === parseInt(id));
    if (index === -1) throw new Error('طلب غير موجود');
    pendingDriverRequests[index].status = 'approved';
    
    // إضافة السائق إلى قائمة السائقين النشطين
    const approvedDriver = pendingDriverRequests[index];
    mockDrivers.push({
      id: mockDrivers.length + 1,
      name: approvedDriver.name,
      email: approvedDriver.email,
      phone: approvedDriver.phone,
      location: approvedDriver.location,
      status: 'active',
      totalDeliveries: 0,
      rating: 0,
      vehicleType: approvedDriver.vehicleType,
      vehicleModel: approvedDriver.vehicleModel,
      plateNumber: approvedDriver.plateNumber,
      joinDate: new Date().toISOString().split('T')[0]
    });
    
    return { success: true };
  },
  rejectDriverRequest: async (id, reason) => {
    await delay(500);
    const index = pendingDriverRequests.findIndex(r => r.id === parseInt(id));
    if (index === -1) throw new Error('طلب غير موجود');
    pendingDriverRequests[index].status = 'rejected';
    pendingDriverRequests[index].rejectionReason = reason;
    return { success: true };
  },
  
  // إحصائيات الطلبات
  getRequestsStats: async () => {
    await delay(300);
    return {
      pendingChefs: pendingChefRequests.filter(r => r.status === 'pending').length,
      pendingDrivers: pendingDriverRequests.filter(r => r.status === 'pending').length,
      totalRequests: pendingChefRequests.filter(r => r.status === 'pending').length + 
                     pendingDriverRequests.filter(r => r.status === 'pending').length
    };
  }
};