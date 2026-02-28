# Quick Hire - Server

Basic Express server connected to MongoDB for the Quick Hire job task.

Getting started

1. Copy `.env.example` to `.env` and set `MONGO_URI` and optionally `PORT`.
2. From `server/` run:

```bash
npm install
npm run dev
```

Endpoints

- GET / -> basic status
- GET /api/health -> health check
