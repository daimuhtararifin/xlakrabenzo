import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Search, MapPin, Database, Cpu, Globe, CheckCircle2 } from 'lucide-react';
import { AreaResult } from '../App';

// Dummy Data
const areaData = [
  { city: "Sleman", area: 3, bonusXXL: 17.5, bonusXL: 12 },
  { city: "Yogyakarta", area: 3, bonusXXL: 17.5, bonusXL: 12 },
  { city: "Jakarta Selatan", area: 2, bonusXXL: 4.5, bonusXL: 3 },
  { city: "Surabaya", area: 4, bonusXXL: 57.5, bonusXL: 36 },
  { city: "Bandung", area: 3, bonusXXL: 17.5, bonusXL: 12 },
  { city: "Medan", area: 2, bonusXXL: 4.5, bonusXL: 3 }
];

interface AreaCheckProps {
  onScanComplete?: (result: AreaResult) => void;
}

export const AreaCheck: React.FC<AreaCheckProps> = ({ onScanComplete }) => {
  const [query, setQuery] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<AreaResult | null>(null);

  const scanLineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const xxlCounterRef = useRef<HTMLSpanElement>(null);
  const xlCounterRef = useRef<HTMLSpanElement>(null);

  // Function to format city name (capitalize first letter of each word)
  const formatCityName = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Blur input on mobile to hide keyboard and see results
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement) {
        activeElement.blur();
    }

    // Reset previous result locally
    if (result) {
        gsap.to(resultRef.current, {
            opacity: 0,
            y: 20,
            duration: 0.3,
            onComplete: () => setResult(null)
        });
    }

    setIsScanning(true);

    // 1. Scanning Animation
    if (scanLineRef.current) {
      gsap.timeline()
        .set(scanLineRef.current, { opacity: 1, top: 0 })
        .to(scanLineRef.current, {
          top: "100%",
          duration: 0.75,
          ease: "power2.inOut",
          yoyo: true,
          repeat: 1
        })
        .set(scanLineRef.current, { opacity: 0 });
    }

    // Simulate Processing Time
    setTimeout(() => {
      const formattedQuery = formatCityName(query);
      const foundData = areaData.find(item => item.city.toLowerCase() === query.toLowerCase());

      const finalResult = foundData 
        ? { ...foundData, found: true }
        : { city: formattedQuery, area: 1, bonusXXL: 0, bonusXL: 0, found: false };

      setIsScanning(false);
      setResult(finalResult);
      
      // Pass data up to App -> PricingGrid
      if (onScanComplete) {
        onScanComplete(finalResult);
      }
    }, 1500);
  };

  // Animate Result Entrance & Counters
  useEffect(() => {
    if (result && resultRef.current) {
      // 2. Reveal Card
      gsap.fromTo(resultRef.current, 
        { y: 50, opacity: 0, scale: 0.9 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1, 
          duration: 0.8, 
          ease: "elastic.out(1, 0.6)",
          stagger: 0.1
        }
      );

      // 3. Counter Animation
      const counters = [
        { ref: xxlCounterRef, val: result.bonusXXL },
        { ref: xlCounterRef, val: result.bonusXL }
      ];

      counters.forEach(({ ref, val }) => {
        if (ref.current) {
            const obj = { value: 0 };
            gsap.to(obj, {
                value: val,
                duration: 1.5,
                ease: "power2.out",
                onUpdate: () => {
                    if (ref.current) {
                        ref.current.innerText = obj.value.toFixed(1) + " GB";
                    }
                }
            });
        }
      });
    }
  }, [result]);

  return (
    <section id="area-check" className="relative py-20 md:py-24 w-full z-10">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-royal/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative">
        <div ref={containerRef} className="max-w-4xl mx-auto bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[24px] md:rounded-[32px] p-6 md:p-12 shadow-2xl relative overflow-hidden group">
          
          {/* Decorative Grid inside card */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

          <div className="relative z-10 text-center mb-8 md:mb-10">
            <h2 className="font-clash font-bold text-3xl md:text-5xl mb-4">
              Cek Jatah <span className="text-cyan">Kuotamu</span> di Sini.
            </h2>
            <p className="font-inter text-gray-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Cukup masukkan nama Kota/Kabupatenmu untuk melihat total bonus kuota yang akan kamu dapatkan secara transparan.
            </p>
          </div>

          {/* Search Bar Section */}
          <div className="relative max-w-xl mx-auto mb-10 md:mb-12">
            <form onSubmit={handleSearch} className="relative group/input">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className={`w-5 h-5 transition-colors duration-300 ${isScanning ? 'text-cyan' : 'text-gray-500'}`} />
              </div>
              
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Contoh: Surabaya, Sleman..." 
                className={`w-full bg-black/40 border transition-all duration-300 rounded-2xl py-4 pl-12 pr-28 md:pr-32 text-white font-inter text-base placeholder-gray-600 focus:outline-none focus:ring-1 
                  ${isScanning 
                    ? 'border-cyan/50 shadow-[0_0_20px_rgba(34,211,238,0.2)]' 
                    : 'border-white/10 focus:border-royal focus:shadow-[0_0_20px_rgba(0,85,184,0.3)]'
                  }`}
                style={{ fontSize: '16px' }} // Prevent iOS zoom on focus
              />

              <button 
                type="submit"
                disabled={isScanning || !query}
                className="absolute right-2 top-2 bottom-2 px-4 md:px-6 bg-white text-black active:scale-95 hover:bg-gray-100 font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
              >
                {isScanning ? 'Scan..' : 'Check'}
              </button>
              
              {/* Laser Scan Line */}
              <div 
                ref={scanLineRef} 
                className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan to-transparent shadow-[0_0_15px_#22D3EE] opacity-0 pointer-events-none z-20"
                style={{ top: 0 }}
              />
            </form>
            
            {/* Scanning Status Text */}
            {isScanning && (
              <p className="mt-3 text-center text-cyan/80 text-xs font-mono animate-pulse tracking-widest uppercase">
                Analyzing Location Data...
              </p>
            )}
          </div>

          {/* Results Card */}
          {result && (
            <div ref={resultRef} className="bg-gradient-to-b from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
               {/* Result Status Badge */}
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-royal/20 flex items-center justify-center border border-royal/30 text-royal shrink-0">
                        <MapPin size={20} className="md:w-6 md:h-6" />
                    </div>
                    <div>
                        <h3 className="font-clash font-semibold text-xl md:text-2xl text-white">{result.city}</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className={`inline-block w-2 h-2 rounded-full ${result.found ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
                            <span className="text-[10px] md:text-xs text-gray-400 font-mono uppercase tracking-wide">
                                {result.found ? 'Area Verified' : 'Standard Area'}
                            </span>
                        </div>
                    </div>
                 </div>
                 <div className="w-full md:w-auto flex md:block justify-between items-center bg-white/5 md:bg-transparent p-2 md:p-0 rounded-lg">
                    <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider mb-0 md:mb-1">Zone Area</p>
                    <p className="font-syne font-bold text-2xl md:text-3xl text-white/90">#{result.area}</p>
                 </div>
               </div>

               {/* Data Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {/* XL Variant */}
                  <div className="bg-black/20 rounded-xl p-4 border border-white/5 hover:border-white/10 transition-colors group">
                    <div className="flex justify-between mb-2">
                        <div className="flex items-center gap-2 text-gray-400">
                            <Database size={14} />
                            <span className="text-xs font-medium">Paket Akrab XL</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white/60">Popular</span>
                    </div>
                    <div className="flex items-end gap-2">
                         <span ref={xlCounterRef} className="font-clash font-bold text-2xl md:text-3xl text-white">0 GB</span>
                         <span className="text-xs md:text-sm text-cyan mb-1.5">+ Bonus Lokal</span>
                    </div>
                  </div>

                  {/* XXL Variant */}
                  <div className="bg-gradient-to-br from-royal/20 to-transparent rounded-xl p-4 border border-royal/30 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-royal/30 blur-2xl -mr-5 -mt-5"></div>
                    <div className="flex justify-between mb-2 relative z-10">
                        <div className="flex items-center gap-2 text-cyan">
                            <Cpu size={14} />
                            <span className="text-xs font-bold">Paket Akrab XXL</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-royal text-white font-bold">Best Value</span>
                    </div>
                    <div className="flex items-end gap-2 relative z-10">
                         <span ref={xxlCounterRef} className="font-clash font-bold text-3xl md:text-4xl text-white text-shadow-glow">0 GB</span>
                         <span className="text-xs md:text-sm text-cyan mb-1.5">+ Bonus Lokal</span>
                    </div>
                  </div>
               </div>

               {/* Default Notice */}
               {!result.found && (
                   <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-start gap-3">
                       <Globe className="text-amber-500 mt-0.5 shrink-0" size={16} />
                       <p className="text-xs text-amber-200/80 leading-relaxed">
                           Kota tidak ditemukan di database prioritas kami. Secara default, lokasi ini masuk ke kategori <strong>Area 1</strong> dengan bonus kuota standar (0 GB).
                       </p>
                   </div>
               )}
               
               {result.found && (
                   <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-start gap-3">
                       <CheckCircle2 className="text-emerald-500 mt-0.5 shrink-0" size={16} />
                       <p className="text-xs text-emerald-200/80 leading-relaxed">
                           Lokasi terverifikasi! Kamu berhak mendapatkan bonus kuota lokal yang besar di area ini.
                       </p>
                   </div>
               )}

            </div>
          )}

        </div>
      </div>
      
      <style>{`
        .text-shadow-glow {
            text-shadow: 0 0 20px rgba(0, 85, 184, 0.5);
        }
      `}</style>
    </section>
  );
};