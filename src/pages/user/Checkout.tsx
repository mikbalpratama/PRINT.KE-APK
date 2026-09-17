import { useState } from 'react';
import type { Page, CartItem, User, PaymentMethod } from '../../types';

interface Props {
  cart: CartItem[];
  user: User;
  navigate: (page: Page) => void;
  onOrderSuccess: (orderId: string) => void;
  clearCart: () => void;
}

const fmt = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

export default function Checkout({ cart, user, navigate, onOrderSuccess, clearCart }: Props) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('koperasi');
  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const serviceFee = 2000;
  const total = subtotal + serviceFee;

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      const orderId = `ORD-${Date.now().toString().slice(-6)}`;
      clearCart();
      onOrderSuccess(orderId);
      navigate('user-order-success');
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => navigate('user-cart')} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-navy-900">Checkout</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-5">
            {/* User Info */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <h3 className="font-bold text-navy-900 mb-4">Informasi Pemesan</h3>
              <div className="space-y-2 text-sm">
                <div className="flex gap-3"><span className="text-slate-400 w-20">Nama</span><span className="font-medium text-navy-900">{user.name}</span></div>
                <div className="flex gap-3"><span className="text-slate-400 w-20">NIM</span><span className="font-medium text-navy-900">{user.nim}</span></div>
                <div className="flex gap-3"><span className="text-slate-400 w-20">Email</span><span className="font-medium text-navy-900">{user.email}</span></div>
                <div className="flex gap-3"><span className="text-slate-400 w-20">Telepon</span><span className="font-medium text-navy-900">{user.phone}</span></div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <h3 className="font-bold text-navy-900 mb-4">Detail Pesanan</h3>
              <div className="space-y-3">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-3 py-2 border-b border-slate-50 last:border-0">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {item.image ? <img src={item.image} alt="" className="w-full h-full object-cover" /> : <span className="text-lg">{item.serviceType === 'print' ? '🖨️' : item.serviceType === 'fotocopy' ? '📋' : '📚'}</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-navy-900 truncate">{item.name}</div>
                      {item.serviceSpec && 'fileName' in item.serviceSpec && item.serviceSpec.fileName && (
                        <div className="text-xs text-slate-400">📄 {item.serviceSpec.fileName}</div>
                      )}
                    </div>
                    <div className="text-sm font-semibold text-navy-700 flex-shrink-0">{fmt(item.price * item.quantity)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <h3 className="font-bold text-navy-900 mb-4">Metode Pembayaran</h3>
              <div className="space-y-3">
                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'koperasi' ? 'border-navy-500 bg-navy-50' : 'border-slate-200 hover:border-navy-200'}`}>
                  <input type="radio" name="payment" value="koperasi" checked={paymentMethod === 'koperasi'} onChange={() => setPaymentMethod('koperasi')} className="text-navy-600" />
                  <div>
                    <div className="font-semibold text-sm text-navy-900">🏪 Bayar di Koperasi</div>
                    <div className="text-xs text-slate-500 mt-0.5">Bayar saat mengambil pesanan di koperasi</div>
                  </div>
                </label>
                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'online' ? 'border-navy-500 bg-navy-50' : 'border-slate-200 hover:border-navy-200'}`}>
                  <input type="radio" name="payment" value="online" checked={paymentMethod === 'online'} onChange={() => setPaymentMethod('online')} className="text-navy-600" />
                  <div>
                    <div className="font-semibold text-sm text-navy-900">💳 Bayar Online</div>
                    <div className="text-xs text-slate-500 mt-0.5">Transfer bank / dompet digital</div>
                  </div>
                </label>
              </div>

              {paymentMethod === 'koperasi' && (
                <div className="mt-4 p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-100">
                  📍 Pembayaran dilakukan saat mengambil pesanan di koperasi kampus. Jam operasional: Senin–Sabtu, 08.00–16.00 WIB.
                </div>
              )}
              {paymentMethod === 'online' && (
                <div className="mt-4 p-4 bg-navy-50 rounded-xl border border-navy-100">
                  <div className="font-semibold text-sm text-navy-900 mb-2">📲 Instruksi Pembayaran Online</div>
                  <div className="text-xs text-slate-600 space-y-1">
                    <div>Bank Transfer: BCA 1234-5678-9012 a.n. Koperasi ATK Kampus</div>
                    <div>GoPay / OVO: 0812-3456-7890</div>
                    <div className="text-slate-400">Kirim bukti transfer ke admin untuk konfirmasi.</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-fit sticky top-20">
            <h3 className="font-bold text-navy-900 mb-4">Ringkasan</h3>
            <div className="space-y-2 text-sm mb-5">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({cart.length} item)</span>
                <span>{fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Biaya Layanan</span>
                <span>{fmt(serviceFee)}</span>
              </div>
              <div className="border-t border-slate-100 pt-2 flex justify-between font-bold text-navy-900 text-base">
                <span>Total Pembayaran</span>
                <span>{fmt(total)}</span>
              </div>
            </div>
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="w-full py-3 bg-navy-900 hover:bg-navy-800 text-white rounded-xl font-semibold text-sm transition-colors disabled:opacity-60"
            >
              {loading ? 'Memproses...' : 'Konfirmasi Pesanan'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
