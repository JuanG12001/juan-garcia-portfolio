"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Code2,
  BrainCircuit,
  Smartphone,
  ShoppingCart,
  Paintbrush,
  ArrowUpRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface SolutionItem {
  id: string;
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export function CustomSolutions() {
  const { t } = useLanguage();

  const solutions: SolutionItem[] = [
    {
      id: "fullstack",
      number: "01",
      icon: Code2,
      title: t.custom.items[0].title,
      description: t.custom.items[0].description,
    },
    {
      id: "ai",
      number: "02",
      icon: BrainCircuit,
      title: t.custom.items[1].title,
      description: t.custom.items[1].description,
    },
    {
      id: "mobile",
      number: "03",
      icon: Smartphone,
      title: t.custom.items[2].title,
      description: t.custom.items[2].description,
    },
    {
      id: "ecommerce",
      number: "04",
      icon: ShoppingCart,
      title: t.custom.items[3].title,
      description: t.custom.items[3].description,
    },
    {
      id: "branding",
      number: "05",
      icon: Paintbrush,
      title: t.custom.items[4].title,
      description: t.custom.items[4].description,
    },
  ];

  return (
    <section id="services" className="bg-white py-20 md:py-28">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Section Header */}
        <div className="mb-14">
          <span className="inline-block rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-600">
            {t.custom.badge}
          </span>
          <h2 
            className="mt-4 text-3xl font-bold tracking-tight text-gray-900 md:text-5xl"
            dangerouslySetInnerHTML={{ __html: t.custom.title }}
          />
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            {t.custom.subtitle}
          </p>
        </div>

        {/* Accordion */}
        <Accordion
          type="single"
          collapsible
          defaultValue="fullstack"
          className="flex flex-col gap-4"
        >
          {solutions.map((item) => {
            const Icon = item.icon;
            return (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="group/card rounded-xl border border-gray-200 bg-white px-6 py-2 transition-all duration-300 data-[state=open]:border-blue-500 data-[state=open]:bg-blue-50/60 data-[state=open]:shadow-md"
              >
                <AccordionTrigger className="hover:no-underline [&>svg]:hidden">
                  <div className="flex w-full items-center gap-4">
                    {/* Number */}
                    <span className="text-2xl font-bold text-gray-300 transition-colors group-data-[state=open]/card:text-blue-400">
                      {item.number}
                    </span>

                    {/* Icon */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition-all group-data-[state=open]/card:bg-blue-500 group-data-[state=open]/card:text-white">
                      <Icon size={20} />
                    </div>

                    {/* Title */}
                    <span className="text-left text-base font-semibold text-gray-900 md:text-lg">
                      {item.title}
                    </span>

                    {/* Arrow — pushed right */}
                    <div className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-all group-data-[state=open]/card:bg-blue-500 group-data-[state=open]/card:text-white group-data-[state=open]/card:rotate-45">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pl-[4.5rem] pr-12 pb-4 pt-1 text-gray-600">
                  {item.description}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
}
