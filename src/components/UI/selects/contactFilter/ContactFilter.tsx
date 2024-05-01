import { Box, Menu } from '@mui/material'
import React, { Dispatch, SetStateAction, useState, useEffect } from 'react'
import AccordionEl from './components/accordionItem/AccordionEl'
import {
  StyledLoadingButton,
  StyledOutlinedButton,
} from '@/ui/components/styled'
import {
  ListItemSelected,
  ListSelected,
} from '../selectFilter/selectFilter.styled'
import Image from 'next/image'
import filterIcon from '@/assets/icons/filter-icon.svg'
import { StyledContactFilterWrapper } from './styled'
import { IContactFilterData } from '@/app/(main)/contacts/contacts.types'
import { useContactCompanyList } from '@/data/hooks/contact'
import { debounce } from '@/utils/debounce'
import { AutocompleteComponent } from '@/components/autocomplete/Autocomplete'
import { FilterNewIcon } from '@/ui/icons/FilterNewIcon'
import FilterModal from '../../modals/filterModal'

interface IContactFilterProps {
  filterData: IContactFilterData
  buttonText: string
  companyValue: string[]
  categoryValue: string[]
  setCompanyValue: Dispatch<SetStateAction<string[]>>
  setCategoryValue: Dispatch<SetStateAction<string[]>>
}

const ContactFilter = ({
  buttonText,
  companyValue,
  categoryValue,
  setCompanyValue,
  setCategoryValue,
  filterData,
}: IContactFilterProps) => {
  const [search, setSearch] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [skip, setSkip] = useState(0)
  const [take, setTake] = useState(5)
  const [isLoadMore, setIsLoadMore] = useState(false)
  const [companyList, setCompanyList] = useState<string[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [filterCompanyValue, setFilterCompanyValue] =
    useState<string[]>(companyValue)
  const [filterCategoryValue, setFilterCategoryValue] =
    useState<string[]>(categoryValue)

  const handleClickOpen = () => {
    setOpenModal(true)
  }

  const handleClose = () => {
    setOpenModal(false)
    setIsLoadMore(false)
  }

  const setDefaultStateModal = () => {
    setFilterCompanyValue(companyValue)
    setFilterCategoryValue(categoryValue)
  }

  const handleSaveFilter = () => {
    setCompanyValue(filterCompanyValue)
    setCategoryValue(filterCategoryValue)

    handleClose()
  }

  const handleResetFilter = () => {
    setFilterCompanyValue([])
    setFilterCategoryValue([])
    setCompanyValue([])
    setCategoryValue([])
  }

  const { data: companyData, isLoading: isCompaniesLoading } =
    useContactCompanyList(search ? { search, skip, take } : { skip, take })

  const handleLoadMore = () => {
    if (companyData?.length > 0 && companyData?.length === 5) {
      setTake((prev) => prev + 5)
      setSkip((prev) => prev + 5)
      setIsLoadMore(true)
    }
  }

  useEffect(() => {
    if (companyData && companyData?.length > 0) {
      setCompanyList((prev) => [...prev, ...companyData])
    }
  }, [companyData])

  const handleCompany = (company: string[]) => {
    setFilterCompanyValue(company)
  }

  const handleRemoveCompany = (company: string) => {
    setFilterCompanyValue((prevState) =>
      prevState?.filter((item) => item !== company),
    )
    setCompanyList((prevState) => prevState?.filter((item) => item !== company))
  }

  const handleCategory = (category: string) => {
    setFilterCategoryValue((prevState) =>
      prevState.findIndex((c) => c === category) !== -1
        ? prevState.filter((c) => c !== category)
        : [...prevState, category],
    )
  }

  const handleSetAnyCategory = (category: string[]) => {
    setFilterCategoryValue(category)
  }

  const debouncedCompanySearch = debounce((str: string) => {
    if (search !== str) {
      setSkip(0)
      setTake(5)
      setCompanyList([])
    }
    setSearch(str)
  }, 1000)

  const handleCompanySearch = (value: string) => {
    setSearchValue(value)
  }

  return (
    <StyledContactFilterWrapper>
      <StyledOutlinedButton sx={{ gap: '8px' }} onClick={handleClickOpen}>
        <FilterNewIcon sx={{ width: '20px', height: '20px' }} />
        {buttonText}
      </StyledOutlinedButton>
      <FilterModal
        open={openModal}
        handleClose={() => {
          setDefaultStateModal()
          handleClose()
        }}
        handleSelect={handleSaveFilter}
        handleReset={handleResetFilter}
        sxProps={{ width: '420px' }}
        selectButtonText='Show results'
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <AccordionEl label='Company'>
            <AutocompleteComponent
              value={filterCompanyValue}
              search={searchValue}
              options={companyList}
              loading={isCompaniesLoading}
              onLoadMore={handleLoadMore}
              isLoadMore={isLoadMore}
              onChange={handleCompany}
              onSearch={debouncedCompanySearch}
              onSearchChange={handleCompanySearch}
              onRemove={handleRemoveCompany}
              noOptionsText={
                search?.length > 0 && companyList.length === 0
                  ? 'No companies find'
                  : 'Enter the company you want to find'
              }
            />
          </AccordionEl>
          <AccordionEl label='Category'>
            <ListSelected style={{ marginTop: '16px' }}>
              {filterData.category.map((c) => (
                <ListItemSelected
                  onClick={() => handleCategory(c.value)}
                  style={{
                    color:
                      filterCategoryValue.findIndex(
                        (category) => category === c.value,
                      ) !== -1
                        ? '#FFFFFF'
                        : '#AAAAAA',
                    backgroundColor:
                      filterCategoryValue.findIndex(
                        (category) => category === c.value,
                      ) !== -1
                        ? '#FFAC5F'
                        : '#FFFEF7',
                  }}
                  key={c.value}
                >
                  {c.name}
                </ListItemSelected>
              ))}
            </ListSelected>
            <Box sx={{ mt: '16px', display: 'flex', columnGap: '8px' }}>
              <StyledLoadingButton
                variant='outlined'
                disabled={filterData.category.length === filterCategoryValue.length}
                onClick={() =>
                  handleSetAnyCategory(filterData.category.map((c) => c.value))
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
                disabled={filterCategoryValue.length === 0}
                onClick={() => handleSetAnyCategory([])}
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
        </Box>
      </FilterModal>
    </StyledContactFilterWrapper>
  )
}

export default ContactFilter
