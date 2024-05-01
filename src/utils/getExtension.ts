export const getExtension = (fileFullName: string) =>
  fileFullName.slice(fileFullName.lastIndexOf('.'))
