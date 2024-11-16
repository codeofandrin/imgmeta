/// <reference types="vite-plugin-svgr/client" />

import React from "react"
import ReactDOM from "react-dom/client"

import App from "./App"
import "./styles/main.css"

declare global {
  interface Window {
    electronAPI: {
      onShowAbout: Function
      menuAbout: Function
    }
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
