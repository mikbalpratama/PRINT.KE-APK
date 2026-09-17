import { useState } from 'react';
import type { Page, User, CartItem, Product, Order } from './types';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import Navbar from './components/user/Navbar';
import Dashboard from './pages/user/Dashboard';
import ServicesPage from './pages/user/ServicesPage';
import ServiceDetailPrint from './pages/user/ServiceDetailPrint';
import ServiceDetailFotocopy from './pages/user/ServiceDetailFotocopy';
import ServiceDetailJilid from './pages/user/ServiceDetailJilid';
import ProductCatalog from './pages/user/ProductCatalog';
import ProductDetail from './pages/user/ProductDetail';
import Cart from './pages/user/Cart';
import Checkout from './pages/user/Checkout';
import OrderSuccess from './pages/user/OrderSuccess';
import OrderDetail from './pages/user/OrderDetail';
import OrderHistory from './pages/user/OrderHistory';
import Profile from './pages/user/Profile';

import Sidebar from './components/admin/Sidebar';
import AdminDashboard from './pages/admin/Dashboard';
import AdminOrders from './pages/admin/Orders';
import AdminProducts from './pages/admin/Products';
import AdminCategories from './pages/admin/Categories';
import AdminServices from './pages/admin/Services';
import AdminStock from './pages/admin/Stock';
import AdminCustomers from './pages/admin/Customers';
import AdminPayments from './pages/admin/Payments';
import AdminReports from './pages/admin/Reports';

const ADMIN_PAGES: Page[] = ['admin-dashboard','admin-orders','admin-order-detail','admin-products','admin-categories','admin-services','admin-stock','admin-customers','admin-payments','admin-reports'];
const USER_PAGES: Page[] = ['user-dashboard','user-services','user-service-print','user-service-fotocopy','user-service-jilid','user-catalog','user-product-detail','user-cart','user-checkout','user-order-success','user-order-detail','user-order-history','user-profile'];

export default function App() {
  const [page, setPage] = useState<Page>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [lastOrderId, setLastOrderId] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navigate = (p: Page) => {
    setPage(p);
    window.scrollTo(0, 0);
  };

  const handleLogin = (u: User) => setUser(u);

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    navigate('landing');
  };

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
      return [...prev, item];
    });
  };

  const updateQuantity = (id: string, qty: number) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
  };

  const removeItem = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const clearCart = () => setCart([]);

  const isAdmin = ADMIN_PAGES.includes(page);
  const isUser = USER_PAGES.includes(page);

  if (isAdmin && user?.role === 'admin') {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar
          currentPage={page}
          navigate={navigate}
          onLogout={handleLogout}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(c => !c)}
        />
        <main className="flex-1 min-w-0 overflow-auto">
          {page === 'admin-dashboard' && <AdminDashboard setSelectedOrder={setSelectedOrder} navigate={navigate} />}
          {page === 'admin-orders' && <AdminOrders navigate={navigate} setSelectedOrder={setSelectedOrder} />}
          {page === 'admin-order-detail' && selectedOrder && (
            <OrderDetail order={selectedOrder} navigate={navigate} isAdmin={true} />
          )}
          {page === 'admin-products' && <AdminProducts />}
          {page === 'admin-categories' && <AdminCategories />}
          {page === 'admin-services' && <AdminServices />}
          {page === 'admin-stock' && <AdminStock />}
          {page === 'admin-customers' && <AdminCustomers />}
          {page === 'admin-payments' && <AdminPayments />}
          {page === 'admin-reports' && <AdminReports />}
        </main>
      </div>
    );
  }

  if (isUser && user) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar user={user} cart={cart} navigate={navigate} onLogout={handleLogout} currentPage={page} />
        <main>
          {page === 'user-dashboard' && <Dashboard user={user} navigate={navigate} setSelectedOrder={setSelectedOrder} />}
          {page === 'user-services' && <ServicesPage navigate={navigate} />}
          {page === 'user-service-print' && <ServiceDetailPrint navigate={navigate} addToCart={addToCart} />}
          {page === 'user-service-fotocopy' && <ServiceDetailFotocopy navigate={navigate} addToCart={addToCart} />}
          {page === 'user-service-jilid' && <ServiceDetailJilid navigate={navigate} addToCart={addToCart} />}
          {page === 'user-catalog' && <ProductCatalog navigate={navigate} setSelectedProduct={setSelectedProduct} addToCart={addToCart} />}
          {page === 'user-product-detail' && selectedProduct && (
            <ProductDetail product={selectedProduct} navigate={navigate} addToCart={addToCart} />
          )}
          {page === 'user-cart' && <Cart cart={cart} navigate={navigate} updateQuantity={updateQuantity} removeItem={removeItem} />}
          {page === 'user-checkout' && (
            <Checkout cart={cart} user={user} navigate={navigate} onOrderSuccess={id => { setLastOrderId(id); }} clearCart={clearCart} />
          )}
          {page === 'user-order-success' && <OrderSuccess orderId={lastOrderId} navigate={navigate} />}
          {page === 'user-order-detail' && selectedOrder && (
            <OrderDetail order={selectedOrder} navigate={navigate} />
          )}
          {page === 'user-order-history' && (
            <OrderHistory userId={user.id} navigate={navigate} setSelectedOrder={setSelectedOrder} />
          )}
          {page === 'user-profile' && <Profile user={user} navigate={navigate} onLogout={handleLogout} />}
        </main>
      </div>
    );
  }

  return (
    <>
      {page === 'landing' && <LandingPage navigate={navigate} />}
      {page === 'login' && <LoginPage navigate={navigate} onLogin={handleLogin} />}
      {page === 'register' && <RegisterPage navigate={navigate} />}
      {(isAdmin || isUser) && !user && <LoginPage navigate={navigate} onLogin={handleLogin} />}
    </>
  );
}
