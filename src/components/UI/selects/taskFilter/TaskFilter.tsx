import { Menu } from '@mui/material'
import React, { Dispatch, SetStateAction, useState, useEffect } from 'react'
import AccordionEl from './components/accordionItem/AccordionEl'
import Image from 'next/image'
import filterIcon from '@/assets/icons/filter-icon.svg'
import { debounce } from '@/utils/debounce'
import { AutocompleteComponent } from '@/components/autocomplete/Autocomplete'
import { ITaskFiltersData } from '@/app/(main)/tasks/tasks.types'
import { StyledTaskFilterWrapper } from './styled'
import { useTaskAssignedPersonList, useTaskTitleList } from '@/data/hooks/list'
import { IAssignedPerson } from '@/data/api/api.types'
import { theme } from '@/ui/theme'
import closeIcon from '@/assets/icons/close-icon.svg'

interface ITaskFilterProps {
  filterData: ITaskFiltersData
  buttonText: string
  titleValue: string[]
  assignedPersonValue: IAssignedPerson[]
  setTitleValue: Dispatch<SetStateAction<string[]>>
  setAssignedPersonValue: Dispatch<SetStateAction<IAssignedPerson[]>>
}

const TaskFilter = ({
  buttonText,
  titleValue,
  assignedPersonValue,
  setTitleValue,
  setAssignedPersonValue,
  filterData,
}: ITaskFilterProps) => {
  const [menuDropdownEl, setMenuDropdownEl] = useState<null | HTMLElement>(null)
  const open = Boolean(menuDropdownEl)
  const [search, setSearch] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [searchTitle, setSearchTitle] = useState('')
  const [searchTitleValue, setSearchTitleValue] = useState('')
  const [skip, setSkip] = useState(0)
  const [take, setTake] = useState(10)
  const [assignedPersonList, setAssignedPersonList] = useState<
    IAssignedPerson[]
  >([])

  const [titleList, setTitleList] = useState<string[]>([])

  const handleTitle = (name: string[]) => {
    setTitleValue(name)
  }

  const handleRemoveTitle = (title: string) => {
    setTitleValue((prevState) => prevState?.filter((ad) => ad !== title))
    setTitleList((prevState) => prevState?.filter((ad) => ad !== title))
  }

  const { data: assignedPersonData, isLoading: isAssignedPersonLoading } =
    useTaskAssignedPersonList({ search, skip, take })

  const { data: titleData, isLoading: isTitleLoading } = useTaskTitleList({
    search: searchTitle,
    skip,
    take,
  })

  const handleLoadMore = () => {
    if (assignedPersonData?.length > 0) {
      setTake((prev) => prev + 10)
      setSkip((prev) => prev + 10)
    }
    if (titleData?.length > 0) {
      setTake((prev) => prev + 10)
      setSkip((prev) => prev + 10)
    }
  }

  useEffect(() => {
    if (assignedPersonData && assignedPersonData?.length > 0) {
      setAssignedPersonList((prev) => [...prev, ...assignedPersonData])
    } else if (titleData && titleData?.length > 0) {
      setTitleList((prev) => [...prev, ...titleData])
    }
  }, [assignedPersonData, titleData])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuDropdownEl(event.currentTarget)
  }

  const handleClose = () => {
    setMenuDropdownEl(null)
  }

  const handleAssignedPerson = (
    assignedPerson: string[] | IAssignedPerson[],
  ) => {
    setAssignedPersonValue(assignedPerson as IAssignedPerson[])
  }

  const handleRemoveAssignedPerson = (assignedPersonId: string) => {
    setAssignedPersonValue((prevState) =>
      prevState?.filter((item) => item.id !== assignedPersonId),
    )
    setAssignedPersonList((prevState) =>
      prevState?.filter((item) => item.id !== assignedPersonId),
    )
  }

  const debouncedAssignedPersonSearch = debounce((str: string) => {
    if (search !== str) {
      setSkip(0)
      setTake(10)
      setAssignedPersonList([])
    }
    setSearch(str)
  }, 1000)

  const debouncedTitle = debounce((str: string) => {
    if (search !== str) {
      setSkip(0)
      setTake(10)
      setTitleList([])
    }
    setSearchTitle(str)
  }, 1000)

  const handleAssignedPersonSearch = (value: string) => {
    setSearchValue(value)
  }

  const handleTitleSearch = (value: string) => {
    setSearchTitleValue(value)
  }

  return (
    <StyledTaskFilterWrapper>
      <button className='select__button' onClick={handleClick}>
        <Image
          width={12.65}
          height={12.08}
          src={filterIcon}
          alt='filter icon'
        />
        {buttonText}
      </button>
      <Menu
        disablePortal
        anchorEl={menuDropdownEl}
        open={open}
        onClose={handleClose}
        sx={{
          '.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPopover-paper.MuiMenu-paper.MuiMenu-paper':
            {
              overflow: 'visible',
              bgcolor: 'transparent',
              borderRadius: '16px',
              boxShadow: '10px 4px 40px 0px #E0E9F380',
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '320px',
            },
          '.MuiList-root': {
            bgcolor: '#ffffff',
            border: '1px solid #E7E7E7',
            borderRadius: '16px',
            px: '12px',
          },
        }}
      >
        <AccordionEl label='Assigned Person'>
          <AutocompleteComponent
            value={assignedPersonValue}
            isTaskFilter={true}
            label={'Assigned Person'}
            search={searchValue}
            options={assignedPersonList}
            loading={isAssignedPersonLoading}
            onLoadMore={handleLoadMore}
            onChange={handleAssignedPerson}
            onSearch={debouncedAssignedPersonSearch}
            onSearchChange={handleAssignedPersonSearch}
            onRemove={handleRemoveAssignedPerson}
            noOptionsText={
              search?.length > 0 && assignedPersonList.length === 0
                ? 'No assigned persons find'
                : 'Enter the assigned person you want to find'
            }
          />
        </AccordionEl>
        <AccordionEl label='Title'>
          <AutocompleteComponent
            value={titleValue}
            label={'Title'}
            search={searchTitleValue}
            options={titleList}
            loading={isTitleLoading}
            onLoadMore={handleLoadMore}
            onChange={handleTitle}
            onSearch={debouncedTitle}
            onSearchChange={handleTitleSearch}
            onRemove={handleRemoveTitle}
            noOptionsText={
              searchTitle?.length > 0 && titleList.length === 0
                ? 'No title found'
                : 'Enter the title you want to find'
            }
          />
        </AccordionEl>
      </Menu>
    </StyledTaskFilterWrapper>
  )
}

export default TaskFilter
