import type { User, Page, Order } from '../../types';
import { mockOrders, mockProducts } from '../../data/mockData';
import { OrderStatusBadge } from '../../components/ui/Badge';

interface Props {
  user: User;
  navigate: (page: Page) => void;
  setSelectedOrder: (o: Order) => void;
}

const quickActions = [
  { icon: '🖨️', label: 'Pesan Print', page: 'user-service-print' as Page, color: 'bg-blue-50 hover:bg-blue-100 text-blue-700' },
  { icon: '📋', label: 'Fotocopy', page: 'user-service-fotocopy' as Page, color: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700' },
  { icon: '📚', label: 'Jilid', page: 'user-service-jilid' as Page, color: 'bg-purple-50 hover:bg-purple-100 text-purple-700' },
  { icon: '🛍️', label: 'Lihat ATK', page: 'user-catalog' as Page, color: 'bg-navy-50 hover:bg-navy-100 text-navy-700' },
];

const services = [
  { icon: '🖨️', name: 'Print', desc: 'Hitam putih & warna', price: 'Rp 500/lembar' },
  { icon: '📋', name: 'Fotocopy', desc: 'Cepat dan terjangkau', price: 'Rp 300/lembar' },
  { icon: '📚', name: 'Jilid', desc: 'Spiral & hardcover', price: 'Mulai Rp 5.000' },
  { icon: '📡', name: 'Scan', desc: 'Digital PDF/JPG', price: 'Rp 1.000/hal' },
];

export default function Dashboard({ user, navigate, setSelectedOrder }: Props) {
  const userOrders = mockOrders.filter(o => o.userId === user.id).slice(0, 3);
  const featuredProducts = mockProducts.filter(p => p.status === 'active').slice(0, 4);

  const fmt = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Banner */}
      <div className="bg-gradient-to-r from-navy-900 to-navy-700 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-navy-300 text-sm mb-1">Selamat datang kembali 👋</p>
          <h1 className="text-2xl font-bold text-white mb-1">Halo, {user.name.split(' ')[0]}!</h1>
          <p className="text-navy-200 text-sm">NIM: {user.nim}</p>

          <div className="mt-6 bg-white/10 backdrop-blur border border-white/10 rounded-2xl p-4 flex items-center gap-4">
            <div className="text-4xl">🎓</div>
            <div>
              <div className="text-white font-semibold">Promo Akhir Semester!</div>
              <div className="text-navy-200 text-sm">Print 20% lebih hemat untuk pengiriman dokumen skripsi dan laporan.</div>
            </div>
            <button onClick={() => navigate('user-service-print')} className="ml-auto flex-shrink-0 px-4 py-2 bg-white text-navy-900 rounded-xl text-sm font-semibold hover:bg-navy-100 transition-colors">
              Pesan
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Quick Actions */}
        <section>
          <h2 className="text-base font-bold text-navy-900 mb-4">Aksi Cepat</h2>
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map(a => (
              <button
                key={a.label}
                onClick={() => navigate(a.page)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl font-medium text-sm transition-colors ${a.color}`}
              >
                <span className="text-2xl">{a.icon}</span>
                <span>{a.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Popular Services */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-navy-900">Layanan Terpopuler</h2>
            <button onClick={() => navigate('user-services')} className="text-navy-600 hover:text-navy-800 text-sm font-medium">Lihat semua →</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {services.map(s => (
              <div key={s.name} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('user-services')}>
                <div className="text-3xl mb-3">{s.icon}</div>
                <div className="font-semibold text-navy-900 text-sm">{s.name}</div>
                <div className="text-slate-500 text-xs mt-0.5">{s.desc}</div>
                <div className="text-navy-600 text-xs font-semibold mt-2">{s.price}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-navy-900">Produk ATK</h2>
            <button onClick={() => navigate('user-catalog')} className="text-navy-600 hover:text-navy-800 text-sm font-medium">Lihat semua →</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredProducts.map(p => (
              <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer group"
                onClick={() => navigate('user-catalog')}>
                <div className="aspect-square bg-slate-50 overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-3">
                  <div className="font-medium text-navy-900 text-sm truncate">{p.name}</div>
                  <div className="text-navy-600 text-xs font-semibold mt-1">{fmt(p.price)}</div>
                  <div className="text-slate-400 text-xs mt-0.5">Stok: {p.stock}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Orders */}
        {userOrders.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-navy-900">Pesanan Terakhir</h2>
              <button onClick={() => navigate('user-order-history')} className="text-navy-600 hover:text-navy-800 text-sm font-medium">Lihat semua →</button>
            </div>
            <div className="space-y-3">
              {userOrders.map(order => (
                <div key={order.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-navy-900 text-sm">{order.id}</span>
                      <OrderStatusBadge status={order.status} />
                    </div>
                    <div className="text-slate-500 text-xs truncate">{order.items.map(i => i.name).join(', ')}</div>
                    <div className="text-navy-700 font-semibold text-sm mt-1">{fmt(order.total)}</div>
                  </div>
                  <button
                    onClick={() => { setSelectedOrder(order); navigate('user-order-detail'); }}
                    className="px-3 py-1.5 text-xs bg-navy-50 text-navy-700 hover:bg-navy-100 rounded-lg font-medium transition-colors flex-shrink-0"
                  >
                    Detail
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
