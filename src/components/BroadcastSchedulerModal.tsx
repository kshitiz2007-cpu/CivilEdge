import React, { useState } from 'react';
import { X, Calendar, Plus, Sparkles, Clock, Video, Cast, Tv, Radio } from 'lucide-react';
import { BroadcastClass, BroadcastSource, BroadcastStatus, GSBadge } from '../types';

interface BroadcastSchedulerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (newBroadcast: BroadcastClass) => void;
}

export const BroadcastSchedulerModal: React.FC<BroadcastSchedulerModalProps> = ({
  isOpen,
  onClose,
  onSchedule
}) => {
  const [source, setSource] = useState<BroadcastSource>('youtube');
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState<GSBadge>('GS-2');
  const [faculty, setFaculty] = useState('Dr. Siddhartha Rao');
  const [facultyDesignation, setFacultyDesignation] = useState('Senior Constitutional Law Faculty, Ex-IRS');
  const [streamUrl, setStreamUrl] = useState('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  const [scheduledDate, setScheduledDate] = useState('Tomorrow');
  const [scheduledTime, setScheduledTime] = useState('06:00 PM IST');
  const [durationMinutes, setDurationMinutes] = useState(90);
  const [status, setStatus] = useState<BroadcastStatus>('scheduled');
  const [description, setDescription] = useState('');
  const [topicsInput, setTopicsInput] = useState('');
  const [handoutTitle, setHandoutTitle] = useState('');
  const [handoutUrl, setHandoutUrl] = useState('');
  const [meetingId, setMeetingId] = useState('');
  const [meetingPassword, setMeetingPassword] = useState('');

  if (!isOpen) return null;

  const applyPreset = (presetKey: string) => {
    if (presetKey === 'polity') {
      setTitle('GS-2 Polity: Parliamentary Privileges vs Fundamental Rights & Supreme Court Benches');
      setSubject('GS-2');
      setSource('youtube');
      setStreamUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
      setFaculty('Dr. Siddhartha Rao');
      setFacultyDesignation('Senior Constitutional Law Faculty, Ex-IRS');
      setTopicsInput('Article 105 Parliamentary Privileges, Article 194, Searchlight Case, Raja Ram Pal Case');
      setDescription('Detailed constitutional examination of codification of privileges, breach of privilege powers, and judicial oversight.');
      setHandoutTitle('Parliamentary_Privileges_GS2_Crux.pdf');
    } else if (presetKey === 'meet_clinic') {
      setTitle('Personalized Prelims Mock Analysis & Test Series Doubt Clinic');
      setSubject('Current Affairs');
      setSource('meet');
      setStreamUrl('https://meet.google.com/ups-civl-nov');
      setMeetingId('ups-civl-nov');
      setFaculty('IRS Mentors & Dr. Siddhartha Rao');
      setFacultyDesignation('CivilEdge Academic Review Board');
      setTopicsInput('Mock score stagnation, accuracy calibration, elimination strategy');
      setDescription('Direct Google Meet room for 1-on-1 aspirant mentoring. Microphones and cameras enabled.');
      setHandoutTitle('Prelims_Score_Booster_Guide.pdf');
    } else if (presetKey === 'economy') {
      setTitle('GS-3 Indian Economy: Fiscal Deficit, FRBM Targets & Capital Expenditure Cycle');
      setSubject('GS-3');
      setSource('zoom');
      setStreamUrl('https://zoom.us/j/9842103561?pwd=CIVILEDGE2026');
      setMeetingId('984 210 3561');
      setMeetingPassword('Passcode: CIVILEDGE2026');
      setFaculty('Prof. Meera Swaminathan');
      setFacultyDesignation('Visiting Faculty, Delhi School of Economics');
      setTopicsInput('FRBM Act amendments, Capex multiplier effect, Debt-to-GDP trajectory');
      setDescription('Comprehensive analysis of government finances, gross fiscal deficit vs revenue deficit, and crowd-in effect.');
      setHandoutTitle('Economy_Capex_Cycle_Blueprint.pdf');
    } else if (presetKey === 'ethics') {
      setTitle('GS-4 Ethics: Probity in Governance, Citizen Charters & RTI Effectiveness');
      setSubject('GS-4');
      setSource('vimeo');
      setStreamUrl('https://vimeo.com/76979871');
      setFaculty('Col. Rajeshwar Singh (Retd.)');
      setFacultyDesignation('Ex-Civil Services Ethics Assessor');
      setTopicsInput('Probity principles, Second ARC recommendations, Whistleblower mechanism');
      setDescription('Structuring 20-mark ethics case study answers with constitutional ethics frameworks.');
      setHandoutTitle('GS4_Probity_Case_Studies.pdf');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !streamUrl.trim()) return;

    const newClass: BroadcastClass = {
      id: `broadcast-${Date.now()}`,
      title: title.trim(),
      subject,
      faculty: faculty.trim() || 'CivilEdge Senior Faculty',
      facultyDesignation: facultyDesignation.trim() || 'UPSC CSE Faculty Panel',
      source,
      streamUrl: streamUrl.trim(),
      scheduledDate: scheduledDate.trim() || 'Today',
      scheduledTime: scheduledTime.trim() || '06:00 PM IST',
      durationMinutes: Number(durationMinutes) || 90,
      status,
      description: description.trim(),
      topicsCovered: topicsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      handoutTitle: handoutTitle.trim() || undefined,
      handoutUrl: handoutUrl.trim() || undefined,
      meetingId: meetingId.trim() || undefined,
      meetingPassword: meetingPassword.trim() || undefined,
      viewersCount: status === 'live' ? 1200 : 0,
      createdAt: 'Just now'
    };

    onSchedule(newClass);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/95">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                Schedule New Live Broadcast / Class
              </h3>
              <p className="text-xs text-slate-400">
                Configure streaming platform, date/time, and syllabus subtopics.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Presets Strip */}
        <div className="px-6 py-2.5 bg-slate-800/40 border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-xs scrollbar-none">
          <span className="font-semibold text-slate-400 shrink-0 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Quick Presets:
          </span>
          <button
            type="button"
            onClick={() => applyPreset('polity')}
            className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 hover:bg-indigo-500/20 shrink-0 font-medium cursor-pointer"
          >
            GS-2 Polity
          </button>
          <button
            type="button"
            onClick={() => applyPreset('meet_clinic')}
            className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 hover:bg-emerald-500/20 shrink-0 font-medium cursor-pointer"
          >
            Google Meet Clinic
          </button>
          <button
            type="button"
            onClick={() => applyPreset('economy')}
            className="px-2.5 py-1 rounded-lg bg-sky-500/10 text-sky-300 border border-sky-500/20 hover:bg-sky-500/20 shrink-0 font-medium cursor-pointer"
          >
            GS-3 Zoom Webinar
          </button>
          <button
            type="button"
            onClick={() => applyPreset('ethics')}
            className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 hover:bg-purple-500/20 shrink-0 font-medium cursor-pointer"
          >
            GS-4 Ethics
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
          {/* Source Platform Selector */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-300">
              Streaming Source Platform <span className="text-rose-400">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'youtube', label: 'YouTube Live', icon: '🔴' },
                { id: 'meet', label: 'Google Meet', icon: '🟢' },
                { id: 'zoom', label: 'Zoom Webinar', icon: '🔵' },
                { id: 'hls', label: 'HLS / RTMP', icon: '⚡' },
                { id: 'vimeo', label: 'Vimeo Live', icon: '🟣' },
                { id: 'custom', label: 'Custom Embed', icon: '🌐' }
              ].map((p) => {
                const isSelected = source === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setSource(p.id as BroadcastSource);
                      if (p.id === 'meet' && !streamUrl.includes('meet.google')) {
                        setStreamUrl('https://meet.google.com/ups-civl-nov');
                        setMeetingId('ups-civl-nov');
                      } else if (p.id === 'zoom' && !streamUrl.includes('zoom.us')) {
                        setStreamUrl('https://zoom.us/j/9842103561?pwd=CIVILEDGE2026');
                        setMeetingId('984 210 3561');
                        setMeetingPassword('Passcode: CIVILEDGE2026');
                      }
                    }}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-500 text-white font-bold ring-1 ring-amber-500/30'
                        : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <span>{p.icon}</span>
                    <span>{p.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-300">
              Class Title <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. GS-2 Constitutional Law: Complete Article 368 Masterclass"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Subject Paper & Faculty */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Syllabus Paper</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value as GSBadge)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white cursor-pointer"
              >
                <option value="GS-1">GS-1 (History, Geography, Indian Society)</option>
                <option value="GS-2">GS-2 (Polity, Governance, Constitution, IR)</option>
                <option value="GS-3">GS-3 (Economy, Environment, Sci-Tech, Security)</option>
                <option value="GS-4">GS-4 (Ethics, Integrity, Aptitude)</option>
                <option value="Current Affairs">Current Affairs & Editorial</option>
                <option value="CSAT">CSAT Paper-II</option>
                <option value="Essay">Mains Essay Masterclass</option>
                <option value="Optional">Optional Subject</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Initial Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as BroadcastStatus)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white cursor-pointer font-bold"
              >
                <option value="scheduled">📅 Scheduled</option>
                <option value="live">🔴 Go Live Immediately</option>
              </select>
            </div>
          </div>

          {/* Faculty & Designation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Faculty / Mentor Name</label>
              <input
                type="text"
                required
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                placeholder="Dr. Siddhartha Rao"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Faculty Designation</label>
              <input
                type="text"
                value={facultyDesignation}
                onChange={(e) => setFacultyDesignation(e.target.value)}
                placeholder="Senior Faculty, Ex-IRS"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
              />
            </div>
          </div>

          {/* Stream URL */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-300">
              Stream / Room URL <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              value={streamUrl}
              onChange={(e) => setStreamUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-[11px]"
            />
          </div>

          {/* Meeting ID & Passcode (for Zoom / Meet) */}
          {(source === 'zoom' || source === 'meet') && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-2xl bg-slate-800/40 border border-slate-700/60">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Meeting ID / Room Code</label>
                <input
                  type="text"
                  value={meetingId}
                  onChange={(e) => setMeetingId(e.target.value)}
                  placeholder="e.g. 984 210 3561"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Passcode (Optional)</label>
                <input
                  type="text"
                  value={meetingPassword}
                  onChange={(e) => setMeetingPassword(e.target.value)}
                  placeholder="e.g. CIVILEDGE2026"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
                />
              </div>
            </div>
          )}

          {/* Date, Time, Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Scheduled Date</label>
              <input
                type="text"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                placeholder="Tomorrow / Oct 26, 2026"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Scheduled Time</label>
              <input
                type="text"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                placeholder="06:00 PM IST"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Duration (Minutes)</label>
              <input
                type="number"
                min={15}
                max={300}
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value) || 90)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
              />
            </div>
          </div>

          {/* Syllabus Topics */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-300">
              Syllabus Topics Covered (Comma-separated)
            </label>
            <input
              type="text"
              value={topicsInput}
              onChange={(e) => setTopicsInput(e.target.value)}
              placeholder="e.g. Article 368 Amendments, Kesavananda Bharati, Basic Structure Doctrine"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-300">Session Description & Objectives</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Summary of lecture agenda, Mains questions discussed, and reference cases..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{status === 'live' ? '🔴 Broadcast Live Now' : '📅 Schedule Class'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
