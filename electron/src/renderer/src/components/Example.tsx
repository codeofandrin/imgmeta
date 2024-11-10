import { useState } from "react"

import useYearOptionContext from "../contexts/YearOptionContext"
import useTimeOptionContext from "../contexts/TimeOptionContext"
import useCustomTextContext from "../contexts/CustomTextContext"

const MAX_CUSTOMTEXT_LEN = 30

export default function Example() {
  const { yearFormat } = useYearOptionContext()
  const { timeDisplayed } = useTimeOptionContext()
  const { customText } = useCustomTextContext()
  const [now] = useState(new Date())

  const month = now.getMonth() + 1
  const year = now.getFullYear()
  const day = now.getDate()

  const yearStr = yearFormat === "YYYY" ? year : year.toString().substring(2)
  let dateTimeStr = `${yearStr}${month}${day}`
  if (timeDisplayed) {
    const hour = now.getHours()
    const minute = now.getMinutes()
    const second = now.getSeconds()

    dateTimeStr += `_${hour}${minute}${second}`
  }

  let fileNameStr = ""
  if (customText) {
    let truncatedCustomText = customText
    if (customText.length > MAX_CUSTOMTEXT_LEN) {
      truncatedCustomText = customText.substring(0, MAX_CUSTOMTEXT_LEN - 3) + "..."
    }
    fileNameStr = `${dateTimeStr}_${truncatedCustomText}_myFile.png`
  } else {
    fileNameStr = `${dateTimeStr}_myFile.png`
  }

  return (
    <div className="mt-5 sm:mt-10">
      <h3 className="text-center text-sm font-medium">Example Output</h3>
      <p className="mt-1 text-sm">{fileNameStr}</p>
    </div>
  )
}
