import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { mockOrders, mockProducts, salesChartData } from '../../data/mockData';
import { OrderStatusBadge } from '../../components/ui/Badge';
import type { Order } from '../../types';

interface Props {
  setSelectedOrder: (o: Order) => void;
  navigate: (page: any) => void;
}

const fmt = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

export default function AdminDashboard({ setSelectedOrder, navigate }: Props) {
  const today = mockOrders;
  const pendingCount = today.filter(o => o.status === 'pending').length;
  const processingCount = today.filter(o => o.status === 'processing').length;
  const readyCount = today.filter(o => o.status === 'ready').length;
  const revenue = today.reduce((sum, o) => sum + o.total, 0);
  const lowStock = mockProducts.filter(p => p.stock <= p.minStock && p.stock > 0);
  const noStock = mockProducts.filter(p => p.stock === 0);

  const stats = [
    { label: 'Total Pesanan Hari Ini', value: today.length, icon: '📦', color: 'bg-navy-50 text-navy-700' },
    { label: 'Pesanan Pending', value: pendingCount, icon: '⏳', color: 'bg-warning-50 text-warning-700' },
    { label: 'Sedang Diproses', value: processingCount, icon: '⚙️', color: 'bg-blue-50 text-blue-700' },
    { label: 'Siap Diambil', value: readyCount, icon: '✅', color: 'bg-success-50 text-success-700' },
    { label: 'Pendapatan Hari Ini', value: fmt(revenue), icon: '💰', color: 'bg-emerald-50 text-emerald-700', wide: true },
    { label: 'Total Produk', value: mockProducts.length, icon: '🛍️', color: 'bg-purple-50 text-purple-700' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Dashboard Admin</h1>
        <p className="text-slate-500 text-sm mt-1">Selamat datang di panel admin KOPATK</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((s, i) => (
          <div key={i} className={`bg-white rounded-2xl p-4 shadow-sm border border-slate-100 ${s.wide ? 'col-span-2 md:col-span-1' : ''}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3 ${s.color.split(' ')[0]}`}>{s.icon}</div>
            <div className={`text-xl font-bold ${s.color.split(' ')[1]}`}>{s.value}</div>
            <div className="text-xs text-slate-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h3 className="font-bold text-navy-900 mb-4">Pendapatan Minggu Ini</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={salesChartData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `${v/1000}k`} />
              <Tooltip formatter={(v: any) => [`Rp ${Number(v).toLocaleString()}`, 'Pendapatan']} />
              <Bar dataKey="pendapatan" fill="#1e3a5f" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h3 className="font-bold text-navy-900 mb-4">Jumlah Pesanan</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={salesChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v: any) => [v, 'Pesanan']} />
              <Line type="monotone" dataKey="pesanan" stroke="#2563eb" strokeWidth={2.5} dot={{ fill: '#2563eb', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders & Low Stock */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-navy-900">Pesanan Terbaru</h3>
            <button onClick={() => navigate('admin-orders')} className="text-navy-600 hover:text-navy-800 text-sm font-medium">Lihat semua →</button>
          </div>
          <div className="space-y-3">
            {mockOrders.slice(0, 4).map(o => (
              <div key={o.id} className="flex items-center gap-3 py-2 border-b border-slate-50 last:border-0">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-navy-900">{o.id}</span>
                    <OrderStatusBadge status={o.status} />
                  </div>
                  <div className="text-xs text-slate-400 truncate">{o.userName} — {fmt(o.total)}</div>
                </div>
                <button onClick={() => { setSelectedOrder(o); navigate('admin-order-detail'); }}
                  className="text-xs text-navy-600 hover:text-navy-800 font-medium flex-shrink-0">Detail</button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-navy-900">Stok Perlu Perhatian</h3>
            <button onClick={() => navigate('admin-stock')} className="text-navy-600 hover:text-navy-800 text-sm font-medium">Kelola →</button>
          </div>
          <div className="space-y-2">
            {noStock.map(p => (
              <div key={p.id} className="flex items-center justify-between py-1.5 border-b border-slate-50">
                <span className="text-sm text-slate-700">{p.name}</span>
                <span className="text-xs font-semibold text-danger-600 bg-danger-50 px-2 py-0.5 rounded-full">Habis</span>
              </div>
            ))}
            {lowStock.map(p => (
              <div key={p.id} className="flex items-center justify-between py-1.5 border-b border-slate-50">
                <span className="text-sm text-slate-700">{p.name}</span>
                <span className="text-xs font-semibold text-warning-600 bg-warning-50 px-2 py-0.5 rounded-full">Sisa {p.stock}</span>
              </div>
            ))}
            {noStock.length === 0 && lowStock.length === 0 && (
              <div className="text-center py-4 text-slate-400 text-sm">Semua stok dalam kondisi aman ✓</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
