import * as yup from 'yup'

export const addNewFormSchema = yup.object().shape({
  name: yup.string().required('List name is required'),
})
