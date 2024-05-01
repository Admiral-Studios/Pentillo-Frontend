import { CssTextField, TextFieldWrapper } from '@/ui/components/styled'
import { SearchIcon } from '@/ui/icons/SearchIcon'
import { Box, InputAdornment, SxProps } from '@mui/material'
import { Dispatch, ReactNode, SetStateAction } from 'react'
import styled from '@emotion/styled'

interface ITableHeaderProps {
  title?: string
  actionSection?: ReactNode
  isSearch?: boolean
  search?: string
  setSearch?: Dispatch<SetStateAction<string>>
  tabsContent?: ReactNode
}

const TableHeader = ({
  title,
  actionSection,
  isSearch = true,
  search,
  setSearch,
  tabsContent,
}: ITableHeaderProps) => {
  return (
    <Box
      sx={{
        p: '18px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          columnGap: '16px',
          alignItems: 'center',
        }}
      >
        {title && <StyledTypography>{title}</StyledTypography>}
        {tabsContent}

        {isSearch && (
          <TableSearch
            search={search}
            setSearch={setSearch}
            sxPropsWrapper={{ width: '280px' }}
          />
        )}
      </Box>

      {actionSection}
    </Box>
  )
}

interface ITableSearchProps {
  sxPropsWrapper?: SxProps
  search?: string
  setSearch?: Dispatch<SetStateAction<string>>
}

export const TableSearch = ({
  sxPropsWrapper,
  search,
  setSearch,
}: ITableSearchProps) => {
  return (
    <Box sx={{ ...sxPropsWrapper }}>
      <InputSearch search={search} setSearch={setSearch} label='Search' />
    </Box>
  )
}

interface IInputSearchProps {
  label?: string
  search?: string
  setSearch?: Dispatch<SetStateAction<string>>
}

const InputSearch = ({ label, search, setSearch }: IInputSearchProps) => {
  return (
    <TextFieldWrapper sx={{ width: '280px' }}>
      <CssTextField
        placeholder='Search'
        value={search}
        onChange={(event) => setSearch && setSearch(event.target.value)}
        variant='outlined'
        type={'text'}
        sx={{
          mb: '1.5rem',
          backgroundColor: '#fff',
          boxShadow: '10px 4px 40px 0px rgba(224, 233, 243, 0.50)',
          '& .MuiInputBase-input': {
            padding: '10px !important',
          },
        }}
        height={'36px'}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start' sx={{ width: '18px !important' }}>
              <SearchIcon style={{ width: '16px', height: '16px' }} />
            </InputAdornment>
          ),
        }}
      />
    </TextFieldWrapper>
  )
}

const StyledTypography = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 2;
  margin: 0;
  color: #080808;
`

export default TableHeader
