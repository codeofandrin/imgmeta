interface OptionTogglePropsType {
  className?: string
  id: string
  title: string
  option1?: string
  option2?: string
  isOnOff: boolean
}

export default function OptionToggle({
  className,
  id,
  title,
  option1,
  option2,
  isOnOff
}: OptionTogglePropsType) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <h3 className="text-sm">{title}</h3>
      <div className="w-full mt-2">
        <div className="flex items-center">
          <div className="inline-flex justify-end w-1/2">
            <span className="text-xs font-medium mr-2">{option1}</span>
          </div>
          <div className="shrink-0">
            <label className="cursor-pointer">
              <input type="checkbox" id={id} className="sr-only peer" />
              <div
                className={`relative w-11 h-6 ${isOnOff ? "bg-gray-700" : "bg-blue-600"} 
                peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full 
                rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] 
                after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full 
                after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-blue-600`} />
            </label>
          </div>
          <div className="inline-flex justify-start w-1/2">
            <span className="text-xs font-medium ml-2">{option2}</span>
          </div>
        </div>
      </div>
    </div >
  )
}
