import { useState, useRef } from "react"
import { Button, FileInput } from "flowbite-react"

import { sendImgPaths } from "../services/api"
import SVGSpinner from "../assets/icons/Spinner.svg?react"
import Status from "./Status"
import "../styles/FileInputForm.css"

export default function FileInputForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showStatus, setShowStatus] = useState(false)
  const [isError, setIsError] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imageFiles, setImageFiles] = useState<FileList | null>(null)
  const [renamedFilesAmount, setRenamedFilesAmount] = useState(0)

  const handleFilesChange = () => {
    setShowStatus(false)

    const imageFiles = fileInputRef.current?.files as FileList
    if (imageFiles.length > 0) {
      setImageFiles(imageFiles)
    } else {
      setImageFiles(null)
    }
  }

  const handleFilesRequest = async () => {
    setIsLoading(true)

    const yearOptionToggleElem = document.getElementById("year-option-toggle") as HTMLInputElement
    const timeOptionToggleElem = document.getElementById("time-option-toggle") as HTMLInputElement

    let yearOption = "YYYY"
    if (yearOptionToggleElem.checked) {
      yearOption = "YY"
    }
    let timeOption = timeOptionToggleElem.checked

    let filePaths: string[] = []
    if (imageFiles) {
      for (let i = 0; i < imageFiles.length; i++) {
        filePaths.push(imageFiles[i].path)
      }
    }

    await sendImgPaths(filePaths, yearOption, timeOption).then((isError: boolean) => {
      setIsError(isError)
      setShowStatus(true)
      setIsLoading(false)
      setRenamedFilesAmount(imageFiles ? imageFiles.length : 0)

      fileInputRef.current && (fileInputRef.current.value = "")
      setImageFiles(null)
    })
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col sm:flex-row items-center justify-center mt-14">
        <div>
          <FileInput
            ref={fileInputRef}
            className="dark w-96 border-0"
            id="file-upload"
            onChange={() => handleFilesChange()}
            multiple
          />
        </div>
        <Button
          id="btn-rename"
          className={`${!imageFiles ? "active:bg-blue-700" : "active:bg-blue-900"}`}
          color="blue"
          onClick={() => handleFilesRequest()}
          disabled={!imageFiles}>
          {isLoading ? (
            <div className="flex items-center ">
              <SVGSpinner className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" />
              <span className="ml-2">Rename</span>
            </div>
          ) : (
            "Rename"
          )}
        </Button>
      </div>
      {showStatus && <Status isError={isError} filesAmount={renamedFilesAmount} />}
    </div>
  )
}
