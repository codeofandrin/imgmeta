interface OptionTogglePropsType {
  className?: string
  id: string
  title: string
  option1?: string
  option2?: string
  isOnOff: boolean
  defaultOn?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export default function OptionToggle({
  className,
  id,
  title,
  option1,
  option2,
  isOnOff,
  defaultOn,
  onChange
}: OptionTogglePropsType) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <h3 className="text-sm font-medium">{title}</h3>
      <div className="mt-2 w-full">
        <div className="flex items-center">
          <div className="inline-flex w-1/2 justify-end">
            <span className="mr-2 text-xs font-medium">{option1}</span>
          </div>
          <div className="shrink-0">
            <label className="cursor-pointer">
              <input
                type="checkbox"
                id={id}
                className="peer sr-only"
                defaultChecked={defaultOn}
                onChange={onChange}
              />
              <div
                className={`relative h-6 w-11 ${isOnOff ? "bg-gray-700" : "bg-blue-600"} duration-50 delay-50 peer rounded-full border-gray-600 transition-colors after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none rtl:peer-checked:after:-translate-x-full`}
              />
            </label>
          </div>
          <div className="inline-flex w-1/2 justify-start">
            <span className="ml-2 text-xs font-medium">{option2}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
