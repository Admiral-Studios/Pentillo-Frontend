import { Box } from '@mui/material'
import { StyledLoadingButton } from '@/ui/components/styled'
import Image from 'next/image'
import plusIcon from '@/assets/icons/plus-icon.svg'

import { useRef, useState } from 'react'

import { useQueryClient } from '@tanstack/react-query'
import AddNoteModal from '../addNoteModal/AddNoteModal'
import { notesKeys } from '@/data/queryKeys'
interface INotesActionSectionProps {
  transactionId?: string
}

const NotesActionSection = ({
  transactionId,
}: INotesActionSectionProps) => {
 const queryClient = useQueryClient();
  const [openAddNoteModal, setOpenAddNoteModal] = useState<boolean>(false)

  const toggleAddNoteModal = () => setOpenAddNoteModal((prev) => !prev)
  return (
    <Box sx={{ display: 'flex', columnGap: '16px', position: 'relative' }}>
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
        onClick={toggleAddNoteModal}
      >
        <Image src={plusIcon} alt='Plus icon' />
        Add Notes
      </StyledLoadingButton>

      <AddNoteModal
        transactionId={transactionId as string}
        handleClose={toggleAddNoteModal}
        open={openAddNoteModal}
        onSuccess={() =>
          queryClient.invalidateQueries({
            queryKey: [notesKeys.all],
          })
        }
      />
    </Box>
  )
}

export default NotesActionSection
