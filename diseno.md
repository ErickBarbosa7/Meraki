# 🎨 OLI STUDIO - UI/UX Design System & AI Prompting Guide

> **Instrucciones de contexto para la IA:**
> Actúa como un Frontend Developer experto en React, Tailwind CSS y animaciones (CSS/Framer Motion). Tu objetivo es construir la interfaz de usuario de "Oli Studio", un estudio creativo impulsado por IA. Sigue estrictamente este sistema de diseño para asegurar una experiencia inmersiva, retro-moderna y con un fuerte enfoque en el storytelling visual y la estética editorial.

## 1. 🌌 Identidad Visual (El "Vibe")
*   **Estilo:** Retro-moderno, editorial, nostálgico pero tecnológico.
*   **Regla de oro de UI:** Fuerte contraste entre secciones oscuras y claras. Uso indispensable de texturas sutiles (ruido/grano de película o papel viejo) en los fondos para quitar la apariencia "digital plana".
*   **Sensación:** Debe sentirse como abrir una novela gráfica vintage premium o un póster de cine clásico, combinado con la limpieza y usabilidad de una agencia digital moderna.

## 2. 🎨 Paleta de Colores (Configuración de Tailwind)
Agrega estos colores a tu `tailwind.config.js`:

*   **Dark Background (`bg-oli-dark`):** `#161616` (Gris carbón casi negro, utilizado con textura de ruido).
*   **Light Background (`bg-oli-light`):** `#EAE5D9` (Tono pergamino/crema texturizado para la sección inferior).
*   **Accent / Primary (`text-oli-accent` / `bg-oli-accent`):** `#C96A52` (Terracota / Naranja óxido para resaltados, botones primarios y acentos tipográficos).
*   **Text Light (`text-oli-light`):** `#EAE5D9` (Crema suave para textos principales sobre fondos oscuros).
*   **Text Dark (`text-oli-dark`):** `#161616` (Carbón para textos sobre fondos claros).

## 3. ✍️ Tipografía (Google Fonts)
Configura estas fuentes en el proyecto:

1.  **Fuente Display (Serif):** `Playfair Display`, `Ogg` o `Lora`.
    *   **Uso:** EXCLUSIVO para los grandes encabezados ("Bringing Stories to Life..."), subtítulos de sección ("Stories We've brought to Life.") y el logotipo.
    *   **Estilo:** Tracking ligeramente ajustado, pesos elegantes. Se permite mezclar colores en la misma frase (ej. blanco y terracota).
2.  **Fuente UI (Sans-Serif):** `Inter` o `DM Sans`.
    *   **Uso:** Navegación, descripciones de párrafos, botones, etiquetas pequeñas (tags).
    *   **Estilo:** Limpio, minimalista. Uppercase y `tracking-widest` para las etiquetas y navegación.

## 4. 📐 Layout de la Pantalla Principal (Hero Section)
El layout del Hero debe ser asimétrico, espacioso y dividido en dos columnas:

1.  **Header:** Menú superior con Logo a la izquierda (con isotipo en color acento) y enlaces de navegación a la derecha en tipografía sans-serif pequeña, alineados horizontalmente.
2.  **Columna Izquierda (Contenido):**
    *   **Tag:** Etiqueta píldora inicial (ej. "AI-POWERED COMIC STUDIO") con fondo oscuro translúcido y texto morado/gris sutil o acento.
    *   **Heading:** Texto monumental en Serif. Destaca palabras clave ("AI & Creativity") usando la clase `text-oli-accent`.
    *   **Párrafo:** Texto descriptivo secundario en sans-serif, color gris claro/crema, con un ancho máximo (`max-w-md`) para buena legibilidad.
    *   **Botones:** Grupo flexible alineado a la izquierda (ver sección 5).
3.  **Columna Derecha (Visual):**
    *   **Arch Image:** Una imagen de ilustración retro encapsulada dentro de una forma de arco o cúpula. (Usa `rounded-t-full` con proporciones específicas o un `clip-path` en CSS para lograr la forma de ventana).

## 5. 🧩 Componentes UI Clave
*   **Etiquetas (Tags):** Ej. "FEATURED WORK". Usa tamaño pequeño (`text-xs`), mayúsculas (`uppercase`), espaciado amplio (`tracking-widest`), texto en color acento y un fondo del mismo color con opacidad muy baja (`bg-oli-accent/10` o `bg-black/20` con border).
*   **Botón Primario ("View our work"):** Fondo sólido terracota (`bg-oli-accent`), texto oscuro/negro, padding horizontal amplio y un ícono de flecha diagonal (`↗`).
*   **Botón Secundario ("Explore services"):** Fondo transparente, borde fino color crema (`border border-oli-light`), texto color crema.
*   **Tarjetas (Cards - Featured Work):** En la sección inferior (sobre fondo claro). Bordes redondeados (`rounded-xl` o `rounded-2xl`), mostrando ilustraciones de alta calidad. Los títulos de las tarjetas van en la parte inferior o superpuestos en la imagen con un degradado.

## 6. ✨ Microinteracciones y Estados
*   **Textura Global:** Implementa un `div` de capa superior con `pointer-events-none`, `opacity-[0.03]` y un fondo repetible de "ruido" o película fotográfica para unificar el aspecto vintage.
*   **Hover en Botones:**
    *   Primario: Ligero cambio de brillo o escala.
    *   Secundario: Transición a un fondo blanco/crema con texto oscuro.
*   **Animación de Entrada:** Los elementos de texto de la izquierda deben aparecer en cascada (fade-in y ligero slide-up). La imagen del arco de la derecha debe revelarse suavemente al cargar.