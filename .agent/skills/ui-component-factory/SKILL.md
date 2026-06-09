---
name: ui-component-factory
description: Experto en Diseño UI/UX y Animaciones. Úsalo cuando el usuario pida crear una sección visual o entregue un componente base para mejorar.
---

# UI Component Factory Strategy

Esta habilidad define cómo transformar ideas o archivos crudos en componentes de portafolio de alto impacto.

## 1. Flujo de Trabajo (El "Toque Mágico")
Cuando el usuario te pida crear una sección o te de un archivo de referencia:
1. **Analiza el Propósito:** ¿Es un Hero, un Grid de Proyectos, o un Sobre Mí?
2. **Diseño Visual:** Aplica un diseño moderno, minimalista y con buen espaciado (whitespace).
3. **Interactividad:** Sugiere micro-interacciones sutiles (hover effects, transiciones al aparecer).

## 2. Reglas de Estilo (Tailwind)
- Usa `clsx` y `tailwind-merge` (o la función `cn` si existe en `src/lib/utils`) para clases condicionales.
- **Mobile First:** Escribe las clases base para móvil y usa `md:` o `lg:` para escritorio.
- **Colores:** Usa las variables CSS del sistema (ej: `bg-background`, `text-foreground`) para soportar modo oscuro automáticamente.

## 3. Animaciones (Framer Motion)
- Si el usuario pide animaciones o el componente es "impresionante" (como el Lanyard), usa `framer-motion`.
- Patrón común:
  ```tsx
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
  ```
