import React, { useEffect, useState } from 'react';
import { Home, Map, Box, HelpCircle } from 'lucide-react';
import gsap from 'gsap';

export const MobileNav: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isVisible, setIsVisible] = useState(false); // Start hidden for entrance animation

  const navItems = [
    { id: 'home', icon: Home, label: 'Home', href: '#' },
    { id: 'area-check', icon: Map, label: 'Area', href: '#area-check' },
    { id: 'paket', icon: Box, label: 'Paket', href: '#paket' },
    { id: 'faq', icon: HelpCircle, label: 'FAQ', href: '#faq' },
  ];

  useEffect(() => {
    // Entrance Animation
    const timer = setTimeout(() => setIsVisible(true), 2500); // Wait for preloader
    return () => clearTimeout(timer);
  }, []);

  const handleClick = (id: string, href: string) => {
    setActiveTab(id);
    // Smooth scroll handling is done by native CSS or lenis if added
    window.location.href = href;
  };

  return (
    <div 
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-sm transition-all duration-700 ease-out md:hidden ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
    >
      <nav className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] px-6 py-3 flex justify-between items-center">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={() => handleClick(item.id, item.href)}
              className="relative flex flex-col items-center gap-1 group"
            >
              {/* Active Indicator Glow */}
              {isActive && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-royal/40 blur-xl rounded-full" />
              )}
              
              <div 
                className={`relative z-10 transition-all duration-300 ${isActive ? 'text-cyan -translate-y-1' : 'text-slate-400 group-hover:text-white'}`}
              >
                <item.icon size={20} className={isActive ? 'stroke-[2.5px]' : 'stroke-2'} />
              </div>
              
              <span className={`text-[10px] font-medium transition-all duration-300 ${isActive ? 'text-white opacity-100' : 'text-slate-500 opacity-0 -translate-y-2 h-0 overflow-hidden'}`}>
                {item.label}
              </span>
              
              {/* Dot for active state */}
              {isActive && (
                 <span className="absolute -bottom-1 w-1 h-1 bg-cyan rounded-full shadow-[0_0_5px_#22D3EE]"></span>
              )}
            </a>
          );
        })}
      </nav>
    </div>
  );
};