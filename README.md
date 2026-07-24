# AI Study Planner

[![Open in Bolt](https://bolt.new/static/open-in-bolt.svg)](https://bolt.new)

> A complete student productivity application that generates personalized AI-powered study plans, tracks progress, and helps students prepare for exams efficiently.

**Live URL:** https://ai-study-planner-web-y3z7.bolt.host

---

## Table of Contents

1. [Problem It Solves](#problem-it-solves)
2. [Features](#features)
3. [AI Feature & System Prompt](#ai-feature--system-prompt)
4. [Technologies Used](#technologies-used)
5. [Screenshots](#screenshots)
6. [How to Run Locally](#how-to-run-locally)
7. [Project Structure](#project-structure)
8. [Security & Privacy](#security--privacy)

---

## Problem It Solves

University students often struggle with **time management** and **effective exam preparation**. Common challenges include:

- **Not knowing what to study each day** — Students have syllabi but lack a structured, day-by-day plan.
- **Poor time allocation** — Without a schedule, students either over-study one subject or neglect others.
- **Lack of motivation and accountability** — There is no visible progress tracker or reminder system.
- **No personalized guidance** — Generic study advice does not account for subject-specific topics, exam dates, or available study hours.
- **Scattered study materials** — Plans are written on paper, lost across notebooks, or forgotten after a refresh.

**AI Study Planner** solves these problems by generating a **personalized, day-by-day study schedule** based on the student's subject, exam date, and daily available study hours. It tracks progress, sends reminders, exports plans as PDF, and provides an AI assistant for study-related questions — all in one place, saved securely to the student's account.

---

## Features

### Authentication & User Management
- Email and password authentication with secure session persistence
- Sign up and sign in pages with form validation
- Users stay logged in after page refresh
- Logout button in the navbar and settings
- Each user's data is isolated and private

### AI Study Plan Generator
- Generates a personalized day-by-day study schedule from three inputs: subject name, exam date, and daily study hours
- Supports 9 subjects with topic-specific templates: Mathematics, Biology, Biochemistry, English, Computer Science, Physics, Chemistry, History, and Economics
- Falls back to a generic template for any unrecognized subject
- Divides the plan into 5 progressive phases: Foundation, Practice, Deep Dive, Review, and Assessment
- Automatically schedules rest days (Sundays) for plans longer than 10 days
- Schedules full mock exams in the final 2 days for plans longer than 5 days
- Adjusts the number of daily tasks based on available study hours (1–4 tasks per day)

### Study Progress Tracking
- Progress is saved permanently to the database and survives page refreshes
- Visual progress ring showing completion percentage
- Completed task count displayed on the planner and dashboard
- Reset Progress button to restart a plan without deleting it
- "Today's Tasks" highlighted section for the current day
- Missed days flagged automatically

### AI Chat Assistant
- Floating chat button available on every page
- Students can ask study-related questions and receive instant, helpful answers
- Covers topics: motivation, memorization, time management, procrastination, exam anxiety, focus, note-taking, sleep, and last-minute cramming
- Suggested question chips for quick starts
- Chat history persists during the session

### Dashboard
- Statistics cards: Total Plans, Completed Tasks, Upcoming Exams, and Study Streak
- Recent Study Plans with mini progress rings and exam countdowns
- Upcoming Exams list with day countdowns
- Study streak calculation based on consecutive days with completed tasks

### Reminder System
- Configurable daily reminder time in Settings
- Browser notification integration
- Automatic daily reminder before the scheduled study time
- Test notification button

### PDF Export
- "Download Study Plan" button on the planner page
- Exports a clean, printable PDF containing:
  - Subject name
  - Exam date
  - Study hours per day
  - Full daily schedule with task titles, topics, durations, and completion status
  - Progress bar with percentage

### User Profile
- Editable full name and avatar URL
- Email display (read-only)
- Profile avatar with initials fallback
- Account creation date

### Settings
- Dark / Light mode toggle (persisted)
- Notification toggle with reminder time picker
- Clear Study History (deletes all plans and tasks, with confirmation)
- Delete Account (permanently removes all data, with confirmation)
- Sign out

### UI & UX
- Fully responsive design — optimized for mobile, tablet, and desktop
- Smooth animations: staggered card entrances, fade-ins, scale-ins, hover transitions
- Loading spinners during async operations
- Success and error toast notifications
- Empty state screens with calls to action
- Consistent blue-based color system with light and dark themes

### Legal Pages
- Privacy Policy page (accessible from the sign-in screen)
- Terms of Service page (accessible from the sign-in screen)
- Documents data handling, user rights, and account deletion

---

## AI Feature & System Prompt

The application includes two AI-driven features:

### 1. AI Study Plan Generator

The study plan generator uses a **rule-based AI system** that matches the student's subject to a curated knowledge base of topics and task templates, then generates a phased daily schedule.

**System Instructions (Logic):**

```
Given the user's input (subject, exam date, daily study hours):

1. IDENTIFY the subject by matching keywords in the subject name:
   - mathematics, biology, biochemistry, english, computer science,
     physics, chemistry, history, economics
   - If no match, use the GENERIC subject configuration.

2. CALCULATE total days until the exam date.

3. DETERMINE tasks per day based on daily study hours:
   - <= 1.5 hours → 1 task/day
   - <= 3 hours  → 2 tasks/day
   - <= 5 hours  → 3 tasks/day
   - > 5 hours   → 4 tasks/day

4. ASSIGN each day to a PHASE based on progress through the plan:
   - 0–20%   → Foundation (learn theory, take notes)
   - 20–45%  → Practice (solve problems, apply concepts)
   - 45–70%  → Deep Dive (tackle challenging problems, analyze)
   - 70–90%  → Review (active recall, review mistakes)
   - 90–100% → Assessment (timed tests, self-evaluation)

5. For each day, select the appropriate phase template and fill in
   the next topic from the subject's topic list (cycling through all
   topics before repeating).

6. SPECIAL DAYS:
   - Sundays: Rest & recharge day (for plans > 10 days)
   - Last 2 days: Full mock exam (for plans > 5 days)
   - Third-to-last day: Final mixed revision (for plans > 7 days)

7. OUTPUT a list of tasks, each with: day number, date, title,
   description, topic, and duration in minutes.
```

### 2. AI Study Assistant (Chat)

The chat assistant uses a **keyword-matching response system** to provide instant, short, and helpful answers to common study questions.

**System Instructions (Logic):**

```
You are an AI Study Assistant embedded in a study planning app.
Your role is to give SHORT, HELPFUL answers to study-related questions.

When a student asks a question:
1. MATCH the question against known topics using keyword patterns:
   - motivation / lazy / unmotivated → motivation tips
   - memory / remember / recall / flashcard → memorization techniques
   - time management / schedule / productive → time management tips
   - procrastination / delay / put off → anti-procrastination strategies
   - anxiety / stress / nervous / panic → exam anxiety management
   - short time / last minute / cram → last-minute study tips
   - focus / concentration / distract → focus improvement tips
   - notes / summarize → note-taking techniques
   - sleep / rest / tired → sleep and study tips
2. If no keyword matches, return GENERAL study tips covering
   active recall, focused blocks, teaching, consistency, and wellness.
3. Keep each answer to 5 concise numbered tips.
4. Maintain a friendly, encouraging tone.
5. Preserve chat history during the session.
```

---

## Technologies Used

| Technology | Purpose |
|---|---|
| **React** | Frontend UI library for building component-based interfaces |
| **TypeScript** | Type-safe JavaScript for robust, maintainable code |
| **Vite** | Fast build tool and development server |
| **Supabase** | Backend-as-a-Service: authentication, PostgreSQL database, row-level security, and data persistence |
| **Tailwind CSS** | Utility-first CSS framework for responsive, consistent styling |
| **Lucide React** | Icon library for clean, modern UI icons |
| **Bolt.new** | AI-powered development platform used to build and deploy the application |
| **GitHub** | Version control and source code hosting |

---

## Screenshots

### 1. Authentication Screen

<!-- Screenshot: Sign in / Sign up page with email and password fields -->
![Authentication Screen](./screenshots/auth-screen.png)

*The sign-in and sign-up screen with email/password authentication, Privacy Policy and Terms of Service links.*

---

### 2. Study Plan Generator & Progress Tracking

<!-- Screenshot: Planner page showing a generated study plan with progress ring, daily tasks, and today's tasks -->
![Study Plan Generator](./screenshots/study-planner.png)

*The planner page with an AI-generated study schedule, progress ring, daily task list, and PDF export button.*

---

### 3. Dashboard with Statistics

<!-- Screenshot: Dashboard page showing stats cards, recent plans, and upcoming exams -->
![Dashboard](./screenshots/dashboard.png)

*The dashboard with statistics cards (total plans, completed tasks, upcoming exams, study streak), recent plans, and exam countdowns.*

---

### 4. AI Chat Assistant

<!-- Screenshot: Floating chat widget open with a conversation -->
![AI Chat Assistant](./screenshots/chat-assistant.png)

*The floating AI chat assistant providing instant study tips and advice.*

---

### 5. Settings Page

<!-- Screenshot: Settings page showing dark mode toggle, notification settings, and danger zone -->
![Settings](./screenshots/settings.png)

*The settings page with dark mode toggle, notification preferences, and account management options.*

---

## How to Run Locally

### Prerequisites

- **Node.js** v18 or higher
- **npm** (comes with Node.js)

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/ai-study-planner.git
   cd ai-study-planner
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the project root with the following variables (replace with your own Supabase project credentials):

   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   > These values can be found in your Supabase project dashboard under **Settings > API**.

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`.

5. **Build for production**

   ```bash
   npm run build
   ```

   The production-ready files will be generated in the `dist/` folder.

6. **Preview the production build**

   ```bash
   npm run preview
   ```

### Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Starts the Vite development server with hot reload |
| `npm run build` | Builds the app for production |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs ESLint to check for code quality issues |
| `npm run typecheck` | Runs the TypeScript compiler to check for type errors |

---

## Project Structure

```
ai-study-planner/
├── public/                     # Static assets
├── screenshots/               # Placeholder folder for README screenshots
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── ChatWidget.tsx      # Floating AI chat assistant
│   │   ├── EmptyState.tsx      # Empty state screen component
│   │   ├── Footer.tsx           # Page footer with navigation
│   │   ├── LegalPageLayout.tsx # Shared layout for legal pages
│   │   ├── Navbar.tsx           # Top navigation bar with auth controls
│   │   ├── ProgressRing.tsx     # Circular progress indicator
│   │   ├── Spinner.tsx          # Loading spinner component
│   │   └── Toast.tsx            # Toast notification system
│   ├── lib/                    # Business logic and utilities
│   │   ├── auth.tsx            # Authentication context and provider
│   │   ├── notifications.ts    # Browser notification helpers
│   │   ├── pdfExport.ts         # PDF export utility
│   │   ├── quotes.ts            # Motivational quotes data
│   │   ├── studyPlanner.ts      # AI study plan generation engine
│   │   ├── supabase.ts          # Supabase client and shared types
│   │   └── useTheme.ts          # Dark/light theme hook
│   ├── pages/                  # Application pages
│   │   ├── About.tsx            # About page
│   │   ├── Assistant.tsx        # AI assistant page with tips
│   │   ├── Auth.tsx             # Login / signup page
│   │   ├── Dashboard.tsx        # Statistics dashboard
│   │   ├── Home.tsx             # Landing page
│   │   ├── Planner.tsx          # Study plan generator and tracker
│   │   ├── PrivacyPolicy.tsx    # Privacy policy page
│   │   ├── Profile.tsx          # User profile editor
│   │   ├── Settings.tsx         # App settings page
│   │   └── TermsOfService.tsx   # Terms of service page
│   ├── App.tsx                 # Root component with routing and auth gate
│   ├── main.tsx                # Application entry point
│   └── index.css               # Global styles and Tailwind imports
├── supabase/
│   └── migrations/             # Database migration SQL files
├── .env                        # Environment variables (not committed)
├── index.html                  # HTML entry point
├── package.json                # Dependencies and scripts
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── vite.config.ts              # Vite configuration
```

---

## Security & Privacy

- **Passwords** are never stored in the database. They are securely hashed by Supabase Auth using bcrypt.
- **Row Level Security (RLS)** is enabled on every database table, ensuring users can only read and write their own data.
- **User emails** are used exclusively for authentication and associating study data with the user's account. They are never sold, shared, or used for marketing.
- **Account deletion** is available in Settings and permanently removes all user data.
- All data transmission is encrypted via HTTPS/TLS.

For full details, see the in-app **Privacy Policy** and **Terms of Service** pages.

---

## License

This project is submitted as part of a university final project. All rights reserved.

---

## Acknowledgements

- Built with [Bolt.new](https://bolt.new) — AI-powered web development platform
- Backend powered by [Supabase](https://supabase.com)
- Icons by [Lucide](https://lucide.dev)
- Deployed on Bolt.host
