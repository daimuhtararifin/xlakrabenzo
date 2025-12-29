import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#050507]/80 backdrop-blur-lg border-b border-white/5 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="font-clash font-bold text-xl md:text-2xl text-white tracking-wide">
          Akrab <span className="text-cyan">XL</span> Premium
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8">
          {['Beranda', 'Area Check', 'Paket', 'FAQ'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-white/70 font-inter font-medium text-sm hover:text-royal transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-royal transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* CTA */}
        <MagneticButton>
          <a 
            href="#" 
            className="flex items-center gap-2 bg-royal hover:bg-royal/90 text-white font-inter font-medium text-sm px-5 py-2.5 rounded-full transition-colors"
          >
            <MessageCircle size={18} />
            <span className="hidden sm:inline">Bantuan Admin</span>
          </a>
        </MagneticButton>
      </div>
    </header>
  );
};