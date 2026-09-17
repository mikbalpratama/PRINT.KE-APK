import type { Page, CartItem } from '../../types';

interface Props {
  cart: CartItem[];
  navigate: (page: Page) => void;
  updateQuantity: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
}

const fmt = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

export default function Cart({ cart, navigate, updateQuantity, removeItem }: Props) {
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const serviceFee = 2000;
  const total = subtotal + (cart.length > 0 ? serviceFee : 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-xl font-bold text-navy-900 mb-2">Keranjang Kosong</h2>
          <p className="text-slate-500 mb-6">Belum ada produk atau layanan di keranjang Anda.</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => navigate('user-services')} className="px-6 py-2.5 bg-navy-900 text-white rounded-xl font-semibold hover:bg-navy-800 transition-colors text-sm">
              Pilih Layanan
            </button>
            <button onClick={() => navigate('user-catalog')} className="px-6 py-2.5 bg-white border border-slate-200 text-navy-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors text-sm">
              Katalog ATK
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-navy-900 mb-6">Keranjang ({cart.length} item)</h1>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-3">
            {cart.map(item => (
              <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                <div className="flex gap-4">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0 bg-slate-50" />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-navy-50 flex items-center justify-center text-2xl flex-shrink-0">
                      {item.serviceType === 'print' ? '🖨️' : item.serviceType === 'fotocopy' ? '📋' : '📚'}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-semibold text-navy-900 text-sm leading-tight">{item.name}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{item.type === 'product' ? 'Produk ATK' : 'Layanan'}</div>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-danger-500 hover:text-danger-700 text-xs flex-shrink-0">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="font-bold text-navy-700">{fmt(item.price * item.quantity)}</div>
                      {item.type === 'product' ? (
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                          <button onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeItem(item.id)}
                            className="px-3 py-1 hover:bg-slate-100 text-slate-600 text-sm font-bold transition-colors">−</button>
                          <span className="px-3 py-1 text-sm font-semibold border-x border-slate-200">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 hover:bg-slate-100 text-slate-600 text-sm font-bold transition-colors">+</button>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">1 pesanan</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-fit">
            <h3 className="font-bold text-navy-900 mb-4">Ringkasan Pesanan</h3>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>{fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Biaya Layanan</span>
                <span>{fmt(serviceFee)}</span>
              </div>
              <div className="border-t border-slate-100 pt-2 flex justify-between font-bold text-navy-900 text-base">
                <span>Total</span>
                <span>{fmt(total)}</span>
              </div>
            </div>
            <button onClick={() => navigate('user-checkout')}
              className="w-full py-3 bg-navy-900 hover:bg-navy-800 text-white rounded-xl font-semibold text-sm transition-colors">
              Checkout →
            </button>
            <button onClick={() => navigate('user-dashboard')}
              className="w-full py-2 text-slate-500 hover:text-navy-700 text-sm font-medium mt-2 transition-colors">
              Lanjut Belanja
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
