"use client";
import {
  BellIcon,
  Cog6ToothIcon,
  GlobeAltIcon,
  Bars3Icon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [notifications] = useState(3);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();

  const navigationLinks = [
    { name: "HOME", href: "/home" },
    { name: "DASHBOARD", href: "/dashboard" },
    { name: "TRANSACTIONS", href: "/transactions" },
    { name: "ANALYTICS", href: "/analytics" },
    { name: "REPORTS", href: "/reports" },
  ];

  const isActiveLink = (href: string) => {
    if (href === "/home" && pathname === "/") return false;
    if (href === "/dashboard" && pathname === "/") return true;
    return pathname === href;
  };

  return (
    <nav className="professional-navbar sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center h-14 relative">
          {/* Left Side - HD Logo with Home Link */}
          <div className="flex items-center">
            <Link href="/home" className="relative group">
              <div className="absolute inset-0 bg-accent-blue/10 rounded-lg blur-lg group-hover:blur-xl group-hover:bg-accent-blue/15 transition-all duration-300 -z-10"></div>
              <Image
                src="/logo.png"
                alt="NodeWatch - Home"
                width={40}
                height={40}
                className="h-10 w-auto object-contain filter drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300 group-hover:scale-105"
                priority
                quality={100}
                style={{
                  imageRendering: "crisp-edges",
                }}
              />
            </Link>
          </div>

          {/* Right Side - Navigation Menu & Hamburger */}
          <div className="flex items-center space-x-8">
            {/* Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative transition-all duration-300 font-medium tracking-wide uppercase text-xs ${
                    isActiveLink(link.href)
                      ? "text-accent-blue"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Hamburger Menu - Professional Style */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="professional-button group"
              >
                <Bars3Icon className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                <ChevronDownIcon
                  className={`h-3 w-3 text-gray-500 transition-all duration-300 ${
                    isDropdownOpen
                      ? "rotate-180 text-gray-300"
                      : "group-hover:text-gray-300"
                  }`}
                />
              </button>

              {/* Professional Dropdown */}
              {isDropdownOpen && (
                <div className="professional-dropdown">
                  <div className="p-4 space-y-3">
                    {/* Profile Section */}
                    <div className="professional-dropdown-item group">
                      <div className="w-8 h-8 professional-avatar">
                        <span className="text-xs font-semibold text-white">
                          A
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-200">
                          Admin
                        </div>
                        <div className="text-xs text-accent-blue">
                          Administrator
                        </div>
                      </div>
                    </div>

                    <div className="professional-divider"></div>

                    {/* Network Status */}
                    <div className="professional-dropdown-item group">
                      <div className="flex items-center space-x-3">
                        <GlobeAltIcon className="h-4 w-4 text-accent-blue" />
                        <div>
                          <div className="text-sm font-medium text-gray-200">
                            Network
                          </div>
                          <div className="text-xs text-gray-400">Mainnet</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-accent-green rounded-full pulse-subtle"></div>
                        <span className="text-xs text-accent-green font-mono">
                          18,592,847
                        </span>
                      </div>
                    </div>

                    {/* Notifications */}
                    <div className="professional-dropdown-item group">
                      <div className="flex items-center space-x-3">
                        <BellIcon className="h-4 w-4 text-gray-400" />
                        <div>
                          <div className="text-sm font-medium text-gray-200">
                            Notifications
                          </div>
                          <div className="text-xs text-gray-400">
                            Security alerts
                          </div>
                        </div>
                      </div>
                      {notifications > 0 && (
                        <span className="professional-notification-badge">
                          {notifications}
                        </span>
                      )}
                    </div>

                    {/* Settings */}
                    <div className="professional-dropdown-item group">
                      <div className="flex items-center space-x-3">
                        <Cog6ToothIcon className="h-4 w-4 text-gray-400" />
                        <div>
                          <div className="text-sm font-medium text-gray-200">
                            Settings
                          </div>
                          <div className="text-xs text-gray-400">
                            Preferences
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
