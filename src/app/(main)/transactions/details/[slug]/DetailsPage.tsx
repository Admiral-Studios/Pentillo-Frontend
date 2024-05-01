'use client'

import { LinkBack } from '@/components/linkBack/LinkBack'
import Hero from './_sections/hero'
import Status from './_sections/status'
import Address from './_sections/address'
import Content from './_sections/content'
import {
  usePatchTransactionById,
  useTransactionById,
  useTransactionParticipant,
} from '@/data/hooks/transaction'
import {
  IAgent,
  IBuyerAndSeller,
  IPostTransactionResponse,
} from '@/data/api/api.types'
import { useEffect, useMemo } from 'react'
import { TRANSACTION_PARTICIPANT } from '@/types/enum'
import { useDateTimeline } from '@/data/hooks/date'

interface IDetailsPageProps {
  transactionId: string
}

export interface IDetailsAgent {
  field: string
  data: IAgent
}

const DetailsPage = ({ transactionId }: IDetailsPageProps) => {
  const { data: transactionData, isLoading: isLoadingTransactionData } =
    useTransactionById(transactionId)

  const { mutate: mutateTransactionById } =
    usePatchTransactionById(transactionId)

  const {
    data: transactionParticipant,
    isLoading: isLoadingTransactionParticipant,
  } = useTransactionParticipant(transactionId)

  const {
    data: transactionDateTimeline,
    isLoading: isLoadingTransactionDateTimeline,
  } = useDateTimeline({ transactionId })

  const transactionParticipants = useMemo(() => {
    let agents: IDetailsAgent[] = []
    let buyersAndSellers: IBuyerAndSeller[] = []

    if (transactionParticipant) {
      Object.entries(transactionParticipant).forEach(([key, value]) => {
        if (isAgent(key) && value) {
          agents.push({
            field: setAgent(key as TRANSACTION_PARTICIPANT),
            data: value,
          })
        } else if (key === 'id') {
        } else {
          buyersAndSellers = value
        }
      })
    }

    return { agents, buyersAndSellers }
  }, [transactionParticipant])

  return (
    <div>
      <LinkBack text={'Transactions'} href={'/transactions'} />
      <Hero
        street={getStreetFromTransaction(transactionData)}
        isLoading={isLoadingTransactionData}
        isLoadingParticipant={isLoadingTransactionParticipant}
        agents={transactionParticipants.agents}
        buyersAndSellers={transactionParticipants.buyersAndSellers}
      />
      <Status
        timeLine={transactionDateTimeline}
        isLoading={isLoadingTransactionDateTimeline}
      />

      <Address
        isLoading={isLoadingTransactionData}
        transactionData={transactionData}
        mutateTransaction={mutateTransactionById}
      />

      <Content
        transactionId={transactionId}
        transactionData={transactionData}
        isLoading={isLoadingTransactionData}
        mutateTransaction={mutateTransactionById}
      />
    </div>
  )
}

const getStreetFromTransaction = (transaction?: IPostTransactionResponse) => {
  let address: string | undefined

  if (transaction) {
    address =
      transaction?.streetNumber +
      ' ' +
      transaction?.street +
      ' ' +
      transaction?.city +
      ' ' +
      transaction?.dir +
      ' ' +
      transaction?.zipCode
  }

  return address
}

const isAgent = (key: string) =>
  key === TRANSACTION_PARTICIPANT.GO_AGENT ||
  key === TRANSACTION_PARTICIPANT.PRIMARY_AGENT ||
  key === TRANSACTION_PARTICIPANT.FIRST_ASSISTANT ||
  key === TRANSACTION_PARTICIPANT.SECOND_ASSISTANT

const setAgent = (value: TRANSACTION_PARTICIPANT) => {
  if (value === TRANSACTION_PARTICIPANT.FIRST_ASSISTANT) return 'TC/Assistant 1'
  if (value === TRANSACTION_PARTICIPANT.SECOND_ASSISTANT)
    return 'TC/Assistant 2'
  if (value === TRANSACTION_PARTICIPANT.GO_AGENT) return 'Go-Agent'
  return 'Primary Agent'
}

export default DetailsPage
