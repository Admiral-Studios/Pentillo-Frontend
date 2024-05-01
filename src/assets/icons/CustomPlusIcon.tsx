import * as React from 'react'
const CustomPlusIcon = ({ strokeColor = '#fff' }: { strokeColor?: string }) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={26} height={25} fill='none'>
    <path
      stroke={strokeColor}
      strokeLinecap='round'
      strokeWidth={1.5}
      d='M13.001 4.167v16.666m8.334-8.333H4.668'
    />
  </svg>
)
export default CustomPlusIcon
