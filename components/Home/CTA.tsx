"use client";
import { ArrowRightIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

export default function CTA() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-transparent to-accent-purple/10"></div>

      <div className="relative max-w-4xl mx-auto px-8 text-center">
        <div className="professional-card p-12 md:p-16">
          <div className="mb-8">
            <div className="w-16 h-16 bg-accent-blue/20 border border-accent-blue/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheckIcon className="h-8 w-8 text-accent-blue" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Ready to Secure Your Blockchain?
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join hundreds of organizations already protecting their digital
              assets with NodeWatch. Start your free trial today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="group bg-accent-blue hover:bg-accent-blue/90 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-accent-blue/25">
              <span>Start Free Trial</span>
              <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="text-gray-300 hover:text-white border border-gray-600 hover:border-gray-400 px-8 py-4 rounded-xl font-semibold transition-all duration-300">
              Schedule Demo
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-700">
            <p className="text-sm text-gray-500">
              Trusted by banks, exchanges, and regulatory bodies worldwide • SOC
              2 Type II Certified • GDPR Compliant
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
