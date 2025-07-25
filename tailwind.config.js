/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "Consolas", "Monaco", "monospace"],
      },
      animation: {
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
        "fade-in": "fadeIn 0.3s ease-out",
      },
      keyframes: {
        pulseSubtle: {
          "0%, 100%": { opacity: "0.8" },
          "50%": { opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      colors: {
        // Professional dark color palette
        dark: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          850: "#172033",
          900: "#0f172a",
          950: "#020617",
        },
        accent: {
          blue: "#3b82f6",
          green: "#10b981",
          yellow: "#f59e0b",
          red: "#ef4444",
          purple: "#8b5cf6",
          orange: "#f97316",
          pink: "#f472b6", // Tambahan untuk warning
        },
        crypto: {
          success: "#059669",
          warning: "#d97706",
          danger: "#dc2626",
          info: "#2563eb",
        },
        // Fix untuk accent-* warnings
        "accent-blue": "#3b82f6",
        "accent-green": "#10b981",
        "accent-purple": "#8b5cf6",
        "accent-orange": "#f97316",
        "accent-red": "#ef4444",
        "accent-yellow": "#f59e0b",
        "accent-pink": "#f472b6",
        "dark-850": "#172033",
        "dark-900": "#0f172a",
        "dark-950": "#020617",
      },
      backgroundImage: {
        "dark-gradient": "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        "card-gradient": "linear-gradient(145deg, #1e293b 0%, #334155 100%)",
        "navbar-gradient":
          "linear-gradient(90deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
      },
      // Fix untuk unknown rules
      spacing: {
        18: "4.5rem",
        88: "22rem",
      },
      minHeight: {
        screen: "100vh",
      },
    },
  },
  plugins: [],
};
