import * as yup from 'yup'

export const templateFormSchema = yup.object().shape({
  templateId: yup.string().label('Template'),
})
