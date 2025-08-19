export function filesValidation(files: any) {
  const allowedExtensions = /(\.txt|\.css|\.scss|\.sass)$/i

  for (const file of files) {
    if (!allowedExtensions.exec(file.name)) {
      return false
    }
  }

  return true
}
