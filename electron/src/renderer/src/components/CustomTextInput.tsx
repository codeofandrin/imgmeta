import { Tooltip } from "flowbite-react"

import SVGInfo from "../assets/icons/Info.svg?react"

export default function CustomTextInput() {
  return (
    <div className="mt-5">
      <div className="mb-2 flex items-center">
        <label htmlFor="custom-text-input" className="block text-sm font-medium text-white">
          Custom text
        </label>
        <Tooltip
          className="delay-300"
          content="The text that is placed after date and time, before the actual filename."
          style="light">
          <SVGInfo className="ml-2 h-4 w-4 text-white transition-colors duration-200 hover:text-blue-500" />
        </Tooltip>
      </div>
      <input
        type="text"
        id="custom-text-input"
        placeholder="Enter text"
        className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
  )
}
