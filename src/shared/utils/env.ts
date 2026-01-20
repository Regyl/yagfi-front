// utils/env.js (or .ts)
export function getEnv(key: string): string {
    const value = process.env[key];
    if (value === undefined || value === null || value === '') {
        throw new Error(`Missing or empty required environment variable: ${key}`);
    }
    return value;
}

// In your component or service
// const API_URL = getRequiredEnv('REACT_APP_API_URL');
