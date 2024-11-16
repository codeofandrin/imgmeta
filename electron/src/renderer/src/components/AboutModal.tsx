import { useEffect, useState } from "react"
import { Button } from "flowbite-react"

import ExternalLink from "./ExternalLink"
import { Socials } from "../utils/constants"
import { getAppName, getAppVersion, getAppAuthor, getAuthorHomepage } from "../utils/app-info"
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

  const appName = getAppName()
  const appVersion = getAppVersion()
  const appAuthor = getAppAuthor()
  const authorHomepage = getAuthorHomepage()

  // use a variable and add whitespace at end because prettier adds '{" "}'
  const authorTitle = "Author: "

  return (
    <dialog
      tabIndex={-1}
      id="about-modal"
      open={isOpen}
      className="modal z-[999] bg-black/40 backdrop-blur-[2px]"
      onClose={handleClose}>
      <div className="modal-box max-w-96 bg-slate-800">
        <div className="flex flex-col items-center">
          <img src={ImgAppLogo} className="w-14"></img>
          <h3 className="mt-2 font-bold">About {appName}</h3>
          <div className="mt-4 text-sm">
            <p>Version {appVersion}</p>
            <p className="mt-1">
              {authorTitle}
              <ExternalLink
                href={authorHomepage}
                className="font-medium text-blue-600 transition-colors duration-150 hover:text-blue-400">
                {appAuthor}
              </ExternalLink>
            </p>
          </div>
          <ExternalLink href={Socials.repository} title="Source Code Repository">
            <SVGGitHub className="mt-4 text-gray-500 transition-colors duration-150 hover:text-gray-300" />
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
