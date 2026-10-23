import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Radio,
  Users,
  Video,
  Cast,
  Tv,
  Edit3,
  ExternalLink,
  Plus,
  Play,
  Filter,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { BroadcastClass, GSBadge, BroadcastStatus } from '../types';

interface TimetableSectionProps {
  broadcasts: BroadcastClass[];
  onSelectBroadcast: (id: string) => void;
  onOpenEditModal: (broadcast: BroadcastClass) => void;
  onOpenScheduleModal: () => void;
}

export const TimetableSection: React.FC<TimetableSectionProps> = ({
  broadcasts,
  onSelectBroadcast,
  onOpenEditModal,
  onOpenScheduleModal
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filtered = broadcasts.filter((b) => {
    const subjectMatch = selectedSubject === 'all' || b.subject === selectedSubject;
    const statusMatch = selectedStatus === 'all' || b.status === selectedStatus;
    return subjectMatch && statusMatch;
  });

  const papers: { id: string; label: string }[] = [
    { id: 'all', label: 'All Subjects' },
    { id: 'GS-1', label: 'GS-1' },
    { id: 'GS-2', label: 'GS-2' },
    { id: 'GS-3', label: 'GS-3' },
    { id: 'GS-4', label: 'GS-4' },
    { id: 'Current Affairs', label: 'Current Affairs' },
    { id: 'CSAT', label: 'CSAT' }
  ];

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              UPSC CSE 2026 Academic Timetable
            </span>
          </div>
          <h2 className="text-xl font-bold text-white">Live Broadcast & Class Schedule</h2>
          <p className="text-xs text-slate-400">
            Real-time multi-source broadcasts, faculty doubt clinics, and masterclasses.
          </p>
        </div>

        <button
          onClick={onOpenScheduleModal}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all self-start md:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule New Class</span>
        </button>
      </div>

      {/* Filters Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {papers.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedSubject(p.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedSubject === p.id
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 text-xs">
          <span className="text-slate-400 font-semibold mr-1">Status:</span>
          {['all', 'live', 'scheduled', 'completed'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-2.5 py-1 rounded-lg capitalize cursor-pointer ${
                selectedStatus === st
                  ? 'bg-slate-700 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Class Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((b) => {
          const isLive = b.status === 'live';

          const sourceBadge: Record<string, { label: string; color: string }> = {
            youtube: { label: 'YouTube Live', color: 'bg-red-500/10 text-red-400 border-red-500/30' },
            meet: { label: 'Google Meet', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
            zoom: { label: 'Zoom Webinar', color: 'bg-sky-500/10 text-sky-400 border-sky-500/30' },
            hls: { label: 'HLS Stream', color: 'bg-amber-500/10 text-amber-400 border-amber-500/30' },
            vimeo: { label: 'Vimeo Live', color: 'bg-purple-500/10 text-purple-400 border-purple-500/30' },
            custom: { label: 'Custom', color: 'bg-slate-500/10 text-slate-400 border-slate-500/30' }
          };

          return (
            <div
              key={b.id}
              className={`p-5 rounded-3xl border transition-all flex flex-col justify-between gap-4 bg-slate-900/90 shadow-xl ${
                isLive
                  ? 'border-rose-500/60 ring-2 ring-rose-500/20 shadow-rose-500/5'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                {/* Badges Bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isLive ? (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-600 text-white flex items-center gap-1.5 animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                        LIVE NOW
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {b.scheduledDate} • {b.scheduledTime}
                      </span>
                    )}

                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase">
                      {b.subject}
                    </span>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono border font-semibold ${
                      sourceBadge[b.source]?.color || 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {sourceBadge[b.source]?.label || b.source}
                  </span>
                </div>

                {/* Title & Faculty */}
                <div>
                  <h3 className="text-base font-bold text-white hover:text-rose-400 transition-colors">
                    {b.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Conducted by <strong className="text-slate-200">{b.faculty}</strong>{' '}
                    {b.facultyDesignation && <span>({b.facultyDesignation})</span>}
                  </p>
                </div>

                {/* Description */}
                {b.description && (
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {b.description}
                  </p>
                )}

                {/* Topics Covered */}
                {b.topicsCovered && b.topicsCovered.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {b.topicsCovered.slice(0, 3).map((topic, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[11px] bg-slate-800 text-slate-300 border border-slate-700/60"
                      >
                        ✓ {topic}
                      </span>
                    ))}
                    {b.topicsCovered.length > 3 && (
                      <span className="px-1.5 py-0.5 text-[11px] text-slate-400">
                        +{b.topicsCovered.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                <span className="text-slate-400">Duration: {b.durationMinutes} mins</span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenEditModal(b)}
                    className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer border border-slate-800"
                    title="Edit class details or streaming source"
                  >
                    <Edit3 className="w-4 h-4 text-rose-400" />
                  </button>

                  <button
                    onClick={() => onSelectBroadcast(b.id)}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold transition-all flex items-center gap-1.5 shadow-md shadow-rose-600/20 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>{isLive ? 'Watch Live' : 'Open Class'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
