import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const Background: React.FC = () => {
  const blobRef1 = useRef<HTMLDivElement>(null);
  const blobRef2 = useRef<HTMLDivElement>(null);
  const blobRef3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Random subtle movement for blobs
    const blobs = [blobRef1.current, blobRef2.current, blobRef3.current];
    
    blobs.forEach((blob, i) => {
        if(!blob) return;
        
        gsap.to(blob, {
            x: "random(-100, 100)",
            y: "random(-50, 50)",
            scale: "random(0.8, 1.2)",
            duration: 10 + i * 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    });

  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050507]">
      {/* Noise Overlay */}
      <div className="noise-overlay" />
      
      {/* Blob 1: Royal Blue */}
      <div 
        ref={blobRef1}
        className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-royal/30 rounded-full blur-[120px] mix-blend-screen opacity-60"
      />

      {/* Blob 2: Cyan */}
      <div 
        ref={blobRef2}
        className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-cyan/20 rounded-full blur-[130px] mix-blend-screen opacity-50"
      />

      {/* Blob 3: Deep Blue Accent */}
      <div 
        ref={blobRef3}
        className="absolute top-[40%] left-[-10%] w-[400px] h-[400px] bg-[#023e8a]/40 rounded-full blur-[100px] mix-blend-screen opacity-40"
      />

      {/* Decorative Grid Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};