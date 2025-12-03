import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    plugins: [react()],
    base: "/",
    server: {
      allowedHosts: [env.VITE_HOSTNAME],
      port: 8080,
      strictPort: true,
      host: true,
      origin: "http://0.0.0.0:8080",
      proxy: {
        "/api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    preview: {
      port: 3000,
      strictPort: true,
      host: true,
    },
  })
}
