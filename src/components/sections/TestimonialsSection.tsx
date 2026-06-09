'use client';

import { useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


interface Review {
  id: number;
  name: string;
  role: string;
  text: string;
}



export default function TestimonialsSection() {
  const { t } = useLanguage();

  const swiperRef = useRef<SwiperType>(null);

  const getInitials = (name: string) => {
    if (!name) return "";
    const parts = name.split(" ").filter(Boolean); // Divide y elimina espacios vacíos
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    // Toma la primera letra del primer y último nombre
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <section id="testimonials" className="relative w-full overflow-hidden bg-white py-24">
      {/* --- FONDO AMBIENTAL "SAFE ZONE" (NO TOCA BORDES) --- */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
          
          {/* Orbe Morado - Arriba Izquierda (Empujado hacia adentro) */}
          {/* top-32 garantiza que el difuminado muera antes del borde superior */}
          <div className="absolute top-32 left-5 md:left-10 w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-purple-400/5 rounded-full blur-[100px] md:blur-[120px]"></div>
          
          {/* Orbe Azul - Abajo Derecha (Empujado hacia adentro) */}
          {/* bottom-32 garantiza que el difuminado muera antes del borde inferior */}
          <div className="absolute bottom-32 right-5 md:right-10 w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-blue-400/5 rounded-full blur-[100px] md:blur-[120px]"></div>

      </div>
      {/* --- END BACKGROUND --- */}

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
        {/* Header with Flexbox */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          {/* Left Column: Titles & Social Proof */}
          <div className="max-w-2xl text-center md:text-left mx-auto md:mx-0">
            <h2 className="text-gray-900 font-bold text-4xl md:text-[40px]">
              {t.testimonials.title}
            </h2>
            <p className="text-gray-600 text-sm/6 mt-4 max-w-xl">
              {t.testimonials.subtitle}
            </p>
            
            {/* Social Proof */}
            <div className="mt-6 flex items-center justify-center md:justify-start gap-4">
              <div className="flex -space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-200 bg-blue-50 text-xs font-bold text-blue-600">
                  AM
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-200 bg-blue-50 text-xs font-bold text-blue-600">
                  SJ
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-200 bg-blue-50 text-xs font-bold text-blue-600">
                  MC
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-200 bg-blue-50 text-xs font-bold text-blue-600">
                  ED
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gray-900 text-xs font-medium text-white">
                  +61
                </div>
              </div>
              <span className="text-sm font-medium text-gray-600">
                {t.testimonials.reviewsCount || "61+ Client Reviews"}
              </span>
            </div>
          </div>

          {/* Right Column: Navigation Buttons */}
          <div className="hidden md:flex gap-2">
            <button 
              onClick={() => swiperRef.current?.slidePrev()}
              className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-900 swiper-button-prev-custom"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => swiperRef.current?.slideNext()}
              className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-900 swiper-button-next-custom"
              aria-label="Next testimonial"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Swiper Slider */}
        <div className="w-full">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            onBeforeInit={(swiper) => {
              // @ts-ignore
              swiperRef.current = swiper;
            }}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 16 },
              640: { slidesPerView: 2, spaceBetween: 24 },
              768: { slidesPerView: 3, spaceBetween: 24 },
              1024: { slidesPerView: 4, spaceBetween: 32 },
            }}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="!pb-12"
          >
            {t.testimonials.reviews.map((review: Review) => (
              <SwiperSlide key={review.id} className="h-auto">
                <div className="bg-white/50 backdrop-blur-sm border border-gray-100 hover:-translate-y-1 transition duration-300 rounded-2xl p-8 space-y-6 shadow-sm hover:shadow-md h-full flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm/6 text-gray-700 font-medium">&quot;{review.text}&quot;</p>
                  </div>
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-100 mt-auto">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg shrink-0 border border-blue-200">
                      {getInitials(review.name)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{review.name}</p>
                      <p className="text-xs font-medium text-gray-500">{review.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Mobile Navigation (Visible only on small screens) */}
        <div className="flex md:hidden justify-center gap-4 mt-8">
            <button 
              onClick={() => swiperRef.current?.slidePrev()}
              className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => swiperRef.current?.slideNext()}
               className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-900"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
        </div>
      </div>
    </section>
  );
}
