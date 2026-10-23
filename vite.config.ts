import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

function zipDownloadPlugin(): Plugin {
  return {
    name: 'vite-plugin-zip-download',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/api/download-zip') {
          const zipPath = path.resolve(__dirname, 'public/civiledge-ias-source-code.zip');
          if (fs.existsSync(zipPath)) {
            const stat = fs.statSync(zipPath);
            res.setHeader('Content-Type', 'application/zip');
            res.setHeader('Content-Disposition', 'attachment; filename="civiledge-ias-source-code.zip"');
            res.setHeader('Content-Length', stat.size);
            const stream = fs.createReadStream(zipPath);
            stream.pipe(res);
            return;
          }
        }
        next();
      });
    }
  };
}

export default defineConfig(() => {
  const port = Number(process.env.PORT) || 3000;

  return {
    plugins: [react(), tailwindcss(), zipDownloadPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    preview: {
      port,
      host: '0.0.0.0',
    }
  };
});
