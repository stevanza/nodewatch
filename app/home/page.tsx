import Navbar from "@/components/Layout/Navbar";
import Hero from "@/components/Home/Hero";
import Features from "@/components/Home/Features";
import Stats from "@/components/Home/Stats";
import CTA from "@/components/Home/CTA";

export default function HomePage() {
  return (
    <div className="professional-dark-bg min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Stats />
        <CTA />
      </main>
    </div>
  );
}
