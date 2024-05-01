'use client'

import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { ISelectMultipleProps } from './selectMultiple.types'
import { TypographyBody4 } from '../../typography/Typography'
import Image from 'next/image'
import arrowIconSelect from '@/assets/icons/arrow-icon-select.svg'
import styled from '@emotion/styled'
import { CheckboxNewIcon } from '@/ui/icons/CheckboxNewIcon'
import { CheckNewIcon } from '@/ui/icons/CheckNewIcon'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      marginTop: '8px',
      border: '1px solid #F2EFEB',
      borderRadius: '8px',
      width: '177px',
      boxShadow: '0px -2px 6px -2px rgba(16, 24, 40, 0.06), 0px 12px 16px -4px rgba(16, 24, 40, 0.12)',
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
}

const ArrowIcon = (props: any) => {
  return <Image {...props} src={arrowIconSelect} alt='' />
}

const SelectMultiple = ({
  options,
  value,
  onChange,
  label,
  sxSelect,
  placeholder
}: ISelectMultipleProps) => {
  return (
    <FormControl
      sx={{
        maxHeight: '36px',
        height: '36px',
        maxWidth: '180px',
        width: '180px',
        display: 'flex',
        alignItems: 'center',
        p: '0',
        ...sxSelect,
        '*': {
          fontSize: '14px',
          fontWeight: '400',
          letterSpacing: '0em',
          borderRadius: '8px',
        },

        '.MuiInputBase-root': {
          maxHeight: '36px',
          width: '100%',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          borderRadius: '8px',
        },

        fieldset: {
          borderColor: '#F2EFEB !important',
          borderWidth: '1px !important',
          padding: '10px 16px',
          borderRadius: '8px',
        },
        '.MuiInputLabel-root': {
          transform: value?.length
            ? 'translate(14px, -5px) scale(0.75)'
            : 'translate(14px, 7px) scale(1)',
          backgroundColor: '#FFFFFF',
          padding: '0 2px',
        },
        '.MuiInputLabel-root.Mui-focused': {
          transform: 'translate(14px, -7px) scale(0.75)',
        },

        '.MuiSelect-select': {
          maxHeight: '36px',
          padding: 0,
          color: '#AAAAAA',
        },
        '.MuiSelect-icon': {
          top: 'auto',
        },
        '.MuiSelect-select.MuiSelect-outlined': {},
        '.MuiInputBase-root:hover': {
          fieldset: {
            borderColor: '#F2EFEB !important',
            borderWidth: '1px !important'
          },
        },
        'fieldset.Mui-focused': {
          borderColor: '#F2EFEB !important',
          borderWidth: '1px !important'
        },
      }}
    >
      {/* <InputLabel id='demo-multiple-checkbox-label'>{label}</InputLabel> */}
      <Select
        multiple
        displayEmpty
        value={value}
        onChange={onChange}
        labelId='demo-multiple-checkbox-label'
        MenuProps={MenuProps}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return placeholder ? placeholder : label;
          }
          const selectedOption = selected.map(
            (item) => options?.find((opt) => opt.value === item)?.name,
          )
          return selectedOption.join(', ')
        }}
        IconComponent={ArrowIcon}
      >
        {options.map((option) => (
          <MenuItem
            sx={{
              columnGap: '12px',
              px: '12px',
              '.MuiButtonBase-root.MuiCheckbox-root': {
                color: '#AAAAAA',
                '&.Mui-checked': {
                  color: '#FF902A',
                },
              },
            }}
            key={option.value}
            value={option.value}
          >
            <Checkbox
              sx={{ width: '12px', height: '12px' }}
              size={'small'}
              icon={<CheckboxNewIcon sx={{ width: '16px', height: '16px' }} />}
              checkedIcon={
                <CheckNewIcon sx={{ width: '16px', height: '16px' }} />
              }
              checked={value?.indexOf(option.value) > -1}
            />
            <TypographyBody4>{option.name}</TypographyBody4>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

const StyledInputLabel = styled(InputLabel)`
  color: #aaaaaa;
  font-weight: 400;
  font-size: 16px !important;
  font-weight: 500;
  line-height: 20px;
  font-family: inherit;
`

export default SelectMultiple
