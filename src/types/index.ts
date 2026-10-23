export type GSBadge =
  | 'GS-1'
  | 'GS-2'
  | 'GS-3'
  | 'GS-4'
  | 'CSAT'
  | 'Current Affairs'
  | 'Essay'
  | 'Optional';

export type BroadcastSource = 'youtube' | 'meet' | 'zoom' | 'hls' | 'vimeo' | 'custom';

export type BroadcastStatus = 'live' | 'scheduled' | 'completed';

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
}

export interface LectureNote {
  id: string;
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

export interface ProjectFileItem {
  path: string;
  name: string;
  category: 'core' | 'component' | 'data' | 'types' | 'config' | 'style' | 'docs';
  extension: string;
  sizeBytes: number;
  content: string;
}
