import type { Page } from '../types';

interface Props {
  navigate: (page: Page) => void;
}

const services = [
  { icon: '🖨️', name: 'Print', desc: 'HVS, A4, Berwarna' },
  { icon: '📋', name: 'Fotocopy', desc: 'Cepat & Murah' },
  { icon: '📚', name: 'Jilid', desc: 'Spiral & Hardcover' },
  { icon: '📡', name: 'Scan', desc: 'PDF & JPG' },
];

const features = [
  { icon: '📱', title: 'Pesan dari Mana Saja', desc: 'Akses layanan kapan saja dan di mana saja melalui browser.' },
  { icon: '📤', title: 'Upload Dokumen Mudah', desc: 'Upload file dengan mudah, drag & drop langsung dari perangkat.' },
  { icon: '🔔', title: 'Status Pesanan Realtime', desc: 'Pantau status pesanan secara langsung tanpa perlu menghubungi koperasi.' },
  { icon: '💳', title: 'Pembayaran Fleksibel', desc: 'Bayar online atau langsung di koperasi sesuai preferensi.' },
];

const products = [
  { img: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=200&h=200&fit=crop&auto=format', name: 'Pulpen & Pensil', price: 'Mulai Rp 3.000' },
  { img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=200&fit=crop&auto=format', name: 'Buku Tulis', price: 'Mulai Rp 8.000' },
  { img: 'https://images.unsplash.com/photo-1572715376701-98568319fd0b?w=200&h=200&fit=crop&auto=format', name: 'Kertas HVS', price: 'Mulai Rp 55.000' },
  { img: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=200&h=200&fit=crop&auto=format', name: 'Map & Folder', price: 'Mulai Rp 3.500' },
];

export default function LandingPage({ navigate }: Props) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-navy-900 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-navy-600 rounded-xl flex items-center justify-center font-bold text-lg">K</div>
            <div>
              <div className="font-bold text-lg leading-tight">KOPATK</div>
              <div className="text-navy-300 text-xs">Koperasi ATK Kampus</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('login')} className="px-4 py-2 text-sm text-navy-200 hover:text-white font-medium transition-colors">
              Masuk
            </button>
            <button onClick={() => navigate('register')} className="px-4 py-2 text-sm bg-navy-600 hover:bg-navy-500 rounded-lg font-medium transition-colors">
              Daftar
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-navy-800 rounded-full px-4 py-1.5 text-sm text-navy-200 mb-6">
              <span className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></span>
              Koperasi ATK Kampus Online
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
              Pesan ATK &<br />Layanan Print<br />
              <span className="text-navy-300">dengan Mudah</span>
            </h1>
            <p className="text-navy-200 text-lg mb-8 leading-relaxed">
              Koperasi ATK digital kampus. Pesan layanan print, fotocopy, jilid, dan beli produk ATK tanpa antri panjang.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => navigate('register')} className="px-6 py-3 bg-navy-600 hover:bg-navy-500 rounded-xl font-semibold transition-colors text-white">
                Mulai Sekarang
              </button>
              <button onClick={() => navigate('login')} className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-semibold transition-colors">
                Masuk ke Akun
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {services.map(s => (
              <div key={s.name} className="bg-white/10 backdrop-blur border border-white/10 rounded-2xl p-5 hover:bg-white/15 transition-colors">
                <div className="text-3xl mb-3">{s.icon}</div>
                <div className="font-semibold">{s.name}</div>
                <div className="text-navy-300 text-sm">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-navy-900 mb-10">Mengapa Memilih KOPATK?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {features.map(f => (
              <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-semibold text-navy-900 mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-navy-900">Produk ATK Tersedia</h2>
            <button onClick={() => navigate('login')} className="text-navy-600 hover:text-navy-800 text-sm font-medium">
              Lihat Semua →
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map(p => (
              <div key={p.name} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow group cursor-pointer" onClick={() => navigate('login')}>
                <div className="aspect-square overflow-hidden bg-slate-50">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-4">
                  <div className="font-semibold text-navy-900 text-sm">{p.name}</div>
                  <div className="text-navy-600 text-xs mt-1">{p.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-navy-900 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Siap Mulai Berbelanja?</h2>
        <p className="text-navy-200 mb-8 max-w-md mx-auto">Daftar sekarang dan nikmati kemudahan berbelanja ATK serta memesan layanan print kampus.</p>
        <button onClick={() => navigate('register')} className="px-8 py-3 bg-white text-navy-900 rounded-xl font-bold hover:bg-navy-100 transition-colors">
          Daftar Gratis
        </button>
      </section>

      <footer className="bg-navy-950 text-navy-400 text-center py-6 text-sm">
        © 2024 KOPATK — Koperasi ATK Kampus. Semua hak dilindungi.
      </footer>
    </div>
  );
}
