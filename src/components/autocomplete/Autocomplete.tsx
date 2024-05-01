import { CssTextField, StyledLoadingButton } from '@/ui/components/styled'
import { theme } from '@/ui/theme'
import closeIcon from '@/assets/icons/close-icon.svg'
import { Autocomplete, Box, CircularProgress } from '@mui/material'
import {
  ListItemSelected,
  ListSelected,
} from '../UI/selects/selectFilter/selectFilter.styled'
import Image from 'next/image'
import ListboxComponent from './_components/Listbox'
import { IAssignedPerson } from '@/data/api/api.types'

interface IAutocompleteComponentProps {
  onSearch: (value: string) => void
  onSearchChange: (value: string) => void
  onChange: (value: string[]) => void
  onChangeAssignedPerson?: (value: IAssignedPerson[]) => void
  onRemove: (value: string) => void
  loading: boolean
  value: string[] | IAssignedPerson[]
  search: string
  options: string[] | IAssignedPerson[]
  onLoadMore: () => void
  noOptionsText: string
  label?: string
  isTaskFilter?: boolean
  isLoadMore?: boolean
}

export const AutocompleteComponent = ({
  onSearch,
  onSearchChange,
  onChange,
  onRemove,
  loading,
  value,
  search,
  options,
  onLoadMore,
  noOptionsText,
  label = 'Company',
  isTaskFilter,
  isLoadMore,
}: IAutocompleteComponentProps) => {
  return (
    <>
      <Autocomplete
        multiple
        onInputChange={(event: object, value: string, reason: string) => {
          if (reason === 'input') {
            onSearch(value)
            onSearchChange(value)
          }
        }}
        inputValue={search}
        loading={loading}
        //@ts-ignore
        value={value}
        filterOptions={(x) => x}
        onChange={(event, newValue, reason) => {
          onChange(newValue)
        }}
        noOptionsText={noOptionsText}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Box
              sx={{
                flexGrow: 1,
                '& span': {
                  color: theme.palette.mode === 'light' ? '#586069' : '#8b949e',
                },
              }}
            >
              {
                //@ts-ignore
                isTaskFilter ? `${option.firstName} ${option.lastName}` : option
              }
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
        //@ts-ignore
        options={options ?? []}
        ListboxComponent={(props) => (
          //@ts-ignore
          <ListboxComponent
            onLoadMore={onLoadMore}
            isLoadMore={isLoadMore}
            {...props}
          />
        )}
        renderInput={(params) => (
          <CssTextField
            sx={{
              mt: '20px',
              mb: '16px',
              width: '100%',
              '& .MuiFormLabel-root': {
                fontFamily: 'inherit',
              },
            }}
            ref={params.InputProps.ref}
            inputProps={params.inputProps}
            height='40px'
            placeholder={label}
            autoFocus
            // value={value}
            InputProps={{
              endAdornment: (
                <div>
                  {loading ? (
                    <CircularProgress
                      color='primary'
                      size={20}
                      sx={{ mt: 1.5 }}
                    />
                  ) : null}
                  {params.InputProps.endAdornment}
                </div>
              ),
            }}
          />
        )}
      />
      <ListSelected>
        {isTaskFilter
          ? value?.map((option, idx) => (
              <ListItemSelected key={idx} style={{ backgroundColor: '#FEF1E6', color: '#FF902A' }}>
                {`${(option as IAssignedPerson).firstName} ${(option as IAssignedPerson).lastName}`}
                <Image
                  onClick={() =>
                    onRemove((option as IAssignedPerson).id as string)
                  }
                  src={closeIcon}
                  alt='close icon'
                  width={16}
                  height={16}
                />
              </ListItemSelected>
            ))
          : value?.map((option, idx) => (
              <ListItemSelected
                key={idx}
                style={{ backgroundColor: '#FEF1E6', color: '#FF902A' }}
              >
                {option as string}
                <Image
                  onClick={() => onRemove(option as string)}
                  src={closeIcon}
                  alt='close icon'
                  width={16}
                  height={16}
                />
              </ListItemSelected>
            ))}
      </ListSelected>
      <Box sx={{ mt: '16px' }}>
        <StyledLoadingButton
          variant='outlined'
          disabled={value.length === 0}
          onClick={() => onChange([])}
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
    </>
  )
}
