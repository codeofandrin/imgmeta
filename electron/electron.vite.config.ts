import { defineConfig, externalizeDepsPlugin } from "electron-vite"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"

const s = JSON.stringify

export default defineConfig({
    main: {
        plugins: [externalizeDepsPlugin()]
    },
    preload: {
        plugins: [externalizeDepsPlugin()]
    },
    renderer: {
        plugins: [
            react(),
            svgr({
                svgrOptions: {
                    // svgr options
                }
            })
        ],
        define: {
            __APP_NAME__: s(process.env.npm_package_name),
            __APP_VERSION__: s(process.env.npm_package_version)
        }
    }
})
