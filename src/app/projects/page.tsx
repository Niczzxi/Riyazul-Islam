"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Link from "next/link";
import { Project } from "@/types";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaArrowRight } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const container = useRef(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
            const data = await res.json();
            if (data.success) setProjects(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useGSAP(() => {
    if (loading || projects.length === 0) return;

    // Header Animation
    gsap.from(".header-title", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
    });

    // We rely on CSS 'sticky' for the stacking effect, but use GSAP for inner content reveal
    const cards = gsap.utils.toArray(".project-card");
    cards.forEach((card: any) => {
        gsap.from(card.querySelector(".project-content"), {
            scrollTrigger: {
                trigger: card,
                start: "top center",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });

  }, { scope: container, dependencies: [loading, projects] });

  return (
    <main ref={container} className="bg-black min-h-screen text-white font-sans selection:bg-pink-500 selection:text-white">
      <Navbar />

      {/* HEADER */}
      <section className="h-[60vh] md:h-[70vh] flex flex-col justify-center px-6 md:px-20 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-900/20 blur-[100px] md:blur-[150px] rounded-full pointer-events-none" />

         <div className="relative z-10">
             <h1 className="header-title text-4xl sm:text-6xl md:text-[8rem] leading-[0.9] font-black tracking-tighter">
                DIGITAL <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-pink-500">EXPERIMENTS.</span>
             </h1>
             <p className="header-title mt-6 md:mt-8 text-zinc-400 text-sm md:text-xl max-w-xl">
                A curated selection of my work. Exploring the intersection of design, logic, and user experience.
             </p>
         </div>
      </section>

      {/* PROJECTS STACK */}
      <div className="relative pb-20 md:pb-40">
        {loading ? (
             <div className="h-[50vh] flex items-center justify-center text-zinc-500">Loading works...</div>
        ) : (
            projects.map((project, index) => (
                <article
                    key={project._id}
                    className="project-card sticky min-h-screen flex flex-col justify-center px-4 md:px-20 border-t border-white/5 bg-black overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
                    style={{
                        top: `${index * 0}px`,
                        zIndex: index + 1
                    }}
                >
                    <div className="project-content grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center w-full max-w-7xl mx-auto py-10 md:py-20">
                        {/* ... content remains same ... */}

                        {/* Left: Text Info */}
                        <div className="space-y-6 md:space-y-8 order-2 md:order-1 relative z-10 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-4 text-xs md:text-sm font-mono text-pink-500 tracking-widest uppercase">
                                <span>0{index + 1}</span>
                                <span className="w-8 md:w-12 h-[1px] bg-pink-500/50"></span>
                                <span>{project.category[0]}</span>
                            </div>

                            <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold leading-tight text-white mb-2">
                                {project.title}
                            </h2>

                            <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-lg mx-auto md:mx-0">
                                {project.overview}
                            </p>

                            <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3">
                                {project.technologies.slice(0, 4).map(tech => (
                                    <span key={tech} className="px-3 py-1 rounded-full border border-zinc-800 text-xs text-zinc-500">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <Link
                                href={`/projects/${project.slug}`}
                                className="group inline-flex items-center gap-3 text-white border-b border-white/30 pb-1 hover:border-white transition-colors text-sm md:text-lg"
                            >
                                <span>View Case Study</span>
                                <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>

                        {/* Right: Image Preview */}
                        <div className="order-1 md:order-2 relative aspect-[4/3] md:aspect-square w-full">
                            {/* Glow */}
                            <div className={`absolute inset-0 bg-gradient-to-tr ${index % 2 === 0 ? 'from-purple-900/40 to-blue-900/20' : 'from-pink-900/40 to-orange-900/20'} blur-[60px] md:blur-[100px] rounded-full scale-90 pointer-events-none`}></div>

                            <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-900 group">
                                {project.images?.cover && (
                                    <img
                                        src={project.images.cover}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                )}
                            </div>
                        </div>

                    </div>
                </article>
            ))
        )}
      </div>

      <Footer />
    </main>
  );
}
