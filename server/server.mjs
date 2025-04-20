import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'db.json');

// Middleware
app.use(cors());
app.use(express.json());

// API - Obtener vídeos
app.get('/api/videos', async (req, res) => {
    const data = await fs.readFile(dbPath, 'utf-8');
    const parsed = JSON.parse(data);
    res.json(parsed.videos);
});

// API - Añadir vídeo
app.post('/api/videos', async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL es requerida' });

    const data = JSON.parse(await fs.readFile(dbPath, 'utf-8'));
    const newVideo = {
        id: Math.random().toString(36).substring(2, 6),
        url
    };

    data.videos.push(newVideo);
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2));

    res.status(201).json(newVideo);
});

// 🔽 Servir frontend (React compilado con Vite)
const clientBuildPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientBuildPath));

// Todas las rutas no API van al index.html de React
app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// Arrancar servidor
app.listen(PORT, () => {
    console.log(`🚀 Backend escuchando en http://localhost:${PORT}`);
});
