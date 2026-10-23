import React, { useState } from 'react';
import {
  X,
  Download,
  FolderArchive,
  FileCode,
  FileText,
  Check,
  Copy,
  Terminal,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { ProjectFileItem } from '../types';
import { downloadProjectAsZip } from '../utils/zipGenerator';

interface DownloadCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  files: ProjectFileItem[];
}

export const DownloadCodeModal: React.FC<DownloadCodeModalProps> = ({
  isOpen,
  onClose,
  files
}) => {
  const [selectedFile, setSelectedFile] = useState<ProjectFileItem>(
    files.find((f) => f.path.includes('App.tsx')) || files[0]
  );
  const [isZipping, setIsZipping] = useState(false);
  const [zipProgress, setZipProgress] = useState(0);
  const [currentZipStep, setCurrentZipStep] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen) return null;

  const handleDownloadZip = async () => {
    setIsZipping(true);
    setZipProgress(10);
    setCurrentZipStep('Collecting files into archive...');

    try {
      await downloadProjectAsZip(
        files.map((f) => ({ path: f.path, content: f.content })),
        'civiledge-ias-complete-source-code.zip',
        (pct, file) => {
          setZipProgress(pct);
          setCurrentZipStep(`Packing ${file}...`);
        }
      );

      setZipProgress(100);
      setCurrentZipStep('Download initialized!');
      setDownloadSuccess(true);
      setTimeout(() => {
        setIsZipping(false);
        setDownloadSuccess(false);
      }, 3500);
    } catch (err) {
      console.error('Failed to bundle zip:', err);
      setIsZipping(false);
      alert('Could not generate zip archive. Please try direct download.');
    }
  };

  const copyFileContent = () => {
    if (!selectedFile) return;
    navigator.clipboard.writeText(selectedFile.content);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const filteredFiles = files.filter(
    (f) => selectedCategory === 'all' || f.category === selectedCategory
  );

  const totalLines = files.reduce(
    (acc, f) => acc + f.content.split('\n').length,
    0
  );

  const totalBytes = files.reduce((acc, f) => acc + f.sizeBytes, 0);
  const totalKb = (totalBytes / 1024).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-5xl max-h-[94vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/95">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/20">
              <FolderArchive className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg text-white">
                  Export Complete Source Code
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  .ZIP PACKAGE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Full production-ready repository including all components, broadcasters, types & server.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Download Card Strip */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-rose-950/40 via-slate-900 to-amber-950/30 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-rose-400 font-bold uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              <span>Instant Offline ZIP Archive Generator</span>
            </div>
            <h4 className="text-lg sm:text-xl font-extrabold text-white">
              civiledge-ias-complete-source-code.zip
            </h4>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span>
                📁 <strong>{files.length}</strong> Source Files
              </span>
              <span>•</span>
              <span>
                📝 <strong>{totalLines.toLocaleString()}</strong> Lines of Code
              </span>
              <span>•</span>
              <span>
                📦 ~<strong>{totalKb} KB</strong> Uncompressed
              </span>
              <span>•</span>
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> No Node Modules / Pure Clean Source
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
            {/* Primary Browser JSZip Download Action */}
            <button
              onClick={handleDownloadZip}
              disabled={isZipping}
              className={`px-6 py-3.5 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer ${
                downloadSuccess
                  ? 'bg-emerald-600 text-white shadow-emerald-600/30 ring-2 ring-emerald-400'
                  : 'bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white shadow-rose-600/25 hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-5 h-5 animate-bounce" />
                  <span>ZIP Downloaded Successfully!</span>
                </>
              ) : isZipping ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Packing ZIP ({zipProgress}%)...</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span>Download Project as ZIP (.zip)</span>
                </>
              )}
            </button>

            {/* Direct Server Endpoint fallback */}
            <a
              href="/api/download-zip"
              download="civiledge-ias-source-code.zip"
              className="px-4 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all text-center cursor-pointer"
              title="Download via backend Express streaming endpoint"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Direct URL Download</span>
            </a>
          </div>
        </div>

        {/* Progress Bar when Zipping */}
        {isZipping && (
          <div className="px-6 py-2 bg-slate-950/60 border-b border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>{currentZipStep}</span>
              <span className="font-mono text-rose-400 font-bold">{zipProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-200"
                style={{ width: `${zipProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Modal Main Content: Split Code Browser & Setup Guide */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12">
          {/* Left Column: File Tree Selector (4 cols) */}
          <div className="md:col-span-4 border-r border-slate-800 flex flex-col bg-slate-950/40">
            {/* Category Filter Pills */}
            <div className="p-3 border-b border-slate-800 flex items-center gap-1 overflow-x-auto scrollbar-none text-[11px]">
              {[
                { id: 'all', label: 'All Files' },
                { id: 'component', label: 'Components' },
                { id: 'core', label: 'Core App' },
                { id: 'config', label: 'Config' },
                { id: 'docs', label: 'Docs' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-lg font-semibold shrink-0 cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-rose-500 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* File List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredFiles.map((f) => {
                const isSelected = selectedFile?.path === f.path;
                const fileLines = f.content.split('\n').length;
                const fileKb = (f.sizeBytes / 1024).toFixed(1);

                return (
                  <button
                    key={f.path}
                    onClick={() => setSelectedFile(f)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between text-xs cursor-pointer ${
                      isSelected
                        ? 'bg-rose-500/15 border-rose-500/80 text-white font-bold ring-1 ring-rose-500/30'
                        : 'bg-slate-900/50 border-transparent text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <FileCode
                        className={`w-4 h-4 shrink-0 ${
                          isSelected ? 'text-rose-400' : 'text-slate-500'
                        }`}
                      />
                      <span className="truncate font-mono text-[11px]">{f.name}</span>
                    </div>

                    <span className="text-[10px] text-slate-500 font-mono shrink-0">
                      {fileKb} KB
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Code Inspector & Terminal Guide (8 cols) */}
          <div className="md:col-span-8 flex flex-col overflow-hidden bg-slate-950/80">
            {/* File Details & Copy Bar */}
            <div className="px-4 py-2.5 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
              <div className="flex items-center gap-2 font-mono text-xs text-slate-300 truncate">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-rose-400 uppercase">
                  {selectedFile.extension}
                </span>
                <span className="truncate">{selectedFile.path}</span>
                <span className="text-slate-500 text-[11px]">
                  ({selectedFile.content.split('\n').length} lines)
                </span>
              </div>

              <button
                onClick={copyFileContent}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedCode ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedCode ? 'Copied!' : 'Copy File'}</span>
              </button>
            </div>

            {/* Code Content Viewer */}
            <div className="flex-1 overflow-y-auto p-4 font-mono text-xs text-slate-200 leading-relaxed bg-slate-950 select-text">
              <pre className="overflow-x-auto whitespace-pre">
                <code>{selectedFile.content}</code>
              </pre>
            </div>

            {/* Bottom Quick-Start Command Prompt Banner */}
            <div className="p-3 border-t border-slate-800 bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>To run after extracting:</span>
                <code className="px-2 py-0.5 rounded bg-slate-950 font-mono text-emerald-300 font-bold border border-slate-800">
                  npm install && npm run dev
                </code>
              </div>
              <span className="text-[11px] text-slate-500">
                Listens on port 3000 locally
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
