# Astronomy Dashboard

This is a single-page HTML application designed to provide astronomy enthusiasts with a lightweight, responsive, and offline-capable dashboard.

## Features

*   **Astronomy Picture of the Day (APOD)**: Displays the daily astronomy image, title, and description from NASA's APOD API.
*   **International Space Station (ISS) Location**: Shows the real-time latitude and longitude of the ISS.
*   **Moon Phase**: Calculates and displays the current moon phase.
*   **User Location**: Detects user's geographical coordinates (with fallback for manual input).
*   **Upcoming Celestial Events**: Dynamically fetches and displays notable celestial events (Solar Flares, Coronal Mass Ejections).
*   **Near Earth Objects (NEOs)**: Displays information about potentially hazardous Near Earth Objects.
*   **Mars Rover Photos Integration**: Added a new section and JavaScript functionality to fetch and display the latest photos from NASA's Mars Rovers (Curiosity), with a sliding feature for user interactivity (left/right arrow navigation and single image preview).
*   **NASA Image and Video Library Search**: Allows users to search and view images and videos from NASA's extensive library.
*   **Interactive Star Chart**: Displays an interactive star chart using `d3-celestial` based on user's location, showing stars, constellations, and other celestial objects.
*   **Favorites**: Allows users to save their favorite APOD images to local storage and view them in a collapsible list.
*   **Dark Mode**: Defaults to dark mode with the option to toggle to light mode, with the preference saved locally.
*   **Offline Support**: Caches APOD and ISS data for offline viewing.
*   **Social Sharing**: Enables sharing of APOD images via Web Share API or by copying the URL.
*   **Responsive UI**: Adapts to various screen sizes (mobile, tablet, desktop).

## Development Log

For a detailed log of development progress, see [development_log.md](development_log.md).

## How to Use

To run this application, simply open the `index.html` file in your web browser.

## API Usage

This dashboard utilizes the following public APIs:

*   **NASA Astronomy Picture of the Day (APOD) API**: For daily astronomy images.
*   **Open-Notify ISS Location API**: For real-time International Space Station coordinates.

## Development Notes

*   All HTML, CSS, and JavaScript are contained within a single `index.html` file for simplicity and portability.
*   API keys are embedded directly in the `index.html` file. For production environments, it is highly recommended to manage API keys more securely (e.g., via backend services or environment variables).

## Suggested Improvements and Future Enhancements

*   **Modularize the Codebase**: Break the monolithic `index.html` file into dedicated HTML, CSS, and JavaScript bundles or migrate to a lightweight build tool (e.g., Vite) for better maintainability and caching.
*   **Harden API Interactions**: Introduce a small proxy backend or serverless functions to secure API keys, add caching, and handle rate limiting gracefully.
*   **Progressive Web App (PWA) Support**: Add a web app manifest and service worker with smarter caching strategies so the dashboard can be installed and used reliably offline.
*   **Accessibility Enhancements**: Audit color contrast, provide ARIA labels for dynamic content, and ensure keyboard navigation works across all interactive components.
*   **User Personalization**: Allow users to configure default data sources (e.g., favorite rover, preferred events) and persist preferences via local storage or synced storage.
*   **Observation Planner**: Offer a planner that combines local weather forecasts, light pollution data, and upcoming events to help users schedule viewing sessions.
*   **Community Sharing**: Enable authenticated users to share curated observing lists or favorite APOD collections with friends via generated links.
*   **Educational Mode**: Add contextual tooltips, glossary entries, and guided tours to help newcomers understand astronomical terms and visualizations.

## Contributing

Feel free to fork this repository and contribute to its development.
