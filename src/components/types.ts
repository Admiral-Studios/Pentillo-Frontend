import {
  IPostAuthSignInParams,
  IPostAuthSignUpParams,
} from '@/data/api/api.types'

export interface ISignInFormInput extends IPostAuthSignInParams {}
export interface ISignUpFormInput
  extends Pick<
    IPostAuthSignUpParams,
    'firstName' | 'lastName' | 'email' | 'password'
  > {}

export interface IForgotPasswordFormInput {
  password?: string
  cpassword?: string
  email?: string
  code?: string
}

export interface IForgotPasswordFormInputFirstStep {
  email: string
}

export interface IForgotPasswordFormInputSecondStep {
  email: string
  code: string
}

export interface IForgotPasswordFormInputThirdStep {
  password: string
  cpassword: string
}

export interface IChangePasswordForm {
  oldPassword: string
  password: string
  cpassword: string
}

export interface IChangeEmailForm {
  newEmail: string
}

export interface IConfirmEmailForm {
  code: string
}
