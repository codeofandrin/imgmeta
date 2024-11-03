import Options from "./components/Options"
import FileInputForm from "./components/FileInputForm"

export default function App() {
  return (
    <div>
      <div className="flex flex-col items-center mt-12 mb-12 px-[5%]">
        <h1 className="text-3xl text-slate-200 font-bord">imgmeta</h1>
        <p className="mt-4">Add date and time to image file name.</p>
      </div>
      <div className="flex flex-col items-center w-full">
        <Options />
        <FileInputForm />
      </div>
    </div>
  )
}
