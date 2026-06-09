"use client";

import { Marquee } from "@/components/ui/marquee";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiPhp,
  SiPostgresql,
  SiDocker,
  SiAmazonwebservices,
  SiGit,
  SiBlender,
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiFigma,
  SiThreedotjs,
  SiMongodb,
  SiAngular,
  SiVuedotjs,
  SiDotnet,
  SiDjango,
  SiFlask,
  SiRubyonrails,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiLaravel,
  SiBootstrap,
  SiMysql,
  SiReact as SiReactNative, 
  SiFlutter,
  SiKotlin,
  SiWordpress,
  SiAdobepremierepro,
  SiAdobeaftereffects,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { useLanguage } from "@/context/LanguageContext";
import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";

interface SkillItem {
  name: string;
  icon: IconType;
  color: string;
}

const allSkills: SkillItem[] = [
  // Design & Creative
  { name: "Blender 3D", icon: SiBlender, color: "#E87D0D" },
  { name: "Illustrator", icon: SiAdobeillustrator, color: "#FF9A00" },
  { name: "Photoshop", icon: SiAdobephotoshop, color: "#31A8FF" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  { name: "Premiere Pro", icon: SiAdobepremierepro, color: "#9999FF" },
  { name: "After Effects", icon: SiAdobeaftereffects, color: "#9999FF" },
  // Frontend
  { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", icon: SiCss3, color: "#1572B6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
  { name: "Vue.js", icon: SiVuedotjs, color: "#4FC08D" },
  { name: "Angular", icon: SiAngular, color: "#DD0031" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
  { name: "Three.js", icon: SiThreedotjs, color: "#000000" },
  // Mobile
  { name: "React Native", icon: SiReactNative, color: "#61DAFB" },
  { name: "Flutter", icon: SiFlutter, color: "#02569B" },
  { name: "Kotlin", icon: SiKotlin, color: "#7F52FF" },
  // Backend & CMS
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Django", icon: SiDjango, color: "#092E20" },
  { name: "Flask", icon: SiFlask, color: "#000000" },
  { name: "PHP", icon: SiPhp, color: "#777BB4" },
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
  { name: "Ruby on Rails", icon: SiRubyonrails, color: "#CC0000" },
  { name: ".NET", icon: SiDotnet, color: "#512BD4" },
  { name: "WordPress", icon: SiWordpress, color: "#21759B" },
  // Database
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  // DevOps & Tools
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "AWS", icon: SiAmazonwebservices, color: "#FF9900" },
  { name: "Git", icon: SiGit, color: "#F05032" },
];

// Split skills into three rows for better density
const thirdIndex = Math.ceil(allSkills.length / 3);
const firstRow = allSkills.slice(0, thirdIndex);
const secondRow = allSkills.slice(thirdIndex, thirdIndex * 2);
const thirdRow = allSkills.slice(thirdIndex * 2);

function SkillCard({ name, icon: Icon, color }: SkillItem) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-sm transition-all duration-300 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-100/60 hover:-translate-y-1">
      <Icon size={24} color={color} className="shrink-0" />
      <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

export function SkillsSection() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Section Header */}


      {/* Section Header with GridPattern */}
      <div className="relative flex flex-col items-center justify-center py-20 lg:py-24 overflow-hidden mb-14 text-center">
        <GridPattern
            width={40}
            height={40}
            x={-1}
            y={-1}
            strokeDasharray={"4 2"}
            className={cn(
              "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
              "inset-x-0 inset-y-[-50%] h-[200%] skew-y-12",
              "opacity-60"
            )}
        />
        <div className="relative z-10 text-center px-4">
          <span className="inline-block rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-600 mb-4">
            What I Use
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
            {t.skills.title}
          </h2>
          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            {t.skills.subtitle}
          </p>
        </div>
      </div>
      </div>

      {/* Marquee Container with Fade Edges */}
      <div className="relative">
        <div className="flex flex-col gap-4">
          {/* Row 1: Left → Right */}
          <Marquee pauseOnHover className="[--duration:40s]">
            {firstRow.map((skill) => (
              <SkillCard key={skill.name} {...skill} />
            ))}
          </Marquee>

          {/* Row 2: Right → Left (Reversed) */}
          <Marquee pauseOnHover reverse className="[--duration:50s]">
            {secondRow.map((skill) => (
              <SkillCard key={skill.name} {...skill} />
            ))}
          </Marquee>

          {/* Row 3: Left → Right */}
          <Marquee pauseOnHover className="[--duration:45s]">
            {thirdRow.map((skill) => (
              <SkillCard key={skill.name} {...skill} />
            ))}
          </Marquee>
        </div>

        {/* Fade Mask — Left */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white to-transparent" />

        {/* Fade Mask — Right */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white to-transparent" />
      </div>
    </section>
  );
}
