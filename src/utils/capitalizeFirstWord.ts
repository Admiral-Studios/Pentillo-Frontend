export const capitalizeFirstWord = (sentence?: string) => {
  if (!sentence) {
    return ''
  }
  return sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase()
}
