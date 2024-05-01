import { SxProps } from '@mui/material'
import { ReactNode } from 'react'
import { StyledSkeleton } from '../UI/skeletons/skeletons.styled'

interface IComponentWithSkeletonProps {
  sxPropsSkeleton?: SxProps
  isLoading: boolean
  children: ReactNode
}

const ComponentWithSkeleton = ({
  isLoading,
  sxPropsSkeleton,
  children,
}: IComponentWithSkeletonProps) => {
  if (isLoading) {
    return <StyledSkeleton sx={sxPropsSkeleton} />
  }

  return children
}

export default ComponentWithSkeleton
