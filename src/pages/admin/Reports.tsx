import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { mockOrders, mockProducts, monthlyData } from '../../data/mockData';

const fmt = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

type Period = 'today' | 'week' | 'month' | 'custom';

export default function AdminReports() {
  const [period, setPeriod] = useState<Period>('month');

  const totalRevenue = mockOrders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = mockOrders.length;
  const completedOrders = mockOrders.filter(o => o.status === 'completed').length;

  const productSales = mockProducts
    .map(p => ({ name: p.name.substring(0, 15), sales: Math.floor(Math.random() * 50) + 5 }))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

  const periods: { label: string; value: Period }[] = [
    { label: 'Hari Ini', value: 'today' },
    { label: 'Minggu Ini', value: 'week' },
    { label: 'Bulan Ini', value: 'month' },
    { label: 'Custom', value: 'custom' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-navy-900">Laporan</h1>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
            {periods.map(p => (
              <button key={p.value} onClick={() => setPeriod(p.value)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${period === p.value ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                {p.label}
              </button>
            ))}
          </div>
          <button className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-sm font-semibold transition-colors">
            📥 Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Pendapatan', value: fmt(totalRevenue), icon: '💰', color: 'text-success-600' },
          { label: 'Total Pesanan', value: totalOrders, icon: '📦', color: 'text-navy-700' },
          { label: 'Pesanan Selesai', value: completedOrders, icon: '✅', color: 'text-success-700' },
          { label: 'Rata-rata/Pesanan', value: fmt(Math.round(totalRevenue / totalOrders)), icon: '📊', color: 'text-navy-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-slate-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h3 className="font-bold text-navy-900 mb-4">Grafik Pendapatan (6 Bulan)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `${v / 1000000}M`} />
              <Tooltip formatter={(v: any) => [`Rp ${Number(v).toLocaleString()}`, 'Pendapatan']} />
              <Bar dataKey="pendapatan" fill="#1e3a5f" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h3 className="font-bold text-navy-900 mb-4">Grafik Transaksi (6 Bulan)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v: any) => [v, 'Pesanan']} />
              <Line type="monotone" dataKey="pesanan" stroke="#2563eb" strokeWidth={2.5} dot={{ fill: '#2563eb', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products & Services */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h3 className="font-bold text-navy-900 mb-4">Produk Terlaris</h3>
          <div className="space-y-3">
            {productSales.map((p, i) => (
              <div key={p.name} className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-400 w-5">#{i + 1}</span>
                <div className="flex-1">
                  <div className="text-sm font-medium text-navy-900">{p.name}...</div>
                  <div className="h-1.5 bg-slate-100 rounded-full mt-1.5">
                    <div className="h-1.5 bg-navy-700 rounded-full" style={{ width: `${(p.sales / productSales[0].sales) * 100}%` }} />
                  </div>
                </div>
                <span className="text-sm font-semibold text-slate-600 flex-shrink-0">{p.sales} terjual</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h3 className="font-bold text-navy-900 mb-4">Layanan Terlaris</h3>
          <div className="space-y-3">
            {[
              { name: 'Print Hitam Putih', count: 142 },
              { name: 'Fotocopy', count: 98 },
              { name: 'Jilid Spiral', count: 67 },
              { name: 'Print Warna', count: 45 },
              { name: 'Laminasi', count: 23 },
            ].map((s, i) => (
              <div key={s.name} className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-400 w-5">#{i + 1}</span>
                <div className="flex-1">
                  <div className="text-sm font-medium text-navy-900">{s.name}</div>
                  <div className="h-1.5 bg-slate-100 rounded-full mt-1.5">
                    <div className="h-1.5 bg-blue-500 rounded-full" style={{ width: `${(s.count / 142) * 100}%` }} />
                  </div>
                </div>
                <span className="text-sm font-semibold text-slate-600 flex-shrink-0">{s.count}x</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
