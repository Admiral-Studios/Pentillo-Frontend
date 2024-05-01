import { StyledCardBody } from '../../contactCard.styled'
import CardListItem from '../cardListItem'
import isAuthIcon from '@/assets/icons/is-auth-icon.svg'
import noAuthIcon from '@/assets/icons/no-auth-icon.svg'
import userIcon from '@/assets/icons/user-card-icon.svg'
import phoneIcon from '@/assets/icons/phone-icon.svg'
import emailIcon from '@/assets/icons/email-icon.svg'
import locationIcon from '@/assets/icons/location-icon.svg'

interface ICardBodyProps {
  isAuth?: boolean
  fullName?: string
  phone?: string
  email?: string
  address?: string
}

const CardBody = ({
  isAuth,
  address,
  email,
  fullName,
  phone,
}: ICardBodyProps) => {
  return (
    <StyledCardBody>
      <ul>
        {isAuth ? (
          <CardListItem image={isAuthIcon} text='Authorized member' />
        ) : (
          <CardListItem image={noAuthIcon} text='No authorized member' />
        )}
        <CardListItem image={userIcon} text={fullName} />
        {isValidValue(phone) && <CardListItem image={phoneIcon} text={phone} />}
        {isValidValue(email) && <CardListItem image={emailIcon} text={email} />}
        {isValidValue(address) && (
          <CardListItem image={locationIcon} text={address} />
        )}
      </ul>
    </StyledCardBody>
  )
}

const isValidValue = (value?: string): boolean =>
  value ? Boolean(value) : false

export default CardBody
