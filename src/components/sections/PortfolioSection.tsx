"use client";

import { useState, useEffect } from "react";
import Image, { type StaticImageData } from "next/image";
import { ExternalLink, X, ZoomIn } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import konek from "@/assets/konek.png";
import sistemaBiometrico from "@/assets/sistema-biometrico.png";
import anemec from "@/assets/anemec.png";
import aceiteVenta from "@/assets/aceite-venta.png";
import project1 from "@/assets/project-1.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";
import project7 from "@/assets/project-7.jpg";

type Category = "All" | "Web & Systems" | "E-commerce" | "Landing Pages" | "Brand & Graphic Design";

interface Project {
  id: number;
  title: string;
  description: string;
  category: Category;
  image: StaticImageData | string;
  link: string;
}

const ITEMS_PER_PAGE = 4;

const allProjects: Project[] = [
  // --- PROYECTOS PRINCIPALES (Sistemas y E-commerce) ---
  {
    id: 1,
    title: "Konek Electronics",
    category: "E-commerce",
    image: konek,
    link: "#",
    description: "High-performance E-commerce platform specialized in electronic products and smart devices."
  },
  {
    id: 2,
    title: "Biometric Academic Dashboard",
    category: "Web & Systems",
    image: sistemaBiometrico,
    link: "#",
    description: "Advanced academic system for course registration featuring biometric reader integration."
  },
  {
    id: 3,
    title: "Anemec Academy",
    category: "Web & Systems",
    image: anemec,
    link: "#",
    description: "Educational platform and portal dedicated to anti-bullying awareness and training."
  },
  {
    id: 4,
    title: "G&B Avocado Oil",
    category: "E-commerce",
    image: aceiteVenta,
    link: "#",
    description: "Premium e-commerce storefront designed for selling high-quality culinary avocado oil."
  },

  // --- PROYECTOS SECUNDARIOS (Para la página 2 de la paginación) ---
  {
    id: 5,
    title: "Real Estate Marketplace",
    category: "Web & Systems",
    image: project1,
    link: "#",
    description: "Modern real estate platform with map integration and dynamic property filters."
  },
  {
    id: 6,
    title: "Sana Crece",
    category: "Landing Pages",
    image: project5,
    link: "#",
    description: "Personal brand website focusing on professional coaching and personal growth."
  },
  {
    id: 7,
    title: "Grupo Arva Industrial",
    category: "Landing Pages",
    image: project6,
    link: "#",
    description: "Corporate industrial supply catalog and company profile."
  },
  {
    id: 8,
    title: "Santiago Sierra",
    category: "Landing Pages",
    image: project7,
    link: "#",
    description: "Professional services portfolio connecting people through psychology."
  },
  { id: 9, title: "Graphic Design 1", category: "Brand & Graphic Design", image: "/diseño/camisa 10.webp", link: "#", description: "Graphic Design Project" },
  { id: 10, title: "Graphic Design 2", category: "Brand & Graphic Design", image: "/diseño/camisa 7.webp", link: "#", description: "Graphic Design Project" },
  { id: 11, title: "Graphic Design 3", category: "Brand & Graphic Design", image: "/diseño/camisa 8.webp", link: "#", description: "Graphic Design Project" },
  { id: 12, title: "Graphic Design 4", category: "Brand & Graphic Design", image: "/diseño/camisa1.webp", link: "#", description: "Graphic Design Project" },
  { id: 13, title: "Graphic Design 5", category: "Brand & Graphic Design", image: "/diseño/camisa2.webp", link: "#", description: "Graphic Design Project" },
  { id: 14, title: "Graphic Design 6", category: "Brand & Graphic Design", image: "/diseño/camisa3.webp", link: "#", description: "Graphic Design Project" },
  { id: 15, title: "Graphic Design 7", category: "Brand & Graphic Design", image: "/diseño/log mas web.webp", link: "#", description: "Graphic Design Project" },
  { id: 16, title: "Graphic Design 8", category: "Brand & Graphic Design", image: "/diseño/logo .webp", link: "#", description: "Graphic Design Project" },
  { id: 17, title: "Graphic Design 9", category: "Brand & Graphic Design", image: "/diseño/logo 12.webp", link: "#", description: "Graphic Design Project" },
  { id: 18, title: "Graphic Design 10", category: "Brand & Graphic Design", image: "/diseño/logo 13.webp", link: "#", description: "Graphic Design Project" },
  { id: 19, title: "Graphic Design 11", category: "Brand & Graphic Design", image: "/diseño/logo 17.webp", link: "#", description: "Graphic Design Project" },
  { id: 20, title: "Graphic Design 12", category: "Brand & Graphic Design", image: "/diseño/logo 19.webp", link: "#", description: "Graphic Design Project" },
  { id: 21, title: "Graphic Design 13", category: "Brand & Graphic Design", image: "/diseño/logo 20.webp", link: "#", description: "Graphic Design Project" },
  { id: 22, title: "Graphic Design 14", category: "Brand & Graphic Design", image: "/diseño/logo 21.webp", link: "#", description: "Graphic Design Project" },
  { id: 23, title: "Graphic Design 15", category: "Brand & Graphic Design", image: "/diseño/logo 22.webp", link: "#", description: "Graphic Design Project" },
  { id: 24, title: "Graphic Design 16", category: "Brand & Graphic Design", image: "/diseño/logo 23.webp", link: "#", description: "Graphic Design Project" },
  { id: 25, title: "Graphic Design 17", category: "Brand & Graphic Design", image: "/diseño/logo 24.webp", link: "#", description: "Graphic Design Project" },
  { id: 26, title: "Graphic Design 18", category: "Brand & Graphic Design", image: "/diseño/logo 25.webp", link: "#", description: "Graphic Design Project" },
  { id: 27, title: "Graphic Design 19", category: "Brand & Graphic Design", image: "/diseño/logo 26.webp", link: "#", description: "Graphic Design Project" },
  { id: 28, title: "Graphic Design 20", category: "Brand & Graphic Design", image: "/diseño/logo 27.webp", link: "#", description: "Graphic Design Project" },
  { id: 29, title: "Graphic Design 21", category: "Brand & Graphic Design", image: "/diseño/logo 28.webp", link: "#", description: "Graphic Design Project" },
  { id: 30, title: "Graphic Design 22", category: "Brand & Graphic Design", image: "/diseño/logo 29.webp", link: "#", description: "Graphic Design Project" },
  { id: 31, title: "Graphic Design 23", category: "Brand & Graphic Design", image: "/diseño/logo 30.webp", link: "#", description: "Graphic Design Project" },
  { id: 32, title: "Graphic Design 24", category: "Brand & Graphic Design", image: "/diseño/logo.webp", link: "#", description: "Graphic Design Project" },
  { id: 33, title: "Graphic Design 25", category: "Brand & Graphic Design", image: "/diseño/logo.webp", link: "#", description: "Graphic Design Project" },
  { id: 34, title: "Graphic Design 26", category: "Brand & Graphic Design", image: "/diseño/logo10.webp", link: "#", description: "Graphic Design Project" },
  { id: 35, title: "Graphic Design 27", category: "Brand & Graphic Design", image: "/diseño/logo14.webp", link: "#", description: "Graphic Design Project" },
  { id: 36, title: "Graphic Design 28", category: "Brand & Graphic Design", image: "/diseño/logo15.webp", link: "#", description: "Graphic Design Project" },
  { id: 37, title: "Graphic Design 29", category: "Brand & Graphic Design", image: "/diseño/logo16.webp", link: "#", description: "Graphic Design Project" },
  { id: 38, title: "Graphic Design 30", category: "Brand & Graphic Design", image: "/diseño/logo18.webp", link: "#", description: "Graphic Design Project" },
  { id: 39, title: "Graphic Design 31", category: "Brand & Graphic Design", image: "/diseño/logo2.webp", link: "#", description: "Graphic Design Project" },
  { id: 40, title: "Graphic Design 32", category: "Brand & Graphic Design", image: "/diseño/logo3.webp", link: "#", description: "Graphic Design Project" },
  { id: 41, title: "Graphic Design 33", category: "Brand & Graphic Design", image: "/diseño/logo4.webp", link: "#", description: "Graphic Design Project" },
  { id: 42, title: "Graphic Design 34", category: "Brand & Graphic Design", image: "/diseño/logo5.webp", link: "#", description: "Graphic Design Project" },
  { id: 43, title: "Graphic Design 35", category: "Brand & Graphic Design", image: "/diseño/logo6.webp", link: "#", description: "Graphic Design Project" },
  { id: 44, title: "Graphic Design 36", category: "Brand & Graphic Design", image: "/diseño/logo7.webp", link: "#", description: "Graphic Design Project" },
  { id: 45, title: "Graphic Design 37", category: "Brand & Graphic Design", image: "/diseño/logo8.webp", link: "#", description: "Graphic Design Project" },
  { id: 46, title: "Graphic Design 38", category: "Brand & Graphic Design", image: "/diseño/logo9.webp", link: "#", description: "Graphic Design Project" }
];

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { t } = useLanguage();

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);
  // Build a fast lookup of translated descriptions for the 8 web projects (ids 1-8)
  const projectDescMap = Object.fromEntries(
    (t.portfolio.projects ?? []).map((p) => [p.id, p.description])
  );

  const filtered =
    activeCategory === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === activeCategory);

  // Pagination calculations
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProjects = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset to page 1 when category changes
  const handleCategoryChange = (cat: Category) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const categoryMap: Record<Category, string> = {
    All: t.portfolio.filters?.all || "All",
    "Web & Systems": "Web & Systems",
    "E-commerce": "E-commerce",
    "Landing Pages": "Landing Pages",
    "Brand & Graphic Design": "Brand & Graphic Design",
  };

  const categories: Category[] = ["All", "Web & Systems", "E-commerce", "Landing Pages", "Brand & Graphic Design"];

  return (
    <>
      <section id="portfolio" className="relative bg-white dark:bg-background py-20 md:py-28 overflow-hidden">
      {/* --- FONDO AMBIENTAL "SAFE ZONE" (NO TOCA BORDES) --- */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">

        {/* Orbe Azul - FLOTANDO CERCA DEL TÍTULO (Top Left) */}
        <div className="absolute top-32 left-10 md:left-20 w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-[100px]"></div>

        {/* Orbe Morado - FLOTANDO AL FINAL DEL GRID (Bottom Right) */}
        <div className="absolute bottom-32 right-10 md:right-20 w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-[100px]"></div>

      </div>
      {/* --- END BACKGROUND --- */}

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-10">
          <span className="inline-block rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-600 dark:text-violet-400">
            {t.portfolio.badge}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl">
            {t.portfolio.title}
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            {t.portfolio.subtitle}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="mb-10 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${activeCategory === cat
                ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg shadow-violet-500/25"
                : "bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20"
                }`}
            >
              {categoryMap[cat]}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {currentProjects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-violet-500/5"
            >
              {/* Image — click opens lightbox */}
              <div
                className="relative aspect-[16/10] w-full overflow-hidden cursor-pointer"
                onClick={() => {
                  const src = typeof project.image === "string" ? project.image : project.image.src;
                  setSelectedImage(src);
                }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />

                {/* Hover overlay with zoom hint */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

                {/* Zoom icon — appears on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="rounded-full bg-white/20 backdrop-blur-sm p-3 border border-white/30">
                    <ZoomIn size={22} className="text-white" />
                  </div>
                </div>

                {/* Category Badge on Image */}
                <span className="absolute bottom-4 left-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                  {categoryMap[project.category]}
                </span>
              </div>

              {/* Text Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                  {projectDescMap[project.id] ?? (project.id <= 8 ? project.description : t.portfolio.graphicDesign)}
                </p>
                <a
                  href={project.link}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-violet-600 dark:text-violet-400 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {t.portfolio.viewProject}
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage((page) => page - 1);
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === index + 1}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(index + 1);
                      }}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) setCurrentPage((page) => page + 1);
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </section>

    {/* ─── LIGHTBOX MODAL ─── */}
    {selectedImage && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
        onClick={() => setSelectedImage(null)}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedImage(null)}
          className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/25 hover:scale-110"
          aria-label="Close image"
        >
          <X size={20} />
        </button>

        {/* Image Container — stops click propagation so clicking the image doesn't close */}
        <div
          className="relative w-full max-w-5xl h-full max-h-[85vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={selectedImage}
            alt="Full size preview"
            fill
            className="object-contain"
            unoptimized
            priority
          />
        </div>
      </div>
    )}
  </>
  );
}
