import ProviderComposer from "./providers/ProviderComposer"
import YearOptionProvider from "./providers/YearOptionProvider"
import TimeOptionProvider from "./providers/TimeOptionProvider"
import CustomTextProvider from "./providers/CustomTextProvider"
import Options from "./components/Options"
import FileInputForm from "./components/FileInputForm"
import CustomTextInput from "./components/CustomTextInput"
import Example from "./components/Example"

export default function App() {
  return (
    <ProviderComposer components={[YearOptionProvider, TimeOptionProvider, CustomTextProvider]}>
      <>
        <div className="mt-12 flex flex-col items-center px-[5%]">
          <h1 className="font-bord text-3xl text-slate-200">imgmeta</h1>
          <p className="mt-4">Add date and time to image file name.</p>
        </div>
        <div className="flex w-full flex-col items-center">
          <Options />
          <CustomTextInput />
          <Example />
          <FileInputForm />
        </div>
      </>
    </ProviderComposer>
  )
}
