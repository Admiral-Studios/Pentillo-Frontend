import ContactCard from '@/components/UI/cards/contactCard'
import { StyledForm, StyledFormTitle } from '../../_utils/styled'
import {
  StyledRegularButton,
  StyledRemoveButton,
} from '@/components/UI/buttons/buttonRegular'
import { useState } from 'react'
import {
  PageWrapper,
  StyledButtonFooterWrapper,
  StyledButtonWrapper,
  StyledHeader,
  StyledList,
} from '@/app/(main)/transactions/create-transaction/_sections/tabsContent/_tabSections/contactsAndAgentsSection/contactsAndAgentsSection.styled'
import AddParticipantModal from '@/components/UI/modals/addParticipantModal'
import { useFormContext } from '@/app/(main)/transactions/create-transaction/_context/formContext/FormContext'
import { StyledRegularTooltip } from '@/components/UI/toaltips/toaltip.styled'
import 'react-phone-input-2/lib/material.css'
import { getAddress } from '@/utils/getAddress'

interface IContactsAndAgentsSectionProps {
  handleNext: () => void
  handlePrev: () => void
}

const ContactsAndAgentsSection = ({
  handleNext,
  handlePrev,
}: IContactsAndAgentsSectionProps) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const formContextData = useFormContext()

  const isDisabled =
    Boolean(
      formContextData.formState?.participant?.buyerAndSellerIds?.length,
    ) && Boolean(formContextData.formState?.participant?.primaryAgentId)
      ? false
      : true

  const handleCloseModal = () => setModalIsOpen(false)
  const handleOpenModal = () => setModalIsOpen(true)

  return (
    <PageWrapper>
      <StyledForm>
        <StyledHeader>
          <StyledFormTitle style={{ marginBottom: '0' }}>
            Participants
          </StyledFormTitle>
          <StyledButtonWrapper>
            <StyledRemoveButton onClick={handleOpenModal}>
              Add participant
            </StyledRemoveButton>
            <AddParticipantModal
              contacts={formContextData.contactsData?.data}
              onAddContact={formContextData.handleSelectContact}
              onAddContactOnlyForOneTransaction={
                formContextData.handleSelectOnlyForOneTransactionContact
              }
              open={modalIsOpen}
              handleClose={handleCloseModal}
            />
          </StyledButtonWrapper>
        </StyledHeader>
        {Boolean(
          formContextData.formState?.participant?.buyerAndSellerIds?.length ||
            formContextData.formState?.participant?.transactionContacts?.length,
        ) && (
          <StyledList>
            {[
              ...formContextData.formState?.participant?.buyerAndSellerIds!,
              ...formContextData.formState?.participant?.transactionContacts!,
            ].map((contact) => {
              return typeof contact === 'string' ? (
                <ContactCard
                  key={contact}
                  address={
                    formContextData.getContactById &&
                    formContextData.getContactById(contact)?.homeAddressLine1
                  }
                  isAuth
                  company={
                    formContextData.getContactById &&
                    formContextData.getContactById(contact)?.company
                  }
                  email={
                    formContextData.getContactById &&
                    formContextData.getContactById(contact)?.email
                  }
                  fullName={
                    formContextData.getContactById &&
                    formContextData.getContactById(contact)?.firstName +
                      ' ' +
                      formContextData.getContactById(contact)?.lastName
                  }
                  phone={
                    formContextData.getContactById &&
                    formContextData.getContactById(contact)?.phone
                  }
                  userType={
                    formContextData.getContactById &&
                    formContextData.getContactById(contact)?.category
                  }
                  handleRemove={() => {
                    if (formContextData.handleDeleteFromSelectListContact) {
                      formContextData.handleDeleteFromSelectListContact(contact)
                    }
                  }}
                />
              ) : (
                <ContactCard
                  key={contact.id}
                  address={''}
                  // company={contact?.company}
                  email={contact.email}
                  fullName={contact.firstName + ' ' + contact.lastName}
                  phone={contact.phone}
                  userType={contact.category}
                  handleRemove={() => {
                    if (formContextData.handleDeleteFromSelectListContact) {
                      formContextData.handleDeleteFromSelectListContact(
                        contact.id,
                      )
                    }
                  }}
                />
              )
            })}
          </StyledList>
        )}
      </StyledForm>

      <StyledForm>
        <StyledList isAgentsSection>
          {formContextData.selectsData?.map(
            ({ placeholder, state, fieldName }) => {
              return (
                <StyledRegularTooltip
                  title='You do not have any contacts to select for these fields.'
                  arrow
                  disableHoverListener={Boolean(
                    formContextData.contactsData?.count,
                  )}
                  key={state?.email || placeholder}
                >
                  <div>
                    <ContactCard
                      key={state?.email || placeholder}
                      disabled={!Boolean(formContextData.contactsData?.count)}
                      selectOptions={formContextData.contactsOptions}
                      onChangeSelect={(event) => {
                        if (formContextData.onChangeSelect) {
                          formContextData.onChangeSelect(event, fieldName)
                        }
                      }}
                      isSelectedContact={Boolean(state)}
                      selectValue={state?.id}
                      isSelect
                      selectPlaceholder={placeholder}
                      userType={state?.category}
                      company={state?.company}
                      isAuth
                      fullName={state?.firstName + '' + state?.lastName}
                      phone={state?.phone}
                      email={state?.email}
                      address={getAddress(
                        state?.homeAddressLine1,
                        state?.homeAddressLine2,
                      )}
                      handleRemove={() => {
                        if (formContextData.handleRemoveSelectedContact) {
                          formContextData.handleRemoveSelectedContact(fieldName)
                        }
                      }}
                    />
                  </div>
                </StyledRegularTooltip>
              )
            },
          )}
        </StyledList>
      </StyledForm>
      <StyledButtonFooterWrapper>
        <StyledRegularButton onClick={handlePrev} variant='outlined'>
          Back
        </StyledRegularButton>
        <StyledRegularTooltip
          disableHoverListener={!isDisabled}
          arrow
          title='You cannot proceed to the next step without adding at least one participant from your contacts and selecting a primary agent'
        >
          <StyledRegularButton
            onClick={handleNext}
            disabled={isDisabled}
            type='submit'
            variant='contained'
          >
            Next
          </StyledRegularButton>
        </StyledRegularTooltip>
      </StyledButtonFooterWrapper>
    </PageWrapper>
  )
}

interface INextButtonWrapperProps {
  handleNext: () => void
  isDisabled: boolean
}

export default ContactsAndAgentsSection
