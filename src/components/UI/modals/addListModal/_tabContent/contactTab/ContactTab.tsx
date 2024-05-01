import SelectRegular from '@/components/newUI/selects/selectRegular'
import { StyledButtonsWrapper, StyledWrapper } from '../tabContent.styled'
import { StyledButton } from '@/components/newUI/buttons/buttons.styled'
import { IListData } from '@/data/api/api.types'
import { IOption } from '@/components/UI/selects/selectRegular/SelectRegular'
import { useState } from 'react'
import { SelectChangeEvent } from '@mui/material'
import { StyledRegularTooltip } from '@/components/UI/toaltips/toaltip.styled'

interface IContactTabProps {
  onAddList?: (contact: string) => void
  lists?: IListData[]
  handleClose: () => void
}

const ContactTab = ({ onAddList, lists, handleClose }: IContactTabProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(false)
  const [selectedList, setSelectedList] = useState<IListData | undefined>(
    undefined,
  )
  const [selectedListId, setSelectedListId] = useState<string>('')
  const options: IOption[] | undefined = lists?.map((list) => ({
    name: list.name,
    value: list.id,
  }))

  const onChangeSelect = (event: SelectChangeEvent<string>) => {
    const selectedListId = event.target.value
    const list = lists?.find((c) => c.id === selectedListId)

    setSelectedListId(selectedListId)
    setSelectedList(list)
    setIsSelected(true)
  }

  const handleAdd = () => {
    const list = lists?.find((c) => c.id === selectedListId)
    if (list && onAddList) {
      onAddList(list.id)
      handleClose()
    }
  }

  const isLists = Boolean(lists?.length)

  return (
    <StyledWrapper>
      <StyledRegularTooltip
        disableHoverListener={isLists}
        arrow
        title='You have no lists.'
      >
        <div>
          <SelectRegular
            disabled={!isLists}
            value={selectedListId}
            onChange={onChangeSelect}
            options={options}
            placeholder='List'
          />
        </div>
      </StyledRegularTooltip>
     

      <StyledButtonsWrapper>
        <StyledButton
          disabled={!isLists || !Boolean(selectedListId)}
          onClick={handleAdd}
        >
          Add
        </StyledButton>
      </StyledButtonsWrapper>
    </StyledWrapper>
  )
}

export default ContactTab
