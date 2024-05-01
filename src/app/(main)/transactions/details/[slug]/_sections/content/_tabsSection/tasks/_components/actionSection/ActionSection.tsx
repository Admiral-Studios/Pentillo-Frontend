import { Box } from '@mui/material'
import { StyledLoadingButton } from '@/ui/components/styled'
import Image from 'next/image'
import plusIcon from '@/assets/icons/plus-icon.svg'
import listIcon from '@/assets/icons/task-list-icon.svg'
import Link from 'next/link'
import { NAV_LINKS } from '@/utils/constants/nav'
import { useRef, useState } from 'react'
import AddListModal from '@/components/UI/modals/addListModal/AddListModal'
import { useList } from '@/data/hooks/list'
import { TYPE } from '@/types/enum'
import { IListData } from '@/data/api/api.types'
import { useAddTaskToList } from '@/data/hooks/task'
import { useQueryClient } from '@tanstack/react-query'
import ListModal from '@/components/UI/modals/listModal/ListModal'
import AddTaskModal from '../addTaskModal/AddTaskModal'

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
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [addModalIsOpen, setAddModalIsOpen] = useState<boolean>(false)
  const listData = useList({ type: TYPE.TASKS })
  const handleModal = () => {
    selectedRows?.length
      ? setModalIsOpen((prev) => !prev)
      : setVisible((prev) => !prev)
  }
  const toggleAddModal = () => {
    setAddModalIsOpen((prev) => !prev)
  }
  const queryClient = useQueryClient()
  const { mutate: mutateAddTaskToList } = useAddTaskToList({ queryClient })
  const handleAddToList = (listId: string) => {
    mutateAddTaskToList({ taskIds: selectedRows as string[], listId: listId })
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
          maxWidth: '116px',
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
            minWidth: '135px',
          }}
          onClick={toggleAddModal}
        >
          <Image src={plusIcon} alt='Plus icon' />
          Add Tasks
        </StyledLoadingButton>
 

      <AddListModal
        lists={listData?.data}
        open={modalIsOpen}
        handleClose={handleModal}
        onAddList={handleAddToList}
      />
      <AddTaskModal
        title={'kk'}
        handleClose={toggleAddModal}
        open={addModalIsOpen}
        id={'s'}
        onSuccess={() => {}}
      />
    </Box>
  )
}

export default ActionSection
