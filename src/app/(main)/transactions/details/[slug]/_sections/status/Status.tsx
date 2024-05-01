import StatusStepper from '@/components/UI/steppers/statusStepper'
import { StyledSectionWrapper } from '../../_styled'
import { StyledSkeleton } from '@/components/UI/skeletons/skeletons.styled'
import ComponentWithSkeleton from '@/components/componentWithSkeleton'
import { IGetDateTimelineResponse } from '@/data/api/api.types'

const steps = [
  { step: 1, label: 'SEP 20 | WED' },
  { step: 2, label: 'SEP 20 | WED' },
  { step: 3, label: 'OCT 18 | WED' },
  { step: 4, label: 'OCT 24 | WED' },
  { step: 5, label: 'OCT 24 | WED' },
]

interface IStatus {
  isLoading: boolean
  timeLine?: IGetDateTimelineResponse[]
}

const Status = ({ isLoading, timeLine }: IStatus) => {
  // const steps = timeLine?.map(({title, isPinned, dueDate}) => ({}))

  return (
    <StyledSectionWrapper style={{ marginTop: '12px' }}>
      <ComponentWithSkeleton
        sxPropsSkeleton={{
          height: '48px',
        }}
        isLoading={isLoading}
      >
        <StatusStepper
          gridProps={{ sx: { px: '48.5px' } }}
          step={2}
          steps={steps}
        />
      </ComponentWithSkeleton>
    </StyledSectionWrapper>
  )
}

export default Status
