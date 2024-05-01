import styled from '@emotion/styled'
import { Button } from '@mui/material'

export const StyledMonthAndYearWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const StyledMonth = styled.p`
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
`

export const StyledYearSelect = styled.select`
  background-color: transparent;
  border: none;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5;
  min-width: 70px;

  &:focus-visible,
  &:focus,
  &:focus-within {
    border: none;
    outline: none;
  }
`

export const StyledDatePickerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-left: 24px;
  padding-right: 12px;
  padding-top: 16px;
  padding-bottom: 8px;
`

export const StyledArrowButtonWrapper = styled.div`
  padding-top: 8px;
  padding-bottom: 8px;
  display: flex;
  column-gap: 16px;
`

export const StyledArrowButton = styled(Button)`
  background-color: transparent;
  border: none;
  color: #000;
  font-size: 1rem;
  border-radius: 50%;
  height: 24px;
  width: 24px;
  min-width: auto;
`

export const StyledDatePickerWrapper = styled.div`
  .react-datepicker {
    border: none;
    box-shadow:
      0px 5px 5px -3px rgba(0, 0, 0, 0.2),
      0px 8px 10px 1px rgba(0, 0, 0, 0.14),
      0px 3px 14px 2px rgba(0, 0, 0, 0.12);
  }
  .react-datepicker__header {
    padding: 0;
    background-color: transparent;
    border: none;
  }
  .react-datepicker-popper {
    width: 320px;
  }
  .react-datepicker__day-name {
    width: 36px;
    height: 40px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    &::last-word {
      display: none;
    }
  }
  .react-datepicker__day-names {
    display: flex;
    justify-content: center;
  }
  .react-datepicker__day {
    width: 36px;
    height: 36px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-weight: 400;
    font-size: 0.75rem;
    line-height: 1.66;
    &.react-datepicker__day--in-range {
      background-color: #ff902a8f;
    }
    &.react-datepicker__day--keyboard-selected {
      background-color: #ff902a;
    }
    &.react-datepicker__day--range-end.react-datepicker__day--in-range {
      background-color: #ff902a;
      color: #000;
    }
  }
  .react-datepicker__month {
    position: relative;
    overflow-x: hidden;
    min-height: 240px;
    padding: 0 10px;
  }
  .react-datepicker__triangle {
    display: none;
  }
`
