import JSZip from 'jszip';

export interface FileToZip {
  path: string;
  content: string;
}

/**
 * Compiles a list of files into a standard compressed .zip file and triggers
 * an immediate client-side browser download.
 */
export async function downloadProjectAsZip(
  files: FileToZip[],
  zipFilename: string = 'civiledge-ias-source-code.zip',
  onProgress?: (percent: number, currentFile: string) => void
): Promise<Blob> {
  const zip = new JSZip();

  // Root directory folder name inside the zip for cleanliness
  const rootFolder = zip.folder('civiledge-ias-app') || zip;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const cleanPath = file.path.startsWith('/') ? file.path.slice(1) : file.path;
    rootFolder.file(cleanPath, file.content);

    if (onProgress) {
      const pct = Math.round(((i + 1) / files.length) * 50);
      onProgress(pct, cleanPath);
    }
  }

  // Generate the zip blob with high DEFLATE compression
  const blob = await zip.generateAsync(
    {
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 9 }
    },
    (metadata) => {
      if (onProgress) {
        const totalPct = 50 + Math.round(metadata.percent / 2);
        onProgress(totalPct, metadata.currentFile || 'Compressing archive...');
      }
    }
  );

  // Trigger download using native browser blob URL
  const downloadUrl = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = downloadUrl;
  anchor.download = zipFilename;
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  // Clean up memory
  setTimeout(() => {
    URL.revokeObjectURL(downloadUrl);
  }, 15000);

  return blob;
}
