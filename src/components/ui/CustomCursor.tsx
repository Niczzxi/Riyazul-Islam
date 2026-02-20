"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for the outer ring (slower follow)
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check hover state on interactive elements
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.group') || // Often used for interactive cards
        window.getComputedStyle(target).cursor === 'pointer';

      setIsHovered(!!isClickable);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Hide default cursor GLOBALLY when this component is mounted
  useEffect(() => {
    // Only hide on non-touch devices ideally, but simpler to just use CSS class for visibility
    const style = document.createElement('style');
    style.innerHTML = `
      @media (min-width: 768px) {
        body, a, button, input, textarea, select {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      {/* Only visible on desktop (md and up) */}
      <div className="hidden md:block pointer-events-none fixed top-0 left-0 z-[99999] mix-blend-difference">

        {/* Small Dot - follows mouse instantly (or very tight spring) */}
        <motion.div
           style={{ x: mouseX, y: mouseY }}
           className="absolute -translate-x-1/2 -translate-y-1/2"
        >
            <div className={`w-2 h-2 bg-white rounded-full transition-transform duration-200 ${isHovered ? 'scale-[0]' : 'scale-100'}`} />
        </motion.div>

        {/* Outer Ring - smooth follow */}
        <motion.div
          style={{ x: ringX, y: ringY }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
        >
           <motion.div
             animate={{
                scale: isHovered ? 2.5 : 1,
                opacity: isHovered ? 0.8 : 0.5,
             }}
             transition={{ duration: 0.2 }}
             className={`w-8 h-8 rounded-full border border-white bg-white/20 backdrop-blur-sm`}
           />
        </motion.div>
      </div>
    </>
  );
}
