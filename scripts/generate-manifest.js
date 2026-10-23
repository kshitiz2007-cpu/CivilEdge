import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import JSZip from 'jszip';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const ignoreList = [
  'node_modules',
  '.git',
  'dist',
  '.aistudio',
  'bun.lock',
  'public/civiledge-ias-source-code.zip',
  'src/data/sourceCodeManifest.ts' // generated
];

function getCategory(filePath) {
  if (filePath.includes('components/')) return 'component';
  if (filePath.includes('types/')) return 'types';
  if (filePath.includes('data/')) return 'data';
  if (filePath.endsWith('.json') || filePath.includes('config') || filePath.startsWith('.')) return 'config';
  if (filePath.endsWith('.css')) return 'style';
  if (filePath.endsWith('.md') || filePath.endsWith('.html')) return 'docs';
  return 'core';
}

function collectFiles(dir) {
  const results = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const relPath = path.relative(rootDir, fullPath);

    if (ignoreList.some(ig => relPath === ig || relPath.startsWith(ig + path.sep))) {
      continue;
    }

    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results.push(...collectFiles(fullPath));
    } else {
      results.push({
        path: relPath.replace(/\\/g, '/'),
        fullPath
      });
    }
  }
  return results;
}

async function main() {
  console.log('Collecting project files from:', rootDir);
  const files = collectFiles(rootDir);
  console.log(`Found ${files.length} project files.`);

  const projectItems = [];
  const zip = new JSZip();
  const folder = zip.folder('civiledge-ias-app') || zip;

  for (const f of files) {
    const content = fs.readFileSync(f.fullPath, 'utf8');
    const ext = path.extname(f.path).replace('.', '') || 'txt';
    const name = path.basename(f.path);
    const sizeBytes = Buffer.byteLength(content, 'utf8');

    projectItems.push({
      path: f.path,
      name,
      category: getCategory(f.path),
      extension: ext,
      sizeBytes,
      content
    });

    folder.file(f.path, content);
  }

  // Ensure public directory exists
  const publicDir = path.join(rootDir, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Write pre-bundled zip to public/civiledge-ias-source-code.zip
  const zipBuffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 }
  });
  const zipPath = path.join(publicDir, 'civiledge-ias-source-code.zip');
  fs.writeFileSync(zipPath, zipBuffer);
  console.log(`Created pre-bundled ZIP at: ${zipPath} (${(zipBuffer.length / 1024).toFixed(1)} KB)`);

  // Write src/data/sourceCodeManifest.ts
  const manifestTs = `// AUTO-GENERATED SOURCE CODE MANIFEST
// Provides instant client-side ZIP generation and file inspection
import { ProjectFileItem } from '../types';

export const sourceCodeManifest: ProjectFileItem[] = ${JSON.stringify(projectItems, null, 2)};
`;

  const manifestPath = path.join(rootDir, 'src', 'data', 'sourceCodeManifest.ts');
  fs.writeFileSync(manifestPath, manifestTs, 'utf8');
  console.log(`Generated manifest at: ${manifestPath}`);
}

main().catch(err => {
  console.error('Error bundling manifest:', err);
  process.exit(1);
});
