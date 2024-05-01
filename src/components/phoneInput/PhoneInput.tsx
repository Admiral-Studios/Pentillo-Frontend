import { Box, SxProps, Typography } from '@mui/material'
import { FC } from 'react'
import { Noop, RefCallBack } from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'

type PhoneInputProps = {
  name?: string
  fieldParams: {
    onChange: (...event: any[]) => void
    onBlur: Noop
    value: string | undefined
    disabled?: boolean | undefined
  }
  inputExtraProps: {
    ref: RefCallBack
  }
  register?: () => {}
  label: string
  defaultCountry?: string
  helperTextBottom?: string | undefined
  height?: string
  width?: string
  sxProps?: SxProps
}

const PhoneInputField: FC<PhoneInputProps> = (props) => {
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
          color: '#040404',
          fontSize: '14px',
          fontWeight: 400,
          fontStyle: 'normal',
          top: '-20px',
          left: '0px',
          padding: 0,
          lineHeight: '16.8px',
          fontFamily: '__gilroySans_5e5e33, __gilroySans_Fallback_5e5e33'
        },
        '& .react-tel-input .form-control:hover': {
          border: '1px solid #FEF1E6 !important',
        },
        '& .react-tel-input .form-control:focus': {
          border: '1px solid #FEF1E6 !important',
          boxShadow:
          '0px 0px 0px 4px rgba(255, 144, 42, 0.15), 0px 1px 2px 0px rgba(255, 144, 42, 0.15) !important',
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
          height: `${height}`,
          width: `${width}`,
          padding: '4px 4px 4px 58px',
          border: '1px solid #F2EFEB',
          borderRadius: '8px',
          boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
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

export default PhoneInputField
