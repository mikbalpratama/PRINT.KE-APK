import type { OrderStatus, PaymentStatus } from '../../types';

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  pending: { label: 'Pending', className: 'bg-warning-100 text-warning-700 border border-warning-200' },
  confirmed: { label: 'Dikonfirmasi', className: 'bg-navy-100 text-navy-800 border border-navy-200' },
  processing: { label: 'Diproses', className: 'bg-blue-100 text-blue-700 border border-blue-200' },
  ready: { label: 'Siap Diambil', className: 'bg-purple-100 text-purple-700 border border-purple-200' },
  completed: { label: 'Selesai', className: 'bg-success-100 text-success-700 border border-success-200' },
  cancelled: { label: 'Dibatalkan', className: 'bg-danger-100 text-danger-700 border border-danger-200' },
};

const paymentConfig: Record<PaymentStatus, { label: string; className: string }> = {
  unpaid: { label: 'Belum Bayar', className: 'bg-warning-100 text-warning-700 border border-warning-200' },
  paid: { label: 'Lunas', className: 'bg-success-100 text-success-700 border border-success-200' },
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const cfg = statusConfig[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.className}`}>
      {cfg.label}
    </span>
  );
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const cfg = paymentConfig[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.className}`}>
      {cfg.label}
    </span>
  );
}

export function StockBadge({ stock, minStock }: { stock: number; minStock: number }) {
  if (stock === 0) return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-danger-100 text-danger-700 border border-danger-200">Habis</span>;
  if (stock <= minStock) return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-warning-100 text-warning-700 border border-warning-200">Menipis</span>;
  return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-success-100 text-success-700 border border-success-200">Aman</span>;
}
