import {
  IPatchTransactionBody,
  IPostTransactionResponse,
} from '@/data/api/api.types'
import { TabContext } from '@mui/lab'
import { SyntheticEvent, useState } from 'react'
import { Details } from './_tabsSection'
import { UseMutateFunction } from '@tanstack/react-query'
import Tasks from './_tabsSection/tasks'
import Documents from './_tabsSection/documents'
import {
  ITab,
  StyledPanel,
  StyledTab,
  StyledTabs,
} from '@/components/UI/tabs/tabs.styled'
import Participants from './_tabsSection/participants'
import Email from './_tabsSection/email'
import Dates from './_tabsSection/dates/Dates'
import Payout from './_tabsSection/payout'
import Notes from './_tabsSection/notes/Notes'

interface IContent {
  transactionId: string
  transactionData?: IPostTransactionResponse
  isLoading: boolean
  mutateTransaction: UseMutateFunction<
    any,
    Error,
    IPatchTransactionBody,
    unknown
  >
}

const Content = ({
  transactionId,
  transactionData,
  isLoading,
  mutateTransaction,
}: IContent) => {
  const [value, setValue] = useState<string>('1')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const tabs: ITab[] = [
    {
      label: 'Details',
      value: '1',
      tabContent: (
        <Details
          isLoading={isLoading}
          transactionData={transactionData}
          mutateTransaction={mutateTransaction}
        />
      ),
    },
    {
      label: 'Tasks',
      value: '2',
      tabContent: <Tasks transactionData={transactionData} />,
    },
    {
      label: 'Documents',
      value: '3',
      tabContent: <Documents transactionId={transactionId} />,
    },
    {
      label: 'Dates',
      value: '4',
      tabContent: <Dates transactionData={transactionData} />,
    },
    {
      label: 'Participants',
      value: '5',
      tabContent: <Participants transactionId={transactionId} />,
    },
    {
      label: 'Payout',
      value: '6',
      tabContent: <Payout transactionId={transactionData?.id as string} />,
    },
    { label: 'Email', value: '7', tabContent: <Email /> },
    {
      label: 'Notes',
      value: '8',
      tabContent: <Notes transactionId={transactionData?.id as string} />,
    },
  ]

  return (
    <TabContext value={value}>
      <StyledTabs
        value={value}
        onChange={handleChange}
        aria-label='lab API tabs example'
      >
        {tabs.map((tab) => (
          <StyledTab key={tab.value} label={tab.label} value={tab.value} />
        ))}
      </StyledTabs>
      {tabs.map((tab) => (
        <StyledPanel key={tab.value} value={tab.value}>
          {tab.tabContent}
        </StyledPanel>
      ))}
    </TabContext>
  )
}

export default Content
