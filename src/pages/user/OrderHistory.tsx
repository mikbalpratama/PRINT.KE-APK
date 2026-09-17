import { useState } from 'react';
import type { Page, Order, OrderStatus } from '../../types';
import { mockOrders } from '../../data/mockData';
import { OrderStatusBadge, PaymentStatusBadge } from '../../components/ui/Badge';

interface Props {
  userId: string;
  navigate: (page: Page) => void;
  setSelectedOrder: (o: Order) => void;
}

const fmt = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;
const fmtDate = (d: string) => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

const filters: { label: string; value: OrderStatus | 'all' }[] = [
  { label: 'Semua', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Diproses', value: 'processing' },
  { label: 'Siap Diambil', value: 'ready' },
  { label: 'Selesai', value: 'completed' },
  { label: 'Dibatalkan', value: 'cancelled' },
];

export default function OrderHistory({ userId, navigate, setSelectedOrder }: Props) {
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');

  const orders = mockOrders.filter(o => o.userId === userId && (filter === 'all' || o.status === filter));

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-navy-900 mb-6">Riwayat Pesanan</h1>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {filters.map(f => (
            <button key={f.value} onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === f.value ? 'bg-navy-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:border-navy-300'
              }`}>{f.label}</button>
          ))}
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📦</div>
            <p className="text-slate-500">Tidak ada pesanan ditemukan</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-navy-900">{order.id}</span>
                      <OrderStatusBadge status={order.status} />
                    </div>
                    <div className="text-xs text-slate-400 mt-1">{fmtDate(order.date)}</div>
                  </div>
                  <PaymentStatusBadge status={order.paymentStatus} />
                </div>

                <div className="text-sm text-slate-600 mb-3 line-clamp-2">
                  {order.items.map(i => i.name).join(' • ')}
                </div>

                <div className="flex items-center justify-between">
                  <div className="font-bold text-navy-700">{fmt(order.total)}</div>
                  <button
                    onClick={() => { setSelectedOrder(order); navigate('user-order-detail'); }}
                    className="px-4 py-2 text-sm bg-navy-50 text-navy-700 hover:bg-navy-100 rounded-xl font-medium transition-colors"
                  >
                    Lihat Detail
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
