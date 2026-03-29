/**
 * API configuration
 * 
 * Supports multiple environments:
 * - Local dev: npm run dev (Vite), uses /api proxy
 * - Production: Uses Vercel proxy to Render backend
 */

// Use /api proxy in all environments
// Vercel rewrites /api/* to Render backend
// Dev mode uses vite.config.js proxy to localhost:3001
export const API_BASE = '/api'