import * as yup from 'yup'

export const mailingFormSchema = yup.object().shape({
  homeAddressLine1: yup.string(),
  homeAddressLine2: yup.string(),
  homeCity: yup.string(),
  homeState: yup.string(),
  homeZIP: yup.string(),
  workAddressLine1: yup.string(),
  workAddressLine2: yup.string(),
  workCity: yup.string(),
  workState: yup.string(),
  workZIP: yup.string(),
})
