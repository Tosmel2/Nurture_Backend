# Nuture Express Backend (TypeScript)

This backend provides a minimal REST API for the Nuture front end:
- Authentication (signup/signin, JWT)
- User profile endpoints
- Plans (list/get)
- Claims (submit/list) with file upload for receipts

Prerequisites
- Node 18+
- npm or yarn
- MongoDB (Atlas or local)

Quick start (PowerShell)
```powershell
cd backend
# copy example env
copy .env.example .env
# Edit .env to set MONGO_URI and JWT_SECRET (you can use the existing .env with MONGO_URI)
npm install
npm run dev