import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqData = [
  {
    question: "Apakah sistem ini resmi dan legal?",
    answer: "Tentu. Kami menggunakan fitur resmi Manager-Member dari XL Axiata. Bukan aplikasi pihak ketiga, bukan injek kuota ilegal, sehingga 100% aman untuk nomor pribadi kamu."
  },
  {
    question: "Bisa digunakan untuk pengguna kartu Axis?",
    answer: "Bisa banget! Karena Axis adalah bagian dari XL Axiata, paket Akrab Premium ini mendukung penuh nomor Axis untuk menikmati benefit kuota yang sama."
  },
  {
    question: "Bagaimana proses perpanjangan tiap bulannya?",
    answer: "Admin akan memberikan pengingat via WhatsApp H-3 sebelum masa aktif habis. Kamu cukup melakukan pembayaran flat sesuai harga awal untuk melanjutkan masa aktif slotmu."
  },
  {
    question: "Apakah data dan nomor saya aman?",
    answer: "Privasi kamu prioritas kami. Nomor kamu hanya digunakan sebagai identitas member di dalam grup paket dan tidak akan disebarluaskan ke pihak manapun."
  }
];

const AccordionItem: React.FC<{ item: typeof faqData[0], index: number }> = ({ item, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLButtonElement>(null);

  // Animation for Open/Close state
  useEffect(() => {
    const content = contentRef.current;
    const icon = iconRef.current;

    if (!content || !icon) return;

    if (isOpen) {
      // Elastic Open Animation
      gsap.to(content, {
        height: "auto",
        duration: 0.7,
        ease: "elastic.out(1, 0.75)", // The "Bouncy" Effect
      });
      // Icon Rotation
      gsap.to(icon, {
        rotation: 45,
        duration: 0.4,
        ease: "back.out(2)"
      });
    } else {
      // Smooth Close
      gsap.to(content, {
        height: 0,
        duration: 0.4,
        ease: "power3.inOut"
      });
      gsap.to(icon, {
        rotation: 0,
        duration: 0.4,
        ease: "power3.inOut"
      });
    }
  }, [isOpen]);

  // Hover Interaction
  const handleMouseEnter = () => {
    if (headerRef.current) {
      gsap.to(headerRef.current, { x: 6, duration: 0.3, ease: "power2.out" });
    }
  };

  const handleMouseLeave = () => {
    if (headerRef.current) {
      gsap.to(headerRef.current, { x: 0, duration: 0.3, ease: "power2.out" });
    }
  };

  return (
    <div className="border-b border-slate-200 faq-item opacity-0 translate-y-8">
      <button
        ref={headerRef}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`w-full py-6 flex justify-between items-center text-left group transition-colors duration-300 rounded-lg px-2 ${isOpen ? 'bg-royal/5' : 'hover:bg-slate-50'}`}
      >
        <span className={`font-inter font-semibold text-base md:text-lg transition-colors ${isOpen ? 'text-royal' : 'text-slate-800'}`}>
          {item.question}
        </span>
        
        <div 
          ref={iconRef} 
          className={`w-8 h-8 rounded-full flex items-center justify-center border transition-colors ${isOpen ? 'bg-royal text-white border-royal' : 'bg-white text-slate-400 border-slate-200 group-hover:border-royal/50 group-hover:text-royal'}`}
        >
          <Plus size={18} />
        </div>
      </button>

      <div 
        ref={contentRef} 
        className="h-0 overflow-hidden"
      >
        <div className="pb-6 px-2">
          <p className="font-inter text-slate-600 text-sm md:text-base leading-relaxed max-w-2xl">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export const FAQ: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered Entrance
      ScrollTrigger.batch(".faq-item", {
        start: "top 85%",
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out"
          });
        },
        once: true
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="faq" ref={containerRef} className="py-24 w-full bg-[#F8FAFC] relative overflow-hidden">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-royal/5 blur-[120px] rounded-full pointer-events-none mix-blend-multiply" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-clash font-bold text-4xl md:text-5xl text-slate-900 mb-6 tracking-tight">
            Masih Ada Pertanyaan?
          </h2>
          <p className="font-inter text-[#64748B] text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            Kami merangkum semua pertanyaan yang sering ditanyakan agar kamu makin yakin bergabung.
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 md:p-10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-white/50 backdrop-blur-sm">
          {faqData.map((item, index) => (
            <AccordionItem key={index} item={item} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};