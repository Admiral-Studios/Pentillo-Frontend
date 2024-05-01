import { ITransactionFilterData } from '@/app/(main)/transactions/transaction.types'
import SelectMultiple from '@/components/UI/selects/selectMultiple'
import { ISelectMultipleItem } from '@/components/UI/selects/selectMultiple/selectMultiple.types'
import { StyledTransactionFilterWrapper } from '@/components/UI/selects/transactionFilter/styled'
import { SelectChangeEvent, Box, Menu } from '@mui/material'
import Image from 'next/image'
import filterIcon from '@/assets/icons/filter-icon.svg'
import tableFilterIcon from '@/assets/icons/table-filter-icon.svg'
import React, { Dispatch, SetStateAction, useState } from 'react'
import FilterModal from '@/components/UI/modals/filterModal'
import { FilterNewIcon } from '@/ui/icons/FilterNewIcon'
import { StyledOutlinedButton } from '@/ui/components/styled'

export interface IFilterSectionProps {
  selectEditsParams: {
    select: string[]
    handleChange: (event: SelectChangeEvent<string[]>) => void
    columnsForEdits: ISelectMultipleItem[]
  }
  canBeExported: boolean
  menuContent: JSX.Element
}

interface ITeamFilterProps {
  menuContent: JSX.Element
}

const MIN_DISTANCE = 10

const MenuWrapper = ({ menuContent }: ITeamFilterProps) => {
  return <>{menuContent && menuContent}</>
}

const FilterSectionComponent = ({
  selectEditsParams,
  canBeExported,
  menuContent,
}: IFilterSectionProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '12px' }}>
      <SelectMultiple
        value={selectEditsParams.select}
        onChange={selectEditsParams.handleChange}
        label='Edit table'
        options={selectEditsParams.columnsForEdits}
        placeholder='Edit table'
        sxSelect={{ width: '140px' }}
      />
      {canBeExported && <></>}
      <MenuWrapper menuContent={menuContent} />
    </Box>
  )
}

export default FilterSectionComponent
