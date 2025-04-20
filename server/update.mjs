import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener ruta absoluta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta a db.json
const dbPath = path.join(__dirname, 'db.json');

// URL pasada como argumento por consola
const inputUrl = process.argv[2];

if (!inputUrl) {
    console.error('❌ Debes proporcionar una URL. Ejemplo:');
    console.error('   pnpm --filter backend run add "https://www.youtube.com/watch?v=xyz123"');
    process.exit(1);
}

// Crear nuevo vídeo
const newVideo = {
    id: Math.random().toString(36).substring(2, 6),
    url: inputUrl
};

try {
    // Leer y parsear el JSON existente
    const fileContent = await fs.readFile(dbPath, 'utf-8');
    const data = JSON.parse(fileContent);

    // Añadir el nuevo vídeo
    data.videos.push(newVideo);

    // Guardar de nuevo el archivo
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2));

    console.log('✅ URL añadida con éxito:', newVideo);
} catch (error) {
    console.error('❌ Error actualizando db.json:', error);
    process.exit(1);
}
