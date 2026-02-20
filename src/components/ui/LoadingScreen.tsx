"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: onComplete,
    });

    // 1. Counter Animation (Logic + Visual)
    const counterObj = { value: 0 };
    tl.to(counterObj, {
      value: 100,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => {
        setCount(Math.round(counterObj.value));
      },
    });

    // 2. Text Reveal
    tl.from(textRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.5");

    // 3. Exit Animation (Slide Up)
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: "power4.inOut",
      delay: 0.2, // pause briefly to show full text
    });

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
    >
      <div className="absolute top-10 left-10 md:top-20 md:left-20">
         <span ref={counterRef} className="text-6xl md:text-8xl font-black opacity-20 font-mono">
            {count}%
         </span>
      </div>

      <div className="overflow-hidden">
        <h1
          ref={textRef}
          className="text-4xl md:text-7xl font-bold tracking-tighter"
        >
          Riyazul Islam
        </h1>
      </div>
    </div>
  );
}
