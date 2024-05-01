import styled from '@emotion/styled'
import { StyledSectionWrapper } from '../../_styled'
import Image from 'next/image'
import { IAgent, IBuyerAndSeller, ICreator } from '@/data/api/api.types'
import userCardIcon from '@/assets/icons/user-card-icon.svg'
import ComponentWithSkeleton from '@/components/componentWithSkeleton'
import { IDetailsAgent } from '../../DetailsPage'

interface IHeroProps {
  street?: string
  isLoading: boolean
  isLoadingParticipant: boolean
  agents: IDetailsAgent[]
  buyersAndSellers: IBuyerAndSeller[]
}

const Hero = ({
  isLoading,
  street,
  isLoadingParticipant,
  agents,
  buyersAndSellers,
}: IHeroProps) => {
  return (
    <StyledSectionWrapper style={{ marginTop: '20px' }}>
      <ComponentWithSkeleton
        sxPropsSkeleton={{ height: '24px', mb: '12px' }}
        isLoading={isLoading}
      >
        <StyledTitle>{street}</StyledTitle>
      </ComponentWithSkeleton>
      <StyledListUserCards>
        <ComponentWithSkeleton
          sxPropsSkeleton={{ height: '20px', mb: '12px', width: '100%' }}
          isLoading={isLoadingParticipant}
        >
          {agents.map(({ field, data }) => (
            <StyledUserCard key={data.id}>
              <Image src={userCardIcon} alt='avatar' />
              <p>
                {data.firstName + ' ' + data.lastName}, {field}
              </p>
            </StyledUserCard>
          ))}
          {buyersAndSellers.map((buyerAndSeller) => (
            <StyledUserCard key={buyerAndSeller.id}>
              <Image src={userCardIcon} alt='avatar' />
              <p>{buyerAndSeller.firstName + ' ' + buyerAndSeller.lastName}</p>
            </StyledUserCard>
          ))}
        </ComponentWithSkeleton>
      </StyledListUserCards>
    </StyledSectionWrapper>
  )
}

const StyledTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0em;
  margin: 0;
  margin-bottom: 12px;
`

const StyledListUserCards = styled.ul`
  padding-left: 0;
  margin: 0;
  display: flex;
  column-gap: 16px;
  flex-wrap: wrap;
`

const StyledUserCard = styled.div`
  display: flex;
  align-items: center;
  column-gap: 4px;
  img {
    width: 20px;
    height: 20px;
    border-radius: 50px;
  }
  p {
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0em;
    margin: 0;
  }
`

export default Hero
