import { useState, useRef } from 'react';
import type { Page, CartItem, JilidSpec } from '../../types';

interface Props {
  navigate: (page: Page) => void;
  addToCart: (item: CartItem) => void;
}

const prices: Record<string, number> = { spiral: 5000, lakban: 3000, hardcover: 50000 };

export default function ServiceDetailJilid({ navigate, addToCart }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<JilidSpec>({
    fileName: '', bindType: 'spiral', size: 'A4', coverColor: 'Biru', copies: 1, notes: '',
  });

  const estimated = prices[form.bindType] * form.copies;

  const handleAddToCart = () => {
    addToCart({
      id: `svc-jilid-${Date.now()}`,
      type: 'service',
      name: `Jilid ${form.bindType.charAt(0).toUpperCase() + form.bindType.slice(1)} (${form.copies} kopi)`,
      price: estimated,
      quantity: 1,
      serviceType: 'jilid',
      serviceSpec: form,
    });
    navigate('user-cart');
  };

  const bindTypes = [
    { key: 'spiral', label: '🌀 Spiral', price: 'Rp 5.000' },
    { key: 'lakban', label: '📎 Lakban', price: 'Rp 3.000' },
    { key: 'hardcover', label: '📖 Hardcover', price: 'Rp 50.000' },
  ];

  const colors = ['Biru', 'Merah', 'Hijau', 'Hitam', 'Putih', 'Kuning'];

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => navigate('user-services')} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-bold text-navy-900">📚 Pesan Jilid</h1>
            <p className="text-slate-500 text-sm">Isi form pemesanan jilid dokumen</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Upload File (Opsional)</label>
            <div onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-slate-200 hover:border-navy-300 rounded-xl p-6 text-center cursor-pointer transition-all">
              {form.fileName ? (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">📄 {form.fileName}</span>
                  <button onClick={e => { e.stopPropagation(); setForm(f => ({ ...f, fileName: '' })); }} className="text-danger-500 text-sm">Hapus</button>
                </div>
              ) : (
                <><div className="text-3xl mb-2">📤</div><p className="text-slate-500 text-sm">Klik untuk upload file</p></>
              )}
            </div>
            <input ref={fileRef} type="file" className="hidden" onChange={e => e.target.files?.[0] && setForm(f => ({ ...f, fileName: e.target.files![0].name }))} />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">Jenis Jilid</label>
            <div className="space-y-2">
              {bindTypes.map(bt => (
                <label key={bt.key} className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                  form.bindType === bt.key ? 'border-navy-500 bg-navy-50' : 'border-slate-200 hover:border-navy-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="bindType" checked={form.bindType === bt.key}
                      onChange={() => setForm(f => ({ ...f, bindType: bt.key as JilidSpec['bindType'] }))}
                      className="text-navy-600" />
                    <span className="font-medium text-sm text-slate-700">{bt.label}</span>
                  </div>
                  <span className="text-navy-600 font-semibold text-sm">{bt.price}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Ukuran</label>
              <select value={form.size} onChange={e => setForm(f => ({ ...f, size: e.target.value as JilidSpec['size'] }))}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-500">
                {['A4', 'A5', 'F4'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Jumlah Kopi</label>
              <input type="number" min={1} value={form.copies}
                onChange={e => setForm(f => ({ ...f, copies: Math.max(1, parseInt(e.target.value) || 1) }))}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Warna Cover</label>
            <div className="flex flex-wrap gap-2">
              {colors.map(c => (
                <button key={c} onClick={() => setForm(f => ({ ...f, coverColor: c }))}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                    form.coverColor === c ? 'bg-navy-900 text-white border-navy-900' : 'border-slate-200 text-slate-600 hover:border-navy-300'
                  }`}>{c}</button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Catatan</label>
            <textarea rows={2} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              placeholder="Instruksi khusus..."
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 resize-none" />
          </div>

          <div className="bg-navy-50 rounded-xl p-4">
            <div className="text-sm text-slate-600 mb-1">Rp {prices[form.bindType].toLocaleString()} × {form.copies} kopi</div>
            <div className="text-2xl font-bold text-navy-900">Rp {estimated.toLocaleString('id-ID')}</div>
          </div>

          <button onClick={handleAddToCart} className="w-full py-3 bg-navy-900 hover:bg-navy-800 text-white rounded-xl font-semibold transition-colors">
            Tambah ke Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}
