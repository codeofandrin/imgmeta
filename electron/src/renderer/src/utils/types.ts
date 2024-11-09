export interface YearOptionContextType {
    yearFormat: string
    setFullYear: Function
    setShortYear: Function
}

export interface TimeOptionContextType {
    timeDisplayed: boolean
    setTimeDisplayed: Function
}

export interface CustomTextContextType {
    customText: string
    isValid: boolean
    setCustomText: Function
    resetCustomText: Function
    setIsValid: Function
}
