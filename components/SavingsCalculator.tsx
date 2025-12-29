import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PiggyBank, Smartphone, TrendingDown, ArrowRightLeft } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const SavingsCalculator: React.FC = () => {
  const [variant, setVariant] = useState<'XXL' | 'XL'>('XXL');

  // Data Constants based on instruction
  // Akrab Variants for comparison: XXL (95k), XL (75k)
  const AKRAB_XXL_PRICE = 95000;
  const AKRAB_XL_PRICE = 75000;

  // Retail Benchmark: Xtra Combo Plus
  // XXL comparison: 185.500
  // XL comparison: 136.000
  const RETAIL_PRICE = variant === 'XXL' ? 185500 : 136000;

  const currentPrice = variant === 'XXL' ? AKRAB_XXL_PRICE : AKRAB_XL_PRICE;
  const savingsMonthly = RETAIL_PRICE - currentPrice;
  const savingsYearly = savingsMonthly * 12;

  // Refs for animation
  const containerRef = useRef<HTMLDivElement>(null);
  const barRetailRef = useRef<HTMLDivElement>(null);
  const barAkrabRef = useRef<HTMLDivElement>(null);
  const retailPriceRef = useRef<HTMLSpanElement>(null);
  const savingsRef = useRef<HTMLParagraphElement>(null);
  const slashRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Format Currency
  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });

      // Reset bars width initially
      gsap.set([barRetailRef.current, barAkrabRef.current], { width: 0 });
      gsap.set(slashRef.current, { scaleX: 0 });

      // Animate Retail Bar (Slow & Heavy)
      tl.to(barRetailRef.current, {
        width: "100%",
        duration: 1.2,
        ease: "power2.out"
      });

      // Animate Slash Effect on Retail Price
      tl.to(slashRef.current, {
        scaleX: 1,
        duration: 0.4,
        ease: "power4.inOut"
      }, "-=0.5");

      // Animate Akrab Bar (Fast & Springy)
      // Width calculation relative to retail (approx percentage)
      const widthPercentage = (currentPrice / RETAIL_PRICE) * 100;

      tl.to(barAkrabRef.current, {
        width: `${widthPercentage}%`,
        duration: 1,
        ease: "elastic.out(1, 0.5)"
      }, "-=0.2");

      // Counter Animation for Savings
      tl.from(savingsRef.current, {
        textContent: 0,
        duration: 1.5,
        ease: "power2.out",
        snap: { textContent: 1 },
        stagger: 1,
        onUpdate: function () {
          if (savingsRef.current) {
            this.targets()[0].innerHTML = formatRupiah(Math.ceil(this.targets()[0].textContent));
          }
        }
      }, "<");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Effect when toggling variant
  useEffect(() => {
    // Re-animate Akrab bar width when variant changes
    const widthPercentage = (currentPrice / RETAIL_PRICE) * 100;
    gsap.to(barAkrabRef.current, {
      width: `${widthPercentage}%`,
      duration: 0.6,
      ease: "elastic.out(1, 0.6)"
    });

    // Animate counter update
    // Calculate previous savings (approximate based on just switching the prices)
    // We'll just animate from 0 or current text context if needed, but simplest is just text re-update or simple tween
    // The previous code had a mock object, let's keep it simple and effective
    const startVal = savingsMonthly - (variant === 'XXL' ? -20000 : 20000); // Rough transition point
    // Ideally we should track previous savings in state/ref, but for this simple toggle this approximation or just current is fine
    // Let's just animate to the new value from the OLD value logic if we can, or just from current display

    const obj = { val: startVal };
    gsap.to(obj, {
      val: savingsMonthly,
      duration: 0.5,
      onUpdate: () => {
        if (savingsRef.current) savingsRef.current.innerText = formatRupiah(obj.val);
      }
    });

    // Also update Retail Price Ref if it exists
    if (retailPriceRef.current) {
      retailPriceRef.current.innerText = formatRupiah(RETAIL_PRICE);
    }

  }, [variant, currentPrice, savingsMonthly, RETAIL_PRICE]);

  // Hover Effect Shake
  const handleHover = () => {
    gsap.to(cardRef.current, {
      x: "random(-2, 2)",
      y: "random(-2, 2)",
      duration: 0.1,
      repeat: 5,
      yoyo: true,
      ease: "sine.inOut"
    });
  };

  return (
    <section ref={containerRef} className="relative py-24 w-full bg-[#F8FAFC] text-slate-800 overflow-hidden">
      {/* Background Decor - Soft Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-200/40 blur-[100px] rounded-full pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-200/40 blur-[100px] rounded-full pointer-events-none mix-blend-multiply" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-clash font-extrabold text-4xl md:text-6xl text-slate-900 mb-6 leading-tight">
            Berhenti Membayar <span className="text-royal">Lebih.</span>
          </h2>
          <p className="font-inter text-[#64748B] text-lg md:text-xl leading-relaxed">
            Bandingkan harga paket lain <span className="font-semibold text-slate-700">(Xtra Combo Plus)</span> dengan Paket Akrab kami. Sama-sama XL, tapi harga jauh berbeda.
          </p>
          <p className="mt-3 text-xs md:text-sm text-slate-500 italic opacity-80">
            *Perbandingan harga diambil dari varian Xtra Combo Plus dengan total kuota yang mendekati paket Akrab
          </p>
        </div>

        {/* Calculator Card */}
        <div
          ref={cardRef}
          onMouseEnter={handleHover}
          className="max-w-4xl mx-auto bg-white rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-6 md:p-10 border border-slate-100 relative"
        >
          {/* Toggle Switch */}
          <div className="flex justify-center mb-12">
            <div className="bg-slate-100 p-1.5 rounded-full flex relative">
              {/* Sliding Background */}
              <div
                className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-full shadow-sm transition-all duration-300 ease-spring ${variant === 'XXL' ? 'left-1.5' : 'left-[calc(50%+3px)]'}`}
              />

              <button
                onClick={() => setVariant('XXL')}
                className={`relative z-10 px-8 py-2.5 rounded-full text-sm font-bold font-clash transition-colors ${variant === 'XXL' ? 'text-royal' : 'text-slate-400'}`}
              >
                Varian XXL
              </button>
              <button
                onClick={() => setVariant('XL')}
                className={`relative z-10 px-8 py-2.5 rounded-full text-sm font-bold font-clash transition-colors ${variant === 'XL' ? 'text-royal' : 'text-slate-400'}`}
              >
                Varian XL
              </button>
            </div>
          </div>

          {/* Comparison UI */}
          <div className="space-y-8 relative">

            {/* Retail Bar */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-slate-500 font-medium text-sm flex items-center gap-2">
                  <TrendingDown size={16} /> Retail Market
                </span>
                <div className="relative">
                  <span ref={retailPriceRef} className="text-slate-400 font-clash font-bold text-xl md:text-2xl">
                    {formatRupiah(RETAIL_PRICE)}
                  </span>
                  {/* Slashing Effect */}
                  <div ref={slashRef} className="absolute top-1/2 left-0 w-full h-[3px] bg-red-500 -rotate-3 origin-left shadow-sm"></div>
                </div>
              </div>
              <div className="h-12 w-full bg-slate-100 rounded-2xl overflow-hidden relative">
                {/* Stripe Pattern */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 10px)' }}></div>
                <div ref={barRetailRef} className="h-full bg-[#CBD5E1] rounded-2xl w-0"></div>
              </div>
            </div>

            {/* Akrab Bar */}
            <div className="relative">
              {/* Floating Savings Badge */}
              <div className="absolute right-0 -top-6 md:-top-8 translate-x-2 md:translate-x-6 z-20">
                <div className="bg-gradient-to-r from-royal to-cyan text-white px-4 py-2 rounded-xl shadow-xl shadow-blue-500/30 transform rotate-2 animate-bounce-slow">
                  <p className="text-xs font-medium opacity-90">Hemat</p>
                  <p ref={savingsRef} className="font-clash font-bold text-lg md:text-xl">
                    {formatRupiah(savingsMonthly)}
                  </p>
                  <span className="text-[10px] opacity-80">/ bulan</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-2">
                <span className="text-royal font-bold text-sm flex items-center gap-2">
                  <Smartphone size={16} /> Paket Akrab Kamu
                </span>
                <span className="text-royal font-clash font-bold text-3xl md:text-4xl">
                  {formatRupiah(currentPrice)}
                </span>
              </div>

              <div className="h-12 w-full bg-slate-100 rounded-2xl overflow-hidden shadow-inner">
                <div
                  ref={barAkrabRef}
                  className="h-full bg-royal rounded-2xl relative w-0 shadow-[0_0_20px_rgba(0,85,184,0.4)]"
                >
                  {/* Inner Glow/Shine */}
                  <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-white/30 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Annual Perspective */}
          <div className="mt-12 bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 shrink-0">
              <PiggyBank size={24} />
            </div>
            <div>
              <h4 className="font-clash font-bold text-lg text-slate-800">Perspective Tahunan</h4>
              <p className="text-slate-600 text-sm mt-1">
                {variant === 'XL' ? (
                  <>
                    Hemat hingga <span className="font-bold text-emerald-600 bg-emerald-100 px-1 rounded">Rp 732.000</span> per tahun.
                    Sama aja kayak dapet langganan Netflix + Spotify setahun gratis tanpa bayar lagi! 🍿🎶
                  </>
                ) : (
                  <>
                    Hemat hingga <span className="font-bold text-emerald-600 bg-emerald-100 px-1 rounded">Rp 1.000.000+</span> per tahun.
                    Lumayan banget buat upgrade tiket konser ke VIP atau budget staycation pas liburan! 🎟️✨
                  </>
                )}
              </p>
            </div>
          </div>

        </div>

        {/* CSS for custom animations */}
        <style>{`
            .ease-spring {
                transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .animate-bounce-slow {
                animation: bounce-slow 3s infinite;
            }
            @keyframes bounce-slow {
                0%, 100% { transform: translateY(0) rotate(2deg); }
                50% { transform: translateY(-5px) rotate(2deg); }
            }
        `}</style>
      </div>
    </section>
  );
};