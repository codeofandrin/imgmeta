import { useState } from "react"

import { CustomTextContext } from "../contexts/CustomTextContext"

interface CustomTextContextPropsType {
  children: React.ReactElement
}

export default function CustomTextProvider({ children }: CustomTextContextPropsType) {
  const [_customText, _setCustomText] = useState<string>("")
  function setCustomText(text: string) {
    _setCustomText(text)
  }
  function resetCustomText() {
    _setCustomText("")
  }

  const contextValue = {
    customText: _customText,
    setCustomText,
    resetCustomText
  }

  return <CustomTextContext.Provider value={contextValue}>{children}</CustomTextContext.Provider>
}
