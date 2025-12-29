import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const Preloader: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setIsFinished(true)
    });

    // 1. Counter Animation (0 to 100)
    const counter = { val: 0 };
    tl.to(counter, {
      val: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.innerText = Math.floor(counter.val).toString();
        }
      }
    });

    // 2. Text Reveal
    tl.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5
    }, "-=1.5");

    // 3. Exit Animation (Slide Up Curtain)
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 1,
      ease: "power4.inOut",
      delay: 0.2
    });

    // 4. Cleanup to prevent blocking interaction underneath if anything fails
    tl.set(containerRef.current, { display: 'none' });

  }, []);

  if (isFinished) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#050507] flex flex-col items-center justify-center text-white overflow-hidden"
    >
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="relative z-10 flex flex-col items-center">
            <div className="flex items-start">
                <h1 ref={counterRef} className="font-clash font-bold text-8xl md:text-[10rem] leading-none tracking-tighter">
                    0
                </h1>
                <span className="font-syne text-xl md:text-3xl text-cyan mt-4 md:mt-8">%</span>
            </div>

            <div ref={textRef} className="opacity-0 translate-y-4 mt-4 flex items-center gap-3">
                <div className="w-2 h-2 bg-royal rounded-full animate-pulse"></div>
                <p className="font-inter text-xs md:text-sm tracking-[0.2em] text-slate-400 uppercase">
                    Initializing System
                </p>
            </div>
        </div>

        {/* Decorative Loader Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
            <div className="h-full bg-cyan shadow-[0_0_20px_#22D3EE]" style={{ width: '100%', animation: 'loadProgress 2s ease-in-out forwards' }}></div>
        </div>

        <style>{`
            @keyframes loadProgress {
                0% { width: 0%; }
                100% { width: 100%; }
            }
        `}</style>
    </div>
  );
};