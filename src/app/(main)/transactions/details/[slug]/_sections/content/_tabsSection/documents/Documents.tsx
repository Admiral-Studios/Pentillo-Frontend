import styled from '@emotion/styled'
import useDocumentsTable from './_hooks/useDocumentsTable'
import ActionRightTable from './_components/actionRightTable'
import TableLists from '@/components/tableLists'
import AccordionRow from '@/components/accordionRow'
import useDocumentsRow from '@/app/(main)/transactions/details/[slug]/_sections/content/_tabsSection/documents/_hooks/useDocumentsRow'
import ActionLeftBottom from '@/app/(main)/transactions/details/[slug]/_sections/content/_tabsSection/documents/_components/actionLeftBottom'
import { SyntheticEvent, useEffect } from 'react'

interface IDocumentsProps {
  transactionId: string
}

const Documents = ({ transactionId }: IDocumentsProps) => {
  const documentsData = useDocumentsTable()

  return (
    <StyledTabWrapper>
      <TableLists
        searchValue={documentsData.searchValue}
        setSearchValue={(value) => documentsData.handleSearch(value as string)}
        columns={documentsData.columns}
        isLoading={documentsData.isLoadingLists}
        rows={documentsData.rows}
        onClickListRow={documentsData.onClickListsRow}
        RowComponent={Row}
        title='Attachments'
        actionSection={
          <ActionRightTable
            isDisabledSaveButtonModalFile={
              documentsData.isDisabledSaveButtonModalFile
            }
            isModalUploadOpen={documentsData.isModalUploadOpen}
            handleModalUploadClose={documentsData.handleModalUploadClose}
            handleModalUploadOpen={documentsData.handleModalUploadOpen}
            transactionId={transactionId}
            validateFileError={documentsData.validateFileError}
            notesValue={documentsData.notesValue}
            onChangeNotes={documentsData.onChangeNotes}
            fileName={documentsData.fileName}
            handleChangeFileName={documentsData.handleChangeFileName}
            file={documentsData.file}
            handleFile={documentsData.handleFile}
            handleSelectChange={documentsData.handleListsSelectChange}
            selectValue={documentsData.listsSelectValue}
            listsOptions={documentsData.listsOptions}
            handleSaveFile={documentsData.handleSaveFile}
          />
        }
      />
    </StyledTabWrapper>
  )
}

interface IRowProps {
  id: string
  title: string
  isSuccessFileUpload: boolean
  expanded: string | false
  handleChangeExpanded: (
    panel: string,
  ) => (event: SyntheticEvent, isExpanded: boolean) => void
}

const Row = ({
  id,
  title,
  isSuccessFileUpload,
  expanded,
  handleChangeExpanded,
}: IRowProps) => {
  const documentRowData = useDocumentsRow({ listId: id })

  useEffect(() => {
    if (isSuccessFileUpload || documentRowData.isSuccessDeleteDocument) {
      documentRowData.refetch()
    }
  }, [isSuccessFileUpload, documentRowData.isSuccessDeleteDocument])

  return (
    <AccordionRow
      expanded={expanded}
      id={id}
      isDownload
      handleDownload={documentRowData.handleDownloadAll}
      rows={documentRowData.rows}
      columns={documentRowData.columns}
      isLoading={documentRowData.isLoading}
      title={title}
      refetch={documentRowData.refetch}
      handleDelete={documentRowData.handleDeleteList}
      handleChangeExpanded={handleChangeExpanded}
      actionsLeftSideSection={
        <ActionLeftBottom
          isSelectedRows={Boolean(documentRowData.isSelectedDocuments)}
          checked={documentRowData.isCheckAll}
          handleChecked={documentRowData.handleCheckAll}
          handleDelete={documentRowData.handleDeleteSelectedFiles}
          handleDownload={documentRowData.handleDownloadSelectedDocumnets}
        />
      }
    />
  )
}

const StyledTabWrapper = styled.div`
  border-radius: 16px;
  box-shadow: 10px 4px 40px 0px #e0e9f380;
  background: #ffffff;
`

export default Documents
