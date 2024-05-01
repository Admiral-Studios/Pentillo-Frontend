import * as yup from 'yup'

export const listCreateFormSchema: yup.ObjectSchema<{ name: string }> =
  yup.object({
    name: yup.string().required('List Name is required!'),
  })
