'use client'

import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { ISelectChipProps } from './selectChip.types'
import { TypographyBody4 } from '../../typography/Typography'
import Image from 'next/image'
import arrowIconSelect from '@/assets/icons/arrow-icon-select.svg'
import styled from '@emotion/styled'
import { CheckboxNewIcon } from '@/ui/icons/CheckboxNewIcon'
import { CheckNewIcon } from '@/ui/icons/CheckNewIcon'
import { useState } from 'react'
import { CssTextField } from '@/ui/components/styled'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      marginTop: '8px',
      border: '1px solid #F2EFEB',
      borderRadius: '8px',
      // minWidth: '277px',
      // width: '277px',
      boxShadow:
        '0px -2px 6px -2px rgba(16, 24, 40, 0.06), 0px 12px 16px -4px rgba(16, 24, 40, 0.12)',
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
}

function getStyles(name: string, value: readonly string[]) {
  return {
    fontWeight: value.indexOf(name) === -1 ? 400 : 500,
  }
}

const ArrowIcon = (props: any) => {
  return <Image {...props} src={arrowIconSelect} alt='' />
}

const SelectChip = ({
  options,
  value,
  onChange,
  label,
  sxSelect,
  placeholder,
}: ISelectChipProps) => {
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
      <FormControl
        sx={{
          maxHeight: '44px',
          height: '44px',
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

          '& .MuiInputBase-root': {
            maxHeight: '44px',
            width: '100%',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '8px',
            boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',

            '& .MuiSelect-icon': {
              color: 'transparent',
            },

            '&.Mui-focused': {
              borderColor: '#FEF1E6',
              borderWidth: '1px',
              boxShadow:
                '0px 0px 0px 4px rgba(255, 144, 42, 0.15), 0px 1px 2px 0px rgba(255, 144, 42, 0.15)',
            }
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
            maxHeight: '44px',
            padding: 0,
            color: '#AAAAAA',
          },
          '.MuiSelect-icon': {
            top: 'auto',
          },
          '.MuiSelect-select.MuiSelect-outlined': {},
          '.MuiInputBase-root:hover': {
            fieldset: {
              borderColor: '#FEF1E6 !important',
              borderWidth: '1px !important',
            },
          },
          'fieldset.Mui-focused': {
            borderColor: '#FEF1E6 !important',
            borderWidth: '1px !important',
            boxShadow:
              '0px 0px 0px 4px rgba(255, 144, 42, 0.15), 0px 1px 2px 0px rgba(255, 144, 42, 0.15) !important',
          },
        }}
      >
        <Select
          id='demo-multiple-chip'
          multiple
          value={value}
          onChange={onChange}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return placeholder ? placeholder : label
            }
            
            const selectedOption = selected.map(
              (item) => options?.find((opt) => opt.value === item)?.name,
            )       
            
            return (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selectedOption.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    sx={{
                      backgroundColor: 'rgba(231, 231, 231, 0.6)',
                      borderRadius: '4px',
                      padding: '0.5px 1.5px',
                      color: '#424242',
                      fontFamily: 'inherit',
                      fontSize: '14px',
                      fontWeight: 500,
                      height: '21px',
                      '& .MuiChip-label': {
                        padding: '2px 6px'
                      }
                    }}
                  />
                ))}
              </Box>
            )
          }}
          MenuProps={MenuProps}
          displayEmpty 
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
              style={getStyles(option.value, value)}
            >
              <TypographyBody4>{option.name}</TypographyBody4>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default SelectChip
