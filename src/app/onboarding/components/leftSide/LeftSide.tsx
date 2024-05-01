import { StyledButton } from '@/ui/components/styled'
import { NAV_LINKS } from '@/utils/constants/nav'
import useLocalStorage from '@/utils/hooks/useLocalStorage'
import { Grid, Typography } from '@mui/material'
import Link from 'next/link'

interface ILeftSideProps {
  title: string
  description: string
  isLastStep?: boolean
}

const LeftSide = ({ title, description, isLastStep }: ILeftSideProps) => {
  const { storedValue, setValue } = useLocalStorage('onboardingComplete', false)

  const completeOnboardingHandler = () => {
    setValue(true)
  }

  return (
    <Grid
      item
      sx={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        pl: '26px',
      }}
      justifyContent='center'
      alignItems='center'
      sm={12}
      md={6}
    >
      <Typography
        sx={{
          mb: '28px',
          fontSize: '32px',
          fontWeight: '500',
          lineHeight: '39px',
          letterSpacing: '0em',
          textAlign: 'center',
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: '20px',
          fontWeight: '400',
          lineHeight: '24px',
          letterSpacing: '0em',
          textAlign: 'center',
        }}
      >
        {description}
      </Typography>
      {isLastStep && (
        <Link href={NAV_LINKS.TRANSACTIONS} onClick={completeOnboardingHandler}>
          <StyledButton
            sx={{
              mt: '28px',
              color: '#FFFFFF',
              flex: '0',
              px: '66px!important',
              minWidth: 'auto',
              maxHeight: '48px',
              height: '100%',
            }}
            variant='contained'
          >
            Get started
          </StyledButton>
        </Link>
      )}
    </Grid>
  )
}

export default LeftSide
