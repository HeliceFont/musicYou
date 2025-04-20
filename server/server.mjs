import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());

app.get('/api/videos', async (req, res) => {
    const data = await fs.readFile(dbPath, 'utf-8');
    const parsed = JSON.parse(data);
    res.json(parsed.videos);
});

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

app.listen(PORT, () => {
    console.log(`🚀 Backend escuchando en http://localhost:${PORT}`);
});
