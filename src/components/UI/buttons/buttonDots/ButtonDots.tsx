import styled from '@emotion/styled'
import dotsIcon from '@/assets/icons/dots-icon.svg'
import Image from 'next/image'
import { HTMLAttributes } from 'react'

interface IButtonDotsProps extends HTMLAttributes<HTMLButtonElement> {
  isRotate?: boolean
}

const ButtonDots = ({ ...otherProps }: IButtonDotsProps) => {
  return (
    <StyledButton {...otherProps} type='button'>
      <Image src={dotsIcon} alt='dots icon' />
    </StyledButton>
  )
}

const StyledButton = styled.button<{ isRotate?: boolean, borderColor?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #F2EFEB;
  ${({ borderColor }) => borderColor && `border-color:  ${borderColor};`}
  background-color: transparent;
  box-shadow: 10px 4px 40px 0px rgba(224, 233, 243, 0.50);
  cursor: pointer;
  ${({ isRotate }) => isRotate && 'transform:  rotateZ(90deg);'}
`

export default ButtonDots
