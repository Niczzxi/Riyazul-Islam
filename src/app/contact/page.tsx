"use client";

import { useState, useRef, FormEvent } from "react";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaGithub, FaLinkedinIn, FaEnvelope, FaPaperPlane, FaCheck } from "react-icons/fa6";

export default function ContactPage() {
  const container = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage("");

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setFormData({ name: "", email: "", message: "" });

        // Success Animation
        gsap.to(".success-message", { y: 0, opacity: 1, duration: 0.5 });

        setTimeout(() => {
             setStatus('idle');
             gsap.to(".success-message", { y: -20, opacity: 0, duration: 0.5 });
        }, 5000);
      } else {
        setStatus('error');
        setErrorMessage(data.error || "Something went wrong.");
      }
    } catch (error) {
       setStatus('error');
       setErrorMessage("Failed to send message.");
    }
  };

  useGSAP(() => {
    // Header Reveal
    gsap.from(".contact-header", {
        y: 100, opacity: 0, duration: 1.2, ease: "power4.out"
    });

    // Form Reveal
    gsap.from(".contact-form", {
        x: 50, opacity: 0, duration: 1, delay: 0.3, ease: "power3.out"
    });

    // Socials Reveal
    gsap.from(".social-item", {
        y: 30, opacity: 0, stagger: 0.1, duration: 0.8, delay: 0.5, ease: "back.out(1.7)"
    });

  }, { scope: container });

  return (
    <main ref={container} className="bg-black min-h-screen text-white font-sans selection:bg-purple-500 selection:text-white">
      <Navbar />

      <section className="min-h-screen flex flex-col lg:flex-row pt-24 lg:pt-0">

        {/* LEFT: INFO & VISUALS */}
        <div className="lg:w-1/2 p-6 md:p-12 lg:p-20 flex flex-col justify-center relative overflow-hidden">
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-purple-900/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

            <div className="relative z-10 space-y-8 md:space-y-12">
                <div>
                     <h1 className="contact-header text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter mb-4 md:mb-6 relative z-10">
                        LET&apos;S <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-pink-500">TALK.</span>
                     </h1>
                     <p className="contact-header text-zinc-400 text-base md:text-lg max-w-md leading-relaxed">
                        Got a project, a question, or just want to say hello? Drop me a line and let&apos;s create something extraordinary together.
                     </p>
                </div>

                <div className="flex gap-4">
                    {[
                        { icon: FaGithub, href: "https://github.com/Niczzxi", label: "GitHub" },
                        { icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn" },
                        { icon: FaEnvelope, href: "mailto:riyazulislam.773@gmail.com", label: "Email" },
                    ].map((item, idx) => (
                        <a
                           key={idx}
                           href={item.href}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="social-item w-12 h-12 md:w-14 md:h-14 rounded-full bg-zinc-900 flex items-center justify-center text-lg md:text-xl text-zinc-400 hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 border border-zinc-800"
                           aria-label={item.label}
                        >
                            <item.icon />
                        </a>
                    ))}
                </div>

                <div className="contact-header pt-6 md:pt-12">
                    <h3 className="text-xs md:text-sm font-bold text-zinc-500 uppercase tracking-widest mb-2">My Location</h3>
                    <p className="text-lg md:text-xl font-medium">Dhaka, Bangladesh</p>
                </div>
            </div>
        </div>

        {/* RIGHT: FORM */}
        <div className="lg:w-1/2 bg-[#050505] p-6 md:p-12 lg:p-20 flex flex-col justify-center border-l border-white/5 relative">
             <form onSubmit={handleSubmit} className="contact-form w-full max-w-lg mx-auto space-y-8 md:space-y-10 relative z-10 py-10 lg:py-0">

                 {/* Name Input */}
                 <div className="group relative">
                     <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="peer w-full bg-transparent border-b border-zinc-800 py-3 md:py-4 text-lg md:text-xl text-white focus:outline-none focus:border-purple-500 transition-colors placeholder-transparent"
                        placeholder="Name"
                        id="name"
                     />
                     <label
                        htmlFor="name"
                        className="absolute left-0 top-3 md:top-4 text-zinc-500 text-lg md:text-xl transition-all duration-300 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-purple-500 peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-zinc-500 pointer-events-none"
                     >
                        What&apos;s your name?
                     </label>
                 </div>

                 {/* Email Input */}
                 <div className="group relative">
                     <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="peer w-full bg-transparent border-b border-zinc-800 py-3 md:py-4 text-lg md:text-xl text-white focus:outline-none focus:border-purple-500 transition-colors placeholder-transparent"
                        placeholder="Email"
                        id="email"
                     />
                     <label
                        htmlFor="email"
                        className="absolute left-0 top-3 md:top-4 text-zinc-500 text-lg md:text-xl transition-all duration-300 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-purple-500 peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-zinc-500 pointer-events-none"
                     >
                        Your email address
                     </label>
                 </div>

                 {/* Message Input */}
                 <div className="group relative">
                     <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="peer w-full bg-transparent border-b border-zinc-800 py-3 md:py-4 text-lg md:text-xl text-white focus:outline-none focus:border-purple-500 transition-colors placeholder-transparent resize-none"
                        placeholder="Message"
                        id="message"
                     ></textarea>
                     <label
                        htmlFor="message"
                        className="absolute left-0 top-3 md:top-4 text-zinc-500 text-lg md:text-xl transition-all duration-300 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-purple-500 peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-zinc-500 pointer-events-none"
                     >
                        Tell me about your project...
                     </label>
                 </div>

                 {/* Submit Button */}
                 <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="flex items-center justify-center w-full md:w-auto gap-3 px-8 md:px-10 py-3 md:py-4 bg-white text-black rounded-full font-bold text-base md:text-lg hover:bg-purple-500 hover:text-white transition-all duration-300 disabled:opacity-50"
                 >
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                    {!status && <FaPaperPlane />}
                 </button>

                 {/* Status Messages */}
                 <div className="absolute -bottom-16 left-0 w-full h-10">
                     <div className="success-message opacity-0 transform translate-y-[-20px] flex items-center gap-2 text-green-500 font-bold">
                        <FaCheck /> Message sent successfully!
                     </div>
                     {status === 'error' && (
                        <div className="text-red-500 font-bold">
                           {errorMessage}
                        </div>
                     )}
                 </div>

             </form>
        </div>

      </section>

      <Footer />
    </main>
  );
}
