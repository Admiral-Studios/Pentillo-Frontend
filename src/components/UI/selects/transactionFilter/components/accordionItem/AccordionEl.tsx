// import Accordion from '@mui/material/Accordion'
// import AccordionSummary from '@mui/material/AccordionSummary'
// import AccordionDetails from '@mui/material/AccordionDetails'
import { GridExpandMoreIcon } from '@mui/x-data-grid'
import { ReactNode } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from './accordionEl.styled'
import { SxProps } from '@mui/material'

interface IAccordionElProps {
  label: string
  children: ReactNode
  sxProps?: SxProps
}

const AccordionEl = ({ label, children, sxProps }: IAccordionElProps) => {
  return (
    // @ts-ignore
    <Accordion sx={sxProps}>
      {/* @ts-ignore */}
      <AccordionSummary>{label}</AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  )
}

export default AccordionEl
