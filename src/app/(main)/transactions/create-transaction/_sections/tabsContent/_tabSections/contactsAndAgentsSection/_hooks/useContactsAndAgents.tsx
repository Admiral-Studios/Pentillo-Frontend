import { useGetContacts } from '@/data/hooks/contact'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { ISelectState } from '../contactsAndAgentsSection.types'
import { SelectChangeEvent } from '@mui/material'
import { IContactData, IContactForOneTransaction } from '@/data/api/api.types'

const useContactsAndAgents = () => {
  const [primaryAgentState, setPrimaryAgentState] =
    useState<ISelectState | null>(null)
  const [goAgentState, setGoAgentState] = useState<ISelectState | null>(null)
  const [tcAssistant1State, setTcAssistant1State] =
    useState<ISelectState | null>(null)
  const [tcAssistant2State, setTcAssistant2State] =
    useState<ISelectState | null>(null)

  const [selectedContacts, setSelectedContacts] = useState<IContactData[]>([])
  const [onlyForOneTransactionContacts, setOnlyForOneTransactionContacts] =
    useState<IContactForOneTransaction[]>([])

  const { data: contactsData } = useGetContacts()

  const isSelectedContacts = Boolean(selectedContacts.length)

  const listingList: (IContactData | IContactForOneTransaction)[] =
    useMemo(() => {
      return [...selectedContacts, ...onlyForOneTransactionContacts]
    }, [selectedContacts, onlyForOneTransactionContacts])

  // const handleSelectOnlyForOneTransactionContact = (
  //   contact: IContactForOneTransaction,
  // ) => {
  //   setOnlyForOneTransactionContacts((prevState) =>
  //     prevState.findIndex((c) => c.id === contact.id) === -1
  //       ? [...prevState, contact]
  //       : prevState,
  //   )
  // }

  // const handleSelectContact = (contact: IContactData) => {
  //   setSelectedContacts((prevState) =>
  //     prevState.findIndex((c) => c.id === contact.id) === -1
  //       ? [...prevState, contact]
  //       : prevState,
  //   )
  // }

  // const handleDeleteFromSelectListContact = (contactId: string) => {
  //   setSelectedContacts((prevState) =>
  //     prevState.filter((c) => c.id !== contactId),
  //   )
  //   setOnlyForOneTransactionContacts((prevState) =>
  //     prevState.filter((c) => c.id !== contactId),
  //   )
  // }

  // const onChangeSelect = (
  //   event: SelectChangeEvent<string>,
  //   setState: Dispatch<SetStateAction<ISelectState | null>>,
  // ) => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     selectValue: event.target.value,
  //     data:
  //       contactsData?.data?.find(
  //         (contact) => contact.id === event.target.value,
  //       ) || null,
  //   }))
  // }

  const contactsOptions = contactsData?.data.map((contact) => ({
    value: contact.id,
    name: contact.firstName + ' ' + contact.lastName,
  }))

  // const selectsData = [
  //   {
  //     placeholder: 'Primary agent',
  //     state: primaryAgentState,
  //     setState: setPrimaryAgentState,
  //   },
  //   { placeholder: 'Go-Agent', state: goAgentState, setState: setGoAgentState },
  //   {
  //     placeholder: 'TC/Assistant 1',
  //     state: tcAssistant1State,
  //     setState: setTcAssistant1State,
  //   },
  //   {
  //     placeholder: 'TC/Assistant 2',
  //     state: tcAssistant2State,
  //     setState: setTcAssistant2State,
  //   },
  // ]

  return {
    primaryAgentState,
    goAgentState,
    tcAssistant1State,
    tcAssistant2State,
    contactsData,
    // selectsData,
    listingList,
    contactsOptions,
    selectedContacts,
    isSelectedContacts,
    onlyForOneTransactionContacts,
    // handleSelectContact,
    // handleSelectOnlyForOneTransactionContact,
    // onChangeSelect,
    // handleDeleteFromSelectListContact,
  }
}

export default useContactsAndAgents
