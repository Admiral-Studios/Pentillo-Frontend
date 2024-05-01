import styled from '@emotion/styled'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary'
import Image from 'next/image'
import arrowTopIcon from '@/assets/icons/arrow-top-icon.svg'
import MuiAccordionDetails from '@mui/material/AccordionDetails'

export const StyledRowAccordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid transparent`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}))

export const StyledRowAccordionSummary = styled(
  (props: AccordionSummaryProps) => (
    <MuiAccordionSummary
      expandIcon={<Image src={arrowTopIcon} alt='arrow icon' />}
      {...props}
    />
  ),
)(({ theme }) => ({
  flexDirection: 'row-reverse',
  padding: '0',
  margin: '0',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {},
}))

export const StyledRowAccordionDetails = styled(MuiAccordionDetails)(
  ({ theme }) => ({
    padding: '0',
  }),
)
