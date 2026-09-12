# YatraSathi

Nepal-focused ride-sharing web app built with React + TypeScript + Vite + Tailwind CSS + Firebase.

## Local setup

```bash
npm install
npm run dev
```

For Firebase:
1. Copy `.env.example` to `.env.local`.
2. Fill the Firebase Web App configuration.
3. Enable Email/Password Authentication and Firestore.
4. Deploy rules with `firebase deploy --only firestore:rules,storage`.

## GitHub Pages

The Vite base is already configured as `/yatra-sathi/`.
The workflow in `.github/workflows/deploy.yml` builds and deploys the site.

For Firebase values, add repository Actions secrets matching `.env.example`.

## Important payment security

eSewa secrets must never be placed in frontend code. Use Cloud Functions/backend to initiate and verify transactions.

## Demo mode

The Login page contains Passenger / Driver / Admin demo buttons so the UI can be explored before Firebase is configured.
