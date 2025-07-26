// app/audit/page.tsx
'use client';

import React, { useState } from 'react';
import Sidebar from '../../components/p/sidebar';
import { 
  Shield, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  Loader2,
  Info,
  TrendingUp,
  FileText,
  Clock,
  AlertCircle
} from 'lucide-react';

// Interface untuk tipe data audit
interface VulnerabilityCheck {
  name: string;
  status: 'safe' | 'warning' | 'danger';
  description: string;
}

interface ContractInfo {
  name: string;
  symbol: string;
  totalSupply: string;
  contractAddress: string;
}

interface AuditResult {
  score: number;
  riskLevel: 'low' | 'medium' | 'high';
  contractInfo: ContractInfo;
  vulnerabilities: VulnerabilityCheck[];
  verdict: string;
  auditTime: string;
}

// Komponen Card yang dapat digunakan kembali
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-slate-800 rounded-xl p-6 border border-slate-700 ${className}`}>
      {children}
    </div>
  );
};

// Komponen Badge Status
interface BadgeProps {
  status: 'safe' | 'warning' | 'danger';
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const Badge: React.FC<BadgeProps> = ({ status, children, size = 'md' }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'safe':
        return 'bg-green-500/20 text-green-400 border border-green-500/30';
      case 'warning':
        return 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
      case 'danger':
        return 'bg-red-500/20 text-red-400 border border-red-500/30';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-xs';
      case 'md':
        return 'px-3 py-1 text-sm';
      case 'lg':
        return 'px-4 py-2 text-base';
    }
  };

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${getStatusStyles()} ${getSizeStyles()}`}>
      {children}
    </span>
  );
};

// Komponen Vulnerability Item
interface VulnerabilityItemProps {
  vulnerability: VulnerabilityCheck;
}

const VulnerabilityItem: React.FC<VulnerabilityItemProps> = ({ vulnerability }) => {
  const getIcon = () => {
    switch (vulnerability.status) {
      case 'safe':
        return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case 'danger':
        return <XCircle className="w-5 h-5 text-red-400" />;
    }
  };

  const getStatusText = () => {
    switch (vulnerability.status) {
      case 'safe':
        return 'Tidak Terdeteksi';
      case 'warning':
        return 'Perlu Perhatian';
      case 'danger':
        return 'Terdeteksi';
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors duration-200">
      <div className="flex-1">
        <h4 className="text-white font-medium mb-1">{vulnerability.name}</h4>
        <p className="text-slate-400 text-sm">{vulnerability.description}</p>
      </div>
      <div className="flex items-center space-x-2 ml-4">
        {getIcon()}
        <Badge status={vulnerability.status} size="sm">
          {getStatusText()}
        </Badge>
      </div>
    </div>
  );
};

// Komponen utama halaman Audit
export default function AuditPage() {
  const [contractAddress, setContractAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);

  // Data placeholder untuk hasil audit
  const mockAuditResult: AuditResult = {
    score: 85,
    riskLevel: 'low',
    contractInfo: {
      name: 'SafeToken',
      symbol: 'SAFE',
      totalSupply: '1,000,000 SAFE',
      contractAddress: '0x742d35Cc6634C0532925a3b8D2B9b5d2a0536'
    },
    vulnerabilities: [
      {
        name: 'Re-entrancy Attack',
        status: 'safe',
        description: 'Kontrak tidak rentan terhadap serangan re-entrancy'
      },
      {
        name: 'Integer Overflow/Underflow',
        status: 'safe',
        description: 'Menggunakan SafeMath untuk operasi aritmatika'
      },
      {
        name: 'Access Control',
        status: 'warning',
        description: 'Beberapa fungsi memerlukan kontrol akses yang lebih ketat'
      },
      {
        name: 'Timestamp Dependence',
        status: 'safe',
        description: 'Tidak ada ketergantungan kritis pada timestamp'
      },
      {
        name: 'DoS Attack',
        status: 'safe',
        description: 'Kontrak tidak rentan terhadap serangan Denial of Service'
      },
      {
        name: 'Front-running',
        status: 'warning',
        description: 'Potensi front-running pada beberapa transaksi'
      }
    ],
    verdict: 'Smart contract ini relatif aman dengan beberapa area yang memerlukan perbaikan minor. Risiko keseluruhan rendah, namun disarankan untuk meninjau kontrol akses dan implementasi anti-front-running.',
    auditTime: '2 menit 34 detik'
  };

  // Fungsi untuk memulai audit
  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contractAddress.trim()) {
      setError('Alamat smart contract tidak boleh kosong');
      return;
    }

    // Validasi format alamat (basic)
    if (!contractAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
      setError('Format alamat smart contract tidak valid');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAuditResult(null);

    // Simulasi proses audit
    try {
      await new Promise(resolve => setTimeout(resolve, 3000)); // Simulasi delay 3 detik
      setAuditResult(mockAuditResult);
    } catch {
      setError('Terjadi kesalahan saat melakukan audit. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskLevelText = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low':
        return 'Risiko Rendah';
      case 'medium':
        return 'Risiko Sedang';
      case 'high':
        return 'Risiko Tinggi';
      default:
        return 'Tidak Diketahui';
    }
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
              <Shield className="w-8 h-8 text-amber-400" />
              <h1 className="text-4xl font-bold text-white">
                The Guardian
              </h1>
            </div>
            <p className="text-slate-400 text-lg">
              Audit Smart Contract Otomatis - Laporan Kesehatan Digital
            </p>
          </div>

          {/* Bagian Input */}
          <Card className="mb-8">
            <form onSubmit={handleAudit}>
              <div className="flex items-center space-x-3 mb-4">
                <Search className="w-6 h-6 text-amber-400" />
                <h2 className="text-xl font-semibold text-white">Periksa Smart Contract</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={contractAddress}
                    onChange={(e) => setContractAddress(e.target.value)}
                    placeholder="Masukkan alamat smart contract untuk diaudit..."
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    disabled={isLoading}
                  />
                  {error && (
                    <p className="text-red-400 text-sm mt-2 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{error}</span>
                    </p>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full md:w-auto bg-amber-400 hover:bg-amber-500 disabled:bg-amber-600 disabled:cursor-not-allowed text-slate-900 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Menganalisis...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      <span>Periksa Keamanan</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </Card>

          {/* Loading State */}
          {isLoading && (
            <Card>
              <div className="text-center py-12">
                <Loader2 className="w-12 h-12 text-amber-400 animate-spin mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Sedang Menganalisis...</h3>
                <p className="text-slate-400">
                  Kami sedang memeriksa smart contract Anda. Proses ini memerlukan waktu beberapa menit.
                </p>
                <div className="mt-4">
                  <div className="bg-slate-700 rounded-full h-2 w-64 mx-auto">
                    <div className="bg-amber-400 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Hasil Audit */}
          {auditResult && !isLoading && (
            <div className="space-y-6">
              {/* Kartu Skor Utama */}
              <Card>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <Shield className="w-8 h-8 text-amber-400" />
                    <h2 className="text-2xl font-bold text-white">Skor Keamanan</h2>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-6xl font-bold text-white mb-2">
                      {auditResult.score}
                      <span className="text-3xl text-slate-400">/100</span>
                    </div>
                    <Badge 
                      status={auditResult.riskLevel === 'low' ? 'safe' : auditResult.riskLevel === 'medium' ? 'warning' : 'danger'} 
                      size="lg"
                    >
                      {getRiskLevelText(auditResult.riskLevel)}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-4 text-sm text-slate-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Waktu Audit: {auditResult.auditTime}</span>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Kartu Informasi Kontrak */}
                <Card>
                  <div className="flex items-center space-x-3 mb-4">
                    <Info className="w-6 h-6 text-amber-400" />
                    <h3 className="text-xl font-semibold text-white">Informasi Kontrak</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Nama Token:</span>
                      <span className="text-white font-medium">{auditResult.contractInfo.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Simbol:</span>
                      <span className="text-white font-medium">{auditResult.contractInfo.symbol}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Pasokan:</span>
                      <span className="text-white font-medium">{auditResult.contractInfo.totalSupply}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-700">
                      <span className="text-slate-400 text-sm">Alamat Kontrak:</span>
                      <p className="text-white font-mono text-sm break-all mt-1">
                        {auditResult.contractInfo.contractAddress}
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Kartu Verdik Akhir */}
                <Card>
                  <div className="flex items-center space-x-3 mb-4">
                    <FileText className="w-6 h-6 text-amber-400" />
                    <h3 className="text-xl font-semibold text-white">Verdik & Rekomendasi</h3>
                  </div>
                  
                  <div className="bg-slate-700 rounded-lg p-4">
                    <p className="text-slate-300 leading-relaxed">
                      {auditResult.verdict}
                    </p>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-slate-700">
                    <button className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                      <TrendingUp className="w-5 h-5" />
                      <span>Unduh Laporan Lengkap</span>
                    </button>
                  </div>
                </Card>
              </div>

              {/* Kartu Analisis Kerentanan */}
              <Card>
                <div className="flex items-center space-x-3 mb-6">
                  <AlertTriangle className="w-6 h-6 text-amber-400" />
                  <h3 className="text-xl font-semibold text-white">Analisis Kerentanan</h3>
                </div>
                
                <div className="space-y-3">
                  {auditResult.vulnerabilities.map((vulnerability, index) => (
                    <VulnerabilityItem key={index} vulnerability={vulnerability} />
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-slate-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">
                      Total Pemeriksaan: {auditResult.vulnerabilities.length}
                    </span>
                    <div className="flex space-x-4">
                      <span className="text-green-400">
                        ✓ {auditResult.vulnerabilities.filter(v => v.status === 'safe').length} Aman
                      </span>
                      <span className="text-amber-400">
                        ⚠ {auditResult.vulnerabilities.filter(v => v.status === 'warning').length} Peringatan
                      </span>
                      <span className="text-red-400">
                        ✗ {auditResult.vulnerabilities.filter(v => v.status === 'danger').length} Bahaya
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}