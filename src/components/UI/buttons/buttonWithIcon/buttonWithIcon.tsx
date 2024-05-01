import { SxProps, styled } from '@mui/material/styles'
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'

const StyledButtonWithIcon = styled('button')`
  max-height: 32px;
  min-height: 32px;
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;

  font-family: inherit;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: center;
  color: #2b2b2b;
  column-gap: 12px;
  cursor: pointer;

  &:disabled {
    color: #aaaaaa;
    cursor: auto;
  }
`

interface IButtonWithIconProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode
  icon?: ReactNode
  sxProps?: SxProps
}

const ButtonWithIcon = ({
  children,
  icon,
  sxProps,
  ...otherProps
}: IButtonWithIconProps) => {
  return (
    <StyledButtonWithIcon
      sx={{ fontWeight: 500, fontSize: '16px', ...sxProps }}
      {...otherProps}
    >
      {icon}
      {children}
    </StyledButtonWithIcon>
  )
}

export default ButtonWithIcon
