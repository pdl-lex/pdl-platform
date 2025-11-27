import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    plugins: [react()],
    server: {
      allowedHosts: [env.VITE_VM_URL],
      proxy: {
        "/api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
        },
      },
    },
  })
}
