// Central config - reads from .env
// Development: set VITE_API_URL=http://localhost:8080
// Production:  set VITE_API_URL=https://yourdomain.com
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
