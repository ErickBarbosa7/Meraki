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

## 🚢 Desplegar

La app se divide en **API (backend)** y **frontend**. Se recomienda: backend en **Render**, frontend en **Vercel**.

### 1. Backend → Render

1. Entra a [Render](https://render.com) → **New → Blueprint** y conecta el repo (o configura un Web Service manual con `render.yaml` como guía).
2. Verifica los valores de `render.yaml`:
   - `buildCommand`: `npm ci && npm run build -w meraki-backend`
   - `startCommand`: `npm run start -w meraki-backend`
3. Render inyecta `PORT` automáticamente (el código usa `process.env.PORT ?? 4000`).
4. Copia la URL resultante (ej. `https://meraki-api.onrender.com`).

### 2. Frontend → Vercel

1. Importa el repo en [Vercel](https://vercel.com). La config viene en `vercel.json` (framework Vite, `outputDirectory` en `frontend/dist`).
2. Agrega la variable de entorno de la API (solo el origen, **sin** `/api`):

   | Variable          | valor                           |
   | ----------------- | ------------------------------- |
   | `VITE_API_URL`    | `https://tu-api.onrender.com`   |

3. Build manual de prueba: `npm run build`.

> Nota: el frontend arma la URL automáticamente (`VITE_API_URL + "/api"`); si no está definida, usa `/api` en el mismo origen. Tolerante si incluyes `/api` al final. El CORS del backend está abierto a propósito.

### 3. Verificación

- `curl https://tu-api.onrender.com/api/words/random` debe devolver una palabra.
- Abre la URL de Vercel → la ruleta debe girar y descubrir palabras.

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