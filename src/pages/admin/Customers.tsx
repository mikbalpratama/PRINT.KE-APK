import { mockUsers, mockOrders } from '../../data/mockData';

const fmt = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

export default function AdminCustomers() {
  const customers = mockUsers.filter(u => u.role === 'user').map(u => {
    const orders = mockOrders.filter(o => o.userId === u.id);
    return {
      ...u,
      orderCount: orders.length,
      totalTransaction: orders.reduce((sum, o) => sum + o.total, 0),
    };
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-navy-900 mb-6">Data Pelanggan</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {['Pelanggan', 'NIM', 'Kontak', 'Pesanan', 'Total Transaksi', 'Status'].map(h => (
                  <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customers.map(c => (
                <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-navy-900 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {c.name[0]}
                      </div>
                      <span className="font-semibold text-sm text-navy-900">{c.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600">{c.nim}</td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-slate-700">{c.email}</div>
                    <div className="text-xs text-slate-400">{c.phone}</div>
                  </td>
                  <td className="py-3 px-4 text-sm font-semibold text-navy-900">{c.orderCount} pesanan</td>
                  <td className="py-3 px-4 text-sm font-semibold text-navy-700">{fmt(c.totalTransaction)}</td>
                  <td className="py-3 px-4">
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-success-100 text-success-700">Aktif</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
