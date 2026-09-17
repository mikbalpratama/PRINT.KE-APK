import { useState } from 'react';
import { mockProducts } from '../../data/mockData';
import { StockBadge } from '../../components/ui/Badge';
import type { Product } from '../../types';

const fmt = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

type ModalMode = 'add' | 'edit' | null;

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [modal, setModal] = useState<ModalMode>(null);
  const [editing, setEditing] = useState<Product | null>(null);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({
    name: '', category: '', price: '', stock: '', minStock: '', description: '', status: 'active' as 'active' | 'inactive',
  });

  const openAdd = () => {
    setForm({ name: '', category: '', price: '', stock: '', minStock: '', description: '', status: 'active' });
    setEditing(null);
    setModal('add');
  };

  const openEdit = (p: Product) => {
    setForm({ name: p.name, category: p.category, price: String(p.price), stock: String(p.stock), minStock: String(p.minStock), description: p.description, status: p.status });
    setEditing(p);
    setModal('edit');
  };

  const handleSave = () => {
    if (modal === 'add') {
      const newP: Product = {
        id: `p${Date.now()}`, name: form.name, category: form.category, price: Number(form.price),
        stock: Number(form.stock), minStock: Number(form.minStock), description: form.description,
        image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=200&h=200&fit=crop', status: form.status,
      };
      setProducts(prev => [...prev, newP]);
    } else if (editing) {
      setProducts(prev => prev.map(p => p.id === editing.id ? { ...p, ...form, price: Number(form.price), stock: Number(form.stock), minStock: Number(form.minStock) } : p));
    }
    setModal(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Yakin ingin menghapus produk ini?')) setProducts(prev => prev.filter(p => p.id !== id));
  };

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy-900">Manajemen Produk</h1>
        <button onClick={openAdd} className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-sm font-semibold transition-colors">
          + Tambah Produk
        </button>
      </div>

      <div className="relative mb-5">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari produk..."
          className="w-full max-w-xs pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 bg-white" />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {['Foto', 'Produk', 'Kategori', 'Harga', 'Stok', 'Status', 'Aksi'].map(h => (
                  <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4">
                    <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-slate-50" />
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm font-semibold text-navy-900">{p.name}</div>
                    <div className="text-xs text-slate-400 truncate max-w-[150px]">{p.description}</div>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600">{p.category}</td>
                  <td className="py-3 px-4 text-sm font-semibold text-navy-700">{fmt(p.price)}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-700">{p.stock}</span>
                      <StockBadge stock={p.stock} minStock={p.minStock} />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${p.status === 'active' ? 'bg-success-100 text-success-700' : 'bg-slate-100 text-slate-500'}`}>
                      {p.status === 'active' ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(p)} className="px-3 py-1.5 bg-navy-50 text-navy-700 hover:bg-navy-100 rounded-lg text-xs font-medium transition-colors">Edit</button>
                      <button onClick={() => handleDelete(p.id)} className="px-3 py-1.5 bg-danger-50 text-danger-700 hover:bg-danger-100 rounded-lg text-xs font-medium transition-colors">Hapus</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-navy-900 mb-5">{modal === 'add' ? 'Tambah Produk Baru' : 'Edit Produk'}</h2>
            <div className="space-y-4">
              {[
                { label: 'Nama Produk', key: 'name', type: 'text' },
                { label: 'Kategori', key: 'category', type: 'text' },
                { label: 'Harga', key: 'price', type: 'number' },
                { label: 'Stok', key: 'stock', type: 'number' },
                { label: 'Stok Minimum', key: 'minStock', type: 'number' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{f.label}</label>
                  <input type={f.type} value={form[f.key as keyof typeof form]}
                    onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-500" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi</label>
                <textarea value={form.description} onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))} rows={3}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select value={form.status} onChange={e => setForm(prev => ({ ...prev, status: e.target.value as 'active' | 'inactive' }))}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-500">
                  <option value="active">Aktif</option>
                  <option value="inactive">Nonaktif</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setModal(null)} className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors">Batal</button>
              <button onClick={handleSave} className="flex-1 py-2.5 bg-navy-900 text-white rounded-xl text-sm font-semibold hover:bg-navy-800 transition-colors">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
