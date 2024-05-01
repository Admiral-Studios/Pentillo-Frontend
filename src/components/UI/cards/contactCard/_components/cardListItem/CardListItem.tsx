import Image from 'next/image'

interface CardListItemProps {
  image: string
  text?: string
}

const CardListItem = ({ image, text }: CardListItemProps) => (
  <li>
    <Image src={image} alt='' />
    <p>{text}</p>
  </li>
)

export default CardListItem
