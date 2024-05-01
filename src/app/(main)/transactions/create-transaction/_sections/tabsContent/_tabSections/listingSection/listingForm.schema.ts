import * as yup from 'yup'

export const listingFormSchema = yup.object().shape({
  listDate: yup.date().required().label('List Date'),
  expireDate: yup.date().required().label('Expire Date'),
  beds: yup.number().positive().integer().required().label('Beds'),
  bath: yup.number().positive().integer().required().label('Bath'),
  built: yup.date().required().label('Built'),
  lot: yup.string().required().label('Lot'),
  sqft: yup.number().positive().integer().required().label('Sqft'),
  costSqft: yup.number().positive().integer().required().label('$ / sqft'),
  taxId: yup.string().required().label('Tax ID'),
  hoaFee: yup.string().required().label('HOA Fee'),
  hoaFrequency: yup.string().required().label('HOA Frequency'),
  parcelId: yup.string().nullable().label('Parcel ID #'),
  occupancy: yup.string().required().label('Occupancy'),
  lockBoxCode: yup.string().nullable().label('Lock Box Code'),
  lockBoxLocation: yup
    .string()
    .nullable()
    .label('Lock Box Location/Instruction'),
  securityAlarmCode: yup.string().nullable().label('Security Alarm Code'),
  mls: yup.string().required().label('MLS #'),
  remark: yup.string().nullable().label('Remark'),
  additionalInfo: yup.string().nullable().label('Additional Info'),
  fileNumber: yup.string().required().label('File Number'),
  financing: yup.string().required().label('Financing'),
  concessions: yup.string().required().label('Concessions'),
  earnestMoney: yup
    .number()
    .positive()
    .integer()
    .required()
    .label('Earnest Money'),
  additionalProvisions: yup.string().nullable().label('Additional Provisions'),
  otherInfo: yup.string().nullable().label('Other info'),
})
