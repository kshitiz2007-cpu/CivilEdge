# CivilEdge IAS • DrishtiNova
### Multi-Source Live Broadcaster, Class Scheduling Engine & UPSC Academic Hub

A modern, production-grade UPSC Civil Services Examination (CSE) academic platform featuring multi-source live video broadcasting (YouTube Live, Google Meet, Zoom Webinar, HLS Low-Latency, and Vimeo), class timetable scheduling, granular syllabus topic mapping, real-time doubt clearing, timestamped lecture notes, and one-click full codebase ZIP export.

---

## 🚀 Key Features

### 1. Multi-Source Live Broadcaster Engine
- **YouTube Live**: Embedded HD live stream with live synchronized doubt stream.
- **Google Meet**: Interactive 1-click video conference room with instant meeting link & code copy.
- **Zoom Webinar**: Breakout room hub with Meeting ID & Passcode copy.
- **HLS / RTMP (.m3u8)**: Adaptive low-latency video streaming player with speed & quality scrubbing.
- **Vimeo Live & Custom WebRTC**: Responsive iframe integration.

### 2. Class Scheduling & Timetable
- Schedule classes with Date, Time (IST), duration, and status (`Live Now`, `Scheduled`, `Concluded`).
- Real-time countdown clock and automated status badges.
- Filter by GS Paper (`GS-1`, `GS-2`, `GS-3`, `GS-4`, `CSAT`, `Current Affairs`, `Optional`).

### 3. Granular Class Details & Syllabus Mapping
- Faculty designation, credentials, and ex-officio background.
- Syllabus topic & subtopic coverage checklist.
- Attached downloadable lecture crux handout PDFs.
- In-Classroom Quick Editor (`⚙️ Manage Broadcast & Class Details`) for instant live updates.

### 4. Codebase ZIP Exporter
- Download the entire codebase directly in the browser as a `.zip` file using pure JSZip.
- Includes file tree inspector, size statistics, and code syntax preview.

---

## 🛠️ Local Development Quickstart

1. **Clone or Extract the ZIP**:
   ```bash
   unzip civiledge-ias-source-code.zip
   cd civiledge-ias-app
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your web browser.

4. **Production Build & Preview**:
   ```bash
   npm run build
   npm run preview
   ```

---

## 📂 Project Architecture

```
├── index.html                   # HTML entry point with metadata and fonts
├── package.json                 # Dependencies and npm scripts
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Vite configuration with Tailwind CSS v4
├── server.ts                    # Express production server
├── src/
│   ├── main.tsx                 # React application entry point
│   ├── App.tsx                  # Main application orchestrator & views
│   ├── index.css                # Tailwind CSS v4 styling & typography
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces for classes & exports
│   ├── data/
│   │   ├── mockData.ts          # Default UPSC classes, doubts & handouts
│   │   └── sourceCodeManifest.ts# Embedded file manifest for zip generation
│   ├── utils/
│   │   └── zipGenerator.ts      # JSZip client-side zip compilation
│   └── components/
│       ├── Header.tsx           # App header with live status & Zip export
│       ├── ClassroomPlayer.tsx  # Multi-source stream stage & interaction
│       ├── TimetableSection.tsx # Class schedule and filtering grid
│       ├── BroadcastSchedulerModal.tsx # Schedule new live classes
│       ├── ClassDetailsEditorModal.tsx # In-classroom quick editor
│       └── DownloadCodeModal.tsx# ZIP download hub with file inspector
```

---

## 📜 License
Apache-2.0
