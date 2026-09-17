import { useState } from 'react';
import type { Page, User } from '../types';
import { mockUsers } from '../data/mockData';

interface Props {
  navigate: (page: Page) => void;
  onLogin: (user: User) => void;
}

export default function LoginPage({ navigate, onLogin }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const user = mockUsers.find(u => u.email === email);
      if (user && password === 'password') {
        onLogin(user);
        navigate(user.role === 'admin' ? 'admin-dashboard' : 'user-dashboard');
      } else {
        setError('Email atau password salah. Coba: andi@mahasiswa.ac.id / password');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-navy-900 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">K</div>
            <h1 className="text-2xl font-bold text-navy-900">Masuk ke KOPATK</h1>
            <p className="text-slate-500 text-sm mt-1">Koperasi ATK Kampus</p>
          </div>

          {error && (
            <div className="bg-danger-50 border border-danger-200 text-danger-700 rounded-xl px-4 py-3 text-sm mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="nama@mahasiswa.ac.id"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-navy-600"
                />
                <span className="text-sm text-slate-600">Ingat saya</span>
              </label>
              <button type="button" className="text-sm text-navy-600 hover:text-navy-800 font-medium">
                Lupa password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-navy-900 hover:bg-navy-800 text-white rounded-xl font-semibold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100">
            <div className="text-sm text-slate-500 mb-3 text-center font-medium">Demo Akun:</div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { setEmail('andi@mahasiswa.ac.id'); setPassword('password'); }}
                className="px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs text-slate-600 transition-colors border border-slate-200"
              >
                👤 Mahasiswa
              </button>
              <button
                onClick={() => { setEmail('admin@koperasi.ac.id'); setPassword('password'); }}
                className="px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs text-slate-600 transition-colors border border-slate-200"
              >
                🔐 Admin
              </button>
            </div>
          </div>

          <p className="text-center text-sm text-slate-500 mt-6">
            Belum punya akun?{' '}
            <button onClick={() => navigate('register')} className="text-navy-600 hover:text-navy-800 font-semibold">
              Daftar sekarang
            </button>
          </p>
        </div>

        <p className="text-center text-navy-300 text-sm mt-6">
          <button onClick={() => navigate('landing')} className="hover:text-white transition-colors">
            ← Kembali ke Beranda
          </button>
        </p>
      </div>
    </div>
  );
}
