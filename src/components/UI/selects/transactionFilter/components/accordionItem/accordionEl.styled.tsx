import { styled } from '@mui/material/styles'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import { GridExpandMoreIcon } from '@mui/x-data-grid'

export const Accordion = styled((props) => (
  //@ts-ignore
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  boxShadow: 'none',
  m: '0!important',
  '&:before': {
    display: 'none',
  },
}))

export const AccordionSummary = styled((props) => (
  <MuiAccordionSummary expandIcon={<GridExpandMoreIcon />} {...props} />
))(() => ({
  padding: '0',
  minHeight: '40px!important',
  maxHeight: '40px!important',
  height: '40px',
  margin: '0!important',
  borderBottom: '1px solid #F2EFEB',
  fontSize: '16px',
  fontWeight: '500',
  lineHeight: '24px',
  color: '#717171',
  '.Mui-expanded': {
    margin: '0!important',
    color: '#040404',
  },
}))

export const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  padding: '0',
}))
