"use client";
// forcing refresh

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import { FaArrowLeft, FaGithub, FaGlobe } from "react-icons/fa6";
import { Project } from "@/types";

export default function ProjectDetails({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then((resolvedParams) => {
        setSlug(resolvedParams.slug);
    });
  }, [params]);

  useEffect(() => {
    if (!slug) return;

    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${slug}`);
        if (!res.ok) {
           throw new Error(`API error: ${res.status}`);
        }
        const data = await res.json();
        if (data.success) {
          setProject(data.data);
        } else {
            console.error(data.error);
        }
      } catch (error) {
        console.error("Failed to fetch project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;

  if (!project) {
    return <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white gap-4">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <Link href="/#projects" className="text-pink-500 hover:underline">Back to Projects</Link>
    </div>;
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-pink-500/30">
      <Navbar />

      {/* HEADER / HERO FOR PROJECT */}
      <section className="relative pt-32 pb-20 px-6 md:px-16 overflow-hidden">
         {/* Background Glows */}
         <div className={`absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900 opacity-20 blur-[120px] rounded-full pointer-events-none`}></div>

         <div className="max-w-7xl mx-auto space-y-8 relative z-10">
            {/* Back Button */}
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest mb-4 group"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              Back to projects
            </Link>

            <div className="space-y-4">
               {/* Categories */}
               <div className="flex gap-3 flex-wrap">
                  {project.category.map(cat => (
                     <span key={cat} className="px-3 py-1 border border-zinc-800 text-zinc-400 text-xs rounded-full uppercase tracking-wider">
                        {cat}
                     </span>
                  ))}
               </div>

               <h1 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tight leading-tight">
                  {project.title}
               </h1>

               {/* Overview */}
               <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed">
                  {project.overview}
               </p>

               {/* External Links */}
               <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  {project.links.live && (
                      <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold hover:bg-zinc-200 transition-colors text-sm sm:text-base">
                         <FaGlobe />
                         Live Demo
                      </a>
                  )}
                  {project.links.githubClient && (
                      <a href={project.links.githubClient} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-zinc-700 text-white font-bold hover:bg-zinc-800 transition-colors text-sm sm:text-base">
                         <FaGithub />
                         Client Repo
                      </a>
                  )}
                  {project.links.githubServer && (
                      <a href={project.links.githubServer} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-zinc-700 text-white font-bold hover:bg-zinc-800 transition-colors text-sm sm:text-base">
                         <FaGithub />
                         Server Repo
                      </a>
                  )}
               </div>
            </div>
         </div>
      </section>

      {/* IMAGE SHOWCASE */}
      <section className="px-6 md:px-16 pb-20">
         <div className="max-w-7xl mx-auto">
            <div className="relative aspect-video w-full bg-zinc-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
               {project.images?.cover ? (
                  <div className="w-full h-full relative">
                       <img
                         src={project.images.cover}
                         alt={`${project.title} Cover`}
                         className="w-full h-full object-cover"
                       />
                  </div>
               ) : (
                   <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-zinc-700 font-black text-4xl md:text-6xl uppercase tracking-widest opacity-20 select-none">
                         Project Preview
                      </span>
                   </div>
               )}
            </div>
         </div>
      </section>

      {/* GALLERY & DETAILS CONTENT */}
      <section className="px-6 md:px-16 pb-32">
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">

            {/* LEFT: Description & Features */}
            <div className="md:col-span-2 space-y-12">
               {/* Detailed Description */}
               <div className="space-y-6">
                  <h3 className="text-3xl font-bold">Project Details</h3>
                  <p className="text-zinc-400 text-lg leading-relaxed whitespace-pre-wrap">
                     {project.description}
                  </p>
               </div>

               {/* Features */}
               {project.features && project.features.length > 0 && (
                  <div className="space-y-6">
                     <h3 className="text-3xl font-bold">Key Features</h3>
                     <ul className="space-y-4">
                        {project.features.map((feature, i) => (
                           <li key={i} className="flex items-start gap-3 text-zinc-400">
                              <span className={`mt-2 w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0`} ></span>
                              <span className="leading-relaxed">{feature}</span>
                           </li>
                        ))}
                     </ul>
                  </div>
               )}

               {/* Gallery Grid */}
               {project.images?.gallery && project.images.gallery.length > 0 && (
                   <div className="space-y-6 pt-8">
                       <h3 className="text-3xl font-bold">Gallery</h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           {project.images.gallery.map((img, i) => (
                               <div key={i} className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                                   <img src={img} alt={`Screenshot ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                               </div>
                           ))}
                       </div>
                   </div>
               )}
            </div>

            {/* RIGHT: Tech Stack & Info */}
            <div className="md:col-span-1 space-y-8">
               <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8 space-y-8 sticky top-24">

                  <div className="space-y-4">
                     <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Date</h4>
                     <p className="text-white font-medium">{project.date}</p>
                  </div>

                  <div className="w-full h-px bg-white/5"></div>

                  <div className="space-y-4">
                     <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Technologies</h4>
                     <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                           <span key={tech} className="px-3 py-1.5 bg-black border border-zinc-800 rounded-lg text-sm text-zinc-300">
                              {tech}
                           </span>
                        ))}
                     </div>
                  </div>

                  <div className="w-full h-px bg-white/5"></div>

                  <div className="space-y-4">
                     <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Role</h4>
                     <p className="text-white font-medium">Full Stack Developer</p>
                  </div>

               </div>
            </div>

         </div>
      </section>

      <Footer />
    </main>
  );
}
