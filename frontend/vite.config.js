import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    base: "http://103.41.207.193:8080",
    server: {
        proxy: {
            "/api": {
                target: "http://103.41.207.193:4000",
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
    plugins: [vue()]
})