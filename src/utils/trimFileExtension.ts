export const trimFileExtension = (fileName: string) =>
  fileName.replace(new RegExp(/\.[^/.]+$/), '')
