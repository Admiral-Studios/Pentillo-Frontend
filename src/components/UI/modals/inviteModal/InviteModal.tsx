import { Box, Modal } from '@mui/material'
import {
  StyledButton,
  StyledModalBody,
  StyledModalDescription,
  StyledModalFooter,
  StyledModalHeader,
  StyledModalInner,
  StyledModalTitle,
} from './inviteModal.styled'
import { LetterIcon } from '@/ui/icons/LetterIcon'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { inviteInTeamFormSchema } from '@/utils/schemas/invite-in-team.schema'
import { useSendInviteToTeam } from '@/data/hooks/team.hooks'
import FormInput from '@/components/formInput/FormInput'
import { StyledLoadingButton } from '@/ui/components/styled'
import { CloseNewIcon } from '@/ui/icons/CloseNewIcon'
import toast from 'react-hot-toast'

interface IInviteModalProps {
  handleClose: () => void
  handleInvite?: () => void
  open: boolean
  title: string
  description?: string
  isTeamMember?: boolean
}

interface ISendInviteForm {
  email: string
}

const InviteModal = ({
  handleClose,
  open,
  title,
  description,
}: IInviteModalProps) => {
  const { handleSubmit, formState, reset, ...otherProps } = useForm<ISendInviteForm>({
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
    resolver: yupResolver(inviteInTeamFormSchema),
  })

  const {
    mutate: mutateSendInviteToTeam,
    isPending: isPending,
    isSuccess: isSuccess,
    isError: isError,
    error: error,
  } = useSendInviteToTeam()

  const onSubmit: SubmitHandler<ISendInviteForm> = (data) =>
    mutateSendInviteToTeam(data, {
      onSettled: () => {
        reset({ email: '' })
        handleClose()
      },
    }
  )

  return (
    <Modal open={open} onClose={handleClose}>
      <StyledModalInner>
        <StyledModalHeader>
          <Box
            onClick={handleClose}
            sx={{
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #D0D0D0',
              borderRadius: '50%',
              cursor: 'pointer',
            }}
          >
            <CloseNewIcon sx={{ width: '10px', height: '10px' }} />
          </Box>
        </StyledModalHeader>
        <StyledModalBody>
          <Box
            sx={{
              width: '78px',
              height: '78px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              cursor: 'pointer',
              backgroundColor: '#FEF1E6',
              marginBottom: '24px'
            }}
          >
            <LetterIcon sx={{ width: '48px', height: '48px' }} />
          </Box>
          <StyledModalTitle>{title}</StyledModalTitle>
          <StyledModalDescription>{description}</StyledModalDescription>
          <Box
            display={'flex'}
            flexDirection={'column'}
            component='form'
            noValidate
            autoComplete='off'
            sx={{ width: '100%', mt: '32px', gap: '24px' }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormProvider
              handleSubmit={handleSubmit}
              reset={reset}
              formState={formState}
              {...otherProps}
            >
              <FormInput
                type='email'
                name='email'
                placeholder='Email'
                error={!!formState.errors['email']}
                required
                variant='filled'
                height={'52px'}
              />
              <StyledLoadingButton
                variant='contained'
                type='submit'
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                  backgroundColor: '#FF902A',
                  color: '#fff',
                  fontSize: '20px',
                  fontWeight: 500,
                  height: '48px',
                  boxShadow: '10px 4px 40px 0px rgba(224, 233, 243, 0.50)',
                  '&:hover': {
                    backgroundColor: '#FF902A',
                  },
                }}
              >
                Invite
              </StyledLoadingButton>
            </FormProvider>
          </Box>
        </StyledModalBody>
        {/* <StyledModalFooter>
          <StyledButton
            onClick={handleInvite}
            variant='contained'
            sx={{
              backgroundColor: '#FDECEC',
              color: '#DC362E',
              fontSize: '20px',
              fontWeight: 500,
              height: '48px',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#FDECEC',
              }
            }}
          >
            Invite
          </StyledButton>
        </StyledModalFooter> */}
      </StyledModalInner>
    </Modal>
  )
}

export default InviteModal
