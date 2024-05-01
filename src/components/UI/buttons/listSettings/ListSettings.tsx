import styled from '@emotion/styled'
import listSettings from '@/assets/icons/listSettingsIcon.svg'
import Image from 'next/image'
import { HTMLAttributes } from 'react'

interface IListSettingsProps extends HTMLAttributes<HTMLButtonElement> {
  isRotate?: boolean
}

const ListSettings = ({ ...otherProps }: IListSettingsProps) => {
  return (
    <StyledButton {...otherProps} type='button'>
      <Image src={listSettings} alt='dots icon' />
    </StyledButton>
  )
}

const StyledButton = styled.button<{ isRotate?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0 4px 0 4px;
  border-radius: 4px;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  ${({ isRotate }) => isRotate && 'transform:  rotateZ(90deg);'}
`

export default ListSettings
