import Options from "./components/Options"
import FileInputForm from "./components/FileInputForm"

export default function App() {
  return (
    <div>
      <div className="mt-12 flex flex-col items-center px-[5%]">
        <h1 className="font-bord text-3xl text-slate-200">imgmeta</h1>
        <p className="mt-4">Add date and time to image file name.</p>
      </div>
      <div className="flex w-full flex-col items-center">
        <Options />
        <FileInputForm />
      </div>
    </div>
  )
}
