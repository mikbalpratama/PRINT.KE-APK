import type { Page, Order } from '../../types';
import { OrderStatusBadge, PaymentStatusBadge } from '../../components/ui/Badge';

interface Props {
  order: Order;
  navigate: (page: Page) => void;
  isAdmin?: boolean;
  onStatusChange?: (status: Order['status']) => void;
}

const fmt = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;
const fmtDate = (d: string) => new Date(d).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

const timeline: { status: Order['status']; label: string }[] = [
  { status: 'pending', label: 'Pesanan Dibuat' },
  { status: 'confirmed', label: 'Dikonfirmasi' },
  { status: 'processing', label: 'Sedang Diproses' },
  { status: 'ready', label: 'Siap Diambil' },
  { status: 'completed', label: 'Selesai' },
];

const statusOrder = ['pending', 'confirmed', 'processing', 'ready', 'completed'];

export default function OrderDetail({ order, navigate, isAdmin, onStatusChange }: Props) {
  const currentIdx = statusOrder.indexOf(order.status);
  const isCancelled = order.status === 'cancelled';

  const adminStatuses: Order['status'][] = ['pending', 'confirmed', 'processing', 'ready', 'completed', 'cancelled'];

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => navigate(isAdmin ? 'admin-orders' : 'user-order-history')} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-navy-900">Detail Pesanan</h1>
            <p className="text-slate-500 text-sm">{order.id}</p>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>

        <div className="space-y-5">
          {/* Customer */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <h3 className="font-bold text-navy-900 mb-3">Informasi Pemesan</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><span className="text-slate-400">Nama</span><div className="font-medium text-navy-900">{order.userName}</div></div>
              <div><span className="text-slate-400">NIM</span><div className="font-medium text-navy-900">{order.userNim}</div></div>
              <div><span className="text-slate-400">Email</span><div className="font-medium text-navy-900">{order.userEmail}</div></div>
              <div><span className="text-slate-400">Tanggal</span><div className="font-medium text-navy-900">{fmtDate(order.date)}</div></div>
            </div>
          </div>

          {/* Items */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <h3 className="font-bold text-navy-900 mb-3">Item Pesanan</h3>
            <div className="space-y-3">
              {order.items.map(item => (
                <div key={item.id} className="flex items-start gap-3 py-2 border-b border-slate-50 last:border-0">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {item.image ? <img src={item.image} alt="" className="w-full h-full object-cover" /> : <span className="text-lg">{item.serviceType === 'print' ? '🖨️' : item.serviceType === 'fotocopy' ? '📋' : '📚'}</span>}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-navy-900">{item.name}</div>
                    <div className="text-xs text-slate-400">{item.type === 'product' ? 'Produk ATK' : 'Layanan'}</div>
                    {item.serviceSpec && 'fileName' in item.serviceSpec && item.serviceSpec.fileName && (
                      <div className="text-xs text-navy-600 mt-1 flex items-center gap-1">
                        <span>📄</span> {item.serviceSpec.fileName}
                        {isAdmin && <button className="ml-2 text-navy-600 underline">Unduh</button>}
                      </div>
                    )}
                    {item.serviceSpec && 'paperSize' in item.serviceSpec && (
                      <div className="text-xs text-slate-400 mt-1">
                        {(item.serviceSpec as any).paperSize} • {'color' in item.serviceSpec ? ((item.serviceSpec as any).color === 'bw' ? 'Hitam Putih' : 'Warna') : ''} • {(item.serviceSpec as any).copies} kopi
                      </div>
                    )}
                    {item.serviceSpec && 'bindType' in item.serviceSpec && (
                      <div className="text-xs text-slate-400 mt-1">
                        Jilid {(item.serviceSpec as any).bindType} • Cover {(item.serviceSpec as any).coverColor} • {(item.serviceSpec as any).copies} kopi
                      </div>
                    )}
                  </div>
                  <div className="text-sm font-semibold text-navy-700">{fmt(item.price * item.quantity)}</div>
                </div>
              ))}
            </div>
            <div className="pt-3 mt-2 border-t border-slate-100 flex justify-between font-bold text-navy-900">
              <span>Total</span>
              <span>{fmt(order.total)}</span>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <h3 className="font-bold text-navy-900 mb-3">Pembayaran</h3>
            <div className="flex items-center justify-between text-sm">
              <div>
                <span className="text-slate-400">Metode</span>
                <div className="font-medium text-navy-900 mt-0.5">{order.paymentMethod === 'online' ? '💳 Online' : '🏪 Bayar di Koperasi'}</div>
              </div>
              <PaymentStatusBadge status={order.paymentStatus} />
            </div>
          </div>

          {/* Status Timeline */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <h3 className="font-bold text-navy-900 mb-4">Tracking Status</h3>
            {isCancelled ? (
              <div className="flex items-center gap-3 p-3 bg-danger-50 rounded-xl">
                <span className="text-2xl">❌</span>
                <div>
                  <div className="font-semibold text-danger-700">Pesanan Dibatalkan</div>
                  <div className="text-xs text-danger-500">Hubungi koperasi untuk informasi lebih lanjut</div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {timeline.map((step, idx) => {
                  const done = idx <= currentIdx;
                  const active = idx === currentIdx;
                  return (
                    <div key={step.status} className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        done ? 'bg-success-500 text-white' : 'bg-slate-100 text-slate-400'
                      } ${active ? 'ring-2 ring-success-300 ring-offset-2' : ''}`}>
                        {done ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg> : <span className="text-xs">{idx + 1}</span>}
                      </div>
                      <div className={`flex-1 ${done ? 'text-navy-900 font-medium' : 'text-slate-400'}`}>{step.label}</div>
                      {active && <span className="text-xs text-success-600 font-semibold">Saat ini</span>}
                    </div>
                  );
                })}
              </div>
            )}

            {isAdmin && onStatusChange && (
              <div className="mt-5 pt-4 border-t border-slate-100">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Ubah Status Pesanan</label>
                <div className="flex gap-2">
                  <select
                    value={order.status}
                    onChange={e => onStatusChange(e.target.value as Order['status'])}
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-500"
                  >
                    {adminStatuses.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select>
                  <button className="px-4 py-2 bg-navy-900 text-white rounded-xl text-sm font-medium hover:bg-navy-800 transition-colors">
                    Update
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
