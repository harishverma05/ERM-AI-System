# 🛡️ AI ERM System — Frontend

**Intelligent Emergency Response Management System**
Real-time incident command, autonomous AI triage, geospatial tracking, and predictive analytics — built with React 19, TypeScript, Vite, and Tailwind CSS v4.

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **npm** v9+ (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/harishverma05/ERM-AI-System.git
cd ERM-AI-System/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be live at **http://localhost:3000**

---

## 📁 Project Structure

```
frontend/
├── index.html                  # Entry HTML (Vite SPA entry point)
├── package.json                # Dependencies & scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite + Tailwind + React plugin config
│
└── src/
    ├── main.tsx                # App bootstrap (ReactDOM.createRoot)
    ├── App.tsx                 # Root component — routing, state, layout
    ├── index.css               # Global styles & Tailwind imports
    ├── types.ts                # Shared TypeScript interfaces & types
    │
    ├── data/
    │   └── mockData.ts         # Data layer (incidents, units, telemetry)
    │
    └── components/
        ├── Header.tsx          # Top bar — alerts, clock, user profile
        ├── Sidebar.tsx         # Navigation sidebar — screen routing
        │
        └── screens/
            ├── LoginScreen.tsx             # Role-based authentication UI
            ├── LiveDashboard.tsx           # Real-time command dashboard
            ├── DispatchCenter.tsx          # AI-powered unit dispatch console
            ├── IncidentMapExpanded.tsx      # Geospatial tactical map
            ├── ReportIncident.tsx          # Incident intake form + AI triage
            ├── AnalyticsReports.tsx        # KPIs, charts, incident table
            ├── SeverityPredictorScreen.tsx  # AI severity classification
            ├── RouteOptimizerScreen.tsx     # Dynamic route optimization
            ├── ResourceTrackerScreen.tsx    # Fleet & resource monitoring
            ├── ResponseLogsScreen.tsx       # Immutable audit trail logs
            └── SettingsScreen.tsx           # System configuration
```

---

## 🖥️ Screens Overview

| Screen | Route Key | Description |
|--------|-----------|-------------|
| **Login** | `login` | Role-based auth (Admin, Coordinator, Field) |
| **Live Dashboard** | `live-dashboard` | Real-time telemetry, incident feed, tactical map |
| **Dispatch Center** | `dispatch-center` | AI unit assignment, fleet coordination, GPS tracking |
| **Incident Map** | `incident-map` | Full-screen geospatial map with layer controls |
| **Report Incident** | `report-incident` | Intake form with AI-powered severity classification |
| **Analytics & Reports** | `analytics-reports` | KPI cards, zone response times, incident breakdown |
| **Severity Predictor** | `severity-predictor` | ML-based incident severity classification |
| **Route Optimizer** | `route-optimizer` | Dijkstra + RL dynamic routing with traffic preemption |
| **Resource Tracker** | `resource-tracker` | Real-time fleet status and availability |
| **Response Logs** | `response-logs` | Immutable event audit trail with node-level telemetry |
| **Settings** | `settings` | System configuration and user preferences |

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React 19 |
| **Language** | TypeScript 5.8 |
| **Build Tool** | Vite 6 |
| **Styling** | Tailwind CSS v4 |
| **Animations** | Motion (Framer Motion) |
| **Icons** | Material Symbols + Lucide React |
| **Fonts** | Inter, JetBrains Mono (Google Fonts) |
| **AI Integration** | Google Gemini API (`@google/genai`) |

---

## 📜 Available Scripts

```bash
# Start development server with HMR
npm run dev

# Build production bundle
npm run build

# Preview production build locally
npm run preview

# Type-check without emitting files
npm run lint

# Clean build artifacts
npm run clean
```

---

## 🏗️ Architecture

### State Management

The app uses **React `useState`** for local component state, with core tactical state lifted to `App.tsx`:

- **`incidents`** — Active incident queue
- **`units`** — Emergency unit fleet status
- **`telemetry`** — System-wide operational metrics
- **`selectedIncidentId`** — Currently focused incident

### Data Flow

```
App.tsx (State Owner)
├── Header.tsx (navigation, alerts)
├── Sidebar.tsx (screen routing, user profile)
└── screens/
    ├── LiveDashboard    ← reads incidents, telemetry
    ├── DispatchCenter   ← reads/writes incidents, units
    ├── ReportIncident   ← creates new incidents
    └── ...              ← each screen receives relevant props
```

### Type System

All core data types are defined in `src/types.ts`:

- **`Screen`** — Union type for all 11 screen routes
- **`UserRole`** — `'admin' | 'coordinator' | 'field'`
- **`Incident`** — Full incident record (location, severity, units, AI accuracy)
- **`EmergencyUnit`** — Unit status, ETA, category, match score
- **`TelemetrySummary`** — System-wide operational metrics
- **`SeverityLevel`** — `'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'`

---

## 🎨 Design System

- **Color Palette**: Dark tactical theme (`#080d1d` base, `#161b2b` cards, `#25293a` borders)
- **Accent Colors**: Cyan (`#4cd7f6`), Red/Critical (`#ff5451`), Amber/Warning (`#ffb95f`)
- **Typography**: Inter (UI) + JetBrains Mono (telemetry/data)
- **Components**: Glassmorphism panels, animated status indicators, gradient badges

---

## 📄 License

This project is private. All rights reserved.

---

<div align="center">
  <strong>Built with ❤️ for emergency response teams</strong>
</div>
