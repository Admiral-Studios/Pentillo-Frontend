import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { MouseEvent, ReactNode, useState } from 'react'

interface IActionMenuOption {
  title: string
  handleClick: () => void
  icon?: ReactNode
}

interface IActionMenuProps {
  options: IActionMenuOption[]
  anchorEl: HTMLElement | null
  open: boolean
  handleClose: () => void
}

const ActionMenu = ({
  options,
  anchorEl,
  handleClose,
  open,
}: IActionMenuProps) => {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
      {options.map(({ title, handleClick, icon }) => (
        <MenuItem
          key={title}
          onClick={() => {
            handleClick()
            handleClose()
          }}
        >
          {Boolean(icon) && icon}
          {title}
        </MenuItem>
      ))}
    </Menu>
  )
}

export default ActionMenu
