import SignInPage from './SignInPage'

const Page = ({ params }: { params: { id: string } }) => {
  return <SignInPage inviteToken={params.id} />
}

export default Page
