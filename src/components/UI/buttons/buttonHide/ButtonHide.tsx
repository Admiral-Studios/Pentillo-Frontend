import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'
import { StyledMarkButton } from '../buttonRegular'
import HideIcon from '../../icons/HideIcon'

interface ButtonHide
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode
  status: boolean
}

const ButtonHide = ({ children, ...otherProps }: ButtonHide) => {
  return (
    <StyledMarkButton
      {...otherProps}
      style={{
        color:
          otherProps.disabled || !otherProps.status ? '#AAAAAA' : '#FF902A',
      }}
    >
      <HideIcon
        sx={{
          fontSize: '20px',
          path: {
            stroke:
              otherProps.disabled || !otherProps.status ? '#AAAAAA' : '#FF902A',
          },
        }}
      />
      {children}
    </StyledMarkButton>
  )
}

export default ButtonHide
