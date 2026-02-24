import tailwindcss from "@tailwindcss/vite"; // Bæta þessu við
import react from '@vitejs/plugin-react'
import path from "path"
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(), // Og þessu hérna líka!
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})