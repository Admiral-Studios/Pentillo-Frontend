import { CheckNewIcon } from '@/ui/icons/CheckNewIcon'
import { CheckboxNewIcon } from '@/ui/icons/CheckboxNewIcon'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { ChangeEvent } from 'react'

interface IButtonCheckboxProps {
  label: string
  checked?: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const ButtonCheckbox = ({ label, onChange, checked }: IButtonCheckboxProps) => {
  return (
    <FormControlLabel
      sx={{
        borderRadius: '8px',
        px: '16px',
        minHeight: '36px',
        width: '137px',
        border: checked ? '1px solid #FF902A' : '1px solid #F2EFEB',
        columnGap: '8px',
        alignItems: 'center',
        justifyContent: 'center',
        mx: '0',
        cursor: 'pointer',
        '&:hover': {
          border: '1px solid #AAAAAA',
        },
        '.MuiButtonBase-root': {
          p: '0',
          color: '#AAAAAA',
          '&.Mui-checked': {
            color: '#FF902A',
          },
        },
        '.MuiTypography-root': {
          fontSize: '16px',
          fontWeight: '500',
          lineHeight: '17px',
          letterSpacing: '0em',
          color: '#424242',
        },
        '.Mui-checked ~ .MuiTypography-root': {
          color: '#FF902A',
        },
      }}
      control={
        <Checkbox
          onChange={onChange}
          checked={checked}
          icon={<CheckboxNewIcon sx={{ width: '20px', height: '20px' }} />}
          checkedIcon={<CheckNewIcon sx={{ width: '20px', height: '20px' }} />}
        />
      }
      label={label}
    />
  )
}

export default ButtonCheckbox
