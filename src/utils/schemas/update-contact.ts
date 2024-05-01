import * as yup from 'yup'
import { IUpdateContactForm } from '@/app/(main)/contacts/[slug]/types'
import { CATEGORY } from '@/types/enum'

//@ts-ignore
export const updateContactFormSchema: yup.ObjectSchema<IUpdateContactForm> =
  yup.object({
    title: yup.string().trim().nullable(),
    firstName: yup.string().trim().required('First Name is required'),
    lastName: yup.string().trim().required('Last Name is required'),
    jobTitle: yup.string().trim().nullable(),
    company: yup.string().trim().nullable(),
    category: yup.string(),
    website: yup.string().trim().nullable(),
    phone: yup.string().trim().nullable(),
    email: yup.string().trim().email().required('Email is required'),
    fax: yup.string().trim().nullable(),
    homeAddressLine1: yup.string().trim().nullable(),
    homeAddressLine2: yup.string().trim().nullable(),
    homeCity: yup.string().trim().nullable(),
    homeState: yup.string().trim().nullable(),
    homeZIP: yup.string().trim().nullable(),
    workAddressLine1: yup.string().trim().nullable(),
    workAddressLine2: yup.string().trim().nullable(),
    workCity: yup.string().trim().nullable(),
    workState: yup.string().trim().nullable(),
    workZIP: yup.string().trim().nullable(),
  })
