export interface Transaction {
  hash: string;
  from: string;
  to: string;
  amount: string;
  riskScore: number;
  riskLevel: "Low" | "Medium" | "High" | "Critical";
  status: "Approved" | "Under Review" | "Blocked";
  timestamp: string;
}

export interface Alert {
  id: string;
  type: "error" | "warning" | "info";
  title: string;
  description: string;
  time: string;
}

export interface NetworkCluster {
  name: string;
  count: number;
  color: string;
}

export interface StatCard {
  title: string;
  value: string | number;
  color: "green" | "blue" | "yellow" | "red";
  change?: {
    value: string;
    type: "increase" | "decrease";
    label: string;
  };
  progress?: number;
}
