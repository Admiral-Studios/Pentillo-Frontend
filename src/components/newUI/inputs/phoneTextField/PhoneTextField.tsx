import { Box, SxProps, Typography } from '@mui/material'
import { FC } from 'react'
import { Noop, RefCallBack } from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'

type TPhoneTextFieldProps = {
  name?: string
  fieldParams?: {
    onChange: (...event: any[]) => void
    onBlur: Noop
    value: string | undefined
    disabled?: boolean | undefined
  }
  inputExtraProps?: {
    ref: RefCallBack
  }
  register?: () => {}
  label?: string
  defaultCountry?: string
  helperTextBottom?: string | undefined
  height?: string
  width?: string
  sxProps?: SxProps
}

const PhoneTextField: FC<TPhoneTextFieldProps> = (props) => {
  const {
    helperTextBottom,
    inputExtraProps,
    register = () => {},
    fieldParams,
    name,
    defaultCountry = 'pt',
    height,
    width,
    sxProps,
  } = props

  return (
    <Box
      sx={{
        '& .special-label': {
          color: '#AAAAAA',
          fontSize: '14px',
          fontWeight: 400,
          fontFamily: '__Commissioner_ceee27, __Commissioner_Fallback_ceee27',
          fontStyle: 'normal',
          top: '-12px',
          left: '68px',
          display: 'none',
        },
        '& .flag-dropdown': {
          borderColor: '#D0D5DD3D!important',
          position: 'relative',
          border: '1px solid #D0D5DD3D',
          borderRadius: '8px 0px 0px 8px',
          bgcolor: fieldParams?.disabled ? '#f3f5f7' : 'transparent',
        },
        '& .react-tel-input': {
          display: 'flex',
          flexDirection: 'row-reverse',
        },
        ...sxProps,
      }}
    >
      <PhoneInput
        {...fieldParams}
        //@ts-ignore
        {...register(name)}
        inputExtraProps={inputExtraProps}
        country={defaultCountry}
        containerStyle={{
          height: `${height}`,
          width: `${width}`,
        }}
        inputStyle={{
          height: `52px`,
          width: `100%`,
          padding: '12px 16px',
          border: '1px solid #D0D5DD3D',
          borderRadius: '0px 8px 8px 0',
          boxShadow: 'none',
          fontSize: '16px',
          fontWeight: '400',
          lineHeight: '24px',
          letterSpacing: '0em',
          backgroundColor: fieldParams?.disabled ? '#f3f5f7' : 'transparent',
        }}
        buttonStyle={{ borderRight: '1px solid #F2EFEB' }}
      />
      <Typography
        sx={{
          fontSize: '10px',
          fontWeight: 400,
          lineHeight: '17px',
          letterSpacing: '0em',
          color: ' #dc362e',
        }}
      >
        {helperTextBottom}
      </Typography>
    </Box>
  )
}

export default PhoneTextField
