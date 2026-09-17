import { useState } from 'react';
import { mockOrders } from '../../data/mockData';
import { OrderStatusBadge, PaymentStatusBadge } from '../../components/ui/Badge';
import type { Order, OrderStatus } from '../../types';

interface Props {
  navigate: (page: any) => void;
  setSelectedOrder: (o: Order) => void;
}

const fmt = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;
const fmtDate = (d: string) => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

export default function AdminOrders({ navigate, setSelectedOrder }: Props) {
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [search, setSearch] = useState('');

  let orders = mockOrders;
  if (statusFilter !== 'all') orders = orders.filter(o => o.status === statusFilter);
  if (search) orders = orders.filter(o =>
    o.id.toLowerCase().includes(search.toLowerCase()) ||
    o.userName.toLowerCase().includes(search.toLowerCase())
  );

  const statuses: { label: string; value: OrderStatus | 'all' }[] = [
    { label: 'Semua', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Dikonfirmasi', value: 'confirmed' },
    { label: 'Diproses', value: 'processing' },
    { label: 'Siap Diambil', value: 'ready' },
    { label: 'Selesai', value: 'completed' },
    { label: 'Dibatalkan', value: 'cancelled' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-navy-900 mb-6">Manajemen Pesanan</h1>

      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-[200px]">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari ID pesanan atau nama..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 bg-white" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)}
          className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 bg-white">
          {statuses.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {['ID Pesanan', 'Customer', 'Jenis', 'Total', 'Pembayaran', 'Status', 'Tanggal', 'Aksi'].map(h => (
                  <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-semibold text-navy-900 text-sm">{o.id}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm font-medium text-slate-700">{o.userName}</div>
                    <div className="text-xs text-slate-400">{o.userNim}</div>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600">
                    {o.items.some(i => i.type === 'service') && o.items.some(i => i.type === 'product')
                      ? 'Mixed' : o.items[0]?.type === 'service' ? 'Layanan' : 'Produk'}
                  </td>
                  <td className="py-3 px-4 text-sm font-semibold text-navy-700">{fmt(o.total)}</td>
                  <td className="py-3 px-4"><PaymentStatusBadge status={o.paymentStatus} /></td>
                  <td className="py-3 px-4"><OrderStatusBadge status={o.status} /></td>
                  <td className="py-3 px-4 text-xs text-slate-500 whitespace-nowrap">{fmtDate(o.date)}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => { setSelectedOrder(o); navigate('admin-order-detail'); }}
                      className="px-3 py-1.5 bg-navy-50 text-navy-700 hover:bg-navy-100 rounded-lg text-xs font-medium transition-colors"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && (
            <div className="text-center py-16 text-slate-400 text-sm">Tidak ada pesanan ditemukan</div>
          )}
        </div>
      </div>
    </div>
  );
}
