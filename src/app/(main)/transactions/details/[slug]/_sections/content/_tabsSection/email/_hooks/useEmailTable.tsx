import { GridColDef } from '@mui/x-data-grid'

const useEmailTable = () => {
  let rows: any[] = []
  let columns: GridColDef[] = [
    { field: 'address', headerName: 'To:', width: 340 },
    { field: 'side', headerName: 'Subject', width: 370 },
    { field: 'status', headerName: 'Sender', width: 150 },
    { field: 'price', headerName: 'Sent Date', width: 90 },
    { field: 'actions', headerName: '', width: 20 },
  ]
  return { rows, columns, isLoading: false }
}

export default useEmailTable
