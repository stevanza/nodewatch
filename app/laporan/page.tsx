// app/laporan/page.tsx
'use client';

import React, { useState } from 'react';
import Sidebar from '../../components/layout/sidebar';
import { 
  Eye, 
  Download, 
  Calendar, 
  Filter,
  TrendingUp,
  BarChart3,
  Activity,
  Users,
  Globe,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Interface untuk tipe data
interface FlowData {
  date: string;
  inflow: number;
  outflow: number;
  net: number;
}

interface IndexData {
  date: string;
  index: number;
}

interface WhaleData {
  name: string;
  volume: number;
  transactions: number;
  risk: 'low' | 'medium' | 'high';
}

interface SectorData {
  name: string;
  value: number;
  color: string;
}

// Komponen Card yang dapat digunakan kembali
interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', title, subtitle }) => {
  return (
    <div className={`bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-200 ${className}`}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>}
          {subtitle && <p className="text-slate-400 text-sm">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
};

// Komponen Metric Card
interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  changeType: 'positive' | 'negative';
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, changeType, icon }) => {
  return (
    <div className="bg-slate-700 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-amber-400">{icon}</div>
        <div className={`flex items-center text-sm ${changeType === 'positive' ? 'text-green-400' : 'text-red-400'}`}>
          {changeType === 'positive' ? (
            <ArrowUpRight className="w-4 h-4 mr-1" />
          ) : (
            <ArrowDownRight className="w-4 h-4 mr-1" />
          )}
          {Math.abs(change)}%
        </div>
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-slate-400 text-sm">{title}</div>
    </div>
  );
};

// Komponen utama halaman Oracle
export default function OraclePage() {
  const [selectedSector, setSelectedSector] = useState('Semua');
  const [dateRange, setDateRange] = useState('7d');

  // Data placeholder untuk Area Chart - Aliran Dana
  const flowData: FlowData[] = [
    { date: '2025-01-20', inflow: 45000000, outflow: 32000000, net: 13000000 },
    { date: '2025-01-21', inflow: 52000000, outflow: 38000000, net: 14000000 },
    { date: '2025-01-22', inflow: 48000000, outflow: 45000000, net: 3000000 },
    { date: '2025-01-23', inflow: 67000000, outflow: 41000000, net: 26000000 },
    { date: '2025-01-24', inflow: 71000000, outflow: 39000000, net: 32000000 },
    { date: '2025-01-25', inflow: 58000000, outflow: 47000000, net: 11000000 },
    { date: '2025-01-26', inflow: 63000000, outflow: 42000000, net: 21000000 }
  ];

  // Data untuk Line Chart - Indeks Aktivitas
  const indexData: IndexData[] = [
    { date: '2025-01-20', index: 68.5 },
    { date: '2025-01-21', index: 72.1 },
    { date: '2025-01-22', index: 69.8 },
    { date: '2025-01-23', index: 75.4 },
    { date: '2025-01-24', index: 78.9 },
    { date: '2025-01-25', index: 74.2 },
    { date: '2025-01-26', index: 81.3 }
  ];

  // Data untuk Bar Chart - Whale Activity
  const whaleData: WhaleData[] = [
    { name: 'Whale Alpha', volume: 234500000, transactions: 1247, risk: 'low' },
    { name: 'Crypto Titan', volume: 189700000, transactions: 892, risk: 'medium' },
    { name: 'DeepSea Fund', volume: 156800000, transactions: 654, risk: 'high' },
    { name: 'Ocean Capital', volume: 142300000, transactions: 1089, risk: 'low' },
    { name: 'Leviathan Group', volume: 128900000, transactions: 743, risk: 'medium' }
  ];

  // Data untuk Pie Chart - Distribusi Sektor
  const sectorData: SectorData[] = [
    { name: 'DeFi', value: 42, color: '#10B981' },
    { name: 'NFT', value: 28, color: '#F59E0B' },
    { name: 'GameFi', value: 18, color: '#3B82F6' },
    { name: 'Infrastructure', value: 12, color: '#8B5CF6' }
  ];

  const sectors = ['Semua', 'DeFi', 'NFT', 'GameFi', 'Infrastructure'];
  const dateRanges = [
    { value: '1d', label: '24 Jam' },
    { value: '7d', label: '7 Hari' },
    { value: '30d', label: '30 Hari' },
    { value: '90d', label: '90 Hari' }
  ];

  // Custom tooltip untuk grafik
  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{
      name: string;
      value: number;
      color: string;
    }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-600 rounded-lg p-3 shadow-lg">
          <p className="text-slate-300 text-sm mb-2">{`Tanggal: ${label}`}</p>
          {payload.map((entry, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-amber-400';
      case 'high': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) return `$${(value / 1000000000).toFixed(1)}B`;
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
    return `$${value}`;
  };

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
              <Eye className="w-8 h-8 text-amber-400" />
              <h1 className="text-4xl font-bold text-white">
                The Oracle
              </h1>
            </div>
            <p className="text-slate-400 text-lg">
              Laporan Intelijen Strategis - Wawasan Makro Data On-Chain
            </p>
          </div>

          {/* Bagian Kontrol & Filter */}
          <Card className="mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                {/* Filter Rentang Waktu */}
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-amber-400" />
                  <span className="text-slate-300 text-sm">Periode:</span>
                  <div className="relative">
                    <select
                      value={dateRange}
                      onChange={(e) => setDateRange(e.target.value)}
                      className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 appearance-none pr-8"
                    >
                      {dateRanges.map((range) => (
                        <option key={range.value} value={range.value}>
                          {range.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Filter Sektor */}
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-amber-400" />
                  <span className="text-slate-300 text-sm">Sektor:</span>
                  <div className="relative">
                    <select
                      value={selectedSector}
                      onChange={(e) => setSelectedSector(e.target.value)}
                      className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 appearance-none pr-8"
                    >
                      {sectors.map((sector) => (
                        <option key={sector} value={sector}>
                          {sector}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Tombol Ekspor */}
              <button className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Ekspor Laporan</span>
              </button>
            </div>
          </Card>

          {/* Metrics Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <MetricCard
              title="Volume Transaksi 24h"
              value="$2.4B"
              change={12.5}
              changeType="positive"
              icon={<BarChart3 className="w-5 h-5" />}
            />
            <MetricCard
              title="Alamat Aktif"
              value="89.4K"
              change={8.3}
              changeType="positive"
              icon={<Users className="w-5 h-5" />}
            />
            <MetricCard
              title="Indeks Risiko"
              value="68.7"
              change={2.1}
              changeType="negative"
              icon={<Activity className="w-5 h-5" />}
            />
            <MetricCard
              title="Global Coverage"
              value="94.2%"
              change={1.8}
              changeType="positive"
              icon={<Globe className="w-5 h-5" />}
            />
          </div>

          {/* Dashboard Grafik */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            
            {/* Kartu 1: Aliran Dana Sektoral */}
            <Card 
              title="Aliran Dana Sektoral" 
              subtitle="Perbandingan inflow vs outflow dalam periode yang dipilih"
              className="lg:col-span-2"
            >
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={flowData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#9CA3AF"
                      fontSize={12}
                      tickFormatter={(value) => new Date(value).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' })}
                    />
                    <YAxis 
                      stroke="#9CA3AF"
                      fontSize={12}
                      tickFormatter={(value) => formatCurrency(value)}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="inflow"
                      stackId="1"
                      stroke="#10B981"
                      fill="#10B981"
                      fillOpacity={0.3}
                      name="Inflow"
                    />
                    <Area
                      type="monotone"
                      dataKey="outflow"
                      stackId="2"
                      stroke="#EF4444"
                      fill="#EF4444"
                      fillOpacity={0.3}
                      name="Outflow"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Kartu 2: Indeks Aktivitas */}
            <Card 
              title="Indeks Aktivitas Judi Online" 
              subtitle="Tren indeks dan perubahan real-time"
            >
              <div className="mb-4 p-4 bg-slate-700 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-white">81.3</div>
                    <div className="text-slate-400 text-sm">Indeks Saat Ini</div>
                  </div>
                  <div className="flex items-center text-green-400">
                    <TrendingUp className="w-5 h-5 mr-1" />
                    <span className="font-medium">+6.8%</span>
                  </div>
                </div>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={indexData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#9CA3AF"
                      fontSize={12}
                      tickFormatter={(value) => new Date(value).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' })}
                    />
                    <YAxis stroke="#9CA3AF" fontSize={12} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="index"
                      stroke="#F59E0B"
                      strokeWidth={3}
                      dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                      name="Indeks"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Kartu 3: Distribusi Sektor */}
            <Card 
              title="Distribusi Volume per Sektor" 
              subtitle="Breakdown aktivitas berdasarkan sektor"
            >
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sectorData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                      labelLine={false}
                      fontSize={12}
                    >
                      {sectorData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Baris kedua grafik */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Kartu 4: Aktivitas Whale */}
            <Card 
              title="Top 5 Whale Activity" 
              subtitle="Entitas dengan volume transaksi tertinggi"
            >
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={whaleData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      type="number"
                      stroke="#9CA3AF"
                      fontSize={12}
                      tickFormatter={(value) => formatCurrency(value)}
                    />
                    <YAxis 
                      type="category"
                      dataKey="name" 
                      stroke="#9CA3AF"
                      fontSize={12}
                      width={100}
                    />
                    <Tooltip 
                      formatter={(value: number) => [formatCurrency(value), 'Volume']}
                      labelStyle={{ color: '#E5E7EB' }}
                    />
                    <Bar 
                      dataKey="volume" 
                      fill="#3B82F6"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Kartu 5: Peta Panas Risiko */}
            <Card 
              title="Peta Panas Risiko Geografis" 
              subtitle="Distribusi risiko berdasarkan wilayah"
            >
              <div className="h-80 flex items-center justify-center bg-slate-700 rounded-lg">
                <div className="text-center">
                  <Globe className="w-16 h-16 text-amber-400 mx-auto mb-4 opacity-50" />
                  <h4 className="text-lg font-medium text-white mb-2">Peta Interaktif</h4>
                  <p className="text-slate-400 text-sm mb-4">
                    Fitur peta panas risiko geografis akan segera hadir
                  </p>
                  <div className="bg-amber-400/10 border border-amber-400/20 rounded-lg p-3">
                    <p className="text-amber-400 text-xs">
                      🚧 Dalam Pengembangan - Q2 2025
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Whale Details Table */}
          <Card title="Detail Aktivitas Whale" subtitle="Analisis mendalam entitas high-volume" className="mt-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Entitas</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Volume (24h)</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Transaksi</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Risk Level</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {whaleData.map((whale, index) => (
                    <tr key={index} className="border-b border-slate-700 hover:bg-slate-700 transition-colors duration-200">
                      <td className="py-3 px-4 text-white font-medium">{whale.name}</td>
                      <td className="py-3 px-4 text-white">{formatCurrency(whale.volume)}</td>
                      <td className="py-3 px-4 text-slate-300">{whale.transactions.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span className={`${getRiskColor(whale.risk)} capitalize font-medium`}>
                          {whale.risk}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                          Monitored
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}