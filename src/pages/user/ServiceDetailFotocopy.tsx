import { useState, useRef } from 'react';
import type { Page, CartItem, FotocopySpec } from '../../types';

interface Props {
  navigate: (page: Page) => void;
  addToCart: (item: CartItem) => void;
}

export default function ServiceDetailFotocopy({ navigate, addToCart }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<FotocopySpec>({
    fileName: '', pages: 1, copies: 1, paperSize: 'A4', color: 'bw', notes: '',
  });

  const price = form.color === 'bw' ? 300 : 800;
  const estimated = form.pages * form.copies * price;

  const handleAddToCart = () => {
    addToCart({
      id: `svc-foto-${Date.now()}`,
      type: 'service',
      name: `Fotocopy ${form.color === 'bw' ? 'Hitam Putih' : 'Warna'} (${form.pages} hal x ${form.copies} kopi)`,
      price: estimated,
      quantity: 1,
      serviceType: 'fotocopy',
      serviceSpec: form,
    });
    navigate('user-cart');
  };

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
            <h1 className="text-xl font-bold text-navy-900">📋 Pesan Fotocopy</h1>
            <p className="text-slate-500 text-sm">Isi form pemesanan fotocopy</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Upload Dokumen (Opsional)</label>
            <div onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-slate-200 hover:border-navy-300 rounded-xl p-6 text-center cursor-pointer transition-all">
              {form.fileName ? (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">📄 {form.fileName}</span>
                  <button onClick={e => { e.stopPropagation(); setForm(f => ({ ...f, fileName: '' })); }}
                    className="text-danger-500 text-sm">Hapus</button>
                </div>
              ) : (
                <><div className="text-3xl mb-2">📤</div><p className="text-slate-500 text-sm">Klik untuk upload dokumen</p></>
              )}
            </div>
            <input ref={fileRef} type="file" className="hidden" onChange={e => e.target.files?.[0] && setForm(f => ({ ...f, fileName: e.target.files![0].name }))} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Jumlah Halaman</label>
              <input type="number" min={1} value={form.pages}
                onChange={e => setForm(f => ({ ...f, pages: Math.max(1, parseInt(e.target.value) || 1) }))}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Jumlah Kopi</label>
              <input type="number" min={1} value={form.copies}
                onChange={e => setForm(f => ({ ...f, copies: Math.max(1, parseInt(e.target.value) || 1) }))}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Ukuran Kertas</label>
            <div className="flex gap-3">
              {(['A4', 'A5', 'F4'] as const).map(s => (
                <button key={s} onClick={() => setForm(f => ({ ...f, paperSize: s }))}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                    form.paperSize === s ? 'bg-navy-900 text-white border-navy-900' : 'border-slate-200 text-slate-600 hover:border-navy-300'
                  }`}>{s}</button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Pilihan Warna</label>
            <div className="flex gap-3">
              <button onClick={() => setForm(f => ({ ...f, color: 'bw' }))}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all ${form.color === 'bw' ? 'bg-navy-900 text-white border-navy-900' : 'border-slate-200 text-slate-600'}`}>
                ⬛ Hitam Putih — Rp 300
              </button>
              <button onClick={() => setForm(f => ({ ...f, color: 'color' }))}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all ${form.color === 'color' ? 'bg-navy-900 text-white border-navy-900' : 'border-slate-200 text-slate-600'}`}>
                🎨 Warna — Rp 800
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Catatan</label>
            <textarea rows={2} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              placeholder="Instruksi khusus..." className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 resize-none" />
          </div>

          <div className="bg-navy-50 rounded-xl p-4">
            <div className="text-sm text-slate-600 mb-1">{form.pages} hal × {form.copies} kopi × Rp {price.toLocaleString()}</div>
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
