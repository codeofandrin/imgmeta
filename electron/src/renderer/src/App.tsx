import ProviderComposer from "./providers/ProviderComposer"
import YearOptionProvider from "./providers/YearOptionProvider"
import TimeOptionProvider from "./providers/TimeOptionProvider"
import CustomTextProvider from "./providers/CustomTextProvider"
import Options from "./components/Options"
import FileInputForm from "./components/FileInputForm"
import CustomTextInput from "./components/CustomTextInput"
import Example from "./components/Example"
import AboutModal from "./components/AboutModal"
import { getAppName, getAppDescription } from "./utils/app-info"

export default function App() {
  const appName = getAppName()
  const appDesc = getAppDescription()

  return (
    <ProviderComposer components={[YearOptionProvider, TimeOptionProvider, CustomTextProvider]}>
      <>
        <AboutModal />
        <div className="mb-10 mt-8 px-5 sm:mt-14">
          <div className="flex flex-col items-center">
            <h1 className="font-bord text-3xl text-slate-200">{appName}</h1>
            <p className="mt-4 text-sm sm:text-base">{appDesc}</p>
          </div>
          <div className="flex w-full flex-col items-center">
            <div className="mt-8 flex flex-col sm:mt-10 sm:flex-row sm:items-start">
              <Options />
              <CustomTextInput />
            </div>
            <Example />
            <FileInputForm />
          </div>
        </div>
      </>
    </ProviderComposer>
  )
}
