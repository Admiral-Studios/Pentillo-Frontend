import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { StyledList } from './listbox.styled'

interface ListboxComponentProps {
  children: React.ReactNode
  onLoadMore: () => void
  isLoadMore?: boolean
}

const ListboxComponent = forwardRef<HTMLUListElement, ListboxComponentProps>(
  function ListboxComponent(rest, ref) {
    const { children, onLoadMore, isLoadMore, ...otherProps } = rest
    const listRef = useRef<HTMLUListElement>(null)

    const handleScroll = (event: React.UIEvent<HTMLUListElement>) => {
      const { scrollTop, clientHeight, scrollHeight } = listRef.current!
      if (scrollTop + clientHeight === scrollHeight) {
        onLoadMore()
      }
    }

    useEffect(() => {
      if (listRef.current && isLoadMore) {
        listRef.current.scrollTop = listRef.current.scrollHeight - 145
      }
    }, [children, isLoadMore])

    return (
      <StyledList style={{height: 'fit-content',
        maxHeight: '100px',
        overflowY: 'auto',}} onScroll={handleScroll} ref={listRef} {...otherProps}>
        {children}
      </StyledList>
    )
  },
)

export default ListboxComponent
