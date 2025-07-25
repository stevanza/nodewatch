"use client";
import {
  ShieldCheckIcon,
  EyeIcon,
  CpuChipIcon,
  ChartBarIcon,
  BoltIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

export default function Features() {
  const features = [
    {
      icon: ShieldCheckIcon,
      title: "Real-time Threat Detection",
      description:
        "Advanced AI algorithms monitor transactions 24/7 to identify suspicious activities and potential security threats before they cause damage.",
      color: "accent-blue",
    },
    {
      icon: EyeIcon,
      title: "Network Monitoring",
      description:
        "Comprehensive oversight of blockchain networks with detailed analytics on transaction patterns, node health, and network performance.",
      color: "accent-green",
    },
    {
      icon: CpuChipIcon,
      title: "Smart Contract Analysis",
      description:
        "Automated vulnerability scanning and security auditing of smart contracts to prevent exploits and ensure code integrity.",
      color: "accent-purple",
    },
    {
      icon: ChartBarIcon,
      title: "Advanced Analytics",
      description:
        "Deep insights into blockchain data with customizable dashboards, risk scoring, and predictive analytics for informed decision-making.",
      color: "accent-orange",
    },
    {
      icon: BoltIcon,
      title: "Instant Alerts",
      description:
        "Immediate notifications for critical security events with customizable alert thresholds and multi-channel delivery options.",
      color: "accent-red",
    },
    {
      icon: LockClosedIcon,
      title: "Enterprise Security",
      description:
        "Bank-grade security protocols with end-to-end encryption, multi-factor authentication, and compliance with industry standards.",
      color: "accent-yellow",
    },
  ];

  return (
    <section id="features-section" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Powerful Security Features
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive blockchain security suite designed for enterprises,
            institutions, and regulatory bodies.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="professional-card p-8 group hover:scale-[1.02] transition-all duration-300"
              >
                <div className="mb-6">
                  <div
                    className={`w-14 h-14 bg-${feature.color}/10 border border-${feature.color}/20 rounded-xl flex items-center justify-center`}
                  >
                    <Icon className={`h-7 w-7 text-${feature.color}`} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
