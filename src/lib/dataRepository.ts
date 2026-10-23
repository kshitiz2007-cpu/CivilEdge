import type {
  AppDataSnapshot,
  BroadcastClass,
  ClassHandout,
  DbBroadcastRecord,
  DbDoubtRecord,
  DbHandoutRecord,
  DbLectureNoteRecord,
  LectureDoubt,
  LectureNote,
} from '../types';
import {
  initialBroadcastClasses,
  initialDoubts,
  initialNotes,
  initialHandouts,
} from '../data/mockData';

export const defaultAppData: AppDataSnapshot = {
  broadcasts: initialBroadcastClasses,
  doubts: initialDoubts,
  notes: initialNotes,
  handouts: initialHandouts,
};

export function mapBroadcastToDbRecord(broadcast: BroadcastClass): DbBroadcastRecord {
  return {
    id: broadcast.id,
    title: broadcast.title,
    subject: broadcast.subject,
    faculty_name: broadcast.faculty,
    faculty_designation: broadcast.facultyDesignation,
    source: broadcast.source,
    stream_url: broadcast.streamUrl,
    scheduled_date: broadcast.scheduledDate,
    scheduled_time: broadcast.scheduledTime,
    duration_minutes: broadcast.durationMinutes,
    status: broadcast.status,
    description: broadcast.description,
    meeting_id: broadcast.meetingId,
    meeting_password: broadcast.meetingPassword,
    handout_title: broadcast.handoutTitle,
    handout_url: broadcast.handoutUrl,
    viewers_count: broadcast.viewersCount,
    chat_enabled: broadcast.chatEnabled,
    created_at: broadcast.createdAt,
    updated_at: broadcast.updatedAt,
  };
}

export function mapDbToBroadcast(record: DbBroadcastRecord): BroadcastClass {
  return {
    id: record.id,
    title: record.title,
    subject: record.subject,
    faculty: record.faculty_name,
    facultyDesignation: record.faculty_designation,
    source: record.source,
    streamUrl: record.stream_url,
    scheduledDate: record.scheduled_date,
    scheduledTime: record.scheduled_time,
    durationMinutes: record.duration_minutes,
    status: record.status,
    description: record.description,
    topicsCovered: [],
    handoutUrl: record.handout_url,
    handoutTitle: record.handout_title,
    viewersCount: record.viewers_count,
    meetingId: record.meeting_id,
    meetingPassword: record.meeting_password,
    chatEnabled: record.chat_enabled,
    createdAt: record.created_at,
    updatedAt: record.updated_at,
  };
}

export function mapDoubtToDbRecord(doubt: LectureDoubt): DbDoubtRecord {
  return {
    id: doubt.id,
    user_name: doubt.user,
    avatar_url: doubt.avatar,
    query: doubt.query,
    upvotes: doubt.upvotes,
    is_answered: doubt.isAnswered,
    time_ago: doubt.timeAgo,
    faculty_reply: doubt.facultyReply,
    user_upvoted: doubt.userUpvoted,
    created_at: doubt.createdAt,
  };
}

export function mapDbToDoubt(record: DbDoubtRecord): LectureDoubt {
  return {
    id: record.id,
    user: record.user_name,
    avatar: record.avatar_url,
    query: record.query,
    upvotes: record.upvotes,
    isAnswered: record.is_answered,
    timeAgo: record.time_ago,
    facultyReply: record.faculty_reply,
    userUpvoted: record.user_upvoted,
    createdAt: record.created_at,
  };
}

export function mapNoteToDbRecord(note: LectureNote): DbLectureNoteRecord {
  return {
    id: note.id,
    broadcast_id: note.broadcastId,
    timestamp_seconds: note.timestampSeconds,
    formatted_time: note.formattedTime,
    text: note.text,
    created_at: note.createdAt,
  };
}

export function mapDbToNote(record: DbLectureNoteRecord): LectureNote {
  return {
    id: record.id,
    broadcastId: record.broadcast_id,
    timestampSeconds: record.timestamp_seconds,
    formattedTime: record.formatted_time,
    text: record.text,
    createdAt: record.created_at,
  };
}

export function mapHandoutToDbRecord(handout: ClassHandout): DbHandoutRecord {
  return {
    id: handout.id,
    title: handout.title,
    subject: handout.subject,
    pages: handout.pages,
    size: handout.size,
    download_url: handout.downloadUrl,
    author: handout.author,
    summary: handout.summary,
  };
}

export function mapDbToHandout(record: DbHandoutRecord): ClassHandout {
  return {
    id: record.id,
    title: record.title,
    subject: record.subject,
    pages: record.pages,
    size: record.size,
    downloadUrl: record.download_url,
    author: record.author,
    summary: record.summary,
    keyTopics: [],
  };
}

export function normalizeTopics(value: string[] | string | null | undefined): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.map((item) => item.trim()).filter(Boolean);
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}
