import { CATEGORY } from '@/types/enum'

export const formatCategory = (category?: CATEGORY) => {
  if (category) {
    const words = category.toLowerCase().split('_')

    const formattedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1),
    )

    return formattedWords.join(' ')
  } else {
    return undefined
  }
}
