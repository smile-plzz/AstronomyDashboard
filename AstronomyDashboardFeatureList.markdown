# Astronomy Dashboard Feature List (Single-Page HTML Site)

The Astronomy Dashboard is designed as a single-page HTML site, delivering a lightweight, responsive, and offline-capable experience for astronomy enthusiasts using a single HTML file with embedded or external scripts and styles.

## Core Features
- **Real-Time Data Fetching**
  - Display a daily astronomy image with title, date, and description from a public API.
  - Show real-time International Space Station (ISS) location (latitude, longitude) with periodic updates.
  - Present the current moon phase using a date-based calculation or static data.
  - List upcoming celestial events (e.g., meteor showers, eclipses) from static or cached data.

- **Interactive Star Chart**
  - Render a graphical star chart showing major constellations and stars based on static data or user coordinates.
  - Support zoom (scroll) and pan (drag) interactions.
  - Overlay real-time ISS position on the chart.
  - Adjust chart based on user’s location (browser geolocation or manual input).

- **Local Storage for Favorites**
  - Save images or events locally with metadata (e.g., ID, title, URL).
  - Display favorites in a collapsible list with thumbnails for images and text for events.
  - Provide delete options for favorites, limiting storage to ~10 items.

- **Dark Mode and Responsive UI**
  - Toggle between dark (night-optimized) and light modes, stored locally.
  - Ensure responsive design for mobile, tablet, and desktop within a single HTML page.
  - Use high-contrast, low-brightness colors for night viewing.

## Enhanced Features
- **User Location Integration**
  - Fetch user coordinates via browser geolocation for tailored star charts and event visibility.
  - Offer manual location input (e.g., city or coordinates) as a fallback.

- **Celestial Event Highlights**
  - Show a compact list of upcoming events with dates and descriptions.
  - Highlight events visible from the user’s location.

- **Simplified AR View**
  - Provide a lightweight augmented reality mode for mobile, overlaying star/constellation markers when pointing at the sky.
  - Keep AR minimal to maintain performance within a single HTML page.

- **Star Chart Enhancements**
  - Add toggleable layers for constellations or planets using static data.
  - Include a search to highlight specific stars or constellations.
  - Allow date/time selection for the star chart via a dropdown.

- **Offline Support**
  - Cache images, ISS data, and events locally for offline access.
  - Render a static star chart with cached data when offline.
  - Show an “Offline Mode” banner when network is unavailable.

- **Social Sharing**
  - Share images or events via browser sharing (e.g., social media, email).
  - Fallback to copying URLs to clipboard.
  - Generate star chart snapshots as images for sharing.