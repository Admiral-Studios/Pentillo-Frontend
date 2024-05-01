import styled from '@emotion/styled'
import {
  Box,
  InputBase,
  MenuItem,
  Select,
  SelectChangeEvent,
  SxProps,
} from '@mui/material'
import { FocusEventHandler, ReactNode } from 'react'
import arrowIconSelect from '@/assets/icons/arrow-icon-select.svg'
import Image from 'next/image'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { formatCategory } from '@/utils/formatCategoryvalues'
import { CATEGORY } from '@/types/enum'

const ArrowIcon = (props: any) => {
  return (
    <Image
      {...props}
      style={{
        top: 'auto',
      }}
      width={20}
      height={20}
      src={arrowIconSelect}
      alt='arrow'
    />
  )
}

export interface IOption {
  value: string
  name: string
  icon?: string
}

interface ISelectRegularProps {
  options?: IOption[]
  sxSelect?: SxProps
  sxInput?: SxProps
  sxFormControl?: SxProps
  value?: string
  placeholder?: string
  disabled?: boolean
  onChange?: (event: SelectChangeEvent<string>, child: ReactNode) => void
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
  label?: string
  isCategory?: boolean
  isIcons?: boolean
  filled?: boolean
}

const SelectRegular = ({
  options,
  placeholder,
  onChange,
  onBlur,
  sxSelect,
  sxInput,
  sxFormControl,
  value,
  disabled,
  label,
  isCategory,
  isIcons,
  filled = false,
}: ISelectRegularProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
      }}
    >
      <p style={{ margin: 0, fontWeight: '400', fontSize: '14px' }}>{label}</p>
      <FormControl sx={sxFormControl} focused fullWidth>
        <Select
          onBlur={onBlur}
          labelId={`demo-simple-select-${label}`}
          disabled={disabled}
          sx={{
            height: '36px',
            ...sxSelect,
            padding: 0,
            backgroundColor: filled ? '#F3F5F7' : '#FFFFFF',
          }}
          value={value}
          displayEmpty
          onChange={onChange}
          input={
            <StyledInput
              sx={{
                ...sxInput,
                backgroundColor: filled ? '#F3F5F7' : '#FFFFFF',
              }}
            />
          }
          IconComponent={ArrowIcon}
          renderValue={(selected) => {
            if (isCategory && value) {
              return formatCategory(value as CATEGORY)
            }
            if (!selected && placeholder) {
              return <StyledPlaceholder>{placeholder}</StyledPlaceholder>
            }

            const selectedOption = options?.find(
              (opt) => opt.value === selected,
            )
            if (selectedOption) {
              return isIcons ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Image
                    src={selectedOption.icon as string}
                    alt='Option Icon'
                  />
                  {selectedOption.name}
                </Box>
              ) : (
                selectedOption.name
              )
            }

            return null
          }}
        >
          {options?.map((option) =>
            isIcons ? (
              <StyledMenuItem
                key={option.value}
                sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                value={option.value}
              >
                <Image src={option.icon as string} alt='Option Icon' />
                {option.name}
              </StyledMenuItem>
            ) : (
              <StyledMenuItem key={option.value} value={option.value}>
                {option.name}
              </StyledMenuItem>
            ),
          )}
        </Select>
      </FormControl>
    </Box>
  )
}

const StyledMenuItem = styled(MenuItem)`
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
`

const StyledPlaceholder = styled.span`
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  color: #aaaaaa;
`

const StyledInput = styled(InputBase)(({ theme }) => ({
  border: '1px solid #F2EFEB',
  borderRadius: '8px',
  width: '100%',
  paddingLeft: '8px',
  paddingRight: '8px',
  padding: '1px 8px',
  boxShadow: '0px 1px 2px 0px #1018280D',
}))

const StyledInputLabel = styled(InputLabel)`
  &.Mui-focused {
    color: #aaaaaa;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
  }
`

export default SelectRegular
