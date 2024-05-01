'use client'

import styled from '@emotion/styled'
import { HeightOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, Button, TextField } from '@mui/material'
import Link from 'next/link'
import { theme } from '../theme'

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`

export const CssTextField = styled(TextField)<{
  height?: string | undefined
  error?: boolean | undefined
}>((props) => ({
  marginBottom: 0,
  height: props.height,
  '& div': {
    height: props.height,
  },
  '& input': {
    height: `calc(${props.height} - 16px)`,
  },
  '& fieldset': {
    maxHeight: `calc(${props.height} + 8px)`,
    borderRadius: '8px',
  },
  // '& fieldset': {
  //   maxHeight: props.height,
  // },
  '& label.Mui-focused': {
    color: '#AAAAAA',
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '20px',
    '& span': {
      display: 'none',
    },
  },
  '& .MuiTextField-root': {
    marginBottom: 0,
    borderRadius: '8px',
  },
  '& .MuiInputBase-input': {
    borderColor: props.error ? '#DC362E' : '#F2EFEB',
    width: '100%',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '14px',
  },
  '& .MuiFormHelperText-root': {
    fontFamily: 'inherit',
    fontSize: '14px',
    color: '#dc362e'
  },
  '& .MuiFilledInput-root': {
    width: '100%',
    backgroundColor: '#F3F5F7',
    border: '1px solid #F3F5F7',
    borderColor: props.error ? '#DC362E' : '#F3F5F7',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '14px',
    boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    '&::before': {
      display: 'none',
    },
    '&::after': {
      display: 'none',
    },
    '&:hover': {
      border: '1px solid #FEF1E6',
    },
    '&.Mui-focused': {
      border: '1px solid #D0D0D0',
      boxShadow:
        '0px 0px 0px 4px rgba(136, 147, 168, 0.05), 0px 1px 2px 0px rgba(144, 140, 108, 0.25)',
    },
  },
  '& .MuiFormControl-root': {
    width: '100%',
    borderRadius: '8px',
  },
  '& .PrivateSwitchBase-input': {
    borderColor: '#F2EFEB',
  },
  '& .MuiInput-underline:after': {
    border: 'none',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-error': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#DC362E',
      },
    },
    '& fieldset': {
      borderColor: '#F2EFEB',
      borderRadius: '8px',
      boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    },
    '&:hover fieldset': {
      border: '1px solid #FEF1E6',
    },
    '&.Mui-focused fieldset': {
      border: '1px solid #FEF1E6',
      boxShadow:
        '0px 0px 0px 4px rgba(255, 144, 42, 0.15), 0px 1px 2px 0px rgba(255, 144, 42, 0.15)',
    },
  },
  '& .MuiInputAdornment-positionEnd': {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
  '& .MuiInputAdornment-positionStart': {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 0,
  },
}))

export const TextFieldWrapper = styled(Box)`
  position: relative;
  width: 100%;
  img {
    position: absolute;
    top: 32px;
    right: 13px;
    cursor: pointer;
  }
  div {
    width: 100%;
  }
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const StepItem = styled(Box)<{ step: boolean }>`
  position: relative;
  height: 4px;
  width: 100%;
  border-radius: 5px;
  background-color: #d0d0d0;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 5px;
    height: 100%;
    background-color: ${theme.palette.primary.main};
    width: ${(props) => (props.step ? '100%' : '0%')};
    transition: width 0.3s ease-in-out;
    z-index: 1;
  }
`

export const ButtonsContainer = styled(Box)`
  display: flex;
  gap: 8px;
  justify-content: center;
`

export const StyledButton = styled(Button)`
  width: 100%;
  text-transform: none;
  font-size: 20px;
  font-weight: 400;
  padding: 4px 0;
  border-radius: 8px;
  font-family: '__gilroySans_5e5e33', '__gilroySans_Fallback_5e5e33';
  font-weight: 500;
  border-width: 2px;
`

export const StyledLoadingButton = styled(LoadingButton)`
  width: 100%;
  text-transform: none;
  font-size: 20px;
  font-weight: 400;
  padding: 4px 0;
  border-radius: 8px;
  box-shadow: none;
  font-family: '__gilroySans_5e5e33', '__gilroySans_Fallback_5e5e33';
  font-weight: 500;
  height: 48px;

  &:hover {
    box-shadow: none;
  }
`

export const StyledOutlinedButton = styled(LoadingButton)`
  width: 100%;
  min-width: 80px;
  text-transform: none;
  font-size: 16px;
  font-weight: 500;
  padding: 12px 20px;
  border-radius: 8px;
  box-shadow: none;
  font-family: '__gilroySans_5e5e33', '__gilroySans_Fallback_5e5e33';
  font-weight: 500;
  height: 36px;
  color: #424242;
  box-shadow: 10px 4px 40px 0px rgba(224, 233, 243, 0.5);
  border: 1px solid #f2efeb;
  background-color: #fff;
  
  &:hover {
    border: 1px solid #aaaaaa;
    color: #aaaaaa;
    background-color: #fff;
    transition:
      color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
`;

export const StyledTextField = styled(TextField)`
  position: relative;
  img {
    position: absolute;
  }
`
