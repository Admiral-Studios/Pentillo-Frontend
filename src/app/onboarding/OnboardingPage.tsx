'use client'

import Navigation from './components/navigation'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import TabContext from '@mui/lab/TabContext'
import SwipeableViews from 'react-swipeable-views'
import { TabPanelProps } from '@mui/lab/TabPanel'
import { useTheme } from '@mui/material/styles'
import { ReactNode, useState } from 'react'
import { Step1, Step2, Step3, Step4, Step5, Step6 } from './stepsContent'

const OnboardingPage = () => {
  const theme = useTheme()
  const stepsCount = 6
  const [step, setStep] = useState<string>('0')

  const handleNextStep = (maxSizeSteps: number) => {
    setStep((prevStep) =>
      +prevStep !== maxSizeSteps - 1
        ? String(+prevStep + 1)
        : String(maxSizeSteps - 1)
    )
  }

  const stepsArray = [Step1, Step2, Step3, Step4, Step5, Step6]

  return (
    <Box
      sx={{
        padding: '12px',
        minHeight: '100vh',
        bgcolor: '#FBFCFD',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <TabContext value={step}>
        <Grid
          container
          spacing={2}
          sx={{
            mb: '28px',
            mt: 0,
            flexGrow: '1',
            borderRadius: '24px',
            boxShadow: '10px 4px 40px 0px #E0E9F380',
            bgcolor: '#fff',
            alignItems: 'center',
            ml: 0,
            width: '100%',
          }}
        >
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={+step}
            slideStyle={{
              display: 'flex',
            }}
          >
            {stepsArray.map((Step, key) => (
              <TabPanel
                key={key}
                props={{
                  value: String(key),
                  dir: theme.direction,
                }}
                index={String(key)}
              >
                <Step />
              </TabPanel>
            ))}
          </SwipeableViews>
        </Grid>

        <Navigation
          handleNextStep={handleNextStep}
          step={String(+step + 1)}
          stepsCount={stepsCount}
          isLastStep={stepsCount === +step + 1}
        />
      </TabContext>
    </Box>
  )
}

interface ITabPanelProps {
  props: TabPanelProps
  index: string
  children: ReactNode
}

const TabPanel = ({ props, index, children }: ITabPanelProps) => {
  const { value, ...other } = props

  return (
    // @ts-ignore
    <Grid
      role='tabpanel'
      hidden={value !== index}
      container
      spacing={2}
      sx={{
        mb: '28px',
        mt: 0,
        flexGrow: '1',
        borderRadius: '24px',
        ml: 0,
        width: '100%',
      }}
      {...other}
    >
      {children}
    </Grid>
  )
}

export default OnboardingPage
