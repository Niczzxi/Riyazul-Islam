"use client";

import { useState, useRef } from "react";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layouts/Footer";
import LoadingScreen from "@/components/ui/LoadingScreen";
import Navbar from "@/components/layouts/Navbar";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const container = useRef(null);

  useGSAP(() => {
    if (isLoading) return;

    const sections = ["#about", "#skills", "#projects", "#contact"];
    
    sections.forEach((section) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%", // slightly above bottom of viewport
          toggleActions: "play none none reverse",
          // markers: true, // for debugging
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    });

  }, { scope: container, dependencies: [isLoading] });

  return (
    <main ref={container} className="flex flex-col w-full bg-black">
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}
      
      <Navbar />
      <HeroSection />
      
      {/* Wrapper divs to ensure IDs are targetable if components don't pass them through properly, 
          though the components likely have the IDs internally. 
          Actually, we saw the components have <section id="...">. 
          GSAP can find them if they differ in the DOM. 
          But scoping to 'container' is safer. 
      */}
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
