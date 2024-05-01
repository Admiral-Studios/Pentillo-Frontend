import styled from '@emotion/styled'
import {
  InputBase,
  MenuItem,
  Select,
  SelectChangeEvent,
  SxProps,
} from '@mui/material'
import { ReactNode } from 'react'
import arrowIconSelect from '@/assets/icons/arrow-icon-select.svg'
import Image from 'next/image'

const ArrowIcon = (props: any) => {
  return (
    <Image
      {...props}
      style={{
        top: 'auto',
        right: '16px',
      }}
      width={13}
      height={13}
      src={arrowIconSelect}
      alt='arrow'
    />
  )
}

export interface IOption {
  value: string
  name: string
}

interface ISelectRegularProps {
  options?: IOption[]
  sxSelect?: SxProps
  sxInput?: SxProps
  value?: string
  placeholder?: string
  onChange?: (event: SelectChangeEvent<string>, child: ReactNode) => void
  disabled?: boolean
}

const SelectRegular = ({
  options,
  placeholder,
  onChange,
  sxSelect,
  sxInput,
  value,
  disabled,
}: ISelectRegularProps) => {
  return (
    <Select
      disabled={disabled}
      sx={sxSelect}
      value={value}
      displayEmpty
      label='Age'
      onChange={onChange}
      input={<StyledInput sx={sxInput} />}
      IconComponent={ArrowIcon}
      renderValue={(selected) => {
        if (!selected && placeholder) {
          return <StyledPlaceholder>{placeholder}</StyledPlaceholder>
        }

        return options?.find((opt) => opt.value === selected)?.name
      }}
    >
      {options?.map((option) => (
        <StyledMenuItem key={option.value} value={option.value}>
          {option.name}
        </StyledMenuItem>
      ))}
    </Select>
  )
}

// const StyledSelect = styled(Select)`
//   &.Mui-disabled {
//     * {
//       pointer-events: all;
//     }
//     &.MuiInputBase-root {
//       pointer-events: all;
//       cursor: auto;
//     }
//   }
// `

const StyledMenuItem = styled(MenuItem)`
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
`

const StyledPlaceholder = styled.span`
  color: #717171;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
`

const StyledInput = styled(InputBase)(({ theme }) => ({
  border: '1px solid #F2EFEB',
  borderRadius: '8px',
  width: '100%',
  paddingLeft: '16px',
  paddingRight: '16px',
  height: '52px',
  backgroundColor: '#F3F5F7',
}))

export default SelectRegular
