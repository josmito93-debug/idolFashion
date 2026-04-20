import { Hero } from "@/components/hero/Hero";
import { ApplicationPortal } from "@/components/forms/ApplicationPortal";

export default function Home() {
  return (
    <main className="relative bg-brand-secondary selection:bg-accent selection:text-white">
      {/* Hero Section with Camera HUD */}
      <Hero />

      {/* Main Content: Intake Lab */}
      <div className="relative z-10 bg-brand-secondary border-t border-white/5">
        <ApplicationPortal />
      </div>

      {/* Footer / Copyright */}
      <footer className="py-12 border-t border-white/5 bg-brand-secondary flex flex-col items-center">
        <div className="camera-hud-text opacity-30 mb-4">Internal Protocol V.2.0.26</div>
        <div className="big-text text-xl opacity-20">Idol Fashion : The Elite Lab</div>
        <p className="font-mono text-[10px] opacity-20 mt-8 tracking-[0.4em]">© 2026 ALL RIGHTS RESERVED | MEDICAL PRECISION IN FASHION</p>
      </footer>
    </main>
  );
}
