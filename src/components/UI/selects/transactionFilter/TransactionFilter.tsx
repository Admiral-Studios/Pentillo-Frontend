import { Box, Slider } from '@mui/material'
import { Dispatch, SetStateAction, useState } from 'react'
import AccordionEl from './components/accordionItem/AccordionEl'
import { CssTextField, StyledLoadingButton, StyledOutlinedButton } from '@/ui/components/styled'
import {
  ListItemSelected,
  ListSelected,
} from '../selectFilter/selectFilter.styled'
import { StyledTransactionFilterWrapper } from './styled'
import {
  MAX_PRICE_VALUE,
  MIN_PRICE_VALUE,
} from '@/app/(main)/transactions/transaction.context'
import { ITransactionFilterData } from '@/app/(main)/transactions/transaction.types'
import DatePicker from '@/components/UI/inputs/datePicker'
import FilterIcon from '@/ui/icons/FilterIcon'
import { STATUS } from '@/types/enum'
import FilterModal from '../../modals/filterModal'
import { FilterNewIcon } from '@/ui/icons/FilterNewIcon'

interface ITransactionFilterProps {
  filterData: ITransactionFilterData
  buttonText: string
  addressValue: string[]
  statusValue: string[]
  priceValue: [string, string]
  dateValue: [Date | undefined, Date | undefined]
  setAddressValue: Dispatch<SetStateAction<string[]>>
  setStatusValue: Dispatch<SetStateAction<string[]>>
  setPriceValue: Dispatch<SetStateAction<[string, string]>>
  setDateValue: Dispatch<SetStateAction<[Date | undefined, Date | undefined]>>
  handleRefetch: () => void
}

const MIN_DISTANCE = 10

const TransactionFilter = ({
  buttonText,
  addressValue,
  dateValue,
  priceValue,
  statusValue,
  filterData,
  setAddressValue,
  setDateValue,
  setPriceValue,
  setStatusValue,
  handleRefetch,
}: ITransactionFilterProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const [filterDateValue, setFilterDateValue] =
    useState<[Date | undefined, Date | undefined]>(dateValue)
  const [filterStatusValue, setFilterStatusValue] =
    useState<string[]>(statusValue)
  const [filterPriceValue, setFilterPriceValue] =
    useState<[string, string]>(priceValue)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const setDefaultStateModal = () => {
    setFilterDateValue(dateValue)
    setFilterStatusValue(statusValue)
    setFilterPriceValue(priceValue)
  }

  const handleSaveFilter = () => {
    setDateValue(filterDateValue)
    setPriceValue(filterPriceValue)
    setStatusValue(filterStatusValue)

    handleClose()
  }

  const handleAddress = (address: string[]) => {
    setAddressValue(address)
  }
  const handleRemoveAddress = (address: string) => {
    setAddressValue((prevState) => prevState?.filter((ad) => ad !== address))
  }

  const handleStatus = (status: string) => {
    setFilterStatusValue((prevState) =>
      prevState.findIndex((s) => s === status) !== -1
        ? prevState.filter((s) => s !== status)
        : [...prevState, status],
    )
  }
  const handleSetAnyStatus = (status: string[]) => {
    setFilterStatusValue(status)
  }

  const handlePrice = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return
    }

    if (activeThumb === 0) {
      setFilterPriceValue([
        String(Math.min(newValue[0], +filterPriceValue[1] - MIN_DISTANCE)),
        filterPriceValue[1],
      ])
    } else {
      setFilterPriceValue([
        filterPriceValue[0],
        String(Math.max(newValue[1], +filterPriceValue[0] + MIN_DISTANCE)),
      ])
    }
  }

  const onChangePrice = (field: 'min' | 'max', value: string) => {
    if (field === 'max') {
      setFilterPriceValue([filterPriceValue[0], value])
    } else {
      setFilterPriceValue([value, filterPriceValue[1]])
    }
  }
  const resetPrice = () => {
    setFilterPriceValue(['', ''])
  }
  const onChangeDatePicker = (dates: [Date | undefined, Date | undefined]) => {
    setFilterDateValue(dates)
  }

  const status = Object.entries(STATUS)

  return (
    <StyledTransactionFilterWrapper isOpen={open}>
     <StyledOutlinedButton sx={{ gap: '8px' }} onClick={handleClickOpen}>
        <FilterNewIcon sx={{ width: '20px', height: '20px' }} />
        {buttonText}
      </StyledOutlinedButton>
      <FilterModal
        open={open}
        handleClose={() => {
          setDefaultStateModal()
          handleClose()
        }}
        handleSelect={handleSaveFilter}
      >
        <AccordionEl label='Status'>
          <ListSelected style={{ marginTop: '16px' }}>
            {status.map(([key, value]) => (
              <ListItemSelected
                onClick={() => handleStatus(key)}
                style={{
                  color:
                    filterStatusValue.findIndex((status) => status === key) !==
                    -1
                      ? '#FFFFFF'
                      : '#AAAAAA',
                  backgroundColor:
                    filterStatusValue.findIndex((status) => status === key) !==
                    -1
                      ? '#FFAC5F'
                      : '#FFFEF7',
                }}
                key={key}
              >
                {value}
              </ListItemSelected>
            ))}
          </ListSelected>
          <Box sx={{ mt: '16px', display: 'flex', columnGap: '8px' }}>
            <StyledLoadingButton
              variant='outlined'
              disabled={filterData.status.length === filterStatusValue.length}
              onClick={() =>
                handleSetAnyStatus(filterData.status.map((s) => s.value))
              }
              sx={{
                maxHeight: '32px',
                fontSize: '14px !important',
                columnGap: '12px',
                maxWidth: '85px',
                px: '0',
              }}
            >
              Select All
            </StyledLoadingButton>
            <StyledLoadingButton
              variant='outlined'
              disabled={filterStatusValue.length === 0}
              onClick={() => handleSetAnyStatus([])}
              sx={{
                maxHeight: '32px',
                fontSize: '14px !important',
                columnGap: '12px',
                maxWidth: '85px',
                px: '0',
              }}
            >
              Clear All
            </StyledLoadingButton>
          </Box>
        </AccordionEl>
        <AccordionEl label='Price'>
          <Box
            sx={{
              display: 'flex',
              'input::-webkit-outer-spin-button, input::-webkit-inner-spin-button':
                {
                  '-webkit-appearance': 'none',
                  margin: '0',
                },
              'input[type=number]': {
                '-moz-appearance': 'textfield',
              },
            }}
          >
            <CssTextField
              sx={{ mt: '20px', mb: '16px', width: '100%' }}
              type='number'
              height='40px'
              label={'Min'}
              value={filterPriceValue[0]}
              onChange={(event) => onChangePrice('min', event.target.value)}
              autoFocus
            />
            <CssTextField
              sx={{ mt: '20px', mb: '16px', width: '100%' }}
              type='number'
              height='40px'
              label={'Max'}
              value={filterPriceValue[1]}
              onChange={(event) => onChangePrice('max', event.target.value)}
              autoFocus
            />
          </Box>

          <Slider
            sx={{
              display: 'block',
              width: '95%',
              mx: 'auto',
              '.MuiSlider-rail': {
                bgcolor: '#FEF1E6',
                height: '8px',
              },
              '.MuiSlider-track': {
                bgcolor: '#FF902A',
              },
            }}
            getAriaLabel={() => 'Minimum distance'}
            value={[+filterPriceValue[0], +filterPriceValue[1]]}
            min={MIN_PRICE_VALUE}
            max={MAX_PRICE_VALUE}
            onChange={handlePrice}
            valueLabelDisplay='auto'
            disableSwap
          />
          <Box sx={{ mt: '6px' }}>
            <StyledLoadingButton
              variant='outlined'
              onClick={resetPrice}
              sx={{
                maxHeight: '32px',
                fontSize: '14px !important',
                columnGap: '12px',
                maxWidth: '85px',
                px: '0',
              }}
            >
              Clear All
            </StyledLoadingButton>
          </Box>
        </AccordionEl>
        <AccordionEl label='Closing'>
          <Box
            sx={{
              py: '16px',
              '.react-datepicker-wrapper': { width: '100%' },
            }}
          >
            <DatePicker
              onChange={(date) =>
                onChangeDatePicker(date as [Date | undefined, Date | undefined])
              }
              label={'Date'}
              selectsRange
              startDate={filterDateValue[0]}
              endDate={filterDateValue[1]}
              height='40px'
            />
            <StyledLoadingButton
              variant='outlined'
              onClick={() => onChangeDatePicker([undefined, undefined])}
              sx={{
                mt: '16px',
                maxHeight: '32px',
                fontSize: '14px !important',
                columnGap: '12px',
                maxWidth: '85px',
                px: '0',
              }}
            >
              Clear All
            </StyledLoadingButton>
          </Box>
        </AccordionEl>
      </FilterModal>
    </StyledTransactionFilterWrapper>
  )
}

export default TransactionFilter
