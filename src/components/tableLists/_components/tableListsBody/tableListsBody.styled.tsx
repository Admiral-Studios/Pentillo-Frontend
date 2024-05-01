import styled from '@emotion/styled'
import { GridColDef } from '@mui/x-data-grid'
import { setGridTemplateColumns } from '@/utils/setGridTemplateColumns'
import { Menu } from '@mui/material'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary'
import Image from 'next/image'
import arrowTopIcon from '@/assets/icons/arrow-top-icon.svg'
import MuiAccordionDetails from '@mui/material/AccordionDetails'

export const StyledTHeadWrapper = styled.div``
export const StyledTHeadTopSide = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left-side {
  }
  .right-side {
  }
`
export const StyledTHeadMidSide = styled.div`
  .left-side {
  }
  .right-side {
  }
`
export const StyledTHeadBottomSide = styled.div<{ columns: GridColDef[] }>`
  display: grid;
  align-items: center;
  padding: 0 16px;
  margin-bottom: 8px;
  grid-template-columns: ${({ columns }) => setGridTemplateColumns(columns)};
`
export const StyledTHeadBottomColumn = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 17.12px;
  color: #aaaaaa;
`
export const StyledTHeadListName = styled.h2`
  font-size: 14px;
  font-weight: 400;
  line-height: 17.12px;
  color: #040404;
`

export const StyledMenu = styled(Menu)`
  .MuiPaper-root {
    max-width: 120px;
    width: 100%;
    border: 1px solid #e7e7e7;
    border-radius: 8px;
    padding: 8px 0px 8px 0px;
    box-shadow: 10px 4px 40px 0px #e0e9f380;
  }
  .MuiList-root {
    padding: 0;
  }
  .MuiButtonBase-root {
    display: flex;
    column-gap: 11.68px;
    align-items: center;
    &:hover {
      background-color: #fffbf699;
    }
  }

  a {
    display: contents;
  }
`

export const StyledTBodyWrapper = styled.div``
export const StyledTBodyRow = styled.div``

export const TableListRowAccordion = styled((props: AccordionProps) => (
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

export const TableListRowAccordionSummary = styled(
  (props: AccordionSummaryProps) => (
    <MuiAccordionSummary
      expandIcon={<Image src={arrowTopIcon} alt='arrow icon' />}
      {...props}
    />
  ),
)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, .05)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {},
}))

export const TableListRowAccordionDetails = styled(MuiAccordionDetails)(
  ({ theme }) => ({
    padding: 2,
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }),
)
