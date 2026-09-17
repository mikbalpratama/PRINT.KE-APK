import { useState } from 'react';
import type { Page } from '../types';

interface Props {
  navigate: (page: Page) => void;
}

export default function RegisterPage({ navigate }: Props) {
  const [form, setForm] = useState({ name: '', nim: '', email: '', phone: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) return alert('Password tidak sama');
    setLoading(true);
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
    }, 1000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-navy-900 mb-2">Pendaftaran Berhasil!</h2>
          <p className="text-slate-500 mb-8">Akun berhasil dibuat. Silakan masuk untuk mulai berbelanja.</p>
          <button onClick={() => navigate('login')} className="w-full py-3 bg-navy-900 text-white rounded-xl font-semibold hover:bg-navy-800 transition-colors">
            Masuk Sekarang
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-navy-900 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">K</div>
            <h1 className="text-2xl font-bold text-navy-900">Daftar Akun</h1>
            <p className="text-slate-500 text-sm mt-1">Buat akun KOPATK baru</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: 'Nama Lengkap', key: 'name', type: 'text', placeholder: 'Nama sesuai KTP' },
              { label: 'NIM', key: 'nim', type: 'text', placeholder: '2021001' },
              { label: 'Email', key: 'email', type: 'email', placeholder: 'nama@mahasiswa.ac.id' },
              { label: 'Nomor HP', key: 'phone', type: 'tel', placeholder: '08xxxxxxxxxx' },
              { label: 'Password', key: 'password', type: 'password', placeholder: 'Min. 8 karakter' },
              { label: 'Konfirmasi Password', key: 'confirm', type: 'password', placeholder: 'Ulangi password' },
            ].map(field => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">{field.label}</label>
                <input
                  type={field.type}
                  value={form[field.key as keyof typeof form]}
                  onChange={set(field.key as keyof typeof form)}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-navy-900 hover:bg-navy-800 text-white rounded-xl font-semibold text-sm transition-colors disabled:opacity-60 mt-2"
            >
              {loading ? 'Mendaftar...' : 'Daftar Sekarang'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Sudah punya akun?{' '}
            <button onClick={() => navigate('login')} className="text-navy-600 hover:text-navy-800 font-semibold">
              Masuk
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
