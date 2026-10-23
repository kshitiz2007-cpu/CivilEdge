import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import JSZip from 'jszip';
import { defaultAppData } from './src/lib/dataRepository';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }
  next();
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'CivilEdge IAS • DrishtiNova',
    timestamp: new Date().toISOString(),
    database: 'ready-for-prisma-or-postgres-connection',
  });
});

app.get('/api/app-data', (_, res) => {
  res.json(defaultAppData);
});

app.get('/api/broadcasts', (_, res) => {
  res.json(defaultAppData.broadcasts);
});

app.get('/api/doubts', (_, res) => {
  res.json(defaultAppData.doubts);
});

app.get('/api/notes', (_, res) => {
  res.json(defaultAppData.notes);
});

app.get('/api/handouts', (_, res) => {
  res.json(defaultAppData.handouts);
});

function collectFiles(dirPath: string, rootDir: string, fileList: { path: string; fullPath: string }[] = []) {
  const items = fs.readdirSync(dirPath);
  for (const item of items) {
    if (
      item === 'node_modules' ||
      item === '.git' ||
      item === 'dist' ||
      item === '.aistudio' ||
      item === '.cache' ||
      item.endsWith('.zip')
    ) {
      continue;
    }

    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      collectFiles(fullPath, rootDir, fileList);
    } else {
      const relativePath = path.relative(rootDir, fullPath);
      fileList.push({ path: relativePath, fullPath });
    }
  }
  return fileList;
}

app.get('/api/download-zip', async (req, res) => {
  try {
    const rootDir = __dirname;
    const files = collectFiles(rootDir, rootDir);
    const zip = new JSZip();
    const folder = zip.folder('civiledge-ias-app') || zip;

    for (const f of files) {
      const content = fs.readFileSync(f.fullPath);
      folder.file(f.path, content);
    }

    const buffer = await zip.generateAsync({
      type: 'nodebuffer',
      compression: 'DEFLATE',
      compressionOptions: { level: 9 }
    });

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="civiledge-ias-source-code.zip"');
    res.setHeader('Content-Length', buffer.length);
    res.send(buffer);
  } catch (error) {
    console.error('Failed to create server zip:', error);
    res.status(500).json({ error: 'Failed to generate source code zip file' });
  }
});

const distPath = path.resolve(__dirname, 'dist');
const publicPath = path.resolve(__dirname, 'public');

if (fs.existsSync(publicPath)) {
  app.use(express.static(publicPath));
}

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.get('*', (req, res) => {
    res.status(200).send(`
      <!doctype html>
      <html>
        <head><title>CivilEdge IAS • DrishtiNova</title></head>
        <body style="font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #020617; color: #f8fafc;">
          <div style="text-align: center; max-width: 500px; padding: 2rem;">
            <h1 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: #f43f5e;">CivilEdge IAS Server Active</h1>
            <p style="color: #94a3b8; font-size: 0.875rem;">Run <code>npm run build</code> to produce production assets, or <code>npm run dev</code> for development mode.</p>
            <p style="margin-top: 1rem;"><a href="/api/download-zip" style="color: #6366f1; text-decoration: underline;">Download Complete Code (.zip)</a></p>
          </div>
        </body>
      </html>
    `);
  });
}

app.listen(port, '0.0.0.0', () => {
  console.log(`[CivilEdge IAS] Server listening on http://0.0.0.0:${port}`);
});
