import { useState } from "react"

import useYearOptionContext from "../contexts/YearOptionContext"
import useTimeOptionContext from "../contexts/TimeOptionContext"
import useCustomTextContext from "../contexts/CustomTextContext"

const MAX_CUSTOMTEXT_LEN_SM = 30
const MAX_CUSTOMTEXT_LEN = 20

function getTruncatedText(text: string, maxLen: number): string {
  if (text.length > maxLen) {
    return text.substring(0, maxLen - 3) + "..."
  }
  return text
}

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

  let fileNameStr_sm = ""
  if (customText) {
    let truncatedCustomText = getTruncatedText(customText, MAX_CUSTOMTEXT_LEN_SM)
    fileNameStr_sm = `${dateTimeStr}_${truncatedCustomText}_myFile.png`
  } else {
    fileNameStr_sm = `${dateTimeStr}_myFile.png`
  }

  let fileNameStr = ""
  if (customText) {
    let truncatedCustomText = getTruncatedText(customText, MAX_CUSTOMTEXT_LEN)
    fileNameStr = `${dateTimeStr}_${truncatedCustomText}_myFile.png`
  } else {
    fileNameStr = `${dateTimeStr}_myFile.png`
  }

  return (
    <div className="mt-5 sm:mt-10">
      <h3 className="text-center text-sm font-medium">Example Output</h3>
      <p className="mt-1 hidden text-sm sm:block">{fileNameStr_sm}</p>
      <p className="mt-1 text-sm sm:hidden">{fileNameStr}</p>
    </div>
  )
}
