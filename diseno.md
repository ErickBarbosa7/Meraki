# 🎨 MERAKI - UI/UX Design System & AI Prompting Guide

> **Instrucciones de contexto para la IA:**
> Actúa como un Frontend Developer experto en React, Tailwind CSS y animaciones (CSS/Framer Motion). Tu objetivo es construir la interfaz de usuario de "Meraki", una aplicación minimalista para descubrir palabras inusuales. Sigue estrictamente este sistema de diseño para asegurar una experiencia limpia, misteriosa y elegante.

## 1. 🌌 Identidad Visual (El "Vibe")
*   **Estilo:** Minimalista, editorial, ligeramente misterioso.
*   **Regla de oro de UI:** Abundante espacio en blanco (`whitespace`). No satures la pantalla. El protagonismo absoluto lo tiene la palabra.
*   **Sensación:** Debe sentirse como abrir un diccionario antiguo pero con un diseño suizo moderno.

## 2. 🎨 Paleta de Colores (Configuración de Tailwind)
Agrega estos colores a tu `tailwind.config.js`:

*   **Background (`bg-meraki-bg`):** `#F7F6F2` (Un tono hueso/crema muy sutil).
*   **Primary Text (`text-meraki-primary`):** `#171717` (Casi negro, para la palabra principal y botones).
*   **Secondary Text (`text-meraki-secondary`):** `#737373` (Gris medio, para la descripción y el idioma).
*   **Accent (Opcional):** Si necesitas un foco visual muy sutil (ej. el borde del botón), usa el Primary pero con opacidad.

## 3. ✍️ Tipografía (Google Fonts)
Configura estas fuentes en el proyecto:

1.  **Fuente Display (Serif):** `Cormorant Garamond` (o similar como *Playfair Display*).
    *   **Uso:** EXCLUSIVO para las palabras grandes dentro del *Word Reel* y el logo.
    *   **Estilo:** `text-5xl` o mayor, tracking ajustado, elegante.
2.  **Fuente UI (Sans-Serif):** `Inter`.
    *   **Uso:** Botones de acción ("Discover"), frases secundarias ("Discover something new"), etiquetas.
    *   **Estilo:** Uppercase, tracking amplio (`tracking-widest`), tamaño pequeño (`text-xs` o `text-sm`).

## 4. 📐 Layout de la Pantalla Principal (MVP)
Usa un layout centralizado (`min-h-screen flex flex-col items-center justify-center`):

1.  **Top:** Logo "MERAKI" (Serif, tamaño medio) + Frase "Discover something new." (Sans, gris, pequeña).
2.  **Center (El Word Reel):** Un contenedor con altura fija (`h-32` o similar) y `overflow-hidden`. Aquí vivirán las palabras.
3.  **Bottom:** El botón "DISCOVER" (Borde sólido, sin fondo, texto centrado, padding amplio).

## 5. 🎰 Comportamiento del "Word Reel" (Instrucciones de Animación)
*Atención IA: Esta es la parte más compleja. Presta especial atención al timing.*

1.  **Estado Inicial:** Muestra una palabra estática (ej. "MERAKI").
2.  **On Click ("Discover"):**
    *   Deshabilita el botón (para evitar doble click).
    *   El botón reduce su opacidad al 50%.
    *   Comienza la animación de las palabras fluyendo de abajo hacia arriba (Efecto Slot Machine).
3.  **La Animación (Spinning):**
    *   Aplica un ligero `filter: blur(2px)` en el eje Y (`blur-y` si usas un plugin, o CSS nativo) para simular velocidad.
    *   Las palabras deben cambiar rápidamente (ej. cada 50-100ms).
4.  **La Desaceleración (Easing/Friction):**
    *   El intervalo entre palabras debe aumentar progresivamente (curva *ease-out*).
    *   Las últimas 3 palabras deben pasar muy lentamente.
5.  **El Final (Stop):**
    *   El blur desaparece.
    *   La palabra seleccionada elegida por la API hace un sutil `scale(1.05)` a `scale(1)` y un `fade-in`.
    *   El botón vuelve a su estado normal y cambia su texto a "DISCOVER AGAIN".

## 6. ✨ Microinteracciones y Estados
*   **Hover del Botón:** Transición suave. De fondo transparente con borde negro, a fondo negro con texto blanco. Duración: `duration-300`.
*   **Focus:** Outline limpio. Evitar el outline por defecto del navegador.
*   **Carga inicial:** Si la API demora, muestra el Reel vacío o con una línea pulsante. NUNCA muestres un "spinner" tradicional de carga, rompe la estética editorial.