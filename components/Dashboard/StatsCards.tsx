"use client";
import {
  ShieldCheckIcon,
  CpuChipIcon,
  ExclamationTriangleIcon,
  BoltIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import type { StatCard } from "@/types";

export default function StatsCards() {
  const stats: StatCard[] = [
    {
      title: "Network Security",
      value: "SECURE",
      color: "green",
      progress: 94,
    },
    {
      title: "Active Nodes",
      value: "2,847,392",
      color: "blue",
      change: { value: "+12.3%", type: "increase", label: "vs last 24h" },
    },
    {
      title: "Threats Detected",
      value: "47",
      color: "yellow",
      change: { value: "+3", type: "increase", label: "active alerts" },
    },
    {
      title: "Blocked Attacks",
      value: "1,247",
      color: "red",
      change: { value: "+67%", type: "increase", label: "this week" },
    },
  ];

  const icons = [
    ShieldCheckIcon,
    CpuChipIcon,
    ExclamationTriangleIcon,
    BoltIcon,
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, any> = {
      green: {
        text: "text-accent-green",
        bg: "bg-accent-green/10",
        progress: "bg-accent-green",
        border: "border-accent-green/20",
      },
      blue: {
        text: "text-accent-blue",
        bg: "bg-accent-blue/10",
        border: "border-accent-blue/20",
      },
      yellow: {
        text: "text-accent-yellow",
        bg: "bg-accent-yellow/10",
        border: "border-accent-yellow/20",
      },
      red: {
        text: "text-accent-red",
        bg: "bg-accent-red/10",
        border: "border-accent-red/20",
      },
    };
    return colors[color];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const colorClasses = getColorClasses(stat.color);
        const Icon = icons[index];

        return (
          <div key={index} className="professional-card p-6 fade-in">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 ${colorClasses.bg} ${colorClasses.border} border rounded-lg flex items-center justify-center`}
                >
                  <Icon className={`h-5 w-5 ${colorClasses.text}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-dark-400">
                    {stat.title}
                  </p>
                  <p className={`text-xl font-bold ${colorClasses.text}`}>
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>

            {stat.progress && (
              <div className="mb-4">
                <div className="flex justify-between text-xs text-dark-400 mb-2">
                  <span>Security Level</span>
                  <span>{stat.progress}%</span>
                </div>
                <div className="w-full bg-dark-700 rounded-full h-2">
                  <div
                    className={`${colorClasses.progress} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${stat.progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {stat.change && (
              <div className="flex items-center">
                <div
                  className={`flex items-center text-sm ${
                    stat.change.type === "increase"
                      ? "text-accent-green"
                      : "text-accent-red"
                  }`}
                >
                  {stat.change.type === "increase" ? (
                    <ArrowUpIcon className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4 mr-1" />
                  )}
                  <span className="font-semibold">{stat.change.value}</span>
                </div>
                <span className="ml-2 text-xs text-dark-500">
                  {stat.change.label}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
