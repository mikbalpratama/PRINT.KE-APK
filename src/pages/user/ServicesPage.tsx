import type { Page } from '../../types';

interface Props {
  navigate: (page: Page) => void;
}

const services = [
  { icon: '🖨️', name: 'Print', desc: 'Cetak dokumen hitam putih maupun berwarna dengan kualitas terbaik.', price: 'Mulai Rp 500/lembar', page: 'user-service-print' as Page, color: 'bg-blue-500' },
  { icon: '📋', name: 'Fotocopy', desc: 'Fotocopy cepat dan hemat untuk semua jenis dokumen.', price: 'Rp 300/lembar', page: 'user-service-fotocopy' as Page, color: 'bg-indigo-500' },
  { icon: '📚', name: 'Jilid', desc: 'Jilid spiral, lakban, atau hardcover untuk laporan dan skripsi.', price: 'Mulai Rp 5.000', page: 'user-service-jilid' as Page, color: 'bg-purple-500' },
  { icon: '📡', name: 'Scan', desc: 'Scan dokumen ke format PDF atau JPG berkualitas tinggi.', price: 'Rp 1.000/halaman', page: 'user-services' as Page, color: 'bg-cyan-500' },
  { icon: '💳', name: 'Laminasi', desc: 'Laminasi kartu, foto, atau dokumen agar lebih tahan lama.', price: 'Rp 3.000/lembar', page: 'user-services' as Page, color: 'bg-emerald-500' },
];

export default function ServicesPage({ navigate }: Props) {
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-navy-900">Layanan Kami</h1>
          <p className="text-slate-500 mt-1">Pilih layanan yang Anda butuhkan</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map(s => (
            <div key={s.name} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all group">
              <div className={`${s.color} h-2`} />
              <div className="p-6">
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="text-lg font-bold text-navy-900 mb-2">{s.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-navy-700 font-semibold text-sm">{s.price}</span>
                  <button
                    onClick={() => navigate(s.page)}
                    className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white text-sm font-medium rounded-xl transition-colors"
                  >
                    Pesan
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
