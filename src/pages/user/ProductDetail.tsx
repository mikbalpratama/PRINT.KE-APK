import { useState } from 'react';
import type { Page, Product, CartItem } from '../../types';

interface Props {
  product: Product;
  navigate: (page: Page) => void;
  addToCart: (item: CartItem) => void;
}

export default function ProductDetail({ product, navigate, addToCart }: Props) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const fmt = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

  const handleAdd = () => {
    addToCart({ id: `prod-${product.id}-${Date.now()}`, type: 'product', name: product.name, price: product.price, quantity: qty, image: product.image });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuy = () => {
    addToCart({ id: `prod-${product.id}-${Date.now()}`, type: 'product', name: product.name, price: product.price, quantity: qty, image: product.image });
    navigate('user-cart');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-6">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate('user-catalog')} className="flex items-center gap-2 text-slate-500 hover:text-navy-900 text-sm mb-6 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke Katalog
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="aspect-square bg-slate-50">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-8">
              <div className="text-sm text-slate-400 mb-2">{product.category}</div>
              <h1 className="text-2xl font-bold text-navy-900 mb-3">{product.name}</h1>
              <div className="text-3xl font-bold text-navy-700 mb-4">{fmt(product.price)}</div>

              <div className="mb-4">
                {product.stock === 0 ? (
                  <span className="text-danger-600 text-sm font-semibold">Stok habis</span>
                ) : product.stock <= product.minStock ? (
                  <span className="text-warning-600 text-sm font-semibold">Stok menipis ({product.stock} tersisa)</span>
                ) : (
                  <span className="text-success-600 text-sm font-semibold">Stok tersedia ({product.stock})</span>
                )}
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">{product.description}</p>

              <div className="flex items-center gap-4 mb-6">
                <label className="text-sm font-semibold text-slate-700">Jumlah:</label>
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-4 py-2 hover:bg-slate-100 text-slate-600 font-bold transition-colors">−</button>
                  <span className="px-4 py-2 text-sm font-semibold text-navy-900 border-x border-slate-200">{qty}</span>
                  <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="px-4 py-2 hover:bg-slate-100 text-slate-600 font-bold transition-colors">+</button>
                </div>
                <span className="text-sm font-bold text-navy-700">{fmt(product.price * qty)}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAdd}
                  disabled={product.stock === 0}
                  className={`py-3 rounded-xl font-semibold text-sm transition-all ${
                    added ? 'bg-success-500 text-white' : 'bg-navy-100 hover:bg-navy-200 text-navy-800'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {added ? '✓ Ditambahkan' : '+ Keranjang'}
                </button>
                <button
                  onClick={handleBuy}
                  disabled={product.stock === 0}
                  className="py-3 bg-navy-900 hover:bg-navy-800 text-white rounded-xl font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Beli Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
