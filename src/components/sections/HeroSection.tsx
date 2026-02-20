"use client";

import { useState } from "react";
import Banner from "@/components/sections/Banner";
import BannerBg from "@/assets/texture.jpg";
import { motion, AnimatePresence } from "framer-motion";
import { FaDownload, FaXmark, FaEye } from "react-icons/fa6";

export default function HeroSection() {
  const [showPreview, setShowPreview] = useState(false);
  const cvId = "14u1DXUO-LOWhwsyCu8xp7-2SuvxStNZq";
  const previewUrl = `https://drive.google.com/file/d/${cvId}/preview`;
  const downloadUrl = `https://drive.google.com/uc?export=download&id=${cvId}`;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-2 md:p-10 font-sans">

      {/* HERO CARD CONTAINER */}
      <div
        className="relative w-full max-w-[1900px] aspect-auto md:aspect-video min-h-[85vh] bg-cover bg-center rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col"
        style={{ backgroundImage: `url(${BannerBg.src})` }}
      >
        <main className="flex-1 flex flex-col h-full relative z-10">
          <Banner />
        </main>

        {/* CV BUTTON */}
        <div className="absolute bottom-8 left-6 md:bottom-16 md:left-10 z-30">
          <button
            onClick={() => setShowPreview(true)}
            className="flex items-center gap-2 bg-white text-black text-lg md:text-xl font-bold px-6 py-3 md:px-8 md:py-4 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-110 transition-transform duration-300"
          >
             <span>Preview CV</span>
             <FaEye className="w-5 h-5" />
          </button>
        </div>

        {/* SCROLL INDICATOR */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 hidden md:flex flex-col items-center gap-2 animate-bounce pointer-events-none mix-blend-difference">
           <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Scroll</span>
           <svg className="w-6 h-6 text-zinc-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
           </svg>
        </div>

        {/* TORN PAPER EFFECT */}
        <div className="absolute bottom-[-1px] left-0 w-full z-20 pointer-events-none text-white leading-[0]">
           <svg
             viewBox="0 0 1200 50"
             preserveAspectRatio="none"
             className="w-full h-12 md:h-20 fill-current"
             xmlns="http://www.w3.org/2000/svg"
           >
              <path d="M0 0V50H1200V0C1167.33 12.67 1134.67 22.33 1102 29C1036.67 42.33 971.33 39.67 906 37C840.67 34.33 775.33 31.67 710 29C644.67 26.33 579.33 23.67 514 21C448.67 18.33 383.33 15.67 318 13C252.67 10.33 187.33 7.67 122 5C89.33 3.67 56.67 2.33 24 1V0H0Z" />
              <path d="M0,0 v50 h1200 v-50 c-50,5 -100,20 -150,25 c-100,10 -200,-10 -300,-5 c-100,5 -200,15 -300,10 c-100,-5 -200,-15 -300,-10 c-50,2.5 -100,0 -150,0 z" fillOpacity="0.5"/>
           </svg>
        </div>
      </div>

      {/* CV PREVIEW MODAL */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={() => setShowPreview(false)}
          >
             <motion.div
               initial={{ scale: 0.95, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.95, opacity: 0 }}
               className="relative w-full max-w-5xl h-[90vh] bg-zinc-900 rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-zinc-800"
               onClick={(e) => e.stopPropagation()}
             >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900">
                   <h3 className="text-xl font-bold text-white">Resume Preview</h3>
                   <div className="flex items-center gap-4">
                       <a
                           href={downloadUrl}
                           className="flex items-center gap-2 px-6 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-zinc-200 transition-colors"
                       >
                           <FaDownload />
                           <span>Download</span>
                       </a>
                       <button
                           onClick={() => setShowPreview(false)}
                           className="p-2 text-zinc-400 hover:text-white transition-colors text-2xl hover:bg-zinc-800 rounded-full"
                       >
                           <FaXmark />
                       </button>
                   </div>
                </div>

                {/* Modal Content - Iframe */}
                <div className="flex-1 bg-zinc-800 relative w-full h-full">
                  <iframe
                    src={previewUrl}
                    className="absolute inset-0 w-full h-full border-0"
                    title="CV Preview"
                    loading="lazy"
                    allow="autoplay"
                  />
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
