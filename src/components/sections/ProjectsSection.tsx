"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Project } from "@/types";

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        if (!res.ok) {
           throw new Error(`API error: ${res.status}`);
        }
        const data = await res.json();
        if (data.success) {
          setProjects(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
        <section id="projects" className="bg-black text-white w-full py-20 px-6 md:px-16 overflow-hidden min-h-[50vh] flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center gap-4">
                <div className="h-4 w-48 bg-zinc-800 rounded"></div>
                <div className="text-zinc-500 text-sm">Loading projects...</div>
            </div>
        </section>
    );
  }

  return (
    <section id="projects" className="bg-black text-white w-full py-20 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-24">

        <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-20 text-center md:text-left">
          My <br className="hidden md:block"/> projects
        </h2>

        <div className="flex flex-col gap-32">
          {projects.map((project, index) => (
            <div
              key={project._id}
              className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >

              {/* IMAGE SIDE */}
              <div className="flex-1 w-full relative group">
                {/* Glow Effect - Random or Default Gradient since new data doesn't have it explicitly, or we can pick one based on index */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-purple-600 blur-[100px] opacity-40 group-hover:opacity-60 transition-opacity duration-500`}></div>

                {/* Image Container */}
                <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-900 aspect-video md:aspect-[16/10] transform transition-transform duration-500 hover:scale-[1.02]">
                  {project.images?.cover ? (
                     <div className="w-full h-full relative">
                        <img
                          src={project.images.cover}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                     </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-900/50">
                       <span className="text-zinc-600 font-bold text-2xl uppercase tracking-widest">Project Preview</span>
                    </div>
                  )}
                </div>
              </div>

              {/* CONTENT SIDE */}
              <div className="flex-1 space-y-8">
                {/* Tags */}
                <div className="flex flex-wrap gap-4">
                  {project.category.map((tag) => (
                    <span key={tag} className="px-5 py-1.5 rounded-full border border-zinc-700 text-zinc-400 text-sm font-medium tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title & Date */}
                <div className="space-y-2">
                  <h3 className="text-4xl md:text-5xl font-bold">{project.title}</h3>
                  <p className="text-zinc-500 text-sm font-mono tracking-wide">// {project.date}</p>
                </div>

                {/* Description - Using Overview for listing */}
                <p className="text-zinc-400 text-lg leading-relaxed max-w-lg">
                  {project.overview}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className="text-xs text-zinc-500 border border-zinc-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                     <span className="text-xs text-zinc-500 border border-zinc-800 px-2 py-1 rounded">+{project.technologies.length - 4} more</span>
                  )}
                </div>

                {/* Button */}
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-block group relative px-8 py-3 rounded-full bg-linear-to-r from-pink-600 to-red-600 text-white font-semibold shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] hover:scale-105 transition-all duration-300"
                >
                  <span className="relative z-10">See Details</span>
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
