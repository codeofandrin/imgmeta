import { useState } from "react"

import { YearOptionContext } from "../contexts/YearOptionContext"

interface YearOptionProviderPropsType {
  children: React.ReactElement
}

export default function YearOptionProvider({ children }: YearOptionProviderPropsType) {
  const [_yearFormat, _setYearFormat] = useState<string>("YYYY")
  const setFullYear = () => {
    _setYearFormat("YYYY")
  }
  const setShortYear = () => {
    _setYearFormat("YY")
  }

  const contextValue = {
    yearFormat: _yearFormat,
    setFullYear,
    setShortYear
  }

  return <YearOptionContext.Provider value={contextValue}>{children}</YearOptionContext.Provider>
}
