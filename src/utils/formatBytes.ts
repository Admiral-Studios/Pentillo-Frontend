export const formatBytes = (bytes: number, decimals: number = 2) => {
  if (!+bytes) return '0b'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['b', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))}${sizes[i]}`
}
