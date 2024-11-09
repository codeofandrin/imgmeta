import { createContext, useContext } from "react"

import { CustomTextContextType } from "../utils/types"

export const CustomTextContext = createContext<CustomTextContextType>({
    customText: "",
    setCustomText: () => {},
    resetCustomText: () => {}
})

export default function useCustomTextContext(): CustomTextContextType {
    return useContext(CustomTextContext)
}
