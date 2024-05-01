import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'

import { StyledMarkButton } from '../buttonRegular'
import TickIcon from '../../icons/TickIcon'

interface ButtonMark
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode
}

const ButtonMark = ({ children, ...otherProps }: ButtonMark) => {
  return (
    <StyledMarkButton {...otherProps}>
      <TickIcon
        sx={{
          fontSize: '20px',
          path: {
            stroke: otherProps.disabled ? '#AAAAAA' : '#FF902A',
          },
        }}
      />
      {children}
    </StyledMarkButton>
  )
}

export default ButtonMark
