import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { name: "Rian", loc: "Sleman", text: "Awalnya skeptis, pas coba ternyata beneran masuk kuotanya. Udah 6 bulan langganan di sini." },
  { name: "Siska", loc: "Jakarta", text: "Gila sih hematnya kerasa banget buat drakoran seharian. Adminnya fast respon banget!" },
  { name: "Daffa", loc: "Surabaya", text: "Mahasiswa approved! Lumayan duit sisa paketannya bisa buat jajan enak tiap bulan." },
  { name: "Andi", loc: "Bandung", text: "Sinyal XL di sini emang juara, ditambah paket murah gini makin mantap." },
  { name: "Mega", loc: "Medan", text: "Udah langganan setahun lebih, gapernah ada masalah. Amanah banget pokoknya." },
  { name: "Bayu", loc: "Denpasar", text: "Prosesnya cepet, ga pake ribet. Recommended banget buat yang butuh kuota gede." },
];

const TestimonialCard: React.FC<{ item: typeof testimonials[0] }> = ({ item }) => (
  <div className="flex-shrink-0 w-[300px] md:w-[380px] bg-white border border-royal/5 rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.04)] mx-4 group hover:border-royal/20 transition-colors duration-300">
    <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F1F5F9] to-[#E2E8F0] border border-white flex items-center justify-center text-slate-600 font-clash font-bold text-lg shadow-sm">
                {item.name.charAt(0)}
            </div>
            <div>
                <p className="font-clash font-bold text-slate-900 text-base">{item.name}</p>
                <div className="flex items-center gap-1 text-slate-400 text-xs">
                    <MapPin size={10} />
                    <span>{item.loc}</span>
                </div>
            </div>
        </div>
        <div className="flex items-center gap-0.5 text-yellow-400">
            {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
        </div>
    </div>
    
    <p className="font-inter text-slate-600 text-sm leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
        "{item.text}"
    </p>
  </div>
);

export const SocialProof: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  // Triple the data to ensure seamless looping on ultra-wide screens
  const marqueeItems = [...testimonials, ...testimonials, ...testimonials]; 

  useEffect(() => {
    const ctx = gsap.context(() => {
        // Entrance Fade In
        gsap.fromTo(containerRef.current,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                }
            }
        );

        // Marquee Logic
        // We animate xPercent from 0 to -33.33% (because we have 3 sets of items, shifting 1 set creates the loop)
        const createMarquee = (element: HTMLElement, direction: 'left' | 'right', duration: number) => {
            const config = direction === 'left' 
                ? { from: 0, to: -33.333 } 
                : { from: -33.333, to: 0 };
            
            const tl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });
            
            tl.fromTo(element, 
                { xPercent: config.from },
                { xPercent: config.to, duration: duration }
            );
            
            return tl;
        };

        if (row1Ref.current && row2Ref.current) {
            const tl1 = createMarquee(row1Ref.current, 'left', 60);
            const tl2 = createMarquee(row2Ref.current, 'right', 70); // Different speed for organic feel

            // Slow down on hover interaction
            const handleEnter = () => { 
                gsap.to([tl1, tl2], { timeScale: 0.2, duration: 0.5 });
            };
            const handleLeave = () => { 
                gsap.to([tl1, tl2], { timeScale: 1, duration: 0.5 });
            };

            containerRef.current?.addEventListener('mouseenter', handleEnter);
            containerRef.current?.addEventListener('mouseleave', handleLeave);
        }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 w-full bg-[#F8FAFC] overflow-hidden relative z-20">
      
      {/* Decorative vertical lines */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px)', backgroundSize: '10% 100%' }}></div>

      <div className="container mx-auto px-4 md:px-6 mb-16 text-center relative z-10">
         <h2 className="font-clash font-bold text-4xl md:text-5xl text-slate-900 mb-4 tracking-tight">
            Apa Kata Mereka?
         </h2>
         <p className="font-inter text-[#64748B] text-base md:text-lg max-w-2xl mx-auto">
            Bergabung dengan <span className="font-bold text-royal">60+ member aktif</span> yang sudah menikmati hematnya kuota premium.
         </p>
      </div>

      <div className="flex flex-col gap-10 relative z-10">
        {/* Row 1: Left */}
        <div className="w-full overflow-hidden flex" style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
             <div ref={row1Ref} className="flex w-max">
                {marqueeItems.map((item, i) => (
                    <TestimonialCard key={`r1-${i}`} item={item} />
                ))}
             </div>
        </div>

        {/* Row 2: Right */}
        <div className="w-full overflow-hidden flex" style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
             <div ref={row2Ref} className="flex w-max">
                {marqueeItems.map((item, i) => (
                    <TestimonialCard key={`r2-${i}`} item={item} />
                ))}
             </div>
        </div>
      </div>

    </section>
  );
};