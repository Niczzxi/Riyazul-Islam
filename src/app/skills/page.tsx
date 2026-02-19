"use client";

import { useState, useRef } from "react";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  SiHtml5, SiCss3, SiJavascript, SiReact, SiRedux, SiExpress, SiNodedotjs,
  SiNextdotjs, SiGithub, SiGit, SiMongodb, SiTypescript, SiFigma,
  SiAdobeillustrator, SiAdobephotoshop, SiGo, SiTailwindcss, SiPostman, SiN8N
} from "react-icons/si";

interface Skill {
  name: string;
  icon: React.ElementType;
  category: "Frontend" | "Backend" | "Tools" | "Creative";
  color: string;
}

const allSkills: Skill[] = [
  { name: "HTML", icon: SiHtml5, category: "Frontend", color: "#E34F26" },
  { name: "CSS", icon: SiCss3, category: "Frontend", color: "#1572B6" },
  { name: "JavaScript", icon: SiJavascript, category: "Frontend", color: "#F7DF1E" },
  { name: "React", icon: SiReact, category: "Frontend", color: "#61DAFB" },
  { name: "Redux", icon: SiRedux, category: "Frontend", color: "#764ABC" },
  { name: "Next.js", icon: SiNextdotjs, category: "Frontend", color: "#FFFFFF" },
  { name: "TypeScript", icon: SiTypescript, category: "Frontend", color: "#3178C6" },
  { name: "Tailwind", icon: SiTailwindcss, category: "Frontend", color: "#06B6D4" },

  { name: "Node.js", icon: SiNodedotjs, category: "Backend", color: "#339933" },
  { name: "Express.js", icon: SiExpress, category: "Backend", color: "#FFFFFF" },
  { name: "MongoDB", icon: SiMongodb, category: "Backend", color: "#47A248" },
  { name: "Go", icon: SiGo, category: "Backend", color: "#00ADD8" },

  { name: "Git", icon: SiGit, category: "Tools", color: "#F05032" },
  { name: "GitHub", icon: SiGithub, category: "Tools", color: "#FFFFFF" },
  { name: "Postman", icon: SiPostman, category: "Tools", color: "#FF6C37" },
  { name: "n8n", icon: SiN8N, category: "Tools", color: "#FF6584" },

  { name: "Figma", icon: SiFigma, category: "Creative", color: "#F24E1E" },
  { name: "Illustrator", icon: SiAdobeillustrator, category: "Creative", color: "#FF9A00" },
  { name: "Photoshop", icon: SiAdobephotoshop, category: "Creative", color: "#31A8FF" },
];

const categories = ["All", "Frontend", "Backend", "Tools", "Creative"];

export default function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const container = useRef(null);

  const filteredSkills = activeCategory === "All"
    ? allSkills
    : allSkills.filter(s => s.category === activeCategory);

  useGSAP(() => {
    // Reveal Header
    gsap.from(".page-header", {
       y: 50, opacity: 0, duration: 1, ease: "power3.out"
    });

    // Reveal Grid Items
    gsap.fromTo(".skill-card",
      { y: 50, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.05, ease: "back.out(1.5)", overwrite: "auto" }
    );
  }, { scope: container, dependencies: [activeCategory] });

  return (
    <main ref={container} className="bg-black min-h-screen text-white font-sans selection:bg-cyan-500 selection:text-white">
      <Navbar />

      {/* HEADER */}
      <section className="pt-40 pb-20 px-6 md:px-20 text-center">
         <h1 className="page-header text-6xl md:text-9xl font-black tracking-tighter mb-6 relative inline-block">
            THE <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-cyan-500">ARSENAL</span>
         </h1>
         <p className="page-header text-zinc-400 text-lg max-w-2xl mx-auto">
            The weapons of choice for conquering digital challenges.
         </p>
      </section>

      {/* FILTER BUTTONS */}
      <section className="px-6 md:px-20 mb-16 flex flex-wrap justify-center gap-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-8 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300
              ${activeCategory === cat
                ? "bg-white text-black scale-110 shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                : "bg-zinc-900 text-zinc-500 hover:bg-zinc-800 hover:text-white"
              }
            `}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* SKILLS GRID */}
      <section className="px-6 md:px-20 pb-40 min-h-[50vh]">
         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {filteredSkills.map((skill) => (
               <div
                 key={skill.name}
                 className="skill-card group relative bg-zinc-900 aspect-square rounded-3xl border border-zinc-800 flex flex-col items-center justify-center gap-4 hover:border-zinc-600 transition-colors cursor-pointer overflow-hidden"
               >
                 {/* Hover Glow Background */}
                 <div
                   className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                   style={{ background: `radial-gradient(circle at center, ${skill.color}, transparent 70%)` }}
                 />

                 {/* Icon */}
                 <skill.icon
                   className="text-5xl md:text-6xl relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2"
                   style={{ color: skill.color }}
                 />

                 {/* Name Tag */}
                 <span className="text-sm font-bold tracking-wide text-zinc-400 group-hover:text-white relative z-10 transition-colors">
                    {skill.name}
                 </span>

                 {/* Top Right Category Pill */}
                 <span className="absolute top-4 right-4 text-[10px] font-mono text-zinc-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    {skill.category.slice(0, 3)}
                 </span>
               </div>
            ))}
         </div>

         {filteredSkills.length === 0 && (
             <div className="text-center text-zinc-600 py-20">No skills found in this category.</div>
         )}
      </section>

      <Footer />
    </main>
  );
}
