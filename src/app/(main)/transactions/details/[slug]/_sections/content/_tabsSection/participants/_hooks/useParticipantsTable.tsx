import { TParticipantKeys } from '@/app/(main)/transactions/transaction.types'
import { IOption } from '@/components/UI/selects/selectRegular/SelectRegular'
import {
  IAgent,
  IBuyerAndSeller,
  IContactData,
  IContactForOneTransaction,
  IPostTransactionBody,
} from '@/data/api/api.types'
import { useGetContacts } from '@/data/hooks/contact'
import {
  useChangeTransactionParticipant,
  usePatchTransactionById,
  useTransactionParticipant,
} from '@/data/hooks/transaction'
import { SelectChangeEvent } from '@mui/material'
import { UseMutateFunction } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export interface ITransactionOnlyContact extends IContactForOneTransaction {
  isAuth: boolean
}

interface IUseParticipantsTableReturn {
  agentsData: IAgentsData
  buyersAndSellers: string[]
  primaryAgent?: IAgent | null
  goAgent?: IAgent | null
  firstAssistant?: IAgent | null
  secondAssistant?: IAgent | null
  isLoading: boolean
  contactsOptions?: IOption[]
  contacts?: IContactData[]
  transactionOnlyBuyer: IContactForOneTransaction[]
  onChangeSelect: (
    event: SelectChangeEvent<string>,
    field: keyof IAgentsData,
  ) => void
  handleRemoveAgent: (field: keyof IAgentsData) => void
  handleSelectContact: (contactId: string) => void
  handleSelectOnlyForOneTransactionContact: (
    contact: IContactForOneTransaction,
  ) => void
  handleRemoveBuyer: (id: string, isTransactionOnly?: boolean) => void
  handleSave: () => void
  getContactById: (contactId?: string) => IContactData | undefined
}

export interface IAgentsData {
  primaryAgent?: IAgent
  goAgent?: IAgent
  firstAssistant?: IAgent
  secondAssistant?: IAgent
}

const useParticipantsTable = (
  transactionId: string,
): IUseParticipantsTableReturn => {
  const [transactionOnlyBuyer, setTransactionOnlyBuyer] = useState<
    ITransactionOnlyContact[]
  >([])
  const [agentsData, setAgentsData] = useState<IAgentsData>({})
  const [buyersAndSellersData, setBuyersAndSellersData] = useState<string[]>([])

  const {
    data: transactionParticipant,
    isLoading: isLoadingTransactionParticipant,
  } = useTransactionParticipant(transactionId)
  const { data: contactsData } = useGetContacts()
  const { mutate: changeTransactionParticipant } =
    useChangeTransactionParticipant(transactionId)

  const contactsOptions: IOption[] | undefined = contactsData?.data.map(
    (contact) => ({
      value: contact.id,
      name: contact.firstName + ' ' + contact.lastName,
    }),
  )

  const onChangeSelect = (
    event: SelectChangeEvent<string>,
    field: keyof IAgentsData,
  ) => {
    const findedContact: IAgent | undefined = contactsData?.data.find(
      (contact) => contact.id === event.target.value,
    ) as IAgent

    setAgentsData((prevState) => ({
      ...prevState,
      [field]: {
        id: findedContact.id,
        title: findedContact?.title,
        firstName: findedContact?.firstName,
        lastName: findedContact?.lastName,
        jobTitle: findedContact?.jobTitle,
        company: findedContact?.company,
        website: findedContact?.website,
        phone: findedContact?.phone,
        email: findedContact?.email,
        fax: findedContact?.fax,
        category: findedContact?.category,
        homeAddress: findedContact?.homeAddress?.lineOne,
        workAddress: findedContact?.workAddress?.lineOne,
      },
    }))
  }

  const handleRemoveAgent = (field: keyof IAgentsData) => {
    setAgentsData((prevState) => ({
      ...prevState,
      [field]: null,
    }))
  }

  const handleSelectContact = (contactId: string) => {
    const findBuyerAndSeller = buyersAndSellersData.find(
      (buyer) => buyer === contactId,
    )

    if (!findBuyerAndSeller) {
      setBuyersAndSellersData((prevState) => [...prevState, contactId])
    }
  }

  const getContactById = useCallback(
    (contactId?: string): IContactData | undefined => {
      let contactData: IContactData | undefined = undefined

      if (contactsData && contactId) {
        contactData = contactsData.data.find(
          (contact) => contact.id === contactId,
        )
      }

      if (!contactData && transactionParticipant) {
        contactData = transactionParticipant?.buyersAndSellers.find(
          (c) => c.id === contactId,
        )
      }

      return contactData
    },
    [contactsData, buyersAndSellersData, transactionParticipant],
  )

  const handleSelectOnlyForOneTransactionContact = (
    contact: IContactForOneTransaction,
  ) => {
    const findContact = transactionOnlyBuyer.find((c) => c.id === contact.id)

    if (!findContact) {
      setTransactionOnlyBuyer((prevState) => [
        ...prevState,
        { ...contact, isAuth: false },
      ])
    }
  }

  const handleRemoveBuyer = (id: string, isTransactionOnly?: boolean) => {
    if (isTransactionOnly) {
      setTransactionOnlyBuyer((prevState) =>
        prevState.filter((contact) => contact.id !== id),
      )
    } else {
      setBuyersAndSellersData((prevState) =>
        prevState.filter((contact) => contact !== id),
      )
    }
  }

  const handleSave = useCallback(() => {
    if (transactionParticipant && agentsData.primaryAgent) {
      changeTransactionParticipant(
        {
          participantId: transactionParticipant.id,
          body: {
            buyerAndSellerIds: buyersAndSellersData,
            primaryAgentId: agentsData.primaryAgent.id,
            firstAssistantId: agentsData.firstAssistant?.id || null,
            goAgentId: agentsData.goAgent?.id || null,
            secondAssistantId: agentsData.secondAssistant?.id || null,
            transactionContacts: transactionOnlyBuyer,
          },
        },
        {
          onSuccess() {
            toast.success('The participants was successfully changed.', {
              style: { maxWidth: '600px' },
            })
          },
        },
      )
    }
  }, [
    agentsData.firstAssistant?.id,
    agentsData.goAgent?.id,
    agentsData.primaryAgent,
    agentsData.secondAssistant?.id,
    buyersAndSellersData,
    changeTransactionParticipant,
    transactionOnlyBuyer,
    transactionParticipant,
  ])

  useEffect(() => {
    if (transactionParticipant) {
      setAgentsData(() => ({
        firstAssistant: transactionParticipant?.firstAssistant,
        goAgent: transactionParticipant?.goAgent,
        primaryAgent: transactionParticipant?.primaryAgent,
        secondAssistant: transactionParticipant?.secondAssistant,
      }))

      setBuyersAndSellersData(
        transactionParticipant.buyersAndSellers.map((p) => p.id),
      )
    }
  }, [setAgentsData, transactionParticipant])

  return {
    transactionOnlyBuyer,
    agentsData,
    contactsOptions,
    contacts: contactsData?.data,
    buyersAndSellers: buyersAndSellersData,
    primaryAgent: agentsData.primaryAgent,
    goAgent: agentsData?.goAgent,
    firstAssistant: agentsData?.firstAssistant,
    secondAssistant: agentsData?.secondAssistant,
    isLoading: isLoadingTransactionParticipant,
    onChangeSelect,
    handleRemoveAgent,
    handleSelectContact,
    handleSelectOnlyForOneTransactionContact,
    handleRemoveBuyer,
    handleSave,
    getContactById,
  }
}

export default useParticipantsTable
