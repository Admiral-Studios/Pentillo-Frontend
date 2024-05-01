import Typography from '@mui/material/Typography'
import { ITypographyProps } from './typography.types'

export const TypographyTitle1 = ({ children, sxProps }: ITypographyProps) => {
  return (
    <Typography
      sx={{
        fontSize: '32px',
        fontWeight: '500',
        lineHeight: '39px',
        letterSpacing: '0em',
        ...sxProps,
      }}
    >
      {children}
    </Typography>
  )
}

export const TypographyTitle2 = ({ children, sxProps }: ITypographyProps) => {
  return (
    <Typography
      sx={{
        fontSize: '24px',
        fontWeight: '500',
        lineHeight: '29.35px',
        letterSpacing: '0em',
        ...sxProps,
      }}
    >
      {children}
    </Typography>
  )
}

export const TypographyTitle3 = ({ children, sxProps }: ITypographyProps) => {
  return (
    <Typography
      sx={{
        fontSize: '20px',
        fontWeight: '400',
        lineHeight: '24.46px',
        letterSpacing: '0em',
        ...sxProps,
      }}
    >
      {children}
    </Typography>
  )
}

export const TypographySubTitle1 = ({
  children,
  sxProps,
}: ITypographyProps) => {
  return (
    <Typography
      sx={{
        fontSize: '20px',
        fontWeight: '500',
        lineHeight: '24px',
        letterSpacing: '0em',
        ...sxProps,
      }}
    >
      {children}
    </Typography>
  )
}

export const TypographySubTitle2 = ({
  children,
  sxProps,
}: ITypographyProps) => {
  return (
    <Typography
      sx={{
        fontSize: '16px',
        fontWeight: '400',
        lineHeight: '19.57px',
        letterSpacing: '0em',
        ...sxProps,
      }}
    >
      {children}
    </Typography>
  )
}

export const TypographyBody1 = ({ children, sxProps }: ITypographyProps) => {
  return (
    <Typography
      sx={{
        fontSize: '20px',
        fontWeight: '600',
        lineHeight: '24.46px',
        letterSpacing: '0em',
        ...sxProps,
      }}
    >
      {children}
    </Typography>
  )
}

export const TypographyBody2 = ({ children, sxProps }: ITypographyProps) => {
  return (
    <Typography
      sx={{
        fontSize: '16px',
        fontWeight: '500',
        lineHeight: '19.57px',
        letterSpacing: '0em',
        ...sxProps,
      }}
    >
      {children}
    </Typography>
  )
}

export const TypographyBody3 = ({ children, sxProps }: ITypographyProps) => {
  return (
    <Typography
      sx={{
        fontSize: '14px',
        fontWeight: '600',
        lineHeight: '17.12px',
        letterSpacing: '0em',
        ...sxProps,
      }}
    >
      {children}
    </Typography>
  )
}

export const TypographyBody4 = ({ children, sxProps }: ITypographyProps) => {
  return (
    <Typography
      sx={{
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '17.12px',
        letterSpacing: '0em',
        ...sxProps,
      }}
    >
      {children}
    </Typography>
  )
}

export const TypographyBody5 = ({ children, sxProps }: ITypographyProps) => {
  return (
    <Typography
      sx={{
        fontSize: '12px',
        fontWeight: '400',
        lineHeight: '17.12px',
        letterSpacing: '0em',
        ...sxProps,
      }}
    >
      {children}
    </Typography>
  )
}
