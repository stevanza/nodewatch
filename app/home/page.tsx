// app/home/page.tsx
'use client';

import React from 'react';
import Sidebar from '../../components/layout/sidebar';
import { 
  Search, 
  Shield, 
  TrendingUp, 
  AlertTriangle,
  ArrowRight,
  FileText,
  Clock,
  Activity,
  Users,
  Globe,
  Zap,
  Eye,
  Target,
  BarChart3,
  Cpu,
  Database,
  Wifi,
  Server
} from 'lucide-react';

// Komponen Card yang dapat digunakan kembali untuk widget
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-200 ${className}`}>
      {children}
    </div>
  );
};

// Komponen Mini Card untuk statistik kecil
interface MiniCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}

const MiniCard: React.FC<MiniCardProps> = ({ icon, title, value, change, changeType = 'neutral' }) => {
  const changeColor = changeType === 'positive' ? 'text-green-400' : 
                      changeType === 'negative' ? 'text-red-400' : 'text-slate-400';
  
  return (
    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <div className="text-amber-400">{icon}</div>
        {change && (
          <span className={`text-xs font-medium ${changeColor}`}>{change}</span>
        )}
      </div>
      <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
      <p className="text-slate-400 text-sm">{title}</p>
    </div>
  );
};

// Komponen utama halaman homepage
export default function HomePage() {
  // Data placeholder untuk widget risiko
  const riskMetrics = [
    { value: '3', label: 'Entitas Berisiko Tinggi Baru', color: 'text-red-400' },
    { value: '12', label: 'Peringatan Kritis', color: 'text-amber-400' },
    { value: 'Rp 1.5M', label: 'Dana Teridentifikasi', color: 'text-green-400' }
  ];

  // Data placeholder untuk laporan terbaru
  const latestReports = [
    {
      id: 1,
      title: 'Analisis Aliran Dana Sektor GameFi Q3',
      time: '2 jam lalu',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Pola Pencucian Uang Baru Terdeteksi',
      time: '4 jam lalu',
      priority: 'critical'
    },
    {
      id: 3,
      title: 'Audit Protokol DeFi TeraBridge',
      time: '6 jam lalu',
      priority: 'medium'
    },
    {
      id: 4,
      title: 'Investigasi Rugpull Project Moon',
      time: '8 jam lalu',
      priority: 'high'
    }
  ];

  // Data untuk mini cards statistik
  const statsData = [
    { icon: <Activity className="w-5 h-5" />, title: 'Transaksi Dipindai', value: '1.2M', change: '+12%', changeType: 'positive' as const },
    { icon: <Users className="w-5 h-5" />, title: 'Alamat Aktif', value: '89.4K', change: '+8%', changeType: 'positive' as const },
    { icon: <Target className="w-5 h-5" />, title: 'Audit Selesai', value: '156', change: '+23%', changeType: 'positive' as const },
    { icon: <Eye className="w-5 h-5" />, title: 'Investigasi Aktif', value: '42', change: '-5%', changeType: 'negative' as const }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white font-inter">
      {/* Layout Utama: Sidebar + Konten */}
      <div className="flex">
        {/* Sidebar Navigasi */}
        <Sidebar className="fixed h-screen" />
        
        {/* Area Konten Utama */}
        <div className="ml-64 flex-1 p-6">
          {/* Header Utama */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-white mb-2">
              The Command Center
            </h1>
            <p className="text-slate-400 text-lg">
              Pusat Kontrol Intelijen Blockchain & Keamanan Digital
            </p>
          </div>

          {/* Grid Statistik Mini - Baris Pertama */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {statsData.map((stat, index) => (
              <MiniCard
                key={index}
                icon={stat.icon}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                changeType={stat.changeType}
              />
            ))}
          </div>

          {/* Grid Widget Utama - Baris Kedua */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
            
            {/* Widget 1: Pencarian Universal */}
            <Card className="xl:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <Search className="w-6 h-6 text-amber-400" />
                <h2 className="text-xl font-semibold text-white">Pencarian Universal</h2>
              </div>
              <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari alamat, transaksi, atau entitas..."
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-12 pr-4 py-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {['Ethereum', 'Bitcoin', 'Polygon', 'BSC'].map((network) => (
                  <span
                    key={network}
                    className="px-3 py-1 bg-slate-700 text-slate-300 text-sm rounded-full hover:bg-slate-600 cursor-pointer transition-colors duration-200"
                  >
                    {network}
                  </span>
                ))}
              </div>
            </Card>

            {/* Widget 2: Audit Cepat */}
            <Card>
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-6 h-6 text-amber-400" />
                <h2 className="text-xl font-semibold text-white">Pindai Sekarang</h2>
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Masukkan alamat smart contract..."
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                />
                <button className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Audit Sekarang</span>
                </button>
              </div>
              <div className="mt-4 text-xs text-slate-500">
                <p>• Audit mendalam dalam ~30 detik</p>
                <p>• Mendukung EVM & Solana</p>
                <p>• Deteksi 200+ pola risiko</p>
              </div>
            </Card>
          </div>

          {/* Grid Widget Ketiga - Baris Ketiga */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            
            {/* Widget 3: Ringkasan Risiko Ekosistem */}
            <Card>
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-amber-400" />
                <h2 className="text-lg font-semibold text-white">Ancaman Minggu Ini</h2>
              </div>
              <div className="space-y-4">
                {riskMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className={`text-xl font-bold ${metric.color}`}>
                        {metric.value}
                      </p>
                      <p className="text-slate-400 text-sm">{metric.label}</p>
                    </div>
                    <TrendingUp className={`w-4 h-4 ${metric.color}`} />
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-700">
                <button className="text-amber-400 hover:text-amber-300 text-sm font-medium flex items-center space-x-1 w-full">
                  <span>Lihat Detail Analisis</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </Card>

            {/* Widget 4: Status Sistem */}
            <Card>
              <div className="flex items-center space-x-3 mb-4">
                <Server className="w-6 h-6 text-amber-400" />
                <h2 className="text-lg font-semibold text-white">Status Sistem</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Cpu className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300 text-sm">API Gateway</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-green-400 text-sm">99.9%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Database className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300 text-sm">Blockchain Sync</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-green-400 text-sm">Synced</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300 text-sm">ML Models</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    <span className="text-amber-400 text-sm">Training</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Wifi className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300 text-sm">Network</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-green-400 text-sm">Optimal</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Widget 5: Aksi Cepat */}
            <Card>
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="w-6 h-6 text-amber-400" />
                <h2 className="text-lg font-semibold text-white">Aksi Cepat</h2>
              </div>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-white transition-colors duration-200 flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>Buat Laporan Baru</span>
                </button>
                <button className="w-full text-left px-3 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-white transition-colors duration-200 flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4 text-amber-400" />
                  <span>Export Data Investigasi</span>
                </button>
                <button className="w-full text-left px-3 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-white transition-colors duration-200 flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Konfigurasi Alert</span>
                </button>
                <button className="w-full text-left px-3 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-white transition-colors duration-200 flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-amber-400" />
                  <span>Monitor Global</span>
                </button>
              </div>
            </Card>
          </div>

          {/* Grid Widget Keempat - Baris Keempat */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Widget 6: Intelijen Terbaru */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <FileText className="w-6 h-6 text-amber-400" />
                  <h2 className="text-xl font-semibold text-white">Laporan Terbaru</h2>
                </div>
                <span className="text-xs text-slate-500 bg-slate-700 px-2 py-1 rounded">Live</span>
              </div>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {latestReports.map((report) => (
                  <div
                    key={report.id}
                    className="p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors duration-200 cursor-pointer"
                  >
                    <h3 className="text-sm font-medium text-white mb-2 line-clamp-2">
                      {report.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-xs text-slate-400">
                        <Clock className="w-3 h-3" />
                        <span>{report.time}</span>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          report.priority === 'critical'
                            ? 'bg-red-500/20 text-red-400'
                            : report.priority === 'high'
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}
                      >
                        {report.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-700">
                <button className="text-amber-400 hover:text-amber-300 text-sm font-medium flex items-center space-x-1 w-full">
                  <span>Lihat Semua Laporan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </Card>

            {/* Widget 7: Live Network Activity */}
            <Card>
              <div className="flex items-center space-x-3 mb-4">
                <Activity className="w-6 h-6 text-amber-400" />
                <h2 className="text-xl font-semibold text-white">Aktivitas Network</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-slate-700 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-300 text-sm">Ethereum</span>
                    <span className="text-green-400 text-sm font-medium">+5.2%</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{width: '78%'}}></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>234.5K TPS</span>
                    <span>78% Load</span>
                  </div>
                </div>

                <div className="bg-slate-700 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-300 text-sm">Polygon</span>
                    <span className="text-amber-400 text-sm font-medium">+2.1%</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div className="bg-amber-400 h-2 rounded-full" style={{width: '45%'}}></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>89.2K TPS</span>
                    <span>45% Load</span>
                  </div>
                </div>

                <div className="bg-slate-700 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-300 text-sm">BSC</span>
                    <span className="text-blue-400 text-sm font-medium">+1.8%</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div className="bg-blue-400 h-2 rounded-full" style={{width: '62%'}}></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>156.7K TPS</span>
                    <span>62% Load</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}