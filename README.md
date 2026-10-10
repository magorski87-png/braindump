# BrainDump

An offline-first, no-subscription PWA for capturing thoughts and organizing them later. Captures, photos, tasks, reminders and outbox drafts live in **your browser's IndexedDB**, not a server.

## Run

Requires Node 22+. `npm install`, then `npm run dev`. Run tests with `npm test`; make production assets with `npm run build`.

## Deploy to GitHub Pages

1. Create a GitHub repository named **braindump**, commit all project files (and run `npm install` locally to generate a package-lock.json if desired), and push to `main`.
2. In repository Settings → Pages, set Source to **GitHub Actions**.
3. The workflow tests and builds on every push. App URL: `https://YOUR-USERNAME.github.io/braindump/`.
4. If you use another repository name, change the Vite `base` in `vite.config.ts` to match it.

## Behavior and privacy

Capture requires no organization. The Inbox provides local rule-based suggestions; user review is required before creating tasks. You can manually edit/split actions. Original captures remain intact when tasks are created. Photos are stored as IndexedDB blobs. Speech-to-text uses the browser's Web Speech API when supported; some browsers send speech to an online service. No audio recordings are persisted. All app data can be exported to one JSON file and restored; restoring **replaces** the current local database after confirmation. Browser storage can be erased by device cleaners, site resets or private mode: export regular backups.

Reminders are **in-app due-date lists only**: there are no guarantees of alerts while the PWA is closed. Integration outbox is **draft/export only**, with unique IDs for future idempotent dispatch; no external app is contacted. App shell caches for offline loading after first successful visit; speech recognition may not work offline.

## Architecture

- `src/db.ts`: Dexie schema v1→v2 migration, backup/restore, referential integrity and deletion.
- `src/engine.ts`: replaceable local `ClassificationEngine` contract; deterministic suggestions and manual splitting.
- `src/types.ts`: domain model including integration outbox and activity records.
- `src/App.tsx`: responsive flows and CRUD UI.

### Caveats

GitHub Pages is static hosting, so it cannot itself sync data between devices or schedule server-side notifications. This version does not provide cloud synchronization, push notifications or dispatched integrations. Application data is local to the same browser profile and origin.
