import { useState } from 'react';
import { mockCategories } from '../../data/mockData';
import type { Category } from '../../types';

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: '', status: 'active' as 'active' | 'inactive' });
  const [editing, setEditing] = useState<Category | null>(null);

  const openAdd = () => { setForm({ name: '', status: 'active' }); setEditing(null); setModal(true); };
  const openEdit = (c: Category) => { setForm({ name: c.name, status: c.status }); setEditing(c); setModal(true); };

  const handleSave = () => {
    if (editing) {
      setCategories(prev => prev.map(c => c.id === editing.id ? { ...c, ...form } : c));
    } else {
      setCategories(prev => [...prev, { id: `c${Date.now()}`, name: form.name, productCount: 0, status: form.status }]);
    }
    setModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus kategori ini?')) setCategories(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy-900">Manajemen Kategori</h1>
        <button onClick={openAdd} className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-sm font-semibold transition-colors">+ Tambah Kategori</button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              {['Nama Kategori', 'Jumlah Produk', 'Status', 'Aksi'].map(h => (
                <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map(c => (
              <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4 font-semibold text-sm text-navy-900">{c.name}</td>
                <td className="py-3 px-4 text-sm text-slate-600">{c.productCount} produk</td>
                <td className="py-3 px-4">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${c.status === 'active' ? 'bg-success-100 text-success-700' : 'bg-slate-100 text-slate-500'}`}>
                    {c.status === 'active' ? 'Aktif' : 'Nonaktif'}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(c)} className="px-3 py-1.5 bg-navy-50 text-navy-700 hover:bg-navy-100 rounded-lg text-xs font-medium transition-colors">Edit</button>
                    <button onClick={() => handleDelete(c.id)} className="px-3 py-1.5 bg-danger-50 text-danger-700 hover:bg-danger-100 rounded-lg text-xs font-medium transition-colors">Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h2 className="text-lg font-bold text-navy-900 mb-5">{editing ? 'Edit Kategori' : 'Tambah Kategori'}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Kategori</label>
                <input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as any }))}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-500">
                  <option value="active">Aktif</option>
                  <option value="inactive">Nonaktif</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setModal(false)} className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-medium">Batal</button>
              <button onClick={handleSave} className="flex-1 py-2.5 bg-navy-900 text-white rounded-xl text-sm font-semibold hover:bg-navy-800 transition-colors">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
