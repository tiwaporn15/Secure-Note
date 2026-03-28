/**
 * API configuration
 * 
 * Supports multiple environments:
 * - Local dev: npm run dev (Vite), uses /api proxy
 * - Production: Uses environment variable from Vercel
 */

// Get backend URL from environment or use intelligent defaults
const getAPIBase = () => {
  // Import.meta.env.VITE_API_BASE comes from Vercel env vars
  if (import.meta.env.VITE_API_BASE) {
    return import.meta.env.VITE_API_BASE
  }

  // Dev mode: use /api proxy (configured in vite.config.js)
  if (import.meta.env.DEV) {
    return '/api'
  }

  // Production fallback: This should not be reached if env var is set
  console.warn('⚠️ VITE_API_BASE not set in Vercel environment variables')
  return 'https://api.example.com/api'
}

export const API_BASE = getAPIBase()