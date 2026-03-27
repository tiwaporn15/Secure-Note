/**
 * API configuration
 * 
 * Supports multiple environments:
 * - Local dev: npm run dev (Vite), uses /api proxy
 * - Production: Uses environment variable or hardcoded backend URL
 */

// Get backend URL from environment or use intelligent defaults
const getAPIBase = () => {
  // Import.meta.env.VITE_API_URL comes from Vercel env vars
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL
  }

  // Dev mode: use /api proxy
  if (import.meta.env.DEV) {
    return '/api'
  }

  // Production fallback: use render backend directly
  return 'https://secure-note-0zqt.onrender.com/api'
}

export const API_BASE = getAPIBase()