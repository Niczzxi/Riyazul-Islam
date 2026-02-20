"use client";

import { useRef } from "react";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGraduationCap, FaCode, FaBookOpen } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const container = useRef(null);
  const headerRef = useRef(null);
  const storyRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. Hero Reveal
    tl.from(headerRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
    });

    // 2. Story Paragraphs Reveal on Scroll
    const paragraphs = gsap.utils.toArray(".story-text");
    paragraphs.forEach((p: any) => {
      gsap.from(p, {
        scrollTrigger: {
          trigger: p,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    });

    // 3. Horizontal Skill/Education Scroll or Fade
    gsap.from(".info-card", {
        scrollTrigger: {
            trigger: ".info-grid",
            start: "top 75%",
        },
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "back.out(1.7)"
    });

  }, { scope: container });

  return (
    <main ref={container} className="bg-black min-h-screen text-white font-sans selection:bg-purple-500 selection:text-white">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="h-[60vh] md:h-[80vh] flex flex-col justify-end px-6 md:px-20 pb-10 md:pb-20">
        <h1 ref={headerRef} className="text-4xl sm:text-6xl md:text-[8rem] leading-[0.9] font-black tracking-tighter mix-blend-difference">
          CRAFTING <br />
          <span className="text-zinc-600">NARRATIVES.</span>
        </h1>
      </section>

      {/* 2. SPLIT STORY SECTION */}
      <section ref={storyRef} className="flex flex-col md:flex-row px-6 md:px-20 py-12 md:py-20 gap-10 md:gap-32 border-t border-zinc-800">

        {/* Sticky Sidebar */}
        <div className="md:w-1/3">
          <div className="relative md:sticky md:top-32 mb-8 md:mb-0">
            <h2 className="text-sm md:text-xl font-bold tracking-[0.2em] text-purple-500 uppercase mb-4">The Journey</h2>
            <p className="text-zinc-400 text-sm md:text-lg">
              From business strategy to software logic, my path is about building systems. Here is how I blend two worlds.
            </p>
          </div>
        </div>

        {/* Scrolling Content */}
        <div className="md:w-2/3 space-y-12 md:space-y-24 text-xl md:text-4xl font-light leading-snug text-zinc-100">
          <p className="story-text">
            I am a student of <span className="text-white font-serif italic">Computer Science and Technology</span> at Dhaka Polytechnic Institute, pursuing my Diploma.
          </p>

          <p className="story-text">
            But I am also an architect of <span className="text-white font-mono font-bold">Code</span>, obsessively mastering the MERN stack to build applications that solve real business problems.
          </p>

          <p className="story-text text-zinc-400">
            Why both? Because code without a strategy is just syntax. I bring the strategic depth of a manager and the technical precision of a developer to every project.
          </p>
        </div>
      </section>

      {/* 3. INFO GRID (Education/Tech) */}
      <section className="px-6 md:px-20 py-12 md:py-20 bg-zinc-900/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 info-grid">

            {/* Card 1 */}
            <div className="info-card p-6 md:p-8 bg-black border border-zinc-800 rounded-2xl hover:border-purple-500/50 transition-colors group">
                <FaGraduationCap className="text-3xl md:text-4xl text-purple-500 mb-4 md:mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg md:text-xl font-bold mb-2">Education</h3>
                <p className="text-zinc-400 text-sm md:text-base">BBA in Management</p>
                <p className="text-zinc-500 text-xs md:text-sm mt-1">Dhaka Central University (Ongoing)</p>
            </div>

            {/* Card 2 */}
            <div className="info-card p-6 md:p-8 bg-black border border-zinc-800 rounded-2xl hover:border-blue-500/50 transition-colors group">
                <FaCode className="text-3xl md:text-4xl text-blue-500 mb-4 md:mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg md:text-xl font-bold mb-2">Stack</h3>
                <p className="text-zinc-400 text-sm md:text-base">MERN Stack Expert</p>
                <p className="text-zinc-500 text-xs md:text-sm mt-1">Next.js, TypeScript, MongoDB</p>
            </div>

            {/* Card 3 */}
            <div className="info-card p-6 md:p-8 bg-black border border-zinc-800 rounded-2xl hover:border-pink-500/50 transition-colors group">
                <FaBookOpen className="text-3xl md:text-4xl text-pink-500 mb-4 md:mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg md:text-xl font-bold mb-2">Philosophy</h3>
                <p className="text-zinc-400 text-sm md:text-base">Systems Thinking</p>
                <p className="text-zinc-500 text-xs md:text-sm mt-1">Bridging gap between business needs & tech.</p>
            </div>

        </div>
      </section>

      {/* 4. BIG TEXT FOOTER */}
      <section className="px-6 md:px-20 py-20 md:py-40 flex items-center justify-center">
          <h2 className="text-4xl md:text-9xl font-black text-center opacity-10">
              RIYAZUL <br /> ISLAM
          </h2>
      </section>

      <Footer />
    </main>
  );
}
