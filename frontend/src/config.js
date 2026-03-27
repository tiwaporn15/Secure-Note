/**
 * API configuration
 * 
 * Supports multiple environments:
 * - Local dev: npm run dev (Vite), uses /api proxy
 * - Production: Uses environment variable VITE_API_URL or fallback to relative /api
 */

// Get backend URL from environment or use intelligent defaults
const getAPIBase = () => {
  // Import.meta.env.VITE_API_URL comes from Vercel env vars
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL
  }

  // Dev mode: use /api proxy or localhost
  if (import.meta.env.DEV) {
    return '/api'
  }

  // Production fallback: assume API is on same domain
  return '/api'
}

export const API_BASE = getAPIBase()