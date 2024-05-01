import styled from '@emotion/styled'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'

export const StyledRegularTooltip = styled(
  ({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ),
)(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#fff',
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: '10px 4px 40px 0px #E0E9F380',
    fontSize: '16px',
    border: '1px solid #FF7D06',
    borderRadius: '8px',
    padding: '12px 16px',
  },
  [`& .${tooltipClasses.arrow}`]: {
    '&::before': {
      fill: '#fff',
      backgroundColor: '#fff',
      border: '1px solid #FF7D06',
    },
  },
}))


export const StyledInfoRegularTooltip = styled(
  ({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ),
)(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#F8FBFF',
    color: '#0F0F0F',
    boxShadow: '0px 12px 16px -4px #10182814',
    fontSize: '12px',
    fontWeight: 600,
    borderRadius: '8px',
    padding: '4px 12px',
  },
  [`& .${tooltipClasses.arrow}`]: {
    '&::before': {
      fill: '#F8FBFF',
      backgroundColor: '#F8FBFF',
    },
  },
}))
