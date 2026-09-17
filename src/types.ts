export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  nim: string;
  email: string;
  phone: string;
  role: UserRole;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  minStock: number;
  description: string;
  image: string;
  status: 'active' | 'inactive';
}

export interface Category {
  id: string;
  name: string;
  productCount: number;
  status: 'active' | 'inactive';
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  icon: string;
  status: 'active' | 'inactive';
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'ready' | 'completed' | 'cancelled';
export type PaymentMethod = 'online' | 'koperasi';
export type PaymentStatus = 'unpaid' | 'paid';

export interface PrintSpec {
  fileName: string;
  paperSize: 'A4' | 'A5' | 'F4';
  color: 'bw' | 'color';
  sides: 'single' | 'double';
  pages: number;
  copies: number;
  notes: string;
}

export interface FotocopySpec {
  fileName: string;
  pages: number;
  copies: number;
  paperSize: 'A4' | 'A5' | 'F4';
  color: 'bw' | 'color';
  notes: string;
}

export interface JilidSpec {
  fileName: string;
  bindType: 'spiral' | 'lakban' | 'hardcover';
  size: 'A4' | 'A5' | 'F4';
  coverColor: string;
  copies: number;
  notes: string;
}

export interface CartItem {
  id: string;
  type: 'product' | 'service';
  name: string;
  price: number;
  quantity: number;
  image?: string;
  serviceSpec?: PrintSpec | FotocopySpec | JilidSpec;
  serviceType?: 'print' | 'fotocopy' | 'jilid';
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userNim: string;
  userEmail: string;
  items: CartItem[];
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  date: string;
  estimatedCompletion: string;
}

export interface StockHistory {
  id: string;
  productId: string;
  productName: string;
  change: number;
  reason: string;
  date: string;
  admin: string;
}

export type Page =
  | 'landing'
  | 'login'
  | 'register'
  | 'user-dashboard'
  | 'user-services'
  | 'user-service-print'
  | 'user-service-fotocopy'
  | 'user-service-jilid'
  | 'user-catalog'
  | 'user-product-detail'
  | 'user-cart'
  | 'user-checkout'
  | 'user-order-success'
  | 'user-order-detail'
  | 'user-order-history'
  | 'user-profile'
  | 'admin-dashboard'
  | 'admin-orders'
  | 'admin-order-detail'
  | 'admin-products'
  | 'admin-categories'
  | 'admin-services'
  | 'admin-stock'
  | 'admin-customers'
  | 'admin-payments'
  | 'admin-reports';

export interface AppState {
  currentPage: Page;
  currentUser: User | null;
  cart: CartItem[];
  selectedProduct: Product | null;
  selectedOrder: Order | null;
  lastOrderId: string | null;
}
