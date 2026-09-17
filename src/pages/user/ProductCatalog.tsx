import { useState } from 'react';
import type { Page, Product, CartItem } from '../../types';
import { mockProducts, mockCategories } from '../../data/mockData';

interface Props {
  navigate: (page: Page) => void;
  setSelectedProduct: (p: Product) => void;
  addToCart: (item: CartItem) => void;
}

const fmt = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

export default function ProductCatalog({ navigate, setSelectedProduct, addToCart }: Props) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Semua');
  const [sort, setSort] = useState('default');
  const [added, setAdded] = useState<string | null>(null);

  const categories = ['Semua', ...mockCategories.map(c => c.name)];

  let filtered = mockProducts.filter(p => p.status === 'active');
  if (search) filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  if (category !== 'Semua') filtered = filtered.filter(p => p.category === category);
  if (sort === 'asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === 'desc') filtered = [...filtered].sort((a, b) => b.price - a.price);

  const handleAdd = (p: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({ id: `prod-${p.id}-${Date.now()}`, type: 'product', name: p.name, price: p.price, quantity: 1, image: p.image });
    setAdded(p.id);
    setTimeout(() => setAdded(null), 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-navy-900">Katalog Produk ATK</h1>
          <p className="text-slate-500 mt-1">Temukan perlengkapan alat tulis kantor yang Anda butuhkan</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Cari produk..."
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 bg-white"
            />
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)}
            className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 bg-white">
            <option value="default">Urutan Default</option>
            <option value="asc">Harga Terendah</option>
            <option value="desc">Harga Tertinggi</option>
          </select>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {categories.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                category === cat ? 'bg-navy-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:border-navy-300'
              }`}>{cat}</button>
          ))}
        </div>

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-slate-500">Produk tidak ditemukan</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(p => (
              <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-all group cursor-pointer"
                onClick={() => { setSelectedProduct(p); navigate('user-product-detail'); }}>
                <div className="aspect-square bg-slate-50 overflow-hidden relative">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  {p.stock === 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-danger-500 text-white text-xs font-bold px-3 py-1 rounded-full">Habis</span>
                    </div>
                  )}
                  {p.stock > 0 && p.stock <= p.minStock && (
                    <div className="absolute top-2 right-2">
                      <span className="bg-warning-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">Menipis</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="text-xs text-slate-400 mb-1">{p.category}</div>
                  <div className="font-semibold text-navy-900 text-sm leading-tight mb-2 line-clamp-2">{p.name}</div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-bold text-navy-700">{fmt(p.price)}</div>
                    <div className="text-xs text-slate-400">Stok: {p.stock}</div>
                  </div>
                  <button
                    disabled={p.stock === 0}
                    onClick={e => handleAdd(p, e)}
                    className={`w-full py-2 rounded-xl text-sm font-medium transition-all ${
                      added === p.id
                        ? 'bg-success-500 text-white'
                        : p.stock === 0
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          : 'bg-navy-900 hover:bg-navy-800 text-white'
                    }`}
                  >
                    {added === p.id ? '✓ Ditambahkan' : '+ Keranjang'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
