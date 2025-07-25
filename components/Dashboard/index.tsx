"use client";
import Navbar from "@/components/Layout/Navbar";
import StatsCards from "./StatsCards";
import TransactionTable from "./TransactionTable";

export default function Dashboard() {
  return (
    <div className="professional-dark-bg min-h-screen">
      <Navbar />

      {/* Seamless Content Integration */}
      <div className="relative -mt-8 pt-8">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header - Flows with Navbar */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-8">
              <div className="pl-2">
                <h1 className="text-4xl font-bold professional-title mb-3">
                  Network Security Dashboard
                </h1>
                <p className="professional-subtitle text-lg">
                  Real-time blockchain monitoring and threat detection
                </p>
              </div>
              <div className="text-right bg-white/5 px-6 py-4 rounded-xl border border-white/10">
                <div className="text-sm text-dark-400 mb-1">Last Updated</div>
                <div className="text-accent-green font-mono font-semibold text-lg">
                  2024-01-25 14:32:17 UTC
                </div>
                <div className="text-xs text-dark-500 mt-1">
                  Auto-refresh: 5s
                </div>
              </div>
            </div>
            <StatsCards />
          </div>

          {/* Main Content - Seamless Flow */}
          <div className="space-y-8">
            <TransactionTable />
          </div>
        </div>
      </div>
    </div>
  );
}
