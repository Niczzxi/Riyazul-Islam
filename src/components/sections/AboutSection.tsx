import Image from "next/image";
import Profile from "@/assets/AboutSection.png";

const timeline = [
  {
    role: "Aspiring MERN Stack Developer",
    period: "2024-Present",
    desc: "Passionate about building scalable web applications. Though I am a fresher, I have built multiple full-stack projects using Next.js, TypeScript, and MongoDB, demonstrating my ability to deliver production-ready code.",
    dotColor: "bg-blue-600",
    lineColor: "from-blue-600 to-purple-600"
  },
  {
    role: "Full-Stack Development Journey",
    period: "2023-2024",
    desc: "Dedicatedly learning and mastering the MERN stack. Completed rigorous coursework and self-directed projects to bridge the gap between theory and practical application.",
    dotColor: "bg-purple-600",
    lineColor: "from-purple-600 to-pink-600"
  },
  {
    role: "BBA (Honors) in Management",
    period: "Ongoing",
    desc: "Currently pursuing a Bachelor of Business Administration (Honors) at Dhaka Central University. Developing strong communication and analytical skills alongside my technical endeavors.",
    dotColor: "bg-pink-600",
    lineColor: "bg-pink-600"
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-black text-white w-full py-24 px-6 md:px-16 flex flex-col md:flex-row items-center justify-center gap-16 overflow-hidden">

      {/* Left: Image with Blob Background */}
      <div className="relative w-full max-w-lg md:max-w-xl flex justify-center">

        <div className="relative w-full aspect-square flex items-center justify-center">
           {/* The White Blob Background */}
           {/* SVG Blob for smoother, organic shape matching the reference roughly */}
           <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center scale-110">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-[120%] h-[120%] fill-white transform rotate-12">
                <path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-46.9C87.4,-34.7,90.1,-20.4,90.9,-6.2C91.7,8,90.6,22.1,84.3,34.4C77.9,46.7,66.3,57.2,53.4,64.6C40.5,72,26.3,76.3,11.6,78.2C-3.1,80.1,-18.3,79.6,-32.1,74.7C-45.9,69.8,-58.3,60.5,-67.6,48.8C-76.9,37.1,-83.1,23,-83.6,8.7C-84.1,-5.6,-78.9,-20.1,-69.5,-31.6C-60.1,-43.1,-46.5,-51.6,-33.2,-59.2C-19.9,-66.8,-7,-73.5,6.5,-74.6C20,-75.7,40,-71.2,44.7,-76.4Z" transform="translate(100 100)" />
              </svg>
           </div>

           {/* Image Masked inside the blob? Or just sitting on top*/}
           <div className="relative z-10 w-[80%] md:w-[90%] transform translate-y-4">
             <Image
               src={Profile}
               alt="About Me"
               className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
             />
           </div>
        </div>

      </div>

      {/* Right: Content */}
      <div className="w-full max-w-2xl space-y-12">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight">
          About me
        </h2>

        <div className="space-y-8 relative">
          {timeline.map((item, index) => (
             <div key={index} className="flex gap-6 group">
                {/* Timeline Column */}
                <div className="flex flex-col items-center">
                   {/* Dot */}
                   <div className={`w-4 h-4 rounded-full ${item.dotColor} z-10 group-hover:scale-125 transition-transform duration-300`}></div>

                   {/* Line connecting to next */}
                   {index !== timeline.length - 1 && (
                     <div className={`w-0.5 h-full mt-2 bg-gradient-to-b ${item.lineColor}`}></div>
                   )}
                </div>

                {/* Text Content */}
                <div className="flex-1 pb-8">
                   <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                      <h3 className="text-2xl font-semibold mb-1 md:mb-0">{item.role}</h3>
                      <span className="text-zinc-500 text-sm font-medium">{item.period}</span>
                   </div>
                   <p className="text-zinc-400 leading-relaxed max-w-lg">
                      {item.desc}
                   </p>
                </div>
             </div>
          ))}
        </div>
      </div>

    </section>
  );
}
