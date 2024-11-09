import { useState } from "react"

import { TimeOptionContext } from "../contexts/TimeOptionContext"

interface TimeOptionContextPropsType {
  children: React.ReactElement
}

export default function TimeOptionProvider({ children }: TimeOptionContextPropsType) {
  const [timeDisplayed, setTimeDisplayed] = useState<boolean>(true)

  const contextValue = { timeDisplayed, setTimeDisplayed }
  return <TimeOptionContext.Provider value={contextValue}>{children}</TimeOptionContext.Provider>
}
