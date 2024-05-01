import {
  StyledButtonRemove,
  StyledCardFooter,
  StyledCardWrapper,
} from '@/components/UI/cards/contactCard/contactCard.styled'
import CardHeader from '@/components/UI/cards/contactCard/_components/cardHeader'
import { SelectChangeEvent } from '@mui/material'
import { ReactNode } from 'react'
import { IOption } from '@/components/UI/selects/selectRegular/SelectRegular'
import CardBody from './_components/cardBody'

interface IContactCardProps {
  userType?: string
  company?: string
  image?: string
  isAuth?: boolean
  fullName?: string
  phone?: string
  email?: string
  address?: string
  isSelect?: boolean
  isSelectedContact?: boolean
  selectValue?: string
  onChangeSelect?: (event: SelectChangeEvent<string>, child: ReactNode) => void
  selectOptions?: IOption[]
  selectPlaceholder?: string
  disabled?: boolean
  disabledButton?: boolean
  isTask?: boolean
  handleRemove?: () => void
}

const ContactCard = ({
  address,
  isAuth,
  company,
  email,
  fullName,
  image,
  phone,
  userType,
  isSelect,
  isSelectedContact,
  onChangeSelect,
  selectOptions,
  selectPlaceholder,
  selectValue,
  disabled,
  handleRemove,
  disabledButton,
  isTask,
}: IContactCardProps) => {
  return (
    <StyledCardWrapper>
      <CardHeader
        disabled={disabled}
        image={image}
        userType={userType}
        company={company}
        isSelect={isSelect}
        selectPlaceholder={selectPlaceholder}
        onChangeSelect={onChangeSelect}
        selectOptions={selectOptions}
        selectValue={selectValue}
      />
      {!isSelect && (
        <>
          <CardBody
            address={address}
            email={email}
            fullName={fullName}
            isAuth={isAuth}
            phone={phone}
          />
          {!isTask && (
            <StyledCardFooter>
              <StyledButtonRemove
                disabled={disabledButton}
                onClick={handleRemove}
                type='button'
              >
                Delete
              </StyledButtonRemove>
            </StyledCardFooter>
          )}
        </>
      )}
      {isSelectedContact && (
        <>
          <CardBody
            address={address}
            email={email}
            fullName={fullName}
            isAuth={isAuth}
            phone={phone}
          />
          <StyledCardFooter>
            <StyledButtonRemove
              disabled={disabledButton}
              onClick={handleRemove}
              type='button'
            >
              Delete
            </StyledButtonRemove>
          </StyledCardFooter>
        </>
      )}
    </StyledCardWrapper>
  )
}

export default ContactCard
