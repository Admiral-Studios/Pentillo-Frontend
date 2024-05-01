import { Modal } from '@mui/material'
import {
  StyledModalBody,
  StyledModalHeader,
  StyledModalWrapper,
  StyledTab,
  StyledTabs,
} from './addParticipantModal.styled'
import { IModalProps } from '../modals.types'
import usersIcon from '@/assets/icons/users-icon.svg'
import Image from 'next/image'
import { SyntheticEvent, useState } from 'react'
import ContactTab from './_tabContent/contactTab'
import TabPanel from './_components/tabPanel'
import AddNewTab from './_tabContent/addNewTab'
import closeModalIcon from '@/assets/icons/close-modal-2-icon.svg'
import { IContactData, IContactForOneTransaction } from '@/data/api/api.types'
import Dialog, { DialogProps } from '@mui/material/Dialog'

interface IAddParticipantModal extends IModalProps {
  contacts?: IContactData[]
  onAddContact?: (contactId: string) => void
  onAddContactOnlyForOneTransaction?: (
    contact: IContactForOneTransaction,
  ) => void
}

const AddParticipantModal = ({
  handleClose,
  open,
  contacts,
  onAddContact,
  onAddContactOnlyForOneTransaction,
}: IAddParticipantModal) => {
  const [value, setValue] = useState<number>(0)

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Dialog
      sx={{
        '.MuiPaper-root': {
          maxWidth: '482px',
          width: '100%',
        },
      }}
      scroll='body'
      open={open}
      onClose={handleClose}
    >
      <StyledModalWrapper>
        <StyledModalHeader>
          <Image className='user-image' src={usersIcon} alt='users icon' />
          <h3>Add Participant</h3>
          <p>Select your participant</p>
          <Image
            onClick={handleClose}
            className='close-icon'
            src={closeModalIcon}
            alt='close modal icon'
          />
        </StyledModalHeader>
        <StyledModalBody>
          <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label='styled tabs example'
          >
            <StyledTab label='Contacts' />
            <StyledTab label='Add new' />
          </StyledTabs>
        </StyledModalBody>

        <TabPanel value={value} index={0}>
          <ContactTab
            handleClose={handleClose}
            contacts={contacts}
            onAddContact={onAddContact}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AddNewTab
            handleClose={handleClose}
            onAddContact={onAddContact}
            onAddContactOnlyForOneTransaction={
              onAddContactOnlyForOneTransaction
            }
          />
        </TabPanel>
      </StyledModalWrapper>
    </Dialog>
  )
}

export default AddParticipantModal
