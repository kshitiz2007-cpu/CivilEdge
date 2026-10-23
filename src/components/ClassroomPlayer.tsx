import React, { useState, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  RotateCcw,
  RotateCw,
  Users,
  Radio,
  Send,
  ThumbsUp,
  FileText,
  Bookmark,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  Download,
  Check,
  MessageSquare,
  BookOpen,
  ExternalLink,
  Video,
  Cast,
  Copy,
  Plus,
  Edit3,
  CheckSquare,
  ShieldAlert,
  Share2
} from 'lucide-react';
import {
  BroadcastClass,
  BroadcastSource,
  BroadcastStatus,
  LectureDoubt,
  LectureNote
} from '../types';

function getYouTubeEmbedUrl(url: string): string {
  if (!url) return 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
  if (url.includes('embed/')) {
    return url.includes('autoplay') ? url : `${url}${url.includes('?') ? '&' : '?'}autoplay=1`;
  }
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://www.youtube-nocookie.com/embed/${match[2]}?autoplay=1&rel=0`;
  }
  return url;
}

function getVimeoEmbedUrl(url: string): string {
  if (!url) return 'https://player.vimeo.com/video/76979871?autoplay=1';
  if (url.includes('player.vimeo.com')) return url;
  const match = url.match(/vimeo\.com\/(\d+)/);
  if (match && match[1]) {
    return `https://player.vimeo.com/video/${match[1]}?autoplay=1`;
  }
  return url;
}

interface ClassroomPlayerProps {
  broadcasts: BroadcastClass[];
  activeBroadcastId: string;
  onSelectBroadcast: (id: string) => void;
  onOpenEditModal: () => void;
  onOpenScheduleModal: () => void;
  doubts: LectureDoubt[];
  onAddDoubt: (text: string) => void;
  onUpvoteDoubt: (doubtId: string) => void;
  notes: LectureNote[];
  onAddNote: (timestampSecs: number, formattedTime: string, text: string) => void;
}

export const ClassroomPlayer: React.FC<ClassroomPlayerProps> = ({
  broadcasts,
  activeBroadcastId,
  onSelectBroadcast,
  onOpenEditModal,
  onOpenScheduleModal,
  doubts,
  onAddDoubt,
  onUpvoteDoubt,
  notes,
  onAddNote
}) => {
  const activeBroadcast =
    broadcasts.find((b) => b.id === activeBroadcastId) || broadcasts[0];

  // Video scrubber state
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(525);
  const [duration, setDuration] = useState(activeBroadcast.durationMinutes * 60 || 5400);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [quality, setQuality] = useState<'1080p' | '720p' | 'Audio-only'>('1080p');
  const [isMuted, setIsMuted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Workspace active tab
  const [activeTab, setActiveTab] = useState<'doubts' | 'notes' | 'timetable'>('doubts');
  const [doubtFilter, setDoubtFilter] = useState<'all' | 'answered'>('all');
  const [newDoubtInput, setNewDoubtInput] = useState('');
  const [newNoteInput, setNewNoteInput] = useState('');

  const videoRef = useRef<HTMLVideoElement>(null);

  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = Math.floor(secs % 60);
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const handleJumpToTimestamp = (seconds: number) => {
    setCurrentTime(seconds);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDoubtSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoubtInput.trim()) return;
    onAddDoubt(newDoubtInput.trim());
    setNewDoubtInput('');
  };

  const handleNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteInput.trim()) return;
    onAddNote(currentTime, formatTime(currentTime), newNoteInput.trim());
    setNewNoteInput('');
  };

  const filteredDoubts = doubts.filter((d) =>
    doubtFilter === 'answered' ? d.isAnswered : true
  );

  return (
    <div className="space-y-4">
      {/* ============================================================== */}
      {/* 1. TOP BROADCAST CHANNELS SELECTOR STRIP */}
      {/* ============================================================== */}
      <div className="p-3.5 sm:p-4 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <Radio className="w-4 h-4" />
              Live & Scheduled Class Broadcasting Hub
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenEditModal}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-slate-700"
              title="Edit active broadcast platform, stream link, or syllabus topics"
            >
              <Edit3 className="w-3.5 h-3.5 text-rose-400" />
              <span>⚙️ Manage Broadcast & Class Details</span>
            </button>

            <button
              onClick={onOpenScheduleModal}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Schedule New Broadcast</span>
            </button>
          </div>
        </div>

        {/* Carousel / Channels Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {broadcasts.map((b) => {
            const isSelected = activeBroadcast.id === b.id;
            const isLive = b.status === 'live';

            const sourceIcons: Record<BroadcastSource, string> = {
              youtube: '🔴 YouTube',
              meet: '🟢 Meet',
              zoom: '🔵 Zoom',
              hls: '⚡ HLS Stream',
              vimeo: '🟣 Vimeo',
              custom: '🌐 Custom'
            };

            return (
              <button
                key={b.id}
                onClick={() => onSelectBroadcast(b.id)}
                className={`p-3 rounded-2xl border text-left transition-all shrink-0 w-64 sm:w-72 flex flex-col justify-between gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-rose-500/10 border-rose-500/80 ring-2 ring-rose-500/20 shadow-lg'
                    : 'bg-slate-800/40 border-slate-700/60 hover:border-slate-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {isLive ? (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-rose-600 text-white flex items-center gap-1 animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                        LIVE
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        {b.scheduledTime}
                      </span>
                    )}

                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-indigo-500/20 text-indigo-300 uppercase">
                      {b.subject}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                    {sourceIcons[b.source]}
                  </span>
                </div>

                <div className="space-y-0.5 min-w-0">
                  <h4 className="font-bold text-xs text-white truncate">{b.title}</h4>
                  <p className="text-[11px] text-slate-400 truncate">
                    {b.faculty} • {b.durationMinutes} mins
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. MAIN GRID: DYNAMIC MULTI-SOURCE PLAYER (8 COLS) + WORKSPACE (4 COLS) */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Stage & Details (8 cols) */}
        <div className="lg:col-span-8 flex flex-col space-y-3.5">
          {/* Main Video Stage Frame */}
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex items-center justify-center">
            {/* Top Status Overlay Badge Bar */}
            <div className="absolute top-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2">
                {activeBroadcast.status === 'live' ? (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600 text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-rose-600/30">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                    <span>STREAMING LIVE</span>
                  </div>
                ) : (
                  <div className="px-3 py-1 rounded-full bg-amber-500/90 text-slate-950 font-black text-xs backdrop-blur-md">
                    SCHEDULED: {activeBroadcast.scheduledDate} at {activeBroadcast.scheduledTime}
                  </div>
                )}

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-slate-200 text-xs font-medium border border-white/10">
                  <Users className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{(activeBroadcast.viewersCount || 3420).toLocaleString()} Aspirants</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold border border-white/10 uppercase">
                  Source: {activeBroadcast.source}
                </span>
              </div>
            </div>

            {/* DYNAMIC PLAYER SWITCHER */}
            {activeBroadcast.source === 'youtube' ? (
              /* YouTube Live Stream Player */
              <iframe
                className="w-full h-full"
                src={getYouTubeEmbedUrl(activeBroadcast.streamUrl)}
                title={activeBroadcast.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : activeBroadcast.source === 'meet' ? (
              /* Google Meet Interactive Video Room Card */
              <div className="relative w-full h-full bg-gradient-to-br from-emerald-950/90 via-slate-900 to-slate-950 p-6 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shadow-xl shadow-emerald-500/10">
                  <Video className="w-8 h-8" />
                </div>

                <div className="max-w-md space-y-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                    Interactive Video Classroom (Google Meet)
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {activeBroadcast.title}
                  </h3>
                  <p className="text-xs text-slate-300">
                    Faculty: <strong>{activeBroadcast.faculty}</strong> ({activeBroadcast.facultyDesignation})
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={activeBroadcast.streamUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Video className="w-4 h-4" />
                    <span>Join Google Meet Room Now</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => copyToClipboard(activeBroadcast.streamUrl)}
                    className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    {copiedLink ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedLink ? 'Link Copied!' : 'Copy Room Link'}</span>
                  </button>
                </div>

                <p className="text-[11px] text-slate-400 max-w-sm">
                  Screen share, unmute for queries, and camera feed supported. Real-time doubts post directly to this workspace.
                </p>
              </div>
            ) : activeBroadcast.source === 'zoom' ? (
              /* Zoom Webinar Hub Card */
              <div className="relative w-full h-full bg-gradient-to-br from-sky-950/90 via-slate-900 to-slate-950 p-6 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center shadow-xl shadow-sky-500/10">
                  <Cast className="w-8 h-8" />
                </div>

                <div className="max-w-md space-y-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30 uppercase tracking-wider">
                    Zoom Webinar & Breakout Session
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {activeBroadcast.title}
                  </h3>
                  <p className="text-xs text-slate-300">
                    Faculty: <strong>{activeBroadcast.faculty}</strong>
                  </p>
                </div>

                {(activeBroadcast.meetingId || activeBroadcast.meetingPassword) && (
                  <div className="flex items-center gap-3 bg-black/40 border border-white/10 px-4 py-2 rounded-2xl font-mono text-xs text-slate-200">
                    {activeBroadcast.meetingId && (
                      <span>Meeting ID: <strong>{activeBroadcast.meetingId}</strong></span>
                    )}
                    {activeBroadcast.meetingPassword && (
                      <span>{activeBroadcast.meetingPassword}</span>
                    )}
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={activeBroadcast.streamUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-sky-600/30 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Launch Zoom Webinar / Client</span>
                  </a>

                  <button
                    onClick={() => copyToClipboard(activeBroadcast.streamUrl)}
                    className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedLink ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedLink ? 'Copied!' : 'Copy Meeting Link'}</span>
                  </button>
                </div>
              </div>
            ) : activeBroadcast.source === 'vimeo' ? (
              /* Vimeo Player Embed */
              <iframe
                className="w-full h-full"
                src={getVimeoEmbedUrl(activeBroadcast.streamUrl)}
                title={activeBroadcast.title}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : (
              /* HLS / Native Video Player */
              <div className="relative w-full h-full bg-slate-900 flex items-center justify-center">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  playsInline
                  controls
                />
              </div>
            )}

            {/* Custom Control Scrubber (for video streams) */}
            {activeBroadcast.source !== 'meet' && activeBroadcast.source !== 'zoom' && (
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4 z-20 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={0}
                    max={duration}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-rose-500 hover:h-2 transition-all"
                  />
                </div>

                <div className="flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1 text-white hover:text-rose-400 transition-colors cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </button>
                    <span className="font-mono text-[11px] text-slate-300">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <select
                      value={quality}
                      onChange={(e) => setQuality(e.target.value as any)}
                      className="bg-white/10 text-[11px] font-mono px-2 py-1 rounded-md text-white border-none cursor-pointer"
                    >
                      <option value="1080p" className="bg-slate-900">1080p HD</option>
                      <option value="720p" className="bg-slate-900">720p</option>
                      <option value="Audio-only" className="bg-slate-900">Audio Only</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Granular Class Details Strip under Player */}
          <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase">
                    {activeBroadcast.subject}
                  </span>
                  <span className="text-xs text-slate-400">
                    Duration: <strong>{activeBroadcast.durationMinutes} Minutes</strong>
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {activeBroadcast.title}
                </h3>
                <p className="text-xs text-slate-400">
                  Conducted by <strong className="text-slate-200">{activeBroadcast.faculty}</strong> ({activeBroadcast.facultyDesignation || 'Senior UPSC Mentor'})
                </p>
              </div>

              {/* Handout Download Button */}
              {activeBroadcast.handoutUrl && (
                <a
                  href={activeBroadcast.handoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-2xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-indigo-400" />
                  <span>Download Crux Handout</span>
                </a>
              )}
            </div>

            {/* Description */}
            {activeBroadcast.description && (
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeBroadcast.description}
              </p>
            )}

            {/* Syllabus Subtopics Covered */}
            {activeBroadcast.topicsCovered && activeBroadcast.topicsCovered.length > 0 && (
              <div className="pt-2.5 border-t border-slate-800 space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                  Syllabus Concepts Covered in this Class:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeBroadcast.topicsCovered.map((topic, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700/80"
                    >
                      ✓ {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Synchronized Workspace (4 cols) */}
        <div className="lg:col-span-4 flex flex-col h-[620px] rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden">
          {/* Workspace Tabs Header */}
          <div className="flex items-center border-b border-slate-800 p-1.5 bg-slate-950/50">
            <button
              onClick={() => setActiveTab('doubts')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'doubts'
                  ? 'bg-slate-800 text-rose-400 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Live Doubts</span>
              <span className="text-[10px] font-mono bg-rose-500/20 text-rose-300 px-1.5 rounded-full">
                {doubts.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('notes')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'notes'
                  ? 'bg-slate-800 text-emerald-400 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Notes</span>
              <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-1.5 rounded-full">
                {notes.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('timetable')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'timetable'
                  ? 'bg-slate-800 text-amber-400 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Timetable</span>
            </button>
          </div>

          {/* TAB 1: LIVE DOUBTS */}
          {activeTab === 'doubts' && (
            <div className="flex-1 flex flex-col justify-between p-3.5 overflow-hidden">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px]">
                <div className="flex items-center gap-1 text-slate-400">
                  <span className="font-semibold">Filter:</span>
                  <button
                    onClick={() => setDoubtFilter('all')}
                    className={`px-2 py-0.5 rounded cursor-pointer ${
                      doubtFilter === 'all'
                        ? 'bg-rose-500/20 text-rose-300 font-bold'
                        : 'text-slate-400'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setDoubtFilter('answered')}
                    className={`px-2 py-0.5 rounded cursor-pointer ${
                      doubtFilter === 'answered'
                        ? 'bg-rose-500/20 text-rose-300 font-bold'
                        : 'text-slate-400'
                    }`}
                  >
                    Faculty Replies
                  </button>
                </div>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Faculty Active
                </span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2.5 py-2 pr-1">
                {filteredDoubts.map((doubt) => (
                  <div
                    key={doubt.id}
                    className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={doubt.avatar}
                          alt={doubt.user}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span className="font-bold text-slate-200 text-[11px]">
                          {doubt.user}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">{doubt.timeAgo}</span>
                    </div>

                    <p className="text-slate-200 leading-snug">{doubt.query}</p>

                    {doubt.facultyReply && (
                      <div className="p-2.5 rounded-xl bg-indigo-950/60 border border-indigo-800/60 text-[11px] space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-indigo-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Faculty Answer:</span>
                        </div>
                        <p className="leading-relaxed text-slate-200">{doubt.facultyReply}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1 border-t border-slate-700/50 text-[11px]">
                      <button
                        onClick={() => onUpvoteDoubt(doubt.id)}
                        className={`flex items-center gap-1 font-semibold transition-colors cursor-pointer ${
                          doubt.userUpvoted
                            ? 'text-rose-400'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <ThumbsUp
                          className={`w-3.5 h-3.5 ${
                            doubt.userUpvoted ? 'fill-rose-400 text-rose-400' : ''
                          }`}
                        />
                        <span>{doubt.upvotes} Upvotes</span>
                      </button>

                      {doubt.isAnswered ? (
                        <span className="text-emerald-400 font-semibold flex items-center gap-1 text-[10px]">
                          <CheckCircle2 className="w-3 h-3" /> Answered
                        </span>
                      ) : (
                        <span className="text-amber-400 text-[10px] font-medium">
                          In Queue
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleDoubtSubmit} className="pt-2 border-t border-slate-800">
                <div className="relative">
                  <input
                    type="text"
                    value={newDoubtInput}
                    onChange={(e) => setNewDoubtInput(e.target.value)}
                    placeholder={`Ask ${activeBroadcast.faculty} a doubt...`}
                    className="w-full pl-3 pr-10 py-2.5 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  <button
                    type="submit"
                    disabled={!newDoubtInput.trim()}
                    className="absolute right-1.5 top-1.5 p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-500 disabled:opacity-40 transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: SYNCHRONIZED NOTES */}
          {activeTab === 'notes' && (
            <div className="flex-1 flex flex-col justify-between p-3.5 overflow-hidden">
              <form onSubmit={handleNoteSubmit} className="space-y-2 mb-3">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-300">Timestamped Note:</span>
                  <span className="font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Current: {formatTime(currentTime)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newNoteInput}
                    onChange={(e) => setNewNoteInput(e.target.value)}
                    placeholder="Capture key constitutional point discussed..."
                    className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="submit"
                    disabled={!newNoteInput.trim()}
                    className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 disabled:opacity-40 transition-colors shrink-0 cursor-pointer"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>Save</span>
                  </button>
                </div>
              </form>

              <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/60 text-xs space-y-1 hover:border-emerald-500/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleJumpToTimestamp(note.timestampSeconds)}
                        className="font-mono font-bold text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Clock className="w-3 h-3" />
                        <span>@{note.formattedTime}</span>
                      </button>
                      <span className="text-[10px] text-slate-400">{note.createdAt}</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed text-[11px]">{note.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TIMETABLE & OTHER BROADCASTS */}
          {activeTab === 'timetable' && (
            <div className="flex-1 p-3.5 overflow-y-auto space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
                <span className="font-bold text-white">Broadcast Timetable</span>
                <span className="text-[11px] text-slate-400">{broadcasts.length} Classes</span>
              </div>

              {broadcasts.map((b) => {
                const isCurrent = b.id === activeBroadcast.id;
                return (
                  <button
                    key={b.id}
                    onClick={() => onSelectBroadcast(b.id)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-rose-500/15 border-rose-500 ring-1 ring-rose-500/30'
                        : 'bg-slate-800/40 border-slate-700/60 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-xs font-bold ${
                          isCurrent ? 'text-rose-400' : 'text-slate-200'
                        }`}
                      >
                        {b.title}
                      </span>
                      <span className="text-[10px] font-mono uppercase bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">
                        {b.source}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {b.faculty} • {b.scheduledDate} ({b.scheduledTime})
                    </p>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
