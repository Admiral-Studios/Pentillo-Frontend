import SelectRegular from '@/components/newUI/selects/selectRegular'
import { StyledInput } from '@/components/newUI/inputs/inputs.styled'
import { StyledButtonsWrapper, StyledWrapper } from '../tabContent.styled'
import { StyledButton } from '@/components/newUI/buttons/buttons.styled'
import { IContactData } from '@/data/api/api.types'
import { IOption } from '@/components/UI/selects/selectRegular/SelectRegular'
import { useState } from 'react'
import { SelectChangeEvent } from '@mui/material'
import { capitalizeFirstWord } from '@/utils/capitalizeFirstWord'
import styled from '@emotion/styled'
import { StyledRegularTooltip } from '@/components/UI/toaltips/toaltip.styled'
import PhoneTextField from '@/components/newUI/inputs/phoneTextField'

interface IContactTabProps {
  onAddContact?: (contact: string) => void
  contacts?: IContactData[]
  handleClose: () => void
}

const ContactTab = ({
  onAddContact,
  contacts,
  handleClose,
}: IContactTabProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(false)
  const [selectedContact, setSelectedContact] = useState<
    IContactData | undefined
  >(undefined)
  const [selectedContactId, setSelectedContactId] = useState<string>('')
  const options: IOption[] | undefined = contacts?.map((contact) => ({
    name: contact.firstName + ' ' + contact.lastName,
    value: contact.id,
  }))

  const onChangeSelect = (event: SelectChangeEvent<string>) => {
    const selectedContactId = event.target.value
    const contact = contacts?.find((c) => c.id === selectedContactId)

    setSelectedContactId(selectedContactId)
    setSelectedContact(contact)
    setIsSelected(true)
  }

  const handleAdd = () => {
    const contact = contacts?.find((c) => c.id === selectedContactId)
    if (contact && onAddContact) {
      onAddContact(contact.id)
      handleClose()
    }
  }

  const isContacts = Boolean(contacts?.length)

  return (
    <StyledWrapper>
      <StyledRegularTooltip
        disableHoverListener={isContacts}
        arrow
        title='You have no contacts saved in your list.'
      >
        <div>
          <SelectRegular
            disabled={!isContacts}
            value={selectedContactId}
            onChange={onChangeSelect}
            options={options}
            placeholder='Participant'
          />
        </div>
      </StyledRegularTooltip>
      {isSelected && (
        <>
          <SelectRegular
            disabled
            placeholder={capitalizeFirstWord(selectedContact?.category)}
          />
          {selectedContact?.phone && (
            <PhoneTextField
              fieldParams={{
                disabled: true,
                value: selectedContact.phone,
                onChange: () => {},
                onBlur: () => {},
              }}
            />
          )}
          {selectedContact?.email && (
            <StyledInput disabled placeholder={selectedContact.email} />
          )}
        </>
      )}

      <StyledButtonsWrapper>
        <StyledButton
          disabled={!isContacts || !Boolean(selectedContactId)}
          onClick={handleAdd}
        >
          Add
        </StyledButton>
      </StyledButtonsWrapper>
    </StyledWrapper>
  )
}

export default ContactTab
