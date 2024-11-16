import { useEffect, useState } from "react"
import { Button } from "flowbite-react"

import ExternalLink from "./ExternalLink"
import { Socials } from "../utils/constants"
import ImgAppLogo from "../assets/images/AppLogo.png"
import SVGGitHub from "../assets/icons/GitHub.svg?react"
import "../styles/AboutModal.css"

export default function AboutModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    window.electronAPI.menuAbout(isOpen)
  }, [isOpen])

  // 'ESC' key event
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose()
      }
    }
    window.addEventListener("keydown", close)
    return () => window.removeEventListener("keydown", close)
  }, [])

  window.electronAPI.onShowAbout(() => {
    setIsOpen(true)
  })

  function handleClose() {
    setIsOpen(false)
  }

  const appName = __APP_NAME__
  const appVersion = __APP_VERSION__

  return (
    <dialog
      tabIndex={-1}
      id="about-modal"
      open={isOpen}
      className="modal z-[999] bg-black/40 backdrop-blur-[2px]"
      onClose={handleClose}>
      <div className="modal-box max-w-96">
        <div className="flex flex-col items-center">
          <img src={ImgAppLogo} className="w-14"></img>
          <h3 className="mt-2 font-bold">About {appName}</h3>
          <p className="mt-3 text-sm">Version {appVersion}</p>
          <ExternalLink href={Socials.repository} title="Source Code Repository">
            <SVGGitHub className="mt-3 text-gray-500 transition-colors duration-150 hover:text-gray-300" />
          </ExternalLink>
        </div>
        <div className="mt-3 flex justify-end">
          <Button color="blue" size="sm" onClick={handleClose}>
            Close
          </Button>
        </div>
      </div>
      {/* close on backdrop click */}
      <form method="dialog" className="modal-backdrop">
        <button className="cursor-default">close</button>
      </form>
    </dialog>
  )
}
