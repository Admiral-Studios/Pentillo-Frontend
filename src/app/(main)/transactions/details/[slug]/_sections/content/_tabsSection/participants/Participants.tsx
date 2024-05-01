import ContactCard from '@/components/UI/cards/contactCard'
import useParticipantsTable, {
  IAgentsData,
} from './_hooks/useParticipantsTable'
import {
  StyledContentHeader,
  StyledContentWrapper,
  StyledWrapper,
} from './participants.styled'
import { getAddress } from '@/utils/getAddress'
import {
  StyledRegularButton,
  StyledRemoveButton,
} from '@/components/UI/buttons/buttonRegular'
import AddParticipantModal from '@/components/UI/modals/addParticipantModal'
import { useState } from 'react'

interface IParticipantsProps {
  transactionId: string
}

const Participants = ({ transactionId }: IParticipantsProps) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const participantsData = useParticipantsTable(transactionId)
  const isDisabled = !Boolean(participantsData.buyersAndSellers.length)

  const handleCloseModal = () => setModalIsOpen(false)
  const handleOpenModal = () => setModalIsOpen(true)

  return (
    <StyledWrapper>
      <StyledContentWrapper>
        <StyledContentHeader>
          <StyledRemoveButton onClick={handleOpenModal}>
            Add participant
          </StyledRemoveButton>
          <AddParticipantModal
            contacts={participantsData.contacts}
            onAddContact={participantsData.handleSelectContact}
            onAddContactOnlyForOneTransaction={
              participantsData.handleSelectOnlyForOneTransactionContact
            }
            open={modalIsOpen}
            handleClose={handleCloseModal}
          />
        </StyledContentHeader>
        <div className='content'>
          {participantsData.buyersAndSellers.map((contact) => {
            return (
              <ContactCard
                key={contact}
                address={
                  participantsData.getContactById(contact)?.homeAddressLine1 &&
                  participantsData.getContactById(contact)?.homeAddressLine2 &&
                  participantsData.getContactById(contact)?.homeAddressLine2 +
                    ' ' +
                    participantsData.getContactById(contact)?.homeAddressLine2
                }
                isAuth
                company={participantsData.getContactById(contact)?.company}
                email={participantsData.getContactById(contact)?.email}
                fullName={
                  participantsData.getContactById(contact)?.firstName &&
                  participantsData.getContactById(contact)?.lastName &&
                  participantsData.getContactById(contact)?.firstName +
                    ' ' +
                    participantsData.getContactById(contact)?.lastName
                }
                phone={participantsData.getContactById(contact)?.phone}
                userType={participantsData.getContactById(contact)?.category}
                handleRemove={() => participantsData.handleRemoveBuyer(contact)}
              />
            )
          })}
          {participantsData.transactionOnlyBuyer.map((contact) => {
            return (
              <ContactCard
                key={contact.id}
                isAuth
                email={contact.email}
                fullName={
                  contact.firstName &&
                  contact.lastName &&
                  contact.firstName + ' ' + contact.lastName
                }
                phone={contact.phone}
                userType={contact.category}
                handleRemove={() =>
                  participantsData.handleRemoveBuyer(contact.id, true)
                }
              />
            )
          })}
        </div>
      </StyledContentWrapper>
      <StyledContentWrapper isAgentsSection>
        <div className='content'>
          {agents.map(({ field, name }) => {
            const isPrimary = field === 'primaryAgent'

            return (
              <>
                <ContactCard
                  key={participantsData.agentsData[field]?.id}
                  disabled={!Boolean(participantsData.contactsOptions?.length)}
                  selectOptions={participantsData.contactsOptions}
                  onChangeSelect={(event) => {
                    if (participantsData.onChangeSelect) {
                      participantsData.onChangeSelect(event, field)
                    }
                  }}
                  isSelectedContact={Boolean(
                    participantsData.agentsData[field],
                  )}
                  selectValue={participantsData.agentsData[field]?.id}
                  isSelect
                  selectPlaceholder={name}
                  userType={participantsData.agentsData[field]?.category}
                  company={participantsData.agentsData[field]?.company}
                  isAuth
                  fullName={
                    participantsData.agentsData[field]?.firstName +
                    '' +
                    participantsData.agentsData[field]?.lastName
                  }
                  phone={participantsData.agentsData[field]?.phone}
                  email={participantsData.agentsData[field]?.email}
                  address={getAddress(
                    participantsData.agentsData[field]?.homeAddress?.lineOne,
                    participantsData.agentsData[field]?.homeAddress?.lineTwo,
                  )}
                  disabledButton={isPrimary}
                  handleRemove={() => {
                    if (!isPrimary) {
                      participantsData.handleRemoveAgent(field)
                    }
                  }}
                />
              </>
            )
          })}
        </div>
      </StyledContentWrapper>
      <StyledRegularButton
        onClick={participantsData.handleSave}
        disabled={isDisabled}
        type='submit'
        variant='contained'
      >
        Save
      </StyledRegularButton>
    </StyledWrapper>
  )
}

const agents: { field: keyof IAgentsData; name: string }[] = [
  { field: 'primaryAgent', name: 'Primary agent' },
  { field: 'goAgent', name: 'Go-Agent' },
  { field: 'firstAssistant', name: 'TC/Assistant 1' },
  { field: 'secondAssistant', name: 'TC/Assistant 2' },
]

export default Participants
