import { defineConfig } from 'vite';
import istanbul from 'vite-plugin-istanbul';

export default defineConfig({
    build: { sourcemap: true },
    plugins: [
        istanbul({
            include: ['src/**/*'],
            exclude: ['node_modules', 'tests/**/*', '.github/**/*', '.idea/**/*', '.nyc_output/**/*', 'coverage/**/*', 'incidentReports/**/*', 'playwright-report/**/*', 'test-results/**/*'],
            requireEnv: false,
        }),
    ],
});