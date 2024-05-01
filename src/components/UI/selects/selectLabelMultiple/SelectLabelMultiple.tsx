'use client'

import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { ISelectMultipleProps } from './selectLabelMultiple.types'
import { TypographyBody4 } from '../../typography/Typography'
import Image from 'next/image'
import arrowIconSelect from '@/assets/icons/arrow-icon-select.svg'
import styled from '@emotion/styled'
import { CheckboxNewIcon } from '@/ui/icons/CheckboxNewIcon'
import { CheckNewIcon } from '@/ui/icons/CheckNewIcon'
import infoIcon from '@/assets/icons/info-icon.svg'
import { StyledRegularTooltip } from '../../toaltips/toaltip.styled'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
}

const ArrowIcon = (props: any) => {
  return <Image {...props} src={arrowIconSelect} alt='' />
}

const SelectLabelMultiple = ({
  options,
  value,
  onChange,
  label,
  sxSelect,
  height,
  placeholder,
  noValue = false,
  infoSelect,
  tooltipInfo,
}: ISelectMultipleProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
      }}
    >
      <p style={{ margin: 0, fontWeight: '400', fontSize: '14px' }}>{label}</p>
      <FormControl
        sx={{
          maxHeight: height || '36px',
          height: height || '36px',
          maxWidth: '180px',
          width: '180px',
          display: 'flex',
          alignItems: 'center',
          p: '0',
          ...sxSelect,
          '*': {
            fontSize: '16px',
            fontWeight: '500',
            letterSpacing: '0em',
            borderRadius: '8px',
          },

          '.MuiInputBase-root': {
            maxHeight: height || '36px',
            width: '100%',
            padding: '10px 16px',
            boxShadow: '0px 1px 2px 0px #1018280D',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '8px',
          },

          fieldset: {
            borderColor: '#F2EFEB',
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
            maxHeight: height || '36px',
            padding: 0,
            color: '#AAAAAA',
          },
          '.MuiSelect-icon': {
            top: 'auto',
          },
          '.MuiSelect-select.MuiSelect-outlined': {},
          '.MuiInputBase-root:hover': {
            fieldset: {
              borderColor: '#FF902A',
            },
          },
          'fieldset.Mui-focused': {
            borderColor: '#FF902A',
          },
        }}
      >
        <Select
          multiple
          value={value}
          onChange={onChange}
          MenuProps={MenuProps}
          displayEmpty
          renderValue={(selected) => {
       
            if (infoSelect) {
              return (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <StyledRegularTooltip arrow title={tooltipInfo}>
                    <Image src={infoIcon} alt='Option Icon' />
                  </StyledRegularTooltip>
                  {placeholder}
                </Box>
              )
            }
            if (((!selected || !selected.length) && placeholder) || noValue) {
              return <StyledPlaceholder>{placeholder}</StyledPlaceholder>
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
                icon={
                  <CheckboxNewIcon sx={{ width: '16px', height: '16px' }} />
                }
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
    </Box>
  )
}

const StyledPlaceholder = styled.span`
  color: #aaaaaa;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
`

export default SelectLabelMultiple
