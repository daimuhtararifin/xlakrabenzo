import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Hide default cursor only on non-touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    document.body.style.cursor = 'none';

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    // Use quickTo for high performance mouse tracking
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });
    
    // Follower is slightly slower for fluid feel
    const xToFollower = gsap.quickTo(follower, "x", { duration: 0.6, ease: "power3" });
    const yToFollower = gsap.quickTo(follower, "y", { duration: 0.6, ease: "power3" });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xToFollower(e.clientX);
      yToFollower(e.clientY);
    };

    // Detect hover on interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if target is clickable (button, a, input, or explicitly marked)
      const isInteractive = 
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'input' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('interactive');

      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto';
    };
  }, []);

  // Animate cursor state based on hovering
  useEffect(() => {
    const follower = followerRef.current;
    const cursor = cursorRef.current;
    
    if (!follower || !cursor) return;

    if (isHovering) {
      // Hover State: Expand ring, hide dot
      gsap.to(follower, {
        scale: 3,
        borderColor: 'rgba(34, 211, 238, 0.5)', // Cyan transparent
        backgroundColor: 'rgba(34, 211, 238, 0.1)',
        duration: 0.3
      });
      gsap.to(cursor, {
        opacity: 0,
        duration: 0.3
      });
    } else {
      // Default State
      gsap.to(follower, {
        scale: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        backgroundColor: 'transparent',
        duration: 0.3
      });
      gsap.to(cursor, {
        opacity: 1,
        duration: 0.3
      });
    }
  }, [isHovering]);

  return (
    <>
      {/* The small central dot */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-cyan rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
      
      {/* The following ring */}
      <div 
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-white/30 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-transform will-change-transform mix-blend-difference"
      />
    </>
  );
};