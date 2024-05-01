import { Box } from '@mui/material'
import { StyledLoadingButton } from '@/ui/components/styled'
import Image from 'next/image'
import plusIcon from '@/assets/icons/plus-icon.svg'
import listIcon from '@/assets/icons/task-list-icon.svg'
import { useRef, useState } from 'react'
import { useList } from '@/data/hooks/list'
import { TYPE } from '@/types/enum'
import ListModal from '@/components/UI/modals/listModal/ListModal'
import AddDateModal from '../addDateModal'
import { IOption } from '@/components/UI/selects/selectRegular/SelectRegular'

interface IActionSectionProps {
  selectedRows?: string[]
  transactionId?: string
}

const ActionSection = ({
  selectedRows,
  transactionId,
}: IActionSectionProps) => {
  const anchorRef = useRef<HTMLButtonElement | null>(null)
  const [isPopoverVisible, setVisible] = useState(false)
  const [openAddFileModal, setOpenAddFileModal] = useState<boolean>(false)

  const handleClose = () => setOpenAddFileModal(false)
  const handleClick = () => setOpenAddFileModal(true)
  const listData = useList({ type: TYPE.DATES })
  const listsOptions: IOption[] =
    listData.data?.data?.map((list) => ({ name: list.name, value: list.id })) ||
    []
  const handleModal = () => {
    setVisible((prev) => !prev)
  }
  return (
    <Box sx={{ display: 'flex', columnGap: '16px', position: 'relative' }}>
      <StyledLoadingButton
        variant='contained'
        sx={{
          color: '#AAAAAA',
          maxHeight: '32px',
          fontSize: '14px !important',
          px: '21px !important',
          columnGap: '12px',
          maxWidth: '117px',
          background: '#FFFFFF',
          border: '1px solid #F2EFEB',
          padding: '8px 16px !important',
          '&:hover': {
            background: '#FFFFFF',
          },
        }}
        onClick={handleModal}
        ref={anchorRef}
      >
        <Image src={listIcon} alt='List icon' />
        Add List
      </StyledLoadingButton>
      <ListModal
        anchorRef={anchorRef}
        isOpen={isPopoverVisible}
        setOpenHandler={setVisible}
        type={TYPE.DATES}
        transactionId={transactionId as string}
      />

      <StyledLoadingButton
        variant='contained'
        sx={{
          color: '#fff',
          maxHeight: '32px',
          fontSize: '14px !important',
          px: '21px !important',
          columnGap: '12px',
          minWidth: '140px',
        }}
        onClick={handleClick}
      >
        <Image src={plusIcon} alt='Plus icon' />
        Add Dates
      </StyledLoadingButton>
      <AddDateModal
        listsOptions={listsOptions}
        handleClose={handleClose}
        open={openAddFileModal}
      />
    </Box>
  )
}

export default ActionSection
