# ResumeForge – Master Project Log

> Last Updated: 2026-08-07
> Maintained by: Intizar Hussain + ChatGPT

---

# 1. Project Overview

## Project Name
ResumeForge

## Description
ResumeForge is an AI-powered resume optimization platform that helps users:

- Create resumes
- Manage resumes
- Analyze resumes against job descriptions
- Improve ATS score using Google Gemini AI
- Generate optimized resumes

---

# 2. Technology Stack

## Frontend
- Next.js (App Router)
- React 19
- TypeScript
- Shadcn UI
- Tailwind CSS
- Axios
- React Query
- React Hook Form
- Zod

## Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL (Supabase)
- JWT Authentication
- Google Gemini AI

---

# 3. Project Architecture

Frontend
↓

Axios

↓

Express API

↓

JWT Middleware

↓

Controllers

↓

Services

↓

Prisma ORM

↓

PostgreSQL

↓

Google Gemini

---

# 4. Sprint Progress

## Sprint 1 – Backend Foundation
Status: ✅ Completed

Completed

- Project setup
- Express
- TypeScript
- Prisma
- PostgreSQL
- Environment configuration

---

## Sprint 2 – Authentication
Status: ✅ Completed

Completed

- Register
- Login
- JWT
- Protected Routes
- Auth Middleware
- User Profile

---

## Sprint 3 – Resume Backend
Status: ✅ Completed

Completed

- Create Resume
- Get All Resumes
- Get Resume By ID
- Update Resume
- Delete Resume
- Ownership Validation

AI

- Gemini Integration
- Resume Analysis
- ATS Score
- Optimized Resume

---

## Sprint 4 – Frontend
Status: 🔄 In Progress

Completed

- Next.js Setup
- Shadcn UI
- Axios
- React Query
- Login Page
- Authentication
- Dashboard
- Logout
- Resume Service
- useResumes Hook
- Dashboard Resume Listing

---

# 5. Step Tracker

Step 1 ✅
Step 2 ✅
Step 3 ✅
...
Step 52 ✅ Fetch and Display Resumes

Current Step

➡ Step 53 (Not Started)

---

# 6. Backend APIs

Authentication

POST /api/auth/register

POST /api/auth/login

GET /api/auth/profile

Resume

POST /api/resumes

GET /api/resumes

GET /api/resumes/:id

PUT /api/resumes/:id

DELETE /api/resumes/:id

POST /api/resumes/:id/analyze

---

# 7. Database

Tables

✅ User

✅ Resume

✅ Analysis

✅ JobDescription

---

# 8. Bugs Fixed

### Bug #1

401 Unauthorized

Reason

JWT token was rejected.

Fix

Authentication flow corrected.

---

### Bug #2

Axios Authorization

Reason

Bearer token not attached correctly.

Fix

Axios interceptor.

---

### Bug #3

Dashboard

Reason

Resume list not loading.

Fix

Authentication issue resolved.

---

# 9. Git Checkpoints

✅ Backend Complete

✅ AI Integration

✅ Frontend Dashboard

✅ Step 52 Completed

Latest version pushed to GitHub.

---

# 10. Current Status

Sprint

Sprint 4

Phase

Frontend Development

Current Step

53

Status

Ready

Project Health

🟢 Stable

---

# 11. Next Step

Step 53

Create Resume Mutation

Goal

Allow users to create resumes directly from the frontend instead of using Postman.

---

# 12. Future Roadmap

Frontend

- Create Resume Form
- Edit Resume
- Delete Resume
- Resume Detail Page
- AI Analysis Page
- ATS Visualization
- Loading States
- Toast Notifications
- Responsive UI

Backend

- File Upload
- Resume Parsing
- PDF Export

Deployment

- Vercel
- Railway/Render
- Production Database

Testing

- Unit Tests
- Integration Tests
- E2E Tests

Documentation

- README
- API Docs
- Deployment Guide

---

# 13. Notes

This document is the single source of truth.

Before every coding session:

1. Read this file.
2. Verify current step.
3. Continue from that step.
4. Update this file after completion.

Never skip steps.

## Update – Step 53

Status: ✅ Completed

Files Created

- src/hooks/useCreateResume.ts

Files Modified

- src/services/resume.service.ts

Result

Resume creation mutation implemented.

Next Step

Step 54 – Create Resume Form

Sprint 4 – Frontend Development

Step 52 ✅ Completed
Step 53.1 ✅ Completed

Current Progress:
Create Resume Mutation Hook

Status:
Completed Successfully

Files Created
--------------
frontend/src/hooks/useCreateResume.ts

Result
------
✔ React Query mutation created
✔ Cache invalidation configured
✔ Ready to connect to UI

Next
-----
Step 53.2 – Build Create Resume Form