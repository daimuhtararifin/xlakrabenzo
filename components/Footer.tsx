import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Instagram, MessageCircle, ArrowUp, Zap } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

// Register plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const statusDotRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Footer Reveal Animation
      gsap.fromTo(contentRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%", // Start revealing when top of footer hits bottom 10% of screen
          }
        }
      );

      // 2. Status Light Pulsing
      gsap.to(statusDotRef.current, {
        opacity: 0.4,
        scale: 0.8,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    gsap.to(window, { duration: 1.5, scrollTo: 0, ease: "power4.inOut" });
  };

  const socialLinks = [
    { icon: MessageCircle, href: "#", label: "WhatsApp" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  const quickLinks = [
    { name: "Beranda", href: "#" },
    { name: "Area Check", href: "#area-check" },
    { name: "Paket", href: "#paket" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <footer ref={footerRef} className="relative bg-[#020617] border-t border-royal/20 pt-16 pb-8 overflow-hidden z-30">
      
      {/* Background ambient glow */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-royal/5 blur-[100px] rounded-full pointer-events-none" />

      <div ref={contentRef} className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Column 1: Branding */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
               {/* Logo */}
               <h3 className="font-clash font-bold text-2xl text-white tracking-wide">
                Akrab <span className="text-royal">XL</span> Premium
               </h3>
               {/* Live Status */}
               <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                  <div ref={statusDotRef} className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_#10B981]"></div>
                  <span className="text-[10px] font-mono uppercase text-emerald-400 font-medium tracking-wider">Sistem Aktif</span>
               </div>
            </div>
            
            <p className="font-inter text-slate-400 text-sm leading-relaxed max-w-xs">
              Solusi kuota hemat, legal, dan transparan sejak 2022. Nikmati kebebasan internet tanpa cemas kuota habis di tengah bulan.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:pl-10">
            <h4 className="font-clash font-semibold text-white text-lg mb-6">Navigasi</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="font-inter text-slate-400 hover:text-royal transition-colors text-sm inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-royal rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Socials */}
          <div>
            <h4 className="font-clash font-semibold text-white text-lg mb-6">Hubungi Kami</h4>
            <div className="flex gap-4 mb-6">
              {socialLinks.map((social, idx) => (
                <MagneticButton key={idx}>
                  <a 
                    href={social.href}
                    className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-royal hover:border-royal hover:shadow-[0_0_20px_rgba(0,85,184,0.5)] transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                </MagneticButton>
              ))}
            </div>
            <p className="text-slate-500 text-sm mb-2">Butuh bantuan cepat?</p>
            <a href="#" className="font-inter font-bold text-white hover:text-cyan transition-colors inline-flex items-center gap-2">
               Chat Admin Sekarang <Zap size={16} className="fill-current" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/5 mb-8" />

        {/* Bottom Section: Disclaimer & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="text-slate-500 text-[10px] md:text-xs max-w-2xl text-center md:text-left leading-relaxed font-inter">
            <p className="mb-2">
              <strong className="text-slate-400">Disclaimer:</strong> Kami adalah reseller independen yang memanfaatkan fitur resmi Manager-Member dari provider. Kami tidak berafiliasi secara struktural dengan manajemen PT XL Axiata Tbk. Seluruh merek dagang adalah milik pemegang hak cipta masing-masing.
            </p>
            <p>
              &copy; 2026 Akrab XL Premium. Designed with passion.
            </p>
          </div>

          {/* Back to Top */}
          <button 
            onClick={handleBackToTop}
            className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
          >
            Back to Top
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-royal group-hover:bg-royal/10 transition-colors">
              <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>

        </div>
      </div>
    </footer>
  );
};