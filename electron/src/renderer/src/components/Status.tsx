interface StatusPropsType {
  isError: boolean
  filesAmount: number
}

export default function Status({ isError, filesAmount }: StatusPropsType) {
  let statusMsg = isError
    ? "Something went wrong. Please try again."
    : `Successfully renamed ${filesAmount} files.`
  let statusColor = isError ? "text-red-500" : "text-green-500"

  return <p className={`mt-2 text-sm ${statusColor}`}>{statusMsg}</p>
}
