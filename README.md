# React + Vite
//Run server JSON en local 
<br/>
npx json-server --watch db.json --port 3001

<p align="center">
  <img src="/client/public/musicYou-logo-back-dark.svg" width="100" alt="musicYou Logo" />
</p>
<hr/>
<p align="center">
<img src="/client/src/assets/CapturaMusicYou.png" width="1000" alt="musicYou Web"/>
</p>

<h1 align="center">🎧 musicYou</h1>


<p align="center">
  Guarda enlaces de YouTube, crea listas y reprodúcelas directamente desde la web.
</p>

<p align="center">
  <img src="https://img.shields.io/github/license/tuusuario/musicYou" alt="Licencia" />
  <img src="https://img.shields.io/badge/React-2025-blue?logo=react" />
  <img src="https://img.shields.io/badge/Render-Deploy-success?logo=render" />
</p>

<hr>

## ✨ Características

- 🎵 Añade enlaces de YouTube
- 📺 Reproduce las listas directamente en la web
- 📁 Guarda los datos en un JSON local (`db.json`)
- 🔄 API REST para manipular las URLs
- 🚀 Compatible con despliegue en Render
- 🧱 Arquitectura modular con ES Modules (`.mjs`)

<hr>

## 🧩 Estructura del proyecto

musicYou/ ├── client/ → Aplicación React (frontend) ├── server/ → Servidor Node + Express (backend) │ ├── db.json → "Base de datos" local │ ├── update.mjs → Script CLI para añadir vídeos │ └── server.mjs → API REST ├── package.json → Configuración raíz ├── .gitignore └── README.md → Este documento

markdown
Copiar
Editar

<hr>

## 🚀 Instalación

### 🔧 Requisitos

- Node.js ≥ 16
- pnpm:
  ```bash
  npm install -g pnpm
📦 Instalar dependencias
bash
Copiar
Editar
pnpm install
<hr>
💻 Uso en desarrollo
▶️ Frontend
bash
Copiar
Editar
pnpm --filter client run dev
🛠 Backend (API)
bash
Copiar
Editar
pnpm --filter backend run start
🔁 Ambos a la vez (si tienes script combinado)
bash
Copiar
Editar
pnpm start
<hr>
📡 Endpoints API
Obtener vídeos guardados
http
Copiar
Editar
GET /api/videos
Añadir un nuevo vídeo
http
Copiar
Editar
POST /api/videos

Body JSON:
{
  "url": "https://www.youtube.com/watch?v=XXXXXXX"
}
<hr>
🧪 Añadir vídeos desde terminal (opcional)
bash
Copiar
Editar
pnpm --filter backend run add "https://www.youtube.com/watch?v=tu-video"
<hr>
☁️ Despliegue en Render
Sube el repositorio a GitHub

Entra en Render

Crea un Web Service:

⚙️ Configuración:
Build Command:

bash
Copiar
Editar
pnpm install && pnpm --filter client run build
Start Command:

bash
Copiar
Editar
pnpm --filter backend run start
Render compilará el frontend y lanzará el backend desde server.mjs.

<hr>
📄 Licencia
MIT © 2025 – musicYou
¡Visita nuestro proyecto en GitHub!

<p align="center"> Hecho con ❤️, Node.js y React 🎶 </p> ```
