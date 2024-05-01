import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react'
import {
  IContactData,
  IContactForOneTransaction,
  IContactGetResponse,
  IPostTransactionBody,
} from '@/data/api/api.types'
import { useCreateTransaction } from '@/data/hooks/transaction'
import { UseMutateFunction } from '@tanstack/react-query'
import { useGetContacts } from '@/data/hooks/contact'
import { SelectChangeEvent } from '@mui/material'
import { IOption } from '@/components/UI/selects/selectRegular/SelectRegular'
import { TParticipantKeys } from '../../../transaction.types'

interface ISelectData {
  placeholder: string
  state: IContactData | undefined
  fieldName: TParticipantKeys
}

interface IFormContextReturn {
  mutateCreateTransaction?: UseMutateFunction<
    any,
    Error,
    IPostTransactionBody,
    unknown
  >
  isPendingCreateTransaction?: boolean

  contactsData?: IContactGetResponse
  contactsOptions?: IOption[]
  formState?: IPostTransactionBody
  selectsData?: ISelectData[]
  setFormState?: Dispatch<SetStateAction<IPostTransactionBody>>
  setFormValues?: (data: IPostTransactionBody | {}) => void
  getContactById?: (contactId: string) => IContactData | undefined
  handleSelectContact?: (contactId: string) => void
  handleDeleteFromSelectListContact?: (contactId: string) => void
  onChangeSelect?: (
    event: SelectChangeEvent<string>,
    field: TParticipantKeys,
  ) => void
  handleRemoveSelectedContact?: (field: TParticipantKeys) => void
  handleSelectOnlyForOneTransactionContact?: (
    contact: IContactForOneTransaction,
  ) => void
}

export const FormContext = createContext<IFormContextReturn>({})

interface IFormContextProviderProps {
  children: ReactNode
}

export function FormContextProvider({ children }: IFormContextProviderProps) {
  const [formState, setFormState] = useState<IPostTransactionBody>({
    // @ts-ignore
    participant: {
      transactionContacts: [],
      buyerAndSellerIds: [],
    },
  })

  const setFormValues = (data: IPostTransactionBody | {}) => {
    setFormState((prevState) => ({ ...prevState, ...data }))
  }

  const { data: contactsData } = useGetContacts()

  const {
    mutate: mutateCreateTransaction,
    isPending: isPendingCreateTransaction,
  } = useCreateTransaction({})

  const getContactById = useCallback(
    (contactId?: string): IContactData | undefined => {
      let contactData: IContactData | undefined = undefined

      if (contactsData && contactId) {
        contactData = contactsData.data.find(
          (contact) => contact.id === contactId,
        )
      }

      return contactData
    },
    [formState.participant, contactsData],
  )

  const selectsData: ISelectData[] = [
    {
      placeholder: 'Primary agent',
      state: getContactById(formState.participant?.primaryAgentId),
      fieldName: 'primaryAgentId',
    },
    {
      placeholder: 'Go-Agent',
      state: getContactById(formState.participant?.goAgentId),
      fieldName: 'goAgentId',
    },
    {
      placeholder: 'TC/Assistant 1',
      state: getContactById(formState.participant?.firstAssistantId),
      fieldName: 'firstAssistantId',
    },
    {
      placeholder: 'TC/Assistant 2',
      state: getContactById(formState.participant?.secondAssistantId),
      fieldName: 'secondAssistantId',
    },
  ]
  // step 3 - start
  const handleSelectOnlyForOneTransactionContact = (
    contact: IContactForOneTransaction,
  ) => {
    setFormState((prevState) => ({
      ...prevState,
      participant: {
        ...prevState.participant,
        transactionContacts:
          prevState.participant.transactionContacts.findIndex(
            (c) => c.id === contact.id,
          ) === -1
            ? [
                ...prevState.participant.transactionContacts,
                { ...contact, isAuth: false },
              ]
            : prevState.participant.transactionContacts,
      },
    }))
  }

  const handleSelectContact = (contactId: string) => {
    setFormState((prevState) => ({
      ...prevState,
      participant: {
        ...prevState.participant,
        buyerAndSellerIds:
          prevState.participant?.buyerAndSellerIds?.findIndex(
            (c) => c === contactId,
          ) === -1
            ? [...prevState.participant?.buyerAndSellerIds, contactId]
            : prevState.participant?.buyerAndSellerIds,
      },
    }))
  }
  const handleDeleteFromSelectListContact = (contactId: string) => {
    setFormState((prevState) => ({
      ...prevState,
      participant: {
        ...prevState.participant,
        buyerAndSellerIds: prevState.participant.buyerAndSellerIds.filter(
          (cId) => cId !== contactId,
        ),
        transactionContacts: prevState.participant.transactionContacts.filter(
          (c) => c.id !== contactId,
        ),
      },
    }))
  }

  const onChangeSelect = (
    event: SelectChangeEvent<string>,
    field: TParticipantKeys,
  ) => {
    setFormState((prevState) => ({
      ...prevState,
      participant: {
        ...prevState.participant,
        [field]: event.target.value,
      },
    }))
  }

  const contactsOptions: IOption[] | undefined = contactsData?.data.map(
    (contact) => ({
      value: contact.id,
      name: contact.firstName + ' ' + contact.lastName,
    }),
  )

  const handleRemoveSelectedContact = (field: TParticipantKeys) => {
    setFormState((prevState) => {
      const copyState = { ...prevState }
      delete copyState.participant[field]

      return copyState
    })
  }
  // step 3 - end

  const value = {
    isPendingCreateTransaction,
    formState,
    contactsData,
    selectsData,
    contactsOptions,
    getContactById,
    mutateCreateTransaction,
    setFormState,
    setFormValues,
    handleSelectContact,
    handleDeleteFromSelectListContact,
    onChangeSelect,
    handleSelectOnlyForOneTransactionContact,
    handleRemoveSelectedContact,
  }

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}

export function useFormContext() {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error(
      'useFormContext must be used within the FormContextProvider',
    )
  }
  return context
}
