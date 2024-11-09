import OptionToggle from "./OptionToggle"

export default function Options() {
  return (
    <div className="mt-10 w-full">
      <OptionToggle id="year-option-toggle" title="Year Format" option1="YYYY" option2="YY" isOnOff={false} />
      <OptionToggle className="mt-5" id="time-option-toggle" title="Display Time" isOnOff={true} />
    </div>
  )
}
