# 🚀 MERAKI - Fases de Desarrollo

## Fase 1 — Setup Inicial
*   [ ] Crear repositorio `meraki`
*   [ ] Inicializar frontend con Vite (React + TS)
*   [ ] Inicializar backend con Express + TypeScript
*   [ ] Configurar ESLint y Tailwind CSS
*   [ ] Crear scripts de desarrollo concurrente (`npm run dev`)

## Fase 2 — Backend y Datos
*   [ ] Crear archivo `words.json` con 50-100 palabras iniciales, variando categorías (Nature, Philosophy, Rare, etc.)
*   [ ] Implementar endpoints: `GET /api/words` y `GET /api/words/random`
*   [ ] Testear los endpoints con Postman o ThunderClient

## Fase 3 — Frontend Estático
*   [ ] Construir layout principal (`Home.tsx`)
*   [ ] Maquetar `Logo`, `Description`, `WordReel` (estático) y `DiscoverButton`
*   [ ] Conectar la API: Lograr que al hacer click, se obtenga una palabra y se muestre en pantalla (sin animación aún).

## Fase 4 — La Magia (Animación del Word Reel)
*   [ ] Implementar estado `isSpinning`.
*   [ ] Crear la secuencia de palabras temporales para la animación.
*   [ ] Añadir movimiento vertical infinito / loop al reel.
*   [ ] Programar la curva de desaceleración (friction/easing).
*   [ ] Mostrar la palabra final al detenerse.

## Fase 5 — Experiencia de Usuario (UX)
*   [ ] Bloquear el botón "Discover" (`disabled`) mientras el reel gira.
*   [ ] Añadir estados de carga (loading inicial).
*   [ ] Pulir responsive design (Mobile first).
*   [ ] Habilitar interacción con teclado (ej. presionar `Espacio` para girar).
*   [ ] Manejo de errores de conexión con el backend.

## Fase 6 — Pulido y Lanzamiento
*   [ ] Diseñar e implementar el Favicon.
*   [ ] Configurar metadata y Open Graph para compartir enlaces.
*   [ ] Escribir un buen `README.md` con capturas de pantalla.
*   [ ] (Opcional) Implementar Dark Mode.

---

## 🔮 Futuro (Post-MVP)
*   **Historial:** Lista de palabras descubiertas localmente.
*   **Favoritos:** "Save this word" (requiere localstorage o BD).
*   **Shareable Assets:** Generación de imágenes para compartir en redes.
*   **Filtros:** Descubrir palabras por categoría específica.
*   **Palabra del Día:** Sincronización global para una palabra diaria.

## 🧠 LA REGLA DE ORO DE MERAKI
**Nunca explicar inmediatamente una palabra.**
No conviertas la app en un diccionario. Meraki expone la palabra, el idioma de origen y ya. La fricción de obligar al usuario a decir "A ver... ¿qué significa esto?" y buscarlo por su cuenta es el núcleo de la experiencia.