import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Zap, TrendingDown, Smartphone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Keamanan Terjamin",
    desc: "100% Sistem Resmi XL. Menggunakan fitur Manager-Member resmi, bukan aplikasi pihak ketiga atau metode ilegal.",
    icon: ShieldCheck,
  },
  {
    title: "Aktivasi Instan",
    desc: "Proses Kilat. Begitu pembayaran dikonfirmasi, undangan grup akan dikirimkan langsung ke nomor XL/Axis kamu.",
    icon: Zap,
  },
  {
    title: "Stabilitas Harga",
    desc: "Legacy Pricing System. Kami mengelola harga diskon permanen sejak 2022, memastikan biaya langgananmu tetap rendah.",
    icon: TrendingDown,
  },
  {
    title: "Dual Provider Support",
    desc: "Support XL & Axis. Nikmati jangkauan sinyal luas XL Axiata di nomor XL maupun Axis pribadimu tanpa kendala.",
    icon: Smartphone,
  }
];

export const ValueProposition: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const iconsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered Entrance
      gsap.fromTo(cardsRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );

      // Icon Continuous Animation (Floating)
      iconsRef.current.forEach((icon) => {
        gsap.to(icon, {
          y: -4,
          duration: 2,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut"
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (index: number) => {
    gsap.to(cardsRef.current[index], {
      y: -10,
      borderColor: "rgba(0, 85, 184, 0.4)", // Royal Blue Transparent
      boxShadow: "0 25px 50px -12px rgba(0, 85, 184, 0.15)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = (index: number) => {
    gsap.to(cardsRef.current[index], {
      y: 0,
      borderColor: "rgba(241, 245, 249, 1)", // Default Slate-100
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <section ref={containerRef} className="py-24 w-full bg-white relative z-20">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-clash font-bold text-4xl md:text-5xl text-slate-900 mb-6 tracking-tight">
            Kenapa Harus Akrab Premium?
          </h2>
          <p className="font-inter text-[#64748B] text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            Kami memberikan lebih dari sekadar kuota murah. Kami memberikan kepastian dan kenyamanan layanan.
          </p>
        </div>

        {/* The Alpha Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {features.map((item, i) => (
            <div
              key={i}
              ref={(el) => { if(el) cardsRef.current[i] = el }}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={() => handleMouseLeave(i)}
              className="group bg-white rounded-2xl p-8 border border-slate-100 shadow-sm relative overflow-hidden transition-colors"
            >
                {/* Subtle Noise Texture on Cards */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}></div>

                <div className="relative z-10 flex flex-col items-start gap-5">
                    {/* Icon Wrapper */}
                    <div 
                        ref={(el) => { if(el) iconsRef.current[i] = el }}
                        className="w-14 h-14 rounded-xl bg-royal/5 flex items-center justify-center text-royal border border-royal/10"
                    >
                        <item.icon size={28} />
                    </div>
                    
                    {/* Text Content */}
                    <div>
                        <h3 className="font-clash font-bold text-xl text-slate-900 mb-2">{item.title}</h3>
                        <p className="font-inter text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};