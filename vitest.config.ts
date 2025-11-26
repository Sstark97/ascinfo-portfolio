/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
    test: {
        includeSource: ["src/**/*.{ts,tsx}"],
        globals: true,
        environment: "happy-dom",
        setupFiles: ["./src/setup.ts"],
    },
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, './src/components'),
            '@layouts': path.resolve(__dirname, './src/layouts'),
            '@application': path.resolve(__dirname, './src/lib/application'),
            '@infrastructure': path.resolve(__dirname, './src/lib/infrastructure'),
            '@domain': path.resolve(__dirname, './src/lib/domain'),
        },
    },
});