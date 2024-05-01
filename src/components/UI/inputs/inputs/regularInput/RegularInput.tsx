import { CssTextField } from '@/ui/components/styled'
import { Box, SxProps } from '@mui/material'
import React from 'react'
import { RefCallBack } from 'react-hook-form'

interface IInputRegularProps {
  sxInput?: SxProps
  height?: string
  value?: string | number | Date | null | undefined
  placeholder?: string
  disabled?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  label?: string
  focused?: boolean
  error?: boolean
  helperText?: string
  multiline?: boolean
  filled?: boolean
  rows?: number
  ref?: RefCallBack
}
const RegularInput = ({
  sxInput,
  height,
  value,
  placeholder,
  disabled,
  onChange,
  label,
  error,
  focused,
  helperText,
  filled = false,
  multiline,
  rows = 1,
  ref,
}: IInputRegularProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
      }}
    >
      <p
        style={{
          margin: 0,
          fontWeight: '400',
          fontSize: '14px',
          color: '#040404',
          lineHeight: '16.8px',
        }}
      >
        {label}
      </p>
      <CssTextField
        ref={ref}
        height={height}
        error={error}
        sx={{
          ...sxInput,
          backgroundColor: filled ? '#F3F5F7' : '#FFFFFF',
          borderRadius: '8px',
        }}
        placeholder={placeholder}
        focused={focused}
        multiline={multiline}
        rows={rows}
        disabled={disabled}
        onChange={onChange}
        value={value}
        helperText={helperText}
      />
    </Box>
  )
}

export default RegularInput
