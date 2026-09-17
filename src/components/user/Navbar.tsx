import type { User, Page, CartItem } from '../../types';

interface NavbarProps {
  user: User;
  cart: CartItem[];
  navigate: (page: Page) => void;
  onLogout: () => void;
  currentPage: Page;
}

export default function Navbar({ user, cart, navigate, onLogout, currentPage }: NavbarProps) {
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const navItems: { label: string; page: Page }[] = [
    { label: 'Beranda', page: 'user-dashboard' },
    { label: 'Layanan', page: 'user-services' },
    { label: 'Katalog ATK', page: 'user-catalog' },
    { label: 'Pesanan Saya', page: 'user-order-history' },
  ];

  return (
    <nav className="bg-navy-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => navigate('user-dashboard')} className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-navy-600 rounded-lg flex items-center justify-center text-white font-bold text-sm group-hover:bg-navy-500 transition-colors">K</div>
            <span className="font-bold text-lg tracking-tight">KOPATK</span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.page}
                onClick={() => navigate(item.page)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === item.page
                    ? 'bg-navy-700 text-white'
                    : 'text-navy-200 hover:text-white hover:bg-navy-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('user-cart')}
              className="relative p-2 text-navy-200 hover:text-white hover:bg-navy-800 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 19a1 1 0 100 2 1 1 0 000-2zm-9 0a1 1 0 100 2 1 1 0 000-2z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-danger-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => navigate('user-profile')}
              className="flex items-center gap-2 p-1.5 text-navy-200 hover:text-white hover:bg-navy-800 rounded-lg transition-colors"
            >
              <div className="w-7 h-7 bg-navy-600 rounded-full flex items-center justify-center text-xs font-bold">
                {user.name[0]}
              </div>
              <span className="hidden md:block text-sm font-medium truncate max-w-[120px]">{user.name.split(' ')[0]}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="md:hidden border-t border-navy-800">
        <div className="flex overflow-x-auto px-4 py-2 gap-1">
          {navItems.map(item => (
            <button
              key={item.page}
              onClick={() => navigate(item.page)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                currentPage === item.page
                  ? 'bg-navy-700 text-white'
                  : 'text-navy-300 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
