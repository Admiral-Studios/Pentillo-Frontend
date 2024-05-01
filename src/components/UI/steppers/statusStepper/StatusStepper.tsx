import { theme } from '@/ui/theme'
import Grid, { GridOwnProps } from '@mui/material/Grid'
import styled from '@emotion/styled'
import { StepperCheckIcon } from '../../icons'
import Image from 'next/image'

interface IStep {
  step: number
  label?: string
  type?: string
}

interface IStatusStepperProps {
  step: number
  steps: IStep[]
  stepSize?: number
  gridProps?: GridOwnProps
}

const StatusStepper = ({
  step,
  stepSize,
  steps,
  gridProps,
}: IStatusStepperProps) => {
  return (
    <StyledStepperGrid container {...gridProps}>
      <StyledStepTextWrapper>
        <StyledLabel>{steps[0].label}</StyledLabel>
        <StepperCheckIconWrapper isActive />
      </StyledStepTextWrapper>

      {steps.map(
        (s, key) =>
          key !== 0 && (
            <StyledStepperGridItem key={s.step} item>
              <StyledStepItemWrapper>
                <StyledStepItem step={step > key} />
                <StyledStepTextWrapper>
                  <StyledLabel>{s.label}</StyledLabel>
                  <StepperCheckIconWrapper isActive={step > key} />
                </StyledStepTextWrapper>
              </StyledStepItemWrapper>
            </StyledStepperGridItem>
          ),
      )}
    </StyledStepperGrid>
  )
}

interface IStepTitleProps {
  isActive?: boolean
  title: string
}

const StepTitle = ({ isActive, title }: IStepTitleProps) => {
  return (
    <StyledTitleWrapper>
      {/* <Image src={} alt='' /> */}
      <StyledTitle>{title}</StyledTitle>
    </StyledTitleWrapper>
  )
}

interface IStepperCheckIconWrapperProps {
  isActive: boolean
}

const StepperCheckIconWrapper = ({
  isActive,
}: IStepperCheckIconWrapperProps) => {
  return (
    <StepperCheckIcon
      sx={{
        path: {
          opacity: isActive ? '1' : '0',
          transition: 'opacity 0.3s ease',
        },
      }}
    />
  )
}

export const StyledStepperGrid = styled(Grid)`
  display: flex;
  align-items: flex-end;
  max-width: 440px;
  width: 100%;
  max-width: 100%;
  flex-wrap: nowrap;
  min-height: 48px;
`
export const StyledStepperGridItem = styled(Grid)`
  flex: auto;
  padding: 0;
`
const StyledStepItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
export const StyledStepItem = styled.div<{ step: boolean }>`
  position: relative;
  height: 4px;
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

const StyledStepTextWrapper = styled.div`
  position: relative;
  display: flex;
`

export const StyledLabel = styled.p`
  position: absolute;
  width: max-content;
  top: -100%;
  left: 50%;
  transform: translateX(-50%) translateY(-25%);
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: center;
  margin: 0;
  margin-top: 6px;
  color: #040404;
`

export const StyledTitleWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const StyledTitle = styled.p<{ isActive?: boolean }>`
  position: absolute;
  width: max-content;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-25%);
  font-size: 14px;
  font-weight: 400;
  line-height: 17.12px;
`

export default StatusStepper
