import { IFilterSectionProps } from '@/app/(main)/transactions/transaction.types'
import { Box } from '@mui/material'
import SelectMultiple from '@/components/UI/selects/selectMultiple'
import TransactionFilter from '@/components/UI/selects/transactionFilter'
import ButtonWithIcon from '@/components/UI/buttons/buttonWithIcon'
import { ExportIcon } from '@/components/UI/icons'
import { StyledRegularTooltip } from '@/components/UI/toaltips/toaltip.styled'

const FilterSection = ({
  selectEditsParams,
  selectFilterParams,
  transactionCount,
  onExport,
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
      <StyledRegularTooltip
        arrow
        disableHoverListener={Boolean(transactionCount)}
        title='We currently do not have any transactions available for export at this time.'
      >
        <div>
          <ButtonWithIcon
            disabled={!Boolean(transactionCount)}
            sxProps={{
              borderRadius: '8px',
              border: '1px solid #F2EFEB',
              color: '#424242',
              padding: '7px 16px',
              maxHeight: '36px'
            }}
            onClick={onExport}
            icon={<ExportIcon sx={{ width: '20px', height: '20px' }} />}
          >
            Export
          </ButtonWithIcon>
        </div>
      </StyledRegularTooltip>
      <TransactionFilter
        filterData={selectFilterParams.filterData}
        buttonText={'Filter'}
        addressValue={selectFilterParams.addressValue}
        dateValue={selectFilterParams.dateValue}
        priceValue={selectFilterParams.priceValue}
        statusValue={selectFilterParams.statusValue}
        setAddressValue={selectFilterParams.setAddressValue}
        setDateValue={selectFilterParams.setDateValue}
        setPriceValue={selectFilterParams.setPriceValue}
        setStatusValue={selectFilterParams.setStatusValue}
        handleRefetch={selectFilterParams.handleRefetch}
      />
    </Box>
  )
}

export default FilterSection
