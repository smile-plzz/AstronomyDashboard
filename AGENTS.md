# Project Persistence Rules

## Visual Language
- **Brutalist Aesthetic**: Maintain high-contrast, technical layouts using `border-white/5` and `bg-white/[0.02]`.
- **Typography**: Heavily prioritize `font-black`, `uppercase`, and `tracking-tighter` for headings. Use `font-mono` for all data displays.
- **Accents**: Use `indigo-500` as the primary action color. Default backgrounds should be near-black (`#0F0F11`).

## Component Guidelines
- **Tabbed Architecture**: All major features must be isolated within the `App.tsx` tab switcher.
- **Animated Entrances**: Every view transition must use simple fade-ins. Avoid bouncy or complex physics for this professional terminal theme.
- **Iconography**: Strictly use `lucide-react`.

## API Protocol
- **NASA_API_KEY**: Ensure all data fetching handles a missing key via a "DEMO_KEY" fallback safely.
- **AI Analysis**: Gemini audits should always focus on technical anomalies and educational depth rather than just summarizing.
