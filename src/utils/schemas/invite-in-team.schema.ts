import * as yup from 'yup'

export const inviteInTeamFormSchema: yup.ObjectSchema<{ email: string }> = yup.object(
  {
    email: yup
      .string()
      .email('Email is not valid')
      .required('Email is required!'),
  }
)
