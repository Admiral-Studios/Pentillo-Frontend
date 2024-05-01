import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import { GridExpandMoreIcon } from '@mui/x-data-grid'
import { ReactNode } from 'react'

interface IAccordionElProps {
  label: string
  children: ReactNode
}

const AccordionEl = ({ label, children }: IAccordionElProps) => {
  return (
    <Accordion
      sx={{
        boxShadow: 'none',
        m: '0!important',
        '&:before': {
          display: 'none',
        },
      }}
    >
      <AccordionSummary
        expandIcon={<GridExpandMoreIcon />}
        aria-controls='panel1-content'
        id='panel1-header'
        sx={{
          padding: '0',
          minHeight: '38px!important',
          maxHeight: '38px!important',
          height: '38px',
          margin: '0!important',
          borderBottom: '1px solid #F2EFEB',

          '.Mui-expanded': {
            margin: '0!important',
          },
        }}
      >
        {label}
      </AccordionSummary>
      <AccordionDetails
        sx={{
          padding: '0',
        }}
      >
        {children}
      </AccordionDetails>
    </Accordion>
  )
}

export default AccordionEl
