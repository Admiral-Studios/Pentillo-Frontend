import { theme } from '@/ui/theme'
import Grid, { GridOwnProps } from '@mui/material/Grid'
import styled from '@emotion/styled'

interface IStep {
  step: number
  label?: string
}

interface IStepWithLabelProps {
  step: number
  steps: IStep[]
  stepSize?: number
  gridProps?: GridOwnProps
}

const StepWithLabel = ({
  step,
  stepSize,
  steps,
  gridProps,
}: IStepWithLabelProps) => {
  return (
    <StyledStepperGrid container spacing={2} {...gridProps}>
      {steps.map((s, key) => (
        <StyledStepperGridItem key={s.step} item>
          <StyledStepItem step={step > key} />
          <StyledLabel step={step > key}>{s.label}</StyledLabel>
        </StyledStepperGridItem>
      ))}
    </StyledStepperGrid>
  )
}

export const StyledStepperGrid = styled(Grid)`
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 440px;
  width: 100%;
  max-width: 100%;
  flex-wrap: nowrap;
`
export const StyledStepperGridItem = styled(Grid)`
  flex: auto;
  padding: 0;
`
export const StyledStepItem = styled.div<{ step: boolean }>`
  position: relative;
  height: 8px;
  width: 100%;
  border-radius: 5px;
  background-color: #d0d0d0;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 5px;
    height: 100%;
    background-color: ${theme.palette.secondary.main};
    width: ${(props) => (props.step ? '100%' : '0%')};
    transition: width 0.3s ease-in-out;
    z-index: 1;
  }
`

export const StyledLabel = styled.p<{ step: boolean }>`
  font-size: 14px;
  font-weight: 500;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: center;
  margin: 0;
  margin-top: 16px;
  color: ${(props) => (props.step ? '#040404' : '#AAAAAA')};
`

export default StepWithLabel
