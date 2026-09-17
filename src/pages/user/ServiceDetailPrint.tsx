import { useState, useRef } from 'react';
import type { Page, CartItem, PrintSpec } from '../../types';

interface Props {
  navigate: (page: Page) => void;
  addToCart: (item: CartItem) => void;
}

export default function ServiceDetailPrint({ navigate, addToCart }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [form, setForm] = useState<PrintSpec>({
    fileName: '', paperSize: 'A4', color: 'bw', sides: 'single', pages: 1, copies: 1, notes: '',
  });

  const pricePerPage = form.color === 'bw' ? 500 : 1500;
  const sideMultiplier = form.sides === 'double' ? 0.6 : 1;
  const estimated = Math.ceil(form.pages * form.copies * pricePerPage * sideMultiplier);

  const handleFile = (file: File) => setForm(f => ({ ...f, fileName: file.name }));

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleAddToCart = () => {
    addToCart({
      id: `svc-print-${Date.now()}`,
      type: 'service',
      name: `Print ${form.color === 'bw' ? 'Hitam Putih' : 'Warna'} (${form.pages} hal x ${form.copies} kopi)`,
      price: estimated,
      quantity: 1,
      serviceType: 'print',
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
            <h1 className="text-xl font-bold text-navy-900">🖨️ Pesan Print</h1>
            <p className="text-slate-500 text-sm">Isi form pemesanan cetak dokumen</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">
          {/* File Upload */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Upload Dokumen</label>
            <div
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                dragging ? 'border-navy-500 bg-navy-50' : 'border-slate-200 hover:border-navy-300 hover:bg-slate-50'
              }`}
            >
              {form.fileName ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📄</span>
                    <span className="text-sm font-medium text-slate-700">{form.fileName}</span>
                  </div>
                  <button onClick={e => { e.stopPropagation(); setForm(f => ({ ...f, fileName: '' })); }}
                    className="text-danger-500 hover:text-danger-700 text-sm font-medium">Hapus</button>
                </div>
              ) : (
                <>
                  <div className="text-4xl mb-3">📤</div>
                  <p className="text-slate-500 text-sm">Drag & drop file atau <span className="text-navy-600 font-medium">klik untuk pilih</span></p>
                  <p className="text-slate-400 text-xs mt-1">PDF, DOC, DOCX, JPG, PNG</p>
                </>
              )}
            </div>
            <input ref={fileRef} type="file" className="hidden" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
          </div>

          {/* Paper Size */}
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

          {/* Color */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Pilihan Warna</label>
            <div className="flex gap-3">
              <button onClick={() => setForm(f => ({ ...f, color: 'bw' }))}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                  form.color === 'bw' ? 'bg-navy-900 text-white border-navy-900' : 'border-slate-200 text-slate-600 hover:border-navy-300'
                }`}>⬛ Hitam Putih — Rp 500</button>
              <button onClick={() => setForm(f => ({ ...f, color: 'color' }))}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                  form.color === 'color' ? 'bg-navy-900 text-white border-navy-900' : 'border-slate-200 text-slate-600 hover:border-navy-300'
                }`}>🎨 Warna — Rp 1.500</button>
            </div>
          </div>

          {/* Sides */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Sisi Cetak</label>
            <div className="flex gap-3">
              <button onClick={() => setForm(f => ({ ...f, sides: 'single' }))}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                  form.sides === 'single' ? 'bg-navy-900 text-white border-navy-900' : 'border-slate-200 text-slate-600 hover:border-navy-300'
                }`}>Satu Sisi</button>
              <button onClick={() => setForm(f => ({ ...f, sides: 'double' }))}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                  form.sides === 'double' ? 'bg-navy-900 text-white border-navy-900' : 'border-slate-200 text-slate-600 hover:border-navy-300'
                }`}>Dua Sisi</button>
            </div>
          </div>

          {/* Pages & Copies */}
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

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Catatan Tambahan</label>
            <textarea rows={3} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              placeholder="Misal: cetak dengan kualitas tinggi, margin lebih lebar..."
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 resize-none" />
          </div>

          {/* Estimate */}
          <div className="bg-navy-50 rounded-xl p-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-600">{form.pages} hal × {form.copies} kopi × Rp {pricePerPage.toLocaleString()}</span>
              <span className="font-medium text-navy-900">Estimasi Harga</span>
            </div>
            <div className="text-2xl font-bold text-navy-900">Rp {estimated.toLocaleString('id-ID')}</div>
          </div>

          <button onClick={handleAddToCart}
            className="w-full py-3 bg-navy-900 hover:bg-navy-800 text-white rounded-xl font-semibold transition-colors">
            Tambah ke Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}
