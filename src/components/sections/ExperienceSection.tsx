"use client";

import { Briefcase, GraduationCap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface TimelineCardProps {
  title: string;
  date: string;
  institution: string;
  description: string;
}

function TimelineCard({ title, date, institution, description }: TimelineCardProps) {
  return (
    <div className="group relative rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-violet-300 hover:shadow-md hover:shadow-violet-100/50">
      <div className="flex items-start justify-between gap-4">
        <h4 className="text-lg font-bold text-gray-900">{title}</h4>
        <span className="shrink-0 text-sm font-semibold text-violet-600">{date}</span>
      </div>
      <p className="mt-1 text-sm font-medium text-gray-500">{institution}</p>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{description}</p>
    </div>
  );
}

export function ExperienceSection() {
  const { t } = useLanguage();

  return (
    <section id="experience" className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-14">
          <span className="inline-block rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-600">
            {t.experience.badge}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
            {t.experience.title}
          </h2>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left Column — Experience */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 text-white">
                <Briefcase size={20} />
              </span>
              <h3 className="text-xl font-bold text-gray-900">{t.experience.expTitle}</h3>
            </div>
            <div className="flex flex-col gap-4">
              {t.experience.items.map((item) => (
                <TimelineCard key={item.title} {...item} />
              ))}
            </div>
          </div>

          {/* Right Column — Education */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 text-white">
                <GraduationCap size={20} />
              </span>
              <h3 className="text-xl font-bold text-gray-900">{t.experience.eduTitle}</h3>
            </div>
            <div className="flex flex-col gap-4">
              {t.experience.education.map((item) => (
                <TimelineCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
