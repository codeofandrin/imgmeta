import { createContext, useContext } from "react"

import { TimeOptionContextType } from "../utils/types"

export const TimeOptionContext = createContext<TimeOptionContextType>({
    timeDisplayed: true,
    setTimeDisplayed: () => {}
})

export default function useTimeOptionContext(): TimeOptionContextType {
    return useContext(TimeOptionContext)
}
