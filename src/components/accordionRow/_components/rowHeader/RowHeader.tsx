import { Dispatch, ReactNode, SetStateAction, useRef, useState } from 'react'
import { Box } from '@mui/material'
import { TableSearch } from '@/components/table/components/tableHeader/TableHeader'
import styled from '@emotion/styled'
import TableActionRow from '@/components/table/components/tableActionRow/tableActionRow'
import ListEditModal from '@/app/(main)/tasks/_components/listEditModal/ListEditModal'
import { TYPE } from '@/types/enum'

interface IRowHeaderProps {
  title: string
  actionSection?: ReactNode
  isSearch?: boolean
  search?: string
  id?: string
  isDownload?: boolean
  setSearch?: Dispatch<SetStateAction<string>>
  handleDelete: (id: string) => void
  handleDownload?: () => void
  type?: TYPE
}

const RowHeader = ({
  title,
  actionSection,
  isSearch,
  search,
  id,
  isDownload,
  handleDownload,
  setSearch,
  handleDelete,
  type = TYPE.TASKS,
}: IRowHeaderProps) => {
  const anchorRef = useRef<HTMLButtonElement | null>(null)
  const [isPopoverVisible, setVisible] = useState(false)
  return (
    <Box
      sx={{
        p: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          columnGap: '12px',
        }}
      >
        <StyledTypography>{title}</StyledTypography>

        <TableActionRow
          isDownload={isDownload}
          handleDownload={handleDownload}
          isList={true}
          listEditRef={anchorRef}
          modalTitle={`Are you sure want to delete “${title}” list?`}
          modalDescription='You will not be able to recover a deleted list'
          deleteHandler={() => handleDelete(id as string)}
          handleRename={() => setVisible(true)}
        />
        <ListEditModal
          id={id as string}
          anchorRef={anchorRef}
          isOpen={isPopoverVisible}
          setOpenHandler={setVisible}
          title={title}
          type={type}
        />

        {isSearch && <TableSearch search={search} setSearch={setSearch} />}
      </Box>

      {actionSection}
    </Box>
  )
}

const StyledTypography = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 2;
  margin: 0;
`

export default RowHeader
