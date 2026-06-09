"use client";

import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import Lanyard from "@/components/ui/Lanyard";
import { Particles } from "@/components/ui/particles";
import { useLanguage } from "@/context/LanguageContext";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center pt-20 pb-10 bg-white overflow-hidden">
      {/* --- CAPA DE FONDO VISUAL --- */}

      {/* Capa 1: Partículas Moradas (Más lentas y grandes) */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={80}
        ease={100}
        color="#8b5cf6"
        refresh
      />

      {/* Capa 2: Partículas Azules (Más rápidas y pequeñas para profundidad) */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={60}
        ease={50}
        color="#3b82f6"
        refresh
      />

      {/* --- FIN CAPA DE FONDO --- */}

      {/* CAPA 10: 3D Lanyard — Full viewport */}
      <div className="absolute inset-0 w-full h-full z-10 pointer-events-none hidden lg:block">
        <div className="w-full h-full pointer-events-auto">
          <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} fov={15} />
        </div>
      </div>

      {/* CAPA 20: Contenido (Fantasma) */}
      <div className="container mx-auto max-w-7xl px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center h-full relative z-20 pointer-events-none">

        {/* Left Content (Text) */}
        <div className="flex flex-col gap-6 lg:col-span-7 order-2 lg:order-1 items-center lg:items-start text-center lg:text-left w-full px-6 py-24 lg:p-0">

          <div className="space-y-4">
            {/* Subtitle / Badge */}
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-violet-500/10 text-violet-600 text-sm font-medium border border-violet-500/20">
                <Star size={14} className="fill-violet-600" />
                {t.hero.badge}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold tracking-tight text-gray-900 leading-tight">
              {t.hero.greeting}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600">{t.hero.role}</span> {t.hero.roleColor}
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {t.hero.description}
            </p>
          </div>

          {/* Botones (Sólidos — pointer-events-auto) */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-white font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-500/25 active:scale-95 pointer-events-auto"
            >
              {t.hero.btnPrimary}
              <ArrowRight size={20} />
            </Link>
            <Link
              href="#portfolio"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-gray-900 text-gray-900 font-semibold transition-all duration-300 hover:bg-gray-900 hover:text-white hover:-translate-y-1 active:scale-95 pointer-events-auto"
            >
              {t.hero.btnSecondary}
            </Link>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-gray-200 mt-4">
            <div className="flex flex-col items-center lg:items-start">
              <span className="text-3xl font-bold text-gray-900">100%</span>
              <span className="text-sm text-gray-600 uppercase tracking-wider font-medium">{t.hero.stats.jobSuccess}</span>
            </div>
            <div className="flex flex-col items-center lg:items-start">
              <span className="text-3xl font-bold text-gray-900">5.0 ★</span>
              <span className="text-sm text-gray-600 uppercase tracking-wider font-medium">{t.hero.stats.clientRating}</span>
            </div>
            <div className="flex flex-col items-center lg:items-start">
              <span className="text-3xl font-bold text-gray-900">61+</span>
              <span className="text-sm text-gray-600 uppercase tracking-wider font-medium">{t.hero.stats.projects}</span>
            </div>
            <div className="flex flex-col items-center lg:items-start">
              <span className="text-3xl font-bold text-gray-900">100%</span>
              <span className="text-sm text-gray-600 uppercase tracking-wider font-medium">{t.hero.stats.delivery}</span>
            </div>
          </div>
        </div>

        {/* Empty right column to maintain grid spacing on desktop */}
        <div className="hidden lg:block lg:col-span-5 order-2" />
      </div>
    </section>
  );
}
