import React, { useState } from 'react';
import {
  initialBroadcastClasses,
  initialDoubts,
  initialNotes,
  initialHandouts
} from './data/mockData';
import { sourceCodeManifest } from './data/sourceCodeManifest';
import { BroadcastClass, LectureDoubt, LectureNote } from './types';
import { Header } from './components/Header';
import { ClassroomPlayer } from './components/ClassroomPlayer';
import { TimetableSection } from './components/TimetableSection';
import { ClassDetailsEditorModal } from './components/ClassDetailsEditorModal';
import { BroadcastSchedulerModal } from './components/BroadcastSchedulerModal';
import { DownloadCodeModal } from './components/DownloadCodeModal';
import {
  Download,
  FolderArchive,
  BookOpen,
  FileText,
  Search,
  CheckCircle2,
  Calendar,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Video
} from 'lucide-react';

export default function App() {
  const [broadcasts, setBroadcasts] = useState<BroadcastClass[]>(initialBroadcastClasses);
  const [activeBroadcastId, setActiveBroadcastId] = useState<string>(
    initialBroadcastClasses.find((b) => b.status === 'live')?.id || initialBroadcastClasses[0].id
  );
  const [activeTab, setActiveTab] = useState<'classroom' | 'timetable' | 'handouts'>('classroom');

  // Modals state
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBroadcast, setEditingBroadcast] = useState<BroadcastClass>(
    broadcasts.find((b) => b.id === activeBroadcastId) || broadcasts[0]
  );

  // Doubts and Notes state
  const [doubts, setDoubts] = useState<LectureDoubt[]>(initialDoubts);
  const [notes, setNotes] = useState<LectureNote[]>(initialNotes);
  const [handoutSearch, setHandoutSearch] = useState('');

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const activeBroadcast =
    broadcasts.find((b) => b.id === activeBroadcastId) || broadcasts[0];

  const liveBroadcast = broadcasts.find((b) => b.status === 'live');

  // Handler for adding a new scheduled class
  const handleScheduleNewClass = (newClass: BroadcastClass) => {
    setBroadcasts([newClass, ...broadcasts]);
    if (newClass.status === 'live') {
      setActiveBroadcastId(newClass.id);
      setActiveTab('classroom');
    }
    showToast(`Scheduled: "${newClass.title.slice(0, 35)}..."`);
  };

  // Handler for updating class details & source
  const handleUpdateClassDetails = (updated: BroadcastClass) => {
    setBroadcasts((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
    showToast(`Updated broadcast details for "${updated.title.slice(0, 30)}..."`);
  };

  // Handler for opening edit modal for specific broadcast
  const handleOpenEditFor = (broadcast: BroadcastClass) => {
    setEditingBroadcast(broadcast);
    setIsEditModalOpen(true);
  };

  // Live Doubt addition
  const handleAddDoubt = (text: string) => {
    const newDoubt: LectureDoubt = {
      id: `doubt-${Date.now()}`,
      user: 'You (Civil Aspirant)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      query: text,
      upvotes: 1,
      isAnswered: false,
      timeAgo: 'Just now',
      userUpvoted: true
    };
    setDoubts([newDoubt, ...doubts]);
    showToast('Your doubt was posted to the faculty stream!');
  };

  // Upvote Doubt
  const handleUpvoteDoubt = (doubtId: string) => {
    setDoubts((prev) =>
      prev.map((d) => {
        if (d.id === doubtId) {
          const upvoted = d.userUpvoted;
          return {
            ...d,
            upvotes: upvoted ? d.upvotes - 1 : d.upvotes + 1,
            userUpvoted: !upvoted
          };
        }
        return d;
      })
    );
  };

  // Save Timestamped Note
  const handleAddNote = (timestampSecs: number, formattedTime: string, text: string) => {
    const newNote: LectureNote = {
      id: `note-${Date.now()}`,
      timestampSeconds: timestampSecs,
      formattedTime,
      text,
      createdAt: 'Just now'
    };
    setNotes([newNote, ...notes]);
    showToast(`Note saved at @${formattedTime}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="px-4 py-3 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl text-xs font-bold text-white flex items-center gap-2 ring-1 ring-white/10">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        liveBroadcast={liveBroadcast}
        onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
        onOpenScheduleModal={() => setIsScheduleModalOpen(true)}
        onSelectBroadcast={(id) => {
          setActiveBroadcastId(id);
          setActiveTab('classroom');
        }}
      />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
        {/* TAB 1: LIVE CLASSROOM */}
        {activeTab === 'classroom' && (
          <ClassroomPlayer
            broadcasts={broadcasts}
            activeBroadcastId={activeBroadcastId}
            onSelectBroadcast={(id) => setActiveBroadcastId(id)}
            onOpenEditModal={() => handleOpenEditFor(activeBroadcast)}
            onOpenScheduleModal={() => setIsScheduleModalOpen(true)}
            doubts={doubts}
            onAddDoubt={handleAddDoubt}
            onUpvoteDoubt={handleUpvoteDoubt}
            notes={notes}
            onAddNote={handleAddNote}
          />
        )}

        {/* TAB 2: TIMETABLE & SCHEDULE */}
        {activeTab === 'timetable' && (
          <TimetableSection
            broadcasts={broadcasts}
            onSelectBroadcast={(id) => {
              setActiveBroadcastId(id);
              setActiveTab('classroom');
            }}
            onOpenEditModal={(b) => handleOpenEditFor(b)}
            onOpenScheduleModal={() => setIsScheduleModalOpen(true)}
          />
        )}

        {/* TAB 3: LECTURE CRUX HANDOUTS */}
        {activeTab === 'handouts' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                    Faculty Lecture Crux Handouts
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white">Downloadable UPSC Reference Notes</h2>
                <p className="text-xs text-slate-400">
                  Comprehensive case-law compendiums, economic charts, and answer framework PDFs.
                </p>
              </div>

              {/* Handout Search */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={handoutSearch}
                  onChange={(e) => setHandoutSearch(e.target.value)}
                  placeholder="Search handouts by topic..."
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-2xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Handouts Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {initialHandouts
                .filter(
                  (h) =>
                    !handoutSearch ||
                    h.title.toLowerCase().includes(handoutSearch.toLowerCase()) ||
                    h.summary.toLowerCase().includes(handoutSearch.toLowerCase())
                )
                .map((h) => (
                  <div
                    key={h.id}
                    className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col justify-between gap-4"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase">
                          {h.subject}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {h.pages} Pages • {h.size}
                        </span>
                      </div>

                      <h3 className="font-bold text-sm text-white">{h.title}</h3>
                      <p className="text-xs text-slate-400">Authored by {h.author}</p>
                      <p className="text-xs text-slate-300 leading-relaxed">{h.summary}</p>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {h.keyTopics.map((topic, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400"
                          >
                            #{topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> Verified UPSC Standard
                      </span>
                      <button
                        onClick={() => showToast(`Downloaded "${h.title.slice(0, 25)}..."`)}
                        className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/20 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>PDF</span>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </main>

      {/* Floating Bottom Quick Bar: Download Code Banner */}
      <div className="border-t border-slate-800/80 bg-slate-950/90 backdrop-blur-md py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span>
              <strong>CivilEdge IAS • DrishtiNova</strong> — Complete source code with Broadcasters, Schedulers & Components.
            </span>
          </div>

          <button
            onClick={() => setIsDownloadModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-rose-400 hover:text-rose-300 border border-slate-700 font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <FolderArchive className="w-4 h-4 text-rose-400" />
            <span>Download Whole Code as .ZIP ({sourceCodeManifest.length} files)</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      <DownloadCodeModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        files={sourceCodeManifest}
      />

      <BroadcastSchedulerModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSchedule={handleScheduleNewClass}
      />

      <ClassDetailsEditorModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        broadcast={editingBroadcast}
        onSave={handleUpdateClassDetails}
      />
    </div>
  );
}
