import { useState } from 'react';
import { mockServices } from '../../data/mockData';
import type { Service } from '../../types';

const fmt = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState({ name: '', description: '', price: '', unit: '', status: 'active' as 'active' | 'inactive' });

  const openAdd = () => { setForm({ name: '', description: '', price: '', unit: '', status: 'active' }); setEditing(null); setModal(true); };
  const openEdit = (s: Service) => { setForm({ name: s.name, description: s.description, price: String(s.price), unit: s.unit, status: s.status }); setEditing(s); setModal(true); };

  const handleSave = () => {
    if (editing) {
      setServices(prev => prev.map(s => s.id === editing.id ? { ...s, ...form, price: Number(form.price) } : s));
    } else {
      setServices(prev => [...prev, { id: `s${Date.now()}`, icon: '📄', ...form, price: Number(form.price) }]);
    }
    setModal(false);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy-900">Manajemen Layanan</h1>
        <button onClick={openAdd} className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-sm font-semibold transition-colors">+ Tambah Layanan</button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              {['Layanan', 'Deskripsi', 'Harga', 'Unit', 'Status', 'Aksi'].map(h => (
                <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {services.map(s => (
              <tr key={s.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{s.icon}</span>
                    <span className="font-semibold text-sm text-navy-900">{s.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-slate-500 max-w-[200px] truncate">{s.description}</td>
                <td className="py-3 px-4 text-sm font-semibold text-navy-700">{fmt(s.price)}</td>
                <td className="py-3 px-4 text-sm text-slate-600">/{s.unit}</td>
                <td className="py-3 px-4">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${s.status === 'active' ? 'bg-success-100 text-success-700' : 'bg-slate-100 text-slate-500'}`}>
                    {s.status === 'active' ? 'Aktif' : 'Nonaktif'}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button onClick={() => openEdit(s)} className="px-3 py-1.5 bg-navy-50 text-navy-700 hover:bg-navy-100 rounded-lg text-xs font-medium transition-colors">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-lg font-bold text-navy-900 mb-5">{editing ? 'Edit Layanan' : 'Tambah Layanan'}</h2>
            <div className="space-y-4">
              {[
                { label: 'Nama Layanan', key: 'name', type: 'text' },
                { label: 'Deskripsi', key: 'description', type: 'text' },
                { label: 'Harga (Rp)', key: 'price', type: 'number' },
                { label: 'Unit (lembar/halaman/dokumen)', key: 'unit', type: 'text' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{f.label}</label>
                  <input type={f.type} value={form[f.key as keyof typeof form]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-500" />
                </div>
              ))}
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
              <button onClick={() => setModal(false)} className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm">Batal</button>
              <button onClick={handleSave} className="flex-1 py-2.5 bg-navy-900 text-white rounded-xl text-sm font-semibold hover:bg-navy-800 transition-colors">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
