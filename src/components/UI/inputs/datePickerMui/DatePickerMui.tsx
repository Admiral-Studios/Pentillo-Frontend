import {
  DateValidationError,
  LocalizationProvider,
  PickerChangeHandlerContext,
} from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Dayjs } from 'dayjs'
import { ChangeEvent } from 'react'
import { Box } from '@mui/material'

interface IDatePickerMui {
  label?: string
  value: Dayjs
  selected?: Date | undefined
  onChange?: (
    value: ChangeEvent<Dayjs> | null,
    context: PickerChangeHandlerContext<DateValidationError>,
  ) => void
  onBlur?: () => void
  height?: string
  filled?: boolean
}

const DatePickerMui = ({
  value,
  onChange,
  label,
  onBlur,
  height,
  selected,
  filled = false,
}: IDatePickerMui) => {
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          //@ts-ignore
          value={value}
          selected={selected}
          onChange={onChange}
          sx={{
            height: height || '36px',
            backgroundColor: filled ? '#F3F5F7' : '#FFFFFF',
            borderRadius: '8px',
            '.MuiFormLabel-root': {
              '&.Mui-focused': {
                color: '#AAAAAA',
                fontWeight: '400',
                fontSize: '18px',
                lineHeight: '20px',
              },
            },
            '.MuiInputBase-root': {
              height: height || '36px',
              borderRadius: '8px',
              borderColor: '#F2EFEB',
              padding: '10px 16px',
              boxShadow: '0px 1px 2px 0px #1018280D',

              '&.Mui-focused': {
                fieldset: {
                  borderColor: '#F2EFEB',
                  borderWidth: '1px',
                },
                input: {
                  padding: '0',
                },
              },
            },
            '.MuiInputAdornment-root': {
              '.MuiSvgIcon-root': {
                display: 'none',
              },
              '.MuiButtonBase-root': {
                position: 'absolute',
                width: '100%',
                height: '100%',
                left: '0',
                top: '0',
                borderRadius: '0',
                '&:hover': {
                  bgcolor: 'transparent',
                },
              },
            },
          }}
          slotProps={{
            desktopPaper: {
              onBlur,
            },
            field: {
              focused: true,
            },
          }}
        />
      </LocalizationProvider>
    </Box>
  )
}

export default DatePickerMui
