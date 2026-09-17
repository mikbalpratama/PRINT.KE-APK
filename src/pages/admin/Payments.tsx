import { mockOrders } from '../../data/mockData';
import { PaymentStatusBadge } from '../../components/ui/Badge';

const fmt = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;
const fmtDate = (d: string) => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

export default function AdminPayments() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-navy-900 mb-6">Data Pembayaran</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {['ID Pembayaran', 'ID Pesanan', 'Customer', 'Metode', 'Jumlah', 'Status', 'Tanggal'].map(h => (
                  <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((o, i) => (
                <tr key={o.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 text-sm font-semibold text-navy-900">PAY-{(i + 1).toString().padStart(3, '0')}</td>
                  <td className="py-3 px-4 text-sm text-slate-600">{o.id}</td>
                  <td className="py-3 px-4">
                    <div className="text-sm font-medium text-slate-700">{o.userName}</div>
                    <div className="text-xs text-slate-400">{o.userNim}</div>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600">
                    {o.paymentMethod === 'online' ? '💳 Online' : '🏪 Di Koperasi'}
                  </td>
                  <td className="py-3 px-4 text-sm font-semibold text-navy-700">{fmt(o.total)}</td>
                  <td className="py-3 px-4"><PaymentStatusBadge status={o.paymentStatus} /></td>
                  <td className="py-3 px-4 text-xs text-slate-500">{fmtDate(o.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
