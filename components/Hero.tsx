import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { PhoneMockup } from './PhoneMockup';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const phoneContainerRef = useRef<HTMLDivElement>(null);
  const phoneInnerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgShapeRef = useRef<HTMLDivElement>(null);

  // Helper to split text for animation without premium plugins
  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        className="inline-block char-reveal opacity-0 translate-y-10"
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1. Entrance Animation (Text Reveal)
    if (headlineRef.current) {
      const chars = headlineRef.current.querySelectorAll('.char-reveal');
      tl.to(chars, {
        y: 0,
        opacity: 1,
        stagger: 0.03,
        duration: 1,
      });
    }

    // 2. Subhead & Badge Fade In
    tl.to([subheadRef.current, badgeRef.current], {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1
    }, "-=0.5");

    // 3. Phone Entrance (Slide Up + Tilt)
    tl.fromTo(phoneInnerRef.current,
      { y: 100, opacity: 0, rotationX: 10, rotationY: -10 },
      { y: 0, opacity: 1, rotationX: 0, rotationY: -5, duration: 1.2, ease: "power2.out" },
      "-=0.8"
    );

    // 4. Gravity Effect (Continuous Float) - Mixed with mouse interaction later
    if (phoneInnerRef.current) {
      gsap.to(phoneInnerRef.current, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    // 5. Kinetic Scroll Effect (Breathing Text)
    if (headlineRef.current && containerRef.current) {
      gsap.to(headlineRef.current, {
        letterSpacing: "0.05em", // Subtle expansion
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      });
    }

    // 6. Interactive Mouse Movement (3D Tilt)
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !phoneInnerRef.current) return;

      // Disable on touch devices to save battery/performance
      if (window.matchMedia("(pointer: coarse)").matches) return;

      const { innerWidth, innerHeight } = window;
      // Calculate normalized position (-1 to 1)
      const xPos = (e.clientX / innerWidth - 0.5) * 2;
      const yPos = (e.clientY / innerHeight - 0.5) * 2;

      // Rotate Phone (Inverted logic for feel: mouse left -> look left)
      gsap.to(phoneInnerRef.current, {
        rotationY: xPos * 15, // Rotate Y axis based on X movement
        rotationX: -yPos * 15, // Rotate X axis based on Y movement
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto" // Important to not conflict with entrance
      });

      // Parallax Background Shape
      if (bgShapeRef.current) {
        gsap.to(bgShapeRef.current, {
          x: -xPos * 40,
          y: -yPos * 40,
          duration: 1,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);

  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen w-full flex items-center pt-24 pb-12 overflow-hidden perspective-container">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-8 items-center">

          {/* Left: Text Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left z-10 pointer-events-none md:pointer-events-auto order-1 lg:order-none">

            {/* Floating Badge */}
            <div
              ref={badgeRef}
              className="opacity-0 translate-y-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-royal/30 bg-royal/10 backdrop-blur-sm mb-6 md:mb-8"
            >
              <ShieldCheck size={14} className="text-cyan" />
              <span className="font-syne font-bold text-xs tracking-wide text-cyan">Trusted Reseller since 2022</span>
            </div>

            {/* Headline */}
            <h1 ref={headlineRef} className="font-clash font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-6 tracking-tight relative z-20">
              <span>{splitText("Kuota")} </span>
              <span className="font-syne italic font-bold text-outline-royal block sm:inline">{splitText("Sultan")} </span>
              <br className="hidden sm:block" />
              <span>{splitText("24 Jam,")} </span>
              <span className="font-clash font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] via-[#FDB931] to-[#FFD700] bg-[length:200%_auto] animate-gradient drop-shadow-[0_0_15px_rgba(253,186,49,0.5)] brightness-110">
                Harga Hemat
              </span>
            </h1>

            {/* Sub-headline */}
            <p ref={subheadRef} className="opacity-0 translate-y-4 font-inter text-gray-400 text-base md:text-lg leading-relaxed max-w-lg mb-8 md:mb-10 relative z-20">
              Satu paket untuk semua kebutuhan. Dapatkan akses Paket Akrab XL @enzonixc dengan harga stabil dan transparan. Dikelola profesional untuk kamu yang anti-ribet.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pointer-events-auto">
              <MagneticButton>
                <button
                  onClick={() => {
                    const element = document.getElementById('area-check');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-[#0055B8] to-[#0284c7] rounded-full text-white font-bold font-inter overflow-hidden shadow-[0_0_20px_rgba(0,85,184,0.4)] transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] interactive w-full sm:w-auto"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Cek Jatah Kuotamu
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </button>
              </MagneticButton>
            </div>
          </div>

          {/* Right: 3D Phone Mockup */}
          {/* Mobile optimization: Reduced height container and added scaling to phone */}
          <div ref={phoneContainerRef} className="relative flex justify-center items-center h-[380px] sm:h-[480px] md:h-[600px] lg:h-auto perspective-1000 order-2 lg:order-none w-full mt-4 lg:mt-0">

            {/* Abstract Lines Floating behind phone (Parallax Layer) */}
            <div ref={bgShapeRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg className="w-[120%] h-[120%] opacity-10 animate-spin-slow" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="0.2" strokeDasharray="4 4" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="white" strokeWidth="0.2" />
              </svg>
            </div>

            {/* Scaled down on mobile to prevent overflow/collision */}
            <div ref={phoneInnerRef} className="relative z-20 transform-gpu preserve-3d will-change-transform scale-[0.6] sm:scale-[0.75] md:scale-100 origin-center">
              <PhoneMockup />
              {/* Shadow */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-40 h-8 bg-black/40 blur-xl rounded-[100%] z-[-1]" />
            </div>
          </div>

        </div>
      </div>

      {/* Styles for gradient animation */}
      <style>{`
        .perspective-container {
            perspective: 2000px;
        }
        .perspective-1000 {
            perspective: 1000px;
        }
        .preserve-3d {
            transform-style: preserve-3d;
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 6s ease infinite;
        }
        .animate-spin-slow {
            animation: spin 60s linear infinite;
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};