'use client'
import Table from '@/components/table'
import useNotesTable from './_hooks/useNotesTable'
import NotesActionLeftSide from './_hooks/_components/NotesActionLeftSide/NotesActionLeftSide'
import NotesActionSection from './_hooks/_components/NotesActionSection/NotesActionSection'

const Notes = ({ transactionId }: { transactionId: string }) => {
  const notesData = useNotesTable({ transactionId })

  return (
    <Table
      columns={notesData.transactionTableData.columns}
      rows={notesData.transactionTableData.rows}
      title='Notes'
      actionSection={
        <NotesActionSection transactionId={transactionId as string} />
      }
      actionsLeftSideSection={
        <NotesActionLeftSide
          checked={notesData.isCheckAll}
          handleChecked={notesData.handleCheckAll}
          selectedRows={notesData.selectNotes}
          handleDelete={notesData.handleDeleteNote}
          isOpenDeleteModal={notesData.isOpenDeleteModal}
          toggleDeleteModal={notesData.toggleDeleteModal}
        />
      }
      searchValue={notesData.search}
      setSearchValue={notesData.setSearch}
      isLoading={notesData.isLoading}
    
    />
  )
}

export default Notes
