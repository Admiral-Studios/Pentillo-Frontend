import { StepItem } from '@/ui/components/styled'
import { Grid, GridOwnProps } from '@mui/material'
import { StyledStepGrid } from '../styled'

interface IStepComponentProps {
  step: number
  stepsLength: number
  stepSize: number
  gridProps?: GridOwnProps
}

export const StepComponent = ({
  step,
  stepsLength,
  stepSize,
  gridProps,
}: IStepComponentProps) => {
  return (
    <StyledStepGrid container spacing={2} {...gridProps}>
      {[...Array(stepsLength)].map((_, key) => (
        <Grid key={key} item md={stepSize} sx={{ padding: '0 !important' }}>
          <StepItem step={step > key} />
        </Grid>
      ))}
    </StyledStepGrid>
  )
}
