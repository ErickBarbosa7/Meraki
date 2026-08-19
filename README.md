# ✨ Meraki

> *「Meraki (μεράκι) - hacer algo con el alma, la creatividad y el amor que dejas en ello」*

**Descubre palabras inusuales del mundo.** Entra, gira el reel y deja que una palabra se detenga frente a ti. No te explicamos nada: investiga por tu cuenta.

## 🎯 La regla de oro

Meraki **nunca explica** una palabra. Expone la palabra, su idioma de origen y su categoría — y nada más. La fricción de pensar *"a ver… ¿qué significa esto?"* y buscarlo es el corazón de la experiencia.

## ✨ Features

- 🎰 **Word Reel** — ruleta vertical con efecto slot machine (blur, desaceleración ease-out y aterrizaje con escala).
- 🔍 **Discover / Discover Again** — obtener una palabra aleatoria de la API.
- 📋 **Copiar palabra** con feedback visual.
- ⌨️ **Tecla Espacio** para girar.
- 🌗 **Dark mode** (respeta el sistema o se elige manualmente, persiste en `localStorage`).
- 📱 **Responsive**, mobile first.
- 🧩 Stack moderno: React + Vite + Tailwind v4 · Node + Express + TypeScript.

## 🚀 Empezar

```bash
npm install        # raíz (workspaces: frontend + backend)
npm run dev        # levanta backend (:4000) y frontend (:5173)
```

Abre **http://localhost:5173**.

## 🗂️ Estructura

```text
meraki/
├── frontend/          # React + Vite + Tailwind CSS v4
│   └── src/
│       ├── components/   # Logo, WordReel, DiscoverButton, DarkModeToggle
│       ├── services/     # wordService.ts (fetch a /api)
│       ├── types/        # word.ts
│       └── pages/        # Home.tsx
└── backend/           # Node + Express + TypeScript
    └── src/
        ├── controllers/  # word.controller.ts
        ├── routes/       # word.routes.ts
        ├── services/     # word.service.ts
        ├── data/         # words.json (60 palabras iniciales)
        └── types/        # word.ts
```

## 🔌 API

| Método | Ruta             | Descripción                       |
| ------ | ---------------- | --------------------------------- |
| GET    | `/api/words`     | Todas las palabras                |
| GET    | `/api/words/random` | Una palabra aleatoria          |
| GET    | `/api/words/:id` | Palabra específica                 |

*La API no devuelve significados (regla de oro).*

## 📸 Capturas

*(Agrega capturas de pantalla en `screenshots/` y referencia aquí.)*

## 🔮 Roadmap

- Historial de palabras descubiertas (local).
- Favoritos ("Save this word").
- Filtros por categoría.
- Palabra del día.
- Shareable assets para redes sociales.

## 📄 Documentación

- [Diseño y sistema de UI/UX](diseno.md)
- [Fases de desarrollo](fases.md)