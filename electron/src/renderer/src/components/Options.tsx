import OptionToggle from "./OptionToggle"
import useYearOptionContext from "../contexts/YearOptionContext"
import useTimeOptionContext from "../contexts/TimeOptionContext"

export default function Options() {
  const { setFullYear, setShortYear } = useYearOptionContext()
  const { setDisplayed } = useTimeOptionContext()

  const handleYearOptionChange = (e) => {
    e.target.checked ? setShortYear() : setFullYear()
  }

  const handleTimeOptionChange = (e) => {
    setDisplayed(e.target.checked)
  }

  return (
    <div className="mt-10 w-full">
      <OptionToggle
        id="year-option-toggle"
        title="Year Format"
        option1="YYYY"
        option2="YY"
        isOnOff={false}
        onChange={(e) => handleYearOptionChange(e)}
      />
      <OptionToggle
        className="mt-5"
        id="time-option-toggle"
        title="Display Time"
        isOnOff={true}
        defaultOn={true}
        onChange={(e) => handleTimeOptionChange(e)}
      />
    </div>
  )
}
