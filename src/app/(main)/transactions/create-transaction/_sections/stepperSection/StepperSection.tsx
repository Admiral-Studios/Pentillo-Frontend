import StepWithLabel from '@/components/UI/steppers/stepWithLabel'
import { SxProps } from '@mui/material'
import Box from '@mui/material/Box'

const steps = [
  { step: 1, label: 'Address' },
  { step: 2, label: 'Listing' },
  { step: 3, label: 'Contacts and Agents' },
  { step: 4, label: 'Templates' },
]

interface IStepperSectionProps {
  sxWrapperProps: SxProps
  step: number
}

const StepperSection = ({ step, sxWrapperProps }: IStepperSectionProps) => {
  return (
    <Box sx={sxWrapperProps}>
      <StepWithLabel step={step} steps={steps} />
    </Box>
  )
}

export default StepperSection
