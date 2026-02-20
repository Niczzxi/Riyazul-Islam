"use client";

import Image from "next/image";
import Link from "next/link";
import Profile from "@/assets/HeroSection.png";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaGithub, FaDiscord, FaFacebook, FaInstagram } from "react-icons/fa6";

class Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  color: string;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    // Random angle upwards (explosive)
    const angle = (Math.random() * Math.PI * 2);
    const speed = Math.random() * 3 + 2;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.life = Math.random() * 0.6 + 0.4;
    this.size = Math.random() * 3 + 2;

    // Black / Dark Grey colors for "Ink" or "Dark Spark" look
    const colors = ["#000000", "#1a1a1a", "#333333"];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.95; // Friction
    this.vy *= 0.95;
    this.life -= 0.02;
    this.size *= 0.95;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.globalAlpha = Math.max(0, this.life);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    // Drawing a rough "spark" or diamond shape instead of perfect circle for edginess
    ctx.moveTo(this.x, this.y - this.size);
    ctx.lineTo(this.x + this.size, this.y);
    ctx.lineTo(this.x, this.y + this.size);
    ctx.lineTo(this.x - this.size, this.y);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

export default function Banner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);

  // Refs for text animation
  const title1Ref = useRef<HTMLSpanElement>(null);
  const title2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Animate Name (Word by Word)
    if (title1Ref.current && title2Ref.current) {
      tl.from([title1Ref.current, title2Ref.current], {
        y: 100, // Comes from bottom
        opacity: 0,
        duration: 0.8,
        stagger: 0.2, // Delay between words
        ease: "power3.out"
      });
    }

    // Animate Subtitle & Button
    if (subtitleRef.current) {
        tl.from(subtitleRef.current.children, {
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
        }, "-=0.4");
    }

  }, { scope: containerRef });

  // Spark Effect on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas
    const resizeCanvas = () => {
       if (containerRef.current && canvas) {
          canvas.width = containerRef.current.offsetWidth;
          canvas.height = containerRef.current.offsetHeight;
       }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Animation Loop
    let animationId: number;
    const animate = () => {
       if (!canvas || !ctx) return;
       ctx.clearRect(0, 0, canvas.width, canvas.height);

       // Update and draw sparks
       sparksRef.current.forEach((spark, index) => {
          spark.update();
          spark.draw(ctx);
          if (spark.life <= 0) {
             sparksRef.current.splice(index, 1);
          }
       });

       animationId = requestAnimationFrame(animate);
    };
    animate();

    // Mouse Handler for Sparks
    const handleMouseMove = (e: MouseEvent) => {
       if (!containerRef.current) return;
       const { left, top } = containerRef.current.getBoundingClientRect();
       const x = e.clientX - left;
       const y = e.clientY - top;

       // Create MORE sparks for a "fire" effect
       for (let i = 0; i < 5; i++) {
          sparksRef.current.push(new Spark(x, y));
       }
    };

    // Add event listener to the container
    const container = containerRef.current;
    container?.addEventListener("mousemove", handleMouseMove);

    return () => {
       window.removeEventListener("resize", resizeCanvas);
       container?.removeEventListener("mousemove", handleMouseMove);
       cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative flex flex-col md:flex-row h-full px-5 md:px-20 pt-32 md:pt-0 items-center overflow-hidden bg-white/50">

      {/* LEFT CONTENT */}
      <div className="flex-1 flex flex-col justify-center text-black z-10 w-full md:max-w-2xl relative">
        <h1 className="text-6xl sm:text-7xl md:text-9xl font-black tracking-tighter leading-[0.9] mb-6 relative z-10 perspective-500">
          <span ref={title1Ref} className="block">
             Riyazul
          </span>
          <span ref={title2Ref} className="block">
             Islam.
          </span>
        </h1>

        <div ref={subtitleRef} className="space-y-6 max-w-lg relative z-10">
          <p className="text-sm md:text-base font-bold tracking-[0.2em] text-zinc-500 uppercase">
            Full-stack Developer
          </p>

          <p className="text-base md:text-lg text-zinc-600 font-medium leading-relaxed">
            With impeccable experience from concept to layout, I bring your ideas to life with clean code.
          </p>

          <div className="flex items-center gap-6">
            <Link href="/about" className="w-fit bg-linear-to-r from-[#D91B99] to-[#8C24D4] text-white px-10 py-3.5 rounded-full font-bold shadow-lg shadow-pink-500/30 hover:scale-105 hover:shadow-pink-500/50 transition-all duration-300 tracking-wide text-sm">
              Learn more
            </Link>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com/Niczzxi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-black/5 text-zinc-600 hover:text-black hover:scale-110 hover:shadow-md transition-all duration-300"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://discord.com/users/1087510873960091710"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-black/5 text-zinc-600 hover:text-[#0077b5] hover:scale-110 hover:shadow-md transition-all duration-300"
                aria-label="Discord"
              >
                <FaDiscord size={20} />
              </a>
              <a
                href="https://www.facebook.com/Riyazul.Islam.Rafsan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-black/5 text-zinc-600 hover:text-[#1877F2] hover:scale-110 hover:shadow-md transition-all duration-300"
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://instagram.com/Niczzxi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-black/5 text-zinc-600 hover:text-[#1DA1F2] hover:scale-110 hover:shadow-md transition-all duration-300"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="relative flex-1 flex items-end justify-center md:justify-end w-full h-full group md:mt-0">

         {/* Sparks Canvas - Overlaying everything in this section */}
         <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
         />

        {/* Profile Image */}
        <div className="relative w-full max-w-[340px] md:max-w-none md:w-[600px] xl:w-[700px] z-10 pointer-events-none">
           <Image
            src={Profile}
            alt="Profile"
            priority
            className="object-contain drop-shadow-2xl"
          />
        </div>
      </div>

    </section>
  );
}
