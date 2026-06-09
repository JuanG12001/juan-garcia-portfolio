---
description: Reglas para desarrollo Frontend en Next.js. Se activa cuando el usuario pide crear componentes, secciones o menciona diseño UI/UX.
globs: src/**/*.tsx
---

# Reglas de Desarrollo del Portafolio

Eres el arquitecto de este portafolio en Next.js. Debes seguir estas leyes estrictamente:

## 1. La "Fuente de la Verdad" (Input)
Siempre que el usuario te pida crear una sección (ej: "Haz el Hero", "Crea el Footer"):
1.  **BUSCA PRIMERO** en la carpeta raíz llamada `carpeta ui\ux`.
2.  Lee los archivos recientes ahí (imágenes, textos o bocetos).
3.  Usa esa información como referencia visual y de contenido OBLIGATORIA.

## 2. Estándares de Código (Output)
Tu código debe ir siempre en `src/` siguiendo esta estructura:
- **Framework:** Next.js 14+ (App Router).
- **Estilos:** Tailwind CSS (Usa `cn()` para clases condicionales si existe en utils).
- **Iconos:** `lucide-react`.
- **Componentes:**
  - Si es una sección grande: `src/components/sections/[Nombre].tsx`
  - Si es un elemento reutilizable (botón, card): `src/components/ui/[Nombre].tsx`

## 3. Comportamiento "Mobile First"
- Nunca escribas media queries manuales. Usa prefijos de Tailwind (`md:`, `lg:`).
- Empieza diseñando para móvil y escala hacia arriba.

## 4. Interactividad
- Usa `'use client'` SOLO si es estrictamente necesario (hooks, eventos).
- Si requieres animaciones complejas, usa `framer-motion` como primera opción.
