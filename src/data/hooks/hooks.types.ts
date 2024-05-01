export interface IUserChangePassword {
  oldPassword: string
  newPassword: string
}

export interface ISearchParams {
  name: string | null
  email: string | null
  role: string | null
}

export interface IForgotPasswordParams {
  handleStep: (step: number) => void
}

export interface IUserChangePasswordParams {
  handleStep?: (step: number) => void
}

export interface ISetCookieParams {
  accessToken: string
  refreshToken: string
}

export interface IUserUpdateProfile {
  firstName: string
  lastName: string
  company: string
}

export interface IUserUpdateEmail {
  newEmail: string
}

export interface IUserConfirmEmail {
  code: string
}

export interface IUserUpdateAvatar {
  file: File
}

export interface IUseDeleteTransactionProps {
  onSuccess?: () => void
}

export interface IUseDeleteContactProps {
  onSuccess?: () => void
}

export interface IUseDeleteTaskProps {
  onSuccess?: () => void
}

export interface IUseDeleteNoteProps {
  onSuccess?: () => void
}

export interface IUseDeleteListProps {
  onSuccess?: () => void
}

export interface IUseLeaveTeamProps {
  onSuccess?: () => void
}
