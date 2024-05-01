import styled from '@emotion/styled'
import { LoadingButton } from '@mui/lab'
import { ReactNode } from 'react'
import exportIcon from '@/assets/icons/export-icon.svg'
import Image from 'next/image'

interface IButtonExportProps {
  children: ReactNode
}

const ButtonExport = ({ children }: IButtonExportProps) => {
  return (
    <StyledButtonExport>
      <Image src={exportIcon} alt='export icon' />
      {children}
    </StyledButtonExport>
  )
}

const StyledButtonExport = styled(LoadingButton)`
  height: 38px;
  padding: 7px 16px 7px 16px;
  border-radius: 8px;
  display: flex;
  column-gap: 10.5px;

  border: 1px solid #f2efeb;
  color: #424242;
  text-transform: none;
`

export default ButtonExport
