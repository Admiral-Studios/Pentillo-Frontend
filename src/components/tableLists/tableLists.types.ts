export interface IRowProps {
  id: string
  onRename?: () => void
  onDownload?: () => void
  onDelete?: () => void
  [key: string]: any
}
