import {
  ToggleButtonGroup,
  ToggleButton as MuiToggleButton,
} from '@mui/material'
import { useState } from 'react'

interface IOption {
  label: string;
  value: string
}

interface IToggleButtonProps {
  options: IOption[]
  onChange: (value: string) => void
  initialValue: string
}

const ToggleButton = ({
  options,
  onChange,
  initialValue,
}: IToggleButtonProps) => {
  const [value, setValue] = useState(initialValue)

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string,
  ) => {
    setValue(newValue)
    onChange(newValue)
  }

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={handleChange}
      sx={{
        width: '100%',
        padding: '4px',
        backgroundColor: 'rgba(231, 231, 231, 0.32)',
        gap: '8px',
        borderRadius: '8px',
        border: '1px solid border: 1px solid #F2EFEB',
        textTransform: 'none',
        '& .MuiToggleButtonGroup-firstButton': {
          borderTopRightRadius: '8px ',
          borderBottomRightRadius: '8px ',
        },
        '& .MuiToggleButtonGroup-lastButton': {
          marginLeft: 0,
          borderLeft: '1px solid transparent',
          borderTopLeftRadius: '8px ',
          borderBottomLeftRadius: '8px ',
        },
        '& .Mui-selected': {
          backgroundColor: '#4EADA9 !important',
          color: '#FFF !important',
        },
      }}
    >
      {options.map((option) => {
        return (
          <MuiToggleButton
            key={option.value}
            value={option.value}
            sx={{
              width: '100%',
              padding: '10px 14px 10px 14px',
              color: '#AAAAAA',
              fontSize: '16px',
              fontWeight: 500,
              borderRadius: '8px',
              border: '1px solid transparent',
              textTransform: 'none',
            }}
          >
            {option.label}
          </MuiToggleButton>
        )
      })}
    </ToggleButtonGroup>
  )
}

export default ToggleButton
