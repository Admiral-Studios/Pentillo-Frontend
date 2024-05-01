import { Box } from '@mui/material'
import { StyledLoadingButton, StyledOutlinedButton } from '@/ui/components/styled'
import Image from 'next/image'
import plusIcon from '@/assets/icons/plus-icon.svg'
import { MutableRefObject, Dispatch, SetStateAction } from 'react'

interface ActionSectionProps {
  modalComponent?: JSX.Element
  anchorRef: MutableRefObject<HTMLButtonElement | null>
  setOpenModal: Dispatch<SetStateAction<boolean>>
  isOwner: boolean
}

const TableHeaderActions = ({
  anchorRef,
  modalComponent,
  setOpenModal,
  isOwner,
}: ActionSectionProps) => {
  return (
    <Box sx={{ display: 'flex', columnGap: '24px' }}>
      {isOwner ? (
        <StyledOutlinedButton
          variant='outlined'
          ref={anchorRef}
          onClick={() => setOpenModal((prev) => !prev)}
        >
          Invite
        </StyledOutlinedButton>
      ) : null}

      {/* <StyledLoadingButton
        variant='contained'
        sx={{
          color: '#fff',
          maxHeight: '32px',
          fontSize: '14px !important',
          px: '21px !important',
          columnGap: '12px',
          minWidth: '135px',
        }}
      >
        <Image src={plusIcon} alt='Plus icon' />
        Add New
      </StyledLoadingButton> */}
      {modalComponent && modalComponent}
    </Box>
  )
}

export default TableHeaderActions
