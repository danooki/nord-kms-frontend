# Nordiko KMS Frontend

React-based frontend application for the Nordiko Knowledge Management System.

## Quick Start

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client

## Environment Variables

Create a `.env` file:

```bash
VITE_API_URL=http://localhost:3000
```

**Note:** In development, Vite automatically proxies `/api` requests to the backend, so `VITE_API_URL` is mainly for production builds.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── components/     # Reusable React components (Layout, ProtectedRoute)
├── pages/          # Page components (Wiki, Tickets, Chatbot, Login, Admin, Dashboard)
├── context/        # React context providers (AuthContext)
├── config/         # Configuration files (API client)
├── App.jsx         # Main app component
└── main.jsx        # Entry point
```

## Features

- **Authentication** - Login, registration, and protected routes
- **RBAC** - Role-based access control with automatic dashboard redirects
- **Wiki** - Knowledge base article browsing
- **Tickets** - Support ticket management
- **Chatbot** - AI-powered Q&A interface
- **Admin Dashboard** - User management and system administration

For complete documentation, see the main [README.md](../README.md) and [ARCHITECTURE.md](../ARCHITECTURE.md).
