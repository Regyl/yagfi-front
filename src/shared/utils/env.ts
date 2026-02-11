export function getEnv(key: string, defaultValue?: string): string {
    if (typeof window !== 'undefined' && window.__ENV__) {
        const runtimeValue = window.__ENV__[key as keyof typeof window.__ENV__];
        if (runtimeValue !== undefined && runtimeValue !== null && runtimeValue !== '') {
            return runtimeValue;
        }
    }

    // Check build-time environment - Vite uses import.meta.env, CRA uses process.env
    const buildTimeValue = typeof import.meta !== 'undefined' && import.meta.env
        ? (import.meta.env as Record<string, string>)[key]
        : (typeof process !== 'undefined' && process.env ? process.env[key] : undefined);
    if (buildTimeValue !== undefined && buildTimeValue !== null && buildTimeValue !== '') {
        return buildTimeValue;
    }

    // Use default value if provided
    if (defaultValue !== undefined) {
        return defaultValue;
    }

    // Throw error if no value found and no default provided
    throw new Error(`Missing or empty required environment variable: ${key}`);
}
