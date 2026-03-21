# Project Context: Base64 Developer Tool

This document is intended to provide AI agents with a comprehensive overview of the "Base64 Developer Tool" project. Read this file to understand the architecture, design patterns, and tech stack before suggesting or making changes.

## Overview
The Base64 Developer Tool is a modern, responsive, and SEO-friendly web application designed to allow developers to encode and decode Base64 strings instantly in their browsers. It strongly prioritizes client-side security (data never leaves the browser) while also exposing server-side API endpoints for AI orchestration tools.

## Tech Stack
- **Framework**: Astro (v4+)
- **Adapter**: `@astrojs/node` (Configured for Hybrid rendering to support both static pages and SSR API endpoints)
- **Styling**: Vanilla CSS (No Tailwind. Uses a custom design system with CSS variables for theming)
- **Language**: TypeScript & HTML/Astro syntax
- **Package Manager**: npm

## Architecture & File Structure

### Layout & Global Styles
- **`src/layouts/Layout.astro`**: The main foundational layout. Includes the `<html>` wrapper, SEO meta tags, JSON-LD structured data, the Navbar, and the Footer.
- **`src/styles/global.css`**: The core design system. It contains:
  - Base resets.
  - CSS Variables for **Light** and **Dark** themes.
  - Utility classes `.container`, `.text-center`, `.mt-4`, etc.
  - Button styles (`.btn`, `.btn-primary`, `.btn-secondary`).
  - Navbar, Language Switcher, and Theme Toggle styles (these were moved here to prevent Astro's scoped CSS issues during dynamic rendering).

### Core Components
- **`src/components/Base64Tool.astro`**: The heart of the application. It contains the Encode/Decode tabs, input textareas, live character counts, "Try Sample" functionality, and all the client-side JavaScript for handling UTF-8 encoding/decoding (`btoa`, `atob`, `encodeURIComponent`, `unescape`, etc.) and error handling.
- **`src/components/LanguagePicker.astro`**: A modern segmented pill control that displays available languages (EN, ES, FR) and navigates via `<a>` tags.
- **`src/components/ThemeToggle.astro`**: A bordered button with sun/moon SVG icons executing client-side JS to toggle the `data-theme` attribute on the `<html>` root and persist to `localStorage`.

### Pages & Routing (i18n)
- **`src/pages/index.astro`**: The default landing page serving the English version. Contains the hero section, the `Base64Tool`, feature cards, and educational SEO content.
- **`src/pages/[lang]/index.astro`**: Generates localized versions of the landing page for non-English locales (e.g., `/es/`, `/fr/`).
- **`src/i18n/ui.ts` & `src/i18n/utils.ts`**: Contains translation dictionaries and helper functions to derive the current language from relative URLs.

### Backend API (Server-Side)
- **`src/pages/api/encode.ts`**: POST endpoint accepting `{ "text": "..." }` and returns `{ "base64": "..." }`.
- **`src/pages/api/decode.ts`**: POST endpoint accepting `{ "base64": "..." }` and returns `{ "text": "..." }`.
- **`public/openapi.json`**: An OpenAPI specification documenting the API endpoints to make the tool discoverable for AI orchestrators.

## Key Design Principles
1. **Aesthetics**: Premium, modern, and dark-mode-first aesthetic. Avoid generic styling; rely on precise typography (Inter font), soft shadows, gradient accents, and glassmorphism (blurred navbar backgrounds).
2. **SEO**: Semantic HTML, comprehensive meta descriptions, and on-page educational content optimized for relevant keywords ("Base64 Encode Decode").
3. **Performance**: Client-side execution for the tool itself avoids server round-trips to enhance speed and user privacy. 
4. **Resilience**: The tool gracefully catches bad Base64 strings and unsupported characters, displaying meaningful error messages (e.g., pinpointing the exact position of an invalid character during decoding).

## Future Roadmap / Pending Tasks
- **Character Encoding Support**: Exposing UI options to decode strings using different encodings (UTF-8, ASCII, Latin-1, Hex encoding, etc.) similar to advanced reference sites.
- **Monetization**: Introduce Ads once traffic increases.
- **Rate-limiting**: Protecting the `/api/*` endpoints (e.g., using Upstash Redis) to prevent abuse before offering public SLA tiers.
