import { Box, Modal } from '@mui/material'
import {
  StyledButton,
  StyledModalBody,
  StyledModalDescription,
  StyledModalFooter,
  StyledModalHeader,
  StyledModalInner,
  StyledModalTitle,
} from './modalDelete.styled'
import closeIcon from '@/assets/icons/close-modal-icon.svg'
import Image from 'next/image'
import { RemoveIcon } from '@/ui/icons/RemoveIcon'
import { CloseNewIcon } from '@/ui/icons/CloseNewIcon'

interface IModalDeleteProps {
  handleClose: () => void
  handleDelete?: () => void
  open: boolean
  title: string
  description?: string
  isTeamMember?: boolean
}

const ModalDelete = ({
  handleClose,
  handleDelete,
  open,
  title,
  description,
  isTeamMember,
}: IModalDeleteProps) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <StyledModalInner>
        <StyledModalHeader>
          <Box
            onClick={handleClose}
            sx={{
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #D0D0D0',
              borderRadius: '50%',
              cursor: 'pointer',
            }}
          >
            <CloseNewIcon sx={{ width: '8px', height: '8px' }} />
          </Box>
        </StyledModalHeader>
        <StyledModalBody>
          <Box
            sx={{
              width: '78px',
              height: '78px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              cursor: 'pointer',
              backgroundColor: '#FDECEC',
            }}
          >
            <RemoveIcon sx={{ width: '48px', height: '48px' }} />
          </Box>
          <StyledModalTitle>{title}</StyledModalTitle>
          <StyledModalDescription>{description}</StyledModalDescription>
        </StyledModalBody>
        <StyledModalFooter>
          <StyledButton
            onClick={handleClose}
            variant='outlined'
            sx={{
              border: '1px solid #F2EFEB',
              color: '#424242',
              fontSize: '20px',
              fontWeight: 500,
              height: '48px',
            }}
          >
            Cancel
          </StyledButton>
          <StyledButton
            onClick={handleDelete}
            variant='contained'
            sx={{
              backgroundColor: '#FDECEC',
              color: '#DC362E',
              fontSize: '20px',
              fontWeight: 500,
              height: '48px',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#FDECEC',
              },
            }}
          >
            {isTeamMember ? 'Leave' : 'Delete'}
          </StyledButton>
        </StyledModalFooter>
      </StyledModalInner>
    </Modal>
  )
}

export default ModalDelete
