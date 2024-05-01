import * as yup from 'yup'
import { IConfirmEmailForm } from '@/components/types'

export const confirmEmailFormSchema: yup.ObjectSchema<IConfirmEmailForm> =
  yup.object({
    code: yup
      .string()
      .length(4, 'Code should have 4 digits!')
      .required('Code is required!')
      .trim('Code must not contain a space!'),
  })
