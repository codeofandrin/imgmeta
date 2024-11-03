interface OptionTogglePropsType {
  title: string
  option1: string
  option2: string
}

export default function OptionToggle({ title, option1, option2 }: OptionTogglePropsType) {
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-sm">{title}</h3>
      <div className="mt-2">
        <label className="inline-flex items-center cursor-pointer">
          <span className="mr-3 text-xs font-medium">{option1}</span>
          <input type="checkbox" value="" className="sr-only peer" />
          <div
            className="relative w-11 h-6 bg-blue-600 peer-focus:outline-none rounded-full 
            peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
            peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
            after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full 
            after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-blue-600">
          </div>
          <span className="ml-3 text-xs font-medium">{option2}</span>
        </label>
      </div>
    </div>
  )
}
