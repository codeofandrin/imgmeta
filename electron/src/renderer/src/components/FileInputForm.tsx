import { Button, FileInput } from "flowbite-react"

import { sendImgPaths } from "../services/api"
import "../styles/FileInput.css"

export default function FileInputForm() {
  const handleFilesRequest = async (): Promise<void> => {
    const fileInputElem = document.getElementById("file-upload") as HTMLInputElement
    const filePaths = []
    for (let i = 0; i < fileInputElem.files.length; i++) {
      filePaths.push(fileInputElem.files[i].path)
    }

    const response = await sendImgPaths(filePaths)
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center mt-20">
      <div>
        <FileInput className="dark w-96 border-0" id="file-upload" multiple />
      </div>
      <Button id="btn-rename" color="blue" onClick={() => handleFilesRequest()}>
        Rename
      </Button>
    </div>
  )
}
