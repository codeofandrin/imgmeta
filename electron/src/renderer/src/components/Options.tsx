import OptionToggle from "./OptionToggle"
import useYearOptionContext from "../contexts/YearOptionContext"
import useTimeOptionContext from "../contexts/TimeOptionContext"

export default function Options() {
  const { setFullYear, setShortYear } = useYearOptionContext()
  const { setTimeDisplayed } = useTimeOptionContext()

  function handleYearOptionChange(e) {
    e.target.checked ? setShortYear() : setFullYear()
  }

  function handleTimeOptionChange(e) {
    setTimeDisplayed(e.target.checked)
  }

  return (
    <div className="w-full">
      <OptionToggle
        id="year-option-toggle"
        title="Year Format"
        option1="YYYY"
        option2="YY"
        isOnOff={false}
        onChange={handleYearOptionChange}
      />
      <OptionToggle
        className="mt-5"
        id="time-option-toggle"
        title="Display Time"
        isOnOff={true}
        defaultOn={true}
        onChange={handleTimeOptionChange}
      />
    </div>
  )
}
