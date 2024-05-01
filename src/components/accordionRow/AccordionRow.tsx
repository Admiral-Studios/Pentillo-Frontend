import styled from '@emotion/styled'
import { Dispatch, ReactNode, SetStateAction, SyntheticEvent } from 'react'
import { GridColDef } from '@mui/x-data-grid'
import TableBody from '@/components/table/components/tableBody/TableBody'
import {
  StyledRowAccordion,
  StyledRowAccordionDetails,
  StyledRowAccordionSummary,
} from '@/components/accordionRow/accordionRow.styled'
import RowHeader from '@/components/accordionRow/_components/rowHeader'
import RowActions from '@/components/accordionRow/_components/rowActions'
import { TYPE } from '@/types/enum'

interface IAccordionRowProps {
  id: string
  title: string
  columns: GridColDef[]
  isLoading: boolean
  rows: any[]
  isSearch?: boolean
  searchValue?: string
  actionSection?: ReactNode
  actionsLeftSideSection?: ReactNode
  filterSection?: ReactNode
  notFoundMessage?: string
  isDownload?: boolean
  expanded?: string | false
  setSearchValue?: Dispatch<SetStateAction<string>>
  refetch?: () => void
  handleDelete?: (id: string) => void
  handleDownload?: () => void
  handleChangeExpanded?: (
    panel: string,
  ) => (event: SyntheticEvent, isExpanded: boolean) => void
  type?: TYPE
}

const AccordionRow = ({
  id,
  expanded,
  title,
  columns,
  isLoading,
  rows,
  isSearch,
  searchValue,
  actionSection,
  actionsLeftSideSection,
  filterSection,
  notFoundMessage,
  isDownload,
  handleDownload,
  setSearchValue,
  handleDelete = () => {},
  refetch,
  handleChangeExpanded,
  type = TYPE.TASKS,
}: IAccordionRowProps) => {

  return (
    <StyledAccordionRowWrapper>
      <StyledRowAccordion
        onChange={(_, expanded) => {
          if (handleChangeExpanded) handleChangeExpanded(id)(_, expanded)
          if (expanded && refetch) refetch()
        }}
        expanded={
          typeof expanded === 'boolean' || typeof expanded === 'string'
            ? expanded === id
            : undefined
        }
        TransitionProps={{ unmountOnExit: true }}
      >
        <StyledRowAccordionSummary>
          <RowHeader
            isDownload={isDownload}
            handleDownload={handleDownload}
            isSearch={isSearch}
            search={searchValue}
            setSearch={setSearchValue}
            actionSection={actionSection}
            title={title}
            id={id}
            handleDelete={handleDelete}
            type={type}
          />
        </StyledRowAccordionSummary>
        <StyledRowAccordionDetails>
          <RowActions
            actionsLeftSideSection={actionsLeftSideSection}
            filterSection={filterSection}
          />
          <TableBody
            notFoundMessage={notFoundMessage}
            columns={columns}
            rows={rows}
            isLoading={isLoading}
          />
        </StyledRowAccordionDetails>
      </StyledRowAccordion>
    </StyledAccordionRowWrapper>
  )
}

const StyledAccordionRowWrapper = styled.div`
  border: 1px solid #f2efeb;
  border-radius: 8px;
  overflow: hidden;
  padding: 8px;
`

export default AccordionRow
