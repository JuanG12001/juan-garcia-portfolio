"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Linkedin, Github, Twitter, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function ContactSection() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    const key = id.replace("contact-", "");
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ type: "success", message: "Mensaje enviado exitosamente" });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({ type: "error", message: "Hubo un error al enviar el mensaje. Intenta de nuevo." });
      }
    } catch (error) {
      setStatus({ type: "error", message: "Error de red. Intenta de nuevo." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-white py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-14 text-center">
          <span className="inline-block rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-600">
            {t.contact.badge}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
            {t.contact.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            {t.contact.subtitle}
          </p>
        </div>

        {/* Grid: Form + Info */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* ─── Left Column: Form ─── */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Name + Email Row */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  {t.contact.form.name}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t.contact.form.placeholders.name}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  {t.contact.form.email}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t.contact.form.placeholders.email}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="contact-subject"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                {t.contact.form.subject}
              </label>
              <input
                id="contact-subject"
                type="text"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder={t.contact.form.placeholders.subject}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                disabled={isSubmitting}
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="contact-message"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                {t.contact.form.message}
              </label>
              <textarea
                id="contact-message"
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
                placeholder={t.contact.form.placeholders.message}
                className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                disabled={isSubmitting}
              />
            </div>

            {/* Status Message */}
            {status.type && (
              <div
                className={`rounded-lg p-4 text-sm font-medium ${
                  status.type === "success"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {status.message}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-violet-500/30 hover:brightness-110 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  Sending...
                  <Loader2 size={16} className="animate-spin" />
                </>
              ) : (
                <>
                  {t.contact.form.btn}
                  <Send size={16} />
                </>
              )}
            </button>
          </form>

            {/* Contact Info */}
            <div className="space-y-5">
              {/* Email Card */}
              <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-5 transition-all hover:shadow-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 text-white">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">{t.contact.info.emailLabel}</p>
                  <p className="text-sm font-semibold text-gray-900">
                    juanegarcia126@gmail.com
                  </p>
                </div>
              </div>

              {/* Phone Card */}
              <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-5 transition-all hover:shadow-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 text-white">
                  <Phone size={22} />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">{t.contact.info.phoneLabel}</p>
                  <p className="text-sm font-semibold text-gray-900">
                  +58 412 590 0091
                  </p>
                </div>
              </div>

              {/* Location Card */}
              <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-5 transition-all hover:shadow-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 text-white">
                  <MapPin size={22} />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">{t.contact.info.locationLabel}</p>
                  <p className="text-sm font-semibold text-gray-900">
                    Venezuela - Caracas
                  </p>
                </div>
              </div>

            {/* Follow Me */}
            <div>
              <h4 className="mb-3 text-sm font-bold text-gray-900">{t.contact.followMe}</h4>
              <div className="flex gap-3">
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-all hover:border-violet-500 hover:bg-violet-50 hover:text-violet-600"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="#"
                  aria-label="GitHub"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-all hover:border-violet-500 hover:bg-violet-50 hover:text-violet-600"
                >
                  <Github size={18} />
                </a>
                <a
                  href="#"
                  aria-label="X (Twitter)"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-all hover:border-violet-500 hover:bg-violet-50 hover:text-violet-600"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="TikTok"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-all hover:border-violet-500 hover:bg-violet-50 hover:text-violet-600"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Available Card */}
            <div className="w-full rounded-xl border border-green-200 bg-emerald-50/50 p-6 shadow-sm">
              <div className="flex items-center gap-4">
                {/* Pulsating Green Dot */}
                <span className="relative flex h-4 w-4 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-4 w-4 rounded-full bg-emerald-500" />
                </span>
                <p className="text-base font-bold text-gray-900">
                  {t.contact.status}
                </p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                {t.contact.statusDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
