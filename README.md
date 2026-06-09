# Astronomy Dashboard

This is a single-page HTML application designed to provide astronomy enthusiasts with a lightweight, responsive dashboard for NASA imagery and astronomy reference data.

## Features

*   **Astronomy Picture of the Day (APOD)**: Displays the daily astronomy image, title, description, copyright, API version, and HD image link when available.
*   **International Space Station (ISS) Location**: Shows the real-time latitude, longitude, API status, measurement timestamp, and current crew list when the Open Notify API is available.
*   **Moon Phase**: Calculates and displays the current moon phase.
*   **Near Earth Objects (NEOs)**: Displays hazardous status, diameter, velocity, miss distance, approach time, absolute magnitude, orbiting body, and JPL record links.
*   **Mars Rover Photos Integration**: Fetches and displays photos from NASA's Mars Rover Photos API with camera filtering, mission stats, Earth dates, photo IDs, rover status, and modal previews.
*   **NASA Media Library Search**: Allows users to search images, videos, and audio from NASA's public media library, including NASA IDs, descriptions, centers, dates, keywords, metadata links, and downloadable asset links.
*   **Planet Reference Cards**: Displays static summary data for the planets.
*   **Celestial Events**: Includes a filterable event calendar for meteor showers, Moon events, and planet highlights.
*   **Observing Planner**: Estimates session quality from cloud cover, light pollution, and moonlight.
*   **Target Suggestions**: Provides practical observing targets with recommended gear and timing.
*   **Favorites**: Saves APOD entries locally in the browser for later viewing.
*   **Theme Toggle**: Switches between dark and light visual themes and saves the preference locally.
*   **Space News Section**: Displays curated static space-discovery headlines.
*   **Dark Visual Theme**: Uses a night-friendly visual design by default.
*   **Responsive UI**: Adapts to various screen sizes (mobile, tablet, desktop).

## Development Log

For a detailed log of development progress, see [development_log.md](development_log.md).

## How to Use

To run this application, simply open the `index.html` file in your web browser.

## API Usage

This dashboard utilizes the following public APIs:

*   **NASA Astronomy Picture of the Day (APOD) API**: For daily astronomy images.
*   **NASA Mars Rover Photos API**: For rover image galleries.
*   **NASA Image and Video Library API**: For public image search.
*   **NASA Near Earth Object Web Service**: For asteroid approach data.
*   **Open Notify APIs**: For real-time International Space Station coordinates and crew data.

## Development Notes

*   All HTML, CSS, and JavaScript are contained within a single `index.html` file for simplicity and portability.
*   API keys are embedded directly in the `index.html` file. For production environments, it is highly recommended to manage API keys more securely (e.g., via backend services or environment variables).
*   Dynamic API content is rendered with basic HTML escaping to reduce injection risk from third-party data.
*   The app intentionally loads only the first tab's network data on startup. Other API-backed tabs load when selected.
*   Favorites and theme preferences are stored in browser `localStorage`.

## Suggested Improvements and Future Enhancements

*   **Modularize the Codebase**: Break the monolithic `index.html` file into dedicated HTML, CSS, and JavaScript bundles or migrate to a lightweight build tool (e.g., Vite) for better maintainability and caching.
*   **Harden API Interactions**: Introduce a small proxy backend or serverless functions to secure API keys, add caching, and handle rate limiting gracefully.
*   **Progressive Web App (PWA) Support**: Add a web app manifest and service worker with smarter caching strategies so the dashboard can be installed and used reliably offline.
*   **Accessibility Enhancements**: Audit color contrast, provide ARIA labels for dynamic content, and ensure keyboard navigation works across all interactive components.
*   **User Location and Star Chart**: Add geolocation, manual coordinates, and an interactive star chart using a dedicated astronomy visualization library.
*   **Sharing**: Add Web Share API support for APOD and gallery images.
*   **User Personalization**: Allow users to configure default data sources (e.g., favorite rover, preferred events) and persist preferences via local storage or synced storage.
*   **Observation Planner**: Offer a planner that combines local weather forecasts, light pollution data, and upcoming events to help users schedule viewing sessions.
*   **Community Sharing**: Enable authenticated users to share curated observing lists or favorite APOD collections with friends via generated links.
*   **Educational Mode**: Add contextual tooltips, glossary entries, and guided tours to help newcomers understand astronomical terms and visualizations.

## Contributing

Feel free to fork this repository and contribute to its development.
