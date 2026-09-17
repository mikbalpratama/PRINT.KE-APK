import { useState } from 'react';
import type { Page, User } from '../../types';

interface Props {
  user: User;
  navigate: (page: Page) => void;
  onLogout: () => void;
}

export default function Profile({ user, navigate, onLogout }: Props) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user.name, email: user.email, phone: user.phone });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-navy-900 mb-6">Profil Saya</h1>

        {saved && (
          <div className="mb-4 p-3 bg-success-50 border border-success-200 text-success-700 rounded-xl text-sm font-medium">
            ✓ Profil berhasil diperbarui
          </div>
        )}

        <div className="space-y-5">
          {/* Avatar & Name */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center">
            <div className="w-20 h-20 bg-navy-900 rounded-full flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">
              {user.name[0]}
            </div>
            <div className="font-bold text-xl text-navy-900">{user.name}</div>
            <div className="text-slate-500 text-sm">NIM: {user.nim}</div>
            <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-navy-50 text-navy-700 rounded-full text-xs font-semibold">
              <span className="w-1.5 h-1.5 bg-success-500 rounded-full"></span>
              Mahasiswa Aktif
            </div>
          </div>

          {/* Info Form */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-navy-900">Informasi Akun</h3>
              <button onClick={() => setEditing(!editing)}
                className="text-sm text-navy-600 hover:text-navy-800 font-medium">
                {editing ? 'Batal' : 'Edit'}
              </button>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Nama Lengkap', key: 'name', type: 'text' },
                { label: 'Email', key: 'email', type: 'email' },
                { label: 'Nomor HP', key: 'phone', type: 'tel' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">{f.label}</label>
                  {editing ? (
                    <input
                      type={f.type}
                      value={form[f.key as keyof typeof form]}
                      onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-500"
                    />
                  ) : (
                    <div className="text-sm font-medium text-navy-900 py-2">{form[f.key as keyof typeof form]}</div>
                  )}
                </div>
              ))}

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">NIM</label>
                <div className="text-sm font-medium text-slate-400 py-2">{user.nim} (tidak dapat diubah)</div>
              </div>

              {editing && (
                <button onClick={handleSave}
                  className="w-full py-2.5 bg-navy-900 hover:bg-navy-800 text-white rounded-xl font-semibold text-sm transition-colors mt-2">
                  Simpan Perubahan
                </button>
              )}
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-bold text-navy-900 mb-4">Keamanan</h3>
            <button className="w-full flex items-center justify-between py-3 border-b border-slate-50 text-sm hover:text-navy-700 transition-colors">
              <span className="text-slate-700">Ubah Password</span>
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <button onClick={() => navigate('user-order-history')}
              className="w-full flex items-center justify-between px-2 py-3 border-b border-slate-50 text-sm hover:text-navy-700 transition-colors">
              <span className="text-slate-700">📦 Riwayat Pesanan</span>
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button onClick={onLogout}
              className="w-full flex items-center gap-2 px-2 py-3 text-sm text-danger-600 hover:text-danger-800 font-medium transition-colors">
              <span>🚪</span> Keluar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
