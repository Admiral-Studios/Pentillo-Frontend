import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'
import styled from '@emotion/styled'
import { RemoveIcon } from '../../icons'

interface ButtonRemove
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode
}

const StyledButton = styled.button`
  max-height: 32px;
  min-height: 32px;
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  padding-left: 12px;
  padding-right: 12px;

  font-family: inherit;
  font-size: 16px;
  font-weight: 500;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: center;
  color: #ff902a;
  column-gap: 8px;
  cursor: pointer;
  &:disabled {
    color: #aaaaaa;
    cursor: auto;
  }
`

const ButtonRemove = ({ children, ...otherProps }: ButtonRemove) => {
  return (
    <StyledButton {...otherProps}>
      <RemoveIcon
        sx={{
          fontSize: '20px',
          path: { fill: otherProps.disabled ? '#AAAAAA' : '#FF902A' },
        }}
      />
      {children}
    </StyledButton>
  )
}

export default ButtonRemove
