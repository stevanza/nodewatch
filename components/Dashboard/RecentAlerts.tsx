"use client";
import {
  ExclamationCircleIcon,
  FlagIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import type { Alert } from "@/types";

export default function RecentAlerts() {
  const alerts: Alert[] = [
    {
      id: "1",
      type: "error",
      title: "High-Risk Transaction Detected",
      description: "Wallet: 0x1234...5678 | Amount: 450.5 ETH",
      time: "2 minutes ago",
    },
    {
      id: "2",
      type: "warning",
      title: "Unusual Activity Pattern",
      description: "Multiple small transactions detected",
      time: "15 minutes ago",
    },
    {
      id: "3",
      type: "info",
      title: "Smart Contract Vulnerability",
      description: "Potential reentrancy issue found",
      time: "1 hour ago",
    },
  ];

  const getAlertStyles = (type: Alert["type"]) => {
    const styles = {
      error: {
        icon: ExclamationCircleIcon,
        bgColor: "bg-red-50",
        iconColor: "text-red-500",
      },
      warning: {
        icon: FlagIcon,
        bgColor: "bg-yellow-50",
        iconColor: "text-yellow-500",
      },
      info: {
        icon: InformationCircleIcon,
        bgColor: "bg-blue-50",
        iconColor: "text-blue-500",
      },
    };
    return styles[type];
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Recent Alerts</h3>
        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          3 Active
        </span>
      </div>
      <div className="space-y-4">
        {alerts.map((alert) => {
          const styles = getAlertStyles(alert.type);
          const Icon = styles.icon;

          return (
            <div
              key={alert.id}
              className={`flex items-start space-x-3 p-3 ${styles.bgColor} rounded-lg`}
            >
              <Icon
                className={`h-5 w-5 ${styles.iconColor} mt-1 flex-shrink-0`}
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {alert.title}
                </p>
                <p className="text-xs text-gray-500">{alert.description}</p>
                <p className="text-xs text-gray-400">{alert.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
