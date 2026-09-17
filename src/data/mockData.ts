import type { User, Product, Category, Service, Order, StockHistory } from '../types';

export const mockUsers: User[] = [
  { id: 'u1', name: 'Andi Pratama', nim: '2021001', email: 'andi@mahasiswa.ac.id', phone: '081234567890', role: 'user' },
  { id: 'u2', name: 'Siti Rahayu', nim: '2021002', email: 'siti@mahasiswa.ac.id', phone: '081234567891', role: 'user' },
  { id: 'u3', name: 'Budi Santoso', nim: '2021003', email: 'budi@mahasiswa.ac.id', phone: '081234567892', role: 'user' },
  { id: 'a1', name: 'Admin Koperasi', nim: '-', email: 'admin@koperasi.ac.id', phone: '081300000001', role: 'admin' },
];

export const mockProducts: Product[] = [
  { id: 'p1', name: 'Pulpen Pilot Hitam', category: 'Pulpen', price: 5000, stock: 150, minStock: 20, description: 'Pulpen Pilot tinta hitam berkualitas tinggi, cocok untuk keperluan menulis sehari-hari.', image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400&h=400&fit=crop&auto=format', status: 'active' },
  { id: 'p2', name: 'Pulpen Ballpoint Biru', category: 'Pulpen', price: 3000, stock: 200, minStock: 30, description: 'Pulpen ballpoint tinta biru, cocok untuk pengisian formulir dan menulis.', image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400&h=400&fit=crop&auto=format', status: 'active' },
  { id: 'p3', name: 'Pensil 2B Faber-Castell', category: 'Pensil', price: 4000, stock: 100, minStock: 15, description: 'Pensil 2B dengan kualitas premium untuk gambar dan menulis.', image: 'https://images.unsplash.com/photo-1596863787100-bbbbd0f9cc06?w=400&h=400&fit=crop&auto=format', status: 'active' },
  { id: 'p4', name: 'Buku Tulis 40 Lembar', category: 'Buku', price: 8000, stock: 80, minStock: 20, description: 'Buku tulis 40 lembar dengan kertas HVS berkualitas.', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop&auto=format', status: 'active' },
  { id: 'p5', name: 'Buku Tulis 58 Lembar', category: 'Buku', price: 12000, stock: 60, minStock: 15, description: 'Buku tulis tebal 58 lembar untuk catatan kuliah.', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop&auto=format', status: 'active' },
  { id: 'p6', name: 'Kertas HVS A4 80gr (1 rim)', category: 'Kertas', price: 55000, stock: 45, minStock: 10, description: 'Kertas HVS A4 80gr 500 lembar 1 rim untuk keperluan print.', image: 'https://images.unsplash.com/photo-1572715376701-98568319fd0b?w=400&h=400&fit=crop&auto=format', status: 'active' },
  { id: 'p7', name: 'Map Plastik Bening', category: 'Map', price: 3500, stock: 8, minStock: 20, description: 'Map plastik bening untuk menyimpan dokumen penting.', image: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=400&h=400&fit=crop&auto=format', status: 'active' },
  { id: 'p8', name: 'Penghapus Steadtler', category: 'Penghapus', price: 5000, stock: 75, minStock: 20, description: 'Penghapus putih berkualitas, tidak meninggalkan bekas kotor.', image: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=400&h=400&fit=crop&auto=format', status: 'active' },
  { id: 'p9', name: 'Staples No. 10', category: 'Perlengkapan', price: 15000, stock: 30, minStock: 10, description: 'Staples kecil untuk penjilidan dokumen ringan.', image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=400&fit=crop&auto=format', status: 'active' },
  { id: 'p10', name: 'Tipe-X Cair', category: 'Perlengkapan', price: 7500, stock: 5, minStock: 15, description: 'Cairan koreksi putih untuk memperbaiki kesalahan tulisan.', image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=400&fit=crop&auto=format', status: 'active' },
  { id: 'p11', name: 'Gunting Kecil', category: 'Perlengkapan', price: 12000, stock: 0, minStock: 5, description: 'Gunting kecil untuk pemotongan kertas dan kerajinan.', image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=400&fit=crop&auto=format', status: 'active' },
  { id: 'p12', name: 'Lem Kertas Fox', category: 'Perlengkapan', price: 6000, stock: 40, minStock: 10, description: 'Lem kertas berkualitas untuk keperluan seni dan tempel dokumen.', image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=400&fit=crop&auto=format', status: 'active' },
];

export const mockCategories: Category[] = [
  { id: 'c1', name: 'Pulpen', productCount: 2, status: 'active' },
  { id: 'c2', name: 'Pensil', productCount: 1, status: 'active' },
  { id: 'c3', name: 'Buku', productCount: 2, status: 'active' },
  { id: 'c4', name: 'Kertas', productCount: 1, status: 'active' },
  { id: 'c5', name: 'Map', productCount: 1, status: 'active' },
  { id: 'c6', name: 'Penghapus', productCount: 1, status: 'active' },
  { id: 'c7', name: 'Perlengkapan', productCount: 4, status: 'active' },
];

export const mockServices: Service[] = [
  { id: 's1', name: 'Print Hitam Putih', description: 'Cetak dokumen hitam putih berkualitas', price: 500, unit: 'lembar', icon: '🖨️', status: 'active' },
  { id: 's2', name: 'Print Warna', description: 'Cetak dokumen full color berkualitas tinggi', price: 1500, unit: 'lembar', icon: '🎨', status: 'active' },
  { id: 's3', name: 'Fotocopy', description: 'Fotocopy dokumen cepat dan jelas', price: 300, unit: 'lembar', icon: '📋', status: 'active' },
  { id: 's4', name: 'Jilid Spiral', description: 'Jilid spiral untuk laporan dan skripsi', price: 5000, unit: 'dokumen', icon: '📚', status: 'active' },
  { id: 's5', name: 'Jilid Hardcover', description: 'Jilid hardcover premium untuk skripsi', price: 50000, unit: 'dokumen', icon: '📖', status: 'active' },
  { id: 's6', name: 'Laminasi', description: 'Laminasi kartu/dokumen agar tahan lama', price: 3000, unit: 'lembar', icon: '💳', status: 'active' },
  { id: 's7', name: 'Scan', description: 'Scan dokumen ke format digital (PDF/JPG)', price: 1000, unit: 'halaman', icon: '📡', status: 'active' },
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-2024-001', userId: 'u1', userName: 'Andi Pratama', userNim: '2021001', userEmail: 'andi@mahasiswa.ac.id',
    items: [
      { id: 'ci1', type: 'service', name: 'Print Hitam Putih', price: 500, quantity: 20, serviceType: 'print', serviceSpec: { fileName: 'laporan_kkn.pdf', paperSize: 'A4', color: 'bw', sides: 'single', pages: 20, copies: 1, notes: '' } as any },
      { id: 'ci2', type: 'product', name: 'Pulpen Pilot Hitam', price: 5000, quantity: 2, image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=100&h=100&fit=crop&auto=format' },
    ],
    total: 20000, paymentMethod: 'koperasi', paymentStatus: 'unpaid', status: 'ready',
    date: '2024-12-10T08:30:00', estimatedCompletion: '2024-12-10T10:00:00',
  },
  {
    id: 'ORD-2024-002', userId: 'u2', userName: 'Siti Rahayu', userNim: '2021002', userEmail: 'siti@mahasiswa.ac.id',
    items: [
      { id: 'ci3', type: 'service', name: 'Jilid Spiral', price: 5000, quantity: 1, serviceType: 'jilid', serviceSpec: { fileName: 'makalah_fisika.pdf', bindType: 'spiral', size: 'A4', coverColor: 'Biru', copies: 1, notes: 'Cover warna biru muda' } as any },
    ],
    total: 5000, paymentMethod: 'online', paymentStatus: 'paid', status: 'completed',
    date: '2024-12-09T14:00:00', estimatedCompletion: '2024-12-09T16:00:00',
  },
  {
    id: 'ORD-2024-003', userId: 'u3', userName: 'Budi Santoso', userNim: '2021003', userEmail: 'budi@mahasiswa.ac.id',
    items: [
      { id: 'ci4', type: 'service', name: 'Print Warna', price: 1500, quantity: 10, serviceType: 'print', serviceSpec: { fileName: 'poster_seminar.pdf', paperSize: 'A4', color: 'color', sides: 'single', pages: 10, copies: 1, notes: 'Kualitas terbaik' } as any },
      { id: 'ci5', type: 'product', name: 'Buku Tulis 40 Lembar', price: 8000, quantity: 3, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=100&h=100&fit=crop&auto=format' },
    ],
    total: 39000, paymentMethod: 'online', paymentStatus: 'unpaid', status: 'pending',
    date: '2024-12-11T09:15:00', estimatedCompletion: '2024-12-11T11:00:00',
  },
  {
    id: 'ORD-2024-004', userId: 'u1', userName: 'Andi Pratama', userNim: '2021001', userEmail: 'andi@mahasiswa.ac.id',
    items: [
      { id: 'ci6', type: 'product', name: 'Kertas HVS A4 80gr', price: 55000, quantity: 1, image: 'https://images.unsplash.com/photo-1572715376701-98568319fd0b?w=100&h=100&fit=crop&auto=format' },
      { id: 'ci7', type: 'product', name: 'Pensil 2B Faber-Castell', price: 4000, quantity: 5, image: 'https://images.unsplash.com/photo-1596863787100-bbbbd0f9cc06?w=100&h=100&fit=crop&auto=format' },
    ],
    total: 75000, paymentMethod: 'koperasi', paymentStatus: 'paid', status: 'processing',
    date: '2024-12-11T11:30:00', estimatedCompletion: '2024-12-11T14:00:00',
  },
  {
    id: 'ORD-2024-005', userId: 'u2', userName: 'Siti Rahayu', userNim: '2021002', userEmail: 'siti@mahasiswa.ac.id',
    items: [
      { id: 'ci8', type: 'service', name: 'Fotocopy', price: 300, quantity: 50, serviceType: 'fotocopy', serviceSpec: { fileName: '', pages: 50, copies: 1, paperSize: 'A4', color: 'bw', notes: '' } as any },
    ],
    total: 15000, paymentMethod: 'koperasi', paymentStatus: 'unpaid', status: 'cancelled',
    date: '2024-12-08T13:00:00', estimatedCompletion: '2024-12-08T15:00:00',
  },
];

export const mockStockHistory: StockHistory[] = [
  { id: 'sh1', productId: 'p1', productName: 'Pulpen Pilot Hitam', change: 50, reason: 'Restok dari supplier', date: '2024-12-10T08:00:00', admin: 'Admin Koperasi' },
  { id: 'sh2', productId: 'p6', productName: 'Kertas HVS A4 80gr', change: -1, reason: 'Penjualan', date: '2024-12-11T11:30:00', admin: 'Sistem' },
  { id: 'sh3', productId: 'p7', productName: 'Map Plastik Bening', change: -5, reason: 'Penjualan', date: '2024-12-11T10:00:00', admin: 'Sistem' },
  { id: 'sh4', productId: 'p10', productName: 'Tipe-X Cair', change: 20, reason: 'Restok dari supplier', date: '2024-12-09T09:00:00', admin: 'Admin Koperasi' },
  { id: 'sh5', productId: 'p11', productName: 'Gunting Kecil', change: -3, reason: 'Penjualan', date: '2024-12-08T14:00:00', admin: 'Sistem' },
];

export const salesChartData = [
  { name: 'Sen', pendapatan: 125000, pesanan: 8 },
  { name: 'Sel', pendapatan: 180000, pesanan: 12 },
  { name: 'Rab', pendapatan: 95000, pesanan: 6 },
  { name: 'Kam', pendapatan: 210000, pesanan: 15 },
  { name: 'Jum', pendapatan: 165000, pesanan: 11 },
  { name: 'Sab', pendapatan: 280000, pesanan: 19 },
  { name: 'Min', pendapatan: 75000, pesanan: 5 },
];

export const monthlyData = [
  { name: 'Jul', pendapatan: 2500000, pesanan: 95 },
  { name: 'Ags', pendapatan: 3100000, pesanan: 120 },
  { name: 'Sep', pendapatan: 2800000, pesanan: 108 },
  { name: 'Okt', pendapatan: 3500000, pesanan: 135 },
  { name: 'Nov', pendapatan: 3900000, pesanan: 151 },
  { name: 'Des', pendapatan: 1800000, pesanan: 76 },
];
