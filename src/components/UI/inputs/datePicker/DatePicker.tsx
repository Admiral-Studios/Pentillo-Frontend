import { CssTextField } from '@/ui/components/styled'
import dayjs from 'dayjs'
import { RefObject, useState } from 'react'
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker'
import {
  StyledArrowButton,
  StyledArrowButtonWrapper,
  StyledDatePickerHeader,
  StyledDatePickerWrapper,
  StyledMonth,
  StyledMonthAndYearWrapper,
  StyledYearSelect,
} from './datePicker.styled'
import ArrowPrevIcon from '@/ui/icons/ArrowPrevIcon'
import ArrowNextIcon from '@/ui/icons/ArrowNextIcon'
import { Box } from '@mui/material'

interface IDatePicker extends ReactDatePickerProps<boolean | undefined> {
  label?: string
  height?: string
  ref?: RefObject<HTMLDivElement>
}

const getYears = () => {
  const yearsAfterCurrentYear = 50
  const currentYear = new Date().getFullYear()
  const firstYear = 1960

  const years = []

  for (let i = firstYear; i <= currentYear + yearsAfterCurrentYear; i++) {
    years.push(i)
  }

  return years
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const DatePicker = ({ label, height, ref, ...props }: IDatePicker) => {
  const [year, setYear] = useState(
    props.value ? dayjs(props.value).year() : new Date().getFullYear(),
  )

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
      <StyledDatePickerWrapper>
        <ReactDatePicker
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <StyledDatePickerHeader>
              <StyledMonthAndYearWrapper>
                <StyledMonth>{months[date.getMonth()]}</StyledMonth>
                <StyledYearSelect
                  value={year}
                  onChange={({ target: { value } }) => {
                    changeYear(Number(value))
                    setYear(Number(value))
                  }}
                >
                  {getYears().map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </StyledYearSelect>
              </StyledMonthAndYearWrapper>
              <StyledArrowButtonWrapper>
                <StyledArrowButton
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                >
                  <ArrowPrevIcon sx={{ fill: 'rgba(0, 0, 0, 0.54)' }} />
                </StyledArrowButton>
                <StyledArrowButton
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                >
                  <ArrowNextIcon sx={{ fill: 'rgba(0, 0, 0, 0.54)' }} />
                </StyledArrowButton>
              </StyledArrowButtonWrapper>
            </StyledDatePickerHeader>
          )}
          {...props}
          customInput={
            <CssTextField
              ref={ref}
              sx={{
                width: '100%',
                '& .MuiInputLabel-root': {
                  top: '-7px',
                },
              }}
              
              height={height}
            />
          }
        />
      </StyledDatePickerWrapper>
    </Box>

  )
}

export default DatePicker
