import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// Vite configuration for the ABU Accommodation Portal
// https://vitejs.dev/config/
export default defineConfig({
  // Enable React plugin for JSX support and fast refresh
  plugins: [react()],

  // Configure path resolution for cleaner imports
  resolve: {
    alias: {
      // Allow @/ imports to reference the src directory
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // Development server configuration
  server: {
    port: 3000, // Run on port 3000 (similar to Next.js default)
    open: true, // Automatically open browser when server starts
  },

  // Build configuration
  build: {
    outDir: "dist", // Output directory for built files
    sourcemap: true, // Generate source maps for debugging
  },
})
