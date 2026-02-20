# Cinematic Scripture Renderer

> A professional, real-time scripture projection system for live streams, church services, and cinematic visual presentations.


---

## Overview

The Cinematic Scripture Renderer is built around a **Director–Renderer architecture** that cleanly separates your control interface from your display output.

The **Renderer** runs on any screen your audience sees — a projector, broadcast monitor, or OBS scene — and displays fully animated, cinema-quality scripture text. The **Director** runs on any phone or tablet and gives you complete, real-time control of what appears on that screen.

```
┌─────────────────────────┐                    ┌──────────────────────────┐
│     Director /remote    │                    │       Renderer  /        │
│                         │                    │                          │
│  • Book / Chapter / Verse│ ─── Socket.io ──▶ │  • Cinematic animations  │
│  • Live preview          │   (real-time sync) │  • Word-by-word entrance │
│  • PUSH LIVE button      │                    │  • Aurora backgrounds    │
│  • Theme / size controls │                    │  • Particle system       │
└─────────────────────────┘                    └──────────────────────────┘
       Your Phone / Tablet                         Projector / OBS / Screen
```

---

## Table of Contents

- [Quick Start](#quick-start)
- [OBS Studio Setup](#obs-studio-setup)
- [How to Use](#how-to-use)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [License](#license)

---

## Quick Start

### Option 1 — Docker (Recommended)

No Node.js installation required.

```bash
git clone https://github.com/Francis-Xavier-S/Bible-Renderer.git
cd Bible-Renderer
docker-compose up -d
```

| Interface | URL |
|---|---|
| Renderer (Display Screen) | `http://localhost:1820` |
| Director (Remote Control) | `http://localhost:1820/remote` |

To stop:

```bash
docker-compose down
```

---

### Option 2 — Node.js (NPM)

Requires **Node.js 20 or higher**.

```bash
git clone https://github.com/Francis-Xavier-S/Bible-Renderer.git
cd Bible-Renderer
npm install
npm start
```

| Interface | URL |
|---|---|
| Renderer (Display Screen) | `http://localhost:1820` |
| Director (Remote Control) | `http://localhost:1820/remote` |

---

## OBS Studio Setup

The Renderer is built to run as an OBS Browser Source with zero configuration friction.

**1. Add a Browser Source**

In OBS, click `+` under the Sources panel and select **Browser**.

**2. Configure the source**

| Setting | Value |
|---|---|
| URL | `http://localhost:1820` |
| Width | `1920` |
| Height | `1080` |
| FPS | `60` |

**3. Transparent overlay (optional)**

To layer scripture over a video feed with a transparent background, paste this into the **Custom CSS** field in OBS:

```css
body {
  background: transparent !important;
}
.stage {
  background: none !important;
}
```

**4. Control it live**

Open `http://localhost:1820/remote` on your phone or a second monitor. Every verse you push from the Director updates the OBS source in real time.

---

## How to Use

### The Renderer

Open `http://localhost:1820` on the display your audience sees — a projector, broadcast monitor, or second screen captured in OBS. On first load it shows a neutral **"Waiting for signal..."** state with the full visual environment already running.

### The Director

Open `http://localhost:1820/remote` on any smartphone, tablet, or secondary device connected to the same network.

**Standard workflow:**

1. **Select** a Book, Chapter, and Verse from the dropdown pickers
2. **Preview** the fetched text in the preview window to confirm it before it goes live
3. **Push Live** — tap the green **PUSH LIVE** button. The Renderer animates the verse in word-by-word
4. **Adjust** — open the ⚙️ panel at any time during the session to change the theme color or font size. Changes apply instantly without interrupting the current display

---

## Features

### Cinematic Display Engine

The Renderer is designed to look broadcast-quality out of the box.

| Feature | Description |
|---|---|
| Aurora Backgrounds | Animated, color-shifting blob gradients that pulse and breathe continuously |
| Word-by-Word Transitions | Each word enters with staggered fade, blur-dissolve, and depth movement |
| Particle System | 60 floating light particles rendered in real-time on an HTML5 Canvas |
| Film Grain Overlay | Subtle noise texture gives the display a premium cinematic texture |
| Vignette | Radial darkening draws the audience's eye to the text automatically |
| Dynamic Theming | Theme color propagates instantly across all background layers |

### Director Pro Interface

A fully mobile-responsive remote control accessible from any device on the same network.

- Scripture lookup via Book, Chapter, and Verse selectors backed by the Bible API
- Live preview panel — confirm the exact text before it goes to the screen
- Single-tap **PUSH LIVE** sends the verse with a smooth animated entrance
- Real-time font size adjustment without interrupting the display
- Theme color picker that updates the entire visual environment live
- Ambient background music toggle

### Real-Time Sync Engine

- All state changes broadcast instantly via Socket.io to every connected client
- New connections receive the current display state immediately on join
- No page refreshes, no polling, no delay

---

## Tech Stack

| Layer | Technology |
|---|---|
| Server | Node.js, Express.js |
| Real-Time Communication | Socket.io |
| Visual Engine | HTML5 Canvas API, CSS Animations |
| Typography | Playfair Display, Cinzel — Google Fonts |
| Scripture Data | [Bible-API.com](https://bible-api.com) |
| Containerization | Docker, Docker Compose |

---

## Project Structure

```
Bible-Renderer/
├── server.js           # Express server, Socket.io hub, and state management
├── renderer.html       # Cinematic display output — the screen your audience sees
├── controller.html     # Director remote interface — your live control panel
├── package.json
└── docker-compose.yml
```

**`server.js`** holds the authoritative application state. When a Director pushes an update, the server merges the change and re-broadcasts the full state to all connected clients — including any Renderers that join mid-session.

**`renderer.html`** is a self-contained visual engine. It handles the particle system, background animations, and all text transition logic independently of the server after initial sync.

**`controller.html`** is the Director interface. It fetches scripture from the Bible API, renders a preview, and emits `update` events to the server on user action.

---

## License

This project is licensed under the **MIT License**.

---

*Built for worship teams, live streamers, and visual storytellers.*
