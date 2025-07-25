"use client";
import { useState } from "react";
import {
  EyeIcon,
  ShieldExclamationIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import type { Transaction } from "@/types";

export default function TransactionTable() {
  const [isLive] = useState(true);

  const transactions: Transaction[] = [
    {
      hash: "0xab4f2c89d3ef89a1b2c3",
      from: "0x1234567890abcdef1234",
      to: "0x9abcdef0123456789abc",
      amount: "23.45 ETH",
      riskScore: 15,
      riskLevel: "Low",
      status: "Approved",
      timestamp: "2 min ago",
    },
    {
      hash: "0xcd5e12abf4c821d7e8f9",
      from: "0x5678901234abcdef5678",
      to: "0xdef0123456789abcdef0",
      amount: "150.00 ETH",
      riskScore: 65,
      riskLevel: "Medium",
      status: "Under Review",
      timestamp: "5 min ago",
    },
    {
      hash: "0xef1234cdb8a945c1d2e3",
      from: "0x9abcdef0123456789abc",
      to: "0x1234567890abcdef1234",
      amount: "500.75 ETH",
      riskScore: 92,
      riskLevel: "High",
      status: "Blocked",
      timestamp: "10 min ago",
    },
  ];

  const getRiskBadgeColor = (level: Transaction["riskLevel"]) => {
    const colors = {
      Low: "bg-accent-green/20 text-accent-green border-accent-green/40",
      Medium: "bg-accent-yellow/20 text-accent-yellow border-accent-yellow/40",
      High: "bg-accent-red/20 text-accent-red border-accent-red/40",
      Critical:
        "bg-accent-purple/20 text-accent-purple border-accent-purple/40",
    };
    return colors[level];
  };

  const getStatusBadgeColor = (status: Transaction["status"]) => {
    const colors = {
      Approved: "bg-accent-green/20 text-accent-green border-accent-green/40",
      "Under Review":
        "bg-accent-yellow/20 text-accent-yellow border-accent-yellow/40",
      Blocked: "bg-accent-red/20 text-accent-red border-accent-red/40",
    };
    return colors[status];
  };

  return (
    <div className="professional-card">
      {/* Header */}
      <div className="p-6 border-b border-dark-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ShieldExclamationIcon className="h-6 w-6 text-accent-blue" />
            <div>
              <h3 className="text-xl font-semibold text-white">
                Transaction Monitor
              </h3>
              <p className="text-sm text-dark-400">
                Real-time blockchain security analysis
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="h-4 w-4 text-dark-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search transactions..."
                className="bg-dark-800 border border-dark-600 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-dark-400 focus:border-accent-blue focus:outline-none w-64"
              />
            </div>

            {/* Filter */}
            <button className="flex items-center space-x-2 px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-dark-300 hover:text-white transition-colors">
              <FunnelIcon className="h-4 w-4" />
              <span className="text-sm">Filter</span>
            </button>

            {/* Status */}
            <div className="flex items-center space-x-2 px-3 py-2 bg-dark-800 rounded-lg border border-dark-600">
              <div
                className={`w-2 h-2 rounded-full ${
                  isLive ? "bg-accent-green pulse-subtle" : "bg-dark-500"
                }`}
              ></div>
              <span className="text-sm text-dark-300">
                {isLive ? "Live" : "Offline"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="professional-table">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-dark-850 border-b border-dark-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-400 uppercase tracking-wider">
                  Transaction Hash
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-400 uppercase tracking-wider">
                  From
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-400 uppercase tracking-wider">
                  To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-400 uppercase tracking-wider">
                  Risk Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700">
              {transactions.map((tx, index) => (
                <tr
                  key={index}
                  className="hover:bg-dark-800/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="crypto-hash">{tx.hash}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="crypto-address">{tx.from}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="crypto-address">{tx.to}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="crypto-amount text-lg">{tx.amount}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRiskBadgeColor(
                        tx.riskLevel
                      )}`}
                    >
                      {tx.riskLevel} ({tx.riskScore})
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadgeColor(
                        tx.status
                      )}`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-accent-blue hover:text-accent-blue/80 transition-colors">
                      <EyeIcon className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="bg-dark-850 px-6 py-3 border-t border-dark-700">
          <div className="flex justify-between items-center text-sm text-dark-400">
            <div>Showing 3 of 2,847,392 transactions</div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 bg-dark-700 hover:bg-dark-600 border border-dark-600 rounded text-dark-300 transition-colors">
                Previous
              </button>
              <span className="px-2 text-dark-500">1 of 948,797</span>
              <button className="px-3 py-1 bg-dark-700 hover:bg-dark-600 border border-dark-600 rounded text-dark-300 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
