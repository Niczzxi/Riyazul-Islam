import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full bg-black pt-10 pb-6 px-4 md:px-8">
      {/* Footer Container with rounded visuals */}
      <div className="max-w-350 mx-auto bg-[#0a0a0a] rounded-[3rem] p-8 md:p-16 relative overflow-hidden border border-white/5">

        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-125 h-125 bg-purple-900/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-100 h-100 bg-blue-900/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center md:items-start gap-12">

          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h2 className="text-3xl font-bold text-white tracking-wide">Riyazul I.</h2>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-8 md:gap-12">
            {[
              { name: "About", href: "/about" },
              { name: "Skills", href: "/skills" },
              { name: "Projects", href: "/projects" },
              { name: "Contact", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-zinc-400 hover:text-white transition-colors text-sm font-medium tracking-wide"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div>
            <a
              href="https://drive.google.com/uc?export=download&id=14u1DXUO-LOWhwsyCu8xp7-2SuvxStNZq"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-full border border-zinc-700 hover:border-pink-500 bg-transparent text-white text-sm font-semibold tracking-wide transition-all duration-300 shadow-[0_0_0_0_rgba(236,72,153,0)] hover:shadow-[0_0_20px_rgba(236,72,153,0.2)]"
            >
              Download CV
            </a>
          </div>

        </div>

        {/* Separator */}
        <div className="w-full h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent my-12"></div>

        {/* Bottom Bar */}
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Riyazul Islam. All rights reserved.</p>
          <a href="mailto:riyazulislam.773@gmail.com" className="hover:text-zinc-300 transition-colors">
            riyazulislam.773@gmail.com
          </a>
        </div>

      </div>
    </footer>
  );
}
