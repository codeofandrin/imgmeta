import { createContext, useContext } from "react"

import { YearOptionContextType } from "../utils/types"

export const YearOptionContext = createContext<YearOptionContextType>({
    yearFormat: "YYYY",
    setFullYear: () => {},
    setShortYear: () => {}
})

export default function useYearOptionContext(): YearOptionContextType {
    return useContext(YearOptionContext)
}
