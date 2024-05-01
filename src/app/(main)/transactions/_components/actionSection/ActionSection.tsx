import { Box } from '@mui/material'
import { StyledLoadingButton } from '@/ui/components/styled'
import Image from 'next/image'
import plusIcon from '@/assets/icons/plus-icon.svg'
import Link from 'next/link'
import { NAV_LINKS } from '@/utils/constants/nav'
import { StyledRegularTooltip } from '@/components/UI/toaltips/toaltip.styled'

interface IActionSectionProps {}

const ActionSection = ({}: IActionSectionProps) => {
  return (
    <Box sx={{ display: 'flex', columnGap: '24px' }}>
      <Link href={NAV_LINKS.CREATE_TRANSACTION}>
        <StyledLoadingButton
          variant='contained'
          sx={{
            color: '#fff',
            maxHeight: '32px',
            fontSize: '14px !important',
            px: '21px !important',
            columnGap: '12px',
            minWidth: '135px',
          }}
        >
          <Image src={plusIcon} alt='Plus icon' />
          Add New
        </StyledLoadingButton>
      </Link>
    </Box>
  )
}

export default ActionSection
