import type { Page } from '../../types';

interface Props {
  orderId: string;
  navigate: (page: Page) => void;
}

export default function OrderSuccess({ orderId, navigate }: Props) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-10 w-full max-w-md text-center">
        <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-navy-900 mb-2">Pesanan Berhasil Dibuat!</h1>
        <p className="text-slate-500 mb-6">Pesanan Anda sedang diproses. Kami akan segera mengkonfirmasi pesanan Anda.</p>

        <div className="bg-slate-50 rounded-2xl p-4 mb-6 text-left space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Nomor Pesanan</span>
            <span className="font-bold text-navy-900">{orderId}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Status</span>
            <span className="font-semibold text-warning-600">Menunggu Konfirmasi</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Estimasi Selesai</span>
            <span className="font-semibold text-navy-900">1–2 jam kerja</span>
          </div>
        </div>

        <div className="space-y-3">
          <button onClick={() => navigate('user-order-history')}
            className="w-full py-3 bg-navy-900 hover:bg-navy-800 text-white rounded-xl font-semibold text-sm transition-colors">
            Lihat Pesanan Saya
          </button>
          <button onClick={() => navigate('user-dashboard')}
            className="w-full py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl font-medium text-sm transition-colors">
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </div>
  );
}
