# ADV Juansiksty Nation RT — Frontend (Mock)

React + Vite + TailwindCSS + React Router frontend with mock JSON data. Designed to be API-ready and deployable to Vercel.

## Quick start

1. Install dependencies
2. Run dev server
3. Build for production

## Tech
- React 18, Vite 5
- TailwindCSS 3
- React Router v6

## Mock Data
Static JSON under `src/data/*.json` for news, events, members, partners, gallery. Replace with real APIs later.

## Auth (Mock)
Simple localStorage-based mock with roles: public, member, admin. Use `/login` to switch.

## Routes
Public: `/`, `/about`, `/news`, `/partners`, `/contact`, `/login`
Members: `/dashboard`, `/members`, `/chapters/:slug`, `/gallery`
Admin: `/admin`, `/admin/news`, `/admin/events`, `/admin/gallery`, `/admin/members`, `/admin/partners`, `/admin/directory`

## Deploy
This Vite app works on Vercel. Output dir is `dist`.