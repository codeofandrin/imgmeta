import { useState } from "react"
import { Button, FileInput } from "flowbite-react"

import { sendImgPaths } from "../services/api"
import "../styles/FileInputForm.css"

export default function FileInputForm() {
  const [isFiles, setIsFiles] = useState(false)

  const handleFilesChange = () => {
    const fileInputElem: HTMLInputElement = document.getElementById("file-upload") as HTMLInputElement
    const imageFiles = fileInputElem.files as FileList

    if (imageFiles.length === 0) {
      setIsFiles(false)
    }
    else {
      setIsFiles(true)
    }

  }

  const handleFilesRequest = async () => {
    const fileInputElem: HTMLInputElement = document.getElementById("file-upload") as HTMLInputElement
    const imageFiles = fileInputElem.files as FileList
    const yearOptionToggleElem = document.getElementById("year-option-toggle") as HTMLInputElement
    const timeOptionToggleElem = document.getElementById("time-option-toggle") as HTMLInputElement

    let yearOption = "YYYY"
    if (yearOptionToggleElem.checked) {
      yearOption = "YY"
    }
    let timeOption = timeOptionToggleElem.checked

    let filePaths: string[] = []
    for (let i = 0; i < imageFiles.length; i++) {
      filePaths.push(imageFiles[i].path)
    }

    const response = await sendImgPaths(filePaths, yearOption, timeOption)
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center mt-14">
      <div>
        <FileInput className="dark w-96 border-0" id="file-upload" onChange={() => handleFilesChange()} multiple />
      </div>
      <Button
        id="btn-rename"
        className={`${!isFiles ? "active:bg-blue-700" : "active:bg-blue-900"}`}
        color="blue"
        onClick={() => handleFilesRequest()}
        disabled={!isFiles}>
        Rename
      </Button>
    </div >
  )
}
