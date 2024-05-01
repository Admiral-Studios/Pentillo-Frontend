import * as yup from 'yup'
import { IAddNewContactForm } from '@/app/(main)/contacts/create-contact/types'

// export const addContactFormSchema: yup.ObjectSchema<IAddNewContactForm> =
//   yup.object({
//     title: yup.string().trim().required(),
//     firstName: yup.string().trim().required(),
//     lastName: yup.string().trim().required(),
//     jobTitle: yup.string().trim(),
//     company: yup.string().trim(),
//     category: yup.string(),
//     website: yup.string().trim(),
//     phone: yup.string().trim(),
//     email: yup.string().trim().email(),
//     fax: yup.string().trim(),
//     homeAddressLine1: yup.string().trim(),
//     homeAddressLine2: yup.string().trim(),
//     homeCity: yup.string().trim(),
//     homeState: yup.string().trim(),
//     homeZIP: yup.string().trim(),
//     workAddressLine1: yup.string().trim(),
//     workAddressLine2: yup.string().trim(),
//     workCity: yup.string().trim(),
//     workState: yup.string().trim(),
//     workZIP: yup.string().trim(),
//   })
