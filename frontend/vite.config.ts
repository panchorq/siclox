import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import type { PluginOption } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const plugins: PluginOption[] = [react()];
  
  // Solo en desarrollo, intentar cargar lovable-tagger
  if (mode === 'development') {
    try {
      // @ts-ignore - Importación dinámica para desarrollo
      const { componentTagger } = require('lovable-tagger');
      plugins.push(componentTagger());
    } catch (e) {
      console.warn('lovable-tagger no está instalado, omitiendo...');
    }
  }

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
      minify: 'esbuild',
      target: 'esnext',
      sourcemap: false,
    },
    esbuild: {
      charset: 'utf8',
    },
  };
});
