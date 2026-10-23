CREATE TYPE subject_code AS ENUM (
  'GS-1',
  'GS-2',
  'GS-3',
  'GS-4',
  'CSAT',
  'Current Affairs',
  'Essay',
  'Optional'
);

CREATE TYPE broadcast_source AS ENUM ('youtube', 'meet', 'zoom', 'hls', 'vimeo', 'custom');
CREATE TYPE broadcast_status AS ENUM ('live', 'scheduled', 'completed');
CREATE TYPE user_role AS ENUM ('student', 'faculty', 'admin');

CREATE TABLE subjects (
  code subject_code PRIMARY KEY,
  label VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE faculty_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  designation VARCHAR(255),
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  role user_role NOT NULL DEFAULT 'student',
  avatar_url TEXT,
  joined_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE broadcasts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  subject subject_code NOT NULL,
  faculty_id UUID NOT NULL REFERENCES faculty_profiles(id) ON DELETE RESTRICT,
  faculty_name VARCHAR(255) NOT NULL,
  faculty_designation VARCHAR(255),
  source broadcast_source NOT NULL,
  stream_url TEXT NOT NULL,
  scheduled_date VARCHAR(120) NOT NULL,
  scheduled_time VARCHAR(120) NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 90,
  status broadcast_status NOT NULL DEFAULT 'scheduled',
  description TEXT,
  meeting_id VARCHAR(255),
  meeting_password VARCHAR(255),
  handout_title VARCHAR(255),
  handout_url TEXT,
  thumbnail_url TEXT,
  viewers_count INTEGER DEFAULT 0,
  chat_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE broadcast_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  broadcast_id UUID NOT NULL REFERENCES broadcasts(id) ON DELETE CASCADE,
  topic VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (broadcast_id, topic)
);

CREATE TABLE lecture_doubts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  broadcast_id UUID REFERENCES broadcasts(id) ON DELETE SET NULL,
  user_name VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  query TEXT NOT NULL,
  upvotes INTEGER NOT NULL DEFAULT 0,
  is_answered BOOLEAN NOT NULL DEFAULT false,
  faculty_reply TEXT,
  user_upvoted BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE lecture_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  broadcast_id UUID REFERENCES broadcasts(id) ON DELETE CASCADE,
  timestamp_seconds INTEGER NOT NULL,
  formatted_time VARCHAR(40) NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE class_handouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  subject subject_code NOT NULL,
  pages INTEGER NOT NULL DEFAULT 0,
  size VARCHAR(50) NOT NULL,
  download_url TEXT,
  author VARCHAR(255) NOT NULL,
  summary TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE handout_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  handout_id UUID NOT NULL REFERENCES class_handouts(id) ON DELETE CASCADE,
  topic VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (handout_id, topic)
);

CREATE INDEX idx_broadcasts_subject ON broadcasts (subject);
CREATE INDEX idx_broadcasts_status ON broadcasts (status);
CREATE INDEX idx_broadcasts_schedule_date ON broadcasts (scheduled_date);
CREATE INDEX idx_doubts_broadcast_id ON lecture_doubts (broadcast_id);
CREATE INDEX idx_notes_broadcast_id ON lecture_notes (broadcast_id);
CREATE INDEX idx_handouts_subject ON class_handouts (subject);

INSERT INTO subjects (code, label, description) VALUES
  ('GS-1', 'GS-1', 'History, Geography, Indian Society'),
  ('GS-2', 'GS-2', 'Polity, Governance, Constitution, IR'),
  ('GS-3', 'GS-3', 'Economy, Environment, Sci-Tech, Security'),
  ('GS-4', 'GS-4', 'Ethics, Integrity, Aptitude'),
  ('CSAT', 'CSAT', 'Comprehension, Reasoning, Maths'),
  ('Current Affairs', 'Current Affairs', 'Editorial and current affairs'),
  ('Essay', 'Essay', 'Essay writing masterclass'),
  ('Optional', 'Optional', 'Optional subject classroom');
