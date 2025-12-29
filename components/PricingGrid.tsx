import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Zap, Crown, Smartphone } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { AreaResult } from '../App';

gsap.registerPlugin(ScrollTrigger);

interface PricingGridProps {
  areaData: AreaResult | null;
}

export const PricingGrid: React.FC<PricingGridProps> = ({ areaData }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  // Base Data Constants
  const XXL_BASE = 40 + 7.5 + 20; // 67.5 GB
  const XL_BASE = 20 + 1.5 + 14; // 35.5 GB

  // Calculate Finals
  const xxlTotal = XXL_BASE + (areaData?.bonusXXL || 0);
  const xlTotal = XL_BASE + (areaData?.bonusXL || 0);

  useEffect(() => {
    // Entrance Animation: 3D Tilt and Stagger
    gsap.fromTo(cardRefs.current,
      { y: 100, opacity: 0, rotationX: 10 },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  return (
    <section id="paket" className="relative py-20 w-full z-10" ref={containerRef}>
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Headline */}
        <div className="text-center mb-16">
          <h2 className="font-clash font-bold text-4xl md:text-5xl mb-4">
            Pilih Paket <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal to-cyan">Sultanmu.</span>
          </h2>
          <p className="font-inter text-gray-400">Harga stabil. Kuota transparan. Tanpa syarat aneh-aneh.</p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Card XL */}
          <PricingCard
            ref={el => { if (el) cardRefs.current[0] = el }}
            title="Akrab XL Premium"
            variant="XL"
            totalGB={xlTotal}
            price="Rp 58.000"
            baseData={{ base: 20, nat: 1.5, reward: 14 }}
            bonusLokal={areaData?.bonusXL || 0}
            accentColor="#22D3EE" // Cyan
          />

          {/* Card XXL */}
          <PricingCard
            ref={el => { if (el) cardRefs.current[1] = el }}
            title="Akrab XXL Premium"
            variant="XXL"
            totalGB={xxlTotal}
            price="Rp 83.000"
            baseData={{ base: 40, nat: 7.5, reward: 20 }}
            bonusLokal={areaData?.bonusXXL || 0}
            accentColor="#0055B8" // Royal Blue
            isBestValue
          />

        </div>
      </div>
      
      {/* CSS for Shimmer */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
};

// --- Sub Component: Pricing Card ---

interface PricingCardProps {
  title: string;
  variant: "XL" | "XXL";
  totalGB: number;
  price: string;
  baseData: { base: number; nat: number; reward: number };
  bonusLokal: number;
  accentColor: string;
  isBestValue?: boolean;
}

const PricingCard = React.forwardRef<HTMLDivElement, PricingCardProps>(({ 
  title, variant, totalGB, price, baseData, bonusLokal, accentColor, isBestValue 
}, ref) => {
  
  const cardRef = useRef<HTMLDivElement>(null);
  const gbRef = useRef<HTMLSpanElement>(null);

  // Combine refs
  useEffect(() => {
    if (typeof ref === 'function') ref(cardRef.current);
    else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = cardRef.current;
  }, [ref]);

  // Mouse Follow Glow Effect
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    };

    card.addEventListener('mousemove', handleMouseMove);
    return () => card.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Counting Animation when totalGB changes
  useEffect(() => {
    if (gbRef.current) {
      const obj = { value: parseFloat(gbRef.current.innerText) || 0 };
      gsap.to(obj, {
        value: totalGB,
        duration: 1.5,
        ease: "power2.out",
        onUpdate: () => {
          if (gbRef.current) gbRef.current.innerText = obj.value.toFixed(1);
        }
      });
    }
  }, [totalGB]);

  return (
    <div 
      ref={cardRef}
      className="relative group rounded-3xl p-[1px] bg-white/5 backdrop-blur-2xl transition-all duration-300 hover:scale-[1.02]"
    >
      {/* Dynamic Border Gradient via CSS Variables */}
      <div 
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${accentColor}40, transparent 40%)`
        }}
      />
      
      <div className="h-full bg-[#0a0a0a]/80 backdrop-blur-xl rounded-3xl p-8 flex flex-col relative overflow-hidden">
        
        {/* Best Value Badge */}
        {isBestValue && (
          <div className="absolute top-6 right-6">
            <div className="relative overflow-hidden bg-royal text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20 shadow-[0_0_15px_rgba(0,85,184,0.5)]">
              <span className="relative z-10">Best Value</span>
              <div className="absolute inset-0 bg-white/30 skew-x-12 animate-shimmer" />
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-6">
            <h3 className="text-gray-400 font-inter text-sm tracking-wide uppercase mb-2">{title}</h3>
            <div className="flex items-baseline gap-1">
                <span ref={gbRef} className="font-clash font-bold text-5xl md:text-6xl text-white">0</span>
                <span className="text-2xl font-clash text-gray-500">GB</span>
            </div>
            <p className={`text-sm mt-1 font-medium ${bonusLokal > 0 ? 'text-emerald-400 animate-pulse' : 'text-gray-500'}`}>
                {bonusLokal > 0 ? `+ Included ${bonusLokal}GB Local Bonus` : 'Local bonus not included yet'}
            </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-6" />

        {/* Features List */}
        <div className="flex-1 space-y-4 mb-8">
            <FeatureRow label="Kuota Utama" value={`${baseData.base} GB`} />
            <FeatureRow label="Kuota Nasional" value={`${baseData.nat} GB`} />
            <FeatureRow label="Reward Akrab" value={`${baseData.reward} GB`} />
            <FeatureRow 
                label="Bonus Lokal" 
                value={bonusLokal > 0 ? `${bonusLokal} GB` : 'Cek Area'} 
                isHighlight={bonusLokal > 0} 
                color={accentColor}
            />
            <div className="flex items-center gap-2 text-gray-400 text-sm mt-4">
                <Crown size={14} className="text-yellow-500" />
                <span>Unlimited WhatsApp & Maps</span>
            </div>
             <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Smartphone size={14} className="text-blue-400" />
                <span>Gratis Nelpon & SMS ke XL/Axis</span>
            </div>
        </div>

        {/* Price & CTA */}
        <div className="mt-auto">
            <div className="mb-4">
                <p className="text-sm text-gray-500">Harga Resmi</p>
                <p className="text-3xl font-clash font-bold text-white">{price} <span className="text-base font-normal text-gray-600">/bln</span></p>
            </div>
            
            <MagneticButton className="w-full">
                <button 
                  className={`w-full py-4 rounded-xl font-bold font-inter text-white transition-transform active:scale-95 shadow-lg relative overflow-hidden group/btn`}
                  style={{ background: `linear-gradient(45deg, ${accentColor}, ${variant === 'XXL' ? '#003380' : '#0891b2'})` }}
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        Amankan Slot
                        <Zap size={18} className="fill-white" />
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                </button>
            </MagneticButton>
        </div>

      </div>
    </div>
  );
});

// Simple Helper for Feature Rows
const FeatureRow = ({ label, value, isHighlight, color }: { label: string, value: string, isHighlight?: boolean, color?: string }) => (
    <div className="flex justify-between items-center text-sm">
        <span className="text-gray-400 flex items-center gap-2">
            <Check size={14} className="text-white/20" /> {label}
        </span>
        <span className={`font-semibold ${isHighlight ? '' : 'text-white'}`} style={{ color: isHighlight ? color : undefined }}>
            {value}
        </span>
    </div>
);