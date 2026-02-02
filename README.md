# Nordiko KMS Frontend

React-based frontend application for the Nordiko Knowledge Management System.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
cd client
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Environment Variables

Create a `.env` file in the `client` directory:

```bash
cp .env.example .env
```

Available variables:
- `VITE_API_URL` - Backend API URL (default: `http://localhost:3000`)

**Note:** In development, Vite automatically proxies `/api` requests to the backend, so `VITE_API_URL` is mainly for production builds.

### Building for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
client/
├── src/
│   ├── components/     # Reusable React components
│   ├── pages/          # Page components
│   ├── context/        # React context providers
│   ├── config/         # Configuration files
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── index.html          # HTML template
├── vite.config.js      # Vite configuration
└── tailwind.config.js  # Tailwind CSS configuration
```

## Features

- **Authentication** - Login and protected routes
- **Wiki** - Knowledge base article browsing
- **Tickets** - Support ticket management
- **Chatbot** - AI-powered Q&A interface

## Development Notes

- The app uses React Router for client-side routing
- API calls are handled through Axios with interceptors for authentication
- Tailwind CSS is used for styling
- Environment variables must be prefixed with `VITE_` to be accessible in the app
