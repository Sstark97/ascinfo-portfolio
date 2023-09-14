/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
    test: {
        includeSource: ["src/**/*.{ts,tsx}"],
        globals: true,
    }
});