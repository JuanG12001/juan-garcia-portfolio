---
name: nextjs-architect
description: Estándares de arquitectura para Next.js (App Router), TypeScript y Tailwind. Úsalo al crear páginas, layouts o lógica de enrutamiento.
---

# Next.js Architecture Standards

Utiliza estas reglas siempre que generes estructura de proyecto o lógica de enrutamiento.

## 1. Stack Tecnológico & Estructura
- **Framework:** Next.js 14+ (App Router).
- **Lenguaje:** TypeScript Estricto (siempre define interfaces para Props).
- **Estilos:** Tailwind CSS.
- **Iconos:** `lucide-react`.
- **Estructura de Carpetas:**
  - `src/app`: Solo para `page.tsx`, `layout.tsx`, `loading.tsx`.
  - `src/components`: Para todos los componentes de UI.
  - `src/lib`: Para utilidades (`utils.ts`) y configuraciones.

## 2. Server vs Client Components
- Por defecto, asume que todo es **Server Component**.
- Usa `'use client'` ÚNICAMENTE si el componente usa:
  - Hooks (`useState`, `useEffect`).
  - Event Listeners (`onClick`).
  - Animaciones de Framer Motion.
- Si un componente necesita interactividad, intenta aislar esa parte en un sub-componente pequeño.

## 3. Buenas Prácticas de Código
- **Nombres:** PascalCase para componentes (`MiComponente.tsx`), kebab-case para carpetas de ruta.
- **Exportaciones:** Usa `export function` o `export const` nombrado, evita `export default` excepto en `page.tsx`.
- **Imágenes:** Usa siempre el componente `<Image />` de Next.js optimizado.
