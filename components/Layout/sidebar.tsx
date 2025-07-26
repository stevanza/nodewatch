// components/layout/sidebar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Search, 
  ShieldCheck, 
  BarChart3, 
  Bell 
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

interface NavigationItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const pathname = usePathname();
  
  // Daftar item navigasi dengan ikon dan href
  const navigationItems: NavigationItem[] = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: LayoutDashboard,
      href: '/home'
    },
    {
      id: 'investigasi',
      name: 'Investigasi',
      icon: Search,
      href: '/investigasi'
    },
    {
      id: 'audit',
      name: 'Audit Smart Contract',
      icon: ShieldCheck,
      href: '/audit'
    },
    {
      id: 'laporan',
      name: 'Laporan Intelijen',
      icon: BarChart3,
      href: '/laporan'
    },
    {
      id: 'peringatan',
      name: 'Peringatan',
      icon: Bell,
      href: '/peringatan'
    }
  ];

  // Fungsi untuk menentukan apakah item aktif
  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <div className={`w-64 bg-slate-900 border-r border-slate-700 flex flex-col ${className}`}>
      {/* Header dengan Logo Aplikasi */}
      <div className="p-6 border-b border-slate-700">
        <Link href="/home" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          {/* Icon Logo */}
          <div className="w-10 h-10 bg-amber-400 rounded-lg flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-slate-900" />
          </div>
          {/* Nama Aplikasi */}
          <div>
            <h1 className="text-xl font-bold text-white">NodeWatch</h1>
            <p className="text-xs text-slate-400">Command Center</p>
          </div>
        </Link>
      </div>

      {/* Navigasi Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const active = isActive(item.href);
            
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group
                    ${active 
                      ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20 shadow-lg shadow-amber-400/5' 
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white hover:border hover:border-slate-600'
                    }
                  `}
                >
                  <IconComponent className={`w-5 h-5 transition-all duration-200 ${
                    active ? 'text-amber-400' : 'text-slate-400 group-hover:text-slate-300'
                  }`} />
                  <span className="font-medium">{item.name}</span>
                  {active && (
                    <div className="ml-auto w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer dengan Informasi Tambahan */}
      <div className="p-4 border-t border-slate-700">
        <div className="text-xs text-slate-500 text-center">
          <p>Intelligence Dashboard v2.1</p>
          <p className="mt-1">© 2025 SecureFlow</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;