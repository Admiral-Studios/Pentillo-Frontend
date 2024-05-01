import { GridColDef } from '@mui/x-data-grid'

export const setGridTemplateColumns = (columns: GridColDef[]) => {
  return columns
    .map(
      (column) =>
        (column.width &&
          `minmax(
            ${column.width}px, ${(column.maxWidth && column.maxWidth + 'px') || '1fr'}
          )`) ||
        100 / columns.length + '%',
    )
    .join(' ')
}
