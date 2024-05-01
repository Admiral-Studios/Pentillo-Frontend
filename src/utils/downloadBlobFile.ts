'use client'

export const downloadBlobFile = (data: Blob, fileName: string) => {
  const url = URL.createObjectURL(data)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
