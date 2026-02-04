import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { readdirSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use('/assets', express.static(join(ROOT_DIR, 'assets')));

const ASSET_FOLDERS = ['backgrounds', 'characters', 'objects', 'events', 'music', 'sounds'];

const ensureAssetFolders = () => {
  const assetsPath = join(ROOT_DIR, 'assets');
  if (!existsSync(assetsPath)) {
    mkdirSync(assetsPath);
  }
  ASSET_FOLDERS.forEach(folder => {
    const folderPath = join(assetsPath, folder);
    if (!existsSync(folderPath)) {
      mkdirSync(folderPath);
    }
  });
};

const scanAssets = () => {
  const assets = {};
  const assetsPath = join(ROOT_DIR, 'assets');

  ASSET_FOLDERS.forEach(folder => {
    const folderPath = join(assetsPath, folder);
    try {
      const files = readdirSync(folderPath).filter(file => !file.startsWith('.'));
      assets[folder] = files.map(file => ({
        name: file,
        path: `/assets/${folder}/${file}`
      }));
    } catch (error) {
      assets[folder] = [];
    }
  });

  return assets;
};

ensureAssetFolders();

app.get('/api/assets', (req, res) => {
  const assets = scanAssets();
  res.json(assets);
});

let currentScene = {
  background: null,
  characters: [],
  objects: [],
  event: null,
  blackout: false,
  music: { src: null, volume: 0.5, playing: false },
  sound: null
};

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.emit('assets', scanAssets());
  socket.emit('scene_sync', currentScene);

  socket.on('update_scene', (sceneUpdate) => {
    currentScene = { ...currentScene, ...sceneUpdate };
    socket.broadcast.emit('scene_update', currentScene);
  });

  socket.on('play_sound', (sound) => {
    socket.broadcast.emit('play_sound', sound);
  });

  socket.on('request_assets', () => {
    socket.emit('assets', scanAssets());
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
