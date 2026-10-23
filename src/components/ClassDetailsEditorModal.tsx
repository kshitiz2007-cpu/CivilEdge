import React, { useState } from 'react';
import { X, Save, Edit3, Video, Cast, Tv, Radio } from 'lucide-react';
import { BroadcastClass, BroadcastSource, BroadcastStatus, GSBadge } from '../types';

interface ClassDetailsEditorModalProps {
  broadcast: BroadcastClass;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: BroadcastClass) => void;
}

export const ClassDetailsEditorModal: React.FC<ClassDetailsEditorModalProps> = ({
  broadcast,
  isOpen,
  onClose,
  onSave
}) => {
  const [title, setTitle] = useState(broadcast.title);
  const [subject, setSubject] = useState<GSBadge>(broadcast.subject);
  const [faculty, setFaculty] = useState(broadcast.faculty);
  const [facultyDesignation, setFacultyDesignation] = useState(broadcast.facultyDesignation || '');
  const [source, setSource] = useState<BroadcastSource>(broadcast.source);
  const [streamUrl, setStreamUrl] = useState(broadcast.streamUrl);
  const [scheduledDate, setScheduledDate] = useState(broadcast.scheduledDate);
  const [scheduledTime, setScheduledTime] = useState(broadcast.scheduledTime);
  const [durationMinutes, setDurationMinutes] = useState(broadcast.durationMinutes);
  const [status, setStatus] = useState<BroadcastStatus>(broadcast.status);
  const [description, setDescription] = useState(broadcast.description || '');
  const [topicsInput, setTopicsInput] = useState(broadcast.topicsCovered.join(', '));
  const [handoutTitle, setHandoutTitle] = useState(broadcast.handoutTitle || '');
  const [handoutUrl, setHandoutUrl] = useState(broadcast.handoutUrl || '');
  const [meetingId, setMeetingId] = useState(broadcast.meetingId || '');
  const [meetingPassword, setMeetingPassword] = useState(broadcast.meetingPassword || '');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: BroadcastClass = {
      ...broadcast,
      title: title.trim(),
      subject,
      faculty: faculty.trim(),
      facultyDesignation: facultyDesignation.trim(),
      source,
      streamUrl: streamUrl.trim(),
      scheduledDate: scheduledDate.trim(),
      scheduledTime: scheduledTime.trim(),
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
      meetingPassword: meetingPassword.trim() || undefined
    };

    onSave(updated);
    onClose();
  };

  const platforms: { id: BroadcastSource; label: string; icon: string; desc: string }[] = [
    { id: 'youtube', label: 'YouTube Live', icon: '🔴', desc: 'Real-time video with doubts stream' },
    { id: 'meet', label: 'Google Meet', icon: '🟢', desc: 'Interactive 1-on-1 & group room' },
    { id: 'zoom', label: 'Zoom Webinar', icon: '🔵', desc: 'High capacity breakout room' },
    { id: 'hls', label: 'HLS / RTMP', icon: '⚡', desc: 'Low-latency native streaming' },
    { id: 'vimeo', label: 'Vimeo Live', icon: '🟣', desc: 'Ad-free secure player' },
    { id: 'custom', label: 'Custom Embed', icon: '🌐', desc: 'Custom iFrame or WebRTC URL' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                Edit Class Details & Broadcast Source
              </h3>
              <p className="text-xs text-slate-400">
                Update streaming platform, timing, syllabus topics, and handouts in real time.
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
          {/* Source Selection Grid */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-300">
              Broadcasting Source Platform <span className="text-rose-400">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {platforms.map((p) => {
                const isSelected = source === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSource(p.id)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                      isSelected
                        ? 'bg-rose-500/15 border-rose-500 text-white ring-1 ring-rose-500/30'
                        : 'bg-slate-800/60 border-slate-700/70 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">{p.icon}</span>
                      <span className="font-bold text-xs">{p.label}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 leading-tight">{p.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Class Title */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-300">
              Class Title <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          {/* Subject Paper & Status */}
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
              <label className="font-semibold text-slate-300">Broadcast Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as BroadcastStatus)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white cursor-pointer font-bold"
              >
                <option value="live">🔴 Live Now</option>
                <option value="scheduled">📅 Scheduled</option>
                <option value="completed">✓ Concluded</option>
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
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Faculty Credentials / Role</label>
              <input
                type="text"
                value={facultyDesignation}
                onChange={(e) => setFacultyDesignation(e.target.value)}
                placeholder="e.g. Senior Constitutional Law Faculty, Ex-IRS"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
              />
            </div>
          </div>

          {/* Stream URL / Meeting Link */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-300">
              Stream URL / Meeting Room Link <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              value={streamUrl}
              onChange={(e) => setStreamUrl(e.target.value)}
              placeholder="e.g. https://www.youtube.com/watch?v=... or https://meet.google.com/..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-[11px]"
            />
          </div>

          {/* Meeting ID & Passcode (Optional for Zoom/Meet) */}
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
                <label className="font-semibold text-slate-300">Passcode / Encryption Key</label>
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
                placeholder="e.g. Today / Oct 25, 2026"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Scheduled Time</label>
              <input
                type="text"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                placeholder="e.g. 06:00 PM IST"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
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
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
              />
            </div>
          </div>

          {/* Topics Covered */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-300">
              Syllabus Topics Covered (Comma-separated)
            </label>
            <input
              type="text"
              value={topicsInput}
              onChange={(e) => setTopicsInput(e.target.value)}
              placeholder="e.g. Article 368 Amendments, Golaknath 1967, Kesavananda Bharati"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />
          </div>

          {/* Handout Attachment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Handout Title</label>
              <input
                type="text"
                value={handoutTitle}
                onChange={(e) => setHandoutTitle(e.target.value)}
                placeholder="e.g. Basic_Structure_Crux_Notes.pdf"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Handout Download URL</label>
              <input
                type="text"
                value={handoutUrl}
                onChange={(e) => setHandoutUrl(e.target.value)}
                placeholder="https://.../handout.pdf"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-300">Class Description & Objectives</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Key constitutional doctrines, analytical questions, and Mains answer frameworks covered..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
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
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold flex items-center gap-1.5 shadow-lg shadow-rose-600/30 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save & Update Classroom</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
