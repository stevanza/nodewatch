"use client";
import { useState, useEffect } from "react";

export default function Stats() {
  const [counters, setCounters] = useState({
    transactions: 0,
    threats: 0,
    uptime: 0,
    nodes: 0,
  });

  useEffect(() => {
    const targets = {
      transactions: 2847392,
      threats: 1247,
      uptime: 99.9,
      nodes: 156,
    };

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = duration / steps;

    Object.keys(targets).forEach((key) => {
      const target = targets[key];
      const step = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCounters((prev) => ({
          ...prev,
          [key]:
            key === "uptime" ? Number(current.toFixed(1)) : Math.floor(current),
        }));
      }, increment);
    });
  }, []);

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/5 to-accent-purple/5"></div>

      <div className="relative max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Trusted by Industry Leaders
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            Real-time metrics from our global security network
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-8 professional-card">
            <div className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent mb-4">
              {counters.transactions.toLocaleString()}
            </div>
            <div className="text-gray-400 font-medium">
              Transactions Monitored
            </div>
          </div>

          <div className="text-center p-8 professional-card">
            <div className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-accent-green to-accent-blue bg-clip-text text-transparent mb-4">
              {counters.threats.toLocaleString()}
            </div>
            <div className="text-gray-400 font-medium">Threats Blocked</div>
          </div>

          <div className="text-center p-8 professional-card">
            <div className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-accent-purple to-accent-pink bg-clip-text text-transparent mb-4">
              {counters.uptime}%
            </div>
            <div className="text-gray-400 font-medium">System Uptime</div>
          </div>

          <div className="text-center p-8 professional-card">
            <div className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-accent-orange to-accent-red bg-clip-text text-transparent mb-4">
              {counters.nodes}
            </div>
            <div className="text-gray-400 font-medium">Global Nodes</div>
          </div>
        </div>
      </div>
    </section>
  );
}
