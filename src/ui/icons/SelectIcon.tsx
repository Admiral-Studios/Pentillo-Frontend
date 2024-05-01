import { createSvgIcon } from '@mui/material'

export const SelectIcon = ({ transform }: { transform?: boolean }) => {
  const IconComponent = createSvgIcon(
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      transform={transform ? 'rotate(180)' : undefined}
    >
      <path
        d='M15 8.3335L10.5893 12.7442C10.2638 13.0697 9.73618 13.0697 9.41074 12.7442L5 8.3335'
        stroke='#717171'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
    </svg>,
    'SelectIcon'
  )

  return <IconComponent />
}
