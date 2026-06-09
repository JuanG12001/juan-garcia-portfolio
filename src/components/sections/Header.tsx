"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from '@/context/LanguageContext';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  const navLinks = [
    { name: t.nav.home, href: "#home" },
    { name: t.nav.services, href: "#services" },
    { name: t.nav.portfolio, href: "#portfolio" },
    { name: t.nav.experience, href: "#experience" },
    { name: t.nav.contact, href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image 
            src="/icon.svg" 
            alt="Juan Garcia Logo" 
            width={32} 
            height={32} 
            className="w-8 h-8 object-contain transition-transform group-hover:scale-105"
          />
          <span className="font-bold text-xl tracking-tight text-gray-900">
            Juan Garcia
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
          
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100"
          >
            <Globe className="h-4 w-4" />
            <span>{language === 'en' ? 'EN' : 'ES'}</span>
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground hover:bg-accent rounded-md"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border/40 bg-background">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-lg font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              <Globe className="h-5 w-5" />
              <span>{language === 'en' ? 'EN' : 'ES'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
