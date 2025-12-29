import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

export const PhoneMockup: React.FC = () => {
  return (
    <div className="relative w-[300px] h-[600px] sm:w-[320px] sm:h-[650px] bg-black rounded-[50px] border-[8px] border-zinc-800 shadow-2xl overflow-hidden group">
      {/* Screen Reflection/Gloss */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-white/5 to-transparent pointer-events-none z-20 rounded-[42px]" />
      
      {/* Dynamic Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[30px] w-[120px] bg-black z-30 rounded-b-2xl flex justify-center items-center">
        <div className="w-16 h-4 bg-zinc-900 rounded-full flex items-center justify-center gap-2">
            <div className="w-1.5 h-1.5 bg-zinc-800 rounded-full"></div>
            <div className="w-8 h-1 bg-zinc-800 rounded-full"></div>
        </div>
      </div>

      {/* Screen Content */}
      <div className="w-full h-full bg-zinc-900 rounded-[42px] overflow-hidden flex flex-col relative z-10">
        
        {/* Status Bar */}
        <div className="w-full h-14 flex justify-between items-center px-6 pt-4 text-white text-xs font-medium">
          <span>09:41</span>
          <div className="flex gap-2 items-center">
            <Signal size={14} />
            <Wifi size={14} />
            <Battery size={14} />
          </div>
        </div>

        {/* App Content */}
        <div className="flex-1 px-6 pt-6 flex flex-col gap-6">
          
          {/* User Header */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-zinc-400 text-xs">Selamat Pagi,</p>
              <h3 className="text-white font-clash font-semibold text-lg">Sultan Akrab</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-royal to-cyan border border-white/20"></div>
          </div>

          {/* Main Card */}
          <div className="w-full h-48 rounded-3xl bg-gradient-to-br from-[#0055B8] to-[#023e8a] p-5 relative overflow-hidden shadow-lg shadow-royal/20">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-cyan-400/20 blur-3xl rounded-full"></div>
            
            <div className="relative z-10 flex flex-col justify-between h-full">
               <div className="flex justify-between items-start">
                 <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white font-medium border border-white/10">PREMIUM</span>
                 <span className="text-white/60 text-xs">XL Axiata</span>
               </div>
               
               <div>
                 <p className="text-white/80 text-sm font-inter">Sisa Kuota Utama</p>
                 <h2 className="text-4xl font-clash font-bold text-white mt-1">95<span className="text-lg text-white/70 font-normal ml-1">GB</span></h2>
               </div>

               <div className="w-full bg-black/20 h-1.5 rounded-full overflow-hidden mt-2">
                 <div className="h-full bg-cyan-400 w-[85%] shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-pulse"></div>
               </div>
            </div>
          </div>

          {/* Secondary Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-800/50 p-4 rounded-2xl border border-white/5">
                <p className="text-zinc-500 text-xs mb-1">Masa Aktif</p>
                <p className="text-white font-syne font-semibold">30 Hari</p>
            </div>
            <div className="bg-zinc-800/50 p-4 rounded-2xl border border-white/5">
                <p className="text-zinc-500 text-xs mb-1">Status</p>
                <p className="text-emerald-400 font-syne font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                    Active
                </p>
            </div>
          </div>

          {/* Simulated App List */}
          <div className="mt-2 space-y-3">
            {[1, 2, 3].map((i) => (
                <div key={i} className="w-full h-14 bg-zinc-800/30 rounded-xl flex items-center px-4 gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5"></div>
                    <div className="h-2 w-24 bg-white/10 rounded-full"></div>
                </div>
            ))}
          </div>

        </div>
        
        {/* Navigation Bar Mockup */}
        <div className="h-20 w-full glass-panel border-t border-white/5 flex justify-around items-center px-6 pb-4">
            <div className="w-6 h-6 bg-royal rounded-full shadow-[0_0_15px_#0055B8]"></div>
            <div className="w-6 h-6 bg-zinc-700 rounded-full"></div>
            <div className="w-6 h-6 bg-zinc-700 rounded-full"></div>
            <div className="w-6 h-6 bg-zinc-700 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};