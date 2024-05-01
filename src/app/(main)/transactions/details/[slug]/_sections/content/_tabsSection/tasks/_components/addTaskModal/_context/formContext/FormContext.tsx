import { IContactGetResponse, IPostTransactionBody } from '@/data/api/api.types'
import { useGetContacts } from '@/data/hooks/contact'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

interface IFormContextReturn {
  contactsData?: IContactGetResponse
  handleSelectContact?: (contactId: string) => void
  assignedPersonId?: string
  setAssignedPersonId?: Dispatch<SetStateAction<string>>
  handleDeleteAssignedPerson?: () => void
}

export const FormContext = createContext<IFormContextReturn>({})

interface IFormContextProviderProps {
  children: ReactNode
}

export function FormContextProvider({ children }: IFormContextProviderProps) {
  const [assignedPersonId, setAssignedPersonId] = useState('')

  const { data: contactsData } = useGetContacts()

  const handleSelectContact = (contactId: string) => {
    setAssignedPersonId(contactId)
  }

  const handleDeleteAssignedPerson = () => {
    setAssignedPersonId('')
  }

  const value = {
    assignedPersonId,
    setAssignedPersonId,
    contactsData,
    handleSelectContact,
    handleDeleteAssignedPerson
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
