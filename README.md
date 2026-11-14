# Arjun C. – Full-Stack Developer Portfolio

A personal portfolio built with **React.js**, **Tailwind CSS**, **Framer Motion**, **Express.js**, and **MongoDB Atlas**, featuring **Real-Time Coding Activity (LeetCode & GitHub)** and **Technical Achievements**.

---

## 🚀 Tech Stack

### Frontend
- **React.js (Vite)** – High-performance component-driven architecture
- **Tailwind CSS** – Custom dark aesthetic (`#050505` base, `#0B0D13` coding cards, `#FFD600` yellow & `#00E5FF` cyan accents)
- **Framer Motion** – Spring animations, typewriter hero, tab switches, and responsive interactions
- **Lucide React & Custom Brand SVGs** – Scalable vector icons
- **Axios** – API client with auto-sync and error handling

### Backend
- **Node.js & Express.js** – REST API server
- **LeetCode GraphQL Integration** – Live user statistics and 365-day submission heatmap
- **GitHub GraphQL & Contributions API** – Real contribution calendar with 15-minute caching
- **MongoDB Atlas & Mongoose** – Cloud database for contact messages
- **CORS & Rate Limiting** – Spam-protected, secure endpoints

---

## ⚡ Live Coding Synchronization

- **Profiles**:
  - LeetCode: [arjun06c](https://leetcode.com/u/arjun06c/)
  - GitHub: [arjun06c](https://github.com/arjun06c)
- **Automatic Sync**: Refreshes on page load and every 15 minutes.
- **Tab Visibility Detection**: Pauses background polling when hidden; checks and refreshes when returning.
- **Manual Trigger**: Dedicated refresh button with loading indicator.
- **Cache Strategy**: 15-minute in-memory server-side cache with stale fallback if external platforms are down.

---

## 📁 Project Architecture

```
Arjun_Portfolio/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BackgroundGlow.jsx           # Ambient yellow radial gradients
│   │   │   ├── Navbar.jsx                   # Floating pill navbar with active indicators
│   │   │   ├── Hero.jsx                     # Portrait with dual rotated frames & typewriter text
│   │   │   ├── about/                       # About Section with interactive vertical timeline
│   │   │   │   ├── About.jsx                # Main 2-column layout (Mindset + Timeline)
│   │   │   │   ├── AboutIntro.jsx           # Engineering Mindset heading & intro
│   │   │   │   ├── AboutHighlights.jsx      # 3 core engineering highlights with icons
│   │   │   │   ├── AboutTabs.jsx            # Education & Experience switcher tabs
│   │   │   │   ├── EducationTimeline.jsx    # Education timeline cards
│   │   │   │   ├── ExperienceTimeline.jsx   # Experience timeline cards & tech badges
│   │   │   │   └── TimelineCard.jsx         # Reusable timeline card with cyan node markers
│   │   │   ├── Skills.jsx                   # Tab switcher & hover-reactive skill cards
│   │   │   ├── CodingDashboard.jsx          # Live LeetCode & GitHub stats + heatmaps
│   │   │   ├── CodingHeatmap.jsx            # 365-day contribution calendar with hover tooltips
│   │   │   ├── Projects.jsx                 # Featured project cards, live links & detail modal
│   │   │   ├── Services.jsx                 # 3 service cards with custom icons & feature lists
│   │   │   ├── Achievements.jsx             # 6 hackathon and event cards (3x2 grid)
│   │   │   ├── Contact.jsx                  # Contact info cards + live API form
│   │   │   └── Footer.jsx                   # Minimalist footer with socials and quick navigation
│   │   ├── data/
│   │   │   └── portfolioData.js             # Centralized profile, projects, skills, achievements
│   │   ├── services/
│   │   │   └── api.js                       # Axios API service client
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                        # MongoDB Atlas connection
│   │   ├── services/
│   │   │   └── codingService.js             # Live LeetCode & GitHub fetchers, heatmap builder, cache
│   │   ├── controllers/
│   │   │   ├── codingController.js          # LeetCode and GitHub API endpoints
│   │   │   └── contactController.js         # Contact message submissions & retrieval
│   │   ├── models/
│   │   │   └── Contact.js                   # Mongoose Contact schema
│   │   ├── routes/
│   │   │   ├── codingRoutes.js              # /api/coding router
│   │   │   └── contactRoutes.js             # /api/contact router
│   │   ├── middleware/
│   │   │   └── errorMiddleware.js           # 404 & error handlers
│   │   ├── app.js                           # Express app setup & CORS
│   │   └── server.js                        # Server entry point
│   ├── .env                                 # Environment configuration
│   ├── .env.example
│   └── package.json
└── package.json
```

---

## 🌐 API Endpoints

### Coding & Heatmaps
- `GET /api/coding/summary` — Unified LeetCode + GitHub stats and heatmaps (`?refresh=true` for manual sync)
- `GET /api/coding/leetcode` — Problem counts (Easy, Medium, Hard, Total), streak, rank
- `GET /api/coding/leetcode/heatmap` — 365 days of submission counts and intensity levels
- `GET /api/coding/github` — Total contributions and profile info
- `GET /api/coding/github/heatmap` — Complete GitHub contribution calendar

### Contact & Health
- `GET  /api/health` — API health check
- `POST /api/contact` — Submit inquiry (stored in MongoDB Atlas)
- `GET  /api/contact` — View inquiries (admin view)

---

## ⚡ Running Locally

### 1. Start Backend Server
```bash
cd backend
npm install
npm run dev
# Server runs on http://localhost:5000
```

### 2. Start Frontend Dev Server
```bash
cd frontend
npm install
npm run dev
# Vite runs on http://localhost:5173
```
