import { StyledButton } from '@/ui/components/styled'
import { NAV_LINKS } from '@/utils/constants/nav'
import Box from '@mui/material/Box'
import Link from 'next/link'
import { CSSProperties } from 'react'
import { StepComponent } from '@/app/(sign)/forgot-password/components/StepComponent'
import useLocalStorage from '@/utils/hooks/useLocalStorage'

interface INavigationProps {
  handleNextStep: (stepsCount: number) => void
  step: string
  stepsCount: number
  isLastStep: boolean
}

const Navigation = ({
  handleNextStep,
  step,
  stepsCount,
  isLastStep,
}: INavigationProps) => {
  const hiddenButtonStyles: CSSProperties = {
    opacity: isLastStep ? '0' : '1',
    visibility: isLastStep ? 'hidden' : 'visible',
    transitionProperty: 'opacity, visibility',
    transitionDuration: '0.3s',
    transitionTimingFunction: 'ease-in-out',
  }

  const { setValue } = useLocalStorage('onboardingComplete', false)

  const completeOnboardingHandler = () => {
    setValue(true)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Link
        href={NAV_LINKS.TRANSACTIONS}
        onClick={completeOnboardingHandler}
        style={{
          ...hiddenButtonStyles,
        }}
      >
        <StyledButton
          sx={{
            flex: '0',
            px: '45.5px!important',
            minWidth: 'auto',
            maxHeight: '48px',
          }}
          variant='outlined'
        >
          Skip
        </StyledButton>
      </Link>

      <StepComponent step={+step} stepsLength={stepsCount} stepSize={2} />
      <StyledButton
        sx={{
          color: '#FFFFFF',
          flex: '0',
          px: '45.5px!important',
          minWidth: 'auto',
          maxHeight: '48px',
          ...hiddenButtonStyles,
        }}
        onClick={() => handleNextStep(stepsCount)}
        variant='contained'
      >
        Next
      </StyledButton>
    </Box>
  )
}

export default Navigation
