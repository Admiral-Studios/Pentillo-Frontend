import styled from '@emotion/styled'
import arrowLeft from '@/assets/icons/arrow-left.svg'
import arrowRight from '@/assets/icons/arrow-right.svg'
import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'

interface ITablePaginationProps {
  countsRowsByOnePage?: number[]
  count?: number
  pages: number
  take: number
  skip: number
  setTake: Dispatch<SetStateAction<number>>
  setSkip: Dispatch<SetStateAction<number>>
}

const TablePagination = ({
  countsRowsByOnePage = [10, 25, 50],
  count,
  pages,
  skip,
  take,
  setSkip,
  setTake,
}: ITablePaginationProps) => {
  const handleStepClick = (step: number) => {
    setSkip(step !== 1 ? step * take - take : 0)
  }
  const handlePrev = () => {
    setSkip((prevState) => {
      if (prevState === 0) {
        return prevState
      } else {
        return prevState - take
      }
    })
  }
  const handleNext = () => {
    setSkip((prevState) => {
      if (count) {
        if (prevState + take >= count) {
          return prevState
        } else {
          return prevState + take
        }
      }

      return prevState
    })
  }

  const handlePerPage = (value: number) => {
    setTake(value)
  }

  return (
    <StyledTableWrapper>
      {/* <StyledCountRowsWrapper>
        {countsRowsByOnePage.map((count) => (
          <StyledCountRowsItem
            isActive={count === take}
            onClick={() => handlePerPage(count)}
            key={count}
          >
            {count}
          </StyledCountRowsItem>
        ))}
      </StyledCountRowsWrapper> */}
      <StyledNavigationWrapper>
        {pages > 1 && (
          <>
            <li
              onClick={handlePrev}
              style={{
                border: '1px solid #F2EFEB',
                boxShadow: '10px 4px 40px 0px rgba(224, 233, 243, 0.50)',
                borderRadius: '8px',
              }}
            >
              <Image src={arrowLeft} alt='arrow prev' />
            </li>

            {[...Array(pages)].map((_, i) => (
              <StyledNavigationItem
                isActive={
                  i + 1 === 1 ? skip === 0 : skip === (i + 1) * take - take
                }
                onClick={() => handleStepClick(i + 1)}
                key={i}
              >
                {i + 1}
              </StyledNavigationItem>
            ))}
            <li
              onClick={handleNext}
              style={{
                border: '1px solid #F2EFEB',
                boxShadow: '10px 4px 40px 0px rgba(224, 233, 243, 0.50)',
                borderRadius: '8px',
              }}
            >
              <Image src={arrowRight} alt='arrow next' />
            </li>
          </>
        )}
      </StyledNavigationWrapper>
    </StyledTableWrapper>
  )
}

const StyledTableWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  column-gap: 20px;
  ul {
    list-style: none;
    padding-left: 0;
  }
  li {
    cursor: pointer;
  }
`
const StyledCountRowsWrapper = styled.ul`
  display: flex;
  column-gap: 4px;
`
const StyledCountRowsItem = styled.li<{ isActive?: boolean }>`
  border: ${({ isActive }) =>
    isActive ? '1px solid #FFAC5F' : '1px solid #F2EFEB'};
  width: 40px;
  height: 25px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const StyledNavigationWrapper = styled.ul`
  display: flex;
  column-gap: 8px;
  align-items: center;
  li {
    width: 28px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
const StyledNavigationItem = styled.li<{ isActive?: boolean }>`
  border-radius: 8px;
  color: ${({ isActive }) => (isActive ? '#fff' : '#717171')};
  background-color: ${({ isActive }) => (isActive ? '#4EADA9' : 'transparent')};
`

export default TablePagination
