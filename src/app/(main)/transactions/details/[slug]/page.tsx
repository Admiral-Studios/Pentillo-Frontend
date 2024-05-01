import DetailsPage from './DetailsPage'

const Page = async ({ params }: { params: { slug: string } }) => {
  return <DetailsPage transactionId={params.slug} />
}

export default Page
