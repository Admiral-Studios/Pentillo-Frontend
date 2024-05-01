import Image from 'next/image'
import noUserIcon from '@/assets/icons/no-user-icon.svg'
import { StyledCardHeader } from '@/components/UI/cards/contactCard/contactCard.styled'
import SelectRegular from '@/components/UI/selects/selectRegular'
import { IOption } from '@/components/UI/selects/selectRegular/SelectRegular'
import { SelectChangeEvent } from '@mui/material'
import { ReactNode } from 'react'

interface ICardHeaderProps {
  image?: string
  userType?: string
  company?: string
  isSelect?: boolean
  selectValue?: string
  onChangeSelect?: (event: SelectChangeEvent<string>, child: ReactNode) => void
  selectOptions?: IOption[]
  selectPlaceholder?: string
  disabled?: boolean
}

const CardHeader = ({
  image,
  userType,
  company,
  isSelect,
  onChangeSelect,
  selectOptions,
  selectValue,
  selectPlaceholder,
  disabled,
}: ICardHeaderProps) => {
  return (
    <StyledCardHeader>
      {isSelect ? (
        <SelectHeader
          disabled={disabled}
          options={selectOptions}
          placeholder={selectPlaceholder}
          onChange={onChangeSelect}
          value={selectValue}
        />
      ) : (
        <ContactHeaderContent
          company={company}
          image={image}
          userType={userType}
        />
      )}
    </StyledCardHeader>
  )
}

interface IContactHeaderContentProps
  extends Pick<ICardHeaderProps, 'image' | 'company' | 'userType'> {}
const ContactHeaderContent = ({
  company,
  image,
  userType,
}: IContactHeaderContentProps) => (
  <>
    <Image
      className='user-profile-image'
      width={42}
      height={42}
      src={image || noUserIcon}
      alt='user profile icon'
    />
    <div className='text-wrapper'>
      <h3>{userType}</h3>
      <p>{company}</p>
    </div>
  </>
)
interface ISelectHeaderProps {
  options?: IOption[]
  value?: string
  onChange?: (event: SelectChangeEvent<string>, child: ReactNode) => void
  placeholder?: string
  disabled?: boolean
}
const SelectHeader = ({
  onChange,
  options,
  value,
  placeholder,
  disabled,
}: ISelectHeaderProps) => (
  <SelectRegular
    disabled={disabled}
    value={value}
    onChange={onChange}
    options={options}
    label={placeholder}
  />
)

export default CardHeader
