import { useState, useRef, RefObject } from "react"
import { Button, FileInput } from "flowbite-react"

import { sendImgPaths } from "../services/api"
import Status from "./Status"
import { FileInputStatusType } from "../utils/enums"
import SVGSpinner from "../assets/icons/Spinner.svg?react"
import SVGCross from "../assets/icons/Cross.svg?react"
import "../styles/FileInputForm.css"

interface ImageFilesType {
  ref: RefObject<HTMLInputElement>
  imageFiles: FileList | null
  renamedAmount: number
}

export default function FileInputForm() {
  const [status, setStatus] = useState<FileInputStatusType | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [fileInput, setFileInput] = useState<ImageFilesType>({
    ref: useRef<HTMLInputElement>(null),
    imageFiles: null,
    renamedAmount: 0
  })

  const handleFilesChange = () => {
    setStatus(null)

    const imageFiles = fileInput.ref.current?.files as FileList
    if (imageFiles.length > 0) {
      setFileInput({ ...fileInput, imageFiles })
    } else {
      setFileInput({ ...fileInput, imageFiles: null })
    }
  }

  const handleFilesClear = () => {
    console.log("handleFilesClear")
    setFileInput({ ...fileInput, imageFiles: null })
    fileInput.ref.current && (fileInput.ref.current.value = "")
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
    const imageFiles = fileInput.imageFiles
    if (imageFiles) {
      for (let i = 0; i < imageFiles.length; i++) {
        filePaths.push(imageFiles[i].path)
      }
    }

    await sendImgPaths(filePaths, yearOption, timeOption).then((isError: boolean) => {
      setIsLoading(false)
      if (isError) {
        setStatus(FileInputStatusType.error)
      } else {
        setStatus(FileInputStatusType.success)
      }

      setFileInput({
        ...fileInput,
        renamedAmount: imageFiles ? imageFiles.length : 0,
        imageFiles: null
      })
      fileInput.ref.current && (fileInput.ref.current.value = "")
    })
  }

  return (
    <div className="flex flex-col">
      <div className="mt-14 flex flex-col items-center justify-center sm:flex-row">
        <div className="flex">
          <FileInput
            ref={fileInput.ref}
            className={`dark w-96 border-0 ${fileInput.imageFiles !== null && "no-r-border"}`}
            id="file-upload"
            onChange={() => handleFilesChange()}
            multiple
          />
          {fileInput.imageFiles !== null && (
            <Button
              className="flex items-center rounded-l-none"
              color="failure"
              size="xs"
              onClick={() => handleFilesClear()}>
              <SVGCross className="h-4 w-4 text-white" />
            </Button>
          )}
        </div>
        <Button
          id="btn-rename"
          className={`${!fileInput.imageFiles ? "active:bg-blue-700" : "active:bg-blue-900"}`}
          color="blue"
          onClick={() => handleFilesRequest()}
          disabled={!fileInput.imageFiles}>
          {isLoading ? (
            <div className="flex items-center">
              <SVGSpinner className="h-4 w-4 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600" />
              <span className="ml-2">Rename</span>
            </div>
          ) : (
            "Rename"
          )}
        </Button>
      </div>
      {status !== null && (
        <Status isError={status === FileInputStatusType.error} filesAmount={fileInput.renamedAmount} />
      )}
    </div>
  )
}
