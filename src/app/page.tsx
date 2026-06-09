import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { CustomSolutions } from "@/components/sections/CustomSolutions";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background font-sans text-foreground">
      <Header />
      <Hero />
      <SkillsSection />
      <CustomSolutions />
      <PortfolioSection />
      <ExperienceSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
