import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ArrowUp, Zap } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

// Register plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const WhatsappIcon = ({ size = 24, className }: { size?: number, className?: string }) => (
  // WhatsApp standard icon
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.232-.298.347-.497.115-.198.058-.372-.029-.545-.087-.174-.787-1.932-1.09-2.617-.298-.685-.602-.584-.813-.591-.212-.007-.454-.01-.696-.01-.242 0-.635.092-.967.457-.332.365-1.272 1.243-1.272 3.03 0 1.787 1.303 3.514 1.485 3.762.182.248 2.564 3.915 6.21 5.397.868.352 1.545.563 2.073.731.879.28 1.679.241 2.309.147.697-.104 1.758-.718 2.006-1.412.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const XIcon = ({ size = 24, className }: { size?: number, className?: string }) => (
  // X (Twitter) standard icon
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

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
    {
      icon: WhatsappIcon,
      href: "https://wa.me/6287777422043?text=Hi%20enzo%2C%20aku%20mau%20tanya-tanya%20nihh",
      label: "WhatsApp"
    },
    {
      icon: XIcon,
      href: "https://x.com/enzonixc",
      label: "X (Twitter)"
    },
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
                Akrab <span className="text-royal">XL</span> @enzonixc
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
            <a
              href="https://wa.me/628777422043?text=Hi%20enzo%2C%20aku%20mau%20tanya-tanya%20nihh"
              className="font-inter font-bold text-white hover:text-cyan transition-colors inline-flex items-center gap-2"
            >
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
              &copy; 2026 Akrab XL @enzonixc. Designed with passion.
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