"use client";
import {
  ShieldCheckIcon,
  ArrowRightIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";

export default function Hero() {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById("features-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-start justify-center overflow-hidden pt-24">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-850 to-dark-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.1),transparent_50%)]"></div>

      {/* Animated Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 text-center">
        {/* Main Content */}
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-accent-blue/10 border border-accent-blue/20 rounded-full px-6 py-3">
            <ShieldCheckIcon className="h-5 w-5 text-accent-blue" />
            <span className="text-accent-blue font-medium text-sm">
              Blockchain Security Platform
            </span>
          </div>

          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Secure Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-accent-blue via-accent-purple to-accent-green bg-clip-text text-transparent">
                Blockchain
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Advanced AI-powered threat detection and real-time monitoring for
              blockchain networks. Protect your digital assets with
              enterprise-grade security.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <button className="group bg-accent-blue hover:bg-accent-blue/90 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-accent-blue/25">
              <span>Get Started</span>
              <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="group flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
              <div className="w-12 h-12 rounded-full border-2 border-gray-600 group-hover:border-white flex items-center justify-center transition-colors">
                <PlayIcon className="h-5 w-5 ml-1" />
              </div>
              <span className="font-medium">Watch Demo</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                99.9%
              </div>
              <div className="text-gray-400 text-sm">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                2.8M+
              </div>
              <div className="text-gray-400 text-sm">
                Transactions Monitored
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                1,247
              </div>
              <div className="text-gray-400 text-sm">Threats Blocked</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                24/7
              </div>
              <div className="text-gray-400 text-sm">Monitoring</div>
            </div>
          </div>
        </div>
      </div>

      {/* Clickable Scroll Indicator */}
      <button
        onClick={scrollToNextSection}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer group transition-all duration-300 hover:scale-110"
        aria-label="Scroll to next section"
      >
        <div className="w-6 h-10 border-2 border-gray-600 group-hover:border-accent-blue rounded-full flex justify-center transition-colors">
          <div className="w-1 h-3 bg-gray-600 group-hover:bg-accent-blue rounded-full mt-2 transition-colors"></div>
        </div>
      </button>
    </section>
  );
}
