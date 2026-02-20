import {
  SiHtml5, SiCss3, SiJavascript, SiReact, SiRedux, SiExpress, SiNodedotjs,
  SiNextdotjs, SiGithub, SiGit, SiMongodb, SiTypescript, SiFigma,
  SiAdobeillustrator, SiAdobephotoshop, SiGo, SiN8N
} from "react-icons/si";

interface Skill {
  name: string;
  icon: React.ElementType;
  color: string; // Tailwind color class backbone for border/shadow
  customColor?: string; // Hex for precise control if needed
}

const skills: Skill[] = [
  { name: "HTML", icon: SiHtml5, color: "orange-600", customColor: "#E34F26" },
  { name: "CSS", icon: SiCss3, color: "blue-500", customColor: "#1572B6" },
  { name: "JavaScript", icon: SiJavascript, color: "yellow-400", customColor: "#F7DF1E" },
  { name: "React", icon: SiReact, color: "cyan-400", customColor: "#61DAFB" },
  { name: "Redux", icon: SiRedux, color: "purple-600", customColor: "#764ABC" },
  { name: "Express.js", icon: SiExpress, color: "gray-500", customColor: "#FFFFFF" }, // Express is usually black/white
  { name: "Node.js", icon: SiNodedotjs, color: "green-500", customColor: "#339933" },
  { name: "Next.js", icon: SiNextdotjs, color: "white", customColor: "#FFFFFF" },
  { name: "GitHub", icon: SiGithub, color: "white", customColor: "#FFFFFF" },
  { name: "Git", icon: SiGit, color: "red-500", customColor: "#F05032" },
  { name: "MongoDB", icon: SiMongodb, color: "green-500", customColor: "#47A248" },
  { name: "TypeScript", icon: SiTypescript, color: "blue-500", customColor: "#3178C6" },
  { name: "Figma", icon: SiFigma, color: "purple-400", customColor: "#F24E1E" },
  { name: "Illustrator", icon: SiAdobeillustrator, color: "orange-600", customColor: "#FF9A00" },
  { name: "Photoshop", icon: SiAdobephotoshop, color: "blue-600", customColor: "#31A8FF" },
  { name: "Go", icon: SiGo, color: "cyan-500", customColor: "#00ADD8" },
  { name: "n8n", icon: SiN8N, color: "pink-500", customColor: "#FF6584" },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="bg-black text-white py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center">

        <h2 className="text-5xl md:text-6xl font-bold mb-16 tracking-tight">
          My skills
        </h2>

        <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-10">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="group relative flex flex-col items-center justify-center w-full aspect-square md:w-40 md:h-40 rounded-2xl md:rounded-3xl bg-black border-[1px] md:border-2 transition-all duration-300 hover:scale-105"
              style={{
                borderColor: skill.customColor,
                boxShadow: `0 0 10px ${skill.customColor}40` // semi-transparent glow static
              }}
            >
              {/* Stronger glow on hover via CSS injection or inline style change */}
              <div
                className="absolute inset-0 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow: `0 0 20px ${skill.customColor}, inset 0 0 10px ${skill.customColor}40`
                }}
              ></div>

              <div className="z-10 flex flex-col items-center gap-1 md:gap-3">
                <skill.icon
                  className="text-2xl md:text-5xl transition-transform duration-300 group-hover:scale-110"
                  style={{ color: skill.customColor }}
                />
                <span className="text-[10px] md:text-sm font-medium tracking-wide text-zinc-300 group-hover:text-white text-center px-1 truncate w-full">
                  {skill.name}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
