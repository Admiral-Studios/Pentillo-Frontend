export function downloadCSVfile(data: string, fileName?: string) {
  const blob = new Blob([data], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)

  const flName = fileName
    ? `${fileName}-${new Date().toISOString()}`
    : 'download'

  const a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('download', `${flName}.csv`)
  a.click()
}
