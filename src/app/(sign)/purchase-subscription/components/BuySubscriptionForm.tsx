'use client'

import { StyledLoadingButton } from '@/ui/components/styled'
import {
  Grid,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
} from '@mui/material'
import { useState } from 'react'
import Image from 'next/image'
import logo from '@/assets/icons/logo.svg'
import { useUserCreateSubscription } from '@/data/hooks/subscription'
import { NAV_LINKS } from '@/utils/constants/nav'
import { useRouter } from 'next/navigation'
import useLocalStorage from '@/utils/hooks/useLocalStorage'
import ToggleButton from '@/components/UI/buttons/ToggleButton/ToggleButton'
import checkIcon from '@/assets/icons/check-icon-2.svg'
import { SUBCRIPTION_PLAN } from '@/types/enum'

const planList = [
  'Dashboards and Reports',
  'Unlimited Transactions',
  'Unlimited Templates',
  'Up to 3 profiles',
  'Unlimited Team Members',
]

const subscriptionPlans = [
  { label: 'Monthly', value: SUBCRIPTION_PLAN.MONTHLY },
  { label: 'Yearly', value: SUBCRIPTION_PLAN.YEARLY },
]

const BuySubscriptionForm = ({isFullWidth, successUrl}: {isFullWidth?: boolean, successUrl?: string}) => {
  const { mutate: mutateCreateSubscription } = useUserCreateSubscription()
  const { storedValue } = useLocalStorage('onboardingComplete', false)


  const { push } = useRouter()
  const [subscriptionPlan, setSubscriptionPlan] = useState<SUBCRIPTION_PLAN>(SUBCRIPTION_PLAN.MONTHLY)

  const handleCHangeSubscriptionPlan = (value: string) => {
    setSubscriptionPlan(value as SUBCRIPTION_PLAN)
  }

  return (
    <Grid
      container
      justifyContent='center'
      alignItems='center'
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      sm={12}
      md={isFullWidth ? 12 : 6}
    >
      <Grid
        item
        sx={{
          backgroundColor: '#fff',
          maxWidth: '520px',
          maxHeight: '644px',
          height: '100%',
          width: '100%',
          borderRadius: '24px',
        }}
      >
        <Grid
          sx={{
            boxShadow: !isFullWidth ? { sm: '10px 4px 40px 0px rgba(224, 233, 243, 0.50)' } : 'none',
            p: '40px',
            borderRadius: '24px',
            maxHeight: '644px',
            height: '100%',
          }}
        >
          <Box
            sx={{
              '&': {
                textAlign: 'center',
                width: '100%',
                fontSize: '40px',
                fontWeight: 600,
                pb: '40px',
              },
            }}
          >
            <Image src={logo} alt='Logo' />
          </Box>
          <Box
            display='flex'
            flexDirection='column'
            sx={{ width: '100%', gap: '32px' }}
          >
            <Box
              sx={{
                width: '100%',
              }}
            >
              <ToggleButton
                options={subscriptionPlans}
                onChange={handleCHangeSubscriptionPlan}
                initialValue={subscriptionPlan}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography
                  sx={{
                    fontSize: '32px',
                    fontWeight: '600',
                    lineHeight: '39.14px',
                    letterSpacing: '0em',
                  }}
                >
                  {subscriptionPlan === SUBCRIPTION_PLAN.YEARLY ? '575.99 USD' : '59.99 USD' }
                </Typography>
                <Typography
                  sx={{
                    fontSize: '20px',
                    fontWeight: '400',
                    lineHeight: '24.46px',
                    letterSpacing: '0em',
                    color: '#AAAAAA',
                  }}
                >
                  {subscriptionPlan}
                </Typography>
              </Box>
              {subscriptionPlan === SUBCRIPTION_PLAN.YEARLY && (
                <Box
                  sx={{
                    width: '87px',
                    height: '29px',
                    backgroundColor: 'rgba(30, 91, 87, 0.08)',
                    borderRadius: '8px',
                    padding: '6px 12px 6px 12px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#1E5B57',
                  }}
                >
                  Save 20%
                </Box>
              )}
            </Box>
            <List
              dense
              sx={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '20px',
                py: '0',
              }}
            >
              {planList.map((plan) => (
                <ListItem
                  sx={{
                    columnGap: '11.33px',
                    py: '0',
                    pl: '8px',
                    color: '#040404',
                  }}
                  key={plan}
                >
                  <ListItemIcon sx={{ minWidth: 'auto' }}>
                  <Image src={checkIcon} alt='checkIcon' />
                  </ListItemIcon>
                  <Typography
                    sx={{
                      fontSize: '16px',
                      fontWeight: '400',
                      lineHeight: '20px',
                      letterSpacing: '0em',
                    }}
                  >
                    {plan}
                  </Typography>
                </ListItem>
              ))}
            </List>
            <StyledLoadingButton
              loading={false}
              type='submit'
              variant='contained'
              onClick={() =>
                mutateCreateSubscription(
                  {
                    successUrl: successUrl ? successUrl : `${storedValue
                        ? NAV_LINKS.TRANSACTIONS
                        : NAV_LINKS.ONBOARDING
                    }`,
                    type: subscriptionPlan
                  },
                  {
                    onSuccess(data) {
                      push(data || NAV_LINKS.ONBOARDING)
                    },
                  },
                )
              }
              sx={{
                py: '12px',
                width: '100%',
                color: '#FFFFFF',
                textTransform: 'initial',
              }}
            >
              Buy Subscription
            </StyledLoadingButton>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default BuySubscriptionForm
