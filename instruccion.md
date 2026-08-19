# 📚 MERAKI - Instrucciones del Proyecto

## 1. 🎯 Objetivo del Proyecto
Crear una experiencia sencilla de descubrimiento de palabras.
**Flujo principal:**
Entrar -> Ver Word Reel -> Presionar "Discover" -> Reel gira y desacelera -> Aparece una palabra -> El usuario investiga por su cuenta.

> **Filosofía:** La aplicación no pretende enseñar directamente, sino despertar la curiosidad del usuario por descubrir significados.

## 2. 🧩 MVP (Minimum Viable Product)
El alcance inicial será controlado, sin features complejos como login o bases de datos relacionales en la primera fase.

**Pantalla principal requerida:**
*   Logo/Nombre "Meraki"
*   Pequeña frase de bienvenida ("Discover something new.")
*   **Word Reel** (La ruleta vertical de palabras)
*   Botón "Discover" / "Discover Again"
*   Palabra seleccionada (mostrada al detenerse el Reel)

## 3. 🏗️ Arquitectura y Stack Tecnológico
Un stack moderno, rápido y basado en JS/TS para mantenerlo simple.

*   **Frontend:** React + Vite + TypeScript + Tailwind CSS
*   **Backend:** Node.js + Express + TypeScript
*   **Datos (MVP):** Archivo estático `words.json`

## 4. 🔌 API REST (Backend)
El backend será muy minimalista para el MVP.

*   `GET /api/words` - Obtener todas las palabras
*   `GET /api/words/random` - Obtener una palabra aleatoria (Retorna ID, palabra, lenguaje, categoría)
*   `GET /api/words/:id` - Obtener palabra específica

*(Nota: La API NO devolverá el significado para cumplir con la regla principal de Meraki).*

## 5. 📦 Modelo de Datos
Preparado para una futura migración a Base de Datos (ej. PostgreSQL).

```typescript
interface Word {
  id: number;
  word: string;
  language: string;
  category: string;
  difficulty: "easy" | "medium" | "rare";
}
// Futuro: origin, pronunciation, meaning, etymology
```

## 6. 🗂️ Estructura de Directorios Recomendada
```text
meraki/
├── frontend/
│   ├── src/
│   │   ├── components/ (WordReel.tsx, DiscoverButton.tsx, Logo.tsx)
│   │   ├── services/   (wordService.ts)
│   │   ├── types/      (word.ts)
│   │   ├── pages/      (Home.tsx)
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
│
└── backend/
    ├── src/
    │   ├── controllers/ (word.controller.ts)
    │   ├── routes/      (word.routes.ts)
    │   ├── services/    (word.service.ts)
    │   ├── data/        (words.json)
    │   ├── types/       (word.ts)
    │   └── app.ts
    └── package.json
```