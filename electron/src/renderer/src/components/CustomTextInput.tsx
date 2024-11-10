import { useState } from "react"
import { Tooltip } from "flowbite-react"

import useCustomTextContext from "../contexts/CustomTextContext"
import SVGInfo from "../assets/icons/Info.svg?react"
import "../styles/CustomTextInput.css"

function isValidForFileName(fileName: string): boolean {
  const macOSFileNameRegex = /^[^/]{0,255}$/
  return macOSFileNameRegex.test(fileName)
}

export default function CustomTextInput() {
  const { customText, isValid, setCustomText, setIsValid } = useCustomTextContext()

  function handleCustomTextChange(e) {
    const text = e.target.value
    setCustomText(text)
    setIsValid(isValidForFileName(text))
  }

  return (
    <div className="mt-5 sm:ml-10 sm:mt-0 sm:min-w-36">
      <div className="mb-2 flex items-center">
        <label htmlFor="custom-text-input" className="block text-sm font-medium text-white">
          Custom text
        </label>
        <Tooltip
          className="ml-1 max-w-lg delay-300"
          content="The text that is placed after date and time, before the actual filename. Cannot contain slashes ('/') and cannot exceed 255 characters."
          style="light">
          <SVGInfo className="ml-2 h-4 w-4 text-white transition-colors duration-200 hover:text-blue-500" />
        </Tooltip>
      </div>
      <input
        type="text"
        id="custom-text-input"
        placeholder="Enter text"
        value={customText}
        className={`${!isValid && "invalid"} block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white focus:border-blue-500 focus:ring-blue-500`}
        onChange={handleCustomTextChange}
      />
      <div className="mt-1">
        <p className={`text-sm text-red-500 ${isValid && "invisible"}`}>Invalid text input</p>
      </div>
    </div>
  )
}
