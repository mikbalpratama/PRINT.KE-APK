import type { Page } from '../../types';

interface SidebarProps {
  currentPage: Page;
  navigate: (page: Page) => void;
  onLogout: () => void;
  collapsed: boolean;
  onToggle: () => void;
}

const menuItems: { icon: string; label: string; page: Page }[] = [
  { icon: '📊', label: 'Dashboard', page: 'admin-dashboard' },
  { icon: '📦', label: 'Pesanan', page: 'admin-orders' },
  { icon: '🛍️', label: 'Produk', page: 'admin-products' },
  { icon: '🏷️', label: 'Kategori', page: 'admin-categories' },
  { icon: '⚙️', label: 'Layanan', page: 'admin-services' },
  { icon: '📋', label: 'Stok', page: 'admin-stock' },
  { icon: '👥', label: 'Pelanggan', page: 'admin-customers' },
  { icon: '💳', label: 'Pembayaran', page: 'admin-payments' },
  { icon: '📈', label: 'Laporan', page: 'admin-reports' },
];

export default function Sidebar({ currentPage, navigate, onLogout, collapsed, onToggle }: SidebarProps) {
  return (
    <aside className={`${collapsed ? 'w-16' : 'w-60'} bg-navy-950 text-white flex flex-col transition-all duration-200 min-h-screen sticky top-0`}>
      <div className="flex items-center justify-between p-4 border-b border-navy-800">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-navy-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">K</div>
            <span className="font-bold text-sm tracking-tight">KOPATK Admin</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-1 rounded-lg hover:bg-navy-800 text-navy-300 hover:text-white transition-colors ml-auto"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {collapsed
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            }
          </svg>
        </button>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        {menuItems.map(item => (
          <button
            key={item.page}
            onClick={() => navigate(item.page)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
              currentPage === item.page
                ? 'bg-navy-700 text-white border-r-2 border-navy-400'
                : 'text-navy-300 hover:text-white hover:bg-navy-800'
            }`}
            title={collapsed ? item.label : undefined}
          >
            <span className="text-base flex-shrink-0">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="border-t border-navy-800 p-4">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-2 py-2 text-sm text-navy-300 hover:text-danger-400 hover:bg-navy-800 rounded-lg transition-colors"
          title={collapsed ? 'Logout' : undefined}
        >
          <span className="text-base flex-shrink-0">🚪</span>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
