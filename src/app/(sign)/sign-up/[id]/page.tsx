import SignUpPage from './SignUpPage'

const Page = ({ params }: { params: { id: string } }) => {
  return <SignUpPage inviteToken={params.id}/>
}

export default Page
