import * as yup from 'yup'

export const addressFormSchema = yup.object().shape({
  streetNumber: yup
    .number()
    .positive()
    .integer()
    .required()
    .label('Street number'),
  dir: yup.string().required().label('Dir'),
  street: yup.string().required().label('Street'),
  unit: yup.number().positive().integer().nullable().label('Unit #'),
  purchase: yup.number().positive().integer().required().label('Purchase $'),
  netPurchase: yup
    .number()
    .positive()
    .integer()
    .required()
    .label('Net Purchase $'),
  city: yup.string().required().label('City'),
  state: yup.string().required().label('State'),
  zipCode: yup.number().positive().integer().required().label('Zip Code'),
  country: yup.string().required().label('County'),
  listAmount: yup.number().positive().integer().required().label('List $'),
  closedDate: yup.date().nullable().label('Closed Date'),
  side: yup.string().required().label('Side'),
  source: yup.string().required().label('Source'),
  propertyType: yup.string().required().label('Property Type'),
  status: yup.string().required().label('Status'),
})
