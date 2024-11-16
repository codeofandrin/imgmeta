import { useState, useRef, RefObject } from "react"
import { Button, FileInput } from "flowbite-react"

import { sendImgPaths } from "../services/api"
import Status from "./Status"
import { FileInputStatusBasicType, ErrorType } from "../utils/enums"
import useYearOptionContext from "../contexts/YearOptionContext"
import useTimeOptionContext from "../contexts/TimeOptionContext"
import useCustomTextContext from "../contexts/CustomTextContext"
import { StatusType } from "../utils/types"
import SVGSpinner from "../assets/icons/Spinner.svg?react"
import SVGCross from "../assets/icons/Cross.svg?react"
import "../styles/FileInputForm.css"

function FileInputWithClear({ fileInput, handleFilesChange, handleFilesClear }) {
  return (
    <div className="flex">
      <FileInput
        ref={fileInput.ref}
        className={`dark w-full border-0 ${fileInput.imageFiles !== null && "no-r-border"}`}
        id="file-upload"
        onChange={handleFilesChange}
        multiple
        accept="image/png, image/jpeg"
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
  const [status, setStatus] = useState<StatusType | null>(null)
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
        // @ts-ignore: 'path' exists here
        filePaths.push(imageFiles[i].path)
      }
    }

    await sendImgPaths(filePaths, yearFormat, timeDisplayed, customText).then(({ isError, errorData }) => {
      setIsLoading(false)

      if (isError) {
        if (errorData === null) {
          // unexpected
          setStatus({
            type: FileInputStatusBasicType.error,
            error: { type: ErrorType.unexpected, item: null }
          })
        } else {
          setStatus({
            type: FileInputStatusBasicType.error,
            error: { type: errorData["code"] as ErrorType, item: errorData["detail"]["item"] }
          })
        }
      } else {
        setStatus({ type: FileInputStatusBasicType.success, error: null })
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
    <div className="mt-10 flex w-72 flex-col justify-center xs:w-80 sm:w-fit sm:flex-row sm:items-start">
      <div className="flex w-full flex-col sm:w-96">
        <FileInputWithClear
          fileInput={fileInput}
          handleFilesChange={handleFilesChange}
          handleFilesClear={handleFilesClear}
        />
        {status !== null && (
          <Status className="hidden sm:block" status={status} filesAmount={fileInput.renamedAmount} />
        )}
      </div>
      <RenameButton
        disabled={renameBtnDisabled}
        isLoading={isLoading}
        handleRenameRequest={handleRenameRequest}
      />
      {status !== null && (
        <Status className="sm:hidden" status={status} filesAmount={fileInput.renamedAmount} />
      )}
    </div>
  )
}
