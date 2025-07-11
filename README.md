# Astronomy Dashboard

This is a single-page HTML application designed to provide astronomy enthusiasts with a lightweight, responsive, and offline-capable dashboard.

## Features

*   **Astronomy Picture of the Day (APOD)**: Displays the daily astronomy image, title, and description from NASA's APOD API.
*   **International Space Station (ISS) Location**: Shows the real-time latitude and longitude of the ISS.
*   **Moon Phase**: Calculates and displays the current moon phase.
*   **User Location**: Detects user's geographical coordinates (with fallback for manual input).
*   **Upcoming Celestial Events**: Provides a static list of notable celestial events.
*   **Favorites**: Allows users to save their favorite APOD images to local storage and view them in a collapsible list.
*   **Dark Mode**: Toggles between dark and light themes, with the preference saved locally.
*   **Offline Support**: Caches APOD and ISS data for offline viewing.
*   **Social Sharing**: Enables sharing of APOD images via Web Share API or by copying the URL.
*   **Responsive UI**: Adapts to various screen sizes (mobile, tablet, desktop).
*   **Basic Star Chart Interactivity**: Conceptual zoom and pan controls for a placeholder star chart.

## How to Use

To run this application, simply open the `index.html` file in your web browser.

## API Usage

This dashboard utilizes the following public APIs:

*   **NASA Astronomy Picture of the Day (APOD) API**: For daily astronomy images.
*   **Open-Notify ISS Location API**: For real-time International Space Station coordinates.

## Development Notes

*   All HTML, CSS, and JavaScript are contained within a single `index.html` file for simplicity and portability.
*   API keys are embedded directly in the `index.html` file. For production environments, it is highly recommended to manage API keys more securely (e.g., via backend services or environment variables).

## Contributing

Feel free to fork this repository and contribute to its development.
