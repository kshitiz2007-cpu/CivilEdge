import React from 'react';
import {
  Radio,
  Download,
  Calendar,
  BookOpen,
  FolderArchive,
  Plus,
  Sparkles,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { BroadcastClass } from '../types';

interface HeaderProps {
  activeTab: 'classroom' | 'timetable' | 'handouts';
  setActiveTab: (tab: 'classroom' | 'timetable' | 'handouts') => void;
  liveBroadcast?: BroadcastClass;
  onOpenDownloadModal: () => void;
  onOpenScheduleModal: () => void;
  onSelectBroadcast: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  liveBroadcast,
  onOpenDownloadModal,
  onOpenScheduleModal,
  onSelectBroadcast
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-rose-600/25 ring-2 ring-white/10 shrink-0">
              <span className="font-black text-sm tracking-tighter">CE</span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg text-white tracking-tight">
                  CivilEdge IAS
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  DrishtiNova
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-slate-400 truncate max-w-[200px] sm:max-w-none">
                UPSC Live Broadcasting & Class Scheduling Engine
              </span>
            </div>
          </div>

          {/* Center Navigation Tabs (Desktop) */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('classroom')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'classroom'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Live Classroom</span>
            </button>

            <button
              onClick={() => setActiveTab('timetable')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'timetable'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Timetable & Schedule</span>
            </button>

            <button
              onClick={() => setActiveTab('handouts')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'handouts'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Lecture Crux Handouts</span>
            </button>
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Live indicator pill (if there is an active live broadcast) */}
            {liveBroadcast && (
              <button
                onClick={() => {
                  setActiveTab('classroom');
                  onSelectBroadcast(liveBroadcast.id);
                }}
                className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold hover:bg-rose-500/20 transition-all cursor-pointer"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
                <span className="truncate max-w-[150px]">Live: {liveBroadcast.title}</span>
              </button>
            )}

            {/* Schedule Class Button */}
            <button
              onClick={onOpenScheduleModal}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>Schedule Class</span>
            </button>

            {/* HIGH-VISIBILITY PROMINENT DOWNLOAD CODE ZIP BUTTON */}
            <button
              onClick={onOpenDownloadModal}
              className="relative px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-extrabold text-xs shadow-lg shadow-rose-600/30 transition-all hover:scale-[1.03] active:scale-[0.98] flex items-center gap-2 cursor-pointer ring-2 ring-rose-400/30"
              title="Download entire project code as a .zip file"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-90"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <Download className="w-4 h-4" />
              <span>Download Code (.zip)</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-800 text-[11px] font-bold">
          <button
            onClick={() => setActiveTab('classroom')}
            className={`py-1 px-2.5 rounded-lg flex items-center gap-1 ${
              activeTab === 'classroom' ? 'text-rose-400 bg-rose-500/10' : 'text-slate-400'
            }`}
          >
            <Radio className="w-3 h-3" />
            <span>Classroom</span>
          </button>
          <button
            onClick={() => setActiveTab('timetable')}
            className={`py-1 px-2.5 rounded-lg flex items-center gap-1 ${
              activeTab === 'timetable' ? 'text-rose-400 bg-rose-500/10' : 'text-slate-400'
            }`}
          >
            <Calendar className="w-3 h-3" />
            <span>Schedule</span>
          </button>
          <button
            onClick={() => setActiveTab('handouts')}
            className={`py-1 px-2.5 rounded-lg flex items-center gap-1 ${
              activeTab === 'handouts' ? 'text-rose-400 bg-rose-500/10' : 'text-slate-400'
            }`}
          >
            <BookOpen className="w-3 h-3" />
            <span>Handouts</span>
          </button>
        </div>
      </div>
    </header>
  );
};
