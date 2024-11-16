import { contextBridge, ipcRenderer } from "electron/renderer"

const electronAPI = {
    onShowAbout: (callback: Function) => ipcRenderer.on("show-about", (_event) => callback()),
    menuAbout: (isOpen: boolean) => ipcRenderer.send("menu-about", isOpen)
}

contextBridge.exposeInMainWorld("electronAPI", electronAPI)
