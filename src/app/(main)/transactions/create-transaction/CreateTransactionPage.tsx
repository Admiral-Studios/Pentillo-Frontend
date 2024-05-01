'use client'

import { LinkBack } from '@/components/linkBack/LinkBack'
import Stepper from './_sections/stepperSection'
import TabsContent from './_sections/tabsContent'
import { useState } from 'react'
import { TabContext } from '@mui/lab'
import { FormContextProvider } from './_context/formContext/FormContext'

const CreateTransactionPage = () => {
  const [step, setStep] = useState<string>('1')

  const handleChange = (step: string) => {
    setStep(step)
  }

  return (
    <>
      <LinkBack text={'Create new transaction'} href={'/transactions'} />
      <FormContextProvider>
        <TabContext value={step}>
          <Stepper step={+step} sxWrapperProps={{ mt: '20px', mb: '12px' }} />
          <TabsContent handleChange={handleChange} />
        </TabContext>
      </FormContextProvider>
    </>
  )
}

export default CreateTransactionPage
