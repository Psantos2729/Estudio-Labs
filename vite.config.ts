/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  // En GitHub Pages el sitio vive en /Estudio-Labs/; el flujo de publicación define VITE_BASE.
  base: process.env.VITE_BASE ?? '/',
  plugins: [react()],
  worker: { format: 'es' }, // Pyodide usa import() dinámico dentro del worker
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts', 'tools/**/*.test.mjs'],
  },
});
