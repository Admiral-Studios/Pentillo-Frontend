import { Modal } from '@mui/material'
import {
  StyledModalBody,
  StyledModalHeader,
  StyledModalWrapper,
  StyledTab,
  StyledTabs,
} from './addListModal.styled'
import { IModalProps } from '../modals.types'
import usersIcon from '@/assets/icons/users-icon.svg'
import Image from 'next/image'
import { SyntheticEvent, useState } from 'react'
import ContactTab from './_tabContent/contactTab'
import TabPanel from './_components/tabPanel'
import AddNewTab from './_tabContent/addNewTab'
import closeModalIcon from '@/assets/icons/close-modal-2-icon.svg'
import { IGetListsResponse, IListData } from '@/data/api/api.types'

interface IAddListModal extends IModalProps {
  lists?: IGetListsResponse | { data: IListData[] }
  onAddList?: (listId: string) => void
}

const AddListModal = ({
  handleClose,
  open,
  lists,
  onAddList,
}: IAddListModal) => {
  const [value, setValue] = useState<number>(0)

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <StyledModalWrapper>
        <StyledModalHeader>
          <Image className='user-image' src={usersIcon} alt='users icon' />
          <h3>Add List</h3>
          <p>Select your list</p>
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
            <StyledTab label='Lists' />
            <StyledTab label='Add new' />
          </StyledTabs>
        </StyledModalBody>
        <TabPanel value={value} index={0}>
          <ContactTab
            handleClose={handleClose}
            lists={lists?.data}
            onAddList={onAddList}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AddNewTab handleClose={handleClose} onAddList={onAddList} />
        </TabPanel>
      </StyledModalWrapper>
    </Modal>
  )
}

export default AddListModal
