import { useState } from "react"

import { CustomTextContext } from "../contexts/CustomTextContext"

interface CustomTextContextPropsType {
  children: React.ReactElement
}

export default function CustomTextProvider({ children }: CustomTextContextPropsType) {
  const [_customText, _setCustomText] = useState<string>("")
  const [isValid, setIsValid] = useState<boolean>(true)
  function setCustomText(text: string) {
    _setCustomText(text)
  }
  function resetCustomText() {
    _setCustomText("")
  }

  const contextValue = {
    customText: _customText,
    isValid,
    setCustomText,
    resetCustomText,
    setIsValid
  }

  return <CustomTextContext.Provider value={contextValue}>{children}</CustomTextContext.Provider>
}
