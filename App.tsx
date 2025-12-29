import React, { useState, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { Background } from './components/Background';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AreaCheck } from './components/AreaCheck';
import { PricingGrid } from './components/PricingGrid';
import { SavingsCalculator } from './components/SavingsCalculator';
import { ValueProposition } from './components/ValueProposition';
import { SocialProof } from './components/SocialProof';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { MobileNav } from './components/MobileNav';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface AreaResult {
  city: string;
  area: number;
  bonusXXL: number;
  bonusXL: number;
  found: boolean;
}

const App: React.FC = () => {
  const [areaResult, setAreaResult] = useState<AreaResult | null>(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Force a resize calculation after preloader animation finishes
    // This ensures Lenis recognizes the full document height
    const timer = setTimeout(() => {
        lenis.resize();
        ScrollTrigger.refresh();
    }, 2500);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      clearTimeout(timer);
    };
  }, []);

  return (
    // Changed overflow-hidden to overflow-x-hidden. 
    // overflow-hidden completely disables scrollbars in some contexts.
    <main className="relative min-h-screen bg-[#050507] text-white overflow-x-hidden selection:bg-cyan/30 selection:text-white">
      <Preloader />
      <CustomCursor />
      
      <Background />
      <Header />
      <Hero />
      <AreaCheck onScanComplete={setAreaResult} />
      <PricingGrid areaData={areaResult} />
      <SavingsCalculator />
      <ValueProposition />
      <SocialProof />
      <FAQ />
      <Footer />
      
      <MobileNav />
    </main>
  );
};

export default App;