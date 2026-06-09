"use client";

import { Heart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  const navLinks = [
    { label: t.nav.home, href: "#" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.portfolio, href: "#portfolio" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <footer className="border-t border-gray-200 bg-white py-8">
      <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
        {/* Copyright */}
        <p className="flex items-center gap-1 text-sm text-gray-600">
          {t.footer.rights}
        </p>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
