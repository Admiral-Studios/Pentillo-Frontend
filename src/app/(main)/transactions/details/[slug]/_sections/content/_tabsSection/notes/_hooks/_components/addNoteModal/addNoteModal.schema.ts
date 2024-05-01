import * as yup from 'yup'

export const noteModalFormSchema = yup.object().shape({
  text: yup.string().required('Text is required.')
})
