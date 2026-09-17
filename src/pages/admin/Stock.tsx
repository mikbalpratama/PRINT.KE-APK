import { useState } from 'react';
import { mockProducts, mockStockHistory } from '../../data/mockData';
import { StockBadge } from '../../components/ui/Badge';
import type { Product } from '../../types';

export default function AdminStock() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [modal, setModal] = useState<Product | null>(null);
  const [change, setChange] = useState('');
  const [reason, setReason] = useState('');

  const handleUpdate = () => {
    if (!modal || !change) return;
    setProducts(prev => prev.map(p => p.id === modal.id ? { ...p, stock: Math.max(0, p.stock + Number(change)) } : p));
    setModal(null);
    setChange('');
    setReason('');
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-navy-900">Manajemen Stok</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {['Produk', 'Stok Saat Ini', 'Stok Minimum', 'Status', 'Aksi'].map(h => (
                  <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-9 h-9 rounded-lg object-cover bg-slate-50" />
                      <div>
                        <div className="text-sm font-semibold text-navy-900">{p.name}</div>
                        <div className="text-xs text-slate-400">{p.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-lg font-bold ${p.stock === 0 ? 'text-danger-600' : p.stock <= p.minStock ? 'text-warning-600' : 'text-success-600'}`}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600">{p.minStock}</td>
                  <td className="py-3 px-4"><StockBadge stock={p.stock} minStock={p.minStock} /></td>
                  <td className="py-3 px-4">
                    <button onClick={() => setModal(p)} className="px-3 py-1.5 bg-navy-50 text-navy-700 hover:bg-navy-100 rounded-lg text-xs font-medium transition-colors">
                      Update Stok
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stock History */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
        <h3 className="font-bold text-navy-900 mb-4">Riwayat Perubahan Stok</h3>
        <div className="space-y-3">
          {mockStockHistory.map(h => (
            <div key={h.id} className="flex items-center gap-4 py-2 border-b border-slate-50 last:border-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${h.change > 0 ? 'bg-success-100 text-success-700' : 'bg-danger-100 text-danger-700'}`}>
                {h.change > 0 ? '+' : '−'}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-navy-900">{h.productName}</div>
                <div className="text-xs text-slate-400">{h.reason} • {h.admin}</div>
              </div>
              <div className={`text-sm font-bold ${h.change > 0 ? 'text-success-600' : 'text-danger-600'}`}>
                {h.change > 0 ? '+' : ''}{h.change}
              </div>
              <div className="text-xs text-slate-400 whitespace-nowrap">
                {new Date(h.date).toLocaleDateString('id-ID')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h2 className="text-lg font-bold text-navy-900 mb-1">Update Stok</h2>
            <p className="text-slate-500 text-sm mb-5">{modal.name} — Stok saat ini: <strong>{modal.stock}</strong></p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Perubahan Stok</label>
                <input type="number" value={change} onChange={e => setChange(e.target.value)}
                  placeholder="Misal: 50 (tambah) atau -5 (kurang)"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Alasan</label>
                <input type="text" value={reason} onChange={e => setReason(e.target.value)}
                  placeholder="Misal: Restok dari supplier"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-500" />
              </div>
              {change && (
                <div className="p-3 bg-slate-50 rounded-xl text-sm text-slate-600">
                  Stok baru: <strong>{Math.max(0, modal.stock + Number(change))}</strong>
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setModal(null)} className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm">Batal</button>
              <button onClick={handleUpdate} className="flex-1 py-2.5 bg-navy-900 text-white rounded-xl text-sm font-semibold hover:bg-navy-800 transition-colors">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
