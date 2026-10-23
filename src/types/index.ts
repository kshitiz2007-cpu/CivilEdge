export type GSBadge =
  | 'GS-1'
  | 'GS-2'
  | 'GS-3'
  | 'GS-4'
  | 'CSAT'
  | 'Current Affairs'
  | 'Essay'
  | 'Optional';

export type SubjectCode = GSBadge;
export type BroadcastSource = 'youtube' | 'meet' | 'zoom' | 'hls' | 'vimeo' | 'custom';
export type BroadcastStatus = 'live' | 'scheduled' | 'completed';
export type UserRole = 'student' | 'faculty' | 'admin';

export interface FacultyProfile {
  id: string;
  name: string;
  designation?: string;
  bio?: string;
  avatarUrl?: string;
  subjectFocus?: GSBadge[];
}

export interface SubjectDefinition {
  id: string;
  slug: GSBadge;
  label: string;
  description?: string;
}

export interface BroadcastClass {
  id: string;
  title: string;
  subject: GSBadge;
  faculty: string;
  facultyDesignation?: string;
  source: BroadcastSource;
  streamUrl: string;
  scheduledDate: string;
  scheduledTime: string;
  durationMinutes: number;
  status: BroadcastStatus;
  description?: string;
  topicsCovered: string[];
  handoutUrl?: string;
  handoutTitle?: string;
  thumbnail?: string;
  viewersCount?: number;
  meetingId?: string;
  meetingPassword?: string;
  chatEnabled?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface LectureDoubt {
  id: string;
  user: string;
  avatar: string;
  query: string;
  upvotes: number;
  isAnswered: boolean;
  timeAgo: string;
  facultyReply?: string;
  userUpvoted?: boolean;
  createdAt?: string;
}

export interface LectureNote {
  id: string;
  broadcastId?: string;
  timestampSeconds: number;
  formattedTime: string;
  text: string;
  createdAt: string;
}

export interface ClassHandout {
  id: string;
  title: string;
  subject: GSBadge;
  pages: number;
  size: string;
  downloadUrl?: string;
  author: string;
  summary: string;
  keyTopics: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  role: UserRole;
  avatarUrl?: string;
  joinedAt?: string;
}

export interface ProjectFileItem {
  path: string;
  name: string;
  category: 'core' | 'component' | 'data' | 'types' | 'config' | 'style' | 'docs';
  extension: string;
  sizeBytes: number;
  content: string;
}

export interface DbBroadcastRecord {
  id: string;
  title: string;
  subject: GSBadge;
  faculty_name: string;
  faculty_designation?: string;
  source: BroadcastSource;
  stream_url: string;
  scheduled_date: string;
  scheduled_time: string;
  duration_minutes: number;
  status: BroadcastStatus;
  description?: string;
  meeting_id?: string;
  meeting_password?: string;
  handout_title?: string;
  handout_url?: string;
  viewers_count?: number;
  chat_enabled?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface DbDoubtRecord {
  id: string;
  user_name: string;
  avatar_url: string;
  query: string;
  upvotes: number;
  is_answered: boolean;
  time_ago: string;
  faculty_reply?: string;
  user_upvoted?: boolean;
  created_at?: string;
}

export interface DbLectureNoteRecord {
  id: string;
  broadcast_id?: string;
  timestamp_seconds: number;
  formatted_time: string;
  text: string;
  created_at: string;
}

export interface DbHandoutRecord {
  id: string;
  title: string;
  subject: GSBadge;
  pages: number;
  size: string;
  download_url?: string;
  author: string;
  summary: string;
  created_at?: string;
}

export interface AppDataSnapshot {
  broadcasts: BroadcastClass[];
  doubts: LectureDoubt[];
  notes: LectureNote[];
  handouts: ClassHandout[];
}
