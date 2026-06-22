# Celestial Explorer: Command Terminal

A high-fidelity space exploration dashboard powered by NASA Open APIs and Gemini Intelligence. Designed with a brutalist, command-center aesthetic, this application provides real-time telemetry from across the cosmos.

## 🌌 Core Modules

### 1. Command Briefing
- **Real-time News Feed**: Aggregated space exploration updates.
- **Secure Link Status**: Displays current transmission health and archive depth.

### 2. Vision Registry (APOD)
- **Deep Scan Analysis**: Uses Gemini AI to audit and explain today's Astronomy Picture of the Day.
- **High-Definition Capture**: HD media acquisition from NASA's daily vision logs.

### 3. Observatory Terminal
- **Lunar Analysis**: Real-time moon phase calculation and illumination percentage.
- **Celestial Calendar**: Upcoming meteor showers, eclipses, and spacecraft missions.

### 4. Mars Expedition (Rover Logs)
- **Rover Selection**: Access Curiosity, Opportunity, and Spirit's image archives.
- **Optical Subsystems**: Filter by specific camera modules (MAST, FHAZ, NAVCAM).
- **Temporal Markers**: Query specific Martian Sols.

### 5. Orbital Ops (ISS Tracker)
- **Live Signal**: Real-time GPS coordinates of the International Space Station.
- **Active Registry**: Live count and bio-registry of crew currently in orbit.

### 6. Proximity Audit (NEOs)
- **Impact Sensors**: Tracks Near-Earth Objects (asteroids) for the current temporal cycle.
- **Hazardous Alerts**: Highlights objects identified as potentially hazardous.

### 7. Galactic Archives (NASA Search)
- **Multi-Media Query**: Search NASA's comprehensive image and video library.
- **Asset Metadata**: View detailed acquisition context and source nodes.

## 🛠 Technical Architecture

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS (Cosmic Dark Theme)
- **Animation**: Motion (formerly Framer Motion)
- **Data Layer**: NASA Open APIs (APOD, Mars Rover, ISS, NEOs)
- **Intelligence**: Google Gemini (Deep-layer visual audit)
- **Icons**: Lucide React

## 🚀 Environment Configuration

To operate at full capacity, provide the following environment variables:

```env
NASA_API_KEY=YOUR_NASA_KEY
GEMINI_API_KEY=YOUR_GEMINI_KEY
```

*Note: Default demographic mode is enabled if API keys are missing.*

---
**© 2026 CELESTIAL SYSTEMS // ALL SYSTEMS NOMINAL**
