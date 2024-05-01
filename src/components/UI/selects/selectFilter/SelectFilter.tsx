import { Reducer, useMemo, useReducer, useState } from 'react'
import {
  IChildOption,
  IParentOption,
  ISelectFilterProps,
} from './selectFilter.types'
import selectFilterReducer, {
  OPEN_POPUP,
  REMOVE_SELECTED_OPTIONS,
  SET_OPTIONS,
  SET_SELECTED_OPTIONS,
  TOGGLE_ACCORDION,
  selectFilterInitialState,
} from './selectFilter.reducer'
import filterIcon from '@/assets/icons/filter-icon.svg'
import Image from 'next/image'
import arrowIcon from '@/assets/icons/arrow-icon.svg'
import { CssTextField } from '@/ui/components/styled'
import {
  ItemBody,
  ItemHeader,
  ListItemSelected,
  ListSelected,
  SelectBodyItem,
  StyledSelectEdit,
} from './selectFilter.styled'
import { Autocomplete, AutocompleteCloseReason, Box } from '@mui/material'
import { theme } from '@/ui/theme'
import closeIcon from '@/assets/icons/close-icon.svg'

const SelectFilter = ({
  sxPropsWrapper,
  filters,
  buttonText,
}: ISelectFilterProps) => {
  const [state, dispatch] = useReducer<Reducer<any, any>>(
    selectFilterReducer,
    selectFilterInitialState
  )

  const handleClick = () => dispatch({ type: OPEN_POPUP })
  const handleAccordionClick = (id: string) =>
    dispatch({ type: TOGGLE_ACCORDION, payload: id })

  const onChangeInput = (id: string, value: IChildOption[]) =>
    dispatch({
      type: SET_SELECTED_OPTIONS,
      payload: { parentOptionValues: value, parentOptionId: id },
    })
  const removeSelectedOption = (optionId: string, selectedId: string) =>
    dispatch({
      type: REMOVE_SELECTED_OPTIONS,
      payload: { parentOptionId: optionId, selectedOptionId: selectedId },
    })

  useMemo(() => dispatch({ type: SET_OPTIONS, payload: filters }), [filters])

  return (
    <StyledSelectEdit sx={sxPropsWrapper} className='select'>
      <button className='select__button' onClick={handleClick}>
        <Image
          width={12.65}
          height={12.08}
          src={filterIcon}
          alt='filter icon'
        />
        {buttonText}
      </button>

      {state.isOpen && (
        <div className='select__popup'>
          <ul className='select__popupBody'>
            {state.options.map((option: IParentOption) => (
              <SelectBodyItem key={option.id}>
                <ItemHeader
                  isOpen={option.isOpen}
                  onClick={() => handleAccordionClick(option.id)}
                >
                  {option.name}
                  <Image src={arrowIcon} alt='arrowIcon' />
                </ItemHeader>
                <ItemBody isOpen={option.isOpen}>
                  <Autocomplete
                    multiple
                    value={option.selectedOptions}
                    onChange={(event, newValue, reason) => {
                      if (
                        event.type === 'keydown' &&
                        (event as React.KeyboardEvent).key === 'Backspace' &&
                        reason === 'removeOption'
                      ) {
                        return
                      }
                      onChangeInput(option.id, newValue)
                    }}
                    disableCloseOnSelect
                    renderTags={() => null}
                    noOptionsText='No options'
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Box
                          sx={{ width: 17, height: 17, mr: '5px', ml: '-2px' }}
                          style={{
                            visibility: selected ? 'visible' : 'hidden',
                          }}
                        />
                        <Box
                          component='span'
                          sx={{
                            width: 14,
                            height: 14,
                            flexShrink: 0,
                            borderRadius: '3px',
                            mr: 1,
                            mt: '2px',
                          }}
                        />
                        <Box
                          sx={{
                            flexGrow: 1,
                            '& span': {
                              color:
                                theme.palette.mode === 'light'
                                  ? '#586069'
                                  : '#8b949e',
                            },
                          }}
                        >
                          {option.label}
                          <br />
                        </Box>
                        <Box
                          sx={{ opacity: 0.6, width: 18, height: 18 }}
                          style={{
                            visibility: selected ? 'visible' : 'hidden',
                          }}
                        />
                      </li>
                    )}
                    // @ts-ignore
                    options={option.options}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <CssTextField
                        sx={{ mt: '20px', mb: '16px', width: '100%' }}
                        focused
                        ref={params.InputProps.ref}
                        inputProps={params.inputProps}
                        height='40px'
                        label={option.label}
                        autoFocus
                      />
                    )}
                  />

                  <ListSelected>
                    {option.selectedOptions?.map((selectedOption) => (
                      <ListItemSelected key={selectedOption.id}>
                        {selectedOption.label}
                        <Image
                          onClick={() =>
                            removeSelectedOption(option.id, selectedOption.id)
                          }
                          src={closeIcon}
                          alt='close icon'
                          width={8}
                          height={8}
                        />
                      </ListItemSelected>
                    ))}
                  </ListSelected>

                  {/* <Button>Clear All</Button> */}
                </ItemBody>
              </SelectBodyItem>
            ))}
          </ul>
        </div>
      )}
    </StyledSelectEdit>
  )
}

export default SelectFilter
