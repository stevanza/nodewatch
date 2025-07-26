// app/peringatan/page.tsx
'use client';

import React from 'react';
import Sidebar from '../../components/layout/sidebar';
import { Bell, AlertTriangle, Shield, Activity, Zap, Clock } from 'lucide-react';

export default function PeringatanPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white font-inter">
      <div className="flex">
        {/* Sidebar Navigasi */}
        <Sidebar className="fixed h-screen" />
        
        {/* Area Konten Utama */}
        <div className="ml-64 flex-1 p-6">
          {/* Header Utama */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <Bell className="w-8 h-8 text-amber-400" />
              <h1 className="text-4xl font-bold text-white">
                Sistem Peringatan
              </h1>
            </div>
            <p className="text-slate-400 text-lg">
              Monitor Real-time & Notifikasi Ancaman Keamanan
            </p>
          </div>

          {/* Alert Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-800 rounded-xl p-6 border border-red-700">
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <h3 className="text-xl font-semibold text-white">Critical Alerts</h3>
              </div>
              <p className="text-slate-400 mb-4">
                Ancaman keamanan tingkat tinggi yang memerlukan tindakan segera.
              </p>
              <div className="bg-red-400/10 border border-red-400/20 rounded-lg p-3">
                <p className="text-red-400 text-sm">🚨 12 Peringatan Aktif</p>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-amber-700">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-6 h-6 text-amber-400" />
                <h3 className="text-xl font-semibold text-white">Security Monitoring</h3>
              </div>
              <p className="text-slate-400 mb-4">
                Pemantauan kontinu terhadap aktivitas mencurigakan dan anomali.
              </p>
              <div className="bg-amber-400/10 border border-amber-400/20 rounded-lg p-3">
                <p className="text-amber-400 text-sm">⚠️ 8 Pemantauan Aktif</p>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-green-700">
              <div className="flex items-center space-x-3 mb-4">
                <Activity className="w-6 h-6 text-green-400" />
                <h3 className="text-xl font-semibold text-white">System Health</h3>
              </div>
              <p className="text-slate-400 mb-4">
                Status kesehatan sistem dan infrastruktur monitoring.
              </p>
              <div className="bg-green-400/10 border border-green-400/20 rounded-lg p-3">
                <p className="text-green-400 text-sm">✅ Semua Sistem Normal</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Aksi Cepat</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-lg transition-colors duration-200 flex items-center space-x-3">
                <Zap className="w-5 h-5 text-amber-400" />
                <span>Atur Alert Baru</span>
              </button>
              <button className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-lg transition-colors duration-200 flex items-center space-x-3">
                <Clock className="w-5 h-5 text-amber-400" />
                <span>Riwayat Peringatan</span>
              </button>
              <button className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-lg transition-colors duration-200 flex items-center space-x-3">
                <Bell className="w-5 h-5 text-amber-400" />
                <span>Pengaturan Notifikasi</span>
              </button>
            </div>
          </div>

          {/* Placeholder Message */}
          <div className="text-center">
            <Bell className="w-16 h-16 text-amber-400 mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-bold text-white mb-2">Sistem Peringatan Cerdas</h2>
            <p className="text-slate-400 max-w-md mx-auto">
              Sistem notifikasi real-time dengan machine learning untuk deteksi ancaman 
              dan anomali blockchain sedang dalam pengembangan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}