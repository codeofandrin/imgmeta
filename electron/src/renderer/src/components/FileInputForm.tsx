import { useState, useRef, RefObject, useContext } from "react"
import { Button, FileInput } from "flowbite-react"

import { sendImgPaths } from "../services/api"
import Status from "./Status"
import { FileInputStatusType } from "../utils/enums"
import useYearOptionContext from "../contexts/YearOptionContext"
import useTimeOptionContext from "../contexts/TimeOptionContext"
import useCustomTextContext from "../contexts/CustomTextContext"
import SVGSpinner from "../assets/icons/Spinner.svg?react"
import SVGCross from "../assets/icons/Cross.svg?react"
import "../styles/FileInputForm.css"

function FileInputWithClear({ fileInput, handleFilesChange, handleFilesClear }) {
  return (
    <div className="flex">
      <FileInput
        ref={fileInput.ref}
        className={`dark w-72 border-0 xs:w-80 sm:w-96 ${fileInput.imageFiles !== null && "no-r-border"}`}
        id="file-upload"
        onChange={handleFilesChange}
        multiple
      />
      {fileInput.imageFiles !== null && (
        <Button
          className="flex items-center rounded-l-none"
          color="failure"
          size="xs"
          onClick={handleFilesClear}>
          <SVGCross className="h-4 w-4 text-white" />
        </Button>
      )}
    </div>
  )
}

function RenameButton({ disabled, isLoading, handleRenameRequest }) {
  return (
    <Button
      id="btn-rename"
      className={`${!disabled && "active"}`}
      color="blue"
      onClick={handleRenameRequest}
      disabled={disabled}>
      <div className="flex items-center">
        {isLoading && (
          <SVGSpinner className="h-4 w-4 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600" />
        )}
        <span className={`${isLoading && "ml-2"}`}>Rename</span>
      </div>
    </Button>
  )
}

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
  const { yearFormat } = useYearOptionContext()
  const { timeDisplayed } = useTimeOptionContext()
  const { customText, isValid: isCustomTextValid, resetCustomText } = useCustomTextContext()

  function handleFilesChange() {
    setStatus(null)

    const imageFiles = fileInput.ref.current?.files as FileList
    if (imageFiles.length > 0) {
      setFileInput({ ...fileInput, imageFiles })
    } else {
      setFileInput({ ...fileInput, imageFiles: null })
    }
  }

  function handleFilesClear() {
    setFileInput({ ...fileInput, imageFiles: null })
    fileInput.ref.current && (fileInput.ref.current.value = "")
  }

  async function handleRenameRequest() {
    setIsLoading(true)

    let filePaths: string[] = []
    const imageFiles = fileInput.imageFiles
    if (imageFiles) {
      for (let i = 0; i < imageFiles.length; i++) {
        filePaths.push(imageFiles[i].path)
      }
    }

    await sendImgPaths(filePaths, yearFormat, timeDisplayed, customText).then((isError: boolean) => {
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
      resetCustomText()
    })
  }

  const renameBtnDisabled = !fileInput.imageFiles || !isCustomTextValid

  return (
    <div className="mt-10 flex flex-col">
      <div className="flex flex-col items-center justify-center sm:flex-row">
        <FileInputWithClear
          fileInput={fileInput}
          handleFilesChange={handleFilesChange}
          handleFilesClear={handleFilesClear}
        />
        <RenameButton
          disabled={renameBtnDisabled}
          isLoading={isLoading}
          handleRenameRequest={handleRenameRequest}
        />
      </div>
      {status !== null && (
        <Status isError={status === FileInputStatusType.error} filesAmount={fileInput.renamedAmount} />
      )}
    </div>
  )
}
