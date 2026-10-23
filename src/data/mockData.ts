import { BroadcastClass, LectureDoubt, LectureNote, ClassHandout } from '../types';

export const initialBroadcastClasses: BroadcastClass[] = [
  {
    id: 'broadcast-1',
    title: 'GS-2 Constitutional Law: Article 368 & Basic Structure Doctrine Masterclass',
    subject: 'GS-2',
    faculty: 'Dr. Siddhartha Rao',
    facultyDesignation: 'Senior Constitutional Law Faculty, Ex-IRS',
    source: 'youtube',
    streamUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    scheduledDate: 'Today',
    scheduledTime: '06:00 PM IST',
    durationMinutes: 120,
    status: 'live',
    description:
      'Line-by-line constitutional deconstruction of Shankari Prasad (1951), Sajjan Singh (1965), Golaknath (1967), the 24th Amendment Act, and the landmark 13-Judge Bench verdict in Kesavananda Bharati (1973).',
    topicsCovered: [
      'Article 368 Constituent Amending Power',
      'Shankari Prasad vs Union of India (1951)',
      'Golaknath (1967) 11-Judge Bench Doctrine',
      'Kesavananda Bharati (1973) Basic Structure',
      'Minerva Mills (1980) Harmonious Construction',
      'NJAC 99th Amendment Strike Down'
    ],
    handoutUrl: 'https://example.com/handouts/gs2-basic-structure-doctrine.pdf',
    handoutTitle: 'GS2_Basic_Structure_Doctrine_Crux_Handout.pdf',
    viewersCount: 3840,
    createdAt: 'Just now'
  },
  {
    id: 'broadcast-2',
    title: 'Interactive Prelims 2026 Doubt Clinic & High-Yield Strategy Session',
    subject: 'Current Affairs',
    faculty: 'Dr. Siddhartha Rao & IRS Mentors',
    facultyDesignation: 'CivilEdge Core Faculty Panel',
    source: 'meet',
    streamUrl: 'https://meet.google.com/ups-civl-nov',
    meetingId: 'ups-civl-nov',
    scheduledDate: 'Tomorrow',
    scheduledTime: '07:30 PM IST',
    durationMinutes: 90,
    status: 'scheduled',
    description:
      'Direct interactive Google Meet conference for personalized Prelims test series doubts, accuracy fine-tuning, and revision schedules. Camera and unmuting enabled for aspirant queries.',
    topicsCovered: [
      'Prelims Mock Accuracy Calibration',
      'Elimination Techniques for Multiple Pair Patterns',
      'Time Management in GS Paper-I and CSAT',
      'High-Yield Art & Culture Revision Matrix'
    ],
    handoutTitle: 'Prelims_2026_High_Yield_Strategy.pdf',
    handoutUrl: 'https://example.com/handouts/prelims-2026-strategy.pdf',
    viewersCount: 210,
    createdAt: '2 hours ago'
  },
  {
    id: 'broadcast-3',
    title: 'GS-3 Macroeconomics: Fiscal Deficit, Monetary Transmission & RBI CBDC Ecosystem',
    subject: 'GS-3',
    faculty: 'Prof. Meera Swaminathan',
    facultyDesignation: 'Visiting Faculty, Delhi School of Economics',
    source: 'zoom',
    streamUrl: 'https://zoom.us/j/9842103561?pwd=CIVILEDGE2026',
    meetingId: '984 210 3561',
    meetingPassword: 'Passcode: CIVILEDGE2026',
    scheduledDate: 'Oct 25, 2026',
    scheduledTime: '05:00 PM IST',
    durationMinutes: 105,
    status: 'scheduled',
    description:
      'In-depth analytical breakdown of RBI Act 1934 amendments, repo rate transmission delays, sovereign digital rupee (e-Rupee) cross-border settlement, and twin balance sheet problem.',
    topicsCovered: [
      'RBI Act 1934 (2022 Amendment Section 2)',
      'Retail vs Wholesale CBDC Architecture',
      'Monetary Policy Transmission Lag (6-12 Months)',
      'FRBM Act Targets & Primary vs Fiscal Deficit'
    ],
    handoutTitle: 'CBDC_Monetary_Transmission_Blueprint.pdf',
    handoutUrl: 'https://example.com/handouts/cbdc-monetary-policy.pdf',
    viewersCount: 450,
    createdAt: '1 day ago'
  },
  {
    id: 'broadcast-4',
    title: 'Daily Editorial Deconstruction: Indo-Pacific Maritime & Semiconductor Capex (HLS Stream)',
    subject: 'Current Affairs',
    faculty: 'Dr. Anurag Verma',
    facultyDesignation: 'Senior Editor & UPSC Current Affairs Lead',
    source: 'hls',
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    scheduledDate: 'Daily at 08:00 AM',
    scheduledTime: '08:00 AM IST',
    durationMinutes: 60,
    status: 'scheduled',
    description:
      'Editorial mindmaps for today\'s issues, GS syllabus mapping, and Mains model questions drafting with low-latency adaptive streaming.',
    topicsCovered: [
      'Semiconductor Mission 2.0 Capex Incentives',
      'Indo-Pacific Maritime Corridors & UNCLOS',
      'Mains Daily Answer Framework & Dimensions',
      'Static Linkage: GS-2 International Treaties'
    ],
    handoutTitle: 'Daily_Editorial_Crux_Today.pdf',
    handoutUrl: 'https://example.com/handouts/daily-editorial.pdf',
    viewersCount: 1560,
    createdAt: '1 day ago'
  },
  {
    id: 'broadcast-5',
    title: 'GS-4 Ethics: Moral Dilemmas in Public Administration & Civil Service Values',
    subject: 'GS-4',
    faculty: 'Col. Rajeshwar Singh (Retd.)',
    facultyDesignation: 'Ex-Civil Services Ethics Assessor & Author',
    source: 'vimeo',
    streamUrl: 'https://vimeo.com/76979871',
    scheduledDate: 'Oct 26, 2026',
    scheduledTime: '04:00 PM IST',
    durationMinutes: 90,
    status: 'scheduled',
    description:
      'Case studies analysis on conflict of interest, whistleblower protection, political neutrality, and emotional intelligence in crisis administration.',
    topicsCovered: [
      'Nolan Committee Principles of Public Life',
      'Conflict of Interest & Discretionary Powers',
      'Case Study Step-by-Step Resolution Template',
      'Empathy vs Impartiality in Welfare Delivery'
    ],
    handoutTitle: 'GS4_Ethics_Case_Studies_Compendium.pdf',
    handoutUrl: 'https://example.com/handouts/gs4-ethics.pdf',
    viewersCount: 890,
    createdAt: '2 days ago'
  }
];

export const initialDoubts: LectureDoubt[] = [
  {
    id: 'doubt-1',
    user: 'Aryan Verma',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    query: 'Does the doctrine of basic structure apply to ordinary statutes or only constitutional amendments under Article 368?',
    upvotes: 42,
    isAnswered: true,
    timeAgo: '12m ago',
    facultyReply:
      'In Indira Nehru Gandhi (1975) and State of Karnataka vs Union of India (1977), the Supreme Court clarified that the basic structure doctrine applies strictly to constitutional amendments under Article 368, not to ordinary legislative statutes. Ordinary statutes are tested for competence and Part III violations.',
    userUpvoted: true
  },
  {
    id: 'doubt-2',
    user: 'Pooja Sundaram',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    query: 'Can Parliament use Article 368 to amend Article 368 itself, as was attempted in the 42nd Amendment Section 55?',
    upvotes: 29,
    isAnswered: true,
    timeAgo: '24m ago',
    facultyReply:
      'No. In Minerva Mills (1980), the SC struck down clauses (4) and (5) of Article 368 (inserted by 42nd Amendment). Justice Chandrachud ruled that a limited amending power is one of the basic features of the Constitution, and Parliament cannot enlarge its limited power into an unlimited one.',
    userUpvoted: false
  },
  {
    id: 'doubt-3',
    user: 'Rohan Deshmukh',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
    query: 'How should we substantiate the judicial review aspect in a 250-word GS-2 Mains question?',
    upvotes: 18,
    isAnswered: false,
    timeAgo: '4m ago',
    userUpvoted: false
  }
];

export const initialNotes: LectureNote[] = [
  {
    id: 'note-1',
    timestampSeconds: 525,
    formattedTime: '08:45',
    text: 'Golaknath (1967) 11-Judge Bench: Chief Justice Subba Rao held that Fundamental Rights in Part III are transcendental and immutable, holding that Article 368 only lays down procedure, not constituent power.',
    createdAt: '15 mins ago'
  },
  {
    id: 'note-2',
    timestampSeconds: 1290,
    formattedTime: '21:30',
    text: '24th Amendment Act (1971): Parliament amended Article 13 & 368 to explicitly declare that Article 13 does not apply to Article 368 constitutional amendments.',
    createdAt: '8 mins ago'
  },
  {
    id: 'note-3',
    timestampSeconds: 2410,
    formattedTime: '40:10',
    text: 'Kesavananda Bharati (1973): 13-Judge bench, longest hearing in Indian judicial history (68 days), decided by 7:6 majority overruling Golaknath but creating Basic Structure limit.',
    createdAt: 'Just now'
  }
];

export const initialHandouts: ClassHandout[] = [
  {
    id: 'handout-1',
    title: 'Basic Structure Doctrine: Landmark Case-Law Compendium (1951-2024)',
    subject: 'GS-2',
    pages: 28,
    size: '3.4 MB',
    author: 'Dr. Siddhartha Rao',
    summary:
      'Detailed case-by-case analytical breakdown of 18 Supreme Court benches defining non-amendable constitutional core features, judicial review, and federalism.',
    keyTopics: ['Shankari Prasad', 'Golaknath', 'Kesavananda', 'Minerva Mills', 'Waman Rao', 'I.R. Coelho']
  },
  {
    id: 'handout-2',
    title: 'Macroeconomic Survey Crux: Monetary Transmission, Repo & e-Rupee',
    subject: 'GS-3',
    pages: 34,
    size: '4.8 MB',
    author: 'Prof. Meera Swaminathan',
    summary:
      'Complete synthesis of RBI bulletins, liquidity adjustment facility (LAF), monetary policy committee decisions, and retail/wholesale CBDC pilot metrics.',
    keyTopics: ['RBI Act 1934', 'CBDC Architecture', 'Transmission Lag', 'Twin Deficits']
  },
  {
    id: 'handout-3',
    title: 'Prelims 2026 High-Yield Question Elimination & Elimination Traps',
    subject: 'Current Affairs',
    pages: 18,
    size: '2.1 MB',
    author: 'CivilEdge IAS Academic Board',
    summary:
      'Tactical guide to navigating UPSC\'s "Only one pair / Only two pairs" question pattern, factual distractors, and statutory traps in prelims.',
    keyTopics: ['Pair-based questions', 'Negative marking mitigation', 'Mock score conversion']
  }
];
