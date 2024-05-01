import * as yup from 'yup'
import {
  IForgotPasswordFormInput,
  IForgotPasswordFormInputFirstStep,
  IForgotPasswordFormInputSecondStep,
  IForgotPasswordFormInputThirdStep,
} from '@/components/types'

export const forgotPasswordFormSchema: yup.ObjectSchema<IForgotPasswordFormInput> =
  yup.object({
    password: yup
      .string()
      .required('Password is required!')
      .trim('Password must not contain a space!')
      .min(8, 'Password must be at least 8 characters long!')
      .matches(/[A-Z]/, 'Password must contain at least one capital letter!')
      .matches(/[0-9]/, 'Password must contain at least one number!')
      .max(512, 'Password can have a maximum of 512 characters!'),
    cpassword: yup
      .string()
      .required('Confirmation password is required!')
      .oneOf([yup.ref('password')], 'Passwords do not match'),
    code: yup
      .string()
      .length(4, 'Code should have 4 digits!')
      .required('Code is required!'),
    email: yup
      .string()
      .email('Email is not valid')
      .required('Email is required!'),
  })

export const forgotPasswordFormSchemaFirstStep: yup.ObjectSchema<IForgotPasswordFormInputFirstStep> =
  yup.object({
    email: yup
      .string()
      .email('Email is not valid')
      .required('Email is required!'),
  })

export const forgotPasswordFormSchemaSecondStep: yup.ObjectSchema<IForgotPasswordFormInputSecondStep> =
  yup.object({
    code: yup
      .string()
      .length(4, 'Code should have 4 digits!')
      .required('Code is required!'),
    email: yup
      .string()
      .email('Email is not valid')
      .required('Email is required!'),
  })
export const forgotPasswordFormSchemaThirdStep: yup.ObjectSchema<IForgotPasswordFormInputThirdStep> =
  yup.object({
    password: yup
      .string()
      .required('Password is required!')
      .trim('Password must not contain a space!')
      .min(8, 'Password must be at least 8 characters long!')
      .matches(/[A-Z]/, 'Password must contain at least one capital letter!')
      .matches(/[0-9]/, 'Password must contain at least one number!')
      .max(512, 'Password can have a maximum of 512 characters!'),
    cpassword: yup
      .string()
      .required('Confirmation password is required!')
      .oneOf([yup.ref('password')], 'Passwords do not match'),
  })
