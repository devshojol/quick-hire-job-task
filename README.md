# Quick Hire Job Board

## Project Overview

Quick Hire is a full-stack job board web application built with **Next.js** (frontend) and **Express.js** (backend), using **MongoDB** for data storage. It allows users to search and filter jobs, view job details, and apply for jobs online. Admins can manage job listings via RESTful APIs.

**Features:**

- Job search with keyword, location, category, and job type filters
- Responsive grid layout (mobile, tablet, desktop)
- Job detail page with application form
- Admin CRUD API for jobs and applications
- Zod-based request validation
- Standardized API responses

---

## How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/devshojol/quick-hire-job-task
cd quick-hire-job-task
```

### 2. Install dependencies

```bash
cd server
npm install
cd ../client
npm install
```

### 3. Start the backend server

```bash
cd server
npm run dev
```

The backend runs on [http://localhost:8888](http://localhost:8888).

### 4. Start the frontend (Next.js) app

```bash
cd client
npm run dev
```

The frontend runs on [http://localhost:3000](http://localhost:3000), and connect with live api.

---

## Environment Variables

**Backend (`server/.env`):**

- `MONGO_URI` - MongoDB connection string (e.g. `mongodb://localhost:27017/quickhire`)
- `PORT` - Port for Express server (default: 8888)

---

## Folder Structure

```
quick-hire-job-task/
  client/   # Next.js frontend
  server/   # Express.js backend
```

---

## API Endpoints

- `GET /api/jobs` - List jobs (with filters)
- `GET /api/jobs/:id` - Get job details
- `POST /api/jobs` - Create job (admin)
- `DELETE /api/jobs/:id` - Delete job (admin)
- `POST /api/applications` - Submit application
- `GET /api/applications/job/:jobId` - List applications for a job

---
