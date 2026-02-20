"use client";

import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export default function PageLayout({ children, title, description }: PageLayoutProps) {
  const pathname = usePathname();

  return (
    <main className="bg-black min-h-screen flex flex-col font-sans">
      <Navbar />

      {/* PAGE HEADER */}
      <section className="relative pt-32 pb-20 px-6 md:px-10 overflow-hidden">

        {/* Background Accents */}
        <div className="absolute top-0 inset-x-0 h-[500px] pointer-events-none">
            <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[100px]" />
            <div className="absolute top-[-10%] right-[10%] w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[80px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {/* Breadcrumb-ish indicator */}
                <span className="block text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase mb-4 pl-1">
                   {pathname.replace("/", "")}
                </span>

                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                    {title}
                    <span className="text-purple-500">.</span>
                </h1>

                {description && (
                    <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed">
                        {description}
                    </p>
                )}
            </motion.div>
        </div>

        {/* Bottom decorative line/fade */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      </section>

      {/* MAIN CONTENT */}
      <div className="flex-1">
        {children}
      </div>

      <Footer />
    </main>
  );
}
